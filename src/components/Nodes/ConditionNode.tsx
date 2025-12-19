import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import type { NodeData } from '../../types/workflow';
import './NodeStyles.css';

const ConditionNode = ({ data, selected }: NodeProps<Node<NodeData>>) => {
  const statusClass = data.status ? `status-${data.status}` : '';
  const activeClass = data.isActive ? 'pulse' : '';

  return (
    <div className={`condition-node ${selected ? 'selected' : ''} ${statusClass} ${activeClass}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="condition-handle"
      />
      <div className="node-header">
        <div className="node-icon" style={{ fontSize: '24px' }}>⚡</div>
        <div className="node-title">Condition</div>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label || 'If / Else'}</div>
        <div className="condition-paths">
          <div className="condition-path">✓ True</div>
          <div className="condition-path">✗ False</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        className="condition-handle condition-handle-true"
        style={{ left: '30%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        className="condition-handle condition-handle-false"
        style={{ left: '70%' }}
      />
    </div>
  );
};

export default memo(ConditionNode);
