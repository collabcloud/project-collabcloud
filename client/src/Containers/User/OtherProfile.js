import React from "react";
import { Container } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import UserOverview from "../../components/base/UserOverview";
import ProjectDisplay from "../../components/base/ProjectDisplay";



const OtherProfile = () => (
    <div>
    <NavigationBar />
    <Container
				fluid
				className="col-md-8 align-items-start"
				style={{ paddingTop: "50px" }}
			>
      <UserOverview />
      <h1>Projects</h1>

      <ProjectDisplay />

    </Container>
    </div>
);

export default OtherProfile;
