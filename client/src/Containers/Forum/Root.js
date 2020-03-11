import React, { useState } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";

import { SubforumOverview } from '../../components/specialized/Forum/SubforumOverview';

const subforums = [
  {id: 1, title: "General", description: "Yeet"},
  {id: 2, title: "Hacker News", description: "Yeet"},
  {id: 3, title: "Bug Bounties", description: "Yeet"},
  {id: 4, title: "LF Collaborators", description: "Yeet"}
];

const Root = () => {
  return (
    <div>
    <NavigationBar />
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
      </Breadcrumb>
    </Container>
    {subforums.map((index, subforum) => 
    <SubforumOverview key={index} title={subforum.title} description={subforum.description}/>)}
    </div>
  );
};

export default Root;
