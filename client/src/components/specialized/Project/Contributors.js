import React from "react";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { GoPerson, GoCalendar, GoInfo, GoClock } from "react-icons/go";
import { Jumbotron } from "react-bootstrap";
// import styles from "../../css/Contributors.css";
const moment = require("moment");

export function Contributors(props) {
  const collaborators = props.projectInformation.collaborators;

  // Sort options
  let options = {
    defaultSortName: "joinDate", // default sort column name
    defaultSortOrder: "desc" // default sort order
  };

  // Clean the collaborator data, making it more presentable
  let cleanedCollaborators = [];
  collaborators.forEach(collaborator => {
    let cleanedCollaborator = {};
    cleanedCollaborator.role = collaborator.isOwner ? "Owner" : "Collaborator";
    // cleanedCollaborator.uid = collaborator.userUid;
    cleanedCollaborator.username = collaborator.username;
    cleanedCollaborator.joinDate = moment(collaborator.createdAt).format(
      "MMMM Do YYYY, h:mm:ss a"
    );
    let currentDate = moment().startOf("day");
    let createdDate = moment(collaborator.createdAt).format("YYYY-MM-DD");
    cleanedCollaborator.daysOnProject =
      moment.duration(currentDate.diff(createdDate)).asDays() + 1;
    cleanedCollaborators.push(cleanedCollaborator);
  });

  return (
    <Jumbotron>
      <h2 style={{ marginTop: "-70px" }}>
        Contributors of{" "}
        <span className="projectName">
          {props.projectInformation.project.projectName}
        </span>
      </h2>
      <BootstrapTable
        data={cleanedCollaborators}
        striped
        hover
        options={options}
        headerStyle={{ background: "#a9a9a9" }}
      >
        <TableHeaderColumn width="15%" dataSort dataField="role">
          <GoInfo /> Role
        </TableHeaderColumn>
        <TableHeaderColumn width="40%" isKey dataSort dataField="username">
          <GoPerson /> Username{" "}
        </TableHeaderColumn>
        <TableHeaderColumn width="30%" dataSort dataField="joinDate">
          <GoCalendar /> Joined
        </TableHeaderColumn>
        <TableHeaderColumn width="15%" dataSort dataField="daysOnProject">
          <GoClock /> Days on Project
        </TableHeaderColumn>
      </BootstrapTable>
    </Jumbotron>
  );
}
