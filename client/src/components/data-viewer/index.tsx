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

import { DataPoint } from "../../containers/state";

faker.seed(6);

const colourPool = [...Array(100).keys()].map(() => faker.color.rgb());

type DataViewerProps = {
  data: DataPoint[];
  selectedLabels: string[];
  onSelectedLabelsChange: (newSelectedLabels: string[]) => void;
};

type GetDataNames = (data: DataPoint[]) => string[];
const getDataNames: GetDataNames = (data) =>
  data.length > 0 ? Object.keys(data[0].values) : [];

const DataViewer = ({
  data,
  selectedLabels,
  onSelectedLabelsChange,
}: DataViewerProps): JSX.Element => {
  data.sort(
    ({ timestamp: ts0 }, { timestamp: ts1 }) => ts0.getTime() - ts1.getTime()
  );
  const dataForGraph = data.map(({ timestamp, values }) => ({
    name: timestamp.toISOString(),
    ...values,
  }));
  const dataNames = getDataNames(data);
  return (
    <div>
      <div>
        {dataNames.map((label) => {
          const isActive = selectedLabels.includes(label);
          const onChange = () => {
            const newIsActive = !isActive;
            const newSelectedLabels = newIsActive
              ? [...new Set([...selectedLabels, label])]
              : selectedLabels.filter(
                  (selectedLabel) => selectedLabel !== label
                );
            newSelectedLabels.sort();
            onSelectedLabelsChange(newSelectedLabels);
          };
          return (
            <div key={label}>
              <input
                id={label}
                type="checkbox"
                checked={isActive}
                onChange={onChange}
              />
              <label htmlFor={label}>{label}</label>
            </div>
          );
        })}
      </div>
      <LineChart width={1200} height={400} data={dataForGraph}>
        <CartesianGrid strokeDasharray="3 3" />
        {selectedLabels.map((label, i) => (
          <Line
            key={label}
            // type="monotone"
            dataKey={label}
            stroke={colourPool[dataNames.indexOf(label)]}
          />
        ))}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default DataViewer;
