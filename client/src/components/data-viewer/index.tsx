import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { DateTime } from "luxon";

export type DataPoint = {
  timestamp: Date;
  values: {
    [name: string]: number;
  };
};

export type DataSeries = {
  name: string;
  dataPoints: DataPoint[];
};

type DataViewerProps = {
  data: DataPoint[];
};

type GetDataNames = (data: DataPoint[]) => string[];
const getDataNames: GetDataNames = (data) => [
  ...new Set(data.map(({ name }) => name)),
];

type GraphDataPoint = {
  [key: string]: number | string;
};
type GetGraphDataPoints = (data: DataSeries[]) => GraphDataPoint[];
const getGraphDataPoints: GetGraphDataPoints = (data) => {
  const dataNames = getDataNames(data);
};

const DataViewer = ({ data }: DataViewerProps): JSX.Element => {
  const dataNames = getDataNames(data);
  const [selectedLabels, selectLabels] = useState(dataNames);
  console.log({ dataNames });
  // const valuesForA = data.filter(({ name }) => name === "temperature");
  data.sort(
    ({ timestamp: ts0 }, { timestamp: ts1 }) => ts0.getTime() - ts1.getTime()
  );
  const dataForGraph = data.map(({ timestamp, name, value }) => ({
    // name: DateTime.fromJSDate(timestamp).toFormat(
    //   "DATETIME_SHORT_WITH_SECONDS"
    // ),
    [name]: value,
  }));
  console.log(dataForGraph);

  return (
    <div>
      <h1>The data viewer</h1>
      <LineChart width={1200} height={400} data={dataForGraph}>
        <CartesianGrid strokeDasharray="3 3" />
        {}
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default DataViewer;
