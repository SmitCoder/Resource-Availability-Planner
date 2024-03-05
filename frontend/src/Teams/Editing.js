import React, { useEffect, useState } from "react";
import "../Css/Editing.css";
import axios from "axios";

const Editing = ({ teamdata, teamId, onClose }) => {
  // Destructure props here
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [depts, setdepts] = useState([]);

  useEffect(() => {
    fetchdepts();
    setIsVisible(true); // Show the form once data is set
  }, [teamdata, teamId]);

  const fetchdepts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/depts");
      console.log(response.data.recordsets[0]);
      setdepts(response.data.recordsets[0]);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
      const response = await fetch("http://localhost:5000/teamss", {
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
            <label className="name">Name: </label>
            <input
              type="text"
              className="inputforname"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="desc">Description: </label>
            <input
              type="text"
              required
              className="inputfordesc"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <label className="selection">Employees:</label>
            {/* <select>
              <option>A</option>
              <option>
                B
                <select>
                  <option>B</option>
                  <option>C</option>
                </select>
              </option>
            </select> */}
          {/* <select value={depts}>
              <option value="">Select</option>
              {depts.map((item, index) => (
                <option key={index}>{item.deptcode}</option>
              ))}
            </select>
          // </div> */}{" "}
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editing;
