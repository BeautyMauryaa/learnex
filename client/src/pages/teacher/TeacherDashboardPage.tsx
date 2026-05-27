import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  ClipboardList,
  FileCheck,
  MessageSquare,
  Users,
  Bell,
  AlertCircle,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface DashboardStats {
  totalExams: number;
  activeStudents: number;
  notesUploaded: number;
  pendingReviews: number;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  meta: string;
  timeAgo: string;
  statusText: string;
  statusColor: string;
}

const TeacherDashboardPage = () => {
  const navigate = useNavigate();

  // Real data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const features = [
    {
      title: "Create Exam",
      description: "Build comprehensive tests and quizzes for assessment",
      icon: FileCheck,
      onClick: () => navigate("/teacher/create-exam"),
    },
    {
      title: "My Exams",
      description: "View and manage all your created examinations",
      icon: ClipboardList,
      onClick: () => navigate("/teacher/my-exams"),
    },
    {
      title: "Upload Notes",
      description: "Share comprehensive study materials with students",
      icon: FileText,
      onClick: () => navigate("/teacher/upload-notes"),
    },
    {
      title: "Quiz Review",
      description: "Review student quiz submissions and provide feedback",
      icon: MessageSquare,
      onClick: () => navigate("/teacher/quiz-review"),
    },
    {
      title: "Group Study",
      description: "Manage group study sessions and collaborations",
      icon: Users,
      onClick: () => navigate("/teacher/group-study"),
    },
    {
      title: "Announcements",
      description: "Send important updates and notifications to students",
      icon: Bell,
      onClick: () => navigate("/teacher/announcements"),
    },
  ];
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Grab the logged-in user profile attributes out of local storage
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const teacherId = userData.id || userData._id;

        if (!token || !teacherId) {
          setError("Session parameters missing. Please log in again.");
          setLoading(false);
          return;
        }

        // Target the precise parameterized database endpoint route
        const response = await fetch(
          `${API_BASE}/api/teacher/${teacherId}/statistics`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            `Server configuration route mismatch error (${response.status})`,
          );
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard metrics.");
        }

        setStats(data.stats);
        setActivities(data.recentActivities || []);
      } catch (err: any) {
        console.error("Teacher Dashboard Fetch Error:", err);
        setError(
          err.message ||
            "Unable to establish connection with server components.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#14213D] font-medium bg-gray-50">
        Loading teacher operations matrix...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto my-12 bg-red-50 border border-red-200 rounded-xl text-center shadow-sm">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
        <p className="text-red-700 font-medium mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#14213D] text-white rounded-lg text-sm"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Map real data values safely to display blocks
  const statItems = [
    {
      label: "Total Exams",
      value: stats?.totalExams ?? 0,
      color: "text-blue-600",
    },
    {
      label: "Active Students",
      value: stats?.activeStudents ?? 0,
      color: "text-green-600",
    },
    {
      label: "Notes Uploaded",
      value: stats?.notesUploaded ?? 0,
      color: "text-purple-600",
    },
    {
      label: "Pending Reviews",
      value: stats?.pendingReviews ?? 0,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#14213D] mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Manage your educational content and interact with
            students.
          </p>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statItems.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                onClick={feature.onClick}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#14213D] p-3 rounded-lg">
                    <IconComponent className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#14213D] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Dynamic Recent Activity Log */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-[#14213D] mb-4">
            Recent Activity
          </h2>
          <div className="space-y-1 divide-y divide-gray-100">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.meta} — {activity.timeAgo}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium ${activity.statusColor}`}
                  >
                    {activity.statusText}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic py-4">
                No recent educational log metrics found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
