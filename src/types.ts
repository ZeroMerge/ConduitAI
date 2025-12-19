export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  appName?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  error?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  userId: string;
  createdAt: Date;
}

export interface ExecutionLog {
  workflowId: string;
  workflowName: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  status: 'success' | 'failed';
  steps: WorkflowStep[];
  error?: string;
}

export interface WeeklyReport {
  userId: string;
  weekStartDate: Date;
  weekEndDate: Date;
  hoursSaved: number;
  mostUsedApps: Array<{
    appName: string;
    usageCount: number;
    hoursSaved: number;
  }>;
  busiestDays: Array<{
    date: string;
    workflowsExecuted: number;
    hoursSaved: number;
  }>;
  suggestions: string[];
}
