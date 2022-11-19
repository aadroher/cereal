import React from "react";
import { DateTime } from "luxon";
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

import { DataPoint, Filters } from "../../state";

faker.seed(6);

const colourPool = [...Array(100).keys()].map(() => faker.color.rgb());

type DataViewerProps = {
  data: DataPoint[];
  filters: Filters;
  onSelectedLabelsChange: (newSelectedLabels: string[]) => void;
};

type GetDataNames = (data: DataPoint[]) => string[];
const getDataNames: GetDataNames = (data) =>
  data.length > 0 ? Object.keys(data[0].values) : [];

type FormatDateForHtml = (date: Date) => string;
const formatDateForHtml: FormatDateForHtml = (date) =>
  DateTime.fromJSDate(date).toFormat("yyyy-MM-dd'T'HH:mm");

const DataViewer = ({
  data,
  filters,
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
        {dataNames.map((dataName) => {
          const isActive = filters.names.includes(dataName);
          const onChange = () => {
            const newIsActive = !isActive;
            const newSelectedLabels = newIsActive
              ? [...new Set([...filters.names, dataName])]
              : filters.names.filter(
                  (selectedName) => selectedName !== dataName
                );
            newSelectedLabels.sort();
            onSelectedLabelsChange(newSelectedLabels);
          };
          return (
            <div key={dataName}>
              <input
                id={dataName}
                type="checkbox"
                checked={isActive}
                onChange={onChange}
              />
              <label htmlFor={dataName}>{dataName}</label>
            </div>
          );
        })}
      </div>
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
      <div>
        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="datetime-local"
          name="from"
          value={formatDateForHtml(filters.dates.from)}
        />
        <label htmlFor="to">To:</label>
        <input
          id="to"
          type="datetime-local"
          name="to"
          value={formatDateForHtml(filters.dates.to)}
          min={formatDateForHtml(filters.dates.from)}
        />
      </div>
    </div>
  );
};

export default DataViewer;
