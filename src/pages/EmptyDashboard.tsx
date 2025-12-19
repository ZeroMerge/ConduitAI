import React from 'react';
import WelcomeHeader from '../components/Dashboard/WelcomeHeader';
import EmptyState from '../components/Dashboard/EmptyState';
import QuickActions from '../components/Dashboard/QuickActions';

const EmptyDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHeader userName="Alex" />
        <div className="mt-8">
          <EmptyState />
        </div>
        <QuickActions />
      </div>
    </div>
  );
};

export default EmptyDashboard;
