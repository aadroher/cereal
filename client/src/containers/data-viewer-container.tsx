import React, { useReducer, useEffect } from "react";

import { initialState, rootReducer } from "../state-management/reducer";
import DataViewer from "../components/data-viewer";
import {
  handleFirstLoad,
  handleOnSelectedNamesChange,
  handleOnDateFromChange,
  handleOnDateToChange,
  handleBinSizeChange,
} from "../state-management/event-handlers";

const DataViewerContainer = (): JSX.Element => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    handleFirstLoad({ state, dispatch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataViewer
      isLoading={state.loading}
      errorResponse={state.errorResponse}
      data={state.data}
      filters={state.filters}
      binSize={state.binSize}
      onSelectedNamesChange={(newNames) => {
        handleOnSelectedNamesChange({
          state,
          dispatch,
          payload: newNames,
        });
      }}
      onDateFromChange={(newDate) => {
        handleOnDateFromChange({
          state,
          dispatch,
          payload: newDate,
        });
      }}
      onDateToChange={(newDate) => {
        handleOnDateToChange({
          state,
          dispatch,
          payload: newDate,
        });
      }}
      onBinSizeChange={(newBinSize) => {
        handleBinSizeChange({
          state,
          dispatch,
          payload: newBinSize,
        });
      }}
    />
  );
};

export default DataViewerContainer;
