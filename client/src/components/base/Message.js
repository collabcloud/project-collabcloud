import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const Message = props => {
  const [show, setShow] = useState(true);

  //setShow(props.show);

  return (
    show && (
      <Alert variant={props.variant} onClose={() => setShow(false)} dismissible>
        {props.message}
      </Alert>
    )
  );
};

export default Message;
