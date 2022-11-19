import React from "react";
import "./app.css";
import DataViewerContainer from "./containers/data-viewer-container";

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1>Cereal</h1>
    </header>
    <DataViewerContainer />
  </div>
);

export default App;
