import React, { useState } from "react";
import "./products.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./users.css";
import "./products.css";
import img1 from "./img1.jpg";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";

const Products = ({ show }) => {
  const [showdropdown, setShowDropdown] = useState(false);

  return (
    <div>
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
      <h1 className="usersheading" style={{ marginTop: "40px" }}>
        Plans
      </h1>
      <div className="sort">
        <div className="dashboarddropdown" style={{ zIndex: "10" }}>
          <div
            className="selected"
            onClick={() => {
              setShowDropdown((prev) => !prev);
            }}
          >
            <p>
              Add new{" "}
              <AddIcon
                style={
                  showdropdown
                    ? { marginLeft: "5px", rotate: "45deg" }
                    : { marginLeft: "5px" }
                }
              />
            </p>
          </div>
        </div>
      </div>
      <div
        className="addplan"
        style={showdropdown ? { display: "block" } : { display: "none" }}
      >
        <h1>Add a new plan</h1>
        <input placeholder="Plan name" type="text" className="addplaninput" />
        <input
          placeholder="Plan price"
          type="number"
          className="addplaninput"
        />
        <input
          placeholder="1st chain reffer"
          type="text"
          className="addplaninput"
        />
        <input
          placeholder="2nd chain reffer"
          type="test"
          className="addplaninput"
        />
        <input
          placeholder="3rd chain reffer"
          type="text"
          className="addplaninput"
        />
        <input
          placeholder="4th chain reffer"
          type="text"
          className="addplaninput"
        />
        <input
          placeholder="5th chain reffer"
          type="text"
          className="addplaninput"
        />
      </div>
      <div className="UserDetailsProducts" style={{ marginTop: "10px" }}>
        <>
          {[1, 2, 3, 4, 5, 6, 7].map((e, index) => {
            return (
              <div
                className="single-product"
                style={{ cursor: "pointer" }}
                key={index}
              >
                <div className="content">
                  <h1>Basic</h1>
                  <h1>Rs 5000</h1>
                  <hr />
                  <p>1st chain : 40%</p>
                  <p>2nd chain : 30%</p>
                  <p>3rd chain : 30%</p>
                  <p>4th chain : 10%</p>
                  <p>5th chain : 5%</p>
                </div>
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default Products;
