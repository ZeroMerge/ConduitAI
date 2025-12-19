import { Workflow, WorkflowStep } from './types';

/**
 * Simulates AI interpreting natural language to create workflows
 */
export class NLPInterpreter {
  private workflowCounter = 0;
  private stepCounter = 0;

  // Constants for workflow name extraction
  private static readonly MAX_NAME_WORDS = 5;
  private static readonly MAX_NAME_LENGTH = 50;
  private static readonly TRUNCATED_NAME_LENGTH = 47;

  // Constants for time estimation
  private static readonly BASE_TIME_SAVED_PER_STEP = 0.5; // hours per week

  /**
   * Parse natural language input and generate a workflow
   * @param naturalLanguageInput - The natural language description of the workflow
   * @returns A generated Workflow object
   */
  public interpretWorkflow(naturalLanguageInput: string): Workflow {
    const lowercaseInput = naturalLanguageInput.toLowerCase();
    
    // Extract workflow name from input
    const name = this.extractWorkflowName(lowercaseInput);
    
    // Detect trigger based on keywords
    const trigger = this.detectTrigger(lowercaseInput);
    
    // Detect actions based on keywords
    const actions = this.detectActions(lowercaseInput);
    
    // Estimate time saved based on complexity
    const estimatedTimeSaved = this.estimateTimeSaved(actions.length);
    
    this.workflowCounter++;
    
    return {
      id: `workflow-${this.workflowCounter}`,
      name,
      description: naturalLanguageInput,
      trigger,
      actions,
      estimatedTimeSaved
    };
  }

  /**
   * Extract a workflow name from natural language input
   */
  private extractWorkflowName(input: string): string {
    // Simple heuristic: take first few words or generate a name
    const words = input.split(' ').slice(0, NLPInterpreter.MAX_NAME_WORDS);
    let name = words.join(' ');
    
    if (name.length > NLPInterpreter.MAX_NAME_LENGTH) {
      name = name.substring(0, NLPInterpreter.TRUNCATED_NAME_LENGTH) + '...';
    }
    
    return name || 'Untitled Workflow';
  }

  /**
   * Detect the trigger from natural language
   */
  private detectTrigger(input: string): WorkflowStep {
    // Split input to focus on trigger part (before commas typically)
    const triggerPart = input.split(',')[0].toLowerCase();
    
    // Check for specific app mentions first (most specific)
    if (triggerPart.includes('calendly') || 
        (triggerPart.includes('meeting') && triggerPart.includes('scheduled'))) {
      return this.createStep('calendly', 'meeting_scheduled', {
        eventType: this.extractPattern(input, /meeting type[:\s]+([^,.]+)/i) || 'any'
      });
    }
    
    if (triggerPart.includes('stripe') || 
        triggerPart.includes('payment') || 
        triggerPart.includes('purchase')) {
      return this.createStep('stripe', 'payment_received', {
        amount: this.extractPattern(input, /amount[:\s]+([^,.]+)/i),
        minAmount: this.extractPattern(input, /over \$?(\d+)/i)
      });
    }
    
    // Check for Slack trigger with receive context
    if (triggerPart.includes('slack') && 
        (triggerPart.includes('receive') || triggerPart.includes('when'))) {
      return this.createStep('slack', 'message_received', {
        channel: this.extractPattern(input, /channel[:\s]+([^,.]+)/i) || '#general',
        keyword: this.extractPattern(input, /keyword[:\s]+([^,.]+)/i)
      });
    }
    
    // Meeting-related triggers
    if (triggerPart.includes('meeting') || triggerPart.includes('appointment')) {
      return this.createStep('calendly', 'meeting_scheduled', {
        eventType: this.extractPattern(input, /meeting type[:\s]+([^,.]+)/i) || 'any'
      });
    }
    
    // Email triggers (most common, check last)
    if (triggerPart.includes('email') || triggerPart.includes('gmail') || 
        triggerPart.includes('receive')) {
      return this.createStep('gmail', 'receive_email', {
        from: this.extractPattern(input, /from ([^\s,]+)/i),
        subject: this.extractPattern(input, /subject[:\s]+([^,.]+)/i)
      });
    }
    
    // Default trigger
    return this.createStep('gmail', 'receive_email', {
      from: 'any'
    });
  }

  /**
   * Detect actions from natural language
   */
  private detectActions(input: string): WorkflowStep[] {
    const actions: WorkflowStep[] = [];
    
    // Slack actions
    if (input.includes('slack message') || input.includes('send slack') || 
        input.includes('notify') || input.includes('post to slack')) {
      actions.push(this.createStep('slack', 'send_message', {
        channel: this.extractPattern(input, /to channel[:\s]+([^,.]+)/i) || '#general',
        message: this.extractPattern(input, /message[:\s]+([^,.]+)/i) || 'Notification'
      }));
    }
    
    // Gmail actions
    if (input.includes('send email') || input.includes('reply') || input.includes('forward')) {
      actions.push(this.createStep('gmail', 'send_email', {
        to: this.extractPattern(input, /to[:\s]+([^\s,]+@[^\s,]+)/i),
        subject: this.extractPattern(input, /subject[:\s]+([^,.]+)/i),
        body: this.extractPattern(input, /body[:\s]+([^,.]+)/i)
      }));
    }
    
    // Notion actions
    if (input.includes('notion page') || input.includes('notion') || 
        input.includes('create page') || input.includes('add to database')) {
      actions.push(this.createStep('notion', 'create_page', {
        database: this.extractPattern(input, /database[:\s]+([^,.]+)/i) || 'default',
        title: this.extractPattern(input, /title[:\s]+([^,.]+)/i),
        content: this.extractPattern(input, /content[:\s]+([^,.]+)/i)
      }));
    }
    
    // Calendly actions
    if (input.includes('schedule') || input.includes('create event') || input.includes('book')) {
      actions.push(this.createStep('calendly', 'create_event', {
        eventType: this.extractPattern(input, /event type[:\s]+([^,.]+)/i),
        duration: this.extractPattern(input, /duration[:\s]+([^,.]+)/i) || '30 minutes'
      }));
    }
    
    // If no specific actions detected, create a default action
    if (actions.length === 0) {
      actions.push(this.createStep('slack', 'send_message', {
        channel: '#general',
        message: 'Workflow triggered'
      }));
    }
    
    return actions;
  }

  /**
   * Create a workflow step
   */
  private createStep(
    app: 'gmail' | 'notion' | 'slack' | 'calendly' | 'stripe',
    action: string,
    parameters: Record<string, any>
  ): WorkflowStep {
    this.stepCounter++;
    return {
      id: `step-${this.stepCounter}`,
      app,
      action,
      parameters
    };
  }

  /**
   * Extract a pattern from text using regex
   */
  private extractPattern(input: string, pattern: RegExp): string | undefined {
    const match = input.match(pattern);
    return match ? match[1].trim() : undefined;
  }

  /**
   * Estimate time saved based on workflow complexity
   */
  private estimateTimeSaved(actionCount: number): number {
    // Simple heuristic: each action saves a base amount of hours per week
    return Math.round((actionCount + 1) * NLPInterpreter.BASE_TIME_SAVED_PER_STEP * 10) / 10;
  }

  /**
   * Reset counters (useful for testing)
   */
  public resetCounters(): void {
    this.workflowCounter = 0;
    this.stepCounter = 0;
  }
}
