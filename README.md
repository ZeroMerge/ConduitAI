# ConduitAI

The core idea is an AI co-pilot that allows freelancers to describe workflows in plain English and then the AI builds and runs automations by connecting their existing tools.

## Interactive Chat Interface

This repository contains a ChatGPT-like interactive chat interface for ConduitAI.

### Features

- **Message List**: Displays user and AI messages in a scrollable container
- **User Messages**: Blue gradient styling, right-aligned with avatar
- **AI Messages**: Clean white styling with AI avatar and typing indicators
- **Workflow Display**: Structured step-by-step workflow visualization
- **Auto-expanding Input**: Textarea that grows with content
- **Voice Input**: Microphone button with Web Speech API support
- **Screenshot Attachment**: Camera button to attach images (with validation)
- **Send Button**: Paper plane icon to send messages
- **Smooth Animations**: Typing indicators and fade-in effects

### How to Use

1. Open `index.html` in a web browser, or serve it with a local web server:
   ```bash
   python3 -m http.server 8080
   ```
   Then navigate to `http://localhost:8080`

2. Type your workflow description in the input area and click Send
3. Use the microphone button for voice input (requires microphone permissions)
4. Use the camera button to attach screenshots (max 5MB)

### Example Queries

- "Create a workflow to connect Slack and Google Sheets"
- "Setup automation for email notifications"
- "Automate my task management workflow"

When you mention keywords like "workflow", "automate", "connect", or "setup", the AI will respond with a structured workflow display showing the steps.

### Files

- `index.html` - Main HTML structure
- `styles.css` - Complete styling with animations
- `script.js` - Interactive functionality and logic

### Technologies

- Pure HTML5, CSS3, and JavaScript (ES6+)
- Web Speech API for voice input
- No external dependencies required
