import React from 'react';
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { GoProject, GoStar, GoEye, GoNote, GoPerson} from 'react-icons/go';


export const ProjectResultList = (props) => {

  const order = 'desc';
  

  var options = {
    defaultSortName: 'star',  // default sort column name
    defaultSortOrder: 'desc'  // default sort order
  }

  var test = [];
  return (
    <div>
       <BootstrapTable data={test} striped hover options={options} >
        <TableHeaderColumn width="160px" isKey dataSort dataField ="name"><GoProject/> Project Name</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField><GoNote/> Description</TableHeaderColumn>
        <TableHeaderColumn width="100px" dataSort><GoStar/> Stars</TableHeaderColumn>
        <TableHeaderColumn width="100px" dataSort><GoEye/> Views</TableHeaderColumn>
        <TableHeaderColumn width="150px" dataSort><GoPerson/> Owner</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );


}
