import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Scrollbar } from "react-scrollbars-custom"; 
import { Card, Form, Button, Container, Row } from "react-bootstrap";

import "../../css/Chat.css";


export const MessageList = (props) => {
    var scrollbar = React.createRef();
    const [message, setMessage] = useState("");
    
    useEffect(()=>{
        scrollbar.current.scrollToBottom();
    },[]);
    useEffect(() => {
        setMessage("");
        scrollbar.current.scrollToBottom();
    }, [props.messages])
    function onSubmit(event){
        event.preventDefault();
        var message = event.target[0].value;
        console.log(event.target[0].value);
        message = {
            type: "user",
            name: props.user,
            msg: message
        }
        props.sendMessage(message);

    }
    function onChange(event){
        event.preventDefault();
        setMessage(event.target.value);
    }

    function createMessage(msg, index){
        return (
            <div key={index} className={msg.type}>
            <Card >
                <Card.Body className="title"> {msg.name}</Card.Body>
                <Card.Body className>
                    {msg.msg}
                </Card.Body>
            </Card>
            </div>
        );

    }
    var page = (
    
    <Scrollbar 
        ref = {scrollbar}
        contentProps={{
            renderer: props => {
              const { elementRef,style, ...restProps } = props;
              return <div {...restProps} style={{}} ref={elementRef} className="Content" id="msgContent" />;
            }
        }}
    >
    {props.messages.map((value, index)=>{
        return createMessage(value,index);
    })}
    
    
    </Scrollbar>
    );
    return (
        <Container className="h-100" fluid style={{ paddingLeft: 0, paddingRight: 0}}>
            <Row className ="h-75 w-100 ml-0 mr-0" style={{ paddingTop: 0}} >
                {page}
            </Row>
            <Row className ="w-100 ml-0 mr-0" style={{ height: 100, paddingTop: 0, position: "relative", "borderTop": "solid 1px black"}}>
                <Form className= "w-100" onSubmit={onSubmit}>
                <div className= "w-100 h-100"style={{ paddingTop: 0, top: 30, bottom: 30, position: "absolute"}}>
                    <Form.Group className = "h-40">
                    <Form.Control  
                        name="message"
                        type="text" 
                        placeholder="Send message here"
                        value={message} 
                        onChange = {onChange}
                        className = "h-100"
                        />
                    </Form.Group>
                    <div className = "text-danger"> {props.errMsg}</div>
                    <Button className = "h-50" style = {{paddingTop: 0, paddingBottom: 0}}variant="primary" type="submit" block>
                        Send
                    </Button>
                </div>
                </Form>
            </Row>
        </Container>
        
    );


}