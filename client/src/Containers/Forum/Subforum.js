import React, { useState } from "react";
import { Container, Breadcrumb, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavigationBar } from "../../components/base/NavigationBar";
import  ThreadOverview  from "../../components/specialized/Forum/ThreadOverview";

const Subforum = (props) => {

  function renderThreads() {
    if (props.threads === null || props.threads === undefined || props.threads === []) {
      //do nothing
    } else {
      return (
        props.threads.map((thread) =>
          <ThreadOverview key={thread.id} title={thread.title} submitter={thread.submitter}
          path={thread.path}
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
};

export default Subforum;
