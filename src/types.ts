export interface ConnectedApp {
  id: string;
  name: string;
  logo: string;
  isConnected: boolean;
  lastSynced: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  isActive: boolean;
  timeSavedPerWeek: number;
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
}
