// PopUpForm.js
import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

function PopUpForm(props) {
  const [leaveType, setLeaveType] = useState("");
  const { name, fromDate, onSubmitForm, iconClose } = props;
  const [todate, setToDate] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      fromDate: moment(fromDate).format("YYYY-MM-DD"),
      toDate: moment(todate).format("YYYY-MM-DD"),
      leaveType,
    };
    onSubmitForm(formData);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);
  };

  return (
    <div className="box">
      <form className="container1" onSubmit={handleSubmit}>
        <i
          className="fa-lg fa-solid fa-xmark"
          onClick={() => {
            props.iconClose();
          }}
        ></i>
        <div className="main-content">
          <input value={name} hidden />

          <div>
            <label htmlFor="inputFromDate">From:</label>
            <input
              className="From"
              value={moment(fromDate).format("YYYY-MM-DD")}
              type="date"
              id="inputFromDate"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="inputToDate">To:</label>
            <input
              type="date"
              id="inputToDate"
              className="To"
              value={todate}
              onChange={handleToDateChange}
              // min={moment(fromDate).format("YYYY-MM-DD")}
              required
            />
          </div>
          <div className="dropdown">
            <label htmlFor="leave" className="drop">
              Leave:{" "}
            </label>
            <select
              name="leave"
              id="leave"
              className="selection"
              value={leaveType}
              onChange={handleLeaveTypeChange}
              required
            >
              <option value=""></option>
              <option value="SL">SL</option>
              <option value="CL">CL</option>
              <option value="PL">PL</option>
              <option value="ML">ML</option>
              <option value="WH">WH</option>
            </select>
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default PopUpForm;
