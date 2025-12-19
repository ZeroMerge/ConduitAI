/**
 * AI Processing API Route
 * 
 * This route handles natural language input and interprets it into workflows.
 * For MVP, uses local AI interpretation. In production, would integrate with OpenAI API.
 */

interface WorkflowStep {
  id: string;
  type: string;
  config: Record<string, any>;
}

interface Workflow {
  name: string;
  steps: WorkflowStep[];
  trigger?: string;
}

/**
 * Interprets natural language into a workflow structure.
 * This is a simple MVP implementation that will be replaced with OpenAI in production.
 */
async function interpretNaturalLanguage(message: string): Promise<Workflow> {
  const lowerMessage = message.toLowerCase();
  const steps: WorkflowStep[] = [];
  
  // Simple pattern matching for MVP
  if (lowerMessage.includes('slack') || lowerMessage.includes('notify')) {
    steps.push({
      id: 'step-1',
      type: 'slack-notification',
      config: {
        channel: '#general',
        message: 'Workflow triggered',
      },
    });
  }
  
  if (lowerMessage.includes('email')) {
    steps.push({
      id: steps.length > 0 ? `step-${steps.length + 1}` : 'step-1',
      type: 'email',
      config: {
        to: 'user@example.com',
        subject: 'Notification',
      },
    });
  }
  
  if (lowerMessage.includes('delay') || lowerMessage.includes('wait')) {
    steps.push({
      id: steps.length > 0 ? `step-${steps.length + 1}` : 'step-1',
      type: 'delay',
      config: {
        duration: '5m',
      },
    });
  }
  
  // Default workflow if no patterns matched
  if (steps.length === 0) {
    steps.push({
      id: 'step-1',
      type: 'log',
      config: {
        message: 'Workflow executed',
      },
    });
  }
  
  return {
    name: 'Generated Workflow',
    steps,
    trigger: 'manual',
  };
}

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json();
    
    // Validate input
    if (!message || typeof message !== 'string') {
      return Response.json(
        { success: false, error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }
    
    // For MVP, use local AI interpretation
    const workflow = await interpretNaturalLanguage(message);
    
    // In production, this would call OpenAI API
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [{ role: "user", content: message }],
    //   functions: workflowFunctionSchema,
    // });
    
    return Response.json({
      success: true,
      workflow,
      message: "Here's the workflow I built for you",
      suggestions: ["Try adding a Slack notification", "Consider adding a delay"],
    });
  } catch (error) {
    console.error('Error processing AI request:', error);
    return Response.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
