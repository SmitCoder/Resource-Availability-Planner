import React from "react";
import moment from "moment";

class YearTable extends React.Component {
  render() {
    const employees = ["john", "alice", "bob"];
    const year = this.props.year;
    const startDate = moment(`${year}-01-01`);
    const endDate = moment(`${year}-12-31`);

    const dates = [];
    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endDate)) {
      dates.push(currentDate.format("dd-DD"));
      currentDate.add(1, "days");
    }

    const createTableRows = () => {
      const headerRow = (
        <tr>
          <th>Employee Name</th>

          {dates.map((date, index) => (
            <th key={index} className="cell">
              {date}
            </th>
          ))}
        </tr>
      );

      const dataRows = employees.map((employee) => (
        <tr key={employee}>
          <td>{employee}</td>
          {dates.map((date, index) => (
            <td key={index} className="cell"></td>
          ))}
        </tr>
      ));

      return [headerRow, ...dataRows];
    };
    // Assuming you have a CSS stylesheet with 'table' and 'cell' styles defined
    return (
      <table border={1}>
        <tbody>{createTableRows()}</tbody>
      </table>
    );
  }
}

export default YearTable;
