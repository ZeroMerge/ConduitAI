import React from 'react';
import type { Workflow } from '../../types';
import WorkflowCard from './WorkflowCard';

interface ActiveWorkflowsProps {
  workflows: Workflow[];
  onToggle: (id: string) => void;
}

const ActiveWorkflows: React.FC<ActiveWorkflowsProps> = ({
  workflows,
  onToggle,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Active Workflows
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {workflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveWorkflows;
