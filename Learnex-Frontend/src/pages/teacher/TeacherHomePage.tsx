import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Rocket, 
  PenTool, 
  Upload, 
  BarChart3, 
  Shield,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TeacherHomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [teacherName] = useState("Dr. Sarah Johnson");

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDashboardClick = () => {
    navigate('/teacher/dashboard');
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
