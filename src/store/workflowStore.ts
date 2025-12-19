import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorkflowStep {
  id: string;
  app: string;
  action: string;
  parameters: Record<string, string>;
  description: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: number;
}

interface WorkflowStore {
  // Chat state
  chatHistory: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  
  // Workflow state
  workflowSteps: WorkflowStep[];
  addStep: (step: Omit<WorkflowStep, 'id'>) => void;
  updateStep: (id: string, updates: Partial<WorkflowStep>) => void;
  removeStep: (id: string) => void;
  reorderSteps: (steps: WorkflowStep[]) => void;
  clearWorkflow: () => void;
  
  // Current workflow state
  workflowName: string;
  isActivated: boolean;
  setWorkflowName: (name: string) => void;
  activateWorkflow: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useWorkflowStore = create<WorkflowStore>()(
  persist(
    (set) => ({
      // Chat state
      chatHistory: [],
      addMessage: (message) =>
        set((state) => ({
          chatHistory: [
            ...state.chatHistory,
            {
              ...message,
              id: generateId(),
              timestamp: Date.now(),
            },
          ],
        })),
      clearChat: () => set({ chatHistory: [] }),
      
      // Workflow state
      workflowSteps: [],
      addStep: (step) =>
        set((state) => ({
          workflowSteps: [
            ...state.workflowSteps,
            {
              ...step,
              id: generateId(),
            },
          ],
        })),
      updateStep: (id, updates) =>
        set((state) => ({
          workflowSteps: state.workflowSteps.map((step) =>
            step.id === id ? { ...step, ...updates } : step
          ),
        })),
      removeStep: (id) =>
        set((state) => ({
          workflowSteps: state.workflowSteps.filter((step) => step.id !== id),
        })),
      reorderSteps: (steps) => set({ workflowSteps: steps }),
      clearWorkflow: () => set({ workflowSteps: [], isActivated: false }),
      
      // Current workflow state
      workflowName: '',
      isActivated: false,
      setWorkflowName: (name) => set({ workflowName: name }),
      activateWorkflow: () => set({ isActivated: true }),
    }),
    {
      name: 'conduit-ai-storage',
    }
  )
);
