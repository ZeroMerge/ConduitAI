import { Workflow, ExecutionLog, WeeklyReport, WorkflowStep } from './types';

/**
 * Simulate AI processing delay with random timing
 * @returns Promise that resolves after 500-1500ms
 */
export const simulateAIThinking = (): Promise<void> => {
  return new Promise(resolve => 
    setTimeout(resolve, Math.random() * 1000 + 500)
  );
};

/**
 * Execute a workflow with simulated progress tracking
 * @param workflow - The workflow to execute
 * @param onProgress - Optional callback for progress updates
 * @returns Execution log with results
 */
export const executeWorkflow = async (
  workflow: Workflow,
  onProgress?: (step: WorkflowStep, index: number, total: number) => void
): Promise<ExecutionLog> => {
  const startTime = new Date();
  const steps: WorkflowStep[] = JSON.parse(JSON.stringify(workflow.steps));
  
  console.log(`🚀 Starting workflow: ${workflow.name}`);
  console.log(`📋 Total steps: ${steps.length}`);
  console.log('─'.repeat(50));

  // Execute each step with simulated delay and progress
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    step.status = 'running';
    
    if (onProgress) {
      onProgress(step, i + 1, steps.length);
    }
    
    console.log(`\n⏳ Step ${i + 1}/${steps.length}: ${step.name}`);
    console.log(`   ${step.description}`);
    
    // Progress bar simulation
    const progressBar = '█'.repeat(Math.floor((i + 1) / steps.length * 20));
    const emptyBar = '░'.repeat(20 - progressBar.length);
    console.log(`   [${progressBar}${emptyBar}] ${Math.floor((i + 1) / steps.length * 100)}%`);
    
    // Simulate AI thinking/processing
    await simulateAIThinking();
    
    const stepStartTime = Date.now();
    
    // Randomly succeed or fail (80% success rate)
    const shouldSucceed = Math.random() > 0.2;
    
    if (shouldSucceed) {
      step.status = 'completed';
      step.duration = Date.now() - stepStartTime + Math.random() * 500;
      console.log(`   ✅ Completed in ${step.duration.toFixed(0)}ms`);
    } else {
      step.status = 'failed';
      step.duration = Date.now() - stepStartTime;
      step.error = `Failed to execute step: ${['Connection timeout', 'API rate limit', 'Invalid credentials', 'Service unavailable'][Math.floor(Math.random() * 4)]}`;
      console.log(`   ❌ Failed: ${step.error}`);
      
      // Stop execution on failure
      const endTime = new Date();
      console.log('\n' + '─'.repeat(50));
      console.log(`❌ Workflow failed at step ${i + 1}/${steps.length}`);
      
      return {
        workflowId: workflow.id,
        workflowName: workflow.name,
        startTime,
        endTime,
        duration: endTime.getTime() - startTime.getTime(),
        status: 'failed',
        steps,
        error: `Workflow execution failed at step "${step.name}": ${step.error}`
      };
    }
  }
  
  const endTime = new Date();
  console.log('\n' + '─'.repeat(50));
  console.log(`✨ Workflow completed successfully!`);
  console.log(`⏱️  Total duration: ${endTime.getTime() - startTime.getTime()}ms`);
  
  return {
    workflowId: workflow.id,
    workflowName: workflow.name,
    startTime,
    endTime,
    duration: endTime.getTime() - startTime.getTime(),
    status: 'success',
    steps
  };
};

/**
 * Generate a fake weekly analytics report for a user
 * @param userId - The user ID to generate report for
 * @returns Weekly report with analytics data
 */
export const generateWeeklyReport = (userId: string): WeeklyReport => {
  const now = new Date();
  const weekStartDate = new Date(now);
  weekStartDate.setDate(now.getDate() - 7);
  
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 7);
  
  // Generate random but realistic hours saved (10-40 hours per week)
  const hoursSaved = Math.floor(Math.random() * 30) + 10;
  
  // Most used apps with realistic data
  const appNames = [
    'Gmail', 'Slack', 'Trello', 'Google Calendar', 'Notion',
    'Asana', 'GitHub', 'Dropbox', 'Zapier', 'Google Sheets'
  ];
  
  const shuffledApps = [...appNames].sort(() => Math.random() - 0.5);
  const topAppsCount = Math.floor(Math.random() * 3) + 3; // 3-5 apps
  
  const mostUsedApps = shuffledApps.slice(0, topAppsCount).map(appName => ({
    appName,
    usageCount: Math.floor(Math.random() * 50) + 10,
    hoursSaved: Math.floor(Math.random() * 10) + 1
  })).sort((a, b) => b.usageCount - a.usageCount);
  
  // Busiest days (last 7 days)
  const busiestDays = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    busiestDays.push({
      date: date.toISOString().split('T')[0],
      workflowsExecuted: Math.floor(Math.random() * 20) + 5,
      hoursSaved: Math.floor(Math.random() * 8) + 1
    });
  }
  
  // Sort by workflows executed to show busiest days first
  busiestDays.sort((a, b) => b.workflowsExecuted - a.workflowsExecuted);
  
  // AI-generated suggestions based on usage patterns
  const suggestions = [
    ...(mostUsedApps.length > 0 ? [`You saved the most time with ${mostUsedApps[0].appName}. Consider creating more workflows with this app.`] : []),
    ...(busiestDays.length > 0 ? [`Your busiest day was ${busiestDays[0].date} with ${busiestDays[0].workflowsExecuted} workflows executed. Plan ahead for similar busy periods.`] : []),
    `You could save an additional 5-10 hours per week by automating your email responses.`,
    `Consider connecting your calendar to automatically block focus time after completing workflows.`,
    `You're most productive on ${['Monday', 'Tuesday', 'Wednesday'][Math.floor(Math.random() * 3)]}s. Schedule important workflows then.`
  ];
  
  // Pick 3-4 random suggestions
  const selectedSuggestions = suggestions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 2) + 3);
  
  return {
    userId,
    weekStartDate,
    weekEndDate,
    hoursSaved,
    mostUsedApps,
    busiestDays,
    suggestions: selectedSuggestions
  };
};

// Export types for consumers
export * from './types';
