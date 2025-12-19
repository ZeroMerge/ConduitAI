/**
 * Manual tests for the Zustand store
 * 
 * Run these tests to validate the store functionality.
 * Since there's no test framework yet, these are structured as assertions.
 */

import { useAppStore } from './store.js';
import type { User, Workflow, ChatMessage } from './types.js';

// Helper to assert equality
function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ ${message}`);
}

// Reset store state before tests
function resetStore(): void {
  const store = useAppStore.getState();
  useAppStore.setState({
    user: null,
    workflows: [],
    activeWorkflow: null,
    connectedApps: [],
    chatHistory: [],
    isAIThinking: false,
    sidebarOpen: true,
    theme: 'light',
  });
}

// Test 1: User management
function testUserManagement(): void {
  console.log('\nTest 1: User Management');
  resetStore();
  
  const testUser: User = {
    id: 'test-user-1',
    email: 'test@example.com',
    name: 'Test User',
  };
  
  useAppStore.getState().setUser(testUser);
  const currentUser = useAppStore.getState().user;
  
  assert(currentUser !== null, 'User should be set');
  assert(currentUser?.id === testUser.id, 'User ID should match');
  assert(currentUser?.email === testUser.email, 'User email should match');
  assert(currentUser?.name === testUser.name, 'User name should match');
}

// Test 2: Workflow management
function testWorkflowManagement(): void {
  console.log('\nTest 2: Workflow Management');
  resetStore();
  
  const workflow1: Workflow = {
    id: 'workflow-1',
    name: 'Test Workflow 1',
    description: 'First test workflow',
    steps: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };
  
  const workflow2: Workflow = {
    id: 'workflow-2',
    name: 'Test Workflow 2',
    description: 'Second test workflow',
    steps: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: false,
  };
  
  // Add workflows
  useAppStore.getState().addWorkflow(workflow1);
  useAppStore.getState().addWorkflow(workflow2);
  
  let workflows = useAppStore.getState().workflows;
  assert(workflows.length === 2, 'Should have 2 workflows');
  
  // Update workflow
  useAppStore.getState().updateWorkflow('workflow-1', {
    name: 'Updated Workflow 1',
    isActive: false,
  });
  
  workflows = useAppStore.getState().workflows;
  const updatedWorkflow = workflows.find(w => w.id === 'workflow-1');
  
  assert(updatedWorkflow?.name === 'Updated Workflow 1', 'Workflow name should be updated');
  assert(updatedWorkflow?.isActive === false, 'Workflow isActive should be updated');
}

// Test 3: App connections
async function testAppConnections(): Promise<void> {
  console.log('\nTest 3: App Connections');
  resetStore();
  
  // Connect apps
  await useAppStore.getState().connectApp('gmail');
  await useAppStore.getState().connectApp('slack');
  
  let connectedApps = useAppStore.getState().connectedApps;
  assert(connectedApps.length === 2, 'Should have 2 connected apps');
  
  // Test duplicate prevention
  await useAppStore.getState().connectApp('gmail');
  connectedApps = useAppStore.getState().connectedApps;
  assert(connectedApps.length === 2, 'Should still have 2 apps (duplicate prevented)');
  
  // Test app name mapping
  const gmailApp = connectedApps.find(app => app.appId === 'gmail');
  assert(gmailApp?.appName === 'Gmail', 'Gmail should have friendly name');
  
  const slackApp = connectedApps.find(app => app.appId === 'slack');
  assert(slackApp?.appName === 'Slack', 'Slack should have friendly name');
  
  // Disconnect app
  useAppStore.getState().disconnectApp('gmail');
  connectedApps = useAppStore.getState().connectedApps;
  assert(connectedApps.length === 1, 'Should have 1 connected app after disconnect');
  assert(connectedApps[0].appId === 'slack', 'Remaining app should be Slack');
}

// Test 4: Chat history
function testChatHistory(): void {
  console.log('\nTest 4: Chat History');
  resetStore();
  
  const message1: ChatMessage = {
    id: 'msg-1',
    role: 'user',
    content: 'Hello',
    timestamp: new Date(),
  };
  
  const message2: ChatMessage = {
    id: 'msg-2',
    role: 'assistant',
    content: 'Hi there!',
    timestamp: new Date(),
  };
  
  useAppStore.getState().addMessage(message1);
  useAppStore.getState().addMessage(message2);
  
  const chatHistory = useAppStore.getState().chatHistory;
  assert(chatHistory.length === 2, 'Should have 2 messages');
  assert(chatHistory[0].id === message1.id, 'First message should match');
  assert(chatHistory[1].id === message2.id, 'Second message should match');
}

// Test 5: AI thinking state
function testAIThinkingState(): void {
  console.log('\nTest 5: AI Thinking State');
  resetStore();
  
  assert(useAppStore.getState().isAIThinking === false, 'Initially should not be thinking');
  
  useAppStore.getState().setIsAIThinking(true);
  assert(useAppStore.getState().isAIThinking === true, 'Should be thinking after set to true');
  
  useAppStore.getState().setIsAIThinking(false);
  assert(useAppStore.getState().isAIThinking === false, 'Should not be thinking after set to false');
}

// Test 6: UI state
function testUIState(): void {
  console.log('\nTest 6: UI State');
  resetStore();
  
  // Sidebar
  assert(useAppStore.getState().sidebarOpen === true, 'Sidebar should be open initially');
  
  useAppStore.getState().toggleSidebar();
  assert(useAppStore.getState().sidebarOpen === false, 'Sidebar should be closed after toggle');
  
  useAppStore.getState().toggleSidebar();
  assert(useAppStore.getState().sidebarOpen === true, 'Sidebar should be open after second toggle');
  
  // Theme
  assert(useAppStore.getState().theme === 'light', 'Theme should be light initially');
  
  useAppStore.getState().toggleTheme();
  assert(useAppStore.getState().theme === 'dark', 'Theme should be dark after toggle');
  
  useAppStore.getState().toggleTheme();
  assert(useAppStore.getState().theme === 'light', 'Theme should be light after second toggle');
}

// Run all tests
async function runAllTests(): Promise<void> {
  console.log('=== Running Zustand Store Tests ===');
  
  try {
    testUserManagement();
    testWorkflowManagement();
    await testAppConnections();
    testChatHistory();
    testAIThinkingState();
    testUIState();
    
    console.log('\n=== All Tests Passed! ===');
  } catch (error) {
    console.error('\n=== Test Failed! ===');
    console.error(error);
    process.exit(1);
  }
}

// Export for potential use in other test runners
export { runAllTests };

// Run tests when file is executed directly
runAllTests();
