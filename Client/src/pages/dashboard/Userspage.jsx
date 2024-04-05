import React, { useEffect, useState } from "react";
import "./users.css";
import pfp from "./pfp.jpg";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import img1 from "./img1.jpg";

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
          <h1 className="userDetailsHeading">Uzair Manan</h1>
          <p className="userDetailsEmail">uzairmanan3@gmail.som</p>
          <h2 className="orderedHeading">Cart :</h2>
          <div className="UserDetailsProducts">
            {[1, 2, 3, 4].map(() => {
              return (
                <div className="single-product" style={{ cursor: "pointer" }}>
                  <div className="product-img">
                    <img className="img-fluid w-100" src={img1} alt="" />
                  </div>
                  <div className="product-btm">
                    <a className="d-block">
                      <h4>Latest men’s sneaker</h4>
                    </a>
                    <div className="mt-3">
                      <span className="mr-4">$25.00</span>
                      <del style={{ marginLeft: "10px" }}>$35.00</del>
                    </div>
                  </div>
                </div>
              );
            })}
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
            <h3 className="ordered">Cart</h3>
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
                  3
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
  s;
};

export default Users;
