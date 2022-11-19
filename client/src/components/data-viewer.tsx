import React from "react";

import "./data-viewer.scss";

import Chart from "./chart";
import NameSelector from "./name-selector";
import DateSelector from "./date-selector";
import BinSizeSelector from "./bin-size-selector";

import { DataPoint, Filters } from "../state";

type DataViewerProps = {
  data: DataPoint[];
  binSize: number;
  filters: Filters;
  onSelectedNamesChange: (newSelectedLabels: string[]) => void;
  onDateFromChange: (newFromDate: Date) => void;
  onDateToChange: (newToDate: Date) => void;
  onBinSizeChange: (newBinsize: number) => void;
};

const DataViewer = ({
  data,
  filters,
  binSize,
  onSelectedNamesChange,
  onDateFromChange,
  onDateToChange,
  onBinSizeChange,
}: DataViewerProps): JSX.Element => (
  <div className="data-viewer">
    <NameSelector
      data={data}
      filters={filters}
      onChange={onSelectedNamesChange}
    />
    <Chart data={data} filters={filters} />
    <div className="data-viewer__bottom-controls">
      <DateSelector
        filters={filters}
        onDateFromChange={onDateFromChange}
        onDateToChange={onDateToChange}
      />
      <BinSizeSelector binSize={binSize} onBinSizeChange={onBinSizeChange} />
    </div>
  </div>
);

export default DataViewer;
