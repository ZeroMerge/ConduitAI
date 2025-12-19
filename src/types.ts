// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Workflow types
export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface WorkflowStep {
  id: string;
  type: string;
  config: Record<string, any>;
  order: number;
}

// Connection types
export interface AppConnection {
  id: string;
  appId: string;
  appName: string;
  isConnected: boolean;
  connectedAt?: Date;
  credentials?: Record<string, any>;
}

// Chat/Builder types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}
