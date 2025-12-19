import React from 'react';
import type { App } from '../../types';
import AppCard from './AppCard';

interface ConnectedAppsProps {
  apps: App[];
}

const ConnectedApps: React.FC<ConnectedAppsProps> = ({ apps }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Connected Apps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default ConnectedApps;
