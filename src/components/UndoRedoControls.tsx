import { undo, redo } from "../store/reducers/historySlice";
import { useDispatch } from "react-redux";

const UndoRedoControls = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button>
    </>
  );
};

export default UndoRedoControls;
