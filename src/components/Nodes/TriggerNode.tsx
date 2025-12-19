import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import type { NodeData } from '../../types/workflow';
import './NodeStyles.css';

const TriggerNode = ({ data, selected }: NodeProps<Node<NodeData>>) => {
  const statusClass = data.status ? `status-${data.status}` : '';
  const activeClass = data.isActive ? 'pulse' : '';

  return (
    <div className={`trigger-node ${selected ? 'selected' : ''} ${statusClass} ${activeClass}`}>
      <div className="node-header">
        {data.appIcon && (
          <div className="node-icon" style={{ fontSize: '24px' }}>
            {data.appIcon}
          </div>
        )}
        <div className="node-title">Trigger</div>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label || 'Configure Trigger'}</div>
        {data.appName && <div className="node-app-name">{data.appName}</div>}
        {data.eventName && <div className="node-event-name">{data.eventName}</div>}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="trigger-handle"
      />
    </div>
  );
};

export default memo(TriggerNode);
