import { interpretNaturalLanguage } from './interpreter';
import { Workflow } from './types';

describe('interpretNaturalLanguage', () => {
  describe('trigger extraction', () => {
    it('should extract "when" trigger', async () => {
      const input = 'when I receive an email, send a message to Slack';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.trigger.type).toBe('when');
      expect(workflow.trigger.keyword).toBe('when');
      expect(workflow.trigger.description).toContain('receive an email');
    });

    it('should extract "if" trigger', async () => {
      const input = 'if a form is submitted, add it to Google Sheets';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.trigger.type).toBe('if');
      expect(workflow.trigger.keyword).toBe('if');
    });

    it('should extract "after" trigger', async () => {
      const input = 'after a calendar event ends, send a summary';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.trigger.type).toBe('after');
      expect(workflow.trigger.keyword).toBe('after');
    });

    it('should default to "when" if no trigger keyword found', async () => {
      const input = 'send notifications to Slack';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.trigger.type).toBe('when');
    });
  });

  describe('app identification', () => {
    it('should identify Gmail app', async () => {
      const input = 'when I receive a Gmail message, notify me';
      const workflow = await interpretNaturalLanguage(input);
      
      const gmailApp = workflow.apps.find(app => app.name === 'gmail');
      expect(gmailApp).toBeDefined();
    });

    it('should identify Slack app', async () => {
      const input = 'when something happens, send a Slack message';
      const workflow = await interpretNaturalLanguage(input);
      
      const slackApp = workflow.apps.find(app => app.name === 'slack');
      expect(slackApp).toBeDefined();
    });

    it('should identify multiple apps', async () => {
      const input = 'when I receive a Gmail email, send it to Slack';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.apps.length).toBeGreaterThanOrEqual(2);
      expect(workflow.apps.some(app => app.name === 'gmail')).toBe(true);
      expect(workflow.apps.some(app => app.name === 'slack')).toBe(true);
    });

    it('should identify Google Calendar', async () => {
      const input = 'when a calendar event starts, remind me';
      const workflow = await interpretNaturalLanguage(input);
      
      const calendarApp = workflow.apps.find(app => app.name === 'google calendar');
      expect(calendarApp).toBeDefined();
    });

    it('should identify Google Forms and Sheets', async () => {
      const input = 'when a form is submitted, add it to a spreadsheet';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.apps.some(app => app.name === 'google forms')).toBe(true);
      expect(workflow.apps.some(app => app.name === 'google sheets')).toBe(true);
    });
  });

  describe('template mapping', () => {
    it('should map to email-to-slack template', async () => {
      const input = 'when I receive an email, notify me on Slack';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.template).toBe('email-to-slack');
      expect(workflow.actions.length).toBeGreaterThan(0);
    });

    it('should map to calendar-reminder template', async () => {
      const input = 'when a calendar event is approaching, remind me';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.template).toBe('calendar-reminder');
    });

    it('should map to form-to-spreadsheet template', async () => {
      const input = 'when a form is submitted, add the response to a sheet';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.template).toBe('form-to-spreadsheet');
    });

    it('should map to task-management template', async () => {
      const input = 'when something happens, create a task in Trello';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.template).toBe('task-management');
    });

    it('should use generic template for unknown patterns', async () => {
      const input = 'when xyz happens, do abc';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.template).toBe('generic-workflow');
    });
  });

  describe('structured workflow output', () => {
    it('should return a complete workflow structure', async () => {
      const input = 'when I receive an email, send a Slack message';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow).toHaveProperty('trigger');
      expect(workflow).toHaveProperty('apps');
      expect(workflow).toHaveProperty('actions');
      expect(workflow).toHaveProperty('template');
      expect(workflow).toHaveProperty('rawInput');
      expect(workflow.rawInput).toBe(input);
    });

    it('should have actions for identified apps', async () => {
      const input = 'when I receive a Gmail email, send it to Slack';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.actions.length).toBeGreaterThan(0);
      workflow.actions.forEach(action => {
        expect(action).toHaveProperty('app');
        expect(action).toHaveProperty('operation');
        expect(action).toHaveProperty('description');
      });
    });

    it('should preserve original input', async () => {
      const input = 'This is my original workflow description';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.rawInput).toBe(input);
    });
  });

  describe('complex scenarios', () => {
    it('should handle complex multi-step workflow', async () => {
      const input = 'when a form is submitted, add it to Google Sheets and notify me on Slack';
      const workflow = await interpretNaturalLanguage(input);
      
      expect(workflow.trigger.type).toBe('when');
      expect(workflow.apps.length).toBeGreaterThan(0);
      expect(workflow.actions.length).toBeGreaterThan(0);
      expect(workflow.template).toBeDefined();
    });

    it('should handle workflow with action verbs', async () => {
      const input = 'when I receive an email, send a notification';
      const workflow = await interpretNaturalLanguage(input);
      
      const gmailApp = workflow.apps.find(app => app.name === 'gmail');
      if (gmailApp) {
        expect(gmailApp.action).toBeDefined();
      }
    });
  });
});
