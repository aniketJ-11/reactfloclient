import { useEffect, useState } from "react";
import { addToHistory } from "../store/reducers/historySlice";
import { updateNodeColor } from "../store/reducers/stylingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { NodeColorPickerProps } from "../types/type";
import { nodeBgColor, nodeFontSize } from "../utils/nodeDefaultColor";

const NodeColorPicker: React.FC<NodeColorPickerProps> = ({ selectedNode }) => {
  const [color, setColor] = useState<string>(nodeBgColor);

  const dispatch = useDispatch();
  const nodeStyles = useSelector(
    (state: RootState) => state?.styling?.nodeStyles
  );

  useEffect(() => {
    if (selectedNode) {
      setColor(nodeStyles[selectedNode]?.color || nodeBgColor);
    }
  }, [selectedNode, nodeStyles]);

  const handleColorChange = (newColor: string) => {
    if (!selectedNode) return;

    // It basically retrieve the previous style of the selected node.
    // If no style exists yet, use default values for color and font size.
    const prevStyle = nodeStyles[selectedNode] || {
      color: nodeBgColor, //defauil value
      fontSize: nodeFontSize, //defauil value
    };

    // Checking if the new color is different from the previous one
    if (prevStyle.color !== newColor) {
      // Add the previous style to the history for undo
      dispatch(
        addToHistory({
          type: "STYLE_CHANGE",
          id: selectedNode,
          style: { ...prevStyle },
        })
      );
      // Created a new style object with the updated color
      const newStyle = { ...prevStyle, color: newColor };
      // Add the new style to the history reducer for redo functionality
      dispatch(
        addToHistory({
          type: "STYLE_CHANGE",
          id: selectedNode,
          style: { ...newStyle },
        })
      );

      dispatch(updateNodeColor({ id: selectedNode, color: newColor }));
    }
  };

  return (
    <input
      type="color"
      value={color}
      onChange={(e) => handleColorChange(e?.target?.value)}
    />
  );
};
export default NodeColorPicker;
