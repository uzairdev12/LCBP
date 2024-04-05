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
import Pricing from "../Pricing";

const Products = ({ show }) => {
  const [showdropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState("None");

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
          <div className="selected">
            <p>
              Add new <AddIcon style={{ marginLeft: "5px" }} />
            </p>
          </div>
        </div>
      </div>
      {/* <div className="UserDetailsProducts" style={{ marginTop: "10px" }}>
        <>
          <div className="addProduct">
            <p>Add new product</p>
            <AddIcon />
          </div>
          {[1, 2, 3, 4, 5, 6, 7].map((e, index) => {
            return (
              <div
                className="single-product"
                style={{ cursor: "pointer" }}
                key={index}
              >
                <div className="product-img">
                  <img className="img-fluid w-100" src={img1} alt="" />
                </div>
                <div className="product-btm">
                  <a className="d-block">
                    <h4>Minimalistic headphones for gaming</h4>
                  </a>
                  <div className="mt-3">
                    <span className="mr-4">$19.00</span>
                    <p className="cat">Electronic</p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      </div> */}
      <div className="pricingDiv">
        <Pricing />
      </div>
    </div>
  );
};

export default Products;
