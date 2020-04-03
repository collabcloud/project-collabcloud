import React from "react";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { GoProject, GoNote, GoPerson } from "react-icons/go";
import { useHistory } from "react-router-dom";

import LinkButton from "../../base/LinkButton";

export const ProjectResultList = props => {
  const history = useHistory();

  var options = {
    defaultSortName: "projectName", // default sort column name
    defaultSortOrder: "desc", // default sort order
    onRowClick: row => {
      history.push("/project/" + row.pid);
    }
  };

  const CellFormatter = (cell, row) => {
    return (
      <div>
        <LinkButton text={cell} />
      </div>
    );
  };

  return (
    <div>
      <BootstrapTable data={props.projects} striped hover options={options}>
        <TableHeaderColumn
          width="160px"
          isKey
          dataSort
          dataField="projectName"
          dataFormat={CellFormatter}
        >
          <GoProject /> Project Name
        </TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="projectDescription">
          <GoNote /> Description
        </TableHeaderColumn>
        <TableHeaderColumn width="150px" dataSort dataField="owner">
          <GoPerson /> Owner
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};
