import React, { useState } from 'react';
import WelcomeHeader from './WelcomeHeader';
import ConnectedAppsGrid from './ConnectedAppsGrid';
import ActiveWorkflows from './ActiveWorkflows';
import QuickActionsBar from './QuickActionsBar';
import RecentActivityFeed from './RecentActivityFeed';
import EmptyState from './EmptyState';
import type { Workflow, ConnectedApp, ActivityItem } from '../types';

const Dashboard: React.FC = () => {
  // Sample data - in a real app, this would come from an API
  // Set to true to show the dashboard, false to show the empty state
  const [hasWorkflows, setHasWorkflows] = useState(true);
  const userName = "Sarah";
  
  const connectedApps: ConnectedApp[] = [
    {
      id: '1',
      name: 'Gmail',
      logo: '📧',
      isConnected: true,
      lastSynced: '2 min ago'
    },
    {
      id: '2',
      name: 'Notion',
      logo: '📝',
      isConnected: true,
      lastSynced: '5 min ago'
    },
    {
      id: '3',
      name: 'Slack',
      logo: '💬',
      isConnected: true,
      lastSynced: '1 min ago'
    },
    {
      id: '4',
      name: 'Calendly',
      logo: '📅',
      isConnected: false,
      lastSynced: 'Never'
    },
    {
      id: '5',
      name: 'Stripe',
      logo: '💳',
      isConnected: true,
      lastSynced: '10 min ago'
    },
    {
      id: '6',
      name: 'Google Sheets',
      logo: '📊',
      isConnected: true,
      lastSynced: '3 min ago'
    }
  ];

  const workflows: Workflow[] = [
    {
      id: '1',
      name: 'New Client Onboarding',
      description: 'Automatically create project folder and send welcome email when new client books',
      trigger: 'calendly',
      actions: ['notion', 'gmail', 'sheets'],
      isActive: true,
      timeSavedPerWeek: 3.5
    },
    {
      id: '2',
      name: 'Invoice Automation',
      description: 'Generate and send invoice when project status changes to complete',
      trigger: 'notion',
      actions: ['stripe', 'gmail'],
      isActive: true,
      timeSavedPerWeek: 2.0
    },
    {
      id: '3',
      name: 'Meeting Notes Sync',
      description: 'Create Notion page from meeting calendar events',
      trigger: 'calendar',
      actions: ['notion', 'slack'],
      isActive: false,
      timeSavedPerWeek: 1.5
    },
    {
      id: '4',
      name: 'Client Payment Tracking',
      description: 'Update spreadsheet when payment received via Stripe',
      trigger: 'stripe',
      actions: ['sheets', 'slack'],
      isActive: true,
      timeSavedPerWeek: 1.2
    }
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      text: "Workflow 'New Client Onboarding' triggered",
      time: '9:30 AM'
    },
    {
      id: '2',
      text: 'Invoice sent to Acme Co',
      time: '9:15 AM'
    },
    {
      id: '3',
      text: 'Calendar event created for Sarah Johnson',
      time: '8:45 AM'
    },
    {
      id: '4',
      text: 'Notion page updated: Q4 Projects',
      time: '8:30 AM'
    },
    {
      id: '5',
      text: "Payment received from Tech Startup Inc",
      time: 'Yesterday at 5:20 PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {hasWorkflows ? (
        <>
          <WelcomeHeader userName={userName} hoursSaved={24.5} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Connected Apps Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Connected Apps</h2>
              <ConnectedAppsGrid apps={connectedApps} />
            </section>

            {/* Active Workflows Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Workflows</h2>
              <ActiveWorkflows workflows={workflows} />
            </section>

            {/* Recent Activity Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <RecentActivityFeed activities={recentActivity} />
            </section>
          </div>

          <QuickActionsBar />
        </>
      ) : (
        <EmptyState onGetStarted={() => setHasWorkflows(true)} />
      )}
    </div>
  );
};

export default Dashboard;
