// Conduit AI - Core Data Models and Storage
// Functional rebuild with proper data persistence

class DataStore {
    constructor() {
        this.storageKey = 'conduit_ai_data';
        this.data = this.loadData();
        this.initializeDefaultData();
    }

    loadData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : this.getDefaultData();
        } catch (error) {
            console.error('Failed to load data:', error);
            return this.getDefaultData();
        }
    }

    saveData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            return true;
        } catch (error) {
            console.error('Failed to save data:', error);
            return false;
        }
    }

    getDefaultData() {
        return {
            user: null,
            connections: [],
            workflows: [],
            executions: [],
            chatSessions: [],
            settings: {
                theme: 'light',
                notifications: true
            }
        };
    }

    initializeDefaultData() {
        if (this.data.connections.length === 0) {
            this.data.connections = this.getDefaultConnections();
        }
        if (this.data.workflows.length === 0) {
            this.data.workflows = this.getDefaultWorkflows();
        }
        if (this.data.executions.length === 0) {
            this.data.executions = this.getDefaultExecutions();
        }
        this.saveData();
    }

    getDefaultConnections() {
        return [
            {
                id: 'gmail_001',
                name: 'Gmail',
                type: 'email',
                status: 'connected',
                icon: '📧',
                config: {
                    email: 'user@gmail.com',
                    authType: 'oauth',
                    scopes: ['read', 'send'],
                    lastSync: new Date().toISOString()
                },
                health: 98,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'slack_001',
                name: 'Slack',
                type: 'communication',
                status: 'connected',
                icon: '💬',
                config: {
                    workspace: 'myworkspace',
                    authType: 'oauth',
                    scopes: ['read', 'write'],
                    lastSync: new Date().toISOString()
                },
                health: 95,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'trello_001',
                name: 'Trello',
                type: 'productivity',
                status: 'connected',
                icon: '📋',
                config: {
                    username: 'myusername',
                    authType: 'api_key',
                    scopes: ['read', 'write'],
                    lastSync: new Date().toISOString()
                },
                health: 92,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'hubspot_001',
                name: 'HubSpot',
                type: 'crm',
                status: 'disconnected',
                icon: '🎯',
                config: null,
                health: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'zoom_001',
                name: 'Zoom',
                type: 'video',
                status: 'disconnected',
                icon: '📹',
                config: null,
                health: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
    }

    getDefaultWorkflows() {
        return [
            {
                id: 'wf_001',
                name: 'Client Welcome Email',
                description: 'Automatically send welcome emails to new clients',
                enabled: true,
                trigger: {
                    app: 'hubspot',
                    event: 'new_contact_created',
                    conditions: [
                        { field: 'contact_type', operator: 'equals', value: 'client' }
                    ]
                },
                nodes: [
                    {
                        id: 'trigger_1',
                        type: 'trigger',
                        app: 'hubspot',
                        action: 'new_contact_created',
                        position: { x: 100, y: 100 },
                        config: {}
                    },
                    {
                        id: 'action_1',
                        type: 'action',
                        app: 'gmail',
                        action: 'send_email',
                        position: { x: 400, y: 100 },
                        config: {
                            template: 'welcome_client',
                            subject: 'Welcome to our service!'
                        }
                    },
                    {
                        id: 'action_2',
                        type: 'action',
                        app: 'slack',
                        action: 'send_message',
                        position: { x: 400, y: 250 },
                        config: {
                            channel: '#sales',
                            message: 'New client onboarded: {{contact.name}}'
                        }
                    }
                ],
                edges: [
                    { from: 'trigger_1', to: 'action_1' },
                    { from: 'trigger_1', to: 'action_2' }
                ],
                runs: 12,
                successRate: 100,
                averageDuration: '1.2s',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
    }

    getDefaultExecutions() {
        const now = new Date();
        
        return [
            {
                id: 'exec_001',
                workflowId: 'wf_001',
                workflowName: 'Client Welcome Email',
                status: 'success',
                triggerData: {
                    contactId: 'contact_123',
                    contactName: 'Acme Corp',
                    contactEmail: 'contact@acme.com'
                },
                steps: [
                    {
                        stepId: 'trigger_1',
                        nodeId: 'trigger_1',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 86400000).toISOString(),
                        completedAt: new Date(now.getTime() - 86400000 + 100).toISOString(),
                        duration: 100,
                        input: { contactId: 'contact_123' },
                        output: { contact: { name: 'Acme Corp', email: 'contact@acme.com' } },
                        error: null
                    },
                    {
                        stepId: 'action_1',
                        nodeId: 'action_1',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 86400000 + 200).toISOString(),
                        completedAt: new Date(now.getTime() - 86400000 + 800).toISOString(),
                        duration: 600,
                        input: { contact: { name: 'Acme Corp', email: 'contact@acme.com' } },
                        output: { messageId: 'msg_abc123', status: 'sent' },
                        error: null
                    },
                    {
                        stepId: 'action_2',
                        nodeId: 'action_2',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 86400000 + 900).toISOString(),
                        completedAt: new Date(now.getTime() - 86400000 + 1100).toISOString(),
                        duration: 200,
                        input: { contact: { name: 'Acme Corp' } },
                        output: { messageId: 'slack_msg_456', status: 'posted' },
                        error: null
                    }
                ],
                startedAt: new Date(now.getTime() - 86400000).toISOString(),
                completedAt: new Date(now.getTime() - 86400000 + 1200).toISOString(),
                duration: 1200,
                error: null,
                createdAt: new Date(now.getTime() - 86400000).toISOString()
            },
            {
                id: 'exec_002',
                workflowId: 'wf_001',
                workflowName: 'Client Welcome Email',
                status: 'failed',
                triggerData: {
                    contactId: 'contact_124',
                    contactName: 'Beta Industries',
                    contactEmail: 'info@beta.com'
                },
                steps: [
                    {
                        stepId: 'trigger_1',
                        nodeId: 'trigger_1',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 172800000).toISOString(),
                        completedAt: new Date(now.getTime() - 172800000 + 100).toISOString(),
                        duration: 100,
                        input: { contactId: 'contact_124' },
                        output: { contact: { name: 'Beta Industries', email: 'info@beta.com' } },
                        error: null
                    },
                    {
                        stepId: 'action_1',
                        nodeId: 'action_1',
                        status: 'failed',
                        startedAt: new Date(now.getTime() - 172800000 + 200).toISOString(),
                        completedAt: new Date(now.getTime() - 172800000 + 1200).toISOString(),
                        duration: 1000,
                        input: { contact: { name: 'Beta Industries', email: 'info@beta.com' } },
                        output: null,
                        error: 'SMTP authentication failed'
                    },
                    {
                        stepId: 'action_2',
                        nodeId: 'action_2',
                        status: 'cancelled',
                        startedAt: null,
                        completedAt: null,
                        duration: 0,
                        input: null,
                        output: null,
                        error: 'Previous step failed'
                    }
                ],
                startedAt: new Date(now.getTime() - 172800000).toISOString(),
                completedAt: new Date(now.getTime() - 172800000 + 1200).toISOString(),
                duration: 1200,
                error: 'SMTP authentication failed',
                createdAt: new Date(now.getTime() - 172800000).toISOString()
            },
            {
                id: 'exec_003',
                workflowId: 'wf_001',
                workflowName: 'Client Welcome Email',
                status: 'success',
                triggerData: {
                    contactId: 'contact_125',
                    contactName: 'Charlie LLC',
                    contactEmail: 'hello@charlie.com'
                },
                steps: [
                    {
                        stepId: 'trigger_1',
                        nodeId: 'trigger_1',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 259200000).toISOString(),
                        completedAt: new Date(now.getTime() - 259200000 + 150).toISOString(),
                        duration: 150,
                        input: { contactId: 'contact_125' },
                        output: { contact: { name: 'Charlie LLC', email: 'hello@charlie.com' } },
                        error: null
                    },
                    {
                        stepId: 'action_1',
                        nodeId: 'action_1',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 259200000 + 250).toISOString(),
                        completedAt: new Date(now.getTime() - 259200000 + 950).toISOString(),
                        duration: 700,
                        input: { contact: { name: 'Charlie LLC', email: 'hello@charlie.com' } },
                        output: { messageId: 'msg_def456', status: 'sent' },
                        error: null
                    },
                    {
                        stepId: 'action_2',
                        nodeId: 'action_2',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 259200000 + 1050).toISOString(),
                        completedAt: new Date(now.getTime() - 259200000 + 1250).toISOString(),
                        duration: 200,
                        input: { contact: { name: 'Charlie LLC' } },
                        output: { messageId: 'slack_msg_789', status: 'posted' },
                        error: null
                    }
                ],
                startedAt: new Date(now.getTime() - 259200000).toISOString(),
                completedAt: new Date(now.getTime() - 259200000 + 1250).toISOString(),
                duration: 1250,
                error: null,
                createdAt: new Date(now.getTime() - 259200000).toISOString()
            },
            {
                id: 'exec_004',
                workflowId: 'wf_001',
                workflowName: 'Client Welcome Email',
                status: 'success',
                triggerData: {
                    contactId: 'contact_126',
                    contactName: 'Delta Solutions',
                    contactEmail: 'contact@delta.com'
                },
                steps: [
                    {
                        stepId: 'trigger_1',
                        nodeId: 'trigger_1',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 345600000).toISOString(),
                        completedAt: new Date(now.getTime() - 345600000 + 120).toISOString(),
                        duration: 120,
                        input: { contactId: 'contact_126' },
                        output: { contact: { name: 'Delta Solutions', email: 'contact@delta.com' } },
                        error: null
                    },
                    {
                        stepId: 'action_1',
                        nodeId: 'action_1',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 345600000 + 220).toISOString(),
                        completedAt: new Date(now.getTime() - 345600000 + 820).toISOString(),
                        duration: 600,
                        input: { contact: { name: 'Delta Solutions', email: 'contact@delta.com' } },
                        output: { messageId: 'msg_ghi789', status: 'sent' },
                        error: null
                    },
                    {
                        stepId: 'action_2',
                        nodeId: 'action_2',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 345600000 + 920).toISOString(),
                        completedAt: new Date(now.getTime() - 345600000 + 1120).toISOString(),
                        duration: 200,
                        input: { contact: { name: 'Delta Solutions' } },
                        output: { messageId: 'slack_msg_012', status: 'posted' },
                        error: null
                    }
                ],
                startedAt: new Date(now.getTime() - 345600000).toISOString(),
                completedAt: new Date(now.getTime() - 345600000 + 1120).toISOString(),
                duration: 1120,
                error: null,
                createdAt: new Date(now.getTime() - 345600000).toISOString()
            },
            {
                id: 'exec_005',
                workflowId: 'wf_001',
                workflowName: 'Client Welcome Email',
                status: 'success',
                triggerData: {
                    contactId: 'contact_127',
                    contactName: 'Echo Enterprises',
                    contactEmail: 'team@echo.com'
                },
                steps: [
                    {
                        stepId: 'trigger_1',
                        nodeId: 'trigger_1',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 432000000).toISOString(),
                        completedAt: new Date(now.getTime() - 432000000 + 110).toISOString(),
                        duration: 110,
                        input: { contactId: 'contact_127' },
                        output: { contact: { name: 'Echo Enterprises', email: 'team@echo.com' } },
                        error: null
                    },
                    {
                        stepId: 'action_1',
                        nodeId: 'action_1',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 432000000 + 210).toISOString(),
                        completedAt: new Date(now.getTime() - 432000000 + 810).toISOString(),
                        duration: 600,
                        input: { contact: { name: 'Echo Enterprises', email: 'team@echo.com' } },
                        output: { messageId: 'msg_jkl012', status: 'sent' },
                        error: null
                    },
                    {
                        stepId: 'action_2',
                        nodeId: 'action_2',
                        status: 'success',
                        startedAt: new Date(now.getTime() - 432000000 + 910).toISOString(),
                        completedAt: new Date(now.getTime() - 432000000 + 1110).toISOString(),
                        duration: 200,
                        input: { contact: { name: 'Echo Enterprises' } },
                        output: { messageId: 'slack_msg_345', status: 'posted' },
                        error: null
                    }
                ],
                startedAt: new Date(now.getTime() - 432000000).toISOString(),
                completedAt: new Date(now.getTime() - 432000000 + 1110).toISOString(),
                duration: 1110,
                error: null,
                createdAt: new Date(now.getTime() - 432000000).toISOString()
            }
        ];
    }

    // User Management
    setUser(userData) {
        this.data.user = userData;
        this.saveData();
    }

    getUser() {
        return this.data.user;
    }

    // Connection Management
    createConnection(connectionData) {
        const connection = {
            ...connectionData,
            id: `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.data.connections.push(connection);
        this.saveData();
        return connection;
    }

    getConnections() {
        return this.data.connections;
    }

    getConnection(id) {
        return this.data.connections.find(conn => conn.id === id);
    }

    updateConnection(id, updates) {
        const index = this.data.connections.findIndex(conn => conn.id === id);
        if (index !== -1) {
            this.data.connections[index] = {
                ...this.data.connections[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveData();
            return this.data.connections[index];
        }
        return null;
    }

    deleteConnection(id) {
        const index = this.data.connections.findIndex(conn => conn.id === id);
        if (index !== -1) {
            const deleted = this.data.connections.splice(index, 1)[0];
            this.saveData();
            return deleted;
        }
        return null;
    }

    // Workflow Management
    createWorkflow(workflowData) {
        const workflow = {
            ...workflowData,
            id: `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.data.workflows.push(workflow);
        this.saveData();
        return workflow;
    }

    getWorkflows() {
        return this.data.workflows;
    }

    getWorkflow(id) {
        return this.data.workflows.find(wf => wf.id === id);
    }

    updateWorkflow(id, updates) {
        const index = this.data.workflows.findIndex(wf => wf.id === id);
        if (index !== -1) {
            this.data.workflows[index] = {
                ...this.data.workflows[index],
                ...updates,
                updatedAt: new Date().toISOString()
        };
            this.saveData();
            return this.data.workflows[index];
        }
        return null;
    }

    deleteWorkflow(id) {
        const index = this.data.workflows.findIndex(wf => wf.id === id);
        if (index !== -1) {
            const deleted = this.data.workflows.splice(index, 1)[0];
            this.saveData();
            return deleted;
        }
        return null;
    }

    // Execution Management
    createExecution(executionData) {
        const execution = {
            ...executionData,
            id: `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString()
        };
        
        this.data.executions.push(execution);
        this.saveData();
        return execution;
    }

    getExecutions() {
        return this.data.executions;
    }

    getExecution(id) {
        return this.data.executions.find(exec => exec.id === id);
    }

    getExecutionsByWorkflow(workflowId) {
        return this.data.executions.filter(exec => exec.workflowId === workflowId);
    }

    // Chat Session Management
    createChatSession() {
        const session = {
            id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.data.chatSessions.push(session);
        this.saveData();
        return session;
    }

    getChatSessions() {
        return this.data.chatSessions;
    }

    getChatSession(id) {
        return this.data.chatSessions.find(session => session.id === id);
    }

    addChatMessage(sessionId, message) {
        const session = this.getChatSession(sessionId);
        if (session) {
            session.messages.push({
                ...message,
                id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toISOString()
            });
            session.updatedAt = new Date().toISOString();
            this.saveData();
            return session;
        }
        return null;
    }

    // Utility Methods
    clearAllData() {
        this.data = this.getDefaultData();
        this.saveData();
    }

    exportData() {
        return JSON.stringify(this.data, null, 2);
    }

    importData(jsonData) {
        try {
            this.data = JSON.parse(jsonData);
            this.saveData();
            return true;
        } catch (error) {
            console.error('Failed to import data:', error);
            return false;
        }
    }
}

// Workflow Engine for execution simulation
class WorkflowEngine {
    constructor(dataStore) {
        this.dataStore = dataStore;
        this.isRunning = false;
    }

    async executeWorkflow(workflowId, triggerData = {}) {
        const workflow = this.dataStore.getWorkflow(workflowId);
        if (!workflow) {
            throw new Error(`Workflow ${workflowId} not found`);
        }

        this.isRunning = true;
        const execution = {
            workflowId: workflowId,
            workflowName: workflow.name,
            status: 'running',
            triggerData: triggerData,
            steps: [],
            startedAt: new Date().toISOString()
        };

        try {
            // Execute each node in the workflow
            for (const node of workflow.nodes) {
                const step = await this.executeNode(node, triggerData);
                execution.steps.push(step);
                
                if (step.status === 'failed') {
                    execution.status = 'failed';
                    execution.error = step.error;
                    break;
                }
            }

            if (execution.status === 'running') {
                execution.status = 'success';
            }

            execution.completedAt = new Date().toISOString();
            execution.duration = new Date(execution.completedAt) - new Date(execution.startedAt);

            // Save execution
            this.dataStore.createExecution(execution);
            
            // Update workflow stats
            this.updateWorkflowStats(workflowId, execution.status);

            return execution;
        } catch (error) {
            execution.status = 'failed';
            execution.error = error.message;
            execution.completedAt = new Date().toISOString();
            
            this.dataStore.createExecution(execution);
            throw error;
        } finally {
            this.isRunning = false;
        }
    }

    async executeNode(node, inputData) {
        const step = {
            stepId: `${node.id}_${Date.now()}`,
            nodeId: node.id,
            status: 'running',
            startedAt: new Date().toISOString(),
            input: inputData,
            output: null,
            error: null
        };

        try {
            // Simulate node execution
            await this.simulateNodeExecution(node, inputData);
            
            step.status = 'success';
            step.output = this.generateNodeOutput(node, inputData);
            step.completedAt = new Date().toISOString();
            step.duration = new Date(step.completedAt) - new Date(step.startedAt);
            
            return step;
        } catch (error) {
            step.status = 'failed';
            step.error = error.message;
            step.completedAt = new Date().toISOString();
            return step;
        }
    }

    async simulateNodeExecution(node, inputData) {
        // Simulate async execution with random delay
        const delay = Math.random() * 1000 + 200;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Simulate random failure (5% chance)
        if (Math.random() < 0.05) {
            throw new Error(`Simulated failure in ${node.action}`);
        }
    }

    generateNodeOutput(node, inputData) {
        // Generate realistic output based on node type
        switch (node.app) {
            case 'gmail':
                return { messageId: `msg_${Math.random().toString(36).substr(2, 9)}`, status: 'sent' };
            case 'slack':
                return { messageId: `slack_${Math.random().toString(36).substr(2, 9)}`, status: 'posted' };
            case 'hubspot':
                return { contactId: `contact_${Math.random().toString(36).substr(2, 9)}`, status: 'created' };
            default:
                return { status: 'completed', data: inputData };
        }
    }

    updateWorkflowStats(workflowId, status) {
        const workflow = this.dataStore.getWorkflow(workflowId);
        if (workflow) {
            workflow.runs = (workflow.runs || 0) + 1;
            
            if (status === 'success') {
                const successfulRuns = Math.floor((workflow.runs - 1) * (workflow.successRate || 0) / 100);
                workflow.successRate = Math.round(((successfulRuns + 1) / workflow.runs) * 100);
            } else {
                const successfulRuns = Math.floor((workflow.runs - 1) * (workflow.successRate || 0) / 100);
                workflow.successRate = Math.round((successfulRuns / workflow.runs) * 100);
            }
            
            this.dataStore.updateWorkflow(workflowId, workflow);
        }
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataStore, WorkflowEngine };
}