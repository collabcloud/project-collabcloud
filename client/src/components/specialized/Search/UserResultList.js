import React from "react";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { /*GoProject, GoStar, GoEye, GoNote,*/ GoPerson } from "react-icons/go";
import { useHistory } from "react-router-dom";

export const UserResultList = props => {
  const history = useHistory();

  var options = {
    defaultSortName: "username", // default sort column name
    defaultSortOrder: "desc", // default sort order
    onRowClick: row => {
      history.push("/user/" + row.uid);
    }
  };

  const CellFormatter = (cell, row) => {
    return (
      <div>
        <button>{cell}</button>
      </div>
    );
  };

  return (
    <div>
      <BootstrapTable
        data={props.users}
        striped
        hover
        options={options}
        dataFormat={CellFormatter}
      >
        <TableHeaderColumn width="160px" isKey dataSort dataField="username">
          <GoPerson /> Username
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};
