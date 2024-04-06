import React from "react";
import logo from "../images/logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="Back" onClick={() => navigate("/profile")}>
        <ArrowBackIcon />
      </div>
      <div className="sidebar">
        <div className="logoimg">
          <img src={logo} alt="logo" />
        </div>
        <div className="links">
          <p>Dashboard</p>
          <p>Referrals</p>
          <p>Balance</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
