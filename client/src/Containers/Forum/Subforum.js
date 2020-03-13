import React, { useState, useEffect } from "react";
import { Container, Breadcrumb, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { NavigationBar } from "../../components/base/NavigationBar";
import  ThreadOverview  from "../../components/specialized/Forum/ThreadOverview";

import { get_threads, post_thread } from "../../actions/forumActions";

const Subforum = withRouter(({ get_threads, post_thread, threads, props}) => {

  const [sid, setSid] = useState("");
  const [subforum, setSubforum] = useState("");
  const [threadsList, setThreadsList] = useState([]);

  useEffect(() => {
    post_thread(sid, submitter, 
      "Why is processing a sorted array faster than processing an unsorted array?", 
      "I don't get it! Someone please help.");
    post_thread(sid, submitter, "Is the search time of a circular linked list O(1)?", "help!!!1");

    get_threads(props.sid);
  }, []);

  useEffect(() => {
    setSid(props.sid);
    setSubforum(props.subforum);
  }, [props]);

  useEffect(() => {
    setThreadsList(threads);
  }, [threads]);

  function generateURL(subforum, title) {
    return "/forum/" + subforum + title.toLowerCase().replace(" ", "-");
  }

  function renderThreads() {
    if (props.threads === null || props.threads === undefined || props.threads === []) {
      //do nothing
    } else {
      return (
        props.threads.map((thread, index) =>
          <ThreadOverview key={index} title={thread.title} submitter={thread.submitter}
          path={generateURL(subforum, thread.title)}
          createdAt={thread.createdAt} replies={thread.replies} views={thread.views} modifiedAt={thread.modifiedAt}
          recent={thread.recent} />
          )
      );
    }
  }

  function renderErrorMessage() {
    if (props.threads === null || props.threads === undefined || props.threads === []) {
      return (
        <p>No data to display</p>
      );
    }
  }


  return (
    <div>
    <NavigationBar />
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/forum/">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex flex-column">
  <h3 className="text-left">{props.title}</h3>
  <h6 className="text-left">{props.description}</h6>
      </div>
      <Table bordered hover>
        <thead>
          <th className="text-left">Thread</th>
          <th className="text-center">Stats</th>
          <th className="text-right">Latest Response</th>
        </thead>
        <tbody>
          {renderThreads()}  
        </tbody>
      </Table>
      {renderErrorMessage()}
    </Container>
    </div>
  );
});

function mapStateToProps(state) {
  return { threads: state.forum.threads };
}

function mapDispatchToProps(dispatch) {
  return {
    get_threads: () => {
      dispatch(get_threads());
    },
    post_thread: (title, description) => {
      dispatch(post_thread(title, description));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subforum);
