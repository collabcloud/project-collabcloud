import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import { get_threads } from "../actions/routingActions";
//import { get_subforums } from "../actions/forumActions";

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

const threads = [
  {
    id: 1,
    title:
      "Why is processing a sorted array faster than processing an unsorted array?",
    submitter: "jcserv",
    subforum: "Bug Bounties",
    threadId: "fe100b6f-9b2d-5b34-a2b4-cfcc5ed8cb54",
    sid: "b0db9a2c-ede1-5d93-81cc-55a0422c2f8e"
  },

  {
    id: 2,
    title: "How do I undo the most recent local commits in Git?",
    submitter: "bajajrah",
    subforum: "Bug Bounties",
    threadId: "55b5a126-5010-5d43-8a55-9766c716a402",
    sid: "b0db9a2c-ede1-5d93-81cc-55a0422c2f8e"
  },

  {
    id: 3,
    title: "Is the search time of a circular linked list O(1)?",
    submitter: "Mikhail",
    subforum: "Bug Bounties",
    threadId: "a25373d0-bdf0-50dd-92f7-9eb6b52f1afe",
    sid: "b0db9a2c-ede1-5d93-81cc-55a0422c2f8e"
  }
];

const subforums = [
  {
    sid: "1b783d30-dfbd-515c-a4f0-c04cdb9ce6e8",
    title: "General",
    description: "Chat about anything from the daily news to the latest fashion"
  },
  {
    sid: "f6410ac6-9e5b-55af-acfd-59748e366a27",
    title: "Hacker News",
    description: "The latest tech industry news stories"
  },
  {
    sid: "b0db9a2c-ede1-5d93-81cc-55a0422c2f8e",
    title: "Bug Bounties",
    description:
      "Help fellow CollabClouders with syntax, runtime, logic errors and more"
  },
  {
    sid: "0e0a9880-c55a-57e5-83ef-e9df36bfb37b",
    title: "LF Collaborators",
    description: "View projects seeking collaborators"
  }
];

const uid = "353284bb-b914-4eb3-8a4f-1aa74f5c2300";
//TODO filter out special chars
function generateURL(subforum, title, isParent) {
  const subforum_url =
    "/forum/" +
    subforum
      .toLowerCase()
      .split(" ")
      .join("-") +
    "/";
  if (isParent) {
    return subforum_url;
  }
  const url =
    subforum_url +
    title
      .replace("?", "")
      .toLowerCase()
      .split(" ")
      .join("-") +
    "/";

  console.log(url);
  return url;
}

const Router = () => (
  // Render the first <Route> element whose path matches the current URL
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

    {subforums.map(subforum => (
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
    ))}

    {threads.map(thread => (
      <Route
        exact
        path={generateURL(thread.subforum, thread.title, false)}
        render={props => (
          <Thread
            {...props}
            title={thread.title}
            threadId={thread.threadId}
            submitter={thread.submitter}
            subforum={thread.subforum}
            sid={thread.sid}
          />
        )}
      />
    ))}
  </Switch>
);

export default Router;
