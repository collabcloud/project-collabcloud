import React from "react";
import { Container } from "react-bootstrap";
import { NavigationBar } from "../../components/base/NavigationBar";
import { ProjectOverview } from "../../components/base/ProjectOverview";
import { Contributors } from "../../components/base/Contributors";

import { Slideshow } from "../../components/base/Slideshow";

import Picture1 from "./img/1.jpg";
import Picture2 from "./img/2.jpg";
import Picture3 from "./img/3.jpg";
import "../../css/Project.css";


const Project = () => {

  return (
    <div>
      <NavigationBar />
      <Container fluid className="col-md-8 align-items-start" style={{paddingTop: "50px"}}>
       
        <ProjectOverview/>

        <Slideshow pic1={Picture1} pic2={Picture2} pic3={Picture3} />
        
        <Contributors />

      </Container>
    </div>
  );
}

// Inserting a null value where mapStateToProps() should be
export default Project;