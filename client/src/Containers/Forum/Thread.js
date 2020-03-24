import React, { useState, useEffect } from "react";
import { Container, Breadcrumb, Form, Button, Card } from "react-bootstrap";
import Post from "../../components/specialized/Forum/Post";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
//import { GoPlus } from "react-icons/go";
import { generateURL, timeToDate } from "../../utils/helpers";
import NavigationBar from "../../components/specialized/Nav/NavigationBar";

import { get_posts, make_post } from "../../actions/forumActions";

const Thread = withRouter(({ get_posts, make_post, posts, ...props }) => {
  //Initially received from props
  const [threadId, setThreadId] = useState("");
  const [title, setTitle] = useState("");
  const [sid, setSid] = useState("");
  const [subforum, setSubforum] = useState("");
  const [submitter, setSubmitter] = useState("");

  //Retrieved after GET
  const [createdAt, setCreatedAt] = useState("");
  const [postsList, setPostsList] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    setTitle(props.title);
    setThreadId(props.threadId);
    setSid(props.sid);
    setSubforum(props.subforum);
    setSubmitter(props.submitter);
    setCreatedAt(props.createdAt);
  }, [props]);

  useEffect(() => {
    if (threadId) {
      get_posts(threadId);
    }
  }, [threadId]);

  useEffect(() => {
    setPostsList(posts);
  }, [posts]);

  function handlePostChange(e) {
    e.preventDefault();
    setNewPost(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    make_post(threadId, sid, submitter, newPost);
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
            <Link to={generateURL(subforum, "", true)}>{subforum}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex flex-column">
          <h3 className="text-left">{title}</h3>
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
});

function mapStateToProps(state) {
  return { posts: state.forum.posts };
}

function mapDispatchToProps(dispatch) {
  return {
    get_posts: tid => {
      dispatch(get_posts(tid));
    },
    make_post: (tid, sid, submitter, content) => {
      dispatch(make_post(tid, sid, submitter, content));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
