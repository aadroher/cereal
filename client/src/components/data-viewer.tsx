import React from "react";
import { LineChart, Line, CartesianGrid } from "recharts";

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
  const dataForGraph = valuesForA.map(({ timestamp, name, value }) => ({
    name: timestamp.toISOString(),
    [name]: value,
  }));
  console.log(dataForGraph);

  return (
    <div>
      <h1>The data viewer</h1>
      <LineChart width={730} height={250} data={dataForGraph}>
        <Line type="monotone" dataKey="A" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default DataViewer;
