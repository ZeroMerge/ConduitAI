// Chat application state
const chatApp = {
    messages: [],
    isTyping: false,
    voiceRecording: false
};

// DOM elements
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const screenshotBtn = document.getElementById('screenshotBtn');
const voiceBtn = document.getElementById('voiceBtn');

// Initialize the chat
function init() {
    // Show empty state
    showEmptyState();
    
    // Auto-resize textarea
    messageInput.addEventListener('input', autoResizeTextarea);
    
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter (without Shift)
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Screenshot button
    screenshotBtn.addEventListener('click', handleScreenshot);
    
    // Voice button
    voiceBtn.addEventListener('click', handleVoiceInput);
}

// Show empty state when no messages
function showEmptyState() {
    if (chatApp.messages.length === 0) {
        messagesContainer.innerHTML = `
            <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h2>Welcome to ConduitAI</h2>
                <p>Describe your workflow in plain English and let AI automate it</p>
            </div>
        `;
    }
}

// Auto-resize textarea based on content
function autoResizeTextarea() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 150) + 'px';
}

// Send message
function sendMessage() {
    const text = messageInput.value.trim();
    
    if (!text) return;
    
    // Add user message
    addMessage('user', text);
    
    // Clear input
    messageInput.value = '';
    autoResizeTextarea();
    
    // Show AI typing indicator
    showTypingIndicator();
    
    // Simulate AI response after a delay
    setTimeout(() => {
        hideTypingIndicator();
        
        // Check if the message is asking for a workflow
        if (text.toLowerCase().includes('workflow') || 
            text.toLowerCase().includes('automate') || 
            text.toLowerCase().includes('connect') ||
            text.toLowerCase().includes('setup')) {
            addAIWorkflowResponse(text);
        } else {
            addMessage('ai', generateAIResponse(text));
        }
    }, 2000);
}

// Add message to chat
function addMessage(sender, content) {
    if (chatApp.messages.length === 0) {
        messagesContainer.innerHTML = '';
    }
    
    const message = {
        sender,
        content,
        timestamp: new Date()
    };
    
    chatApp.messages.push(message);
    
    const messageElement = createMessageElement(message);
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    scrollToBottom();
}

// Create message element
function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = message.sender === 'user' ? 'U' : 'AI';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = message.content;
    
    contentDiv.appendChild(bubble);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    return messageDiv;
}

// Show typing indicator
function showTypingIndicator() {
    chatApp.isTyping = true;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai';
    typingDiv.id = 'typing-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = 'AI';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    `;
    
    contentDiv.appendChild(indicator);
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    chatApp.isTyping = false;
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Generate AI response
function generateAIResponse(userMessage) {
    const responses = [
        "I understand you'd like to automate that process. Could you provide more details about the tools you're using?",
        "That's a great workflow idea! Let me help you set that up. Which applications do you want to connect?",
        "I can help you build that automation. What's the trigger that should start this workflow?",
        "Interesting! To create an effective automation, I'll need to know what data you want to transfer between tools.",
        "Got it! Let me understand your workflow better. What's the final outcome you're looking for?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Add AI workflow response
function addAIWorkflowResponse(userMessage) {
    if (chatApp.messages.length === 0) {
        messagesContainer.innerHTML = '';
    }
    
    const message = {
        sender: 'ai',
        content: 'workflow',
        timestamp: new Date()
    };
    
    chatApp.messages.push(message);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = 'AI';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Add intro message
    const introBubble = document.createElement('div');
    introBubble.className = 'message-bubble';
    introBubble.textContent = "I've analyzed your request and created a workflow for you:";
    contentDiv.appendChild(introBubble);
    
    // Add workflow display
    const workflow = createWorkflowDisplay(userMessage);
    contentDiv.appendChild(workflow);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Create workflow display
function createWorkflowDisplay(userMessage) {
    const workflowDiv = document.createElement('div');
    workflowDiv.className = 'workflow-display';
    
    const title = document.createElement('h3');
    title.textContent = 'Workflow Steps';
    workflowDiv.appendChild(title);
    
    // Generate sample workflow steps based on user message
    const steps = generateWorkflowSteps(userMessage);
    
    steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'workflow-step';
        
        const stepNumber = document.createElement('div');
        stepNumber.className = 'step-number';
        stepNumber.textContent = index + 1;
        
        const stepContent = document.createElement('div');
        stepContent.className = 'step-content';
        
        const stepTitle = document.createElement('div');
        stepTitle.className = 'step-title';
        stepTitle.textContent = step.title;
        
        const stepDesc = document.createElement('div');
        stepDesc.className = 'step-description';
        stepDesc.textContent = step.description;
        
        stepContent.appendChild(stepTitle);
        stepContent.appendChild(stepDesc);
        
        stepDiv.appendChild(stepNumber);
        stepDiv.appendChild(stepContent);
        
        workflowDiv.appendChild(stepDiv);
    });
    
    return workflowDiv;
}

// Generate workflow steps
function generateWorkflowSteps(userMessage) {
    // Default workflow steps
    const defaultSteps = [
        {
            title: 'Trigger Event',
            description: 'Monitor for new data or event in your source application'
        },
        {
            title: 'Process Data',
            description: 'Transform and format the data according to your requirements'
        },
        {
            title: 'Connect Tools',
            description: 'Authenticate and establish connections between your applications'
        },
        {
            title: 'Execute Action',
            description: 'Perform the automated action in your target application'
        },
        {
            title: 'Confirm & Notify',
            description: 'Send confirmation and update status of the workflow'
        }
    ];
    
    return defaultSteps;
}

// Handle screenshot attachment
function handleScreenshot() {
    // Simulate screenshot attachment
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            addMessage('user', `📎 Attached screenshot: ${file.name}`);
        }
    };
    
    fileInput.click();
}

// Handle voice input
function handleVoiceInput() {
    if (!chatApp.voiceRecording) {
        startVoiceRecording();
    } else {
        stopVoiceRecording();
    }
}

// Start voice recording
function startVoiceRecording() {
    chatApp.voiceRecording = true;
    voiceBtn.classList.add('recording');
    voiceBtn.style.color = '#f44336';
    
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            messageInput.value = transcript;
            autoResizeTextarea();
            stopVoiceRecording();
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopVoiceRecording();
        };
        
        recognition.onend = () => {
            stopVoiceRecording();
        };
        
        recognition.start();
        chatApp.recognition = recognition;
    } else {
        // Fallback: simulate voice input
        setTimeout(() => {
            messageInput.value = "Create a workflow to automate my tasks";
            autoResizeTextarea();
            stopVoiceRecording();
        }, 2000);
    }
}

// Stop voice recording
function stopVoiceRecording() {
    chatApp.voiceRecording = false;
    voiceBtn.classList.remove('recording');
    voiceBtn.style.color = '';
    
    if (chatApp.recognition) {
        chatApp.recognition.stop();
        chatApp.recognition = null;
    }
}

// Scroll to bottom of messages
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
