import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";

import tech_suggestions_array from "../../../utils/techSuggestions";
import { GoOrganization, GoClock } from "react-icons/go";
import { FaBuffer } from "react-icons/fa";
import { MdLocationOn, MdChatBubble } from "react-icons/md";
import { connect } from "react-redux";
import { Item } from "../../base/Item";

const moment = require("moment");
const technologiesList = tech_suggestions_array;

const popover = (
  <Popover id="popover-basic" style={{ marginTop: "10px" }}>
    <Popover.Content>Change your avatar</Popover.Content>
  </Popover>
);

const UserDetails = ({ uid, link, uploadImage, ...props }) => {
  const [profile, setProfile] = useState({});
  const fileUpload = useRef(null);

  useEffect(() => {
    if (props.profile) {
      setProfile(profile);
      props.setImg(props.profile.avatar);
    }
  }, [profile, props]);

  const onAvatarClick = () => {
    fileUpload.current.click();
  };

  async function fileSelectedHandler(e) {
    const file = e.target.files[0];
    uploadImage(uid, file);
  }

  function renderName() {
    if (props.profile.firstname === null || props.profile.lastname === null) {
      return "";
    } else {
      return props.profile.firstname + " " + props.profile.lastname;
    }
  }

  function renderLocation() {
    if (props.profile.province === null || props.profile.city === null) {
      return "Not stated";
    }
    return props.profile.city + ", " + props.profile.province;
  }

  function renderDescription() {
    if (
      props.profile.description === null ||
      props.profile.description === ""
    ) {
      return "No Bio added";
    } else {
      return props.profile.description;
    }
  }

  function renderAvatar() {
    if (props.profile.uid === uid) {
      return (
        <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
          <img
            alt=""
            src={props.img}
            width="125"
            height="125"
            style={{ marginTop: 10 }}
            className="d-inline-block align-top"
            onClick={onAvatarClick}
          />
        </OverlayTrigger>
      );
    } else {
      return (
        <img
          alt=""
          src={props.img}
          width="125"
          height="125"
          style={{ marginTop: 10 }}
          className="d-inline-block align-top"
        />
      );
    }
  }

  function renderTech() {
    if (
      props.profile !== undefined &&
      props.profile.interestedTech !== undefined
    ) {
      const tech = technologiesList.map(
        (technology, index) =>
          // Only render this technology if it is included in technologiesUsed
          props.profile.interestedTech[technology.id - 1] === "1" && (
            <Item value={technology.name} key={technology.name + index} />
          )
      );
      return tech;
    }
  }

  function renderFollowButton() {
    if (props.profile !== undefined && uid !== props.profile.uid) {
      return (
        <Button variant={props.btnColour} onClick={props.onClick}>
          {props.btnText}
        </Button>
      );
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
              {renderAvatar()}
              <p>
                <MdLocationOn />
                {renderLocation()}
              </p>
            </Col>
            <Col xs={"auto"} className="d-flex align-items-start flex-column">
              <h3>@{props.profile.username}</h3>
              <h6>{renderName()}</h6>
              <h6 style={{ fontSize: "1.3em" }}>
                <FaBuffer /> Interested Tech
              </h6>
              <ListGroup horizontal>{renderTech()}</ListGroup>
            </Col>
            <Col xs={"auto"}>
              <p>
                <GoOrganization /> {props.followers} Followers
              </p>
            </Col>
            <Col xs={"auto"}>
              {uid === props.profile.uid && (
                <Button
                  variant={props.showform ? "danger" : "primary"}
                  onClick={props.onClickprofile}
                >
                  {props.showform ? "Close" : "Update Profile"}
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={"auto"}>{renderFollowButton()}</Col>
            <Col xs={5}>
              <p align="left">
                <MdChatBubble /> {renderDescription()}
              </p>
              <p align="left">
                <GoClock /> CollabClouding since{" "}
                {moment(props.profile.createdAt).format("MMMM Do YYYY")}
              </p>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

UserDetails.defaultProps = {
  profile: {
    avatar: "https://avatars2.githubusercontent.com/u/45340119?s=400&v=4",
    city: "",
    description: "",
    firstname: "",
    lastname: "",
    province: "",
    username: "",
  },
};

function mapStateToProps(state) {
  return {
    uid: state.user.uid,
  };
}

export default connect(mapStateToProps, [])(UserDetails);
