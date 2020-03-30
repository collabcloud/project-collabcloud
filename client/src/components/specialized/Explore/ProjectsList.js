import React from "react";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { GoProject, GoStar, GoEye, GoNote, GoPerson } from "react-icons/go";
import { useHistory } from "react-router-dom";

const URL = "localhost:3000/project/";

export const ProjectsList = props => {
  const history = useHistory();

  var hardcode = [
    {
      star: 620,
      eye: 1900,
      owner: "Jarrod Servilla"
    },
    {
      star: 145,
      eye: 955,
      owner: "Jarrod Servilla"
    },
    {
      star: 999,
      eye: 9999,
      owner: "Jarrod Servilla"
    },
    {
      star: 421,
      eye: 1778,
      owner: "Jarrod Servilla"
    },
    {
      star: 842,
      eye: 400,
      owner: "Jarrod Servilla"
    }
  ];

  var options = {
    defaultSortName: "star", // default sort column name
    defaultSortOrder: "desc", // default sort order
    onRowClick: row => {
      history.push("/project/" + row.pid);
    }
  };

  var projects = [];

  for (var i = 0; i < props.projects.length; i++) {
    projects.push({ ...props.projects[i], ...hardcode[i] });
  }

  const CellFormatter = (cell, row) => {
    return (
      <div>
        <a href={URL + row.pid}>{cell}</a>
      </div>
    );
  };

  // TODO: Add a button that the user can click
  // https://stackoverflow.com/questions/48617094/create-clickable-buttons-on-react-bootstrap-table-on-cell
  // https://stackoverflow.com/questions/37657482/add-button-in-a-react-bootstrap-table

  return (
    <div>
      <BootstrapTable data={projects} striped hover options={options}>
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
        <TableHeaderColumn width="100px" dataSort dataField="star">
          <GoStar /> Stars
        </TableHeaderColumn>
        <TableHeaderColumn width="100px" dataSort dataField="eye">
          <GoEye /> Views
        </TableHeaderColumn>
        <TableHeaderColumn width="150px" dataSort dataField="owner">
          <GoPerson /> Owner
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};
