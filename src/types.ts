/**
 * Represents a trigger type in a workflow
 */
export type TriggerType = 'when' | 'if' | 'after';

/**
 * Represents a trigger in a workflow
 */
export interface Trigger {
  type: TriggerType;
  keyword: string;
  description: string;
}

/**
 * Represents an application in a workflow
 */
export interface App {
  name: string;
  action?: string;
}

/**
 * Represents a workflow action
 */
export interface Action {
  app: string;
  operation: string;
  description: string;
}

/**
 * Represents a complete workflow structure
 */
export interface Workflow {
  trigger: Trigger;
  apps: App[];
  actions: Action[];
  template?: string;
  rawInput: string;
}
