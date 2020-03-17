import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from 'react-bootstrap';

import "../../../css/Forum.css";


const Post = (props) => {

  const [content, setContent] = useState("");
  const [submitter, setSubmitter] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  
  useEffect(
    () => {
      setContent(props.content);
      setSubmitter(props.submitter);
      setCreatedAt(props.createdAt);
    }, [props]);

  return (
    <div className="p-2">
      <Card fluid hoverable="true">
        <Card.Body className="poster">
          <Container>
            <Row>
              <Col xs={2} className="post">
                <p className="submitter">jcserv</p>
                <p>Gamers rise up</p>
              </Col>
              <Col>
              <Card.Text className="post text-left">
                <p className="small">{createdAt}</p>
                <hr
                  style={{
                      color: "grey",
                      backgroundColor: "grey",
                      height: 1
                  }}
              />
                <p>{content}</p>
              </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Post;
