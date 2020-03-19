import React from 'react';
import { Button } from "react-bootstrap";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { GoPerson } from 'react-icons/go';

import "../../css/Users.css";

export const UsersList = (props) => {

    var users = [];
    var btnColor = "primary";

    for (var i = 0; i < props.users.length; i++) {
        users.push({ ...props.users[i] });
    }
    console.log(users);

    function buttonFormat(cell, row) {
        return `<Button variant=${btnColor}>Request</Button>`;
    }



    return (
        <div>
            <BootstrapTable data={users} striped bordered={false} hover>
                <TableHeaderColumn width="160px" isKey dataField='username'><GoPerson /> User</TableHeaderColumn>
                <TableHeaderColumn width="100px" dataField='request' dataFormat={buttonFormat}></TableHeaderColumn>
            </BootstrapTable>
        </div>
    );
}