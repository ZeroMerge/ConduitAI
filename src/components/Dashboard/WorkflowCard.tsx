import React from 'react';
import type { Workflow } from '../../types';
import Toggle from '../common/Toggle';

interface WorkflowCardProps {
  workflow: Workflow;
  onToggle: (id: string) => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onToggle }) => {
  const getAppEmoji = (appName: string) => {
    const emojiMap: { [key: string]: string } = {
      Gmail: '📧',
      Notion: '📝',
      Slack: '💬',
      Calendly: '📅',
      Stripe: '💳',
      'Google Sheets': '📊',
    };
    return emojiMap[appName] || '⚡';
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900 mb-1">{workflow.name}</h3>
          <p className="text-sm text-gray-600">{workflow.description}</p>
        </div>
        <Toggle
          checked={workflow.active}
          onChange={() => onToggle(workflow.id)}
          label={`Toggle ${workflow.name}`}
        />
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <span className="text-2xl">{getAppEmoji(workflow.trigger)}</span>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        {workflow.actions.map((action, idx) => (
          <span key={idx} className="text-2xl">
            {getAppEmoji(action)}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{workflow.timeSavedPerWeek}/week</span>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
          Edit
        </button>
      </div>
    </div>
  );
};

export default WorkflowCard;
