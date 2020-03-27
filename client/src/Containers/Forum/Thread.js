import React, { useState, useEffect } from "react";
import { Container, Breadcrumb, Form, Button, Card } from "react-bootstrap";
import Post from "../../components/specialized/Forum/Post";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { generateURL, timeToDate, convertToTitle } from "../../utils/helpers";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";

import { get_posts, make_post, get_thread } from "../../actions/forumActions";

const Thread = props => {
  const { get_thread, thread, get_posts, make_post, posts, uid, match } = props;

  const subforum = match.params.subforum;
  const threadTopic = match.params.thread;

  //Thread Information
  const [threadId, setThreadId] = useState("");
  const [sid, setSid] = useState("");
  const [submitter, setSubmitter] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  //Posts
  const [postsList, setPostsList] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    if (threadTopic !== "") {
      get_thread(subforum, threadTopic);
    }
  }, [get_thread, subforum, threadTopic]);

  useEffect(() => {
    if (typeof thread.tid !== "undefined") {
      setThreadId(thread.tid);
      setSid(thread.subforumSid);
      setSubmitter(thread.username);
      setCreatedAt(thread.createdAt);
      get_posts(thread.tid);
      get_posts(thread.tid);
    }
  }, [get_posts, thread]);

  useEffect(() => {
    setPostsList(posts);
  }, [posts]);

  function handlePostChange(e) {
    e.preventDefault();
    setNewPost(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    make_post(threadId, sid, submitter, uid, newPost);
    get_posts(threadId);
    get_posts(threadId);
    setNewPost("");
  }

  function renderPosts() {
    if (postsList === null || postsList === undefined || postsList === []) {
      //do nothing
    } else {
      const posts_array = postsList.map((reply, index) => (
        <Post
          key={index}
          createdAt={reply.createdAt}
          content={reply.content}
          username={reply.username}
          avatar={reply.submitter.avatar}
          description={reply.submitter.description}
        />
      ));
      return posts_array;
    }
  }

  return (
    <div>
      <NavigationBar />
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/forum/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={generateURL(subforum, "", true)}>
              {convertToTitle(subforum)}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {convertToTitle(threadTopic)}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex flex-column">
          <h3 className="text-left">{convertToTitle(threadTopic)}</h3>
          <h6 className="text-left">
            {"Posted by: " + submitter + " on " + timeToDate(createdAt)}
          </h6>
        </div>
        {renderPosts()}
        <div className="p-2">
          <Card className="border-0">
            <Form onSubmit={onSubmit}>
              <Form.Group
                className="text-left"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Submit a Reply</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows="3"
                  value={newPost}
                  onChange={handlePostChange}
                />
              </Form.Group>
              <div className="align-items-start">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    posts: state.forum.posts,
    thread: state.forum.thread,
    uid: state.user.uid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    get_thread: (subforum, threadTopic) => {
      dispatch(get_thread(subforum, threadTopic));
    },
    get_posts: tid => {
      dispatch(get_posts(tid));
    },
    make_post: (tid, sid, submitter, submitterUid, content) => {
      dispatch(make_post(tid, sid, submitter, submitterUid, content));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
