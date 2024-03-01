import React from "react";

function EmployeeTable({ createTableRows, isOpen }) {
  return (
    <div className="table-wrapper">
      <table
        border={1}
        id="myTable"
        className={`#myTable ${isOpen ? "blur" : ""}`}
      >
        <tbody>{createTableRows}</tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
