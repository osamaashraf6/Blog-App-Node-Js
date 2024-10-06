import React from 'react'
import { Link } from "react-router-dom";
import '../register/Registerr.scss';

const Loginn = () => {
  return (
    <>
      <h3 className='login-heading'>Login</h3>
      <section className="register" id="register">
      
        <div className="wrapper">
          <form>
            <div>
              <input type="text" name="text" placeholder="Username" />
            </div>
            <div>
              <input type="password" name="password" placeholder="Password" />
            </div>
          </form>
          <button>Login</button>
          <span>Don't you have an account? </span>
          <Link to="/">Register.</Link>
        </div>
      </section>
    </>
  )
}

export default Loginn
