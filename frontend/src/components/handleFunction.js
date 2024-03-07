// handleFunctions.js
import moment from "moment";
import { startTransition } from "react";

export const handleMonthChangefrom = (date, StartDate, setStartDate) => {
  setStartDate(moment(date));
};

export const handleMonthChangeto = (date, setEndDate) => {
  // setEndDate(moment(date).endOf("month"));

  // for validating dates as to date is always smaller than from date.
  let lastDayOfMonth = moment(date).endOf("month");
  const selectedToDate = moment(date);
      // Check if fromDate is set and toDate is not earlier than fromDate
      if (startDate && selectedToDate.isSameOrAfter(startDate)) {
        setselectedDate(selectedDate);
        setEndDate(lastDayOfMonth);// Update endDate for data fetching
        fetchEmployees();
      } 
      else {
        // Handle invalid selection
        alert("Invalid toDate selection: must be after fromDate");
        // setEndDate(endDate); 
        setselectedDate(lastDayOfMonth);
      }
    }

export const detectKeyDown = (e, closeModal) => {
  if (e.key === "Escape") {
    closeModal();
  }
};

export const toggleSortingOrder = (setAsc, setIcon, icon) => {
  setAsc((prevAsc) => !prevAsc);
  setIcon((prevIcon) => (prevIcon === "up" ? "down" : "up"));
};

export const handleSearchChange = (e, setSearchQuery) => {
  setSearchQuery(e.target.value);
};
