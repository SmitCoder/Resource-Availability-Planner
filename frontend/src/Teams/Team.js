import React, { useEffect, useState } from "react";
import "../Css/Team.css";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Editing from "../Teams/Editing";

const Team = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  useEffect(() => {
    fetchTeamsData();
  }, []);

  const fetchTeamsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/teams");
      setData(response.data.recordsets[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const openform = (teamId) => {
    // setShowForm(!showForm);
    setShowForm(!showForm);
    setSelectedTeamId(teamId);
    // setShowForm(!showForm);
    // console.log(selectedTeamId);
    // console.log("clicked");

    // setData(data); // Set the selected team ID
  };
  const closeForm = () => {
    setShowForm(false); // Close the form
  };
  return (
    <>
      <div className="header-container">
        <div className="title">
          <h1>
            Manage <b>Teams</b>
          </h1>
        </div>
        <div className="btns">
          <button
            color="success"
            className="add"
            onClick={() => openform(null)}
          >
            Add Team
          </button>
          <button color="primary" className="delete">
            Delete
          </button>
        </div>
      </div>
      {showForm && (
        <Editing teamId={selectedTeamId} teamdata={data} onClose={closeForm} />
      )}{" "}
      {/* Pass the teamId to Editing */}
      <div className="table-responsive">
        <table className="teams-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((team) => (
              <tr key={team.id}>
                <td>{team.Teamid}</td>
                <td>{team.Name}</td>
                <td>{team.Description}</td>
                <td>
                  <button onClick={() => openform(team.id)}>
                    {" "}
                    {/* Pass team id to toggleForm */}
                    <EditIcon style={{ height: "20px" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Team;
