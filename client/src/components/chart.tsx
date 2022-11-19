import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

import { DataPoint, Filters } from "../state";

faker.seed(6);

const colourPool = [...Array(100).keys()].map(() => faker.color.rgb());

type GetRoundedValues = (values: { [key: string]: number }) => {
  [key: string]: number;
};
const getRoundedValues: GetRoundedValues = (values) =>
  Object.entries(values).reduce(
    (formatted, [key, value]) => ({
      ...formatted,
      [key]: value.toFixed(2),
    }),
    {}
  );

type ChartDataPoint = {
  [key: string]: string | number;
};
type GetDataForChart = (data: DataPoint[]) => ChartDataPoint[];
const getDataforChart: GetDataForChart = (data) => {
  data.sort(
    ({ timestamp: ts0 }, { timestamp: ts1 }) => ts0.getTime() - ts1.getTime()
  );

  return data.map(({ timestamp, values }) => {
    const formattedTimestamp =
      DateTime.fromJSDate(timestamp).toFormat("MM-dd HH:mm");
    const roundedValues = getRoundedValues(values as { [key: string]: number });
    return {
      name: formattedTimestamp,
      ...roundedValues,
    };
  });
};

type ChartProps = {
  data: DataPoint[];
  filters: Filters;
};

type GetDataNames = (data: DataPoint[]) => string[];
const getDataNames: GetDataNames = (data) =>
  data.length > 0 ? Object.keys(data[0].values) : [];

const Chart = ({ data, filters }: ChartProps): JSX.Element => {
  const dataNames = getDataNames(data);
  const dataForGraph = getDataforChart(data);

  return (
    <ResponsiveContainer minWidth={800} minHeight={400}>
      <LineChart data={dataForGraph}>
        <CartesianGrid strokeDasharray="3 3" />
        {filters.names.map((name, i) => (
          <Line
            key={name}
            type="monotone"
            dot={false}
            dataKey={name}
            isAnimationActive={false}
            stroke={colourPool[dataNames.indexOf(name)]}
          />
        ))}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
