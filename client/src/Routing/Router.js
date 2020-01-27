import React from "react";
import { Route, Switch } from "react-router-dom";

// Component Imports
import LandingPage from "../Containers/LandingPage/LandingPage";
import Login from "../Containers/Account/LogIn/LoginPage";
import Register from "../Containers/Account/Register/RegisterPage";

const Router = () => (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={LandingPage} />
    </Switch>
);

export default Router;