import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import "../Css/GenerateCalendar.css";
import pallate from "../Images/color-pallate.jpeg";
import axios from "axios";
import { HD, codes } from "./configuration";
import "../Css/PopUpForm.css";
import PopUpForm from "./PopUpForm";
import {
  handleMonthChangefrom,
  handleMonthChangeto,
  detectKeyDown,
  toggleSortingOrder,
} from "./handleFunction";

function GenerateCalendar() {
  const [employees, setEmployees] = useState([]);
  const [startDate, setStartDate] = useState(() => moment().startOf("month"));
  const [endDate, setEndDate] = useState(() => moment().endOf("month"));
  const [icon, setIcon] = useState("up");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDate, setselectedDate] = useState("");
  const [name, setname] = useState("");
  const [id , setid] = useState("")
  const [asc, setAsc] = useState(true);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [original , setoriginal] = useState([])
  const [dropdownFetchedData, setDropdownFetchedData] = useState([]);

  useEffect(() => {
    // if(selectedOption === "")
    // {
      fetchEmployees();
    //   console.log("hi");

    // }else{

    // }
   
  }, [startDate, endDate, searchQuery]);

  useEffect(() => {
    const filteredData = dropdownFetchedData.filter(employee =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setEmployees(filteredData);
  }, [dropdownFetchedData, searchQuery]);
  
  useEffect(() => {
    document.addEventListener("keydown", (e) => detectKeyDown(e, closeModal));
    return () => {
      document.removeEventListener("keydown", (e) =>
        detectKeyDown(e, closeModal)
      );
    };
  }, []);

  const fetchEmployees = async () => {
    try {
 
      if(selectedOption === ""){
      const [mergerRes, employeesRes] = await Promise.all([
        axios.post("http://localhost:5000/COSEC"),
        axios.post("http://localhost:5000/", {
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
          input,
          selectedDate,
          selectedEmployee,
        }),
      ]);

      const mergedDataWithTag = mergerRes.data.map((item) => ({
        ...item,
        source: "Merger API",
      }));

      const employeesDataWithTag = employeesRes.data.map((item) => ({
        ...item,
        source: "Employees API",
      }));
    

      const combinedData = mergedDataWithTag.concat(employeesDataWithTag);
    
      // combinedData.sort((a, b) => {
      //   if (asc) {
      //     return a.name.localeCompare(b.name); // Ascending order
      //   } else {
      //     return b.name.localeCompare(a.name); // Descending order
      //   }
      // });
      setEmployees(combinedData);
      console.log(combinedData);
    }
    // else{
    //   setEmployees(filteredData)
    // }
      
    } catch (error) {
      console.error("Error fetching employee names:", error);
    }
  };

  const openModal = (dateSelected, name , id) => {
    if (!isOpen) {
      setIsOpen(true);
      setselectedDate(dateSelected._d);
      setname(name);
      setid(id)
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmitForm = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/submitFormData",
        formData
      );
      if(response.status === 200)
      {
        window.location.reload();
      }
      console.log("Form data submitted successfully:", response.data);

      // setEmployees((prevEmployees) => {
      //   const updatedEmployees = prevEmployees.map((existingEmployee) => {
      //     const updatedEmployee = response.data.find(
      //       (updated) => updated.name === existingEmployee.name
      //     );

      //     // If an updated employee is found, merge only specific fields
      //     if (updatedEmployee) {
      //       // Here you can specify which fields to update
      //       return { ...existingEmployee, ...updatedEmployee };
      //     }

      //     // If no updated data is found for the existing employee, keep it unchanged
      //     return existingEmployee;
      //   });

      //   return updatedEmployees;
      // });

      // Close the form after successful submission
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };


  const handleDropdownChange = async (e) => {
    console.log("Getting into function");
    console.log("into clicked");
    // console.log(e.target.value)
    // const id = e.target.value
    // const selectedValue = e.target.value;
    // setSelectedOption(selectedValue);
    // console.log(selectedValue);

    // const [deptcode, team] = selectedValue.split("-");
    // console.log(deptcode, team);
    try {
      const response = await axios.post("http://localhost:5000/teams", {
        // deptcode,
        // team,
        // selectedValue,
        // deptcode,
        // team,
        // id
      });
      // console.log("Dropdown data response:", response.data); // Log response data
      setDropdownData(response.data.recordsets[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sortedEmployees = useMemo(() => {
    const sortedData = [...employees]; // Copy employees array
    sortedData.sort((a, b) => {
      if (asc) {
        return a.name.localeCompare(b.name); // Ascending order
      } else {
        return b.name.localeCompare(a.name); // Descending order
      }
    });
    return sortedData;
  }, [employees, asc]);


  // const handleDropdownData = async (e) => {
  //   console.log("Getting into function");
  //   const selectedValue = e.target.value;
  //   setSelectedOption(selectedValue);
  //   console.log(selectedValue);
     

  //   // const [deptcode, team] = selectedValue.split("-");
  //   // console.log(deptcode, team);
  //   try {
  //     const response2 = await axios.post("http://localhost:5000/DropDownData", {
  //       // deptcode,
  //       // team,
  //       selectedValue
  //     });
  //     console.log("Dropdown data response:", response2.data);
  //     const filteredData = response2.data.filter(employee =>
  //       employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     // if (Array.isArray(response2.data)) {
  //       setEmployees(filteredData);
     
   
  //       console.log(filteredData);
        
  //     // } else {
  //       // console.error("Invalid response for employees data:", response2.data);
  //     // }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const handleDropdownData = async (e) => {
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

  const handlechangeorder = () => {
    console.log("clicked");
    setAsc((prevAsc) => !prevAsc);
    setIcon((prevIcon) => (prevIcon === "up" ? "down" : "up"));
    const Emp = employees.sort((a,b)=>{
      if (asc) {
        // Ascending order
        return b.name.localeCompare(a.name);
      } else {

        return a.name.localeCompare(b.name); // Descending order
      }
    })
    setEmployees(Emp)
  };

  const handleSearchChange = (e) => {
    
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.includes(searchQuery)
  );

  const createTableRows = useMemo(() => {
    const leavePeriodsMap = new Map();
    filteredEmployees.forEach((employee) => {
      employee.dates.forEach((leave) => {
        const leaveStartDate = moment(leave.fromDate).startOf("day");
        const leaveEndDate = moment(leave.toDate).startOf("day");
        let currentDate = leaveStartDate.clone();
        while (currentDate.isSameOrBefore(leaveEndDate, "day")) {
          const key = currentDate.format("YYYY-MM-DD");
          const existingLeavePeriods = leavePeriodsMap.get(key) || [];
          leavePeriodsMap.set(key, [
            ...existingLeavePeriods,
            {
              leavetype: leave.leavetype,
              name: employee.name,
              appldays: leave.appldays,
              modifyfrom: leave.modifyfrom,
              fromDate: leaveStartDate,
              toDate: leaveEndDate,
              modifyto: leave.modifyto,
              id: leave.id,
            },
          ]);
          currentDate = currentDate.add(1, "day");
        }
      });
    });

    const tableRows = [];
    const dates = [];
    let currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate, "day")) {
      dates.push({
        date: currentDate.format("DD"),
      });
      currentDate = currentDate.add(1, "day");
    }

    const monthHeaderRow = (
      <tr>
        <th rowSpan={2} className="month">
          Name{" "}
          {icon === "up" ? (
            <i className="fa-solid fa-caret-up" onClick={handlechangeorder}></i>
          ) : (
            <i
              className="fa-solid fa-caret-down"
              onClick={handlechangeorder}
            ></i>
          )}
        </th>
        {dates.map((date, index) => {
          const currentDate = startDate
            .clone()
            .startOf("month")
            .add(index, "days");
          if (index === 0 || currentDate.date() === 1) {
            return (
              <td
                key={`${currentDate.format("MMMM")}-${currentDate.year()}`}
                colSpan={currentDate.daysInMonth()}
              >
                {currentDate.format("MMMM")}
              </td>
            );
          }
          return null;
        })}
      </tr>
    );

    const headerRow = (
      <tr>
        {dates.map((date, index) => (
          <td key={`header-${date.date}-${index}`}>{date.date}</td>
        ))}
      </tr>
    );

    filteredEmployees.forEach((employee) => {
      const rowData = (
        <tr key={employee.name}>
          <td className="datarows">{employee.name} </td>
          {dates.map((date, index) => {
            const currentDate = startDate
              .clone()
              .add(index, "days")
              .startOf("day");
            const leavePeriod =
              leavePeriodsMap.get(currentDate.format("YYYY-MM-DD")) || [];
            const leave = leavePeriod.find(
              (leave) => leave.name === employee.name
            );

            let backgroundColor = "white";
            let clickable = true;
            if (employee.source === "Employees API") {
              clickable = false;
            }

            if (leave) {
              if (
                leave.appldays - Math.floor(leave.appldays) !== 0 &&
                leave.modifyfrom > 0 &&
                moment(leave.fromDate).isSame(currentDate, "day")
              ) {
                backgroundColor = HD; // Orange for starting date of half-day
              } else if (
                leave.appldays - Math.floor(leave.appldays) !== 0 &&
                leave.modifyto > 0 &&
                moment(leave.toDate).isSame(currentDate, "day")
              ) {
                backgroundColor = HD;
              } else {
                const leaveType = leave.leavetype;
                codes.forEach((code) => {
                  if (leaveType === code.leavetype.name) {
                    backgroundColor = code.leavetype.color; // Set color based on leave type
                  }
                });
              }
            }
            return (
              <td
                onClick={
                  clickable ? () => openModal(currentDate, employee.name , employee.id) : null
                }
                key={`${employee.name}-${date.date}-${index}`}
                style={{ backgroundColor, cursor: "pointer", zIndex: "" }}
              ></td>
            );
          })}
        </tr>
      );
      tableRows.push(rowData);
    });

    return [monthHeaderRow, headerRow, ...tableRows];
  }, [sortedEmployees ,employees, startDate, endDate]);

  return (
    <>
      {
        <div className="container">
          <div className="main">
            <img className="pallate2" src={pallate} alt="" />
            <div className="dates-controler">
              <div className="start_date">
                <input
                  className="Handlebar"
                  type="month"
                  min={"2023-01"}
                  max={"2025-12"}
                  id="start_date"
                  value={startDate.format("YYYY-MM")}
                  onChange={(e) =>
                    handleMonthChangefrom(e.target.value, setStartDate)
                  }
                />
              </div>
              <span className="dash">
                {" "}
                <i className="fa-xs fa-solid fa-right-left"></i>{" "}
              </span>
              <div className="end_date">
                <input
                  className="Handlebar"
                  type="month"
                  min={"2023-01"}
                  max={"2025-12"}
                  id="end_date"
                  value={endDate.format("YYYY-MM")}
                  onChange={(e) =>
                    handleMonthChangeto(e.target.value, setEndDate)
                  } // Pass setEndDate
                />
              </div>
              <div>
                <select className="team-selection"
                  // value={selectedOption}
                  onClick={(e) => handleDropdownChange(e)}
                  // placeholder="select it"
                  onChange={(e) => handleDropdownData(e)}
                >
                  <option value="">Select option</option>
                  {dropdownData.map((item, index) => (
                    <option key={index} value={item.Team_id}>
                  
                      {item.Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="container2">
              <div className="searchBar">
                <input
                  type="text"
                  placeholder="Search..."
                  id="name"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
              <img src={pallate} alt="" />
            </div>
          </div>

          {isOpen && (
            <PopUpForm
              name={name}
              id={id}
              fromDate={selectedDate}
              iconClose={closeModal}
              onSubmitForm={handleSubmitForm}
            />
          )}

          <div className="table-wrapper">
            {isOpen && <div className="overlay"></div>}
            <table
              border={2}
              className={`table onClick={handleTableClick} ${
                isOpen ? "blur" : ""
              } `}
              id="myTable"
            >
              <tbody>{createTableRows}</tbody>
            </table>
          </div>
        </div>
      }
    </>
  );
}
export default GenerateCalendar;