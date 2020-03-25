import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { Card, CardHeader, ListGroup, ListGroupItem } from "shards-react";
import { postAvatar } from "../../actions/imgActions";
import { connect } from "react-redux";

//this should be the state passed into it

const UserDetails = ({
  uid,
  userDetails,
  username,
  firstname,
  lastname,
  city,
  province,
  description,
  avatar,
  link,
  postAvatar
}) => {
  const [avatarLink, setAvatarLink] = useState("");
  const fileUpload = useRef(null);

  useEffect(() => {
    setAvatarLink(avatar);
  }, [uid, avatar]);

  useEffect(() => {
    setAvatarLink(link);
    props.avImg(link);
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

  // const [name, setName] = useState(firstname);
  // const [last_name, setlastName] = useState(lastname);
  // const [email, setEmail] = useState("w/e@gmail.com");
  // const [cityfield, setCity] = useState(city);
  function renderName() {
    if (firstname == null || lastname == null) {
      return username;
    } else {
      return firstname + " " + lastname;
    }
  }

  function renderLocation() {
    if (province == null && city == null) {
      return "Not stated";
    } else if (province == null) {
      return city;
    } else if (city == null) {
      return province;
    }
    return city + ", " + province;
  }

  function renderDescription() {
    if (description == null) {
      return "No Bio added";
    } else {
      return description;
    }
  }

  return (
    <Card small className="mb-4 pt-3">
      <CardHeader className="border-bottom text-center">
        <div className="mb-3 mx-auto">
          <input
            id="file"
            type="file"
            style={{ display: "none" }}
            ref={fileUpload}
            onChange={fileSelectedHandler}
          />
          <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
            <a href="#">
              <img
                className="rounded-circle"
                src={avatarLink}
                alt="hello"
                width="110"
                onClick={onAvatarClick}
              />
            </a>
          </OverlayTrigger>
        </div>
        <h4 className="mb-0">{renderName()}</h4>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-4">
          <strong className="text-muted d-block mb-2">Location</strong>
          <span>{renderLocation()}</span>
        </ListGroupItem>
        <ListGroupItem className="p-4">
          <strong className="text-muted d-block mb-2">
            {userDetails.metaTitle}
          </strong>
          <span>{renderDescription()}</span>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Jarrod Servilla",
    avatar: "https://avatars2.githubusercontent.com/u/45340119?s=400&v=4",
    jobTitle: "Project Manager",
    metaTitle: "Description",
    metaValue: "gamers rise up",
    metalinkTitle: "Links",
    metalinkValue: "github links here"
  }
};

const mapStateToProps = state => {
  return {
    uid: state.userinfo.profile.uid,
    avatar: state.userinfo.profile.avatar,
    username: state.userinfo.profile.username,
    firstname: state.userinfo.profile.firstname,
    lastname: state.userinfo.profile.lastname,
    city: state.userinfo.profile.city,
    province: state.userinfo.profile.province,
    description: state.userinfo.profile.description,
    link: state.img.link
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postAvatar: (uid, file) => {
      dispatch(postAvatar(uid, file));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
