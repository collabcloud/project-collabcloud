import React from 'react';
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { GoProject, GoStar, GoEye, GoNote, GoPerson} from 'react-icons/go';


export const UserResultList = (props) => {

  const order = 'desc';
  

  var options = {
    defaultSortName: 'star',  // default sort column name
    defaultSortOrder: 'desc'  // default sort order
  }

  var test = [];
  return (
    <div>
       <BootstrapTable data={test} striped hover options={options} >
        <TableHeaderColumn width="160px" isKey dataSort dataField ="name"><GoPerson/> Username</TableHeaderColumn>
        
      </BootstrapTable>
    </div>
  );


}
