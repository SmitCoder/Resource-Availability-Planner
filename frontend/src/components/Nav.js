// import "../Css/Nav.css";
// import logo from "../Linde_logo.png";

// function Nav() {
//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-text">
//           <div>
//             <p className="para">Linde Engineering</p>
//           </div>
//           <div>
//             <img
//               className="logo"
//               src={logo}
//               alt="making our world more productive"
//             />
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Nav;

import "../Css/Nav.css";
import logo from "../Linde_logo.png";
import media_logo from "../Images/linde-img.jpeg";

function Nav() {
  return (
    <>
      <header className="header">
        {/* <nav className="navbar"> */}
        {/* <div className="navbar-about">
          <ul>
            <li>
              <a href="#">About Linde</a>
            </li>
          </ul>
        </div> */}

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
        {/* </nav> */}
      <div className="home-icon">
        <i className="fa-solid fa-home"></i>
      </div>
      </header>
    </>
  );
}

export default Nav;
