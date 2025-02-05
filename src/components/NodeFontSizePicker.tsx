import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { updateNodeFontSize } from "../store/reducers/stylingSlice";
import { addToHistory } from "../store/reducers/historySlice";

interface NodeFontSizePickerProps {
  selectedNode: string | null;
}

const NodeFontSizePicker: React.FC<NodeFontSizePickerProps> = ({
  selectedNode,
}) => {
  const dispatch = useDispatch();
  const nodeStyles = useSelector(
    (state: RootState) => state.styling.nodeStyles
  );
  const handleFontSizeChange = (fontSize: number) => {
    if (!selectedNode) return;

    const prevStyle = nodeStyles[selectedNode] || {
      color: "#DDEB9D",
      fontSize: 14,
    };

    if (prevStyle.fontSize !== fontSize) {
      dispatch(
        addToHistory({
          type: "STYLE_CHANGE",
          id: selectedNode,
          style: { ...prevStyle },
        })
      );

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
      onChange={(e) => handleFontSizeChange(Number(e.target.value))}
    >
      {[12, 14, 16, 18, 20, 22, 24].map((size) => (
        <option key={size} value={size}>
          {size}px
        </option>
      ))}
    </select>
  );
};

export default NodeFontSizePicker;
