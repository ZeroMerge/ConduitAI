import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import type { NodeData } from '../../types/workflow';
import './NodeStyles.css';

const ActionNode = ({ data, selected }: NodeProps<Node<NodeData>>) => {
  const statusClass = data.status ? `status-${data.status}` : '';
  const activeClass = data.isActive ? 'pulse' : '';

  return (
    <div className={`action-node ${selected ? 'selected' : ''} ${statusClass} ${activeClass}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="action-handle"
      />
      <div className="node-header">
        {data.appIcon && (
          <div className="node-icon" style={{ fontSize: '24px' }}>
            {data.appIcon}
          </div>
        )}
        <div className="node-title">Action</div>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label || 'Configure Action'}</div>
        {data.appName && <div className="node-app-name">{data.appName}</div>}
        {data.actionName && <div className="node-action-name">{data.actionName}</div>}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="action-handle"
      />
    </div>
  );
};

export default memo(ActionNode);
