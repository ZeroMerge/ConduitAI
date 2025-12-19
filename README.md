# ConduitAI

The core idea is an AI co-pilot that allows freelancers to describe workflows in plain English and then the AI builds and runs automations by connecting their existing tools.

## Features

- **Natural Language Processing**: Interpret plain English descriptions and convert them into structured workflows
- **Multi-App Integration**: Support for Gmail, Notion, Slack, Calendly, and Stripe
- **Workflow Management**: Define triggers and actions with customizable parameters
- **Time Estimation**: Automatic calculation of time saved per workflow

## Installation

```bash
npm install
```

## Usage

```typescript
import { NLPInterpreter } from './nlp-interpreter';

const interpreter = new NLPInterpreter();

// Interpret natural language to create a workflow
const workflow = interpreter.interpretWorkflow(
  'When I receive an email from client@example.com, send a Slack message to channel #sales'
);

console.log(workflow);
```

## API

### Types

#### WorkflowStep
```typescript
interface WorkflowStep {
  id: string;
  app: 'gmail' | 'notion' | 'slack' | 'calendly' | 'stripe';
  action: string;
  parameters: Record<string, any>;
}
```

#### Workflow
```typescript
interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowStep;
  actions: WorkflowStep[];
  estimatedTimeSaved: number; // in hours/week
}
```

### NLPInterpreter

#### `interpretWorkflow(naturalLanguageInput: string): Workflow`

Parse natural language input and generate a workflow.

**Example:**
```typescript
const workflow = interpreter.interpretWorkflow(
  'When a payment is received via Stripe over $100, create a page in Notion database and notify the team in Slack'
);
```

## Examples

Run the example file to see different workflow scenarios:

```bash
npm run build
node dist/example.js
```

## Development

### Build
```bash
npm run build
```

### Test
```bash
npm test
```

### Lint
```bash
npm run lint
```

## Supported Triggers

- **Gmail**: Email received (`email`, `gmail`)
- **Slack**: Message received (`slack message`)
- **Calendly**: Meeting scheduled (`meeting`, `calendly`)
- **Stripe**: Payment received (`payment`, `stripe`)

## Supported Actions

- **Gmail**: Send email (`send email`)
- **Slack**: Send message (`send slack`, `notify`)
- **Notion**: Create page (`notion`, `create page`)
- **Calendly**: Create event (`schedule`, `create event`)
