// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router";
// import "./Matrix.css";
// import Select from "react-select";
// import MultiSelect from "multiselect-react-dropdown";

// function Matrix() {
//   const [data, setData] = useState([]);
//   const location = useLocation();
//   const state = location.state;
//   const deptcode = state ? state.deptcode : "";
//   const team = state ? state.team : "";
//   const teamid  = state ? state.teamid : "";
//   const team_Name  = state ? state.team_Name : "";
//   const [sidebar, setSidebar] = useState(false);
//   const [sidebarData, setSidebarData] = useState([]);
//   const [secondSidebarOpen, setSecondSidebarOpen] = useState(false);
//   const [selectedDeptData, setSelectedDeptData] = useState([]);
//   const [selectedMember, setSelectedMember] = useState([]);
//   const [ showselect , setshowselect] = useState({})

//   useEffect(() => {
//     fetchNamesData( teamid  );
//   }, [deptcode, team, sidebar, secondSidebarOpen, teamid , team_Name , selectedMember]);

//   const fetchNamesData = async ( teamid) => {
//     try {
//       console.log(teamid);
//       const response = await axios.post(
//         "http://localhost:5000/selectedOptions",
//         {
//           // deptcode,
//           // team,
//           teamid
//         }
//       );
//       setData(response.data.recordsets[0]);

//       // console.log(response.data.recordsets[0]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   const handleSelectChange = async (value, team) => {
//     // Assuming you have a backend endpoint to fetch data
//     console.log(value);
//     setSelectedMember(value);
//   };
//   const CloseFirstSideBar = () => {
//     setSidebar(false);
//   };
//   const CloseSecondSideBar = () => {
//     setSecondSidebarOpen(false);
//   };
//   const toggleSecondSidebar = async (deptcode) => {
//     const newState = {};
//     newState[deptcode] = true;
//     setshowselect( newState);
//     // setSecondSidebarOpen(!secondSidebarOpen);
//     if (!secondSidebarOpen) {
//       try {
//         const response = await axios.post("http://localhost:5000/deptsData", {
//           deptcode,
//         });
//         setSelectedDeptData(response.data.recordsets[0]);
//       } catch (error) {
//         console.error("Error fetching sidebar data:", error);
//       }
//     }
//   };
//   const sendSelectedMembers = async (e) => {
//     console.log("button clicked");
//     // e.preventDefault();
//     try {
//       // Extract IDs of selected members
//       // const selectedMemberIDs = selectedDeptData.map((member) => member.ID);
//       // Send selected member IDs to the backend
//       const response = await axios.post("http://localhost:5000/sendMembers", {
//         selectedMember,
//         teamid,
//           team_Name
        
//       });
//       if (response.status === 200) {
//         console.log("Data submitted successfully");
//         window.location.reload();
//       } else {
//         console.error("Failed to submit data");
//       }
//       console.log(selectedMember);
//       console.log("Selected members sent to the backend successfully.");
   
//       // window.location.reload();
//     } catch (error) {
//       console.error("Error sending selected members:", error);
//     }
//   };
//   const handleCheckboxChange = (item) => {
//     // setSelectedMember([ ...selectedMember ,item]);
//     if (!selectedMember.some(member => member === item)) {
//       setSelectedMember([...selectedMember, item]);
//     }
//     // setSelectedMember.push(item);
//   };
//   console.log(selectedMember);

//   // console.log(selectedDeptData);

//   const toggleFirstSidebar = async () => {
//     setSidebar(!sidebar);
//     if (!sidebar) {
//       try {
//         const response = await axios.get("http://localhost:5000/depts");
//         setSidebarData(response.data.recordsets[0]);

//       } catch (error) {
//         console.error("Error fetching sidebar data:", error);
//       }
//     }
//   };
//   const handleDeletion = (id)=>{
//     console.log(id);
//     try {
//       const response = axios.post("http://localhost:5000/delete" , {
//         id
       
//       })
//       if(response.status === 200)
//       {
//         console.log("Data Deleted Successfully");
       
//       }else{
//         console.log("failed to delete the data");
//       }
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }

//   }


//   return (
//     <div className="matrix-container">
//       <h1 className="matrix-heading">
//         {teamid} {team_Name}
//       </h1>

//       <i className="fa-solid fa-plus" onClick={toggleFirstSidebar}></i>

//       <table className="matrix-table">
//         <thead>
//           <tr>
//             <th>Sapid</th>
//             <th>Name</th>
//             <th>ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
    
//               <td>{item.ID}</td>
//               <td>{item.Name} <button><i className="fa-solid fa-minus" onClick={()=>handleDeletion(item.ID)}></i></button></td>
//               <td>{item.Team_id}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {sidebar && (
//         <div
//           style={{
//             position: "fixed",
//             top: "13.5%",
//             right: 0,
//             width: "300px",
//             height: "100%",
//             backgroundColor: "#f0f0f0",
//             padding: "20px",
//           }}
//         >
//           <i className="fa-solid fa-xmark" onClick={CloseFirstSideBar}></i>
//           <h2>Department Names</h2>
//           {sidebarData.map((item, index) => (
//             <div key={index}>
//               <h4>
//                 <i
//                   className="fa-solid fa-angle-down"
//                   onClick={() => toggleSecondSidebar(item.deptcode)}
//                 >   </i>
//                   {item.deptcode}
//                   { showselect[item.deptcode] && <Select
//                 isMulti
//                 options={selectedDeptData.map((item) => ({
//                   label: item.Name,
//                   value: item.ID,
//                 }))}
//                 onChange={handleCheckboxChange}
//                 closeMenuOnSelect={false}
//                 selectAllText="Select"
//               ></Select>
// }
             
//               </h4>
//             </div>
//           ))}
//           <button onClick={sendSelectedMembers}>Send Data</button>

//           {secondSidebarOpen && (
//             <div
//               className="second-sidebar"
//               style={{
//                 position: "fixed",
//                 top: 0,
//                 right: "300px", // Adjust this value based on the width of the first sidebar
//                 width: "300px",
//                 height: "100%",
//                 backgroundColor: "#f0f0f0",
//                 padding: "20px",
//               }}
//             >
//               <i className="fa-solid fa-xmark" onClick={CloseSecondSideBar}></i>
//               <h4>Members</h4>
//               {/* {selectedDeptData.map((item, index) => (
//                 <div key={index}>
//                   <h4>{item.Name}</h4>
//                 </div>
//               ))} */}
           
//             </div>
//           )}


//         </div>
//       )}
//     </div>
//   );
// }

// export default Matrix;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import "./Matrix.css";
import Select from "react-select";

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

  useEffect(() => {
    fetchNamesData(teamid);
  }, [deptcode, team, sidebar, secondSidebarOpen, teamid, team_Name, selectedMember]);

  const fetchNamesData = async (teamid) => {
    try {
      console.log(teamid);
      const response = await axios.post("http://localhost:5000/selectedOptions", {
        teamid,
      });
      setData(response.data.recordsets[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleSelectChange = async (value, deptcode) => {
  //   const newState = [ ...selectedOptions ,value];
  //   // newState[deptcode] = value;
  //     // Flatten the array of arrays
  // const flattenedArray = newState.flat();

  // // Filter out duplicate objects based on their value property
  // const uniqueArray = flattenedArray.filter((obj, index, self) =>
  //   index === self.findIndex((o) => o.value === obj.value)
  // );

  // console.log(uniqueArray);
  //   setSelectedOptions(uniqueArray);
  // };
  const handleSelectChange = async (value, deptcode) => {
    // Check if the value is already selected
    const alreadySelectedIndex = selectedOptions.findIndex(option => option.value === value.value);
  
    if (alreadySelectedIndex === -1) {
      // If the value is not already selected, add it to the selectedOptions array
      const newState = [...selectedOptions, value];
      setSelectedOptions(newState); // Assuming you're using React or a similar framework
    } else {
      // If the value is already selected, remove it from the selectedOptions array
      const updatedOptions = selectedOptions.filter(option => option.value !== value.value);
      setSelectedOptions(updatedOptions); // Assuming you're using React or a similar framework
    }
  };
  
  const CloseFirstSideBar = () => {
    setSidebar(false);
  };

  const CloseSecondSideBar = () => {
    setSecondSidebarOpen(false);
  };

  const toggleSecondSidebar = async (deptcode) => {
    const newState = { ...showselect };
    newState[deptcode] = true;
    setShowSelect(newState);
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

  const sendSelectedMembers = async () => {
    console.log("button clicked");
    try {
      const response = await axios.post("http://localhost:5000/sendMembers", {
        selectedOptions,
        teamid,
        team_Name,
      });
      // if (response.status === 200) {
      //   console.log("Data submitted successfully");
        window.location.reload();
      // } else {
      //   console.error("Failed to submit data");
      // }
    } catch (error) {
      console.error("Error sending selected members:", error);
    }
  };

  // const handleCheckboxChange = (item) => {
  //   if (!selectedMember.some((member) => member === item)) {
  //     setSelectedMember([...selectedMember, item]);
  //   }
  // };

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
      if(window.confirm("do u want to delete this")){
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

  return (
    <div className="matrix-container">
      <h1 className="matrix-heading">
        {teamid} {team_Name}
      </h1>

      <i className="fa-solid fa-plus" onClick={toggleFirstSidebar}></i>

      <table className="matrix-table">
        <thead>
          <tr>
            <th>Sapid</th>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.ID}</td>
              <td>
                {item.Name}{" "}
                <button>
                  <i className="fa-solid fa-minus" onClick={() => handleDeletion(item.ID)}></i>
                </button>
              </td>
              <td>{item.Team_id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {sidebar && (
        <div
          style={{
            position: "fixed",
            top: "13.5%",
            right: 0,
            width: "300px",
            height: "100%",
            backgroundColor: "#f0f0f0",
            padding: "20px",
          }}
        >
          <i className="fa-solid fa-xmark" onClick={CloseFirstSideBar}></i>
          <h2>Department Names</h2>
          {sidebarData.map((item, index) => (
            <div key={index}>
              <h4>
                <i
                  className="fa-solid fa-angle-down"
                  onClick={() => toggleSecondSidebar(item.deptcode)}
                ></i>{" "}
                {item.deptcode}
                {showselect[item.deptcode] && (
                  <Select
                    isMulti
                    options={selectedDeptData.map((item) => ({
                      label: item.Name,
                      value: item.ID,
                    }))}
                    value={selectedOptions[item.deptcode]}
                    onChange={(value) => handleSelectChange(value, item.deptcode)}
                    closeMenuOnSelect={false}
                    selectAllText="Select"
                  />
                )}
              </h4>
            </div>
          ))}
          <button onClick={sendSelectedMembers}>Send Data</button>

          {secondSidebarOpen && (
            <div
              className="second-sidebar"
              style={{
                position: "fixed",
                top: 0,
                right: "300px", // Adjust this value based on the width of the first sidebar
                width: "300px",
                height: "100%",
                backgroundColor: "#f0f0f0",
                padding: "20px",
              }}
            >
              <i className="fa-solid fa-xmark" onClick={CloseSecondSideBar}></i>
              <h4>Members</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Matrix;
