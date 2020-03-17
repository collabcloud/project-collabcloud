import React, {useState, useEffect} from "react";
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

const posts1 = [
  {
    id: 1,
    submitter: "jcserv",
    status: "ok so basically im monky",
    createdAt: "March 11th, 2020",
    content: "I don't get it! Someone please help."
  },

  {
    id: 2,
    submitter: "furqan",
    status: "4x4",
    createdAt: "March 11th, 2020",
    content: "Sorting lets you do some cool stuff."
  }
];

const posts2 = [
  {
    id: 1,
    submitter: "bajajrah",
    status: "G.S.D",
    createdAt: "March 9th, 2020",
    content: "HELP!!!!"
  },

  {
    id: 2,
    submitter: "matthuynh",
    status: "I love coding",
    createdAt: "March 10th, 2020",
    content: 'git commit --amend -m "message here" ...'
  }
];

const posts3 = [
  {
    id: 1,
    submitter: "Mikhail",
    status: "codedaddy",
    createdAt: "Feb 16th, 2020",
    content: "help!!!1"
  },

  {
    id: 2,
    submitter: "Lance",
    status: "bongo <3",
    createdAt: "March 11th, 2020",
    content: "r u dumb"
  }
];

const threads = [
  {
    id: 1,
    title:
      "Why is processing a sorted array faster than processing an unsorted array?",
    submitter: "jcserv",
    subforum: "Bug Bounties",
    threadId: "7e31ee3b-5851-54cc-97c3-ae6d9a659a71"
  },

  {
    id: 2,
    title: "How do I undo the most recent local commits in Git?",
    submitter: "bajajrah",
    subforum: "Bug Bounties",
    threadId: "55b5a126-5010-5d43-8a55-9766c716a402"
  },

  {
    id: 3,
    title: "Is the search time of a circular linked list O(1)?",
    submitter: "Mikhail",
    subforum: "Bug Bounties",
    threadId: "a25373d0-bdf0-50dd-92f7-9eb6b52f1afe"
  }
];

const subforums = [
  {
    id: 1,
    title: "General",
    path: "/forum/general",
    description: "Chat about anything from the daily news to the latest fashion"
  },
  {
    id: 2,
    title: "Hacker News",
    path: "/forum/hacker-news",
    description: "The latest tech industry news stories"
  },
  {
    id: 3,
    title: "Bug Bounties",
    path: "/forum/bug-bounties",
    description:
      "Help fellow CollabClouders with syntax, runtime, logic errors and more",
    threads: threads
  },
  {
    id: 4,
    title: "LF Collaborators",
    path: "/forum/collabs",
    description: "View projects seeking collaborators"
  }
];

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
        path={subforum.path}
        render={props => (
          <Subforum
            {...props}
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
        path={thread.path}
        render={props => (
          <Thread
            {...props}
            title={thread.title}
            threadId={thread.threadId}
            submitter={thread.submitter}
            subforum={thread.subforum}
          />
        )}
      />
    ))}
  </Switch>
);

export default Router;