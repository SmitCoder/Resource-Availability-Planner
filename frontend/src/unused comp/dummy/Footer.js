import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="Tabs">
        <div>
          <Link to="/" className="excel-tab-button">
            <span className="excel-tab-label">Monthly</span>
          </Link>
        </div>
        <div>
          <Link to="/quaterly" className="excel-tab-button">
            <span className="excel-tab-label">Quaterly</span>
          </Link>
        </div>
        <div>
          <Link to="/yearly" className="excel-tab-button">
            <span className="excel-tab-label">Yearly</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
