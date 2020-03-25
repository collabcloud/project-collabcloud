import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import { get_subforums, get_all_threads } from "../actions/forumActions";
import { generateURL } from "../utils/helpers";

// Component Imports
import LandingPage from "../Containers/LandingPage/LandingPage";
import Login from "../Containers/Account/LogIn/LoginPage";
import Register from "../Containers/Account/Register/RegisterPage";
import Register2 from "../Containers/Account/Register/RegisterPage2";
import Explore from "../Containers/Explore/Explore";
import CreateProjects from "../Containers/Projects/CreateProjects/CreateProjects";
import Dashboard from "../Containers/Dashboard/Dashboard";
import Project from "../Containers/User/Project";
import OtherProfile from "../Containers/User/OtherProfile";
import Profile from "../Containers/User/Profile";
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
      <Route path="/register2" component={Register2} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />
      {/* Auth Routes */}
      <PrivateRoute path="/project/:pid" component={Project} />
      <PrivateRoute path="/explore" component={Explore} />
      <PrivateRoute path="/projects/create" component={CreateProjects} />
      <PrivateRoute path="/user/profile" component={Profile} />
      <PrivateRoute path="/user/matthuynh" component={OtherProfile} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/search" component={Search} />
      <PrivateRoute exact path="/forum/" component={Root} />
      <PrivateRoute exact path="/forum/:subforum" component={Subforum} />
      <PrivateRoute exact path="/forum/:subforum/:thread" component={Thread} />
      <PrivateRoute
        path="/message"
        component={props => <Chat {...props} io={io} />}
      />

      {/* Catch All -- 404 */}
      <Route component={Page404} />
    </Switch>
  );
};

export default Router;
