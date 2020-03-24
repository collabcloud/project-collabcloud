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
import Trending from "../Containers/Trending/Trending";
import Dashboard from "../Containers/Dashboard/Dashboard";
import Project from "../Containers/User/Project";
import OtherProfile from "../Containers/User/OtherProfile";
import Profile from "../Containers/User/Profile";
import Root from '../Containers/Forum/Root';
import Subforum from '../Containers/Forum/Subforum';
import Thread from '../Containers/Forum/Thread';
import Search from "../Containers/Search/Search"
import Logout from "../Containers/Account/Logout/Logout";
import Page404 from "../Containers/Dashboard/404Page";

const uid = "55452c81-3295-4ac2-80cd-a5f0b9a86fd6";
//TODO filter out special chars

const Router = withRouter(
  ({ get_subforums, get_all_threads, subforums, threads }) => {
    useEffect(() => {
      fetchResources();
    }, []);

    async function fetchResources() {
      await get_subforums();
      await get_all_threads();
    }

    function renderSubforums() {
      if (subforums !== undefined || subforums !== null) {
        const subforum_links = subforums.map((subforum, index) => (
          <Route
            key={index}
            exact
            path={generateURL(subforum.title, "", true)}
            render={props => (
              <Subforum
                {...props}
                sid={subforum.sid}
                uid={uid}
                title={subforum.title}
                description={subforum.description}
                threads={subforum.threads}
              />
            )}
          />
        ));
        return subforum_links;
      }
    }

    function renderThreads() {
      if (subforums !== undefined || subforums !== null) {
        const thread_links = threads.map((thread, index) => (
          <Route
            key={index}
            exact
            path={generateURL(thread.forum_title, thread.topic, false)}
            render={props => (
              <Thread
                {...props}
                title={thread.topic}
                threadId={thread.tid}
                submitter={thread.username}
                subforum={thread.forum_title}
                sid={thread.subforumSid}
                createdAt={thread.createdAt}
              />
            )}
          />
        ));
        return thread_links;
      }
    }
    
    return (
      <Switch>
         {/* Public Routes */}
        <Route path="/" component={LandingPage} exact/>
        <Route path="/login" component={Login}/>
        <Route path="/register2" component={Register2} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />

        {/* Auth Routes */}
        <PrivateRoute path="/project/:pid" component={Project} />
        <PrivateRoute path ="/explore" component={Explore} />
        <PrivateRoute path="/projects/create" component={CreateProjects} />
        <PrivateRoute path="/user/profile" component={Profile} />
        <PrivateRoute path="/user/matthuynh" component={OtherProfile} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/search" component={Search} />
        <PrivateRoute exact path="/forum/" component={Root} />

        {/* Catch All -- 404 */}
        <Route component={Page404} />
      
        {renderSubforums()}
        {renderThreads()}
      </Switch>
    );
  }
);

function mapStateToProps(state) {
  return { subforums: state.forum.subforums, threads: state.forum.threads };
}

function mapDispatchToProps(dispatch) {
  return {
    get_subforums: () => {
      dispatch(get_subforums());
    },
    get_all_threads: () => {
      dispatch(get_all_threads());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
