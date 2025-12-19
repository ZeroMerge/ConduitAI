import { Workflow, Trigger, TriggerType, App } from './types';
import { findMatchingTemplate } from './templates';

/**
 * Known trigger keywords mapped to their types
 */
const TRIGGER_KEYWORDS: Record<string, TriggerType> = {
  'when': 'when',
  'whenever': 'when',
  'if': 'if',
  'after': 'after',
  'once': 'after'
};

/**
 * Common app names and their variations
 */
const APP_PATTERNS: Record<string, string[]> = {
  'gmail': ['gmail', 'google mail', 'email'],
  'slack': ['slack'],
  'google calendar': ['google calendar', 'gcal', 'calendar'],
  'google forms': ['google forms', 'forms', 'form', 'gforms'],
  'google sheets': ['google sheets', 'sheets', 'sheet', 'gsheets', 'spreadsheet'],
  'trello': ['trello'],
  'asana': ['asana'],
  'jira': ['jira'],
  'dropbox': ['dropbox'],
  'github': ['github'],
  'twitter': ['twitter'],
  'facebook': ['facebook']
};

/**
 * Extract trigger information from natural language input
 * @param input - The natural language input string
 * @returns Trigger object with type, keyword, and description
 */
function extractTrigger(input: string): Trigger {
  const lowerInput = input.toLowerCase();
  const words = lowerInput.split(/\s+/);
  
  // Find the first trigger keyword
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word in TRIGGER_KEYWORDS) {
      const type = TRIGGER_KEYWORDS[word];
      // Extract description after trigger keyword
      const descriptionStart = lowerInput.indexOf(word) + word.length;
      const description = input.substring(descriptionStart).trim();
      
      return {
        type,
        keyword: word,
        description: description || input
      };
    }
  }
  
  // Default trigger if none found
  return {
    type: 'when',
    keyword: 'when',
    description: input
  };
}

/**
 * Identify apps mentioned in the input
 * @param input - The natural language input string
 * @returns Array of identified apps
 */
function identifyApps(input: string): App[] {
  const lowerInput = input.toLowerCase();
  const identifiedApps: App[] = [];
  const foundApps = new Set<string>();
  
  // Check each app pattern
  for (const [appName, patterns] of Object.entries(APP_PATTERNS)) {
    for (const pattern of patterns) {
      if (lowerInput.includes(pattern)) {
        if (!foundApps.has(appName)) {
          identifiedApps.push({
            name: appName,
            action: extractAppAction(input, pattern)
          });
          foundApps.add(appName);
        }
        break;
      }
    }
  }
  
  return identifiedApps;
}

/**
 * Extract the action associated with an app from context
 * @param input - The natural language input string
 * @param appPattern - The app pattern that was matched
 * @returns The action string or undefined
 */
function extractAppAction(input: string, appPattern: string): string | undefined {
  const lowerInput = input.toLowerCase();
  const appIndex = lowerInput.indexOf(appPattern);
  
  if (appIndex === -1) return undefined;
  
  // Look for action verbs near the app mention
  const actionVerbs = ['send', 'create', 'update', 'delete', 'notify', 'add', 'remove', 'post', 'share'];
  const contextBefore = lowerInput.substring(Math.max(0, appIndex - 50), appIndex);
  const contextAfter = lowerInput.substring(appIndex, Math.min(lowerInput.length, appIndex + 50));
  const context = contextBefore + ' ' + contextAfter;
  
  for (const verb of actionVerbs) {
    if (context.includes(verb)) {
      return verb;
    }
  }
  
  return undefined;
}

/**
 * Interprets natural language input and converts it to a structured workflow
 * @param input - The natural language description of the workflow
 * @returns Promise that resolves to a structured Workflow object
 */
export async function interpretNaturalLanguage(input: string): Promise<Workflow> {
  // 1. Extract trigger keywords ("when", "if", "after")
  const trigger = extractTrigger(input);
  
  // 2. Identify apps from context
  const apps = identifyApps(input);
  
  // 3. Map to pre-built templates
  const template = findMatchingTemplate(input, apps);
  
  // 4. Return structured workflow
  const workflow = template.buildWorkflow(input, trigger, apps);
  
  return workflow;
}
