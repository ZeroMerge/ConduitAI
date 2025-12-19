import { Workflow, Trigger, Action, App } from './types';

/**
 * Pre-built workflow templates
 */
export interface WorkflowTemplate {
  name: string;
  keywords: string[];
  apps: string[];
  buildWorkflow: (input: string, trigger: Trigger, apps: App[]) => Workflow;
}

export const templates: WorkflowTemplate[] = [
  {
    name: 'email-to-slack',
    keywords: ['email', 'slack', 'notify', 'message'],
    apps: ['gmail', 'slack'],
    buildWorkflow: (input: string, trigger: Trigger, apps: App[]): Workflow => ({
      trigger,
      apps,
      actions: [
        {
          app: 'gmail',
          operation: 'watch_inbox',
          description: 'Monitor email inbox for new messages'
        },
        {
          app: 'slack',
          operation: 'send_message',
          description: 'Send notification to Slack channel'
        }
      ],
      template: 'email-to-slack',
      rawInput: input
    })
  },
  {
    name: 'calendar-reminder',
    keywords: ['calendar', 'event', 'reminder', 'meeting'],
    apps: ['google calendar', 'calendar'],
    buildWorkflow: (input: string, trigger: Trigger, apps: App[]): Workflow => ({
      trigger,
      apps,
      actions: [
        {
          app: 'google calendar',
          operation: 'watch_events',
          description: 'Monitor calendar for upcoming events'
        },
        {
          app: 'notification',
          operation: 'send_reminder',
          description: 'Send reminder notification'
        }
      ],
      template: 'calendar-reminder',
      rawInput: input
    })
  },
  {
    name: 'form-to-spreadsheet',
    keywords: ['form', 'spreadsheet', 'sheet', 'response', 'submit'],
    apps: ['google forms', 'google sheets', 'forms', 'sheets'],
    buildWorkflow: (input: string, trigger: Trigger, apps: App[]): Workflow => ({
      trigger,
      apps,
      actions: [
        {
          app: 'google forms',
          operation: 'watch_responses',
          description: 'Monitor form for new submissions'
        },
        {
          app: 'google sheets',
          operation: 'add_row',
          description: 'Add response data to spreadsheet'
        }
      ],
      template: 'form-to-spreadsheet',
      rawInput: input
    })
  },
  {
    name: 'task-management',
    keywords: ['task', 'todo', 'trello', 'asana', 'ticket', 'create'],
    apps: ['trello', 'asana', 'jira'],
    buildWorkflow: (input: string, trigger: Trigger, apps: App[]): Workflow => ({
      trigger,
      apps,
      actions: [
        {
          app: apps[0]?.name || 'task manager',
          operation: 'create_task',
          description: 'Create a new task or ticket'
        }
      ],
      template: 'task-management',
      rawInput: input
    })
  },
  {
    name: 'generic-workflow',
    keywords: [],
    apps: [],
    buildWorkflow: (input: string, trigger: Trigger, apps: App[]): Workflow => ({
      trigger,
      apps,
      actions: apps.map(app => ({
        app: app.name,
        operation: app.action || 'execute',
        description: `Perform action on ${app.name}`
      })),
      template: 'generic-workflow',
      rawInput: input
    })
  }
];

/**
 * Find the best matching template for the given input and apps
 */
export function findMatchingTemplate(input: string, apps: App[]): WorkflowTemplate {
  const lowerInput = input.toLowerCase();
  const appNames = apps.map(a => a.name.toLowerCase());
  
  // Score each template based on keyword and app matches
  const scoredTemplates = templates.slice(0, -1).map(template => {
    let score = 0;
    
    // Score based on keyword matches
    for (const keyword of template.keywords) {
      if (lowerInput.includes(keyword.toLowerCase())) {
        score += 2;
      }
    }
    
    // Score based on app matches
    for (const templateApp of template.apps) {
      if (appNames.some(appName => appName.includes(templateApp.toLowerCase()) || templateApp.toLowerCase().includes(appName))) {
        score += 3;
      }
    }
    
    return { template, score };
  });
  
  // Sort by score descending
  scoredTemplates.sort((a, b) => b.score - a.score);
  
  // Return the best match if score > 0, otherwise return generic template
  if (scoredTemplates[0] && scoredTemplates[0].score > 0) {
    return scoredTemplates[0].template;
  }
  
  // Return generic template as fallback
  return templates[templates.length - 1];
}
