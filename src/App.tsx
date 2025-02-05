import type React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import GraphVisualization from "./components/GraphVisualization";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Graph Visualization</h1>
        <GraphVisualization />
      </div>
    </Provider>
  );
};

export default App;
