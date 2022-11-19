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

const BIN_SIZES = [60, 60 * 60, 60 * 60 * 24];

type DataViewerProps = {
  data: DataPoint[];
  binSize: number;
  filters: Filters;
  onSelectedNamesChange: (newSelectedLabels: string[]) => void;
  onDateFromChange: (newFromDate: Date) => void;
  onDateToChange: (newToDate: Date) => void;
  onBinSizeChange: (newBinsize: number) => void;
};

type GetDataNames = (data: DataPoint[]) => string[];
const getDataNames: GetDataNames = (data) =>
  data.length > 0 ? Object.keys(data[0].values) : [];

type FormatDateForHtml = (date: Date) => string;
const formatDateForHtml: FormatDateForHtml = (date) =>
  DateTime.fromJSDate(date).toFormat("yyyy-MM-dd'T'HH:mm");

const binSizeToHumanString = (binSize: number) => {
  switch (binSize) {
    case BIN_SIZES[0]: {
      return "1 minute";
    }
    case BIN_SIZES[1]: {
      return "1 hour";
    }
    case BIN_SIZES[2]: {
      return "1 day";
    }
    default: {
      return `${binSize} seconds`;
    }
  }
};

const DataViewer = ({
  data,
  filters,
  binSize,
  onSelectedNamesChange,
  onDateFromChange,
  onDateToChange,
  onBinSizeChange,
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
            onSelectedNamesChange(newSelectedLabels);
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
          onChange={(event) => {
            onDateFromChange(new Date(event.target.value));
          }}
        />
        <label htmlFor="to">To:</label>
        <input
          id="to"
          type="datetime-local"
          name="to"
          value={formatDateForHtml(filters.dates.to)}
          min={formatDateForHtml(filters.dates.from)}
          onChange={(event) => {
            onDateToChange(new Date(event.target.value));
          }}
        />
      </div>
      <fieldset>
        {BIN_SIZES.map((binSizeOption) => (
          <div key={binSizeOption}>
            <input
              id={binSizeOption.toString()}
              name="bin-size"
              type="radio"
              value={binSizeOption.toString()}
              checked={binSizeOption === binSize}
              onChange={() => {
                onBinSizeChange(binSizeOption);
              }}
            />
            <label htmlFor={binSizeOption.toString()}>
              {binSizeToHumanString(binSizeOption)}
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default DataViewer;
