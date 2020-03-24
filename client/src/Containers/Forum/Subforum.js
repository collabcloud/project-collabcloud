import React, { useState, useEffect } from "react";
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
import { timeToDate, generateURL } from "../../utils/helpers";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";

import ThreadOverview from "../../components/specialized/Forum/ThreadOverview";
import ThreadForm from "../../components/specialized/Forum/ThreadForm";

import { get_threads, post_thread } from "../../actions/forumActions";

const Subforum = withRouter(
  ({ get_threads, post_thread, threads, ...props }) => {
    //Obtained from props
    const [uid, setUid] = useState("");
    const [sid, setSid] = useState("");

    //Received from GET
    const [subforum, setSubforum] = useState("");
    const [description, setDescription] = useState("");
    const [threadsList, setThreadsList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
      setSid(props.sid);
      setUid(props.uid);
      setSubforum(props.title);
      setDescription(props.description);
    }, [props]);

    useEffect(() => {
      setThreadsList(threads);
    }, [threads]);

    useEffect(() => {
      if (sid !== "") {
        get_threads(sid);
      }
    }, [get_threads, sid]);

    async function rerenderThreads() {
      get_threads(sid);
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
            path={generateURL(subforum, thread.topic, false)}
            title={thread.topic}
            submitter={thread.username}
            createdAt={timeToDate(thread.createdAt)}
            updatedAt={timeToDate(thread.updatedAt)}
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
            sid={sid}
            uid={uid}
            subforum={subforum}
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
            <Breadcrumb.Item active>{subforum}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="d-flex flex-column mb-3">
            <h3 className="text-left">{subforum}</h3>
            <Row>
              <Col className="d-flex justify-content-start">
                <h6 className="text-left">{description}</h6>
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
              <tr>
                <th className="text-left">Thread</th>
                <th className="text-center">Stats</th>
                <th className="text-right">Latest Response</th>
              </tr>
            </thead>
            <tbody>{renderThreads()}</tbody>
          </Table>
          {renderThreadForm()}
          {renderErrorMessage()}
        </Container>
      </div>
    );
  }
);

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
