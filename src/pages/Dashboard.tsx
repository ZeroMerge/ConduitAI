import React, { useState } from 'react';
import WelcomeHeader from '../components/Dashboard/WelcomeHeader';
import ConnectedApps from '../components/Dashboard/ConnectedApps';
import ActiveWorkflows from '../components/Dashboard/ActiveWorkflows';
import QuickActions from '../components/Dashboard/QuickActions';
import RecentActivity from '../components/Dashboard/RecentActivity';
import EmptyState from '../components/Dashboard/EmptyState';
import { mockApps, mockWorkflows, mockActivities } from '../utils/mockData';
import type { Workflow } from '../types';

const Dashboard: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [showEmptyState] = useState(false);

  const handleToggleWorkflow = (id: string) => {
    setWorkflows((prevWorkflows) =>
      prevWorkflows.map((workflow) =>
        workflow.id === id
          ? { ...workflow, active: !workflow.active }
          : workflow
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHeader userName="Alex" />

        <div className="mt-8">
          {showEmptyState ? (
            <EmptyState />
          ) : (
            <>
              <ConnectedApps apps={mockApps} />
              <ActiveWorkflows
                workflows={workflows}
                onToggle={handleToggleWorkflow}
              />
              <RecentActivity activities={mockActivities} />
            </>
          )}
        </div>

        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
