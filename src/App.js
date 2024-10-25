import React from "react";
import Users from "./Users/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
