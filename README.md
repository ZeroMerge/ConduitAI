# ConduitAI

The core idea is an AI co-pilot that allows freelancers to describe workflows in plain English and then the AI builds and runs automations by connecting their existing tools.

## Features

### 1. AI Processing Simulation
Simulate realistic AI processing delays for a more authentic user experience.

### 2. Workflow Execution
Execute workflows with real-time progress tracking, step-by-step updates, and realistic success/failure scenarios.

### 3. Analytics & Reporting
Generate comprehensive weekly reports with insights on time saved, app usage, busy periods, and AI-powered suggestions.

## Installation

```bash
npm install
```

## Usage

### Building the Project

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Running the Demo

```bash
npm run dev
```

## API Reference

### `simulateAIThinking()`

Simulates AI processing delay with random timing between 500-1500ms.

```typescript
const simulateAIThinking = (): Promise<void>
```

**Example:**
```typescript
await simulateAIThinking();
console.log('AI finished thinking!');
```

### `executeWorkflow(workflow, onProgress?)`

Executes a workflow with simulated progress tracking, step-by-step execution, and random success/failure.

```typescript
const executeWorkflow = async (
  workflow: Workflow,
  onProgress?: (step: WorkflowStep, index: number, total: number) => void
): Promise<ExecutionLog>
```

**Parameters:**
- `workflow`: The workflow object to execute
- `onProgress`: Optional callback for progress updates

**Returns:** Execution log with results including:
- Status (success/failed)
- Duration
- Step-by-step results
- Error messages (if applicable)

**Example:**
```typescript
const workflow = {
  id: 'wf-001',
  name: 'Client Onboarding',
  description: 'Automate client onboarding',
  userId: 'user-123',
  createdAt: new Date(),
  steps: [
    {
      id: 'step-1',
      name: 'Create project folder',
      description: 'Create folder in Google Drive',
      appName: 'Google Drive',
      status: 'pending'
    }
  ]
};

const log = await executeWorkflow(workflow, (step, current, total) => {
  console.log(`Progress: ${current}/${total}`);
});

console.log(`Workflow ${log.status}`);
```

### `generateWeeklyReport(userId)`

Generates a fake weekly analytics report with realistic data.

```typescript
const generateWeeklyReport = (userId: string): WeeklyReport
```

**Parameters:**
- `userId`: The user ID to generate the report for

**Returns:** Weekly report including:
- Hours saved
- Most used apps
- Busiest days
- AI-powered suggestions

**Example:**
```typescript
const report = generateWeeklyReport('user-123');

console.log(`Hours saved: ${report.hoursSaved}`);
console.log('Most used apps:', report.mostUsedApps);
console.log('Suggestions:', report.suggestions);
```

## Project Structure

```
ConduitAI/
├── src/
│   ├── index.ts         # Main implementation
│   ├── types.ts         # TypeScript interfaces
│   ├── example.ts       # Demo/example usage
│   └── index.test.ts    # Test suite
├── dist/                # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Development

The project uses:
- TypeScript for type-safe code
- Jest for testing
- ts-node for development

## License

MIT
