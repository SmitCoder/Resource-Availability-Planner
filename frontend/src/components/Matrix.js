// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import CascadingDropdowns from "./CascadingDropdowns";

// // // function Matrix() {
// // //   const [groupedData, setGroupedData] = useState([]);
// // //   const [selectedOption, setSelectedOption] = useState("");
// // //   const [dataofteams, setData] = useState([]);

// // //   useEffect(() => {
// // //     fetchteamsdata();
// // //     fetchTeamsData();
// // //   }, []);
// // //   const fetchTeamsData = async () => {
// // //     try {
// // //       const response = await axios.get("http://localhost:5000/matrix");
// // //       setGroupedData(response.data.recordsets[0]);
// // //       console.log(response.data.recordsets[0]);
// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };
// // //   const fetchteamsdata = async () => {
// // //     try {
// // //       const response = await axios.post(
// // //         "http://localhost:5000/selectedOptions"
// // //       );
// // //       setData(response.data.recordsets[0]);
// // //       console.log(response.data.recordsets[0]);
// // //     } catch (err) {
// // //       console.log(err);
// // //     }
// // //   };
// // //   const handleDropdownChange = async (event) => {
// // //     const selectedValue = event.target.value;
// // //     console.log(selectedValue);
// // //     setSelectedOption(selectedValue);
// // //     const [deptcode, team] = selectedValue.split("-");
// // //     console.log(deptcode, team);
// // //     const response = await fetch(`http://localhost:5000/selectedOptions`, {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //       },
// // //       body: JSON.stringify({ deptcode, team }),

// // //       // body: teamId,
// // //     });
// // //     if (response.ok) {
// // //       const data = await response.json(); // Parse JSON response
// // //       console.log(data);
// // //       setData(data);
// // //       console.log("Data submitted successfully");
// // //       //   window.location.reload();
// // //     } else {
// // //       console.error("Failed to submit data");
// // //     }
// // //   };
// // //   console.log(dataofteams);
// // //   return (
// // //     <div>
// // //       <h1>Select Department and Team</h1>
// // //       <select value={selectedOption} onChange={handleDropdownChange}>
// // //         <option value="">Select</option>
// // //         {groupedData.map((item, index) => (
// // //           <option key={index} value={`${item.deptcode}-${item.Team}`}>
// // //             {item.deptcode} - {item.Team}
// // //           </option>
// // //         ))}
// // //       </select>
// // //       {selectedOption && <p>You selected: {selectedOption}</p>}
// // //       {/* <CascadingDropdowns />   */}
// // //       <div>
// // //         <h2>Names</h2>
// // //         <ul>
// // //           {dataofteams.map((item, index) => (
// // //             <li key={index}>{item.Name}</li>
// // //           ))}
// // //         </ul>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // function Matrix() {
// //   const [groupedData, setGroupedData] = useState([]);
// //   const [selectedOption, setSelectedOption] = useState("");
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     fetchTeamsData();
// //   }, []);

// //   const fetchTeamsData = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:5000/matrix");
// //       setGroupedData(response.data.recordsets[0]);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const handleDropdownChange = async (event) => {
// //     const selectedValue = event.target.value;
// //     setSelectedOption(selectedValue);
// //     const [deptcode, team] = selectedValue.split("-");
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/selectedOptions",
// //         {
// //           deptcode,
// //           team,
// //         }
// //       );
// //       setData(response.data.recordsets[0]);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Select Department and Team</h1>
// //       <select value={selectedOption} onChange={handleDropdownChange}>
// //         <option value="">Select</option>
// //         {groupedData.map((item, index) => (
// //           <option key={index} value={`${item.deptcode}-${item.Team}`}>
// //             {item.deptcode} - {item.Team}
// //           </option>
// //         ))}
// //       </select>
// //       {selectedOption && <p>You selected: {selectedOption}</p>}
// //       <div>
// //         <h2>Names</h2>
// //         <ul>
// //           {data.map((item, index) => (
// //             <li key={index}>{item.Name}</li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Matrix;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useLocation } from "react-router";

// // function Matrix() {
// //   const [groupedData, setGroupedData] = useState([]);
// //   const [selectedOption, setSelectedOption] = useState("");
// //   const [data, setData] = useState([]);
// //   const [sidebarOpen, setSidebarOpen] = useState(false); // State to track sidebar open/close

// //   const location = useLocation();
// //   const state = location.state;
// //   const deptcode = state ? state.deptcode : "";
// //   const team = state ? state.team : "";
// //   useEffect(() => {
// //     fetchTeamsData();
// //   }, []);

// //   const fetchTeamsData = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:5000/matrix");
// //       setGroupedData(response.data.recordsets[0]);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const handleDropdownChange = async (event) => {
// //     const selectedValue = event.target.value;
// //     setSelectedOption(selectedValue);
// //     const [deptcode, team] = selectedValue.split("-");
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/selectedOptions",
// //         {
// //           deptcode,
// //           team,
// //         }
// //       );
// //       setData(response.data.recordsets[0]);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!sidebarOpen);
// //   };

// //   return (
// //     <div>
// //       <h1>
// //         {deptcode} - {team}
// //       </h1>
// //       {/* <select value={selectedOption} onChange={handleDropdownChange}>
// //         <option value="">Select</option>
// //         {groupedData.map((item, index) => (
// //           <option key={index} value={`${item.deptcode}-${item.Team}`}>
// //             {item.deptcode} - {item.Team}
// //           </option>
// //         ))}
// //       </select> */}

// //       <table border={1}>
// //         <thead aria-colspan={2}>
// //           <tr>
// //             <th>
// //               {deptcode} - {team}
// //             </th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           <tr>
// //             <td>Names</td>
// //             <td>ge</td>
// //           </tr>
// //         </tbody>
// //       </table>
// //       {selectedOption && <p>You selected: {selectedOption}</p>}

// //       {/* Edit Button */}
// //       <button onClick={toggleSidebar}>Edit</button>

// //       {/* Sidebar */}
// //       {sidebarOpen && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             top: 0,
// //             right: 0,
// //             width: "300px",
// //             height: "100%",
// //             backgroundColor: "#f0f0f0",
// //             padding: "20px",
// //           }}
// //         >
// //           <h2>Department Names</h2>
// //           <ul>
// //             {groupedData.map((item, index) => (
// //               <li key={index}>{item.deptcode}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Matrix;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router";
// import "./Matrix.css";

// function Matrix() {
//   const [data, setData] = useState([]);
//   const location = useLocation();
//   const state = location.state;
//   const deptcode = state ? state.deptcode : "";
//   const team = state ? state.team : "";
//   const [sidebar, setsidebar] = useState(false);
//   const [sidebarData, setSidebarData] = useState([]);
//   const [selectedDeptData, setSelectedDeptData] = useState([]);
//   const [secondSidebarOpen, setSecondSidebarOpen] = useState(false);

//   useEffect(() => {
//     fetchNamesData(deptcode, team);
//   }, [deptcode, team]);

//   const fetchNamesData = async (deptcode, team) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/selectedOptions",
//         {
//           deptcode,
//           team,
//         }
//       );
//       setData(response.data.recordsets[0]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   const toggleSecondSidebar = async () => {
//     setSecondSidebarOpen(!secondSidebarOpen);
//     if (!secondSidebarOpen) {
//       try {
//         const response = await axios.get("http://localhost:5000/deptsData");
//         setSidebarData(response.data.recordsets[0]);
//       } catch (error) {
//         console.error("Error fetching sidebar data:", error);
//       }
//     }
//   };
// }
// // const fetchDeptData = async (selectedDept) => {
// //   try {
// //     const response = await axios.post("http://localhost:5000/deptsData", {
// //       deptcode: selectedDept,
// //       team,
// //     });
// //     setSelectedDeptData(response.data.recordsets[0]);
// //   } catch (error) {
// //     console.error("Error fetching department data:", error);
// //   }
// // };
// const togglesidebar = async () => {
//   setsidebar(!sidebar);
//   if (!sidebar) {
//     try {
//       const response = await axios.get("http://localhost:5000/depts");
//       setSidebarData(response.data.recordsets[0]);
//     } catch (error) {
//       console.error("Error fetching sidebar data:", error);
//     }
//   }
// };
// console.log(sidebarData);
// return (
//   <div className="matrix-container">
//     <h1 className="matrix-heading">
//       {deptcode} - {team}
//     </h1>

//     <i className="fa-solid fa-plus" onClick={togglesidebar}></i>

//     <table className="matrix-table">
//       <thead>
//         <tr>
//           <th>Sapid</th>
//           <th>Name</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index}>
//             <td>{item.sapid}</td>
//             <td>{item.Name}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     {sidebar && (
//       <div
//         style={{
//           position: "fixed",
//           top: "13.5%",
//           right: 0,
//           width: "300px",
//           height: "100%",
//           backgroundColor: "#f0f0f0",
//           padding: "20px",
//         }}
//       >
//         <h2>Department Names</h2>
//         {sidebarData.map((item, index) => (
//           <div>
//             {/* <li key={index} onClick={() => fetchDeptData(item.deptcode)}></li> */}
//             <h4 key={index}>
//               <i
//                 className="fa-solid fa-angle-left"
//                 onClick={toggleSecondSidebar(item.deptcode)}
//               ></i>
//               {item.deptcode}
//             </h4>
//           </div>
//         ))}
//         {secondSidebarOpen && (
//           <div
//             className="second-sidebar"
//             style={{
//               position: "fixed",
//               top: 0,
//               right: "300px", // Adjust this value based on the width of the first sidebar
//               width: "300px",
//               height: "100%",
//               backgroundColor: "#f0f0f0",
//               padding: "20px",
//             }}
//           >
//             <h4>Members</h4>
//           </div>
//         )}
//       </div>
//     )}
//   </div>
// );
//           }

// export default Matrix;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import "./Matrix.css";

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  console.log(sidebarData);

  return (
    <div className="matrix-container">
      <h1 className="matrix-heading">
        {deptcode} - {team}
      </h1>

      <i className="fa-solid fa-plus" onClick={toggleFirstSidebar}></i>

      <table className="matrix-table">
        <thead>
          <tr>
            <th>Sapid</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.sapid}</td>
              <td>{item.Name}</td>
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
          <h2>Department Names</h2>
          {sidebarData.map((item, index) => (
            <div key={index}>
              <h4>
                <i
                  className="fa-solid fa-angle-left"
                  onClick={() => toggleSecondSidebar(item.deptcode)}
                ></i>
                {item.deptcode}
              </h4>
            </div>
          ))}
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
              <h4>Members</h4>
              {selectedDeptData.map((item, index) => (
                <div key={index}>
                  <h4>{item.Name}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Matrix;
