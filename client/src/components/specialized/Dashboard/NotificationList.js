import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../css/NotificationList.css";

function add_emoji(notification) {
  if (notification.includes("created")) {
    return (
      <span role="img" aria-label="tada">
        &#127881;
      </span>
    );
  } else if (notification.includes("joined")) {
    return (
      <span role="img" aria-label="checkmark">
        &#9989;
      </span>
    );
  } else if (notification.includes("left")) {
    return (
      <span role="img" aria-label="peace">
        &#9996;
      </span>
    );
  }
}

function renderMessage(projectNotification) {
  const msgs = projectNotification.notificationMessage.split(" ");
  return (
    <p>
      {add_emoji(projectNotification.notificationMessage)}{" "}
      <Link to={"/user/" + projectNotification.notificationCreator}>
        {msgs[0]}
      </Link>
      {" " + msgs[1] + " "}
      <Link to={"/project/" + projectNotification.rid}>{msgs[2]}</Link>
      {" " + msgs.splice(3).join(" ")}
    </p>
  );
}

export function NotificationList(props) {
  // User has notifications
  if (props.projectNotifications && props.projectNotifications.length > 0) {
    return (
      <div>
        {props.projectNotifications.map((projectNotification, index) => (
          <ListGroup.Item
            key={index}
            style={{ width: "100%", height: "100px" }}
          >
            <span className="notificationText">
              {renderMessage(projectNotification)}
            </span>
          </ListGroup.Item>
        ))}
      </div>
    );
  }
  // User has no notifications
  else {
    return (
      <div>
        <Card.Body>
          <Card.Title>
            <span className="notificationTitle">
              You have no project notifications!
            </span>
          </Card.Title>
          <Card.Text>
            <span className="notificationText">
              Join any project to start receiving notifications for that
              project.
            </span>
          </Card.Text>
        </Card.Body>
        <hr />
      </div>
    );
  }
}
