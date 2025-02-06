import type { Node, Edge } from "reactflow";
import { nodeBgColor, nodeFontSize } from "../utils/nodeDefaultColor";

const initialNodes: Node[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i}`,
  type: "custom",
  data: {
    label: `Node ${i}`,
    style: { color: nodeBgColor, fontSize: nodeFontSize },
  },
  position: { x: Math.random() * 500, y: Math.random() * 500 },
}));

const initialEdges: Edge[] = [];
for (let i = 0; i < initialNodes.length; i++) {
  for (let j = i + 1; j < initialNodes.length; j++) {
    initialEdges.push({
      id: `e${i}-${j}`,
      source: `${i}`,
      target: `${j}`,
      animated: true,
    });
  }
}

export { initialEdges, initialNodes };
