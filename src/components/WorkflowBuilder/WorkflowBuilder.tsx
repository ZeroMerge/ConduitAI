import { useCallback, useRef, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import { toPng } from 'html-to-image';
import '@xyflow/react/dist/style.css';

import { useWorkflowStore } from '../../store/workflowStore';
import TriggerNode from '../Nodes/TriggerNode';
import ActionNode from '../Nodes/ActionNode';
import ConditionNode from '../Nodes/ConditionNode';
import NodeEditor from '../NodeEditor/NodeEditor';
import type { NodeData } from '../../types/workflow';
import './WorkflowBuilder.css';

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
};

let nodeId = 0;
const getNodeId = () => `node_${nodeId++}`;

const WorkflowBuilderContent = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    deleteEdge,
    openNodeEditor,
    undo,
    redo,
    canUndo,
    canRedo,
    saveToHistory,
  } = useWorkflowStore();

  // Save initial state to history
  useEffect(() => {
    if (nodes.length === 0) {
      saveToHistory();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<NodeData>) => {
      openNodeEditor(node);
    },
    [openNodeEditor]
  );

  const onEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      if (window.confirm('Delete this connection?')) {
        deleteEdge(edge.id);
      }
    },
    [deleteEdge]
  );

  const addNewNode = useCallback(
    (type: 'trigger' | 'action' | 'condition') => {
      const newNode: Node<NodeData> = {
        id: getNodeId(),
        type,
        position: {
          x: Math.random() * 300 + 100,
          y: Math.random() * 300 + 100,
        },
        data: {
          label: `New ${type}`,
          type,
          status: 'idle',
        } as NodeData,
      };
      addNode(newNode);
      setContextMenu(null);
    },
    [addNode]
  );

  const handleExportImage = useCallback(async () => {
    if (reactFlowWrapper.current) {
      try {
        const dataUrl = await toPng(reactFlowWrapper.current, {
          backgroundColor: '#f9fafb',
          filter: (node) => {
            // Exclude controls and other UI elements
            if (
              node.classList?.contains('react-flow__controls') ||
              node.classList?.contains('react-flow__minimap') ||
              node.classList?.contains('workflow-toolbar')
            ) {
              return false;
            }
            return true;
          },
        });

        const link = document.createElement('a');
        link.download = `workflow-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error exporting image:', error);
      }
    }
  }, []);

  const handlePaneContextMenu = useCallback((event: React.MouseEvent | MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  }, []);

  const handlePaneClick = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Touch event handlers for long press
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    const timer = setTimeout(() => {
      const touch = event.touches[0];
      setContextMenu({ x: touch.clientX, y: touch.clientY });
    }, 500); // 500ms long press
    setLongPressTimer(timer);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  }, [longPressTimer]);

  return (
    <div className="workflow-builder" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneContextMenu={handlePaneContextMenu}
        onPaneClick={handlePaneClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        nodeTypes={nodeTypes}
        fitView
        className="workflow-canvas"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'trigger':
                return '#22c55e';
              case 'action':
                return '#3b82f6';
              case 'condition':
                return '#eab308';
              default:
                return '#94a3b8';
            }
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
        
        <Panel position="top-left" className="workflow-toolbar">
          <div className="toolbar-section">
            <h3>Add Nodes</h3>
            <div className="toolbar-buttons">
              <button
                className="toolbar-btn trigger-btn"
                onClick={() => addNewNode('trigger')}
                title="Add Trigger Node"
              >
                ◆ Trigger
              </button>
              <button
                className="toolbar-btn action-btn"
                onClick={() => addNewNode('action')}
                title="Add Action Node"
              >
                ▢ Action
              </button>
              <button
                className="toolbar-btn condition-btn"
                onClick={() => addNewNode('condition')}
                title="Add Condition Node"
              >
                ⬡ Condition
              </button>
            </div>
          </div>

          <div className="toolbar-section">
            <h3>Controls</h3>
            <div className="toolbar-buttons">
              <button
                className="toolbar-btn control-btn"
                onClick={() => zoomIn()}
                title="Zoom In"
              >
                🔍+
              </button>
              <button
                className="toolbar-btn control-btn"
                onClick={() => zoomOut()}
                title="Zoom Out"
              >
                🔍−
              </button>
              <button
                className="toolbar-btn control-btn"
                onClick={() => fitView()}
                title="Fit to View"
              >
                ⊡ Fit
              </button>
            </div>
          </div>

          <div className="toolbar-section">
            <h3>History</h3>
            <div className="toolbar-buttons">
              <button
                className="toolbar-btn control-btn"
                onClick={undo}
                disabled={!canUndo()}
                title="Undo"
              >
                ↶ Undo
              </button>
              <button
                className="toolbar-btn control-btn"
                onClick={redo}
                disabled={!canRedo()}
                title="Redo"
              >
                ↷ Redo
              </button>
            </div>
          </div>

          <div className="toolbar-section">
            <button
              className="toolbar-btn export-btn"
              onClick={handleExportImage}
              title="Export as Image"
            >
              📷 Export
            </button>
          </div>
        </Panel>
      </ReactFlow>

      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => addNewNode('trigger')}>Add Trigger</button>
          <button onClick={() => addNewNode('action')}>Add Action</button>
          <button onClick={() => addNewNode('condition')}>Add Condition</button>
        </div>
      )}

      <NodeEditor />
    </div>
  );
};

const WorkflowBuilder = () => {
  return (
    <ReactFlowProvider>
      <WorkflowBuilderContent />
    </ReactFlowProvider>
  );
};

export default WorkflowBuilder;
