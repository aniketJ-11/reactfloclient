import { useState } from "react";
import { useSelector } from "react-redux";
import UndoRedoControls from "./UndoRedoControls";
import type { RootState } from "../store/store";
import NodeColorPicker from "./NodeColorPicker";
import NodeFontSizePicker from "./NodeFontSizePicker";

const ControlPanel: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes = useSelector((state: RootState) => state?.graph?.nodes);

  return (
    <div>
      <select onChange={(e) => setSelectedNode(e?.target?.value)}>
        <option value="">Select a node</option>
        {nodes.map((node) => (
          <option key={node?.id} value={node?.id}>
            {node?.data?.label}
          </option>
        ))}
      </select>

      {selectedNode && (
        <>
          <NodeColorPicker selectedNode={selectedNode} />
          <NodeFontSizePicker selectedNode={selectedNode} />
        </>
      )}

      <UndoRedoControls />
    </div>
  );
};

export default ControlPanel;
