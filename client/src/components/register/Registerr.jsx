import React from "react";
import { Link } from "react-router-dom";
import './Registerr.scss';
const Registerr = () => {
  return (
    <>
      <h3 className='register-heading'>Register</h3>
      <section className="register" id="register">
        <div className="wrapper">
          <form>
            <div>
              <input type="file" name="file" />
            </div>
            <div>
              <input type="text" name="text" placeholder="Username" />
            </div>
            <div>
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div>
              <input type="password" name="password" placeholder="Password" />
            </div>
          </form>
          <button>Register</button>
          <span>Do you have an account? </span>
          <Link to="/login">Login.</Link>
        </div>
      </section>
    </>
  );
};

export default Registerr;
