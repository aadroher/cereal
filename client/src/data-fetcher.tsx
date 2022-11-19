import queryString from "query-string";

import { DataPoint, Filters } from "./containers/state";

const API_ROOT = "/api/v0";
const METRICS_AVERAGES_PATH = "/metrics/averages";

type GetUrlQueryParams = (filters: Filters) => string;
const getUrlQueryParams: GetUrlQueryParams = (filters) =>
  queryString.stringify(
    {
      from: filters.dates.from.toISOString(),
      to: filters.dates.to.toISOString(),
      names: filters.names,
      bin_size: 60,
    },
    { arrayFormat: "bracket" }
  );

type FetchData = (filters: Filters) => Promise<DataPoint[]>;
export const fetchData: FetchData = async (params) => {};
