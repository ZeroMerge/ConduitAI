# Zustand Store Usage Guide

This document provides usage examples for the ConduitAI Zustand state management store.

## Installation

The store uses Zustand with TypeScript support, persistence middleware, and devtools.

## Store Structure

The store manages the following state:

- **User**: Current user information
- **Workflows**: List of workflows and active workflow
- **Connections**: Connected apps and their status
- **Builder**: Chat history and AI thinking state
- **UI**: Sidebar and theme preferences

## Basic Usage

### Importing the Store

```typescript
import { useAppStore } from './store';
```

### Using in React Components

#### User Management

```typescript
function UserProfile() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  const handleLogin = () => {
    setUser({
      id: '123',
      email: 'user@example.com',
      name: 'John Doe',
    });
  };

  return (
    <div>
      {user ? <p>Welcome, {user.name}!</p> : <button onClick={handleLogin}>Login</button>}
    </div>
  );
}
```

#### Workflow Management

```typescript
function WorkflowList() {
  const workflows = useAppStore((state) => state.workflows);
  const addWorkflow = useAppStore((state) => state.addWorkflow);
  const updateWorkflow = useAppStore((state) => state.updateWorkflow);

  const createNewWorkflow = () => {
    const newWorkflow = {
      id: crypto.randomUUID(),
      name: 'New Workflow',
      description: 'A new automation workflow',
      steps: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };
    addWorkflow(newWorkflow);
  };

  const toggleWorkflow = (id: string, isActive: boolean) => {
    updateWorkflow(id, { isActive: !isActive });
  };

  return (
    <div>
      <button onClick={createNewWorkflow}>Create Workflow</button>
      {workflows.map((workflow) => (
        <div key={workflow.id}>
          <h3>{workflow.name}</h3>
          <button onClick={() => toggleWorkflow(workflow.id, workflow.isActive)}>
            {workflow.isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      ))}
    </div>
  );
}
```

#### App Connections

```typescript
function AppConnections() {
  const connectedApps = useAppStore((state) => state.connectedApps);
  const connectApp = useAppStore((state) => state.connectApp);
  const disconnectApp = useAppStore((state) => state.disconnectApp);

  const handleConnect = async (appId: string) => {
    await connectApp(appId);
  };

  return (
    <div>
      <button onClick={() => handleConnect('slack')}>Connect Slack</button>
      <button onClick={() => handleConnect('gmail')}>Connect Gmail</button>
      {connectedApps.map((app) => (
        <div key={app.id}>
          <span>{app.appName} - Connected</span>
          <button onClick={() => disconnectApp(app.appId)}>Disconnect</button>
        </div>
      ))}
    </div>
  );
}
```

#### Chat Builder

```typescript
function ChatBuilder() {
  const chatHistory = useAppStore((state) => state.chatHistory);
  const addMessage = useAppStore((state) => state.addMessage);
  const isAIThinking = useAppStore((state) => state.isAIThinking);
  const setIsAIThinking = useAppStore((state) => state.setIsAIThinking);

  const sendMessage = (content: string) => {
    // Add user message
    addMessage({
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    });

    // Simulate AI processing
    setIsAIThinking(true);
    setTimeout(() => {
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I understand. Let me help you with that.',
        timestamp: new Date(),
      });
      setIsAIThinking(false);
    }, 2000);
  };

  return (
    <div>
      <div>
        {chatHistory.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
        {isAIThinking && <div>AI is thinking...</div>}
      </div>
      <button onClick={() => sendMessage('Create a workflow for me')}>
        Send Message
      </button>
    </div>
  );
}
```

#### UI Controls

```typescript
function AppLayout() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <div className={theme}>
      <button onClick={toggleSidebar}>
        {sidebarOpen ? 'Close' : 'Open'} Sidebar
      </button>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      {sidebarOpen && <aside>Sidebar Content</aside>}
      <main>Main Content</main>
    </div>
  );
}
```

## Advanced Usage

### Using Multiple State Values

```typescript
function Dashboard() {
  // Select multiple values at once
  const { user, workflows, connectedApps } = useAppStore((state) => ({
    user: state.user,
    workflows: state.workflows,
    connectedApps: state.connectedApps,
  }));

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Workflows: {workflows.length}</p>
      <p>Connected Apps: {connectedApps.length}</p>
    </div>
  );
}
```

### Accessing Store Outside React

```typescript
import { useAppStore } from './store';

// Get the current state
const currentState = useAppStore.getState();
console.log(currentState.user);

// Update state imperatively
useAppStore.getState().setUser({
  id: '456',
  email: 'admin@example.com',
  name: 'Admin User',
});

// Subscribe to state changes
const unsubscribe = useAppStore.subscribe((state) => {
  console.log('State changed:', state);
});

// Later, unsubscribe
unsubscribe();
```

## Features

### Persistence

The store automatically persists the following to localStorage:
- User information
- Workflows
- Connected apps
- Theme preference
- Sidebar state

Chat history and AI thinking state are **not** persisted and will reset on page reload.

### DevTools

The store is integrated with Redux DevTools for debugging. You can:
- Inspect state changes
- Time-travel through state history
- See action names for each state change

### TypeScript Support

The store is fully typed with TypeScript, providing:
- Type inference for state values
- Type checking for actions
- IntelliSense support in your IDE

## Best Practices

1. **Use selectors**: Select only the state you need to avoid unnecessary re-renders
   ```typescript
   const userName = useAppStore((state) => state.user?.name);
   ```

2. **Avoid selecting the entire store**: This will cause re-renders on every state change
   ```typescript
   // ❌ Bad
   const store = useAppStore();
   
   // ✅ Good
   const user = useAppStore((state) => state.user);
   ```

3. **Use shallow equality for objects**: When selecting multiple values
   ```typescript
   import { shallow } from 'zustand/shallow';
   
   const { user, theme } = useAppStore(
     (state) => ({ user: state.user, theme: state.theme }),
     shallow
   );
   ```

4. **Keep actions simple**: Complex logic should be in separate functions
   ```typescript
   async function createComplexWorkflow() {
     const { addWorkflow, connectApp } = useAppStore.getState();
     
     // Complex logic here
     await connectApp('slack');
     addWorkflow(/* ... */);
   }
   ```
