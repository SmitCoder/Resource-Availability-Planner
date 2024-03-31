// handleFunctions.js
import moment from "moment";
import axios from "axios";

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

export const handleDropdownData = async (e , setSelectedOption , setDropdownFetchedData) => {
  const selectedValue = e.target.value;
  setSelectedOption(selectedValue);
  try {
    const response2 = await axios.post("http://localhost:5000/DropDownData", {
      selectedValue,
    });
    setDropdownFetchedData(response2.data);
    console.log(response2.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


export const handleDropdownChange = async (e , setDropdownData) => {
  console.log("Getting into function");
  console.log("into clicked");
  try {
    const response = await axios.post("http://localhost:5000/teams", {
    });
    setDropdownData(response.data.recordsets[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};