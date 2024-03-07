import { Chip } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";

function MultiSelectDropdown() {
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/select");

      setOptions(response.data.recordsets[0]);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectChange = (value) => {
    // const selectedOptions = Array.from(
    //   event.target.selectedOptions,
    //   (option) => option.value
    // );
    // setSelectedValues(event.target.value);
    console.log(value);
  };

  const handleSubmit = () => {
    console.log("Selected values:", selectedValues);
    // Perform any further actions with selected values here
  };

  return (
    <div>
      <Select
        isMulti
        options={options.map((item) => ({
          label: item.Name,
          value: item.Name,
        }))}
        onChange={handleSelectChange}
        closeMenuOnSelect={false}
        display="chip"
      ></Select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default MultiSelectDropdown;
