import React from 'react';
import {ListGroup, Badge} from 'react-bootstrap';


export const Recommendations = ({projects}) => {




    return (
        <ListGroup>
            {projects.map((object, index) => <ListGroup.Item variant="secondary" key={index} action href={'/project/'+object.pid} >{object.projectName} {object.relation.map((value, index) => <Badge key={index} variant="primary">{value}</Badge>)}</ListGroup.Item>)}
        </ListGroup>
    );
};
