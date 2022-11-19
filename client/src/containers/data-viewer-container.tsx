import React, { useReducer, useEffect } from "react";

import { initialState, rootReducer } from "../state";
import DataViewer from "../components/data-viewer";
import {
  handleFirstLoad,
  handleOnSelectedNamesChange,
  handleOnDateFromChange,
  handleOnDateToChange,
  handleBinSizeChange,
} from "../event-handlers";

const DataViewerContainer = (): JSX.Element => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    handleFirstLoad({ state, dispatch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataViewer
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
        console.log({ newBinSize });
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
