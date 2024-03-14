import { useState, useEffect } from "react";
import DropdownsWithCheckboxes from "./DropdownsWithCheckboxes";
import { Navigate, useNavigate } from "react-router";

import "../Css/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const toggleSidebar = () => {
    setShow(!show);
  };

  const navigateAndToggleSidebar = () => {
    navigate("/team");
    setShow(false); // Close the sidebar after navigating
  };
  const navigatetoHome = () => {
    navigate("/");
    setShow(false);
  };
  const navigatetoemploye = () => {
    navigate("/employee");
    setShow(false);
  };
  const navigatetomatrix = () => {
    navigate("/matrix");
    setShow(false);
  };

  const handleOverlayClick = () => {
    setShow(false); // Close the sidebar when clicking outside
  };
  // useEffect(() => {
  //   // Redirect to the main path ("/") when the component mounts
  //   navigate("/");
  // }, []);
  return (
    <div className={`sidebar-container ${show ? "active" : ""}`}>
      <div className="overlay" onClick={handleOverlayClick}></div>
      <div className="bars" onClick={toggleSidebar}>
        {/* <button><i className={fa-2xl fa-solid fa-${show ? "xmark" : "bars"}}></i></button> */}
        <i
          className={`fa-lg fa-solid fa-angles-${show ? "left" : "right"}`}
        ></i>
      </div>

      <div className="sidebar">
        <div className="btn-team">
          <div className="position">
            <i class="fa-lg fa-solid fa-house"></i>
            <button onClick={navigatetoHome}>Home Page</button>
          </div>
          <div className="position">
            <i class="fa-lg fa-solid fa-users-rectangle"></i>
            <button onClick={navigateAndToggleSidebar}>Manage Team</button>
          </div>
          <div className="position">
            <i class="fa-lg fa-solid fa-user"></i>
            <button onClick={navigatetoemploye}> ManageEmployee</button>
          </div>
          <div className="position">
            <i class="fa-lg fa-solid fa-table"></i>
            <button onClick={navigatetomatrix}>Matrix</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
