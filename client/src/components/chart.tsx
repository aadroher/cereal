import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { faker } from "@faker-js/faker";

import { DataPoint, Filters } from "../state";

faker.seed(6);

const colourPool = [...Array(100).keys()].map(() => faker.color.rgb());

type ChartProps = {
  data: DataPoint[];
  filters: Filters;
};

type GetDataNames = (data: DataPoint[]) => string[];
const getDataNames: GetDataNames = (data) =>
  data.length > 0 ? Object.keys(data[0].values) : [];

const Chart = ({ data, filters }: ChartProps): JSX.Element => {
  data.sort(
    ({ timestamp: ts0 }, { timestamp: ts1 }) => ts0.getTime() - ts1.getTime()
  );

  const dataForGraph = data.map(({ timestamp, values }) => ({
    name: timestamp.toISOString(),
    ...values,
  }));

  const dataNames = getDataNames(data);

  return (
    <LineChart width={1200} height={400} data={dataForGraph}>
      <CartesianGrid strokeDasharray="3 3" />
      {filters.names.map((name, i) => (
        <Line
          key={name}
          // type="monotone"
          dataKey={name}
          stroke={colourPool[dataNames.indexOf(name)]}
        />
      ))}
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default Chart;
