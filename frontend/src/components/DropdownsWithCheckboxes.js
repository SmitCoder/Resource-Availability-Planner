import React, { useState } from "react";
// import { Multiselect } from "multiselect-react-dropdown";
import { useHistory, useNavigate } from "react-router-dom";

function DropdownsWithCheckboxes() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const toggleSidebar = () => {
    setShow(!show);
  };

  const navigateAndToggleSidebar = () => {
    navigate("/team");
    setShow(false); // Close the sidebar after navigating
  };

  return (
    <>
      <div className="btn-team">
        <button onClick={navigateAndToggleSidebar}>Manage Team</button>
      </div>
    </>
  );
}

export default DropdownsWithCheckboxes;
