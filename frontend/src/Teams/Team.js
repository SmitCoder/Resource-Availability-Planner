import React, { useEffect, useState } from "react";
import "../Css/Team.css";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Editing from "../Teams/Editing";
import {
  detectKeyDown,
} from "../components/handleFunction";

const Team = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // const [selectedTeamId, setSelectedTeamId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTeamsData();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => detectKeyDown(e, closeModal));
    return () => {
      document.removeEventListener("keydown", (e) =>
        detectKeyDown(e, closeModal)
      );
    };
  }, []);
  const fetchTeamsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/teamdata");
      setData(response.data.recordsets[0]);
      console.log(response.data.recordsets[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = ()=>{
    setShowForm(false)
  }
  const openform = ( teamid , team_Name) => {

  // setShowForm(!showForm);
    navigate("/matrix", { state: { teamid , team_Name } });
    console.log(teamid);
    console.log(team_Name);
  };

  const openEditing = ()=>{
console.log("clicked");
setShowForm(!showForm)
  }
  const closeForm = () => {
    setShowForm(false); // Close the form
  };

  const deleteTeam = (teamid)=>{
    console.log(teamid);
  try {
    const response = axios.post("http://localhost:5000/deleteTeam" , {teamid})
    if(response.status === 200)
    {
      console.log("Team Deleted Successfully");
    }
    window.location.reload()
  } catch (error) {
    console.log("error deleting team");
  }
  }
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
            onClick={() => openEditing()}
          >
            Add Team
          </button>
          {/* <button color="primary" className="delete">
            Delete
          </button> */}
        </div>
      </div>
      {showForm && (
        <Editing onClose={closeForm} />
      )}{" "}

      <div className="table-responsive">
        <table className="teams-table">
          <thead>
            <tr>
           
              <th>Name</th>
              {/* <th>Description</th> */}
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((team) => (
              <tr key={team.id}>
          
                <td>
                  {team.Name}
                </td>
                {/* <td>{team.Name}</td> */}
                <td>{team.Description}</td>
   
                <td>
                  <i className="fa-solid fa-pen" onClick={() => openform( team.Team_id , team.Name)}></i>
                    {/* <EditIcon style={{ height: "20px" }} */}
                  
                  
                  <i className="fa-solid fa-trash" onClick={()=>deleteTeam(team.Team_id)}></i>
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

