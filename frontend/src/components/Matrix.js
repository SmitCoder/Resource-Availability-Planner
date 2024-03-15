
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import "./Matrix.css";
import Select from "react-select";
import {
  handleMonthChangefrom,
  handleMonthChangeto,
  detectKeyDown,
  toggleSortingOrder,
} from "./handleFunction";
import {MultiSelect} from 'react-multi-select-component'
function Matrix() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const state = location.state;
  const deptcode = state ? state.deptcode : "";
  const team = state ? state.team : "";
  const teamid = state ? state.teamid : "";
  const team_Name = state ? state.team_Name : "";
  const [sidebar, setSidebar] = useState(false);
  const [sidebarData, setSidebarData] = useState([]);
  const [secondSidebarOpen, setSecondSidebarOpen] = useState(false);
  const [selectedDeptData, setSelectedDeptData] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);
  const [showselect, setShowSelect] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const[uniqueArray , setuniqueArray] = useState([])
const [value , setvalue] = useState([])

  useEffect(() => {
    fetchNamesData(teamid);
  }, [deptcode, team, sidebar, secondSidebarOpen, teamid, team_Name, selectedMember]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => detectKeyDown(e, closeModal));
    return () => {
      document.removeEventListener("keydown", (e) =>
        detectKeyDown(e, closeModal)
      );
    };
  }, []);


  const closeModal = () => {
    setSidebar(false)
  }
  const fetchNamesData = async (teamid) => {
    try {
      console.log(teamid);
      const response = await axios.post("http://localhost:5000/selectedOptions", {
        teamid,
      });
      setData(response.data.recordsets[0]);
  
      console.log(response.data.recordsets[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleSelectChange = async (value, deptcode) => {
  //   const newState = [...selectedOptions, value];
  //   // newState[deptcode] = value;
  //   // Flatten the array of arrays
  //   const flattenedArray = newState.flat();

  //   // Filter out duplicate objects based on their value property
  //   const un = flattenedArray.filter((obj, index, self) =>
  //     index === self.findIndex((o) => o.value === obj.value)
  //   );

  //   console.log(un);
  //   // setuniqueArray([...uniqueArray , uniqueArray])
  //   // setSelectedOptions(uniqueArray);
  //   // console.log(selectedOptions);
  // };
  // // const handleSelectChange = async (value, deptcode) => {
  // //   console.log(selectedOptions);
  // //   // Check if the value is already selected
  // //   const alreadySelectedIndex = selectedOptions.findIndex(option => option.value === value.value);

  // //   if (alreadySelectedIndex === -1) {
  // //     // If the value is not already selected, add it to the selectedOptions array
  // //     const newState = [...selectedOptions, value];
  // //     setSelectedOptions(newState); // Assuming you're using React or a similar framework
  // //   } else {
  // //     // If the value is already selected, remove it from the selectedOptions array
  // //     const updatedOptions = selectedOptions.filter(option => option.value !== value.value);
  // //     setSelectedOptions(updatedOptions); // Assuming you're using React or a similar framework
  // //   }
  // // };

  // const handleSelectChange = (value, deptcode) => {
  //   // Create a copy of selectedOptions state
  //   const newState = {...selectedOptions, value};
  //     // newState[deptcode] = value;
  //     console.log(newState.value[0].label);
  //     const arr = [];
  //     const x = newState.value[0].label;
    
  //     console.log(arr);
  //     console.log(newState);
  // };
  // const handleSelectChange = (selectedOptions)=>{
  //   console.log("selected " , selectedOptions);

  //   const df = {...selectedOptions}
  //   console.log(df);

  // }
  const handleSelectChange = async (value, deptcode) => {
  // setSelectedOptions([...selectedOptions , value])
  console.log("prinitng value " ,value);
  const arr = [];
  arr.push(value)
 console.log("printing arr " , arr);
 setSelectedOptions(arr)
  };
  console.log(selectedOptions);
  const CloseFirstSideBar = () => {
    setSidebar(false);
  };


  const CloseSecondSideBar = () => {
    setSecondSidebarOpen(false);
  };

  // const toggleSecondSidebar = async (deptcode) => {
  //   const newState = { ...showselect };
  //   newState[deptcode] = true;
  //   setShowSelect(newState);
  
  //   if (!secondSidebarOpen) {
  //     try {
  //       const response = await axios.post("http://localhost:5000/deptsData", {
  //         deptcode,
  //       });

  //       const filteredData = response.data.recordsets[0];
  //       // console.log(response.data.recordsets[0]);
  //       const ed = filteredData.filter(item =>  !data.find(option => option.ID === item.ID));
  //       // console.log(ed);
  //       // setSelectedDeptData(filteredData.filter(item => data.find(option => option.id !== item.id) ))
  //       // setSelectedDeptData(response.data.recordsets[0]);
  //       // setSelectedOptions(data.filter(item => !selectedDeptData.find(option => option.id === item.id)));
  //       // console.log(selectedDeptData);
  //       setSelectedDeptData(ed)

  //     } catch (error) {
  //       console.error("Error fetching sidebar data:", error);
  //     }
  //   }
  // };
  const toggleSecondSidebar = async (deptcode) => {
    const newState = { showselect };
    newState[deptcode] = true; // Toggle the state
    setShowSelect(newState);
  
    // If the sidebar is being closed, clear the selected options
    if (!newState[deptcode]) {
      console.log("hoi");
      setSelectedOptions([]);
    }
  
    if (!secondSidebarOpen) {
      try {
        const response = await axios.post("http://localhost:5000/deptsData", {
          deptcode,
        });
  
        const filteredData = response.data.recordsets[0];
        const ed = filteredData.filter(item =>  !data.find(option => option.ID === item.ID));
        setSelectedDeptData(ed);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    }
  };
  
  const sendSelectedMembers = async () => {
    console.log("button clicked");
    try {
     
      const response = await axios.post("http://localhost:5000/sendMembers", {
        selectedOptions,
        teamid,
        team_Name,
      });
      console.log(selectedOptions);
      if (response.status === 200) {
        console.log("Data submitted successfully");
        window.location.reload();
      } else {
        console.error("Failed to submit data");
      }
    
   
  
    } catch (error) {
      console.error("Error sending selected members:", error);

    }
  };

  // const handleCheckboxChange = (item) => {
  //   if (!selectedMember.some((member) => member === item)) {
  //     setSelectedMember([...selectedMember, item]);
  //   }
  // };

  const handleOverlayoutClick = () => {
    setSidebar(false); // Close the sidebar when clicking outside
  };
  const toggleFirstSidebar = async () => {
    setSidebar(!sidebar);
    if (!sidebar) {
      try {
        const response = await axios.get("http://localhost:5000/depts");
        setSidebarData(response.data.recordsets[0]);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    }
  };

  const handleDeletion = async (id) => {
    console.log(id);

    try {
      if (window.confirm("do u want to delete this")) {
        const response = await axios.post("http://localhost:5000/delete", {
          id,
        });

        if (response.status === 200) {
          console.log("Data Deleted Successfully");
        } else {
          console.log("Failed to delete the data");
        }
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleinput = (value)=>{
    setvalue(value)
    
  }
 

  return (
    <div className="matrix-container">
      <div className="main-container">
        <div className="content">  {teamid} {team_Name}</div>
        <div className="icon-btn">
          <button onClick={toggleFirstSidebar} className="matrix-add-btn">Add<i className="fa-solid fa-plus" ></i></button>
        </div>
      </div>

      <div className={`overlayout ${sidebar ? "show" : ""}`} onClick={handleOverlayoutClick}></div>

      <div className="table_position">
        <table className="matrix-table">
          <thead>
            <tr>
              {/* <th>Sapid</th> */}
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {/* <td>{item.ID}</td> */}
                <td >
                  {item.Name}{" "}
                  {/* <button>
                  <i className="fa-solid fa-minus" }></i>
                </button> */}
                </td>
                {/* <td>{item.Team_id}</td> */}
                {/* <td><i class="fa-solid fa-user-minus"></i></td> */}
                <td>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => handleDeletion(item.ID)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`first-sidebar ${sidebar ? "show" : ""}`}>
        <i className="fa-lg fa-solid fa-xmark" onClick={CloseFirstSideBar}></i>

        <div className="heading">Department Names</div>
        <div className="text">
          {sidebarData.map((item, index) => (
            <div key={index}>
              <div
                className="data"
                onClick={() => toggleSecondSidebar(item.deptcode)}
              >
                {/* <i
                className="fa-solid fa-plus"
                onClick={() => toggleSecondSidebar(item.deptcode)}
              ></i> */}
                {item.deptcode}
                {showselect[item.deptcode] && (
                  <><Select
                    isMulti
                    options={selectedDeptData.map((item) => ({
                      label: item.Name,
                      value: item.ID,
                    }))}
                    value={selectedOptions[item.deptcode]}
                    onChange={(value) => handleSelectChange(value, item.deptcode)}
                    // onChange={(e)=>setSelectedOptions({[state.ID]:e.target.value})}
                    closeMenuOnSelect={false}
                    selectAllText="Select" /><button className="submit-btn-matrix" onClick={sendSelectedMembers}>Send Data</button></>
                )}
              </div>

            </div>
          ))}
         
        </div>
      </div>
    </div>
  );
}

export default Matrix;

