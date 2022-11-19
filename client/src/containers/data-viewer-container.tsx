import React, { useReducer } from "react";

import { initialState, rootReducer } from "./state";
import DataViewer from "../components/data-viewer";

const DataViewerContainer = (): JSX.Element => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return <p></p>;
};
