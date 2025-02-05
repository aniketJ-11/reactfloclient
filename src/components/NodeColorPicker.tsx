import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { updateNodeColor } from "../store/reducers/stylingSlice";
import { addToHistory } from "../store/reducers/historySlice";

interface NodeColorPickerProps {
  selectedNode: string | null;
}

const NodeColorPicker: React.FC<NodeColorPickerProps> = ({ selectedNode }) => {
  const dispatch = useDispatch();
  const nodeStyles = useSelector(
    (state: RootState) => state.styling.nodeStyles
  );
  const [color, setColor] = useState<string>("#DDEB9D");

  useEffect(() => {
    if (selectedNode) {
      setColor(nodeStyles[selectedNode]?.color || "#DDEB9D");
    }
  }, [selectedNode, nodeStyles]);

  const handleColorChange = (newColor: string) => {
    if (!selectedNode) return;

    const prevStyle = nodeStyles[selectedNode] || {
      color: "#DDEB9D",
      fontSize: 14,
    };
    const newStyle = { ...prevStyle, color: newColor };

    dispatch(
      addToHistory({
        type: "STYLE_CHANGE",
        id: selectedNode,
        style: prevStyle,
      })
    );

    dispatch(updateNodeColor({ id: selectedNode, color: newColor }));
  };

  return (
    <input
      type="color"
      value={color}
      onChange={(e) => handleColorChange(e.target.value)}
    />
  );
};

export default NodeColorPicker;
