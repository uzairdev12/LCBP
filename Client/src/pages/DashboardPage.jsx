import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Dashboard = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("AUTHUSERUNIQUEID");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [refferLink, setRefferLink] = useState("");
  const [reffers, setReffers] = useState([]);
  const [chaintwo, setChaintwo] = useState([]);
  const [chainthree, setChainthree] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userid) {
          navigate("/login");
        } else {
          const res = await fetch("http://localhost:5000/api/auth/details", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: userid,
            }),
          });

          const result = await res.json();
          if (!res.ok || result.success === false) {
            toast.error(result.message);
            return;
          } else {
            setName(result.user.name);
            setUsername(result.user.username);
            setRefferLink(
              `http://localhost:5173/login/${result.user.username}`
            );
          }
        }
      } catch (e) {
        toast.error(e.message);
      }
    };

    fetchData();
  }, [userid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) {
          return;
        } else {
          const res = await fetch("http://localhost:5000/api/auth/getReffers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
            }),
          });

          const result = await res.json();
          if (!res.ok || result.success === false) {
            toast.error(result.message);
            return;
          } else {
            setReffers((prev) =>
              result.reffers ? [...prev, ...result.reffers] : prev
            );
            setChaintwo((prev) =>
              result.chaintwo ? [...prev, ...result.chaintwo] : prev
            );
            setChainthree((prev) =>
              result.chainthree ? [...prev, ...result.chainthree] : prev
            );
          }
        }
      } catch (e) {
        toast.error(e.message);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="dahboardPage">
      <div className="Back" onClick={() => navigate("/")}>
        {" "}
        <ArrowBackIcon />
      </div>
      <h1 className="DashboardHeading">Dashboard</h1>
      <h1>
        <span className="gradient">Name</span> : {name}
      </h1>
      <h1>
        <span className="gradient">UserName</span> : {username}
      </h1>
      <p className="refferLink">Reffer Link : {refferLink}</p>
      <h1 className="gradient">Reffers : </h1>
      <div className="userCards">
        {reffers.length > 0 ? (
          reffers.map((user, index) => (
            <div key={index} className={index === 0 ? "userCard1" : "userCard"}>
              <p>Name : {user.name}</p>
              <p>Username : {user.username}</p>
            </div>
          ))
        ) : (
          <p>No Reffers</p>
        )}
      </div>
      <h1 className="gradient">Chain Two : </h1>

      <div className="userCards">
        {chaintwo.length > 0 ? (
          chaintwo.map((user, index) => (
            <div key={index} className={index === 0 ? "userCard1" : "userCard"}>
              <p>Name : {user.name}</p>
              <p>Username : {user.username}</p>
            </div>
          ))
        ) : (
          <p>No Reffers</p>
        )}
      </div>
      <h1 className="gradient">Chain Three : </h1>

      <div className="userCards">
        {chainthree.length > 0 ? (
          chainthree.map((user, index) => (
            <div key={index} className={index === 0 ? "userCard1" : "userCard"}>
              <p>Name : {user.name}</p>
              <p>Username : {user.username}</p>
            </div>
          ))
        ) : (
          <p>No Reffers</p>
        )}
      </div>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
        className="logout"
      >
        LogOut
      </button>
    </div>
  );
};

export default Dashboard;
