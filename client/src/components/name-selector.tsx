import React from "react";
import { DataPoint, Filters } from "../state";

type GetDataNames = (data: DataPoint[]) => string[];
const getDataNames: GetDataNames = (data) =>
  data.length > 0 ? Object.keys(data[0].values) : [];

type GetNewSelectedNames = (args: {
  name: string;
  filters: Filters;
}) => string[];
const getNewSelectedNames: GetNewSelectedNames = ({ name, filters }) => {
  const isActive = filters.names.includes(name);
  const newIsActive = !isActive;
  const newSelectedNames = newIsActive
    ? [...new Set([...filters.names, name])]
    : filters.names.filter((selectedName) => selectedName !== name);
  newSelectedNames.sort();
  return newSelectedNames;
};

type NameSelectorProps = {
  data: DataPoint[];
  filters: Filters;
  onChange: (newSelectedNames: string[]) => void;
};

const NameSelector = ({
  data,
  filters,
  onChange,
}: NameSelectorProps): JSX.Element => {
  const dataNames = getDataNames(data);

  return (
    <div>
      {dataNames.map((dataName) => {
        const isActive = filters.names.includes(dataName);
        return (
          <div key={dataName}>
            <input
              id={dataName}
              type="checkbox"
              checked={isActive}
              onChange={() => {
                const newSelectedNames = getNewSelectedNames({
                  name: dataName,
                  filters,
                });
                onChange(newSelectedNames);
              }}
            />
            <label htmlFor={dataName}>{dataName}</label>
          </div>
        );
      })}
    </div>
  );
};

export default NameSelector;
