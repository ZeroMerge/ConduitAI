import { executeWorkflow, generateWeeklyReport, simulateAIThinking } from './index';
import { Workflow } from './types';

// Example workflow: Automating a freelancer's client onboarding process
const exampleWorkflow: Workflow = {
  id: 'wf-001',
  name: 'Client Onboarding Automation',
  description: 'Automate the complete client onboarding process',
  userId: 'user-123',
  createdAt: new Date(),
  steps: [
    {
      id: 'step-1',
      name: 'Create project folder',
      description: 'Create a new folder in Google Drive for the client',
      appName: 'Google Drive',
      status: 'pending'
    },
    {
      id: 'step-2',
      name: 'Send welcome email',
      description: 'Send a personalized welcome email to the client',
      appName: 'Gmail',
      status: 'pending'
    },
    {
      id: 'step-3',
      name: 'Create Trello board',
      description: 'Set up a project management board with initial tasks',
      appName: 'Trello',
      status: 'pending'
    },
    {
      id: 'step-4',
      name: 'Schedule kickoff meeting',
      description: 'Add a kickoff meeting to Google Calendar',
      appName: 'Google Calendar',
      status: 'pending'
    },
    {
      id: 'step-5',
      name: 'Send Slack notification',
      description: 'Notify team about the new client in Slack',
      appName: 'Slack',
      status: 'pending'
    }
  ]
};

async function runDemo() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║           ConduitAI - Workflow Automation Demo           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
  
  // Demo 1: Simulate AI Thinking
  console.log('📖 Demo 1: AI Thinking Simulation');
  console.log('─'.repeat(60));
  console.log('Simulating AI processing...');
  const thinkingStart = Date.now();
  await simulateAIThinking();
  const thinkingDuration = Date.now() - thinkingStart;
  console.log(`✓ AI thinking completed in ${thinkingDuration}ms\n`);
  
  // Demo 2: Execute Workflow
  console.log('\n📖 Demo 2: Workflow Execution');
  console.log('─'.repeat(60));
  const executionLog = await executeWorkflow(exampleWorkflow, (step, current, total) => {
    // Optional progress callback
    // console.log(`Progress: ${current}/${total} - ${step.name}`);
  });
  
  console.log('\n📊 Execution Results:');
  console.log(`   Status: ${executionLog.status === 'success' ? '✅ Success' : '❌ Failed'}`);
  console.log(`   Duration: ${executionLog.duration}ms`);
  console.log(`   Steps completed: ${executionLog.steps.filter(s => s.status === 'completed').length}/${executionLog.steps.length}`);
  if (executionLog.error) {
    console.log(`   Error: ${executionLog.error}`);
  }
  
  // Demo 3: Generate Weekly Report
  console.log('\n\n📖 Demo 3: Weekly Analytics Report');
  console.log('─'.repeat(60));
  const report = generateWeeklyReport('user-123');
  
  console.log(`\n📈 Weekly Report for ${report.userId}`);
  console.log(`📅 Period: ${report.weekStartDate.toLocaleDateString()} - ${report.weekEndDate.toLocaleDateString()}`);
  console.log(`\n⏱️  Hours Saved: ${report.hoursSaved} hours`);
  
  console.log('\n🏆 Most Used Apps:');
  report.mostUsedApps.forEach((app, index) => {
    console.log(`   ${index + 1}. ${app.appName}`);
    console.log(`      Usage: ${app.usageCount} times | Saved: ${app.hoursSaved}h`);
  });
  
  console.log('\n📊 Busiest Days (Top 3):');
  report.busiestDays.slice(0, 3).forEach((day, index) => {
    console.log(`   ${index + 1}. ${day.date}`);
    console.log(`      Workflows: ${day.workflowsExecuted} | Saved: ${day.hoursSaved}h`);
  });
  
  console.log('\n💡 AI Suggestions:');
  report.suggestions.forEach((suggestion, index) => {
    console.log(`   ${index + 1}. ${suggestion}`);
  });
  
  console.log('\n' + '═'.repeat(60));
  console.log('Demo completed! 🎉');
  console.log('═'.repeat(60) + '\n');
}

// Run the demo
if (require.main === module) {
  runDemo().catch(console.error);
}

export { runDemo };
