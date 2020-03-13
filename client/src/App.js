import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './App.css';

// Router Imports
import { BrowserRouter } from "react-router-dom";
import Router from "./Routing/Router"

// Redux Imports
import { Provider } from 'react-redux';
import store from "./store";


function App() {
  
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
            <Router />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
