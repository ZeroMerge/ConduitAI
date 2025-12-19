import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { Node, Edge, Connection, NodeChange, EdgeChange } from '@xyflow/react';
import type { NodeData } from '../types/workflow';

interface WorkflowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNode: Node<NodeData> | null;
  isNodeEditorOpen: boolean;
  history: { nodes: Node<NodeData>[]; edges: Edge[] }[];
  currentHistoryIndex: number;
  
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange<Node<NodeData>>[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node<NodeData>) => void;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  setSelectedNode: (node: Node<NodeData> | null) => void;
  openNodeEditor: (node: Node<NodeData>) => void;
  closeNodeEditor: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  saveToHistory: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  isNodeEditorOpen: false,
  history: [],
  currentHistoryIndex: -1,

  setNodes: (nodes) => set({ nodes }),
  
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, animated: true }, get().edges),
    });
    get().saveToHistory();
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
    get().saveToHistory();
  },

  updateNode: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ),
    });
    get().saveToHistory();
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    });
    get().saveToHistory();
  },

  deleteEdge: (edgeId) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== edgeId),
    });
    get().saveToHistory();
  },

  setSelectedNode: (node) => set({ selectedNode: node }),

  openNodeEditor: (node) => {
    set({ selectedNode: node, isNodeEditorOpen: true });
  },

  closeNodeEditor: () => {
    set({ isNodeEditorOpen: false });
  },

  saveToHistory: () => {
    const { nodes, edges, history, currentHistoryIndex } = get();
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    newHistory.push({ nodes: [...nodes], edges: [...edges] });
    
    // Limit history to 50 items
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    set({
      history: newHistory,
      currentHistoryIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, currentHistoryIndex } = get();
    if (currentHistoryIndex > 0) {
      const prevState = history[currentHistoryIndex - 1];
      set({
        nodes: [...prevState.nodes],
        edges: [...prevState.edges],
        currentHistoryIndex: currentHistoryIndex - 1,
      });
    }
  },

  redo: () => {
    const { history, currentHistoryIndex } = get();
    if (currentHistoryIndex < history.length - 1) {
      const nextState = history[currentHistoryIndex + 1];
      set({
        nodes: [...nextState.nodes],
        edges: [...nextState.edges],
        currentHistoryIndex: currentHistoryIndex + 1,
      });
    }
  },

  canUndo: () => get().currentHistoryIndex > 0,
  
  canRedo: () => get().currentHistoryIndex < get().history.length - 1,
}));
