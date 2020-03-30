import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/NotificationList.css";

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
  }
}

export function NotificationList(props) {
  // User has notifications
  if (props.projectNotifications && props.projectNotifications.length > 0) {
    return (
      <div>
        {props.projectNotifications.map((projectNotification, index) => (
          <Card.Body key={index + projectNotification}>
            <Card.Text>
              <img
                alt=""
                src={""}
                width="60"
                height="60"
                style={{ marginTop: 10 }}
                className="d-inline-block align-top"
              />
              <span className="notificationText">
                {add_emoji(projectNotification)}
                {projectNotification}
              </span>
            </Card.Text>
            <Link to={"/project/" + projectNotification.pid}>
              <Button variant="success">View Project</Button>
            </Link>
          </Card.Body>
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
