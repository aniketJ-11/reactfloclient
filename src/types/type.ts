import type { Node, Edge } from "reactflow";

export interface NodeFontSizePickerProps {
  selectedNode: string | null;
}

export interface NodeColorPickerProps {
  selectedNode: string | null;
}

export interface CustomNodeData {
  label: string;
  style?: {
    color: string;
    fontSize: number;
  };
}

export interface GraphState {
  selectedId: string | null;
  nodes: Node[];
  edges: Edge[];
}

export interface HistoryState {
  past: any[];
  present: any | null;
  future: any[];
}

export interface NodeStyle {
  color: string;
  fontSize: number;
}

export interface StylingState {
  nodeStyles: Record<string, NodeStyle>;
}
