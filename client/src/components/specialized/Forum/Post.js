import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from 'react-bootstrap';

import "../../../css/Forum.css";


const Post = (props) => (
  <div className="p-2">
     <Card fluid hoverable="true">
      <Card.Body className="poster">
        <Container>
          <Row>
            <Col xs={2} className="post">
              <p className="submitter">{props.submitter}</p>
              <p>{props.status}</p>
            </Col>
            <Col>
            <Card.Text className="post text-left">
              <p className="small">{props.createdAt}</p>
              <hr
                style={{
                    color: "grey",
                    backgroundColor: "grey",
                    height: 1
                }}
             />
              <p>{props.content}</p>
            </Card.Text>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  </div>
);

export default Post;
