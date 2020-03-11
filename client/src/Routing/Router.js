import React from "react";
import { Route, Switch } from "react-router-dom";

// Component Imports
import LandingPage from "../Containers/LandingPage/LandingPage";
import Login from "../Containers/Account/LogIn/LoginPage";
import Register from "../Containers/Account/Register/RegisterPage";
import Register2 from "../Containers/Account/Register/RegisterPage2";
import Explore from "../Containers/Explore/Explore";
import CreateProjects from "../Containers/Projects/CreateProjects/CreateProjects";
import Dashboard from "../Containers/Dashboard/Dashboard";
import Project from "../Containers/User/Project";
import Profile from "../Containers/User/Profile";
import Users from "../Containers/Explore/Users";

const Router = () => (
  // Render the first <Route> element whose path matches the current URL
  <Switch>
    <Route path="/" component={LandingPage} exact />
    <Route path="/login" component={Login} />
    <Route path="/register2" component={Register2} />
    <Route path="/register" component={Register} />
    <Route path="/explore" component={Explore} exact />
    <Route path="/projects/create" component={CreateProjects} />
    <Route path="/user/profile" component={Profile} />
    <Route path="/user/project" component={Project} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/explore/users" component={Users} />
  </Switch>
);

export default Router;