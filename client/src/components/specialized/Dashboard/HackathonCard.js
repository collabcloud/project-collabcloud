import React from "react";
import { Button, Card } from "react-bootstrap";

export const HackathonCard = props => {
  if (props.hackathons.length > 0) {
    let hackathon = props.hackathons.map((hackathon, index) => {
      return (
        <Card.Body key={index}>
          <Card.Title>
            {" "}
            <a href={hackathon.link}>{hackathon.name}</a>
          </Card.Title>
          <Card.Text>
            <b>
              {hackathon.date}
              <br></br>
              {hackathon.location}
            </b>
          </Card.Text>
          <Button href={hackathon.link} variant="info">
            Check out Hackathon
          </Button>
        </Card.Body>
      );
    });
    return <Card>{hackathon}</Card>;
  } else {
    return (
      <Card>
        <Card.Body></Card.Body>
      </Card>
    );
  }
};
