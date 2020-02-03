import React from "react";
import { Route, Switch } from "react-router-dom";

// Component Imports
import LandingPage from "../Containers/LandingPage/index";
import Login from "../Containers/Account/LogIn/index";
import Register from "../Containers/Account/Register/index";
import CreateProjects from "../Containers/Projects/CreateProjects/CreateProjects";

const Router = () => (
    <Switch>
      <Route path="/" component={LandingPage} exact/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register} />
      <Route path="/create-project" component={CreateProjects} />
    </Switch>
);

export default Router;