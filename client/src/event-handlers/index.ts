import { fetchData } from "../data-fetcher";
import { State, Action, ActionType, Filters } from "../state";

type EventHandler = (args: {
  state: State;
  dispatch: Function;
  payload?: unknown;
}) => void | Promise<void>;

export const handleFirstLoad: EventHandler = async ({ state, dispatch }) => {
  dispatch({ type: ActionType.FETCH_DATA });
  const responseBody = await fetchData({
    binSize: state.binSize,
    filters: state.filters,
  });
  dispatch({
    type: ActionType.RECEIVE_DATA,
    payload: responseBody,
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

  dispatch({ type: ActionType.FETCH_DATA });

  const responseBody = await fetchData({
    binSize: state.binSize,
    filters: newFilters,
  });

  dispatch({
    type: ActionType.UPDATE_FROM_DATE,
    payload: newDate as Date,
  });
  dispatch({
    type: ActionType.RECEIVE_DATA,
    payload: responseBody,
  });
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

  dispatch({
    type: ActionType.UPDATE_TO_DATE,
    payload: newDate as Date,
  });

  dispatch({ type: ActionType.FETCH_DATA });

  const responseBody = await fetchData({
    binSize: state.binSize,
    filters: newFilters,
  });

  dispatch({
    type: ActionType.RECEIVE_DATA,
    payload: responseBody,
  });
};
