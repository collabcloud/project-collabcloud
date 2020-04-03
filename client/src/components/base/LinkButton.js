import React from "react";
import "../../css/LinkButton.css";

const LinkButton = props => {
  function onClick() {
    if (props.onClick === undefined) {
      return;
    }
    props.onClick();
  }

  return (
    <button type="button" className="link-button" onClick={onClick}>
      {props.text}
    </button>
  );
};

export default LinkButton;
