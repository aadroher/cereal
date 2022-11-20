import queryString from "query-string";

import { DataPoint, Filters } from "../state-management/reducer";

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

type FetchResult = {
  ok: boolean;
  errorResponse: {
    status: number;
    error: string;
  } | null;
  data: DataPoint[] | null;
};

type FetchData = (params: {
  binSize: number;
  filters: Filters;
}) => Promise<FetchResult>;
export const fetchData: FetchData = async ({ binSize, filters }) => {
  const urlParamsStr = getUrlQueryParams({
    binSize,
    filters,
  });
  const localPath = `${API_ROOT}${METRICS_AVERAGES_PATH}?${urlParamsStr}`;

  const response = await fetch(localPath);

  if (response.ok) {
    const parsedResponseBody: DataPoint[] = await response.json();
    return {
      ok: true,
      errorResponse: null,
      data: parsedResponseBody,
    };
  } else {
    return {
      ok: false,
      errorResponse: {
        status: response.status,
        error: response.statusText,
      },
      data: null,
    };
  }
};
