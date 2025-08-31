import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  onClose, 
  duration = 3000 
}) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Allow fade-out animation to complete
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  
  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'info':
        return 'bg-blue-50';
      default:
        return 'bg-white';
    }
  };
  
  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-200';
      case 'error':
        return 'border-red-200';
      case 'info':
        return 'border-blue-200';
      default:
        return 'border-gray-200';
    }
  };
  
  return (
    <div 
      className={`fixed top-4 right-4 flex items-center p-4 rounded-lg shadow-lg border ${getBgColor()} ${getBorderColor()} transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      role="alert"
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="ml-3 mr-8 text-sm font-medium">
        {message}
      </div>
      <button 
        type="button" 
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-900"
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;