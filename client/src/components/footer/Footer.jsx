import React from "react";
import { Link } from "react-router-dom";
import './Footer.scss';
const Footer = () => {
  return (
    <>
      <footer className="footer" id="footer">
        <div className="container">
          <div className="parfoot">
            <div className="brand">
              <Link to="/home">Blog App</Link>
            </div>
            <div className="maufacturer">Made with ❣️and React.js</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
