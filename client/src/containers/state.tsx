export enum ActionType {
  FETCH_DATA = "FETCH_DATA",
  RECEIVE_DATA = "RECEIVE_DATA",
  UPDATE_SELECTED_NAMES = "UPDATE_SELECTED_NAMES",
}

export type DataPoint = {
  timestamp: Date;
  values: {
    [name: string]: number | null;
  };
};

export type Filters = {
  dates: {
    from: Date;
    to: Date;
  };
  names: string[];
};

export type State = {
  loading: boolean;
  binSize: number;
  filters: Filters;
  data: DataPoint[];
};

export type Action = {
  type: ActionType;
  payload?: unknown;
};

const KNOWN_NAMES = ["temperature", "pressure", "insolation"];
const INITIAL_DATES = {
  from: new Date("2021-03-23T12:00:00.000Z"),
  to: new Date("2021-03-23T12:30:00.000Z"),
};
const INITIAL_BIN_SIZE = 60;

export const initialState: State = {
  loading: false,
  binSize: INITIAL_BIN_SIZE,
  filters: {
    dates: INITIAL_DATES,
    names: KNOWN_NAMES,
  },
  data: [],
};

type RootReducer = (state: State, action: Action) => State;
export const rootReducer: RootReducer = (state, action) => {
  console.log({ state });
  console.log({ action });

  switch (action.type) {
    case ActionType.FETCH_DATA: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionType.RECEIVE_DATA: {
      // TODO: Update this responseBody is not a proper DataPoint[] (dates not parsed yet)
      const responseBody = action.payload as DataPoint[];
      const newData = responseBody.map(({ timestamp, values }) => ({
        timestamp: new Date(timestamp),
        values,
      }));
      return {
        ...state,
        data: newData,
      };
    }
    case ActionType.UPDATE_SELECTED_NAMES: {
      return {
        ...state,
        filters: {
          ...state.filters,
          names: action.payload as string[],
        },
      };
    }

    default:
      return state;
  }
};
