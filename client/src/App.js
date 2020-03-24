import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './App.css';

// Router Imports
import { BrowserRouter } from "react-router-dom";
import Router from "./Routing/Router"

// Redux Imports
import { Provider } from 'react-redux';
import store from "./store";

// Auth Modules
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/loginActions';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []) // component did mount
  
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
