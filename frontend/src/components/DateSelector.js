import React from "react";

function DateSelector({
  startDate,
  endDate,
  handleMonthChangefrom,
  handleMonthChangeto,
}) {
  return (
    <div className="date-container-left">
      <div className="start_date">
        <label htmlFor="From" className="from"></label>
        <input
          className="Handlebar"
          type="month"
          min={"2023-01"}
          max={"2025-12"}
          id="start_date"
          value={startDate.format("YYYY-MM")}
          onChange={(e) => handleMonthChangefrom(e.target.value)}
        />
      </div>
      <div className="end_date">
        <label htmlFor="to" className="to"></label>
        <input
          className="Handlebar"
          type="month"
          min={"2024-01"}
          max={"2024-12"}
          id="end_date"
          value={endDate.format("YYYY-MM")}
          onChange={(e) => handleMonthChangeto(e.target.value)}
        />
      </div>
    </div>
  );
}

export default DateSelector;
