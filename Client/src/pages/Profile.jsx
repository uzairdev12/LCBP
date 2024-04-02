import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pfp from "../images/pfp.jpg";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SchoolIcon from "@mui/icons-material/School";

const Profile = () => {
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;
  const userid = localStorage.getItem("AUTHUSERUNIQUEID");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userid) {
          navigate("/login");
        } else {
          const res = await fetch(`${apiUrl}/api/auth/details`, {
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
            setEmail(result.user.email);
            setPhone(result.user.phone);
            localStorage.setItem(
              "refferLink",
              `${apiUrl}/login/${result.user.username}`
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
      <div className="info">
        <div className="profileImageContainer">
          <img src={pfp} alt="profile image" />
        </div>
        <div className="textContainer">
          <h1>{name}</h1>
          <p>{username}</p>
          <p>{email}</p>
          <p>{phone}</p>
          <button
            className="logout"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
          <div className="editIcon">
            <EditIcon />
          </div>
        </div>
      </div>
      <div className="profileoptions">
        <div className="profileoption" onClick={() => navigate("/referrals")}>
          <PersonIcon />
          <h1>Referrals</h1>
        </div>
        <div className="profileoption">
          <LocalAtmIcon />
          <h1>Basic Earning</h1>
        </div>
        <div className="profileoption">
          <MonetizationOnIcon />
          <h1>Professional Earning</h1>
        </div>
        <div className="profileoption">
          <SchoolIcon />
          <h1>Learn Skills</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
