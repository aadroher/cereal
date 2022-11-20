import { fetchData } from "../utils/data-fetcher";
import { State, ActionType, Filters } from "./reducer";

type DispatchDataFetch = (args: {
  state: State;
  dispatch: Function;
  params: {
    binSize: number;
    filters: Filters;
  };
}) => Promise<boolean>;
const dispatchDataFetch: DispatchDataFetch = async ({
  state,
  dispatch,
  params,
}) => {
  dispatch({ type: ActionType.FETCH_DATA });
  const result = await fetchData(params);

  if (result.ok) {
    dispatch({
      type: ActionType.RECEIVE_DATA,
      payload: result.data,
    });
  } else {
    dispatch({
      type: ActionType.FETCH_ERROR,
      payload: result.errorResponse,
    });
  }

  return result.ok;
};

type EventHandler = (args: {
  state: State;
  dispatch: Function;
  payload?: unknown;
}) => void | Promise<void>;
export const handleFirstLoad: EventHandler = async ({ state, dispatch }) => {
  await dispatchDataFetch({
    state,
    dispatch,
    params: {
      binSize: state.binSize,
      filters: state.filters,
    },
  });
};

export const handleOnSelectedNamesChange: EventHandler = ({
  dispatch,
  payload: newNames,
}) => {
  dispatch({
    type: ActionType.UPDATE_SELECTED_NAMES,
    payload: newNames as string[],
  });
};

export const handleOnDateFromChange: EventHandler = async ({
  state,
  dispatch,
  payload: newDate,
}) => {
  const newFilters = {
    ...state.filters,
    dates: {
      ...state.filters.dates,
      from: newDate,
    },
  } as Filters;

  const fetchWasSuccessful = await dispatchDataFetch({
    state,
    dispatch,
    params: {
      binSize: state.binSize,
      filters: newFilters,
    },
  });

  if (fetchWasSuccessful) {
    dispatch({
      type: ActionType.UPDATE_FROM_DATE,
      payload: newDate as Date,
    });
  }
};

export const handleOnDateToChange: EventHandler = async ({
  state,
  dispatch,
  payload: newDate,
}) => {
  const newFilters = {
    ...state.filters,
    dates: {
      ...state.filters.dates,
      to: newDate,
    },
  } as Filters;

  const fetchWasSuccessful = await dispatchDataFetch({
    state,
    dispatch,
    params: {
      binSize: state.binSize,
      filters: newFilters,
    },
  });

  if (fetchWasSuccessful) {
    dispatch({
      type: ActionType.UPDATE_TO_DATE,
      payload: newDate as Date,
    });
  }
};

export const handleBinSizeChange: EventHandler = async ({
  state,
  dispatch,
  payload: newBinSize,
}) => {
  const fetchWasSuccessful = await dispatchDataFetch({
    state,
    dispatch,
    params: {
      binSize: newBinSize as number,
      filters: state.filters,
    },
  });

  if (fetchWasSuccessful) {
    dispatch({
      type: ActionType.UPDATE_BIN_SIZE,
      payload: newBinSize,
    });
  }
};
