import React from 'react';

interface WelcomeHeaderProps {
  userName: string;
  hoursSaved: number;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ userName, hoursSaved }) => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-gray-600">{today}</p>
          </div>
          <div className="mt-4 md:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-lg shadow-lg">
            <div className="text-sm font-medium opacity-90">This Month</div>
            <div className="text-2xl font-bold">{hoursSaved} hours saved</div>
            <div className="text-xs opacity-75 mt-1">🚀 Keep up the great work!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
