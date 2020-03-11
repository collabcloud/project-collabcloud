import React, { useState } from "react";
import { Container, Col, Breadcrumb } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";

import SubforumOverview from '../../components/specialized/Forum/SubforumOverview';

import { IoIosChatboxes, IoMdPersonAdd } from 'react-icons/io';
import { FaRegNewspaper, FaBug } from 'react-icons/fa';


const subforums = [
  {id: 1, title: "General", path:"/forum/general", description: "Chat about anything from the daily news to the latest fashion", icon: IoIosChatboxes },
  {id: 2, title: "Hacker News", path:"/forum/hacker-news", description: "The latest tech industry news stories", icon: FaRegNewspaper},
  {id: 3, title: "Bug Bounties", path:"/forum/bug-bounties", description: "Help fellow CollabClouders with syntax, runtime, logic errors and more", icon: FaBug},
  {id: 4, title: "LF Collaborators", path:"/forum/collabs", description: "View projects seeking collaborators", icon: IoMdPersonAdd}
];

const Root = () => {
  return (
    <div>
    <NavigationBar />
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex flex-column">
        {subforums.map((subforum) => 
        <SubforumOverview key={subforum.id} path={subforum.path} title={subforum.title} description={subforum.description} icon={subforum.icon}/>)}
      </div>
      </Container>    
    </div>
  );
};

export default Root;
