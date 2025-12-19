import type { App, Workflow, Activity } from '../types';

export const mockApps: App[] = [
  {
    id: '1',
    name: 'Gmail',
    logo: '📧',
    connected: true,
    lastSynced: '2 mins ago',
  },
  {
    id: '2',
    name: 'Notion',
    logo: '📝',
    connected: true,
    lastSynced: '5 mins ago',
  },
  {
    id: '3',
    name: 'Slack',
    logo: '💬',
    connected: true,
    lastSynced: '1 min ago',
  },
  {
    id: '4',
    name: 'Calendly',
    logo: '📅',
    connected: true,
    lastSynced: '10 mins ago',
  },
  {
    id: '5',
    name: 'Stripe',
    logo: '💳',
    connected: false,
    lastSynced: 'Never',
  },
  {
    id: '6',
    name: 'Google Sheets',
    logo: '📊',
    connected: true,
    lastSynced: '3 mins ago',
  },
];

export const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'New Client Onboarding',
    description: 'Automatically create project board and send welcome email',
    trigger: 'Gmail',
    actions: ['Notion', 'Slack'],
    active: true,
    timeSavedPerWeek: '3.5 hours',
  },
  {
    id: '2',
    name: 'Invoice Automation',
    description: 'Generate and send invoices when project is marked complete',
    trigger: 'Notion',
    actions: ['Stripe', 'Gmail'],
    active: true,
    timeSavedPerWeek: '2.0 hours',
  },
  {
    id: '3',
    name: 'Meeting Scheduler',
    description: 'Send calendar invite and prep doc when booking confirmed',
    trigger: 'Calendly',
    actions: ['Google Sheets', 'Slack'],
    active: true,
    timeSavedPerWeek: '1.5 hours',
  },
  {
    id: '4',
    name: 'Payment Tracking',
    description: 'Log payments to spreadsheet and notify team',
    trigger: 'Stripe',
    actions: ['Google Sheets', 'Slack'],
    active: false,
    timeSavedPerWeek: '1.0 hour',
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'workflow_trigger',
    message: "Workflow 'New Client' triggered at 9:30 AM",
    timestamp: '9:30 AM',
  },
  {
    id: '2',
    type: 'action',
    message: 'Invoice sent to Acme Co',
    timestamp: '8:45 AM',
  },
  {
    id: '3',
    type: 'action',
    message: 'Calendar event created',
    timestamp: '8:15 AM',
  },
  {
    id: '4',
    type: 'workflow_trigger',
    message: "Workflow 'Invoice Automation' triggered at 7:30 AM",
    timestamp: '7:30 AM',
  },
  {
    id: '5',
    type: 'action',
    message: 'Project board created in Notion',
    timestamp: '7:00 AM',
  },
];
