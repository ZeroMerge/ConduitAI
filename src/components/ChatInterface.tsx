import { useEffect, useRef, useState } from 'react';
import { useWorkflowStore } from '../store/workflowStore';

const SUGGESTIONS = [
  "Try: 'When I send an invoice...'",
  "Try: 'After a client meeting...'",
  "Try: 'When a project is due...'",
];

export const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { chatHistory, addMessage, addStep } = useWorkflowStore();

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    addMessage({ text: input, sender: 'user' });

    // Simulate AI response and workflow step generation
    setTimeout(() => {
      const response = generateResponse(input);
      addMessage({ text: response.text, sender: 'assistant' });
      
      // Add a sample workflow step based on the input
      if (response.step) {
        addStep(response.step);
      }
    }, 500);

    setInput('');
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowSuggestions(value.length > 0 && value.length < 30);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const text = suggestion.replace("Try: ", "").replace(/'/g, "");
    setInput(text);
    setShowSuggestions(false);
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Workflow Builder</h2>
        <p>Describe your automation in plain English</p>
      </div>

      <div className="chat-messages">
        {chatHistory.length === 0 && (
          <div className="empty-state">
            <p>Start by describing your workflow...</p>
            <div className="example-prompts">
              {SUGGESTIONS.map((suggestion, index) => (
                <button
                  key={index}
                  className="example-prompt"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {chatHistory.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
            <div className="message-time">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-container">
        {showSuggestions && (
          <div className="suggestions">
            {SUGGESTIONS.filter(s => 
              s.toLowerCase().includes(input.toLowerCase())
            ).map((suggestion, index) => (
              <button
                key={index}
                className="suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your workflow..."
          />
          <button onClick={handleSend} disabled={!input.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate responses and workflow steps
function generateResponse(input: string): { 
  text: string; 
  step?: Omit<import('../store/workflowStore').WorkflowStep, 'id'> 
} {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('invoice')) {
    return {
      text: "I'll create a workflow for invoice handling. I've added a step to trigger when an invoice is sent.",
      step: {
        app: 'Gmail',
        action: 'When email is sent',
        parameters: { subject: 'Invoice', folder: 'Sent' },
        description: 'Trigger when invoice email is sent',
      },
    };
  }
  
  if (lowerInput.includes('meeting')) {
    return {
      text: "I'll set up a workflow for meeting follow-ups. I've added a step to trigger after a meeting ends.",
      step: {
        app: 'Google Calendar',
        action: 'After event ends',
        parameters: { eventType: 'Meeting' },
        description: 'Trigger after client meeting ends',
      },
    };
  }
  
  if (lowerInput.includes('project') || lowerInput.includes('due')) {
    return {
      text: "I'll create a workflow for project deadlines. I've added a step to check for due dates.",
      step: {
        app: 'Asana',
        action: 'Check due date',
        parameters: { daysBeforeDue: '1' },
        description: 'Check when project is due tomorrow',
      },
    };
  }
  
  return {
    text: "I understand you want to create a workflow. Can you provide more details about what you'd like to automate?",
  };
}
