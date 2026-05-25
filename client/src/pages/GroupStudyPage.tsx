import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Send, Plus } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import Button from "../components/Button";
import Input from "../components/Input";
import Toast, { ToastType } from "../components/Toast";
import { useSearchParams } from "react-router-dom";

interface GroupMember {
  _id: string;
  name: string;
  status: "online" | "offline";
  avatar: string;
}

interface ChatMessage {
  id?: number;
  sender: string;
  message: string;
  timestamp: Date | string;
  isSelf?: boolean;
}

let socket: Socket;

const GroupStudyPage: React.FC = () => {
  const [view, setView] = useState<"join" | "create" | "dashboard">("join");
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [studentGroups, setStudentGroups] = useState<any[]>([]);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentGroupId, setCurrentGroupId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"chat" | "files" | "quiz">("chat");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");

  // Invite modal
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [shareableLink, setShareableLink] = useState("");

  // Files / Quizzes
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  // Read ?code=XYZ
  const [searchParams] = useSearchParams();

  const showToastMessage = (message: string, type: ToastType) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // Socket setup
  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on("receiveMessage", (message: ChatMessage) => {
      setChatMessages((prev) => [...prev, { ...message, isSelf: false }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch my groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axiosInstance.get("/student-groups");
        setStudentGroups(res.data || []);
      } catch {
        showToastMessage("Failed to fetch groups", "error");
      }
    };
    fetchGroups();
  }, []);

  // Auto-join via ?code
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setGroupCode(code.toUpperCase());
      handleJoinGroupWithCode(code);
    }
  }, [searchParams]);

  // Load files/quizzes when group changes
  useEffect(() => {
    if (!currentGroupId) return;
    (async () => {
      try {
        const [filesRes, quizzesRes] = await Promise.all([
          axiosInstance.get(`/student-groups/${currentGroupId}/files`).catch(() => ({ data: [] })),
          axiosInstance.get(`/student-groups/${currentGroupId}/quizzes`).catch(() => ({ data: [] })),
        ]);
        setFiles(filesRes.data || []);
        setQuizzes(quizzesRes.data || []);
      } catch {
        // silent
      }
    })();
  }, [currentGroupId]);

  // ----- Handlers -----

  const handleCreateGroup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!groupName.trim()) return showToastMessage("Please enter group name", "error");

    try {
      const res = await axiosInstance.post("/student-groups", { name: groupName.trim() });
      const group = res.data;
      setStudentGroups((prev) => [...prev, group]);
      setCurrentGroupId(group._id);
      setGroupName(group.name);
      setGroupMembers(group.members || []);
      setView("dashboard");
      socket.emit("joinGroup", group._id);
      showToastMessage(`Group "${group.name}" created`, "success");
    } catch {
      showToastMessage("Failed to create group", "error");
    }
  };

  const handleJoinGroupWithCode = async (code: string) => {
    const clean = (code || "").trim().toUpperCase();
    if (!clean) return showToastMessage("Enter a valid group code", "error");

    try {
      const res = await axiosInstance.post("/student-groups/join", { joinCode: clean });
      const group = res.data;
      setCurrentGroupId(group._id);
      setGroupName(group.name);
      setGroupMembers(group.members || []);
      setView("dashboard");
      socket.emit("joinGroup", group._id);
      showToastMessage(`Joined group: ${group.name}`, "success");
    } catch {
      showToastMessage("Failed to join group", "error");
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentGroupId) return;

    const localmessage: ChatMessage = {
      sender: "You",
      message: newMessage.trim(),
      timestamp: new Date(),
      isSelf: true,
    };

    setChatMessages((prev) => [...prev, localmessage]);

    socket.emit("sendMessage", {
      groupId: currentGroupId,
      message: newMessage.trim(),
    });

    setNewMessage("");
  };

  const handleUploadFile = async () => {
    if (!selectedFile || !currentGroupId) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axiosInstance.post(`/student-groups/${currentGroupId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFiles((prev) => [...prev, res.data]);
      setSelectedFile(null);
      showToastMessage("File uploaded!", "success");
    } catch {
      showToastMessage("File upload failed", "error");
    }
  };

  const handleInviteMember = async (groupId: string) => {
    if (!groupId) return showToastMessage("Open a group first", "error");
    try {
      const res = await axiosInstance.post(`/student-groups/${groupId}/invite`, { email: inviteEmail || undefined });
      const linkFromApi = res.data?.link as string | undefined;
      const codeFromApi = res.data?.joinCode as string | undefined;

      const link = linkFromApi
        ? linkFromApi
        : `${window.location.origin}/groupstudy?code=${(codeFromApi || "").toUpperCase()}`;

      setShareableLink(link);
      if (link) {
        try {
          await navigator.clipboard.writeText(link);
        } catch {}
      }
      setInviteEmail("");
      showToastMessage("Invite ready! Link copied to clipboard", "success");
    } catch {
      showToastMessage("Failed to send invite", "error");
    }
  };

  const formatTime = (date: Date | string) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ----- Render -----

  return (
    <div className="p-6">
      {/* Join / Create */}
      {view === "join" && (
        <div className="flex gap-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoinGroupWithCode(groupCode);
            }}
            className="flex gap-2 items-end"
          >
            <Input
              id="groupCode"
              label="Group Code"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
              placeholder="Group Code"
            />
            <Button type="submit">Join</Button>
          </form>

          <form onSubmit={handleCreateGroup} className="flex gap-2 items-end">
            <Input
              id="groupName"
              label="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group Name"
            />
            <Button type="submit">Create</Button>
          </form>
        </div>
      )}

      {/* Dashboard */}
      {view === "dashboard" && (
        <div className="flex gap-4">
          {/* Sidebar Members */}
          <div className="w-64 bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">{groupName || "Group"}</h3>
            <ul className="space-y-1">
              {groupMembers.map((m) => (
                <li key={m._id}>
                  {m.name} <span className="text-xs text-gray-500">({m.status})</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" onClick={() => setShowInviteModal(true)} className="mt-3 flex items-center">
              <Plus className="h-4 w-4 mr-1" /> Invite Members
            </Button>
          </div>

          {/* Main Tabs */}
          <div className="flex-1 flex flex-col">
            <div className="flex border-b">
              {(["chat", "files", "quiz"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${
                    activeTab === tab ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === "chat" && (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto mb-2 space-y-3">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={msg.isSelf ? "text-right" : "text-left"}>
                        {!msg.isSelf && <p className="font-semibold">{msg.sender}</p>}
                        <p>{msg.message}</p>
                        <p className="text-xs text-gray-500">{formatTime(msg.timestamp)}</p>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 border rounded px-2 py-2"
                      placeholder="Type a message..."
                    />
                    <Button type="submit">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === "files" && (
                <div>
                  <div className="flex gap-2 mb-3 items-center">
                    <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    <Button onClick={handleUploadFile}>Upload</Button>
                  </div>
                  <ul className="space-y-2">
                    {files.map((f: any) => (
                      <li key={f._id}>
                        <a href={f.fileUrl} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                          {f.filename || f.originalName || "File"}
                        </a>
                      </li>
                    ))}
                    {files.length === 0 && <li className="text-sm text-gray-500">No files yet.</li>}
                  </ul>
                </div>
              )}

              {activeTab === "quiz" && (
                <div>
                  {quizzes.map((quiz: any) => (
                    <div key={quiz._id} className="mb-4 p-3 border rounded">
                      <h4 className="font-semibold">{quiz.title}</h4>
                      {(quiz.questions || []).map((q: any, idx: number) => (
                        <div key={idx} className="my-2">
                          <p>
                            {idx + 1}. {q.question}
                          </p>
                          {(q.options || []).map((opt: string, i: number) => (
                            <label key={i} className="block">
                              <input type="radio" name={`${quiz._id}-${idx}`} value={opt} /> {opt}
                            </label>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                  {quizzes.length === 0 && <p className="text-sm text-gray-500">No quizzes yet.</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Invite Member</h3>
            <Input
              id="inviteEmail"
              label="Friend's Email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Friend's Email"
            />

            {shareableLink && (
              <div className="mt-4 flex flex-col gap-2">
                <Input
                  id="shareLink"
                  label="Shareable Link"
                  value={shareableLink}
                  readOnly
                  placeholder="Shareable link"
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => navigator.clipboard.writeText(shareableLink)}>
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareableLink)}`, "_blank")}
                  >
                    Share on WhatsApp
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleInviteMember(currentGroupId)}>Send Invite</Button>
            </div>
          </div>
        </div>
      )}

      {showToast && <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default GroupStudyPage;
