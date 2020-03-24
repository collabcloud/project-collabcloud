import React from 'react';
import { Card, Button } from 'react-bootstrap';
import "../../css/NotificationList.css";

export function NotificationList(props) {
  // User has notifications
  if (props.projectNotifications && props.projectNotifications.length > 0) {
    return (
      <div>
        {props.projectNotifications.map( (projectNotification, index) =>
          <Card.Body
            key={index+projectNotification}
          >
              <Card.Text>
                <span className="notificationText">{ projectNotification }</span>
              </Card.Text>
  
              <Button variant="success">
                  View Project
              </Button>
          </Card.Body>
        )}
      </div>
    );
  }
  // User has no notifications
  else {
    return (
      <div>
        <Card.Body>
            <Card.Title>
                <span className="notificationTitle">You have no project notifications!</span>
            </Card.Title>
            <Card.Text>
              <span className="notificationText">Join any project to start receiving notifications for that project.</span>
            </Card.Text>
        </Card.Body>
        <hr />
    </div>
    );
  }
}