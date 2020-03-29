import React from "react";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { /*GoProject, GoStar, GoEye, GoNote,*/ GoPerson } from "react-icons/go";

export const UserResultList = props => {
  var options = {
    defaultSortName: "username", // default sort column name
    defaultSortOrder: "desc" // default sort order
  };

  return (
    <div>
      <BootstrapTable data={props.users} striped hover options={options}>
        <TableHeaderColumn width="160px" isKey dataSort dataField="username">
          <GoPerson /> Username
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};
