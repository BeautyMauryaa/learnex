import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 ${className}`}>
      <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-indigo-100">
        <Icon className="h-7 w-7 text-indigo-900" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;