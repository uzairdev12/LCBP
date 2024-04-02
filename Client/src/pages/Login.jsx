import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login = () => {
  let [active, setActive] = useState(true);
  let [active2, setActive2] = useState(false);
  const userID = localStorage.getItem("AUTHUSERUNIQUEID");
  const navigate = useNavigate();

  let [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  let { id } = useParams();

  useEffect(() => {
    if (userID) {
      navigate("/");
    }
  });

  const login = async () => {
    try {
      if (data.email && data.password) {
        let res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        let result = await res.json();

        if (!res.ok || res.success === false) {
          toast.error(result.message);
          return;
        }
        toast.success("Logged in successfully");
        console.log(result);
        localStorage.setItem("AUTHUSERUNIQUEID", result.user._id);
        navigate("/dashboard");
      } else {
        toast.error("Please fill all the fields");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  function isValidUsername(username) {
    const regex = /^[a-zA-Z0-9]+$/;

    return regex.test(username);
  }

  const signup = async () => {
    try {
      if (
        data.name &&
        data.email &&
        data.username &&
        data.number &&
        data.password &&
        data.confirmPassword
      ) {
        if (data.password === data.confirmPassword) {
          if (!isValidUsername(data.username)) {
            toast.error("Username can only contain letters and numbers");
            return;
          }
          let res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              username: `@${data.username}`,
              phone: data.number,
              password: data.password,
              reffer: id,
            }),
          });

          let result = await res.json();

          if (!res.ok || res.success === false) {
            toast.error(result.message);
            return;
          }

          toast.success("Account created successfully");
          localStorage.setItem("AUTHUSERUNIQUEID", result.user._id);
          navigate("/dashboard");
        } else {
          toast.error("Passwords do not match");
        }
      } else {
        toast.error("Please fill all the fields");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="loginPage">
      <div className="Back" onClick={() => navigate("/")}>
        {" "}
        <ArrowBackIcon />
      </div>
      <div className={active ? "container" : "container active"} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Sign up</h1>
            <span>Create an LCBP Account</span>
            <input
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Username"
              value={data.username}
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <input
              type="number"
              placeholder="Phone Number"
              value={data.number}
              onChange={(e) => setData({ ...data, number: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                signup();
              }}
            >
              Sign Up
            </button>
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
            {active2 ? (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Phone Number"
                  value={data.number}
                  onChange={(e) => setData({ ...data, number: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                />{" "}
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                {
                  active2 ? signup() : login();
                }
              }}
            >
              {active2 ? "Sign Up" : "Log In"}
            </button>
            {active2 ? (
              <p className="ratherText">
                Already have an account?{" "}
                <a
                  onClick={() => setActive2(false)}
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Log in
                </a>
              </p>
            ) : (
              <p className="ratherText">
                Don't have an account?{" "}
                <a
                  onClick={() => setActive2(true)}
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </a>
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
