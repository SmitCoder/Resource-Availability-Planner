// handleFunctions.js
import moment from "moment";

export const handleMonthChangefrom = (date, setStartDate) => {
  setStartDate(moment(date));
};

export const handleMonthChangeto = (date, setEndDate) => {
  setEndDate(moment(date).endOf("month"));
};

export const detectKeyDown = (e, closeModal) => {
  if (e.key === "Escape") {
    closeModal();
  }
};

export const toggleSortingOrder = (setAsc, setIcon, icon) => {
  setAsc((prevAsc) => !prevAsc);
  setIcon((prevIcon) => (prevIcon === "up" ? "down" : "up"));
  // window.location.reload();
};

export const handleSearchChange = (e, setSearchQuery) => {
  setSearchQuery(e.target.value);
};
