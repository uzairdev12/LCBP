import React, { useEffect, useState } from "react";
import "./users.css";
import pfp from "./pfp.jpg";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import img1 from "./img1.jpg";
import { Button } from "@mui/material";

const Users = ({ show, scroll }) => {
  const [details, setDetails] = useState(false);

  return (
    <div>
      {details ? (
        <>
          <ArrowBackIcon
            style={{
              marginBottom: "10px",
              fontSize: "2.5rem",
              cursor: "pointer",
              color: "rgb(90, 90, 90)",
            }}
            onClick={() => {
              setDetails(false);
              scroll();
            }}
          />
          <div className="userDetailsImage">
            <img src={pfp} />
          </div>
          <div className="text">
            <h1 className="userDetailsHeading">Uzair Manan</h1>
            <p className="userDetailsEmail">uzairmanan3@gmail.som</p>
            <h2 className="orderedHeading">Plan : Basic</h2>
            <h2 className="orderedHeading">referrals : 15</h2>
            <h2 className="orderedHeading">2nd chain : 15</h2>
            <h2 className="orderedHeading">3rd chain : 15</h2>
            <h2 className="orderedHeading">4th chain : 15</h2>
            <h2 className="orderedHeading">5th chain : 15</h2>
            <h2 className="orderedHeading">6th chain : 15</h2>
            <button className="deleteButton">Delete</button>
          </div>
        </>
      ) : (
        <>
          <MenuOpenIcon
            className="DashboardMenuIcon"
            style={{
              margin: "0",
              padding: "0",
              transform: "rotate(180deg)",
              color: "black",
              fontSize: "2.5rem",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              show();
            }}
          />
          <h1 className="usersheading">Users</h1>
          <div className="headings">
            <h3 className="image">Image</h3>
            <h3 className="name">Name</h3>
            <h3 className="email">Email</h3>
            <h3 className="ordered">Plan</h3>
          </div>
          {[1, 2, 3, 4, 5, 6].map((e, index) => {
            return (
              <div
                className="usercard"
                onClick={() => {
                  setDetails(true);
                  scroll();
                }}
                title="Click to see more"
                key={index}
              >
                <div className="userimage">
                  <img src={pfp} />
                </div>
                <p className="usersname">Uzair Manan</p>
                <p className="useremail" style={{ color: "rgb(90, 90, 90)" }}>
                  uzairmanan3@gmail.com
                </p>
                <p className="ordered" style={{ color: "rgb(90, 90, 90)" }}>
                  prosperity
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Users;
