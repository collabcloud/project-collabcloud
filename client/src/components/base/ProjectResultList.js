import React from 'react';
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { GoProject, GoStar, GoEye, GoNote, GoPerson} from 'react-icons/go';


export const ProjectResultList = (props) => {

  const order = 'desc';
  

  var options = {
    defaultSortName: 'projectName',  // default sort column name
    defaultSortOrder: 'desc'  // default sort order
  }
  var test = [];
  return (
    <div>
       <BootstrapTable data={props.projects} striped hover options={options} >
        <TableHeaderColumn width="160px" isKey dataSort dataField ="projectName"><GoProject/> Project Name</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField = "projectDescription"><GoNote/> Description</TableHeaderColumn>
        <TableHeaderColumn width="150px" dataSort dataField = "owner"><GoPerson/> Owner</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );


}
