import React from 'react';
import { Carousel } from 'react-bootstrap';

export function Slideshow(props) {

  return (
    <Carousel>
        <Carousel.Item className="slidebox">
          <img
            className="d-block w-100"
            src={props.pic1}
            alt="First slide"
          />
          <Carousel.Caption>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="slidebox">
          <img
            className="d-block w-100"
            src={props.pic2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="slidebox"> 
          <img
            className="d-block w-100"
            src={props.pic3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
);
}