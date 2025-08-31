// import React from 'react';
// import { BookOpen, Users, Brain, BarChart3, CheckCircle, Target } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Button from '../../components/Button';
// import { Link } from '../../components/Link';

// const FloatingElement = ({ children, delay = 0, duration = 4, scale = 1 }) => (
//   <motion.div
//     initial={{ y: 0, rotate: 0, scale }}
//     animate={{ 
//       y: [-20, 20, -20],
//       rotate: [-5, 5, -5],
//     }}
//     transition={{
//       duration,
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay,
//     }}
//   >
//     {children}
//   </motion.div>
// );

// const TeacherHomePage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#06142E] to-[#1B3B6F] relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <FloatingElement delay={0} duration={5}>
//           <Users className="absolute top-20 left-20 w-16 h-16 text-white/10" />
//         </FloatingElement>
//         <FloatingElement delay={0.8} duration={4.5}>
//           <Brain className="absolute top-40 right-32 w-20 h-20 text-white/10" />
//         </FloatingElement>
//         <FloatingElement delay={1.2} duration={5.5}>
//           <BarChart3 className="absolute bottom-32 left-1/4 w-24 h-24 text-white/10" />
//         </FloatingElement>
//         <FloatingElement delay={0.5} duration={4.8}>
//           <CheckCircle className="absolute top-1/3 right-1/4 w-16 h-16 text-white/10" />
//         </FloatingElement>
//         <FloatingElement delay={1.5} duration={5.2}>
//           <Target className="absolute bottom-1/4 right-1/3 w-20 h-20 text-white/10" />
//         </FloatingElement>
//         <FloatingElement delay={0.3} duration={4.6}>
//           <BookOpen className="absolute top-1/4 left-1/3 w-16 h-16 text-white/10" />
//         </FloatingElement>
//       </div>

//       {/* Navbar */}
//       <nav className="absolute top-0 left-0 right-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center">
//               <BookOpen className="h-8 w-8 text-white" />
//               <span className="ml-2 text-xl font-bold text-white">Learnex</span>
//             </div>
//             <div className="hidden md:flex items-center space-x-8">
//               <Link href="/teacher" className="text-white hover:text-indigo-200 transition-colors">
//                 Home
//               </Link>
//               <Link href="/teacher/features" className="text-white hover:text-indigo-200 transition-colors">
//                 Features
//               </Link>
//               <Link href="/pricing" className="text-white hover:text-indigo-200 transition-colors">
//                 Pricing
//               </Link>
//               <Link href="/about" className="text-white hover:text-indigo-200 transition-colors">
//                 About Us
//               </Link>
//               <Link href="/contact" className="text-white hover:text-indigo-200 transition-colors">
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center"
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//             className="mb-8"
//           >
//             <div className="flex items-center justify-center mb-6">
//               <Users className="h-20 w-20 text-white mx-auto" />
//             </div>
//             <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
//               Empower Minds with Learnex
//             </h1>
//             <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
//               Teach Smarter with AI-Powered Tools
//             </p>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//             className="flex flex-col sm:flex-row items-center justify-center gap-4"
//           >
//             <Link href="/teacher/login">
//               <Button size="lg" className="bg-white text-[#06142E] hover:bg-indigo-100 min-w-[160px] font-semibold">
//                 Let's Go
//               </Button>
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default TeacherHomePage;
// import { useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import { 
//   GraduationCap, 
//   Rocket, 
//   PenTool, 
//   Upload, 
//   BarChart3, 
//   Shield,
//   ChevronRight
// } from 'lucide-react';

// function TeacherHomePage() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [teacherName] = useState("Dr. Sarah Johnson"); // Placeholder name

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const handleDashboardClick = () => {
//     console.log("Navigating to /teacher/dashboard");
//     // In a real app, this would use React Router
//     alert("Navigating to Teacher Dashboard...");
//   };

//   const features = [
//     {
//       icon: PenTool,
//       title: "Create Exams",
//       description: "Build & assign tests to students",
//       gradient: "from-blue-500 to-purple-600"
//     },
//     {
//       icon: Upload,
//       title: "Upload Notes",
//       description: "Share important study resources",
//       gradient: "from-green-500 to-teal-600"
//     },
//     {
//       icon: BarChart3,
//       title: "Track Responses",
//       description: "Monitor student submissions & feedback",
//       gradient: "from-orange-500 to-red-600"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-[#0B1039] relative">
//       {/* Main Content */}
//       <div className="relative z-10 container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center items-center mb-4">
//             <GraduationCap className="text-white w-12 h-12 mr-3" />
//             <h1 className="text-2xl font-bold text-white">Learnex</h1>
//           </div>
//         </div>

//         {/* Welcome Banner */}
//         <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
//             Welcome, {teacherName}!
//           </h1>
//           <p className="text-xl md:text-2xl text-blue-200 font-light max-w-2xl mx-auto leading-relaxed">
//             Empower students. Shape futures. Start here.
//           </p>
//         </div>

//         {/* Center CTA Button */}
//         <div className={`text-center mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <button
//             onClick={handleDashboardClick}
//             className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <Rocket className="w-6 h-6 mr-3 relative z-10 group-hover:animate-pulse" />
//             {/* <Link href="/dashboard"><span className="relative z-10">Let's Go to Dashboard</span></Link> */}
//             <Link to="/dashboard">
//   <button className="your-button-class">
//     Let's Go to Dashboard
//   </button>
// </Link>
//             <ChevronRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
//           </button>
//         </div>

//         {/* Features Highlight Section */}
//         <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
//                 <div className="relative z-10">
//                   <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
//                     <feature.icon className="w-full h-full text-white" />
//                   </div>
                  
//                   <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
//                     {feature.title}
//                   </h3>
                  
//                   <p className="text-blue-200 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>

//                 {/* Hover Effect Border */}
//                 <div className="absolute inset-0 rounded-2xl border-2 border-orange-400/0 group-hover:border-orange-400/30 transition-all duration-300"></div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="flex items-center justify-center space-x-2 text-blue-300">
//             <Shield className="w-5 h-5" />
//             <span className="text-sm">Secure access – Learnex Teacher Panel</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TeacherHomePage;
import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Rocket, 
  PenTool, 
  Upload, 
  BarChart3, 
  Shield,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1: Import useNavigate

function TeacherHomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [teacherName] = useState("Dr. Sarah Johnson");

  const navigate = useNavigate(); // ✅ Step 2: Use hook

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDashboardClick = () => {
    navigate('/teacher/dashboard'); // ✅ Step 3: Navigate
  };

  const features = [
    {
      icon: PenTool,
      title: "Create Exams",
      description: "Build & assign tests to students",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Upload,
      title: "Upload Notes",
      description: "Share important study resources",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: BarChart3,
      title: "Track Responses",
      description: "Monitor student submissions & feedback",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B1039] relative">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <GraduationCap className="text-white w-12 h-12 mr-3" />
            <h1 className="text-2xl font-bold text-white">Learnex</h1>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Welcome, {teacherName}!
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 font-light max-w-2xl mx-auto leading-relaxed">
            Empower students. Shape futures. Start here.
          </p>
        </div>

        {/* Center CTA Button */}
        <div className={`text-center mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={handleDashboardClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Rocket className="w-6 h-6 mr-3 relative z-10 group-hover:animate-pulse" />
            <span className="relative z-10">Let's Go to Dashboard</span>
            <ChevronRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Features Section */}
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-blue-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-2 text-blue-300">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Secure access – Learnex Teacher Panel</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherHomePage;
