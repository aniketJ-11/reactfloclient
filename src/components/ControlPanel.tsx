import type React from "react"
// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store"
import { updateNodeColor, updateNodeFontSize } from "../store/stylingSlice"
import { undo, redo, addToHistory } from "../store/historySlice"
// import { setSelectedNode } from "../store/graphSlice"

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch()
  const selectedNode = useSelector((state: RootState) => state.graph.selectedId);
  // const [selectedNode, setSelectedNode] = useState<string | null>(null)
  // const nodes = useSelector((state: RootState) => state.graph.nodes)
  const nodeStyles = useSelector((state: RootState) => state.styling.nodeStyles)

  const handleColorChange = (color: string) => {
    if (selectedNode) {
      const newStyle = { ...nodeStyles[selectedNode], color }
      dispatch(updateNodeColor({ id: selectedNode, color }))
      dispatch(addToHistory({ type: "STYLE_CHANGE", id: selectedNode, style: newStyle }))
    }
  }

  const handleFontSizeChange = (fontSize: number) => {
    if (selectedNode) {
      const newStyle = { ...nodeStyles[selectedNode], fontSize }
      dispatch(updateNodeFontSize({ id: selectedNode, fontSize }))
      dispatch(addToHistory({ type: "STYLE_CHANGE", id: selectedNode, style: newStyle }))
    }
  }

  // const handleColorChange = (nodeId: string, color: string) => {
  //   dispatch(addToHistory({ type: "STYLE_CHANGE", id: nodeId, style: { ...nodeStyles[nodeId], color } }));
  //   dispatch(updateNodeColor({ id: selectedNode, color }));
  // };

  // const handleFontSizeChange = (nodeId: string, fontSize: number) => {
  //   dispatch(addToHistory({ type: "STYLE_CHANGE", id: nodeId, style: { ...nodeStyles[nodeId], fontSize } }));
  //   dispatch(updateNodeFontSize({ id: selectedNode, fontSize }));
  // };


  return (
    <div>
      {/* <select onChange={(e) => dispatch(setSelectedNode(e.target.value))}>
        <option value="">Select a node</option>
        {nodes.map((node) => (
          <option key={node.id} value={node.id}>
            {node.data.label}
          </option>
        ))}
      </select> */}
      <input
        type="color"
        value={selectedNode && nodeStyles[selectedNode] ? nodeStyles[selectedNode].color : "#000000"}
        onChange={(e) => handleColorChange(e.target.value)}
      />
      <select
        value={selectedNode && nodeStyles[selectedNode] ? nodeStyles[selectedNode].fontSize : 14}
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
  )
}

export default ControlPanel

