import React from "react";
import "./app.scss";
import DataViewerContainer from "./containers/data-viewer-container";

const App = () => (
  <div className="app">
    <header className="app-header">
      <h1 className="app-header__title">Cereal</h1>
      <div role="doc-subtitle">A serial data viewer</div>
    </header>
    <DataViewerContainer />
  </div>
);

export default App;
