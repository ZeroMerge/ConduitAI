export type NodeType = 'trigger' | 'action' | 'condition';

export interface NodeData extends Record<string, unknown> {
  label: string;
  appIcon?: string;
  appName?: string;
  eventName?: string;
  actionName?: string;
  parameters?: Record<string, unknown>;
  type: NodeType;
  isActive?: boolean;
  status?: 'idle' | 'running' | 'success' | 'failure';
}

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  label?: string;
}

export interface AppOption {
  id: string;
  name: string;
  icon: string;
}

export interface ActionOption {
  id: string;
  name: string;
  description: string;
  parameters: ParameterField[];
}

export interface ParameterField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  options?: { label: string; value: string }[];
  defaultValue?: string | number | boolean;
}
