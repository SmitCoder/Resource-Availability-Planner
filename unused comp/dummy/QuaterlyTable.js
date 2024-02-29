import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Quaterly.css"; // Import CSS file for styling

const QuaterlyTable = () => {
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetchEmployees();
    // setDaysInMonth(moment(selectedMonth).daysInMonth());
  }, []);
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/employees/names"); // Replace with your backend URL
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employee names:", error);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleQuarterChange = (event) => {
    setSelectedQuarter(parseInt(event.target.value));
  };

  const startDate = moment(
    `${selectedYear}-${(selectedQuarter - 1) * 3 + 1}-01`
  );
  const endDate = moment(startDate).endOf("quarter");

  const dates = [];
  let currentDate = startDate;
  while (currentDate.isSameOrBefore(endDate)) {
    dates.push({
      date: currentDate.format("ddd-DD"),
      isWeekend: [0, 6].includes(currentDate.day()),
    });
    currentDate.add(1, "days");
  }

  const createTableRows = () => {
    const headerRow = (
      <tr>
        <th>Employee Name</th>
        {dates.map((date, key) => {
          return <th>{date.date}</th>;
        })}
      </tr>
    );

    const dataRows = employees.map((employee, index) => (
      <tr key={index}>
        <td>{employee.name}</td>
        {dates.map((date, index) => {
          const leave = employees.find(
            (l) =>
              l.name === employee.name &&
              moment(l.leaveFrom).format("DD-dd") <= date &&
              moment(l.leaveTo).format("DD-dd") >= date
          );
          console.log(leave);

          const cellStyle = leave
            ? {
                backgroundColor: "lightcyan",
                padding: "7px",
              }
            : {};
          <td
            key={index}
            // className={`cell ${date.isWeekend ? "weekend" : ""}`}
            style={cellStyle}
          ></td>;
        })}
      </tr>
    ));

    return [headerRow, ...dataRows];
  };

  return (
    <div className="quarterly-table-container">
      <label>Select Year: </label>
      <select value={selectedYear} onChange={handleYearChange}>
        {Array.from({ length: 10 }, (_, i) => moment().year() + i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>

      <label>Select Quarter: </label>
      <select value={selectedQuarter} onChange={handleQuarterChange}>
        {[1, 2, 3, 4].map((quarter) => (
          <option key={quarter} value={quarter}>{`Q${quarter}`}</option>
        ))}
      </select>

      <div className="table-wrapper">
        <table className="table">
          <tbody>{createTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default QuaterlyTable;
