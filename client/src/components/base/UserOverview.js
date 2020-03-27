import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Popover,
  OverlayTrigger
} from "react-bootstrap";
import { GoOrganization } from "react-icons/go";
import { MdLocationOn, MdChatBubble } from "react-icons/md";
import { postAvatar } from "../../actions/imgActions";
import { connect } from "react-redux";

import { Item } from "./Item";
import Avatar from "./Avatar";

const tags = [
  { id: 1, name: "MongoDB" },
  { id: 2, name: "Express" },
  { id: 3, name: "React" },
  { id: 4, name: "Node.js" }
];

const UserDetails = ({ uid, avatar, postAvatar, link, ...props }) => {
  const [avatarLink, setAvatarLink] = useState("");
  const fileUpload = useRef(null);

  useEffect(() => {
    setAvatarLink(avatar);
  }, [uid, avatar]);

  useEffect(() => {
    setAvatarLink(link);
  }, [link]);

  const onAvatarClick = () => {
    fileUpload.current.click();
  };

  const popover = (
    <Popover id="popover-basic" style={{ marginTop: "50px" }}>
      <Popover.Content>Change your avatar</Popover.Content>
    </Popover>
  );

  async function fileSelectedHandler(e) {
    const file = e.target.files[0];
    await postAvatar(uid, file);
  }

  function renderName() {
    if (props.firstname == null || props.lastname == null) {
      return "";
    } else {
      return props.firstname + " " + props.lastname;
    }
  }

  function renderLocation() {
    if (props.province == null || props.city == null) {
      return "Not stated";
    }
    return props.city + ", " + props.province;
  }

  function renderDescription() {
    if (props.description == null || props.description == "") {
      return "No Bio added";
    } else {
      return props.description;
    }
  }

  return (
    <Card style={{ height: "30rem" }} hoverable="true" bg="dark" text="white">
      <Card.Body>
        <Container>
          <Row>
            <Col xs={"auto"}>
              <input
                id="file"
                type="file"
                style={{ display: "none" }}
                ref={fileUpload}
                onChange={fileSelectedHandler}
              />
              <OverlayTrigger
                trigger="hover"
                placement="bottom"
                overlay={popover}
              >
                <Avatar
                  src={avatarLink}
                  width={125}
                  height={125}
                  onClick={onAvatarClick}
                />
              </OverlayTrigger>
              <p>
                <MdLocationOn />
                {renderLocation()}
              </p>
            </Col>
            <Col xs={"auto"} className="d-flex align-items-start flex-column">
              <h3>{props.username}</h3>
              <h6>{renderName()}</h6>
              <ListGroup horizontal>
                {tags.map((tag, index) => (
                  <Item value={tag.name} key={tag.index} />
                ))}
              </ListGroup>
            </Col>
            <Col xs={"auto"}>
              <p>
                <GoOrganization /> {props.followers} Followers
              </p>
            </Col>
            <Col xs={"auto"}>
              <Button variant={props.btnColour} onClick={props.onClickprofile}>
                Update Profile
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={"auto"}>
              <Button variant={props.btnColour} onClick={props.onClick}>
                {props.btnText}
              </Button>
            </Col>
            <Col xs={5}>
              <p align="left">
                <MdChatBubble /> {renderDescription()}
              </p>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};
function mapStateToProps(state) {
  return {
    uid: state.user.uid,
    username: state.login.profile.username,
    avatar: state.login.profile.avatar,
    firstname: state.login.profile.firstname,
    lastname: state.login.profile.lastname,
    description: state.login.profile.description,
    city: state.login.profile.city,
    province: state.login.profile.province,
    link: state.img.link
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postAvatar: (uid, file) => {
      dispatch(postAvatar(uid, file));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
