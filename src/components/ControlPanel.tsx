import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { updateNodeColor, updateNodeFontSize } from "../store/stylingSlice";
import { undo, redo, addToHistory } from "../store/historySlice";

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const nodes = useSelector((state: RootState) => state.graph.nodes);
  const nodeStyles = useSelector(
    (state: RootState) => state.styling.nodeStyles
  );

  const [color, setColor] = useState<string>("#DDEB9D");

  // Reset color when a new node is selected
  useEffect(() => {
    if (selectedNode) {
      setColor(nodeStyles[selectedNode]?.color || "#DDEB9D"); // Default color if none exists
    }
  }, [selectedNode, nodeStyles]);

  const handleColorInputChange = (newColor: string) => {
    setColor(newColor);
  };

  useEffect(() => {
    if (!selectedNode) return;

    const timeout = setTimeout(() => {
      const newStyle = { ...nodeStyles[selectedNode], color };
      dispatch(updateNodeColor({ id: selectedNode, color }));
      dispatch(
        addToHistory({
          type: "STYLE_CHANGE",
          id: selectedNode,
          style: newStyle,
        })
      );
    }, 100);

    return () => clearTimeout(timeout);
  }, [color, selectedNode, dispatch, nodeStyles]);

  const handleFontSizeChange = (fontSize: number) => {
    if (selectedNode) {
      const newStyle = { ...nodeStyles[selectedNode], fontSize };
      dispatch(updateNodeFontSize({ id: selectedNode, fontSize }));
      dispatch(
        addToHistory({
          type: "STYLE_CHANGE",
          id: selectedNode,
          style: newStyle,
        })
      );
    }
  };

  return (
    <div>
      <select onChange={(e) => setSelectedNode(e.target.value)}>
        <option value="">Select a node</option>
        {nodes.map((node) => (
          <option key={node.id} value={node.id}>
            {node.data.label}
          </option>
        ))}
      </select>

      <input
        type="color"
        value={color}
        onChange={(e) => handleColorInputChange(e.target.value)}
      />

      <select
        value={(selectedNode && nodeStyles[selectedNode]?.fontSize) || 14}
        onChange={(e) => handleFontSizeChange(Number(e.target.value))}
      >
        {[12, 14, 16, 18, 20, 22, 24].map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>

      <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button>
    </div>
  );
};

export default ControlPanel;
