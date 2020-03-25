import React, { useState, useRef, useEffect } from "react";
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
import { Item } from "../base/Item";
import { connect } from "react-redux";
import { postAvatar } from "../../actions/imgActions";

const tags = [
  { id: 1, name: "MongoDB" },
  { id: 2, name: "Express" },
  { id: 3, name: "React" },
  { id: 4, name: "Node.js" }
];

const UserDetails = ({ postAvatar, uid, link, ...props }) => {
  const [avatarLink, setAvatarLink] = useState("");
  const fileUpload = useRef(null);

  useEffect(() => {
    setAvatarLink(props.avatar);
  }, [props]);

  useEffect(() => {
    setAvatarLink(link);
    props.avImg(link);
  }, [link]);

  const onAvatarClick = () => {
    fileUpload.current.click();
  };

  async function fileSelectedHandler(e) {
    const file = e.target.files[0];
    console.log("posting");
    await postAvatar(uid, file);
  }

  const popover = (
    <Popover id="popover-basic" style={{ marginTop: "75px" }}>
      <Popover.Content>Change your avatar</Popover.Content>
    </Popover>
  );

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
                <a href="#">
                  <Image
                    src={avatarLink}
                    onClick={onAvatarClick}
                    style={{ height: "150px", width: "150px" }}
                  ></Image>
                </a>
              </OverlayTrigger>
              <p>
                <MdLocationOn />
                {props.city + ", " + props.province}
              </p>
            </Col>
            <Col xs={"auto"} className="d-flex align-items-start flex-column">
              <h3>{props.username}</h3>
              <h6>{props.firstname + " " + props.lastname}</h6>
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
                <MdChatBubble /> {props.description}
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
    uid: state.login.profile.uid,
    username: state.login.profile.username,
    firstname: state.login.profile.firstname,
    lastname: state.login.profile.lastname,
    description: state.login.profile.description,
    city: state.login.profile.city,
    province: state.login.profile.province,
    avatar: state.login.profile.avatar,
    link: state.img.link
  };
}

const mapDispatchToProps = dispatch => {
  return {
    postAvatar: (uid, file) => {
      dispatch(postAvatar(uid, file));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
