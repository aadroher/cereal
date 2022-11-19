import queryString from "query-string";

import { DataPoint, Filters } from "./state";

const API_ROOT = "/api/v0";
const METRICS_AVERAGES_PATH = "/metrics/averages";

type GetUrlQueryParams = (params: {
  binSize: number;
  filters: Filters;
}) => string;
const getUrlQueryParams: GetUrlQueryParams = ({ binSize, filters }) =>
  queryString.stringify(
    {
      from: filters.dates.from.toISOString(),
      to: filters.dates.to.toISOString(),
      names: filters.names,
      bin_size: binSize,
    },
    { arrayFormat: "bracket" }
  );

type FetchData = (params: {
  binSize: number;
  filters: Filters;
}) => Promise<DataPoint[]>;
export const fetchData: FetchData = async ({ binSize, filters }) => {
  const urlParamsStr = getUrlQueryParams({
    binSize,
    filters,
  });
  const localPath = `${API_ROOT}${METRICS_AVERAGES_PATH}?${urlParamsStr}`;

  const response = await fetch(localPath);
  const responseBody: DataPoint[] = await response.json();
  return responseBody;
};
