import React, { useState } from "react";
import "./login.css";

const Login = () => {
  let [active, setActive] = useState(true);
  let [active2, setActive2] = useState(false);
  return (
    <div className="loginPage">
      <div className={active ? "container" : "container active"} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Sign up</h1>
            <span>Create an LCBP Account</span>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>{active2 ? "Sign up" : "Log In"}</h1>

            <span>
              {active2
                ? "Create an LCBP Account"
                : "Enter your username and password"}
            </span>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />

            <button>{active2 ? "Sign Up" : "Log In"}</button>
            {active2 ? (
              <p>
                Already have an account?{" "}
                <a onClick={() => setActive2(false)}>Log in</a>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <a onClick={() => setActive2(true)}>Sign Up</a>
              </p>
            )}
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Friend!</h1>
              <p>
                Sign up to access all the features of LCBP's learning and
                earning services.
              </p>
              <button
                className="hidden"
                id="login"
                onClick={() => setActive(true)}
              >
                Log in
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>
                Log in to access all the features of LCBP's learning and earning
                services.
              </p>
              <button
                className="hidden"
                id="register"
                onClick={() => setActive(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
