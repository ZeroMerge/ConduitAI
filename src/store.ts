import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { User, Workflow, AppConnection, ChatMessage } from './types';

export interface AppState {
  // User
  user: User | null;
  setUser: (user: User) => void;
  
  // Workflows
  workflows: Workflow[];
  activeWorkflow: Workflow | null;
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  
  // Connections
  connectedApps: AppConnection[];
  connectApp: (appId: string) => Promise<void>;
  disconnectApp: (appId: string) => void;
  
  // Builder
  chatHistory: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  isAIThinking: boolean;
  setIsAIThinking: (thinking: boolean) => void;
  
  // UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // User state
        user: null,
        setUser: (user) => set({ user }, false, 'setUser'),
        
        // Workflows state
        workflows: [],
        activeWorkflow: null,
        addWorkflow: (workflow) => 
          set(
            (state) => ({ 
              workflows: [...state.workflows, workflow] 
            }),
            false,
            'addWorkflow'
          ),
        updateWorkflow: (id, updates) =>
          set(
            (state) => ({
              workflows: state.workflows.map((w) =>
                w.id === id ? { ...w, ...updates } : w
              ),
              activeWorkflow:
                state.activeWorkflow?.id === id
                  ? { ...state.activeWorkflow, ...updates }
                  : state.activeWorkflow,
            }),
            false,
            'updateWorkflow'
          ),
        
        // Connections state
        connectedApps: [],
        connectApp: async (appId) => {
          // Simulate API call to connect app
          const newConnection: AppConnection = {
            id: crypto.randomUUID(),
            appId,
            appName: appId,
            isConnected: true,
            connectedAt: new Date(),
          };
          
          set(
            (state) => ({
              connectedApps: [...state.connectedApps, newConnection],
            }),
            false,
            'connectApp'
          );
        },
        disconnectApp: (appId) =>
          set(
            (state) => ({
              connectedApps: state.connectedApps.filter(
                (app) => app.appId !== appId
              ),
            }),
            false,
            'disconnectApp'
          ),
        
        // Builder state
        chatHistory: [],
        addMessage: (message) =>
          set(
            (state) => ({
              chatHistory: [...state.chatHistory, message],
            }),
            false,
            'addMessage'
          ),
        isAIThinking: false,
        setIsAIThinking: (thinking) => 
          set({ isAIThinking: thinking }, false, 'setIsAIThinking'),
        
        // UI state
        sidebarOpen: true,
        toggleSidebar: () =>
          set(
            (state) => ({ sidebarOpen: !state.sidebarOpen }),
            false,
            'toggleSidebar'
          ),
        theme: 'light',
        toggleTheme: () =>
          set(
            (state) => ({
              theme: state.theme === 'light' ? 'dark' : 'light',
            }),
            false,
            'toggleTheme'
          ),
      }),
      {
        name: 'conduit-ai-storage',
        partialize: (state) => ({
          // Only persist certain parts of the state
          user: state.user,
          workflows: state.workflows,
          connectedApps: state.connectedApps,
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
          // Don't persist chat history and AI thinking state
        }),
      }
    )
  )
);
