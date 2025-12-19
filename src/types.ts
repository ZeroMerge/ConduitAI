/**
 * Represents a single step in a workflow
 */
export interface WorkflowStep {
  id: string;
  app: 'gmail' | 'notion' | 'slack' | 'calendly' | 'stripe';
  action: string;
  parameters: Record<string, any>;
}

/**
 * Represents a complete workflow with trigger and actions
 */
export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowStep;
  actions: WorkflowStep[];
  estimatedTimeSaved: number; // in hours/week
}
