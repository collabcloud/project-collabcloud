import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Breadcrumb,
  Table,
  Button,
  Row,
  Col
} from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

import { NavigationBar } from "../../components/base/NavigationBar";
import ThreadOverview from "../../components/specialized/Forum/ThreadOverview";
import ThreadForm from "../../components/specialized/Forum/ThreadForm";

import { get_threads, post_thread } from "../../actions/forumActions";

const Subforum = withRouter(({ get_threads, post_thread, threads, props }) => {
  const hardcode_sid = "b99cdc21-ffe5-515e-a0de-50e609146f04";
  const hardcode_uid = "50247c0b-0536-4b1c-9239-336badd07a65";

  const [sid, setSid] = useState("");
  const [subforum, setSubforum] = useState("");
  const [threadsList, setThreadsList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    /*
    post_thread(
      hardcode_sid,
      hardcode_uid,
      "Why is processing a sorted array faster than processing an unsorted array?",
      "I don't get it! Someone please help."
    );
    post_thread(
      hardcode_sid,
      hardcode_uid,
      "Is the search time of a circular linked list O(1)?",
      "help!!!1"
    );*/
    setSubforum("Bug Bounties");
    get_threads(hardcode_sid);
  }, []);
  /*
  useEffect(() => {
    setSid("08a9101b-93e1-5304-b006-21776da5ddcc");
    setSubforum("Bug Bounties");
  }, [props]);
  */
  useEffect(() => {
    setThreadsList(threads);
  }, [threads]);

  function rerenderThreads() {
    console.log("rerendering...");
    get_threads(hardcode_sid);
  }

  function generateURL(subforum, title) {
    return (
      "/forum/" +
      subforum
        .toLowerCase()
        .split(" ")
        .join("-") +
      "/" +
      title
        .toLowerCase()
        .split(" ")
        .join("-")
    );
  }

  function renderThreads() {
    if (
      threadsList === null ||
      threadsList === undefined ||
      threadsList === []
    ) {
      //do nothing
    } else {
      const thread_overviews = threadsList.map((thread, index) => (
        <ThreadOverview
          key={index}
          path={generateURL(subforum, thread.topic)}
          title={thread.topic}
          submitter={thread.submitter}
          createdAt={thread.createdAt}
        />
      ));
      return thread_overviews;
    }
  }

  function renderThreadForm() {
    if (showForm) {
      return (
        <ThreadForm
          onCancel={setShowForm}
          sid={hardcode_sid}
          uid={hardcode_uid}
          rerender={rerenderThreads}
        />
      );
    }
  }

  function renderErrorMessage() {
    if (
      threadsList === null ||
      threadsList === undefined ||
      threadsList === []
    ) {
      return <p>No data to display</p>;
    }
  }
  //TODO: props.title, props.description
  return (
    <div>
      <NavigationBar />
      <Container className="mb-3">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/forum/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Bug Bounties</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex flex-column mb-3">
          <h3 className="text-left">Bug Bounties</h3>
          <Row>
            <Col className="d-flex justify-content-start">
              <h6 className="text-left">They really do got bugs doe</h6>
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-end">
              <Button
                variant="success"
                onClick={() => {
                  setShowForm(true);
                }}
              >
                <GoPlus /> Submit A New Thread
              </Button>
            </Col>
          </Row>
        </div>
        <Table bordered hover>
          <thead>
            <th className="text-left">Thread</th>
            <th className="text-center">Stats</th>
            <th className="text-right">Latest Response</th>
          </thead>
          <tbody>{renderThreads()}</tbody>
        </Table>
        {renderThreadForm()}
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
    get_threads: sid => {
      dispatch(get_threads(sid));
    },
    post_thread: (sid, submitter, title, description) => {
      dispatch(post_thread(sid, submitter, title, description));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subforum);
