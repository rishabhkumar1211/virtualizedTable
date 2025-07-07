import React from "react";
import "./App.css";
import { VirtualizedTable } from "./components/VirtualizedTable";

function App() {
  return (
    <div className="App">
      <h2>Virtual Scroll Table</h2>
      <VirtualizedTable />
    </div>
  );
}

export default App;
