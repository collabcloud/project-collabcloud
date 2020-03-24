import React, { useState, useEffect } from "react";
import { timeToDate } from "../../../utils/helpers";
import Avatar from "../../base/Avatar";
import { Card, Container, Row, Col } from "react-bootstrap";

import "../../../css/Forum.css";

const Post = props => {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setContent(props.content);
    setUsername(props.username);
    setAvatar(props.avatar);
    setCreatedAt(props.createdAt);
  }, [props]);

  return (
    <div className="p-2">
      <Card fluid hoverable="true">
        <Card.Body className="poster">
          <Container>
            <Row>
              <Col xs={2} className="post">
                <Avatar src={avatar} width={60} height={60} />
                <p className="submitter">{username}</p>
                <p>Gamers rise up</p>
              </Col>
              <Col>
                <Card.Text className="post text-left">
                  <p className="small">{timeToDate(createdAt)}</p>
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
};

export default Post;
