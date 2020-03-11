import React, { useState } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";



const Thread = () => {
  return (
    <div>
    <NavigationBar />
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Subforum</Breadcrumb.Item>
      <Breadcrumb.Item active>Thread</Breadcrumb.Item>
    </Breadcrumb>
    </div>
  );
};

export default Thread;
