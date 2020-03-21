import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
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

const uid = "17044c11-c813-4dd7-94c6-4a387d4c1ede";
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
        const subforum_links = subforums.map(subforum => (
          <Route
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
        const thread_links = threads.map(thread => (
          <Route
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

    // Render the first <Route> element whose path matches the current URL

    return (
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={Login} />
        <Route path="/register2" component={Register2} />
        <Route path="/register" component={Register} />
        <Route path="/explore" component={Explore} />
        <Route path="/projects/create" component={CreateProjects} />
        <Route path="/user/profile" component={Profile} />
        <Route path="/user/matthuynh" component={OtherProfile} />
        <Route path="/user/project" component={Project} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/search" component={Search} />
        <Route exact path="/forum/" component={Root} />
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
