import React, { useState } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";



const Subforum = () => {
  return (
    <div>
    <NavigationBar />
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Subforum</Breadcrumb.Item>

    </Breadcrumb>
    </div>
  );
};

export default Subforum;
