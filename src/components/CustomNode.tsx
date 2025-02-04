import type React from "react"
import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

interface CustomNodeData {
  label: string
  style?: {
    color: string
    fontSize: number
  }
}

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  const style = data.style || { color: "#000000", fontSize: 14 }

  return (
    <div
      style={{
        background: style.color,
        padding: "10px",
        borderRadius: "5px",
        color: "#ffffff",
        fontSize: `${style.fontSize}px`,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default memo(CustomNode)

