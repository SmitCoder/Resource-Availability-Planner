

import "../Css/Nav.css";
import logo from "../Linde_logo.png";
import media_logo from "../Images/linde-img.jpeg";
import { Navigate , useNavigate } from "react-router";

function Nav() {
  const navigate = useNavigate();
  const navigateToHome = ()=>{
    navigate("/")
  }

  const navigateToTeam = ()=>{
    navigate("/team")
  }
  return (
    <>
      <header className="header">
    
        <div className="main_navbar">
          <div>
            <p className="para">
              <span>Linde </span>
              <span>Engineering</span>
            </p>
          </div>
          
          <div>
            <img
              className="logo"
              src={logo}
              alt="making our world more productive"
            />
            <img className="media_logo" src={media_logo} alt="" />
          </div>
       
        </div>
        <div className="home-icon">
        <i className="fa-solid fa-house" onClick={navigateToHome}></i>
        <i className="fa-solid fa-users-rectangle" onClick={navigateToTeam}></i>
        </div>
      
        {/* </nav> */}
      </header>
    </>
  );
}

export default Nav;
