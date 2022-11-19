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

export const initialState: State = {
  loading: false,
  filters: {
    dates: {
      from: new Date(),
      to: new Date(),
    },
    names: [],
  },
  data: [],
};

type RootReducer = (state: State, action: Action) => State;
export const rootReducer: RootReducer = (state, action) => {
  console.log({ state });
  console.log({ action });

  const newState = state;

  console.log({ newState });
  return newState;
};
