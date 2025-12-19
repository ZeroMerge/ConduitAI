import React from 'react';
import type { ActivityItem } from '../types';

interface RecentActivityFeedProps {
  activities: ActivityItem[];
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.text}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
            {index < activities.length - 1 && (
              <div className="absolute left-5 w-0.5 h-full bg-gray-200 -z-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;
