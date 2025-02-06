import type React from "react";
import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { CustomNodeData } from "../types/type";
import { nodeBgColor, nodeFontSize } from "../utils/nodeDefaultColor";

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  const style = data?.style || { color: nodeBgColor, fontSize: nodeFontSize };

  return (
    <div
      style={{
        background: style.color,
        padding: "10px",
        borderRadius: "5px",
        color: "#000000",
        fontSize: `${style.fontSize}px`,
      }}
    >
      <Handle type="target" position={Position?.Top} />
      <div>{data?.label}</div>
      <Handle type="source" position={Position?.Bottom} />
    </div>
  );
};

export default memo(CustomNode);
