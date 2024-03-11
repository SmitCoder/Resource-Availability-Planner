import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import "./Matrix.css";
import Select from "react-select";
import MultiSelect from "multiselect-react-dropdown";

function Matrix() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const state = location.state;
  const deptcode = state ? state.deptcode : "";
  const team = state ? state.team : "";
  const [sidebar, setSidebar] = useState(false);
  const [sidebarData, setSidebarData] = useState([]);
  const [secondSidebarOpen, setSecondSidebarOpen] = useState(false);
  const [selectedDeptData, setSelectedDeptData] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);

  useEffect(() => {
    fetchNamesData(deptcode, team);
  }, [deptcode, team, sidebar, secondSidebarOpen]);

  const fetchNamesData = async (deptcode, team) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/selectedOptions",
        {
          deptcode,
          team,
        }
      );
      setData(response.data.recordsets[0]);

      // console.log(response.data.recordsets[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSelectChange = async (value) => {
    // Assuming you have a backend endpoint to fetch data
    console.log(value);
    setSelectedMember(value);
  };
  const CloseFirstSideBar = () => {
    setSidebar(false);
  };
  const CloseSecondSideBar = () => {
    setSecondSidebarOpen(false);
  };
  const toggleSecondSidebar = async (deptcode) => {
    setSecondSidebarOpen(!secondSidebarOpen);
    if (!secondSidebarOpen) {
      try {
        const response = await axios.post("http://localhost:5000/deptsData", {
          deptcode,
        });
        setSelectedDeptData(response.data.recordsets[0]);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    }
  };
  const handleCheckboxChange = (item) => {
    // if (selectedDeptData.includes(item)) {
    //   setSelectedMember(
    //     selectedDeptData.filter((selectedItem) => selectedItem !== item)
    //   );
    // } else {
    setSelectedMember(item);
    // }
    console.log(selectedMember);
  };

  // console.log(selectedDeptData);
  const toggleFirstSidebar = async () => {
    setSidebar(!sidebar);
    if (!sidebar) {
      try {
        const response = await axios.get("http://localhost:5000/depts");
        setSidebarData(response.data.recordsets[0]);

        // const resposne2 = await axios.post("http://localhost:5000/deptsData", {
        //   deptcode,
        // });
        // setSelectedDeptData(resposne2.data.recordsets[0]);
        // console.log(resposne2.data.recordsets[0]);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    }
  };
  const sendSelectedMembers = async () => {
    try {
      // Extract IDs of selected members
      const selectedMemberIDs = selectedDeptData.map((member) => member.ID);
      // Send selected member IDs to the backend
      await axios.post("http://localhost:5000/sendMembers", {
        memberIDs: selectedMemberIDs,
      });
      console.log("Selected members sent to the backend successfully.");
    } catch (error) {
      console.error("Error sending selected members:", error);
    }
  };

  // console.log(sidebarData);

  return (
    <div className="matrix-container">
      <h1 className="matrix-heading">
        {deptcode} - {team}
      </h1>

      <i className="fa-lg fa-solid fa-plus" onClick={toggleFirstSidebar}></i>
      <div className="table_position">
      <table className="matrix-table">
        <thead>
          <tr>
            {/* <th>Sapid</th> */}
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {/* <td>{item.ID}</td> */}
              <td>{item.Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {sidebar && (
        <div className="first-sidebar"
          // style={{
          //   position: "fixed",
          //   top: "13.5%",
          //   right: 0,
          //   width: "300px",
          //   height: "100%",
          //   backgroundColor: "#f0f0f0",
          //   padding: "20px",
          // }}
        >
          <div className="i">
          <i className="fa-lg fa-solid fa-xmark" onClick={CloseFirstSideBar}></i></div>
          <h2>Department Names</h2>
          {sidebarData.map((item, index) => (
            <div key={index}>
              <h4>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => toggleSecondSidebar(item.deptcode)}
                ></i>
                {item.deptcode}
              </h4>
            </div>
          ))}

          {secondSidebarOpen && (
            <div
              className="second-sidebar"
              // style={{
              //   position: "fixed",
              //   top: 0,
              //   right: "300px", // Adjust this value based on the width of the first sidebar
              //   width: "300px",
              //   height: "100%",
              //   backgroundColor: "#f0f0f0",
              //   padding: "20px",
              // }}
            >
              {/* <i className="fa-solid fa-xmark" onClick={CloseSecondSideBar}></i> */}
              {/* <h4>Members</h4> */}

              {/* smit's */}
              {/* {selectedDeptData.map((item, index) => (
                <div key={index}>
                  <h4>{item.Name}</h4>
                </div>
              ))} */}

              <Select
                isMulti
                options={selectedDeptData.map((item) => ({
                  label: item.Name,
                  value: item.Name,
                }))}
                onChange={handleCheckboxChange}
                closeMenuOnSelect={false}
                display="chip"
              ></Select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Matrix;