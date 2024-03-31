export const DateSelector = ({ startDate, endDate, setStartDate, setEndDate , handleMonthChangefrom , handleMonthChangeto }) => {
    return (
      <>
        <div className="start_date">
          <input
            className="Handlebar"
            type="month"
            min={"2023-01"}
            max={"2025-12"}
            value={startDate.format("YYYY-MM")}
            onChange={(e) => handleMonthChangefrom(e.target.value, setStartDate)}
          />
        </div>
        <span className="dash">
          <i className="fa-xs fa-solid fa-right-left"></i>
        </span>
        <div className="end_date">
          <input
            className="Handlebar"
            type="month"
            min={"2023-01"}
            max={"2025-12"}
            value={endDate.format("YYYY-MM")}
            onChange={(e) => handleMonthChangeto(e.target.value, setEndDate)}
          />
        </div>
</>
    );
  };
  