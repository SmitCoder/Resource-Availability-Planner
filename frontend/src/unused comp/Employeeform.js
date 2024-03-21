import React, { useEffect, useState } from "react";
import "../Css/Editing.css";

const Editing = ({ teamdata, teamId, onClose }) => {
  // Destructure props here
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ id: "2", name: "dsf" });

  useEffect(() => {
    setIsVisible(true); // Show the form once data is set
  }, [teamdata, teamId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    onClose();
  };

  const edit = async (e) => {
    e.preventDefault();
    try {
      console.log(" id in edit function" + teamId);
      const response = await fetch("http://localhost:5000/pushemployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, teamId }),

        // body: teamId,
      });
      if (response.ok) {
        console.log("Data submitted successfully");
        window.location.reload();
      } else {
        console.error("Failed to submit data");
      }
      setIsVisible(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`form-team ${isVisible ? "slide-in" : ""}`}>
      <form className="addform" onSubmit={edit}>
        <i className="fa-lg fa-solid fa-xmark" onClick={handleClose}></i>
        <div className="main-content">
          <div>
            <label className="name">ID: </label>
            <input
              type="text"
              className="inputforname"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="desc">Name: </label>
            <input
              type="text"
              required
              className="inputfordesc"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editing;
