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

    const prevStyle = nodeStyles[selectedNode] || {
      color: nodeBgColor,
      fontSize: nodeFontSize,
    };

    if (prevStyle.color !== newColor) {
      dispatch(
        addToHistory({
          type: "STYLE_CHANGE",
          id: selectedNode,
          style: { ...prevStyle },
        })
      );

      const newStyle = { ...prevStyle, color: newColor };
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
