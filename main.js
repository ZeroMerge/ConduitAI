// Conduit AI - Main Application
// Functional rebuild with proper data flow and user interactions

import { DataStore, WorkflowEngine } from './data-models.js';
import { Router, NavigationManager } from './router.js';

class ConduitAI {
    constructor() {
        this.dataStore = null;
        this.workflowEngine = null;
        this.router = null;
        this.navigationManager = null;
        this.currentUser = null;
        this.currentChatSession = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        console.log('Initializing Conduit AI...');
        
        // Initialize core services
        this.dataStore = window.appDataStore || new DataStore();
        this.workflowEngine = new WorkflowEngine(this.dataStore);
        this.router = window.appRouter || new Router();
        this.navigationManager = window.appNavigation || new NavigationManager(this.router, this.dataStore);
        
        // Load user session
        this.loadUserSession();
        
        // Setup event listeners
        this.setupGlobalEventListeners();
        
        // Initialize page-specific functionality
        this.initializePage();
        
        console.log('Conduit AI initialized successfully');
    }

    loadUserSession() {
        this.currentUser = this.dataStore.getUser();
        
        if (!this.currentUser) {
            // Create default user for demo
            this.currentUser = {
                id: 'user_001',
                name: 'Sarah Johnson',
                email: 'sarah@example.com',
                createdAt: new Date().toISOString(),
                preferences: {
                    theme: 'light',
                    notifications: true
                }
            };
            this.dataStore.setUser(this.currentUser);
        }
        
        // Update UI with user info
        this.updateUserInterface();
    }

    updateUserInterface() {
        // Update user name in navigation
        const userNameElements = document.querySelectorAll('#user-name, [data-user-name]');
        userNameElements.forEach(el => {
            el.textContent = this.currentUser.name;
        });

        // Update welcome message
        const welcomeElements = document.querySelectorAll('#welcome-user, [data-welcome-user]');
        welcomeElements.forEach(el => {
            el.textContent = this.currentUser.name.split(' ')[0];
        });
    }

    setupGlobalEventListeners() {
        // Handle form submissions
        document.addEventListener('submit', (e) => {
            this.handleFormSubmission(e);
        });

        // Handle button clicks
        document.addEventListener('click', (e) => {
            this.handleButtonClick(e);
        });

        // Handle toggle switches
        document.addEventListener('change', (e) => {
            this.handleToggleChange(e);
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    initializePage() {
        const currentRoute = this.router.getCurrentRouteName();
        
        switch (currentRoute) {
            case 'home':
                this.initializeLandingPage();
                break;
            case 'dashboard':
                this.initializeDashboard();
                break;
            case 'builder':
                this.initializeWorkflowBuilder();
                break;
            case 'connections':
                this.initializeAppConnections();
                break;
            case 'history':
                this.initializeExecutionHistory();
                break;
            default:
                console.log(`Unknown route: ${currentRoute}`);
        }
    }

    // Landing Page Functionality
    initializeLandingPage() {
        console.log('Initializing landing page');
        
        // Handle get started button
        const getStartedBtn = document.querySelector('[data-action="get-started"]');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                this.startUserSession();
            });
        }

        // Handle demo button
        const demoBtn = document.querySelector('[data-action="show-demo"]');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                this.showDemoModal();
            });
        }

        // Initialize scroll animations
        this.initializeScrollAnimations();
    }

    startUserSession() {
        // Set user as logged in
        const user = this.dataStore.getUser();
        if (user) {
            sessionStorage.setItem('userSession', JSON.stringify({
                userId: user.id,
                loggedIn: true,
                timestamp: new Date().toISOString()
            }));
        }
        
        // Navigate to dashboard
        this.router.navigateToDashboard();
    }

    showDemoModal() {
        this.showModal('Demo Available', 'Experience our AI-powered workflow builder in the Dashboard. Click "Get Started" to begin!');
    }

    // Dashboard Functionality
    initializeDashboard() {
        console.log('Initializing dashboard');
        
        // Load and display data
        this.loadDashboardData();
        
        // Setup dashboard interactions
        this.setupDashboardInteractions();
    }

    loadDashboardData() {
        const connections = this.dataStore.getConnections();
        const workflows = this.dataStore.getWorkflows();
        const executions = this.dataStore.getExecutions();
        
        // Update metrics
        this.updateDashboardMetrics(connections, workflows, executions);
        
        // Render connections
        this.renderConnectedApps(connections.filter(c => c.status === 'connected'));
        
        // Render workflows
        this.renderWorkflows(workflows);
        
        // Render activity
        this.renderRecentActivity(executions);
    }

    updateDashboardMetrics(connections, workflows, executions) {
        const connectedApps = connections.filter(c => c.status === 'connected').length;
        const activeWorkflows = workflows.filter(w => w.enabled).length;
        const successfulRuns = executions.filter(e => e.status === 'success').length;
        const timeSaved = this.calculateTimeSaved(executions);

        // Update DOM elements
        const metrics = {
            'connected-apps': connectedApps,
            'active-workflows': activeWorkflows,
            'successful-runs': successfulRuns,
            'time-saved': timeSaved
        };

        Object.entries(metrics).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    calculateTimeSaved(executions) {
        // Calculate estimated time saved based on executions
        const averageTimePerExecution = 5; // minutes
        return (executions.length * averageTimePerExecution / 60).toFixed(1);
    }

    renderConnectedApps(apps) {
        const container = document.getElementById('connected-apps-grid');
        if (!container) return;

        container.innerHTML = apps.map(app => `
            <div class="app-card connected" data-connection-id="${app.id}">
                <div class="status-indicator status-connected"></div>
                <div class="text-2xl mb-2">${app.icon}</div>
                <h3 class="font-semibold text-gray-900 text-sm mb-1">${app.name}</h3>
                <p class="text-xs text-gray-600">${app.type}</p>
                <div class="mt-2 text-xs text-green-600 font-medium">
                    ✓ Connected
                </div>
            </div>
        `).join('');
    }

    renderWorkflows(workflows) {
        const container = document.getElementById('workflows-list');
        if (!container) return;

        container.innerHTML = workflows.map(workflow => `
            <div class="workflow-card" data-workflow-id="${workflow.id}">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center mb-2">
                            <h3 class="font-semibold text-gray-900 mr-4">${workflow.name}</h3>
                            <span class="workflow-status ${workflow.enabled ? 'active' : 'paused'}">
                                ${workflow.enabled ? 'Active' : 'Paused'}
                            </span>
                        </div>
                        <div class="text-sm text-gray-600 mb-2">
                            <span class="font-medium">Trigger:</span> ${workflow.trigger.event} • 
                            <span class="font-medium">Apps:</span> ${workflow.nodes.filter(n => n.type === 'action').map(n => n.app).join(', ')}
                        </div>
                        <div class="text-xs text-gray-500">
                            ${workflow.runs || 0} runs • Success rate: ${workflow.successRate || 0}% • Avg: ${workflow.averageDuration || '0s'}
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <label class="toggle-switch">
                            <input type="checkbox" class="workflow-toggle" data-workflow-id="${workflow.id}" ${workflow.enabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                        <button class="text-gray-400 hover:text-gray-600" onclick="app.runWorkflow('${workflow.id}')">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderRecentActivity(executions) {
        const container = document.getElementById('activity-feed');
        if (!container) return;

        const recentExecutions = executions.slice(0, 5);
        
        container.innerHTML = recentExecutions.map(execution => `
            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg" data-execution-id="${execution.id}">
                <div class="text-2xl">${execution.status === 'success' ? '✅' : '❌'}</div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">${execution.workflowName} ${execution.status}</p>
                    <p class="text-xs text-gray-500">${this.formatDate(execution.createdAt)}</p>
                </div>
            </div>
        `).join('');
    }

    setupDashboardInteractions() {
        // Workflow toggles
        document.querySelectorAll('.workflow-toggle').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const workflowId = e.target.getAttribute('data-workflow-id');
                const enabled = e.target.checked;
                this.toggleWorkflow(workflowId, enabled);
            });
        });
    }

    toggleWorkflow(workflowId, enabled) {
        const workflow = this.dataStore.getWorkflow(workflowId);
        if (workflow) {
            workflow.enabled = enabled;
            this.dataStore.updateWorkflow(workflowId, workflow);
            this.showToast(`Workflow "${workflow.name}" ${enabled ? 'enabled' : 'disabled'}`, 'success');
        }
    }

    runWorkflow(workflowId) {
        const workflow = this.dataStore.getWorkflow(workflowId);
        if (workflow) {
            this.showToast(`Running workflow "${workflow.name}"...`, 'info');
            
            // Simulate workflow execution
            this.workflowEngine.executeWorkflow(workflowId, { test: true })
                .then(execution => {
                    if (execution.status === 'success') {
                        this.showToast(`Workflow "${workflow.name}" completed successfully!`, 'success');
                    } else {
                        this.showToast(`Workflow "${workflow.name}" failed: ${execution.error}`, 'error');
                    }
                    this.loadDashboardData(); // Refresh data
                })
                .catch(error => {
                    this.showToast(`Workflow execution failed: ${error.message}`, 'error');
                });
        }
    }

    // Workflow Builder Functionality
    initializeWorkflowBuilder() {
        console.log('Initializing workflow builder');
        
        this.setupChatInterface();
        this.loadWorkflowTemplates();
    }

    setupChatInterface() {
        const form = document.getElementById('workflow-chat-form');
        const textarea = document.querySelector('.chat-input');
        
        if (!form || !textarea) return;

        // Create chat session
        this.currentChatSession = this.dataStore.createChatSession();

        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                this.handleChatMessage(message);
                textarea.value = '';
            }
        });

        // Handle templates
        document.querySelectorAll('.sidebar-link[onclick*="loadTemplate"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const template = link.getAttribute('onclick').match(/loadTemplate\('(.+)'\)/)[1];
                this.loadTemplate(template);
            });
        });
    }

    handleChatMessage(message) {
        if (!this.currentChatSession) return;

        // Add user message to chat
        const userMessage = {
            role: 'user',
            content: message
        };
        this.dataStore.addChatMessage(this.currentChatSession.id, userMessage);
        this.addChatMessage(message, 'user');

        // Show typing indicator
        this.showTypingIndicator();

        // Process with AI after delay
        setTimeout(() => {
            this.processChatMessage(message);
        }, 2000);
    }

    processChatMessage(message) {
        // Simple AI response simulation
        const analysis = this.analyzeMessageIntent(message);
        const response = this.generateAIResponse(analysis);
        
        const aiMessage = {
            role: 'assistant',
            content: response
        };
        
        this.dataStore.addChatMessage(this.currentChatSession.id, aiMessage);
        this.addChatMessage(response, 'ai');
        
        // Generate workflow diagram
        const workflow = this.generateWorkflowFromMessage(message, analysis);
        this.updateWorkflowDiagram(workflow);
        
        // Hide typing indicator
        this.hideTypingIndicator();
    }

    analyzeMessageIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('client') && lowerMessage.includes('email')) {
            return { category: 'client_welcome', confidence: 0.9 };
        } else if (lowerMessage.includes('meeting') && lowerMessage.includes('slack')) {
            return { category: 'meeting_notes', confidence: 0.9 };
        } else if (lowerMessage.includes('calendar') && lowerMessage.includes('trello')) {
            return { category: 'calendar_trello', confidence: 0.9 };
        } else if (lowerMessage.includes('lead') && lowerMessage.includes('crm')) {
            return { category: 'lead_crm', confidence: 0.9 };
        }
        
        return { category: 'general', confidence: 0.5 };
    }

    generateAIResponse(analysis) {
        const responses = {
            'client_welcome': "Perfect! I'll create a client welcome workflow that sends emails and notifies your team.",
            'meeting_notes': "Great! I'll set up a workflow to extract meeting notes and post them to Slack.",
            'calendar_trello': "Excellent! I'll create a workflow that creates Trello cards from calendar events.",
            'lead_crm': "Smart! I'll build a workflow that adds leads to your CRM automatically.",
            'general': "I'll create a custom workflow based on your requirements. Let me build that for you."
        };
        
        return responses[analysis.category] || responses['general'];
    }

    generateWorkflowFromMessage(message, analysis) {
        const workflows = {
            'client_welcome': {
                name: 'Client Welcome Email',
                steps: ['New Client Detected', 'Send Welcome Email', 'Notify Team'],
                apps: ['HubSpot', 'Gmail', 'Slack']
            },
            'meeting_notes': {
                name: 'Meeting Notes Distribution',
                steps: ['Meeting Ends', 'Extract Notes', 'Post to Slack'],
                apps: ['Google Calendar', 'Slack']
            },
            'calendar_trello': {
                name: 'Calendar to Trello',
                steps: ['New Event Created', 'Create Trello Card'],
                apps: ['Google Calendar', 'Trello']
            },
            'lead_crm': {
                name: 'Lead to CRM',
                steps: ['Form Submitted', 'Add to CRM', 'Notify Sales'],
                apps: ['Form', 'HubSpot', 'Slack']
            }
        };
        
        return workflows[analysis.category] || {
            name: 'Custom Workflow',
            steps: ['Trigger Event', 'Process Data', 'Execute Action'],
            apps: ['Various Apps']
        };
    }

    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-bubble">
                <p>${message}</p>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message ai';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    updateWorkflowDiagram(workflow) {
        const canvas = document.getElementById('workflow-canvas');
        if (!canvas) return;

        // Clear canvas
        canvas.innerHTML = '';

        // Create nodes
        const steps = workflow.steps || ['Trigger', 'Process', 'Action'];
        steps.forEach((step, index) => {
            const node = document.createElement('div');
            node.className = `workflow-node ${index === 0 ? 'trigger' : index === steps.length - 1 ? 'action' : 'process'}`;
            node.style.left = `${100 + (index * 250)}px`;
            node.style.top = '100px';
            
            const icon = this.getStepIcon(index);
            const type = index === 0 ? 'Trigger' : index === steps.length - 1 ? 'Action' : 'Process';
            
            node.innerHTML = `
                <div class="node-icon">${icon}</div>
                <div class="node-title">${step}</div>
                <div class="node-description">${type} step</div>
            `;
            
            canvas.appendChild(node);
        });
    }

    getStepIcon(index) {
        const icons = ['⚡', '⚙️', '📤', '🔗', '📋', '📧', '💬', '📅'];
        return icons[index] || '⚙️';
    }

    loadTemplate(templateType) {
        const templates = {
            'client-email': 'When I book a new client, send them a welcome email and notify the team',
            'meeting-notes': 'After each meeting, extract the notes and post them to the team Slack channel',
            'calendar-trello': 'When I create a new calendar event, create a corresponding Trello card',
            'lead-crm': 'When someone fills out our contact form, add them as a lead in our CRM'
        };

        const message = templates[templateType];
        if (message) {
            const textarea = document.querySelector('.chat-input');
            if (textarea) {
                textarea.value = message;
                textarea.focus();
            }
        }
    }

    loadWorkflowTemplates() {
        // This would load templates from the data store
        console.log('Loading workflow templates');
    }

    // App Connections Functionality
    initializeAppConnections() {
        console.log('Initializing app connections');
        this.loadAppConnections();
        this.setupConnectionHandlers();
    }

    loadAppConnections() {
        const connections = this.dataStore.getConnections();
        this.renderAppConnections(connections);
    }

    renderAppConnections(connections) {
        const container = document.getElementById('apps-grid');
        if (!container) return;

        container.innerHTML = connections.map(connection => `
            <div class="app-card ${connection.status}" data-connection-id="${connection.id}">
                <div class="status-indicator status-${connection.status}"></div>
                <div class="text-2xl mb-2">${connection.icon}</div>
                <h3 class="font-semibold text-gray-900 text-sm mb-1">${connection.name}</h3>
                <p class="text-xs text-gray-600">${connection.type}</p>
                <div class="mt-2 text-xs font-medium">
                    ${connection.status === 'connected' ? '✓ Connected' : 'Not Connected'}
                </div>
                <button class="connect-button ${connection.status === 'connected' ? 'disconnect' : ''}" 
                        onclick="app.handleConnection('${connection.id}')">
                    ${connection.status === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
            </div>
        `).join('');
    }

    setupConnectionHandlers() {
        // Search functionality
        const searchInput = document.getElementById('app-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchApps(e.target.value);
            });
        }
    }

    handleConnection(connectionId) {
        const connection = this.dataStore.getConnection(connectionId);
        if (!connection) return;

        if (connection.status === 'connected') {
            this.disconnectApp(connectionId);
        } else {
            this.connectApp(connectionId);
        }
    }

    connectApp(connectionId) {
        const connection = this.dataStore.getConnection(connectionId);
        if (!connection) return;

        // Show connection modal or process
        this.showConnectionModal(connection);
    }

    disconnectApp(connectionId) {
        const connection = this.dataStore.getConnection(connectionId);
        if (!connection) return;

        if (confirm(`Are you sure you want to disconnect ${connection.name}?`)) {
            connection.status = 'disconnected';
            connection.config = null;
            connection.health = 0;
            
            this.dataStore.updateConnection(connectionId, connection);
            this.loadAppConnections();
            this.showToast(`${connection.name} disconnected successfully`, 'success');
        }
    }

    showConnectionModal(connection) {
        // Create and show connection modal
        const modal = this.createModal('Connect ' + connection.name, `
            <form id="connection-form" onsubmit="app.processConnection('${connection.id}', event)">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Authentication Method</label>
                    <select name="authType" class="form-input" required>
                        <option value="">Select method</option>
                        <option value="oauth">OAuth</option>
                        <option value="api_key">API Key</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Credentials</label>
                    <input type="text" name="credentials" class="form-input" placeholder="Enter your credentials" required>
                </div>
                <div class="flex space-x-3">
                    <button type="submit" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Connect
                    </button>
                    <button type="button" onclick="app.closeModal()" class="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                </div>
            </form>
        `);
        
        document.body.appendChild(modal);
    }

    processConnection(connectionId, event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        const connection = this.dataStore.getConnection(connectionId);
        if (!connection) return;

        // Simulate connection process
        connection.status = 'connected';
        connection.config = {
            authType: formData.get('authType'),
            credentials: formData.get('credentials'),
            lastSync: new Date().toISOString()
        };
        connection.health = 100;

        this.dataStore.updateConnection(connectionId, connection);
        this.loadAppConnections();
        this.closeModal();
        this.showToast(`${connection.name} connected successfully!`, 'success');
    }

    searchApps(query) {
        const connections = this.dataStore.getConnections();
        const filtered = connections.filter(conn => 
            conn.name.toLowerCase().includes(query.toLowerCase()) ||
            conn.type.toLowerCase().includes(query.toLowerCase())
        );
        this.renderAppConnections(filtered);
    }

    // Execution History Functionality
    initializeExecutionHistory() {
        console.log('Initializing execution history');
        this.loadExecutionHistory();
        this.setupHistoryFilters();
    }

    loadExecutionHistory() {
        const executions = this.dataStore.getExecutions();
        this.renderExecutionHistory(executions);
        this.updateHistoryStats(executions);
    }

    renderExecutionHistory(executions) {
        const container = document.getElementById('executions-list');
        if (!container) return;

        container.innerHTML = executions.map(execution => `
            <div class="execution-card" data-execution-id="${execution.id}" onclick="app.showExecutionDetails('${execution.id}')">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center mb-2">
                            <h3 class="font-semibold text-gray-900 mr-4">${execution.workflowName}</h3>
                            <span class="status-badge status-${execution.status}">
                                ${execution.status}
                            </span>
                        </div>
                        <div class="text-sm text-gray-600 mb-2">
                            Started: ${this.formatDate(execution.startedAt)} • Duration: ${execution.duration}ms
                        </div>
                        <div class="text-xs text-gray-500">
                            Execution ID: #${execution.id} • ${execution.steps ? execution.steps.length : 0} steps
                        </div>
                    </div>
                    <svg class="w-5 h-5 text-gray-400 transform transition-transform" id="arrow-${execution.id}">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
        `).join('');
    }

    updateHistoryStats(executions) {
        const total = executions.length;
        const successful = executions.filter(e => e.status === 'success').length;
        const failed = executions.filter(e => e.status === 'failed').length;
        const avgDuration = executions.reduce((sum, e) => sum + (e.duration || 0), 0) / total;

        const stats = {
            'total-executions': total,
            'successful-executions': successful,
            'failed-executions': failed,
            'avg-duration': `${(avgDuration / 1000).toFixed(1)}s`
        };

        Object.entries(stats).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    setupHistoryFilters() {
        // Filter buttons
        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.textContent.toLowerCase();
                this.filterExecutions(filter);
            });
        });
    }

    filterExecutions(filter) {
        const executions = this.dataStore.getExecutions();
        let filtered;

        switch (filter) {
            case 'all':
                filtered = executions;
                break;
            case 'success':
                filtered = executions.filter(e => e.status === 'success');
                break;
            case 'failed':
                filtered = executions.filter(e => e.status === 'failed');
                break;
            case 'running':
                filtered = executions.filter(e => e.status === 'running');
                break;
            default:
                filtered = executions;
        }

        this.renderExecutionHistory(filtered);
    }

    showExecutionDetails(executionId) {
        const execution = this.dataStore.getExecution(executionId);
        if (!execution) return;

        const modal = this.createModal('Execution Details', `
            <div class="space-y-4">
                <div>
                    <h4 class="font-semibold text-gray-900">Workflow: ${execution.workflowName}</h4>
                    <p class="text-sm text-gray-600">Status: ${execution.status}</p>
                    <p class="text-sm text-gray-600">Duration: ${execution.duration}ms</p>
                </div>
                ${execution.steps ? `
                <div>
                    <h5 class="font-medium text-gray-900 mb-2">Execution Steps</h5>
                    <div class="space-y-2">
                        ${execution.steps.map(step => `
                            <div class="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                <div class="w-2 h-2 rounded-full ${step.status === 'success' ? 'bg-green-500' : 'bg-red-500'}"></div>
                                <span class="text-sm">${step.stepId}: ${step.status}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    // Global Event Handlers
    handleFormSubmission(e) {
        const form = e.target;
        
        if (form.matches('#workflow-chat-form')) {
            e.preventDefault();
            // Handled by workflow builder
        } else if (form.matches('#connection-form')) {
            e.preventDefault();
            // Handled by app connections
        } else if (form.matches('#login-form')) {
            e.preventDefault();
            this.handleLogin(form);
        }
    }

    handleButtonClick(e) {
        const button = e.target.closest('[data-action]');
        if (!button) return;

        const action = button.getAttribute('data-action');
        
        switch (action) {
            case 'get-started':
                this.startUserSession();
                break;
            case 'show-demo':
                this.showDemoModal();
                break;
            case 'save-workflow':
                this.saveCurrentWorkflow();
                break;
            case 'test-workflow':
                this.testCurrentWorkflow();
                break;
            case 'clear-workflow':
                this.clearCurrentWorkflow();
                break;
            case 'connect-app':
                const appId = button.getAttribute('data-app-id');
                this.connectApp(appId);
                break;
            case 'disconnect-app':
                const disconnectId = button.getAttribute('data-app-id');
                this.disconnectApp(disconnectId);
                break;
            default:
                this.showComingSoon();
        }
    }

    handleToggleChange(e) {
        if (e.target.matches('.workflow-toggle')) {
            const workflowId = e.target.getAttribute('data-workflow-id');
            const enabled = e.target.checked;
            this.toggleWorkflow(workflowId, enabled);
        }
    }

    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    this.focusSearch();
                    break;
                case 'n':
                    e.preventDefault();
                    this.router.navigateToBuilder();
                    break;
            }
        }
    }

    // Utility Methods
    focusSearch() {
        const searchInput = document.querySelector('#app-search, #workflow-search');
        if (searchInput) {
            searchInput.focus();
        }
    }

    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">${title}</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="text-gray-700">${content}</div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    closeModal() {
        const modal = document.querySelector('.fixed.inset-0');
        if (modal) {
            modal.remove();
        }
    }

    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">${title}</h3>
                    <button onclick="app.closeModal()" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="text-gray-700">${content}</div>
            </div>
        `;
        return modal;
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-20 right-4 px-6 py-3 rounded-lg text-white z-50 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'warning' ? 'bg-yellow-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Animate in
        if (typeof anime !== 'undefined') {
            anime({
                targets: toast,
                translateX: [100, 0],
                opacity: [0, 1],
                duration: 300,
                complete: () => {
                    setTimeout(() => {
                        anime({
                            targets: toast,
                            translateX: [0, 100],
                            opacity: [1, 0],
                            duration: 300,
                            complete: () => toast.remove()
                        });
                    }, 3000);
                }
            });
        } else {
            // Fallback without animation
            setTimeout(() => toast.remove(), 3000);
        }
    }

    showComingSoon() {
        this.showToast('This feature is coming soon!', 'info');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
        
        return date.toLocaleDateString();
    }

    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ConduitAI();
    window.app = app; // Make app globally available for debugging
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConduitAI;
}