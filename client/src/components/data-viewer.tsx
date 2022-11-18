import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { DateTime } from "luxon";

export type DataPoint = {
  timestamp: Date;
  name: string;
  value: number;
};

type DataViewerProps = {
  data: DataPoint[];
};

const DataViewer = ({ data }: DataViewerProps): JSX.Element => {
  const valuesForA = data.filter(({ name }) => name === "A");
  valuesForA.sort(
    ({ timestamp: ts0 }, { timestamp: ts1 }) => ts0.getTime() - ts1.getTime()
  );
  const dataForGraph = valuesForA.map(({ timestamp, name, value }) => ({
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
        <Line type="monotone" dataKey="A" stroke="#8884d8" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
      </LineChart>
    </div>
  );
};

export default DataViewer;
