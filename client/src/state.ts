import { DateTime } from "luxon";

const KNOWN_NAMES = ["temperature", "pressure", "insolation"];

export enum ActionType {
  FETCH_DATA = "FETCH_DATA",
  RECEIVE_DATA = "RECEIVE_DATA",
  UPDATE_SELECTED_NAMES = "UPDATE_SELECTED_NAMES",
  UPDATE_FROM_DATE = "UPDATE_FROM_DATE",
  UPDATE_TO_DATE = "UPDATE_TO_DATE",
  UPDATE_BIN_SIZE = "UPDATE_BIN_SIZE",
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

const dateTo = new Date();
const initialDates = {
  from: DateTime.fromJSDate(dateTo).minus({ days: 3 }).toJSDate(),
  to: dateTo,
};
const INITIAL_BIN_SIZE = 60 * 60;

export const initialState: State = {
  loading: false,
  binSize: INITIAL_BIN_SIZE,
  filters: {
    dates: initialDates,
    names: KNOWN_NAMES,
  },
  data: [],
};

type RootReducer = (state: State, action: Action) => State;
export const rootReducer: RootReducer = (state, action) => {
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
        loading: false,
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
    case ActionType.UPDATE_FROM_DATE: {
      return {
        ...state,
        filters: {
          ...state.filters,
          dates: {
            ...state.filters.dates,
            from: action.payload as Date,
          },
        },
      };
    }
    case ActionType.UPDATE_TO_DATE: {
      return {
        ...state,
        filters: {
          ...state.filters,
          dates: {
            ...state.filters.dates,
            to: action.payload as Date,
          },
        },
      };
    }
    case ActionType.UPDATE_BIN_SIZE: {
      return {
        ...state,
        binSize: action.payload as number,
      };
    }
    default:
      return state;
  }
};
