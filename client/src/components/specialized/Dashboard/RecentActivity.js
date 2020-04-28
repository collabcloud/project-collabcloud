import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../css/NotificationList.css";

function renderEmoji(notification) {
  switch (notification.notificationType) {
    case "chat_receive":
      return (
        <span role="img" aria-label="wave">
          &#128075;
        </span>
      );
    case "chat_response":
      return (
        <span role="img" aria-label="ok">
          &#128076;
        </span>
      );
    case "thread_comment":
      return (
        <span role="img" aria-label="mail">
          &#9993;
        </span>
      );
    case "collaboration_request":
      return (
        <span role="img" aria-label="question_mark">
          &#10067;
        </span>
      );
    default:
      break;
  }
}

function renderSubmessage(notification) {
  if (notification.submessage) {
    return (
      <Card.Text>
        <span role="img" aria-label="speech">
          &#128172;
        </span>{" "}
        {notification.submessage}
      </Card.Text>
    );
  }
}

function renderMessage(notification, index) {
  const msgs = notification.notificationMessage.split(" ");
  const user = msgs[0];

  if (
    notification.notificationType === "chat_receive" ||
    notification.notificationType === "chat_response"
  ) {
    return (
      <div>
        {renderEmoji(notification)}{" "}
        <Link to={"/user/" + notification.notificationCreator}>{user}</Link>
        {" " + msgs.splice(1).join(" ")}
      </div>
    );
  } else if (notification.notificationType === "thread_comment") {
    return (
      <div>
        {renderEmoji(notification)}{" "}
        <Link to={"/user/" + notification.notificationCreator}>{user}</Link>
        {` ${msgs[1]} ${msgs[2]} `}
        <Link to={notification.url}>
          {msgs.splice(3, msgs.length - 9).join(" ")}
        </Link>
        {" " + msgs.splice(msgs.length - 6).join(" ")}
      </div>
    );
  } else if (notification.notificationType === "collaboration_request") {
    return (
      <div>
        {renderEmoji(notification)}{" "}
        <Link to={"/user/" + notification.notificationCreator}>{user}</Link>
        {" " + msgs.splice(1).join(" ")}
      </div>
    );
  }
}

function renderButton(notification) {
  if (notification.notificationType === "thread_comment") {
    return (
      <Link to={notification.url}>
        <Button variant="success">View Thread</Button>
      </Link>
    );
  } else if (notification.notificationType === "collaboration_request") {
    return (
      <Link to={"/project/" + notification.rid}>
        <Button variant="success">View Project</Button>
      </Link>
    );
  }
}

export function RecentActivity(props) {
  // User has notifications
  if (props.notifications && props.notifications.length > 0) {
    return (
      <div>
        {props.notifications.map((notification, index) => (
          <Card.Body key={index}>
            <Card.Title>{renderMessage(notification)}</Card.Title>
            {renderSubmessage(notification)}
            {renderButton(notification)}
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
              You have no notifications!
            </span>
          </Card.Title>
          <Card.Text>
            <span className="notificationText">Do some stuff!</span>
          </Card.Text>
        </Card.Body>
        <hr />
      </div>
    );
  }
}
