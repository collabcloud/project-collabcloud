import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Component Imports
import LandingPage from "../Containers/LandingPage/LandingPage";
import Login from "../Containers/Account/LogIn/LoginPage";
import Register from "../Containers/Account/Register/RegisterPage";
import Register2 from "../Containers/Account/Register/RegisterPage2";
import Explore from "../Containers/Explore/Explore";
import Trending from "../Containers/Trending/Trending";
import CreateProjects from "../Containers/Projects/CreateProjects/CreateProjects";
import Dashboard from "../Containers/Dashboard/Dashboard";
import Project from "../Containers/User/Project";

import Profile from "../Containers/User/Profile";
import Users from "../Containers/Explore/Users";
import Root from "../Containers/Forum/Root";
import Subforum from "../Containers/Forum/Subforum";
import Thread from "../Containers/Forum/Thread";
import Search from "../Containers/Search/Search";
import Logout from "../Containers/Account/Logout/Logout";
import Chat from "../Containers/Chat/Chat";
import Page404 from "../Containers/Dashboard/404Page";

const io = require("socket.io-client");
const Router = () => {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={LandingPage} exact />
      <Route path="/login" component={Login} />
      {/* <Route path="/register2" component={Register2} /> */}
      <Route path="/register" component={Register} exact />
      <Route path="/register/authenticated" component={Register2} />
      <Route path="/logout" component={Logout} />
      
      {/* Auth Routes */}
      <PrivateRoute path="/project/:pid" component={Project} />
      <PrivateRoute path="/explore" component={Explore} />
      <PrivateRoute path="/trending" component={Trending} />
      <PrivateRoute path="/projects/create" component={CreateProjects} />
      <PrivateRoute path="/user/profile" component={Profile} />
      <PrivateRoute exact path="/user/:uid" component={Profile} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/search" component={Search} />
      <PrivateRoute exact path="/forum/" component={Root} />
      <PrivateRoute exact path="/forum/:subforum" component={Subforum} />
      <PrivateRoute path="/explore/users" component={Users} exact />
      <PrivateRoute exact path="/forum/:subforum/:thread" component={Thread} />
      <PrivateRoute
        path="/message"
        component={props => <Chat {...props} io={io} />}
      />

      {/* Catch All -- 404 */}
      <Route component={Page404} />
      <Route path="/404" component={Page404} />
    </Switch>
  );
};

export default Router;
