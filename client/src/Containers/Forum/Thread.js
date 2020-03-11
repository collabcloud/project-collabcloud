import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Breadcrumb, Form, Button, Card } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import Post from '../../components/specialized/Forum/Post';

const Thread = (props) => {

  //const [threadId, setThreadId] = useState("");
  const [title, setTitle] = useState("");
  const [parentPath, setParentPath] = useState("");
  const [subforum, setSubforum] = useState("");
  const [submitter, setSubmitter] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [posts, setPosts] = useState([]);
  
  useEffect(
    () => {
      setTitle(props.title);
      setParentPath(props.parentPath);
      setSubforum(props.subforum);
      setSubmitter(props.submitter);
      setCreatedAt(props.createdAt);
      setPosts(props.posts);
    }, [props]);

  return (
    <div>
    <NavigationBar />
    <Container>
    <Breadcrumb>
      <Breadcrumb.Item><Link to="/forum/">Home</Link></Breadcrumb.Item>
      <Breadcrumb.Item><Link to={parentPath}>{subforum}</Link></Breadcrumb.Item>
      <Breadcrumb.Item active>{title}</Breadcrumb.Item>
    </Breadcrumb>
    <div className="d-flex flex-column">
    <h3 className="text-left">{title}</h3>
    <h6 className="text-left">{"Posted by: " + submitter + " on " + createdAt}</h6>
    </div>
    {posts.map((reply) => 
      <Post key={reply.id} submitter={reply.submitter} status={reply.status}
      createdAt={reply.createdAt} content={reply.content}/>
    )}
    <div className="p-2">
      <Card className="border-0">
        <Form>
          <Form.Group className="text-left" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Submit a Reply</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <div className="align-items-start">
            <Button variant="primary" type="submit">Submit</Button>
          </div>
          
        </Form>
      </Card>
    </div>
    </Container>
    
    </div>
  );
};

export default Thread;
