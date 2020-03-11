import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import Post from '../../components/specialized/Forum/Post';

const Thread = (props) => {
  return (
    <div>
    <NavigationBar />
    <Container>
    <Breadcrumb>
      <Breadcrumb.Item><Link to="/forum/">Home</Link></Breadcrumb.Item>
      <Breadcrumb.Item><Link to={props.parentPath}>{props.subforum}</Link></Breadcrumb.Item>
      <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
    </Breadcrumb>
    <div className="d-flex flex-column">
    <h3 className="text-left">{props.title}</h3>
    <h6 className="text-left">{"Posted by: " + props.submitter + " on " + props.createdAt}</h6>
    </div>
    {props.posts.map((reply) => 
      <Post key={reply.id} submitter={reply.submitter} status={reply.status}
      createdAt={reply.createdAt} content={reply.content}/>
    )}
    </Container>
    
    </div>
  );
};

export default Thread;
