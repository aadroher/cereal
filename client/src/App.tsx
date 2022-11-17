import React, {useEffect} from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const fetchFromApi = async () => {
     const response = await fetch('/api/v0/metrics')
     console.log(response)
     const responseBody = await response.json()
     console.log(responseBody)
    }
    fetchFromApi()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cereal</h1>
      </header>
    </div>
  );
}

export default App;
