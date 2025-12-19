import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useWorkflowStore, type WorkflowStep } from '../store/workflowStore';

interface SortableStepProps {
  step: WorkflowStep;
  index: number;
}

const SortableStep = ({ step, index }: SortableStepProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editValues, setEditValues] = useState(step);
  const { updateStep, removeStep } = useWorkflowStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    updateStep(step.id, editValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues(step);
    setIsEditing(false);
  };

  const handleParameterChange = (key: string, value: string) => {
    setEditValues({
      ...editValues,
      parameters: {
        ...editValues.parameters,
        [key]: value,
      },
    });
  };

  const availableActions = getAvailableActions(step.app);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`workflow-step ${isDragging ? 'dragging' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="step-header" {...attributes} {...listeners}>
        <div className="step-number">{index + 1}</div>
        <div className="drag-handle">⋮⋮</div>
      </div>

      {!isEditing ? (
        <div className="step-content" onClick={() => setIsEditing(true)}>
          <div className="step-app">
            <span className="app-icon">{getAppIcon(step.app)}</span>
            <span className="app-name">{step.app}</span>
          </div>
          <div className="step-action">{step.action}</div>
          <div className="step-description">{step.description}</div>
          
          {Object.keys(step.parameters).length > 0 && (
            <div className="step-parameters">
              {Object.entries(step.parameters).map(([key, value]) => (
                <div key={key} className="parameter">
                  <span className="param-key">{key}:</span>
                  <span className="param-value">{value}</span>
                </div>
              ))}
            </div>
          )}

          {isHovered && (
            <div className="step-actions">
              <button className="action-btn" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>
                ✏️ Edit
              </button>
              <button className="action-btn" onClick={(e) => { e.stopPropagation(); removeStep(step.id); }}>
                🗑️ Delete
              </button>
              <div className="available-actions">
                <small>Available: {availableActions.join(', ')}</small>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="step-edit">
          <div className="edit-field">
            <label>App</label>
            <input
              type="text"
              value={editValues.app}
              onChange={(e) => setEditValues({ ...editValues, app: e.target.value })}
            />
          </div>

          <div className="edit-field">
            <label>Action</label>
            <input
              type="text"
              value={editValues.action}
              onChange={(e) => setEditValues({ ...editValues, action: e.target.value })}
            />
          </div>

          <div className="edit-field">
            <label>Description</label>
            <input
              type="text"
              value={editValues.description}
              onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
            />
          </div>

          <div className="edit-field">
            <label>Parameters</label>
            {Object.entries(editValues.parameters).map(([key, value]) => (
              <div key={key} className="parameter-edit">
                <input
                  type="text"
                  value={key}
                  disabled
                  className="param-key-input"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleParameterChange(key, e.target.value)}
                  className="param-value-input"
                />
              </div>
            ))}
          </div>

          <div className="edit-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export const WorkflowBuilder = () => {
  const { workflowSteps, reorderSteps, workflowName, setWorkflowName, activateWorkflow, isActivated } = useWorkflowStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = workflowSteps.findIndex((step) => step.id === active.id);
      const newIndex = workflowSteps.findIndex((step) => step.id === over.id);
      const newSteps = arrayMove(workflowSteps, oldIndex, newIndex);
      reorderSteps(newSteps);
    }
  };

  const handleActivate = () => {
    activateWorkflow();
    alert('Workflow activated successfully!');
  };

  return (
    <div className="workflow-builder">
      <div className="workflow-header">
        <input
          type="text"
          className="workflow-name"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          placeholder="Name your workflow..."
        />
        {workflowSteps.length > 0 && (
          <button 
            className={`activate-btn ${isActivated ? 'activated' : ''}`}
            onClick={handleActivate}
            disabled={isActivated}
          >
            {isActivated ? '✓ Activated' : 'Activate'}
          </button>
        )}
      </div>

      {workflowSteps.length === 0 ? (
        <div className="empty-workflow">
          <p>No steps yet. Start describing your workflow in the chat!</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={workflowSteps.map((step) => step.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="workflow-steps">
              {workflowSteps.map((step, index) => (
                <SortableStep key={step.id} step={step} index={index} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {workflowSteps.length > 0 && (
        <div className="workflow-tips">
          <p><strong>💡 Tips:</strong></p>
          <ul>
            <li>Click any step to edit parameters</li>
            <li>Hover to see available actions</li>
            <li>Drag to reorder steps</li>
            <li>Click "Activate" to save workflow</li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Helper functions
function getAppIcon(app: string): string {
  const icons: Record<string, string> = {
    'Gmail': '📧',
    'Google Calendar': '📅',
    'Asana': '✓',
    'Slack': '💬',
    'Trello': '📋',
    'Notion': '📝',
  };
  return icons[app] || '⚙️';
}

function getAvailableActions(app: string): string[] {
  const actions: Record<string, string[]> = {
    'Gmail': ['Send email', 'When email received', 'Label email'],
    'Google Calendar': ['Create event', 'After event ends', 'Update event'],
    'Asana': ['Create task', 'Update task', 'Check due date'],
    'Slack': ['Send message', 'Create channel', 'Post to channel'],
    'Trello': ['Create card', 'Move card', 'Add comment'],
    'Notion': ['Create page', 'Update database', 'Query database'],
  };
  return actions[app] || ['Custom action'];
}
