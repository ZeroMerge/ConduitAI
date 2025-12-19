import { useState, useEffect } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import type { AppOption, ActionOption } from '../../types/workflow';
import './NodeEditor.css';

// Mock data for apps and actions
const mockApps: AppOption[] = [
  { id: 'gmail', name: 'Gmail', icon: '📧' },
  { id: 'slack', name: 'Slack', icon: '💬' },
  { id: 'notion', name: 'Notion', icon: '📝' },
  { id: 'calendar', name: 'Calendar', icon: '📅' },
  { id: 'drive', name: 'Google Drive', icon: '📁' },
];

const mockActions: Record<string, ActionOption[]> = {
  gmail: [
    {
      id: 'send_email',
      name: 'Send Email',
      description: 'Send an email to a recipient',
      parameters: [
        { id: 'to', name: 'To', type: 'text', required: true },
        { id: 'subject', name: 'Subject', type: 'text', required: true },
        { id: 'body', name: 'Body', type: 'textarea', required: true },
      ],
    },
    {
      id: 'search_emails',
      name: 'Search Emails',
      description: 'Search for emails matching criteria',
      parameters: [
        { id: 'query', name: 'Search Query', type: 'text', required: true },
        { id: 'maxResults', name: 'Max Results', type: 'number', required: false, defaultValue: 10 },
      ],
    },
  ],
  slack: [
    {
      id: 'send_message',
      name: 'Send Message',
      description: 'Send a message to a channel',
      parameters: [
        { id: 'channel', name: 'Channel', type: 'text', required: true },
        { id: 'message', name: 'Message', type: 'textarea', required: true },
      ],
    },
  ],
  notion: [
    {
      id: 'create_page',
      name: 'Create Page',
      description: 'Create a new page in Notion',
      parameters: [
        { id: 'title', name: 'Title', type: 'text', required: true },
        { id: 'content', name: 'Content', type: 'textarea', required: false },
      ],
    },
  ],
  calendar: [
    {
      id: 'create_event',
      name: 'Create Event',
      description: 'Create a calendar event',
      parameters: [
        { id: 'title', name: 'Title', type: 'text', required: true },
        { id: 'startTime', name: 'Start Time', type: 'text', required: true },
        { id: 'endTime', name: 'End Time', type: 'text', required: true },
      ],
    },
  ],
  drive: [
    {
      id: 'upload_file',
      name: 'Upload File',
      description: 'Upload a file to Google Drive',
      parameters: [
        { id: 'fileName', name: 'File Name', type: 'text', required: true },
        { id: 'folderId', name: 'Folder ID', type: 'text', required: false },
      ],
    },
  ],
};

const NodeEditor = () => {
  const { selectedNode, isNodeEditorOpen, closeNodeEditor, updateNode } = useWorkflowStore();
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [parameters, setParameters] = useState<Record<string, unknown>>({});
  const [testResult, setTestResult] = useState<string>('');
  const [isTesting, setIsTesting] = useState(false);

  // Initialize form state when modal opens
  const initialAppName = selectedNode?.data.appName || '';
  const initialActionName = selectedNode?.data.actionName || '';
  const initialParameters = selectedNode?.data.parameters || {};

  useEffect(() => {
    if (isNodeEditorOpen) {
      setSelectedApp(initialAppName);
      setSelectedAction(initialActionName);
      setParameters(initialParameters);
      setTestResult('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNodeEditorOpen]);

  if (!isNodeEditorOpen || !selectedNode) return null;

  const handleAppChange = (appId: string) => {
    setSelectedApp(appId);
    setSelectedAction('');
    setParameters({});
    const app = mockApps.find((a) => a.id === appId);
    if (app && selectedNode) {
      updateNode(selectedNode.id, {
        appName: app.name,
        appIcon: app.icon,
      });
    }
  };

  const handleActionChange = (actionId: string) => {
    setSelectedAction(actionId);
    const actions = mockActions[selectedApp] || [];
    const action = actions.find((a) => a.id === actionId);
    
    if (action) {
      // Initialize parameters with default values
      const defaultParams: Record<string, string | number | boolean> = {};
      action.parameters.forEach((param) => {
        if (param.defaultValue !== undefined) {
          defaultParams[param.id] = param.defaultValue;
        }
      });
      setParameters(defaultParams);
      
      if (selectedNode) {
        updateNode(selectedNode.id, {
          actionName: action.name,
          label: action.name,
        });
      }
    }
  };

  const handleParameterChange = (paramId: string, value: string | number | boolean) => {
    setParameters((prev) => ({ ...prev, [paramId]: value }));
  };

  const handleSave = () => {
    if (selectedNode) {
      updateNode(selectedNode.id, {
        parameters,
      });
    }
    closeNodeEditor();
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult('');
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setTestResult(`✓ Test successful!\n\nSample data processed:\n${JSON.stringify(parameters, null, 2)}`);
    setIsTesting(false);
  };

  const currentActions = selectedApp ? mockActions[selectedApp] || [] : [];
  const currentAction = currentActions.find((a) => a.id === selectedAction);

  return (
    <div className="node-editor-overlay" onClick={closeNodeEditor}>
      <div className="node-editor-modal" onClick={(e) => e.stopPropagation()}>
        <div className="node-editor-header">
          <h2>Configure {selectedNode.data.type} Node</h2>
          <button className="close-button" onClick={closeNodeEditor}>×</button>
        </div>
        
        <div className="node-editor-content">
          <div className="form-group">
            <label htmlFor="app-select">Select App</label>
            <select
              id="app-select"
              value={selectedApp}
              onChange={(e) => handleAppChange(e.target.value)}
              className="form-select"
            >
              <option value="">Choose an app...</option>
              {mockApps.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.icon} {app.name}
                </option>
              ))}
            </select>
          </div>

          {selectedApp && selectedNode.data.type !== 'condition' && (
            <div className="form-group">
              <label htmlFor="action-select">
                Select {selectedNode.data.type === 'trigger' ? 'Trigger' : 'Action'}
              </label>
              <select
                id="action-select"
                value={selectedAction}
                onChange={(e) => handleActionChange(e.target.value)}
                className="form-select"
              >
                <option value="">Choose an action...</option>
                {currentActions.map((action) => (
                  <option key={action.id} value={action.id}>
                    {action.name}
                  </option>
                ))}
              </select>
              {currentAction && (
                <p className="form-help-text">{currentAction.description}</p>
              )}
            </div>
          )}

          {currentAction && currentAction.parameters.length > 0 && (
            <div className="parameters-section">
              <h3>Parameters</h3>
              {currentAction.parameters.map((param) => (
                <div key={param.id} className="form-group">
                  <label htmlFor={`param-${param.id}`}>
                    {param.name}
                    {param.required && <span className="required">*</span>}
                  </label>
                  {param.type === 'textarea' ? (
                    <textarea
                      id={`param-${param.id}`}
                      value={String(parameters[param.id] || '')}
                      onChange={(e) => handleParameterChange(param.id, e.target.value)}
                      className="form-textarea"
                      rows={4}
                      required={param.required}
                    />
                  ) : param.type === 'checkbox' ? (
                    <input
                      id={`param-${param.id}`}
                      type="checkbox"
                      checked={Boolean(parameters[param.id])}
                      onChange={(e) => handleParameterChange(param.id, e.target.checked)}
                      className="form-checkbox"
                    />
                  ) : param.type === 'select' && param.options ? (
                    <select
                      id={`param-${param.id}`}
                      value={String(parameters[param.id] || '')}
                      onChange={(e) => handleParameterChange(param.id, e.target.value)}
                      className="form-select"
                      required={param.required}
                    >
                      <option value="">Select...</option>
                      {param.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`param-${param.id}`}
                      type={param.type}
                      value={String(parameters[param.id] || '')}
                      onChange={(e) => handleParameterChange(param.id, e.target.value)}
                      className="form-input"
                      required={param.required}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {testResult && (
            <div className="test-result">
              <pre>{testResult}</pre>
            </div>
          )}
        </div>

        <div className="node-editor-footer">
          <button
            className="btn btn-secondary"
            onClick={handleTest}
            disabled={!currentAction || isTesting}
          >
            {isTesting ? 'Testing...' : '🧪 Test'}
          </button>
          <div className="footer-actions">
            <button className="btn btn-ghost" onClick={closeNodeEditor}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeEditor;
