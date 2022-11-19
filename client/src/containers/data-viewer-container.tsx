import React, { useReducer, useEffect } from "react";

import { initialState, rootReducer } from "./state";
import DataViewer from "../components/data-viewer";
import { handleFirstLoad } from "../event-handlers";

const DataViewerContainer = (): JSX.Element => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    handleFirstLoad(state, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataViewer
      data={state.data}
      selectedLabels={state.filters.names}
      onSelectedLabelsChange={() => {}}
    />
  );
};

export default DataViewerContainer;
