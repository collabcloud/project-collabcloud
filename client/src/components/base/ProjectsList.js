import React from 'react';
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { GoProject, GoStar, GoEye, GoNote, GoPerson} from 'react-icons/go';


export const ProjectsList = (props) => {

  /*
  var projects = [{
    name: "Harmoney",
    desc: "Streamlined group payments solution",
    star: 620,
    eye: 1900,
    owner: "Matt Huynh"
  }, {
    name: "Optimize.me",
    desc: "UofT Timetable Optimizer",
    star: 145,
    eye: 955,
    owner: "Jarrod Servilla"
  }, {
    name: "CollabCloud",
    desc: "Social network to find student collaborators",
    star: 999,
    eye: 9999,
    owner: "Furqan Qureshi"
  }];
  */

  var hardcode = [{
    star: 620,
    eye: 1900,
    owner: "Jarrod Servilla"
  }, {
    star: 145,
    eye: 955,
    owner: "Jarrod Servilla"
  }, {
    star: 999,
    eye: 9999,
    owner: "Jarrod Servilla"
  }, {
    star: 421,
    eye: 1778,
    owner: "Jarrod Servilla"
  },
  {
    star: 842,
    eye: 400,
    owner: "Jarrod Servilla"
  }];

  var options = {
    defaultSortName: 'star',  // default sort column name
    defaultSortOrder: 'desc'  // default sort order
  }

  var projects = [];

  for (var i = 0; i < props.projects.length; i++) {
    projects.push({...props.projects[i], ...hardcode[i]});
  }

  return (
    <div>
       <BootstrapTable data={projects} striped hover options={options} >
        <TableHeaderColumn width="160px" isKey dataSort dataField="projectName"><GoProject/> Project Name</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="projectDescription"><GoNote/> Description</TableHeaderColumn>
        <TableHeaderColumn width="100px" dataSort dataField="star"><GoStar/> Stars</TableHeaderColumn>
        <TableHeaderColumn width="100px" dataSort dataField="eye"><GoEye/> Views</TableHeaderColumn>
        <TableHeaderColumn width="150px" dataSort dataField="owner"><GoPerson/> Owner</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );


}
