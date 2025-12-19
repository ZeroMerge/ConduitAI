/**
 * Example usage of the ConduitAI Zustand store
 * 
 * This file demonstrates how to use the store in a non-React context.
 * For React component examples, see STORE_USAGE.md
 */

import { useAppStore } from './store';
import type { User, Workflow, ChatMessage } from './types';

// Example 1: Setting a user
console.log('Example 1: Setting a user');
const user: User = {
  id: 'user-123',
  email: 'demo@conduitai.com',
  name: 'Demo User',
  avatar: 'https://example.com/avatar.jpg',
};

useAppStore.getState().setUser(user);
console.log('Current user:', useAppStore.getState().user);

// Example 2: Adding workflows
console.log('\nExample 2: Adding workflows');
const workflow: Workflow = {
  id: 'workflow-1',
  name: 'Email to Slack Notification',
  description: 'Forward important emails to Slack channel',
  steps: [
    {
      id: 'step-1',
      type: 'gmail-trigger',
      config: { filter: 'is:important' },
      order: 1,
    },
    {
      id: 'step-2',
      type: 'slack-action',
      config: { channel: '#notifications' },
      order: 2,
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
};

useAppStore.getState().addWorkflow(workflow);
console.log('Workflows:', useAppStore.getState().workflows);

// Example 3: Connecting apps
console.log('\nExample 3: Connecting apps');
async function connectApps() {
  await useAppStore.getState().connectApp('gmail');
  await useAppStore.getState().connectApp('slack');
  console.log('Connected apps:', useAppStore.getState().connectedApps);
}

connectApps();

// Example 4: Chat interaction
console.log('\nExample 4: Chat interaction');
const message: ChatMessage = {
  id: 'msg-1',
  role: 'user',
  content: 'Create a workflow that sends my calendar events to Slack',
  timestamp: new Date(),
};

useAppStore.getState().addMessage(message);
useAppStore.getState().setIsAIThinking(true);

// Simulate AI response
setTimeout(() => {
  const aiResponse: ChatMessage = {
    id: 'msg-2',
    role: 'assistant',
    content: 'I can help you with that! Let me create a workflow that connects your calendar to Slack.',
    timestamp: new Date(),
  };
  
  useAppStore.getState().addMessage(aiResponse);
  useAppStore.getState().setIsAIThinking(false);
  console.log('Chat history:', useAppStore.getState().chatHistory);
}, 1000);

// Example 5: UI state management
console.log('\nExample 5: UI state management');
console.log('Theme:', useAppStore.getState().theme);
console.log('Sidebar open:', useAppStore.getState().sidebarOpen);

useAppStore.getState().toggleTheme();
console.log('Theme after toggle:', useAppStore.getState().theme);

useAppStore.getState().toggleSidebar();
console.log('Sidebar after toggle:', useAppStore.getState().sidebarOpen);

// Example 6: Updating a workflow
console.log('\nExample 6: Updating a workflow');
useAppStore.getState().updateWorkflow('workflow-1', {
  isActive: false,
  description: 'Updated: Forward important emails to Slack channel',
});
console.log('Updated workflow:', useAppStore.getState().workflows[0]);

// Example 7: Subscribe to state changes
console.log('\nExample 7: Subscribing to state changes');
const unsubscribe = useAppStore.subscribe((state: any) => {
  console.log('State changed! Current workflow count:', state.workflows.length);
});

// Add another workflow to trigger the subscription
const workflow2: Workflow = {
  id: 'workflow-2',
  name: 'Calendar Sync',
  description: 'Sync Google Calendar with Notion',
  steps: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
};

useAppStore.getState().addWorkflow(workflow2);

// Clean up subscription after 2 seconds
setTimeout(() => {
  unsubscribe();
  console.log('\nUnsubscribed from state changes');
}, 2000);

// Example 8: Disconnect an app
setTimeout(() => {
  console.log('\nExample 8: Disconnecting an app');
  useAppStore.getState().disconnectApp('gmail');
  console.log('Connected apps after disconnect:', useAppStore.getState().connectedApps);
}, 1500);

console.log('\n✅ All examples queued for execution');
console.log('Note: Some examples use setTimeout and will complete asynchronously');
