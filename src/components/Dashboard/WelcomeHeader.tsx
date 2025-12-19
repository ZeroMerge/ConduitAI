import React from 'react';

interface WelcomeHeaderProps {
  userName?: string;
  timeSavedThisMonth?: number;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ 
  userName = 'Alex',
  timeSavedThisMonth = 24.5
}) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 md:p-8 text-white shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Welcome back, {userName}!
      </h1>
      <p className="text-blue-100 mb-4">{formattedDate}</p>
      <div className="flex items-center space-x-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-semibold">
          You've saved {timeSavedThisMonth} hours this month
        </p>
      </div>
    </div>
  );
};

export default WelcomeHeader;
