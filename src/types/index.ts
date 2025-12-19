export interface App {
  id: string;
  name: string;
  logo: string;
  connected: boolean;
  lastSynced: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  active: boolean;
  timeSavedPerWeek: string;
}

export interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}
