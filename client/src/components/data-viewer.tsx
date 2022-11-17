import React from "react";

export type DataPoint =  {
  timestamp: Date,
  name: string,
  value: number
}

type DataViewerProps = {
  data: DataPoint[]
}

const DataViewer = (props: DataViewerProps): JSX.Element => {
  return <div>The data viewer</div>;
}

export default DataViewer