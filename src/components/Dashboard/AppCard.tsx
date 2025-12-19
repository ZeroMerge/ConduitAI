import React from 'react';
import type { App } from '../../types';

interface AppCardProps {
  app: App;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="text-4xl">{app.logo}</div>
        <div className="flex items-center">
          <div
            className={`w-2 h-2 rounded-full ${
              app.connected ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        </div>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{app.name}</h3>
      <p className="text-sm text-gray-500 mb-3">
        Last synced: {app.lastSynced}
      </p>
      <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
        Manage →
      </button>
    </div>
  );
};

export default AppCard;
