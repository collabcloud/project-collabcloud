import React, { useState, useEffect } from "react";

const default_avatar =
  "https://avatars2.githubusercontent.com/u/45340119?s=400&v=4";

const Avatar = props => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(props.width);
    setHeight(props.height);
  }, [props]);

  function onClick() {
    if (typeof props.onClick !== "undefined") {
      props.onClick();
    }
  }

  return (
    <img
      alt=""
      src={
        props.src !== undefined && props.src.length !== 0
          ? props.src
          : default_avatar
      }
      width={width}
      height={height}
      style={{ marginTop: 10 }}
      className="d-inline-block align-top"
      onClick={onClick}
    />
  );
};

export default Avatar;
