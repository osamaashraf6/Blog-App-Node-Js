import React from "react";
import { Link } from "react-router-dom";
import './Navbar.scss';
const Navbar = () => {
  return (
    <>
      <nav className="nav" id="nav">
        <div className="container">
          <div className="parnav">
            <div className="brand">
              <Link to="/home">Blog App</Link>
            </div>
            <ul>
              <li>
                <Link to="">ART</Link>
              </li>
              <li>
                <Link to="">SCIENCE</Link>
              </li>
              <li>
                <Link to="">TECHNOLOGY</Link>
              </li>
              <li>
                <Link to="">CINEMA</Link>
              </li>
              <li>
                <Link to="">DESIGN</Link>
              </li>
              <li>
                <Link to="">FOOD</Link>
              </li>
            </ul>
            <div className="user">
              <span>John</span>
              <span>Login</span>
              <span>Logout</span>
             <Link to="/write">Write</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
