import React from 'react';
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";

export const ProjectsList = () => {

  let order = 'desc';

  
  var products = [{
    id: 1,
    name: "Product1",
    price: 120
  }, {
    id: 2,
    name: "Product2",
    price: 80
  }];

  function handleBtnClick() {
    if (order === 'desc') {
      this.refs.table.handleSort('asc', 'name');
      order = 'asc';
    } else {
      this.refs.table.handleSort('desc', 'name');
      order = 'desc';
    }
  }

  return (
    <div>
      <p style={ { color: 'red' } }>You cam click header to sort or click following button to perform a sorting by expose API</p>
      <button onClick={ handleBtnClick }>Sort Product Name</button>
      <BootstrapTable ref='table' data={ products }>
          <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true }>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' dataSort={ true }>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );


}
