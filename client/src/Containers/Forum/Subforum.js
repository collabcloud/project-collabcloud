import React, { useState, useEffect } from "react";
import {
  Container,
  Breadcrumb,
  Table,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import PropTypes from "prop-types";

import { timeToDate, generateURL, convertToTitle } from "../../utils/helpers";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";
import ThreadOverview from "../../components/specialized/Forum/ThreadOverview";
import ThreadForm from "../../components/specialized/Forum/ThreadForm";

import { get_subforum, get_threads } from "../../actions/forumActions";

const Subforum = (props) => {
  const {
    get_subforum,
    get_threads,
    subforum,
    threads,
    uid,
    status,
    match,
  } = props;
  const history = useHistory();
  const title = match.params.subforum;

  //Received from GET
  const [sid, setSid] = useState("");
  const [description, setDescription] = useState("");
  const [threadsList, setThreadsList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (title !== "") {
      get_subforum(title);
    }
  }, [get_subforum, title]);

  useEffect(() => {
    if (status === 404) {
      history.push("/404");
    }
  }, [status, history]);

  useEffect(() => {
    if (typeof subforum.sid !== "undefined") {
      setSid(subforum.sid);
      get_threads(subforum.sid);
      setDescription(subforum.description);
    }
  }, [get_threads, subforum]);

  useEffect(() => {
    setThreadsList(threads);
  }, [threads]);

  async function rerenderThreads() {
    await get_threads(subforum.sid);
    await get_threads(subforum.sid);
  }

  function renderThreads() {
    if (
      threadsList === null ||
      threadsList === undefined ||
      threadsList === [] ||
      threadsList.length === 0
    ) {
      return <p>No data to display</p>;
    } else {
      const thread_overviews = threadsList.map((thread, index) => (
        <ThreadOverview
          key={index}
          path={generateURL(convertToTitle(title), thread.id, false)}
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
          subforum={convertToTitle(title)}
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
  return (
    <div>
      <NavigationBar />
      <Container className="mb-3">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/forum/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{convertToTitle(title)}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex flex-column mb-3">
          <h3 className="text-left">{convertToTitle(title)}</h3>
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
};

function mapStateToProps(state) {
  return {
    threads: state.forum.threads,
    subforum: state.forum.subforum,
    uid: state.user.uid,
    status: state.forum.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    get_subforum: (sid) => {
      dispatch(get_subforum(sid));
    },
    get_threads: (sid) => {
      dispatch(get_threads(sid));
    },
  };
}

Subforum.propTypes = {
  get_subforum: PropTypes.func.isRequired,
  get_threads: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subforum);
