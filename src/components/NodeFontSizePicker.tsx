import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { updateNodeFontSize } from "../store/reducers/stylingSlice";
import { addToHistory } from "../store/reducers/historySlice";
import { NodeFontSizePickerProps } from "../types/type";
import { nodeBgColor, nodeFontSize } from "../utils/nodeDefaultColor";

const fontSizes: number[] = [12, 14, 16, 18, 20, 22, 24];

const NodeFontSizePicker: React.FC<NodeFontSizePickerProps> = ({
  selectedNode,
}) => {
  const dispatch = useDispatch();
  const nodeStyles = useSelector(
    (state: RootState) => state?.styling?.nodeStyles
  );

  const handleFontSizeChange = (fontSize: number) => {
    if (!selectedNode) return;

    // It retrieve the previous fontSizee of the selected node.
    // If no style exists yet, use default background color and font size.
    const prevStyle = nodeStyles[selectedNode] || {
      color: nodeBgColor,
      fontSize: nodeFontSize,
    };

    // Check if the new font size is different from the current font size
    if (prevStyle.fontSize !== fontSize) {
      dispatch(
        addToHistory({
          type: "STYLE_CHANGE",
          id: selectedNode,
          style: { ...prevStyle },
        })
      );

      // Create a new style object with the updated font size
      const newStyle = { ...prevStyle, fontSize };

      dispatch(
        addToHistory({
          type: "STYLE_CHANGE",
          id: selectedNode,
          style: { ...newStyle },
        })
      );

      dispatch(updateNodeFontSize({ id: selectedNode, fontSize }));
    }
  };
  return (
    <select
      value={(selectedNode && nodeStyles[selectedNode]?.fontSize) || 14}
      onChange={(e) => handleFontSizeChange(Number(e?.target?.value))}
    >
      {fontSizes.map((size) => (
        <option key={size} value={size}>
          {size}px
        </option>
      ))}
    </select>
  );
};

export default NodeFontSizePicker;
