import { NLPInterpreter } from './nlp-interpreter';

describe('NLPInterpreter', () => {
  let interpreter: NLPInterpreter;

  beforeEach(() => {
    interpreter = new NLPInterpreter();
  });

  describe('interpretWorkflow', () => {
    it('should create a workflow from natural language input', () => {
      const input = 'When I receive an email, send a Slack message';
      const workflow = interpreter.interpretWorkflow(input);

      expect(workflow).toBeDefined();
      expect(workflow.id).toMatch(/^workflow-\d+$/);
      expect(workflow.name).toBeTruthy();
      expect(workflow.description).toBe(input);
      expect(workflow.trigger).toBeDefined();
      expect(workflow.actions).toBeInstanceOf(Array);
      expect(workflow.estimatedTimeSaved).toBeGreaterThan(0);
    });

    it('should detect Gmail trigger from email keywords', () => {
      const workflow = interpreter.interpretWorkflow(
        'When I receive an email from boss@company.com'
      );

      expect(workflow.trigger.app).toBe('gmail');
      expect(workflow.trigger.action).toBe('receive_email');
    });

    it('should detect Slack trigger from message keywords', () => {
      const workflow = interpreter.interpretWorkflow(
        'When I receive a Slack message in channel #support'
      );

      expect(workflow.trigger.app).toBe('slack');
      expect(workflow.trigger.action).toBe('message_received');
    });

    it('should detect Stripe trigger from payment keywords', () => {
      const workflow = interpreter.interpretWorkflow(
        'When a payment is received over $100'
      );

      expect(workflow.trigger.app).toBe('stripe');
      expect(workflow.trigger.action).toBe('payment_received');
    });

    it('should detect Calendly trigger from meeting keywords', () => {
      const workflow = interpreter.interpretWorkflow(
        'When a meeting is scheduled on Calendly'
      );

      expect(workflow.trigger.app).toBe('calendly');
      expect(workflow.trigger.action).toBe('meeting_scheduled');
    });

    it('should detect Slack action from notification keywords', () => {
      const workflow = interpreter.interpretWorkflow(
        'When I receive an email, send a Slack message to #general'
      );

      expect(workflow.actions.length).toBeGreaterThan(0);
      expect(workflow.actions[0].app).toBe('slack');
      expect(workflow.actions[0].action).toBe('send_message');
    });

    it('should detect Gmail action from email keywords', () => {
      const workflow = interpreter.interpretWorkflow(
        'When a payment is received, send email to finance@company.com'
      );

      expect(workflow.actions.some(a => a.app === 'gmail')).toBe(true);
      const emailAction = workflow.actions.find(a => a.app === 'gmail');
      expect(emailAction?.action).toBe('send_email');
    });

    it('should detect Notion action from keywords', () => {
      const workflow = interpreter.interpretWorkflow(
        'When I receive an email, create a page in Notion'
      );

      expect(workflow.actions.some(a => a.app === 'notion')).toBe(true);
      const notionAction = workflow.actions.find(a => a.app === 'notion');
      expect(notionAction?.action).toBe('create_page');
    });

    it('should detect multiple actions', () => {
      const workflow = interpreter.interpretWorkflow(
        'When a payment is received, send a Slack message and create a Notion page'
      );

      expect(workflow.actions.length).toBeGreaterThanOrEqual(2);
    });

    it('should estimate time saved based on workflow complexity', () => {
      const simpleWorkflow = interpreter.interpretWorkflow(
        'When I receive an email, send a Slack message'
      );
      
      const complexWorkflow = interpreter.interpretWorkflow(
        'When a payment is received, send a Slack message, send an email, and create a Notion page'
      );

      expect(complexWorkflow.estimatedTimeSaved).toBeGreaterThan(
        simpleWorkflow.estimatedTimeSaved
      );
    });

    it('should generate unique workflow IDs', () => {
      const workflow1 = interpreter.interpretWorkflow('Test workflow 1');
      const workflow2 = interpreter.interpretWorkflow('Test workflow 2');

      expect(workflow1.id).not.toBe(workflow2.id);
    });

    it('should generate unique step IDs', () => {
      const workflow = interpreter.interpretWorkflow(
        'When I receive an email, send a Slack message and create a Notion page'
      );

      const allSteps = [workflow.trigger, ...workflow.actions];
      const stepIds = allSteps.map(step => step.id);
      const uniqueIds = new Set(stepIds);

      expect(uniqueIds.size).toBe(stepIds.length);
    });

    it('should handle empty or minimal input', () => {
      const workflow = interpreter.interpretWorkflow('workflow');

      expect(workflow).toBeDefined();
      expect(workflow.trigger).toBeDefined();
      expect(workflow.actions.length).toBeGreaterThan(0);
    });
  });

  describe('resetCounters', () => {
    it('should reset workflow and step counters', () => {
      interpreter.interpretWorkflow('Test workflow');
      interpreter.resetCounters();
      
      const workflow = interpreter.interpretWorkflow('Another workflow');
      
      expect(workflow.id).toBe('workflow-1');
      expect(workflow.trigger.id).toBe('step-1');
    });
  });
});
