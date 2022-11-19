import React, { useEffect, useState } from "react";
import "./App.css";
import DataViewer, { DataPoint } from "./components/data-viewer";

function App() {
  const [data, setData] = useState([] as DataPoint[]);
  useEffect(() => {
    const fetchFromApi = async () => {
      const response = await fetch(
        "/api/v0/metrics/averages?from=2021-03-23&to=2021-04-23T12:05:00&names[]=temperature&names[]=insolation&names[]=pressure&bin_size=3600"
      );
      const responseBody: DataPoint[] = await response.json();
      console.log(responseBody);
      const newData = responseBody.map(({ timestamp, values }) => ({
        timestamp: new Date(timestamp),
        values,
      }));
      setData(newData);
    };
    fetchFromApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cereal</h1>
      </header>
      <DataViewer data={data} />
    </div>
  );
}

export default App;
