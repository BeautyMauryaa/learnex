// // import React from 'react';
// // import { Clock, Calendar, AlertCircle, CheckCircle, XCircle, Shield, Users } from 'lucide-react';
// // import Button from '../../components/Button';

// // const exams = [
// //   {
// //     id: 1,
// //     subject: 'Mathematics',
// //     topic: 'Mid-term Examination',
// //     date: '2024-03-15',
// //     time: '10:00 AM',
// //     duration: '3 hours',
// //     status: 'upcoming',
// //     type: 'Mid-term',
// //     examCode: 'MATH2024MT',
// //     totalMarks: 100,
// //     instructor: 'Dr. Smith'
// //   },
// //   {
// //     id: 2,
// //     subject: 'Physics',
// //     topic: 'Unit Test - Mechanics',
// //     date: '2024-03-18',
// //     time: '2:00 PM',
// //     duration: '2 hours',
// //     status: 'live',
// //     type: 'Unit Test',
// //     examCode: 'PHY2024UT1',
// //     totalMarks: 50,
// //     instructor: 'Prof. Johnson'
// //   },
// //   {
// //     id: 3,
// //     subject: 'Chemistry',
// //     topic: 'Final Examination',
// //     date: '2024-03-10',
// //     time: '11:00 AM',
// //     duration: '3 hours',
// //     status: 'completed',
// //     score: '85/100',
// //     type: 'Final',
// //     examCode: 'CHEM2024FE',
// //     totalMarks: 100,
// //     instructor: 'Dr. Wilson'
// //   },
// //   {
// //     id: 4,
// //     subject: 'Biology',
// //     topic: 'Quarterly Assessment',
// //     date: '2024-03-20',
// //     time: '9:00 AM',
// //     duration: '2.5 hours',
// //     status: 'upcoming',
// //     type: 'Assessment',
// //     examCode: 'BIO2024QA',
// //     totalMarks: 75,
// //     instructor: 'Dr. Brown'
// //   }
// // ];

// // const ExamsPage: React.FC = () => {
// //   return (
// //     <div className="p-6">
// //       <div className="mb-8">
// //         <h1 className="text-2xl font-bold text-gray-900">My Exams</h1>
// //         <p className="text-gray-600 flex items-center mt-2">
// //           <Shield className="h-4 w-4 mr-2 text-indigo-600" />
// //           These are official exams assigned by your institution. Please use your registration number or exam code to join.
// //         </p>
// //       </div>

// //       {/* Live Exam Alert */}
// //       {exams.some(exam => exam.status === 'live') && (
// //         <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
// //           <div className="flex items-start">
// //             <div className="flex-shrink-0">
// //               <AlertCircle className="h-6 w-6 text-green-500" />
// //             </div>
// //             <div className="ml-4 flex-1">
// //               <h3 className="text-lg font-semibold text-green-800 mb-2">
// //                 🔴 Live Exam Available!
// //               </h3>
// //               <div className="text-green-700 mb-4">
// //                 <p className="font-medium">Physics - Unit Test - Mechanics</p>
// //                 <p className="text-sm">Exam Code: PHY2024UT1 | Duration: 2 hours</p>
// //                 <p className="text-sm mt-1">⚠️ This exam may be monitored via webcam and microphone</p>
// //               </div>
// //               <Button className="bg-green-600 hover:bg-green-700 text-white">
// //                 <CheckCircle className="h-4 w-4 mr-2" />
// //                 Join Exam Now
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Exam Cards */}
// //       <div className="grid grid-cols-1 gap-6">
// //         {exams.map((exam) => (
// //           <div 
// //             key={exam.id} 
// //             className={`bg-white rounded-xl shadow-sm p-6 border-2 transition-all duration-200 ${
// //               exam.status === 'live' 
// //                 ? 'border-green-200 bg-green-50' 
// //                 : exam.status === 'upcoming'
// //                 ? 'border-indigo-200'
// //                 : 'border-gray-200'
// //             }`}
// //           >
// //             {/* Header */}
// //             <div className="flex items-start justify-between mb-4">
// //               <div className="flex-1">
// //                 <div className="flex items-center mb-2">
// //                   <h3 className="text-xl font-semibold text-gray-900">{exam.subject}</h3>
// //                   <span className={`ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
// //                     exam.status === 'live'
// //                       ? 'bg-green-100 text-green-800'
// //                       : exam.status === 'upcoming'
// //                       ? 'bg-indigo-100 text-indigo-800'
// //                       : 'bg-gray-100 text-gray-800'
// //                   }`}>
// //                     {exam.status === 'live' && <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>}
// //                     {exam.status === 'upcoming' && <Clock className="h-4 w-4 mr-1" />}
// //                     {exam.status === 'completed' && <CheckCircle className="h-4 w-4 mr-1" />}
// //                     {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
// //                   </span>
// //                 </div>
// //                 <p className="text-gray-700 font-medium">{exam.topic}</p>
// //                 <p className="text-sm text-gray-500 mt-1">Instructor: {exam.instructor}</p>
// //               </div>
              
// //               {exam.status === 'completed' && exam.score && (
// //                 <div className="text-right">
// //                   <div className="text-2xl font-bold text-green-600">{exam.score}</div>
// //                   <div className="text-sm text-gray-500">Score</div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Exam Details Grid */}
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// //               <div className="flex items-center">
// //                 <Calendar className="h-5 w-5 text-gray-400 mr-2" />
// //                 <div>
// //                   <p className="text-sm text-gray-500">Date</p>
// //                   <p className="font-medium text-gray-900">{exam.date}</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <Clock className="h-5 w-5 text-gray-400 mr-2" />
// //                 <div>
// //                   <p className="text-sm text-gray-500">Time</p>
// //                   <p className="font-medium text-gray-900">{exam.time}</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <AlertCircle className="h-5 w-5 text-gray-400 mr-2" />
// //                 <div>
// //                   <p className="text-sm text-gray-500">Duration</p>
// //                   <p className="font-medium text-gray-900">{exam.duration}</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <Users className="h-5 w-5 text-gray-400 mr-2" />
// //                 <div>
// //                   <p className="text-sm text-gray-500">Total Marks</p>
// //                   <p className="font-medium text-gray-900">{exam.totalMarks}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Exam Code */}
// //             <div className="bg-gray-50 rounded-lg p-4 mb-6">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm font-medium text-gray-700">Exam Code</p>
// //                   <p className="text-lg font-mono font-bold text-indigo-900">{exam.examCode}</p>
// //                 </div>
// //                 <div className="text-right">
// //                   <p className="text-sm font-medium text-gray-700">Exam Type</p>
// //                   <p className="text-sm text-gray-900">{exam.type}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Proctoring Notice */}
// //             {exam.status !== 'completed' && (
// //               <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
// //                 <div className="flex items-start">
// //                   <Shield className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
// //                   <div>
// //                     <p className="text-sm font-medium text-amber-800">Proctoring Notice</p>
// //                     <p className="text-sm text-amber-700">This exam may be monitored via webcam and microphone for academic integrity.</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Action Buttons */}
// //             <div className="flex gap-4">
// //               {exam.status === 'live' ? (
// //                 <Button className="flex-1 bg-green-600 hover:bg-green-700">
// //                   <CheckCircle className="h-4 w-4 mr-2" />
// //                   Join Exam Now
// //                 </Button>
// //               ) : exam.status === 'upcoming' ? (
// //                 <Button variant="outline" className="flex-1">
// //                   <Calendar className="h-4 w-4 mr-2" />
// //                   View Details
// //                 </Button>
// //               ) : (
// //                 <Button variant="outline" className="flex-1">
// //                   <XCircle className="h-4 w-4 mr-2" />
// //                   View Results
// //                 </Button>
// //               )}
              
// //               {exam.status === 'completed' && (
// //                 <Button variant="outline">
// //                   Download Certificate
// //                 </Button>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* No Exams State */}
// //       {exams.length === 0 && (
// //         <div className="text-center py-12">
// //           <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// //           <h3 className="text-lg font-medium text-gray-900 mb-2">No Exams Scheduled</h3>
// //           <p className="text-gray-500">Your upcoming exams will appear here when scheduled by your instructors.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ExamsPage;







// import React, { useEffect, useRef, useState } from 'react';
// import { Clock, Calendar, AlertCircle, CheckCircle, XCircle, Shield, Users } from 'lucide-react';
// import Button from '../../components/Button';

// interface Exam {
//   id: number;
//   subject: string;
//   topic: string;
//   date: string;
//   time: string;
//   duration: string;
//   status: 'upcoming' | 'live' | 'completed';
//   type: string;
//   examCode: string;
//   totalMarks: number;
//   deadline: string;   // Date aa raha hai backend se
//   instructor: string;
//   score?: string;
// }


// const ExamsPage: React.FC = () => {
//   const [activeExam, setActiveExam] = useState<Exam | null>(null);
//   const [exams, setExams] = useState<Exam[]>([]); // ✅ default empty array
//   const [violations, setViolations] = useState<number>(0);
//   const [warning, setWarning] = useState<string | null>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);



//   useEffect(() => {
//   const fetchExams = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:5000/api/exams", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();

      
// const mappedExams = data.map((exam: any) => {
//   const start = new Date(exam.startTime); // ✅ new field backend se
//   const end = new Date(exam.deadline);
//   const now = new Date();

//   let status: 'upcoming' | 'live' | 'completed' = 'upcoming';
//   if (now >= start && now <= end) {
//     status = 'live';
//   } else if (now > end) {
//     status = 'completed';
//   }

//   return {
//     id: exam._id,
//     subject: exam.title,
//     topic: exam.description || "General",
//     date: start.toLocaleDateString(),
//     time: start.toLocaleTimeString(),
//     duration: `${exam.duration} mins`,
//     status,
//     type: "Online Exam",
//     examCode: exam._id.slice(-6).toUpperCase(), // generate short code from id
//     totalMarks: exam.totalMarks,
//     deadline: exam.deadline,
//     instructor: exam.teacher?.name || "Unknown",
//   };
// });


//       setExams(mappedExams);
//     } catch (err) {
//       console.error("Error fetching exams:", err);
//     }
//   };

//   fetchExams();
// }, []);


  
//   // Start webcam + mic
//   const startProctoring = async (exam: Exam) => {
//     try {
//       setActiveExam(exam);
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       // Send snapshots every 30s
//       setInterval(() => {
//         captureSnapshot(exam.id, stream);
//       }, 30000);
//     } catch (err) {
//       alert("Camera/Mic access denied! Please allow permissions to continue.");
//       console.error(err);
//     }
//   };

//   const MAX_VIOLATIONS = 3;

// const handleViolation = (type: 'tab-switch' | 'window-blur') => {
//   if (!activeExam) return;

//   const newCount = violations + 1;
//   setViolations(newCount);
//   setWarning(`⚠️ ${type === 'tab-switch' ? 'You switched tabs' : 'Window lost focus'}! Violation #${newCount}`);

//   // Send violation to backend
//   fetch('/api/proctor/violation', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ examId: activeExam.id, type, count: newCount })
//   });

//   // Auto-submit if max violations reached
//   if (newCount >= MAX_VIOLATIONS) {
//     autoSubmitExam();
//   }
// };

// const autoSubmitExam = async () => {
//   if (!activeExam) return;

//   setWarning("🚨 Maximum violations reached. Auto-submitting exam...");
  
//   try {
//     await fetch(`/api/exams/${activeExam.id}/submit`, {
//       method: 'POST',
//     });
//     setActiveExam(null); // Close webcam preview
//     alert("Exam has been auto-submitted due to violations.");
//   } catch (err) {
//     console.error("Auto-submit failed:", err);
//     alert("Error auto-submitting exam. Please contact admin.");
//   }
// };



//   // Capture webcam frame and send to backend
//   const captureSnapshot = async (examId: number, stream: MediaStream) => {
//     try {
//       const track = stream.getVideoTracks()[0];
//       if (!track) return;

//       const imageCapture = new ImageCapture(track);
//       const blob = await imageCapture.takePhoto();

//       const formData = new FormData();
//       formData.append("examId", examId.toString());
//       formData.append("snapshot", blob);

//       await fetch("/api/proctor/upload", {
//         method: "POST",
//         body: formData,
//       });
//     } catch (err) {
//       console.error("Snapshot error: ", err);
//     }
//   };

//   // Tab visibility & window focus detection
//   useEffect(() => {
//   const handleVisibilityChange = () => {
//     if (document.hidden) handleViolation('tab-switch');
//     else setWarning(null);
//   };

//   const handleBlur = () => {
//     handleViolation('window-blur');
//   };

//   document.addEventListener('visibilitychange', handleVisibilityChange);
//   window.addEventListener('blur', handleBlur);

//   return () => {
//     document.removeEventListener('visibilitychange', handleVisibilityChange);
//     window.removeEventListener('blur', handleBlur);
//   };
// }, [activeExam, violations]);




//   return (
//     <div className="p-6">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">My Exams</h1>
//         <p className="text-gray-600 flex items-center mt-2">
//           <Shield className="h-4 w-4 mr-2 text-indigo-600" />
//           These are official exams assigned by your institution. Please use your registration number or exam code to join.
//         </p>
//       </div>

//       {/* Live Exam Alert */}
//       {exams.some(exam => exam.status === 'live') && (
//         <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
//           <div className="flex items-start">
//             <div className="flex-shrink-0">
//               <AlertCircle className="h-6 w-6 text-green-500" />
//             </div>
//             <div className="ml-4 flex-1">
//               <h3 className="text-lg font-semibold text-green-800 mb-2">
//                 🔴 Live Exam Available!
//               </h3>
//               <div className="text-green-700 mb-4">
//                 <p className="font-medium">{exams.find(e => e.status === 'live')?.subject} - {exams.find(e => e.status === 'live')?.topic}</p>
//                 <p className="text-sm">Exam Code: {exams.find(e => e.status === 'live')?.examCode} | Duration: {exams.find(e => e.status === 'live')?.duration}</p>
//                 <p className="text-sm mt-1">⚠️ This exam will be monitored via webcam and microphone</p>
//               </div>
//               <Button
//                 className="bg-green-600 hover:bg-green-700 text-white"
//                 onClick={() => startProctoring(exams.find(e => e.status === 'live')!)}
//               >
//                 <CheckCircle className="h-4 w-4 mr-2" />
//                 Join Exam Now
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Exam Cards */}
//       <div className="grid grid-cols-1 gap-6">
//         {exams.map((exam) => (
//           <div 
//             key={exam.id} 
//             className={`bg-white rounded-xl shadow-sm p-6 border-2 transition-all duration-200 ${
//               exam.status === 'live' 
//                 ? 'border-green-200 bg-green-50' 
//                 : exam.status === 'upcoming'
//                 ? 'border-indigo-200'
//                 : 'border-gray-200'
//             }`}
//           >
//             {/* Header */}
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex-1">
//                 <div className="flex items-center mb-2">
//                   <h3 className="text-xl font-semibold text-gray-900">{exam.subject}</h3>
//                   <span className={`ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                     exam.status === 'live'
//                       ? 'bg-green-100 text-green-800'
//                       : exam.status === 'upcoming'
//                       ? 'bg-indigo-100 text-indigo-800'
//                       : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {exam.status === 'live' && <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>}
//                     {exam.status === 'upcoming' && <Clock className="h-4 w-4 mr-1" />}
//                     {exam.status === 'completed' && <CheckCircle className="h-4 w-4 mr-1" />}
//                     {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
//                   </span>
//                 </div>
//                 <p className="text-gray-700 font-medium">{exam.topic}</p>
//                 <p className="text-sm text-gray-500 mt-1">Instructor: {exam.instructor}</p>
//               </div>
              
//               {exam.status === 'completed' && exam.score && (
//                 <div className="text-right">
//                   <div className="text-2xl font-bold text-green-600">{exam.score}</div>
//                   <div className="text-sm text-gray-500">Score</div>
//                 </div>
//               )}
//             </div>

//             {/* Exam Details Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               <div className="flex items-center">
//                 <Calendar className="h-5 w-5 text-gray-400 mr-2" />
//                 <div>
//                   <p className="text-sm text-gray-500">Date</p>
//                   <p className="font-medium text-gray-900">{exam.date}</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="h-5 w-5 text-gray-400 mr-2" />
//                 <div>
//                   <p className="text-sm text-gray-500">Time</p>
//                   <p className="font-medium text-gray-900">{exam.time}</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <AlertCircle className="h-5 w-5 text-gray-400 mr-2" />
//                 <div>
//                   <p className="text-sm text-gray-500">Duration</p>
//                   <p className="font-medium text-gray-900">{exam.duration}</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <Users className="h-5 w-5 text-gray-400 mr-2" />
//                 <div>
//                   <p className="text-sm text-gray-500">Total Marks</p>
//                   <p className="font-medium text-gray-900">{exam.totalMarks}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Exam Code */}
//             <div className="bg-gray-50 rounded-lg p-4 mb-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Exam Code</p>
//                   <p className="text-lg font-mono font-bold text-indigo-900">{exam.examCode}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-700">Exam Type</p>
//                   <p className="text-sm text-gray-900">{exam.type}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Proctoring Notice */}
//             {exam.status !== 'completed' && (
//               <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
//                 <div className="flex items-start">
//                   <Shield className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
//                   <div>
//                     <p className="text-sm font-medium text-amber-800">Proctoring Notice</p>
//                     <p className="text-sm text-amber-700">This exam will be monitored via webcam and microphone for academic integrity.</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex gap-4">
//               {exam.status === 'live' ? (
//                 <Button className="flex-1 bg-green-600 hover:bg-green-700"
//                   onClick={() => startProctoring(exam)}
//                 >
//                   <CheckCircle className="h-4 w-4 mr-2" />
//                   Join Exam Now
//                 </Button>
//               ) : exam.status === 'upcoming' ? (
//                 <Button variant="outline" className="flex-1">
//                   <Calendar className="h-4 w-4 mr-2" />
//                   View Details
//                 </Button>
//               ) : (
//                 <Button variant="outline" className="flex-1">
//                   <XCircle className="h-4 w-4 mr-2" />
//                   View Results
//                 </Button>
//               )}
              
//               {exam.status === 'completed' && (
//                 <Button variant="outline">
//                   Download Certificate
//                 </Button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Warning for tab switch / blur */}
//       {warning && (
//         <div className="fixed top-4 right-4 bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg shadow-lg z-50">
//           {warning}
//         </div>
//       )}

//       {/* Webcam Preview when exam is active */}
//       {activeExam && (
//         <div className="fixed bottom-4 right-4 bg-black p-2 rounded-lg shadow-lg">
//           <video ref={videoRef} autoPlay muted width="220" height="150" className="rounded" />
//         </div>
//       )}

//       {/* No Exams State */}
//       {exams.length === 0 && (
//         <div className="text-center py-12">
//           <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No Exams Scheduled</h3>
//           <p className="text-gray-500">Your upcoming exams will appear here when scheduled by your instructors.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExamsPage;


// src/pages/student/ExamPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Exam {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  totalMarks: number;
  duration: number;
}

const ExamPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/exams"); // ✅ check API base URL
        setExams(res.data);
      } catch (err) {
        console.error("Error fetching exams:", err);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Available Exams</h1>
      {exams.length === 0 ? (
        <p>No exams available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((exam) => (
            <div key={exam._id} className="p-4 border rounded-lg shadow">
              <h2 className="font-semibold text-lg">{exam.title}</h2>
              <p>{exam.description}</p>
              <p><b>Total Marks:</b> {exam.totalMarks}</p>
              <p><b>Duration:</b> {exam.duration} mins</p>
              <p><b>Deadline:</b> {new Date(exam.deadline).toLocaleDateString()}</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                Start Exam
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamPage;
