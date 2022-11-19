enum ActionType {
  DATA_LOADED,
}

export type DataPoint = {
  timestamp: Date;
  values: {
    [name: string]: number | null;
  };
};

type Filters = {
  dates: {
    from: Date;
    to: Date;
  };
  names: string[];
};

type State = {
  loading: boolean;
  filters: Filters;
  data: DataPoint[];
};

type Action = {
  type: ActionType;
  payload: unknown;
};

type RootReducer = (state: State, action: Action) => State;
const rootReducer = (state, action) => {};

export default rootReducer;
