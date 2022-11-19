import { fetchData } from "../data-fetcher";
import { State, Action, ActionType } from "../containers/state";

type EventHandler = (state: State, dispatch: Function) => Promise<void>;

export const handleFirstLoad: EventHandler = async (state, dispatch) => {
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
