import React from "react";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import {
  GoProject,
  GoStar,
  GoGitCommit,
  GoNote,
  GoPerson,
} from "react-icons/go";
import { useHistory } from "react-router-dom";

const URL = "localhost:3000/project/";

export const ProjectsList = (props) => {
  const history = useHistory();

  let hardcode = [
    {
      star: 400,
      commit: 142,
      owner: "lancebongo",
    },
    {
      star: 3,
      commit: 357,
      owner: "jarrodservilla",
    },
    {
      star: 0,
      commit: 13,
      owner: "skelzore",
    },

    {
      star: 0,
      commit: 22,
      owner: "jcserv",
    },
    {
      star: 0,
      commit: 0,
      owner: "jcserv",
    },
  ];

  let options = {
    defaultSortName: "star", // default sort column name
    defaultSortOrder: "desc", // default sort order
    onRowClick: (row) => {
      history.push("/project/" + row.pid);
    },
  };

  let projects = [];

  for (let i = 0; i < props.projects.length; i++) {
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
        <TableHeaderColumn width="125px" dataSort dataField="commit">
          <GoGitCommit /> Commits
        </TableHeaderColumn>
        <TableHeaderColumn width="150px" dataSort dataField="owner">
          <GoPerson /> Owner
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};
