# ConduitAI

The core idea is an AI co-pilot that allows freelancers to describe workflows in plain English and then the AI builds and runs automations by connecting their existing tools.

## Natural Language Interpreter

This repository contains the implementation of the `interpretNaturalLanguage` function, which converts natural language descriptions into structured workflow objects.

### Features

1. **Trigger Keyword Extraction**: Identifies trigger keywords such as "when", "if", and "after"
2. **App Identification**: Detects mentioned applications from a predefined list of popular services
3. **Template Mapping**: Maps workflows to pre-built templates for common automation patterns
4. **Structured Output**: Returns a fully structured workflow object ready for execution

### Installation

```bash
npm install
```

### Usage

```typescript
import { interpretNaturalLanguage } from './src/interpreter';

const workflow = await interpretNaturalLanguage(
  'when I receive an email, send a notification to Slack'
);

console.log(workflow);
// Output: Structured workflow with trigger, apps, actions, and template
```

### Supported Triggers

- `when` / `whenever`: Event-based triggers
- `if`: Conditional triggers
- `after` / `once`: Post-event triggers

### Supported Apps

- Gmail / Google Mail
- Slack
- Google Calendar
- Google Forms
- Google Sheets / Spreadsheets
- Trello
- Asana
- Jira
- Dropbox
- GitHub
- Twitter
- Facebook

### Pre-built Templates

1. **email-to-slack**: Forward email notifications to Slack
2. **calendar-reminder**: Get reminders for calendar events
3. **form-to-spreadsheet**: Save form responses to spreadsheets
4. **task-management**: Create tasks in project management tools
5. **generic-workflow**: Fallback template for custom workflows

### Development

```bash
# Build the project
npm run build

# Run tests
npm test

# Run example
npx ts-node examples/basic-usage.ts
```

### API

#### `interpretNaturalLanguage(input: string): Promise<Workflow>`

Interprets natural language input and converts it to a structured workflow.

**Parameters:**
- `input` (string): Natural language description of the workflow

**Returns:**
- `Promise<Workflow>`: A promise that resolves to a structured workflow object

**Workflow Structure:**
```typescript
interface Workflow {
  trigger: Trigger;      // The trigger type and description
  apps: App[];           // List of identified applications
  actions: Action[];     // List of workflow actions
  template?: string;     // Matched template name
  rawInput: string;      // Original input string
}
```

### Examples

See `examples/basic-usage.ts` for comprehensive examples of using the interpreter with different workflow patterns.
