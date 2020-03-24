import React from 'react';
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { GoProject, GoStar, GoEye, GoNote, GoPerson} from 'react-icons/go';


export const TrendingProjectsList = (props) => {

 
  var options = {
    defaultSortName: 'githubStars',  // default sort column name
    defaultSortOrder: 'desc'  // default sort order
  }

  var projects = [];

  for (var i = 0; i < props.projects.length; i++) {
    projects.push({...props.projects[i]});
  }

  return (
    <div>
       <BootstrapTable data={projects} striped hover options={options} >
        <TableHeaderColumn width="160px" isKey dataSort dataField="projectName"><GoProject/> Project Name</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="projectDescription"><GoNote/> Description</TableHeaderColumn>
        <TableHeaderColumn width="100px" dataSort dataField="githubStars"><GoStar/> Stars</TableHeaderColumn>
        <TableHeaderColumn width="150px" dataSort dataField="owner"><GoPerson/> Owner</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );


}