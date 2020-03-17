import React, { useState, useEffect } from "react";
import { Container, Breadcrumb, Form, Button, Card } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import Post from "../../components/specialized/Forum/Post";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

import { get_posts, make_post} from "../../actions/forumActions"

const Thread = withRouter(({get_posts, make_post, posts, ...props}) => {
  //Initially received from props
  const [threadId, setThreadId] = useState("");
  const [title, setTitle] = useState("");
  const [subforum, setSubforum] = useState("");
  const [submitter, setSubmitter] = useState("");

  //Retrieved after GET
  const [createdAt, setCreatedAt] = useState("");
  const [postsList, setPostsList] = useState([]);
  const [newPost, setNewPost] = useState("");


  useEffect(() => {
    setTitle(props.title);
    setThreadId(props.threadId);
    setSubforum(props.subforum);
    setSubmitter(props.submitter);

  }, [props]);

  useEffect(() => {
    if (threadId) {
      get_posts(threadId);
    }
  }, [threadId]);

  
  useEffect(() => {
    setPostsList(posts);
    setCreatedAt("March 16th, 2020");
  }, [posts]);

  function generateURL(subforum) {
    return ("/forum/" + subforum.toLowerCase().split(" ").join("-") + "/");
  }

  function handlePostChange(e) {
    e.preventDefault();
    setNewPost(e.target.value);
  }

  function onSubmit(e) {
    console.log("hi");
    e.preventDefault();

    const post = {
      id: postsList.length + 1,
      createdAt: "March 11th, 2020",
      content: newPost
    };
    console.log("making post");
    make_post(threadId, subforum, submitter, newPost);

    const newPosts = [].concat(postsList, post);
    console.log(newPosts);
    setNewPost("");
    setPostsList(newPosts);
  }

  function renderPosts() {
    if (
      postsList === null ||
      postsList === undefined ||
      postsList === []
    ) {
      //do nothing
    } else {
      const posts_array = postsList.map((reply, index) => (
        <Post
          key={index}
          createdAt={reply.createdAt}
          content={reply.content}
        />));
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
            <Link to={generateURL(subforum)}>{subforum}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex flex-column">
          <h3 className="text-left">{title}</h3>
          <h6 className="text-left">
            {"Posted by: " + submitter + " on " + createdAt}
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
  return { posts: state.forum.posts }
}

function mapDispatchToProps(dispatch) {
  return {
    get_posts: tid => {
      dispatch(get_posts(tid));
    },
    make_post: (tid, sid, submitter, content) => {
      dispatch(make_post(tid, sid, submitter, content));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
