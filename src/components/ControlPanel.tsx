import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { undo, redo } from "../store/reducers/historySlice";
import NodeColorPicker from "./NodeColorPicker";
import NodeFontSizePicker from "./NodeFontSizePicker";

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const nodes = useSelector((state: RootState) => state.graph.nodes);

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

      {selectedNode && (
        <>
          <NodeColorPicker selectedNode={selectedNode} />
          <NodeFontSizePicker selectedNode={selectedNode} />
        </>
      )}

      <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button>
    </div>
  );
};

export default ControlPanel;
