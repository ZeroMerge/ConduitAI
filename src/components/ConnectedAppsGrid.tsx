import React from 'react';
import type { ConnectedApp } from '../types';

interface ConnectedAppsGridProps {
  apps: ConnectedApp[];
}

const ConnectedAppsGrid: React.FC<ConnectedAppsGridProps> = ({ apps }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {apps.map((app) => (
        <div
          key={app.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="text-4xl mr-3">{app.logo}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{app.name}</h3>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      app.isConnected ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  ></span>
                  <span className="text-sm text-gray-600">
                    {app.isConnected ? 'Connected' : 'Not connected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500 mb-3">
            Last synced: {app.lastSynced}
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Manage →
          </button>
        </div>
      ))}
    </div>
  );
};

export default ConnectedAppsGrid;
