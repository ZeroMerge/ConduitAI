import { simulateAIThinking, executeWorkflow, generateWeeklyReport } from './index';
import { Workflow } from './types';

describe('simulateAIThinking', () => {
  it('should return a promise that resolves', async () => {
    await expect(simulateAIThinking()).resolves.toBeUndefined();
  });

  it('should delay for at least 500ms', async () => {
    const start = Date.now();
    await simulateAIThinking();
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(500);
  });

  it('should delay for at most 1500ms', async () => {
    const start = Date.now();
    await simulateAIThinking();
    const duration = Date.now() - start;
    expect(duration).toBeLessThanOrEqual(1600); // Small buffer for timing
  });
});

describe('executeWorkflow', () => {
  const mockWorkflow: Workflow = {
    id: 'test-wf-1',
    name: 'Test Workflow',
    description: 'A test workflow',
    userId: 'test-user',
    createdAt: new Date(),
    steps: [
      {
        id: 'step-1',
        name: 'First step',
        description: 'Do first thing',
        status: 'pending'
      },
      {
        id: 'step-2',
        name: 'Second step',
        description: 'Do second thing',
        appName: 'TestApp',
        status: 'pending'
      }
    ]
  };

  it('should return an execution log', async () => {
    const log = await executeWorkflow(mockWorkflow);
    expect(log).toBeDefined();
    expect(log.workflowId).toBe(mockWorkflow.id);
    expect(log.workflowName).toBe(mockWorkflow.name);
  });

  it('should have valid timestamps', async () => {
    const log = await executeWorkflow(mockWorkflow);
    expect(log.startTime).toBeInstanceOf(Date);
    expect(log.endTime).toBeInstanceOf(Date);
    expect(log.endTime.getTime()).toBeGreaterThanOrEqual(log.startTime.getTime());
  });

  it('should calculate duration correctly', async () => {
    const log = await executeWorkflow(mockWorkflow);
    const expectedDuration = log.endTime.getTime() - log.startTime.getTime();
    expect(log.duration).toBe(expectedDuration);
  });

  it('should have status of success or failed', async () => {
    const log = await executeWorkflow(mockWorkflow);
    expect(['success', 'failed']).toContain(log.status);
  });

  it('should include all steps in the log', async () => {
    const log = await executeWorkflow(mockWorkflow);
    expect(log.steps).toHaveLength(mockWorkflow.steps.length);
  });

  it('should update step statuses', async () => {
    const log = await executeWorkflow(mockWorkflow);
    log.steps.forEach(step => {
      expect(['pending', 'running', 'completed', 'failed']).toContain(step.status);
    });
  });

  it('should include step duration for completed/failed steps', async () => {
    const log = await executeWorkflow(mockWorkflow);
    log.steps.forEach(step => {
      if (step.status === 'completed' || step.status === 'failed') {
        expect(step.duration).toBeDefined();
        expect(typeof step.duration).toBe('number');
        expect(step.duration).toBeGreaterThan(0);
      }
    });
  });

  it('should include error message for failed workflows', async () => {
    // Run multiple times to potentially get a failure
    let failedLog = null;
    for (let i = 0; i < 10; i++) {
      const log = await executeWorkflow(mockWorkflow);
      if (log.status === 'failed') {
        failedLog = log;
        break;
      }
    }
    
    // If we got a failure, check it has an error
    if (failedLog) {
      expect(failedLog.error).toBeDefined();
      expect(typeof failedLog.error).toBe('string');
      if (failedLog.error) {
        expect(failedLog.error.length).toBeGreaterThan(0);
      }
    }
  });

  it('should call progress callback if provided', async () => {
    const progressCallback = jest.fn();
    await executeWorkflow(mockWorkflow, progressCallback);
    expect(progressCallback).toHaveBeenCalled();
    expect(progressCallback).toHaveBeenCalledWith(
      expect.objectContaining({ name: expect.any(String) }),
      expect.any(Number),
      mockWorkflow.steps.length
    );
  });

  it('should not modify original workflow steps', async () => {
    const originalSteps = JSON.stringify(mockWorkflow.steps);
    await executeWorkflow(mockWorkflow);
    expect(JSON.stringify(mockWorkflow.steps)).toBe(originalSteps);
  });
});

describe('generateWeeklyReport', () => {
  const userId = 'test-user-123';

  it('should return a report object', () => {
    const report = generateWeeklyReport(userId);
    expect(report).toBeDefined();
    expect(report.userId).toBe(userId);
  });

  it('should have valid date range', () => {
    const report = generateWeeklyReport(userId);
    expect(report.weekStartDate).toBeInstanceOf(Date);
    expect(report.weekEndDate).toBeInstanceOf(Date);
    expect(report.weekEndDate.getTime()).toBeGreaterThan(report.weekStartDate.getTime());
  });

  it('should have week start date approximately 7 days before end date', () => {
    const report = generateWeeklyReport(userId);
    const daysDiff = (report.weekEndDate.getTime() - report.weekStartDate.getTime()) / (1000 * 60 * 60 * 24);
    expect(daysDiff).toBeGreaterThanOrEqual(6.9);
    expect(daysDiff).toBeLessThanOrEqual(7.1);
  });

  it('should have realistic hours saved', () => {
    const report = generateWeeklyReport(userId);
    expect(report.hoursSaved).toBeGreaterThanOrEqual(10);
    expect(report.hoursSaved).toBeLessThan(40);
  });

  it('should have most used apps', () => {
    const report = generateWeeklyReport(userId);
    expect(report.mostUsedApps).toBeDefined();
    expect(Array.isArray(report.mostUsedApps)).toBe(true);
    expect(report.mostUsedApps.length).toBeGreaterThan(0);
  });

  it('should have valid app data structure', () => {
    const report = generateWeeklyReport(userId);
    report.mostUsedApps.forEach(app => {
      expect(app.appName).toBeDefined();
      expect(typeof app.appName).toBe('string');
      expect(app.usageCount).toBeGreaterThan(0);
      expect(app.hoursSaved).toBeGreaterThan(0);
    });
  });

  it('should have most used apps sorted by usage', () => {
    const report = generateWeeklyReport(userId);
    for (let i = 1; i < report.mostUsedApps.length; i++) {
      expect(report.mostUsedApps[i - 1].usageCount).toBeGreaterThanOrEqual(
        report.mostUsedApps[i].usageCount
      );
    }
  });

  it('should have busiest days', () => {
    const report = generateWeeklyReport(userId);
    expect(report.busiestDays).toBeDefined();
    expect(Array.isArray(report.busiestDays)).toBe(true);
    expect(report.busiestDays.length).toBe(7);
  });

  it('should have valid busiest days data structure', () => {
    const report = generateWeeklyReport(userId);
    report.busiestDays.forEach(day => {
      expect(day.date).toBeDefined();
      expect(typeof day.date).toBe('string');
      expect(day.workflowsExecuted).toBeGreaterThan(0);
      expect(day.hoursSaved).toBeGreaterThan(0);
    });
  });

  it('should have busiest days sorted by workflows executed', () => {
    const report = generateWeeklyReport(userId);
    for (let i = 1; i < report.busiestDays.length; i++) {
      expect(report.busiestDays[i - 1].workflowsExecuted).toBeGreaterThanOrEqual(
        report.busiestDays[i].workflowsExecuted
      );
    }
  });

  it('should have suggestions', () => {
    const report = generateWeeklyReport(userId);
    expect(report.suggestions).toBeDefined();
    expect(Array.isArray(report.suggestions)).toBe(true);
    expect(report.suggestions.length).toBeGreaterThan(0);
  });

  it('should have string suggestions', () => {
    const report = generateWeeklyReport(userId);
    report.suggestions.forEach(suggestion => {
      expect(typeof suggestion).toBe('string');
      expect(suggestion.length).toBeGreaterThan(0);
    });
  });

  it('should generate different reports for multiple calls', () => {
    const report1 = generateWeeklyReport(userId);
    const report2 = generateWeeklyReport(userId);
    
    // Reports should have some randomness
    const report1Str = JSON.stringify(report1);
    const report2Str = JSON.stringify(report2);
    expect(report1Str).not.toBe(report2Str);
  });
});
