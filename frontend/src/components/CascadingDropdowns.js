// import React, { useEffect, useState } from "react";
// import "../Css/Team.css";
// import EditIcon from "@mui/icons-material/Edit";
// import axios from "axios";
// import Editing from "../Teams/Editing";

// const Matrix = () => {
//   const [data, setData] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedTeamId, setSelectedTeamId] = useState(null);

//   useEffect(() => {
//     fetchTeamsData();
//   }, []);

//   const fetchTeamsData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/matrix");
//       setData(response.data.recordsets[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const openform = (teamId) => {
//     // setShowForm(!showForm);
//     setShowForm(!showForm);
//     setSelectedTeamId(teamId);
//     // setShowForm(!showForm);
//     // console.log(selectedTeamId);
//     // console.log("clicked");

//     // setData(data); // Set the selected team ID
//   };
//   const closeForm = () => {
//     setShowForm(false); // Close the form
//   };
//   return (
//     <>
//       <div className="header-container">
//         <div className="title">
//           <h1>
//             Manage <b>Matrix</b>
//           </h1>
//         </div>
//         <div className="btns">
//           <button
//             color="success"
//             className="add"
//             onClick={() => openform(null)}
//           >
//             Add Team
//           </button>
//           <button color="primary" className="delete">
//             Delete
//           </button>
//         </div>
//       </div>
//       {showForm && (
//         <Editing teamId={selectedTeamId} teamdata={data} onClose={closeForm} />
//       )}{" "}
//       {/* Pass the teamId to Editing */}
//       <div className="table-responsive">
//         <table className="teams-table">
//           <thead>
//             <tr>
//               <th>Team_Id</th>
//               <th>Employee_id</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((team) => (
//               <tr key={team.id}>
//                 <td>{team.Team_id}</td>
//                 <td>{team.Employee_id}</td>
//                 {/* <td>{team.Description}</td> */}
//                 <td>
//                   <button onClick={() => openform(team.id)}>
//                     {" "}
//                     {/* Pass team id to toggleForm */}
//                     <EditIcon style={{ height: "20px" }} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Matrix;

import React, { useState } from "react";
import "./CascadingDropdowns.css";

// function CascadingDropdowns() {
//   // Static options for the first dropdown
//   const firstDropdownOptions = [
//     { value: "option1", label: "Option 1" },
//     { value: "option2", label: "Option 2" },
//     { value: "option3", label: "Option 3" },
//   ];

//   // Static options for the second dropdown
//   const secondDropdownOptions = [
//     { value: "subOption1", label: "Sub Option 1" },
//     { value: "subOption2", label: "Sub Option 2" },
//     { value: "subOption3", label: "Sub Option 3" },
//   ];

//   // Static options for the third dropdown (nested dropdown)
//   const thirdDropdownOptions = [
//     { value: "nestedOption1", label: "Nested Option 1" },
//     { value: "nestedOption2", label: "Nested Option 2" },
//     { value: "nestedOption3", label: "Nested Option 3" },
//   ];

//   const [selectedFirstValue, setSelectedFirstValue] = useState("");
//   const [selectedSecondValue, setSelectedSecondValue] = useState("");
//   const [selectedThirdValue, setSelectedThirdValue] = useState("");

//   const handleFirstDropdownChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedFirstValue(selectedValue);
//     // Reset the values of the second and third dropdowns when the first dropdown changes
//     setSelectedSecondValue("");
//     setSelectedThirdValue("");
//   };

//   const handleSecondDropdownChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedSecondValue(selectedValue);
//     // Reset the value of the third dropdown when the second dropdown changes
//     setSelectedThirdValue("");
//   };

//   const handleThirdDropdownChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedThirdValue(selectedValue);
//   };

//   return (
//     <div>
//       <select value={selectedFirstValue} onChange={handleFirstDropdownChange}>
//         <option value="">Select...</option>
//         {firstDropdownOptions.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <select value={selectedSecondValue} onChange={handleSecondDropdownChange}>
//         <option value="">Select...</option>
//         {secondDropdownOptions.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       {selectedSecondValue && ( // Render the third dropdown only if the second dropdown has a selected value
//         <select value={selectedThirdValue} onChange={handleThirdDropdownChange}>
//           <option value="">Select...</option>
//           {thirdDropdownOptions.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// }

function CascadingDropdowns() {
  // Static options for the first dropdown
  const firstDropdownOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  // Static options for the second dropdown
  const secondDropdownOptions = [
    {
      value: "subOption1",
      label: "Sub Option 1",
      thirdOptions: [
        { value: "nestedOption1", label: "Nested Option 1" },
        { value: "nestedOption2", label: "Nested Option 2" },
        { value: "nestedOption3", label: "Nested Option 3" },
      ],
    },
    {
      value: "subOption2",
      label: "Sub Option 2",
      thirdOptions: [
        { value: "nestedOption4", label: "Nested Option 4" },
        { value: "nestedOption5", label: "Nested Option 5" },
        { value: "nestedOption6", label: "Nested Option 6" },
      ],
    },
    {
      value: "subOption3",
      label: "Sub Option 3",
      thirdOptions: [
        { value: "nestedOption7", label: "Nested Option 7" },
        { value: "nestedOption8", label: "Nested Option 8" },
        { value: "nestedOption9", label: "Nested Option 9" },
      ],
    },
  ];

  const [selectedFirstValue, setSelectedFirstValue] = useState("");
  const [selectedSecondValue, setSelectedSecondValue] = useState("");
  const [selectedThirdValue, setSelectedThirdValue] = useState("");

  const handleFirstDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFirstValue(selectedValue);
    // Reset the values of the second and third dropdowns when the first dropdown changes
    setSelectedSecondValue("");
    setSelectedThirdValue("");
  };

  const handleSecondDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSecondValue(selectedValue);
    // Reset the value of the third dropdown when the second dropdown changes
    setSelectedThirdValue("");
  };

  const handleThirdDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedThirdValue(selectedValue);
  };

  return (
    <div class="dropdown">
      <button
        class="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <a class="dropdown-item" href="#">
            Action
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Another action
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Submenu &raquo;
          </a>
          <ul class="dropdown-menu dropdown-submenu">
            <li>
              <a class="dropdown-item" href="#">
                Submenu item 1
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Submenu item 2
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Submenu item 3 &raquo;{" "}
              </a>
              <ul class="dropdown-menu dropdown-submenu">
                <li>
                  <a class="dropdown-item" href="#">
                    Multi level 1
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Multi level 2
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Submenu item 4
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Submenu item 5
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default CascadingDropdowns;
