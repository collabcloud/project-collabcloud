import React from 'react';
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { GoProject, GoStar, GoEye, GoNote, GoPerson} from 'react-icons/go';


export const ProjectsList = () => {

  const order = 'desc';
  
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

  var options = {
    defaultSortName: 'star',  // default sort column name
    defaultSortOrder: 'desc'  // default sort order
  }

  return (
    <div>
       <BootstrapTable data={projects} striped hover options={options} >
        <TableHeaderColumn width="160px" isKey dataSort dataField="name"><GoProject/> Project Name</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="desc"><GoNote/> Description</TableHeaderColumn>
        <TableHeaderColumn width="100px" dataSort dataField="star"><GoStar/> Stars</TableHeaderColumn>
        <TableHeaderColumn width="100px" dataSort dataField="eye"><GoEye/> Views</TableHeaderColumn>
        <TableHeaderColumn width="150px" dataSort dataField="owner"><GoPerson/> Owner</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );


}
