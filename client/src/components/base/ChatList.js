import React, { useState, useEffect } from "react";
import { Image, Button, ButtonGroup, Form} from "react-bootstrap";
import { connect } from "react-redux";
import { search } from "../../actions/searchActions";
import PropTypes from "prop-types";
import { Scrollbar } from "react-scrollbars-custom"; 

import "../../css/Chat.css";


export const ChatList = (props) => {

    const [username, setFormData] = useState("");
    useEffect(()=>{
        setFormData("");
    },[props.chatList]);

    const onChange = (e) =>{
        setFormData(e.target.value);
    }
    function onClick(event){
        event.preventDefault();
        props.changeWindow(event.target.id.slice(1));
    }
    function onSubmit(event){
        event.preventDefault();
        props.addUser(username);
    }
    function onCancel(event){
        event.preventDefault();
        setFormData("");
        props.resetAddUserState();
    }
    var chatList = props.chatList;
    if (!chatList){
        chatList = [];
    }
    var renderType = <ButtonGroup className = "msggroup d-flex" justified="true" name="chat" vertical>
    {
        chatList.map((value, index)=>{
            var val = ""
            if(!value.seen){
                val = "1";
            }
            return (
            <Button key = {index} className = "msgs" size = "lg" variant = "light" type="button" id={"b" + index} onClick={onClick}>                    
                <div className="msgImage">
                    <Image className = "msgImage float-left img-responsive" src={require("../../avatar.png")} fluid roundedCircle />
            <div className="msgImage label label-default">
                {
                    value.name
                }
                <span className="badge">
                    {val}
                </span>
            </div>
                </div>
            </Button>
            );
        })
    }
    </ButtonGroup>;
    if(props.addUserState){
        renderType = <Form className="login-form" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicUsername">
            <Form.Label 
                className="float-left">Who do you want to message?</Form.Label>
            <Form.Control  
                required
                name="username"
                type="text" 
                placeholder="Enter username"
                value={username} 
                onChange = {onChange}/>
            <Form.Control.Feedback type="invalid">Please enter your username</Form.Control.Feedback>
        </Form.Group>
            <div className = "text-danger"> {props.errMsg}</div>
            <Button variant="outline-primary" type="submit" block>
                Submit
            </Button>
            <Button variant="outline-primary" onClick={onCancel}type="button" block>
                Cancel
            </Button>
            </Form>

    }
    return (
    
    <Scrollbar 
        className = "scroller"
        permanentTrackY = {true}
        renderer={props => {
            const { elementRef, ...restProps } = props;
            return <div {...restProps}  ref={elementRef} className="Scrollbar" />;
        }}
        wrapperProps={{
            renderer: props => {
              const { elementRef, style,...restProps } = props;
              style.marginRight=10;
              return <div {...restProps} style={style} ref={elementRef} className="ScrollbarWrapper" />;
            }
          }}
        trackYProps={{
            renderer: props => {
            const { elementRef, style, ...restProps } = props;
              return <div {...restProps}  ref={elementRef} className="Scrollbar trackY" />;
            }
        }}
        thumbYProps={{
            renderer: props => {
              const { elementRef, style, ...restProps } = props;
              return <div {...restProps} ref={elementRef} className="Scrollbar thumbY" />;
            }
          }}    
    >
        {renderType}
    </Scrollbar>
    );


}