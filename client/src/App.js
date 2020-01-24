import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Router Imports
import { BrowserRouter } from "react-router-dom";
import Router from "./Routing/Router"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
