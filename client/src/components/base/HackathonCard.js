import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";

export const HackathonCard = (props) => {

    
    if(props.hackathons.length > 0){

        let hackathon = props.hackathons.map((hackathon) => {
            return (
                <Card.Body>
                    <Card.Title> <a href=" ">{hackathon.name}</a></Card.Title>
                    <Card.Text><b>{hackathon.date}<br></br>{hackathon.location}</b></Card.Text>
                    <Button variant="info">Check out Hackathon</Button>
                </Card.Body> 
            )
        })
        return (
            
            <Card>
                {hackathon}
            </Card>
        )
    }else{
        return (
        
            <Card>
                <Card.Body>
                </Card.Body>
            </Card>
        )
    }

    
};
