import React, { useState } from 'react';
import type { Workflow } from '../types';

interface ActiveWorkflowsProps {
  workflows: Workflow[];
}

const ActiveWorkflows: React.FC<ActiveWorkflowsProps> = ({ workflows }) => {
  const [workflowStates, setWorkflowStates] = useState<{ [key: string]: boolean }>(
    workflows.reduce((acc, workflow) => ({ ...acc, [workflow.id]: workflow.isActive }), {})
  );

  const toggleWorkflow = (id: string) => {
    setWorkflowStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getIconForApp = (app: string): string => {
    const icons: { [key: string]: string } = {
      'calendly': '📅',
      'notion': '📝',
      'gmail': '📧',
      'sheets': '📊',
      'stripe': '💳',
      'slack': '💬',
      'calendar': '📅',
    };
    return icons[app] || '⚙️';
  };

  return (
    <div className="space-y-4">
      {workflows.map((workflow) => (
        <div
          key={workflow.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 mb-4 lg:mb-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {workflow.name}
                  </h3>
                  <p className="text-sm text-gray-600">{workflow.description}</p>
                </div>
              </div>

              {/* Visual Flow */}
              <div className="flex items-center mt-4 space-x-2">
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                  <span className="text-xl mr-2">{getIconForApp(workflow.trigger)}</span>
                  <span className="text-xs font-medium text-blue-700">Trigger</span>
                </div>
                <span className="text-gray-400">→</span>
                {workflow.actions.map((action, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                      <span className="text-xl">{getIconForApp(action)}</span>
                    </div>
                    {index < workflow.actions.length - 1 && (
                      <span className="text-gray-400">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="mt-3 text-sm text-gray-500">
                ⏱️ Saves ~{workflow.timeSavedPerWeek} hours/week
              </div>
            </div>

            <div className="flex items-center space-x-4 lg:ml-6">
              {/* Toggle Switch */}
              <button
                onClick={() => toggleWorkflow(workflow.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  workflowStates[workflow.id] ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    workflowStates[workflow.id] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>

              {/* Edit Button */}
              <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveWorkflows;
