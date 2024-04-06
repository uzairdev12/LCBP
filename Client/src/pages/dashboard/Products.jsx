import React, { useEffect, useState } from "react";
import "./products.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./users.css";
import "./products.css";
import img1 from "./img1.jpg";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "sonner";

const Products = ({ show }) => {
  const [showdropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    amountpkr: "",
    firstChain: "",
    secondChain: "",
    thirdChain: "",
    fourthChain: "",
    fifthChain: "",
    boxlimit: "",
    boxprice1: "",
    boxprice2: "",
    boxprice3: "",
    boxcooltime: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [plansloading, setPlansLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const load = async () => {
    try {
      if (!apiUrl) {
        throw new Error("apiUrl is null or undefined");
      }
      setPlansLoading(true);
      const response = await fetch(`${apiUrl}/api/plan/plans`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!result || !result.success) {
        const errorMessage = result?.message || "Unknown error";
        throw new Error(errorMessage);
      }
      setPlans(result.plans);
      console.log(result.plans);
      setPlansLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setPlansLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [reload]);

  const addPlan = async () => {
    if (
      data.name === "" ||
      data.price === "" ||
      data.firstChain === "" ||
      data.secondChain === "" ||
      data.thirdChain === "" ||
      data.fourthChain === "" ||
      data.fifthChain === "" ||
      !data.boxlimit > 0 ||
      !data.boxprice1 > 0 ||
      !data.boxprice2 > 0 ||
      !data.boxprice3 > 0 ||
      !data.boxcooltime > 0 ||
      !data.amountpkr > 0
    ) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      let response = await fetch(`${apiUrl}/api/plan/addplan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        setLoading(false);
      } else {
        toast.success("Plan added");
        setReload((prev) => !prev);
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

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
        <input
          placeholder="Plan name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          type="text"
          className="addplaninput"
        />
        <input
          placeholder="Plan price in $"
          type="number"
          className="addplaninput"
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
        />

        <input
          placeholder="Price in pkr"
          type="text"
          className="addplaninput"
          value={data.amountpkr}
          onChange={(e) => setData({ ...data, amountpkr: e.target.value })}
        />
        <input
          placeholder="1st chain reffer"
          type="text"
          value={data.firstChain}
          onChange={(e) => setData({ ...data, firstChain: e.target.value })}
          className="addplaninput"
        />
        <input
          placeholder="2nd chain reffer"
          type="test"
          className="addplaninput"
          value={data.secondChain}
          onChange={(e) => setData({ ...data, secondChain: e.target.value })}
        />
        <input
          placeholder="3rd chain reffer"
          type="text"
          className="addplaninput"
          value={data.thirdChain}
          onChange={(e) => setData({ ...data, thirdChain: e.target.value })}
        />
        <input
          placeholder="4th chain reffer"
          type="text"
          className="addplaninput"
          value={data.fourthChain}
          onChange={(e) => setData({ ...data, fourthChain: e.target.value })}
        />

        <input
          placeholder="5th chain reffer"
          type="text"
          className="addplaninput"
          value={data.fifthChain}
          onChange={(e) => setData({ ...data, fifthChain: e.target.value })}
        />
        <input
          placeholder="Box Limit"
          type="number"
          className="addplaninput"
          value={data.boxlimit}
          onChange={(e) => setData({ ...data, boxlimit: e.target.value })}
        />

        <input
          placeholder="Box cool time"
          type="text"
          className="addplaninput"
          value={data.boxcooltime}
          onChange={(e) => setData({ ...data, boxcooltime: e.target.value })}
        />

        <input
          placeholder="Box price 1"
          type="text"
          className="addplaninput"
          value={data.boxprice1}
          onChange={(e) => setData({ ...data, boxprice1: e.target.value })}
        />

        <input
          placeholder="Box Price 2"
          type="text"
          className="addplaninput"
          value={data.boxprice2}
          onChange={(e) => setData({ ...data, boxprice2: e.target.value })}
        />

        <input
          placeholder="Box Price 3"
          type="text"
          className="addplaninput"
          value={data.boxprice3}
          onChange={(e) => setData({ ...data, boxprice3: e.target.value })}
        />
        <button className="addplaninput" onClick={addPlan}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
      <div className="UserDetailsProducts" style={{ marginTop: "10px" }}>
        <>
          {plansloading ? (
            <p>Loading...</p>
          ) : (
            plans.map((e, index) => {
              return (
                <div
                  className="single-product"
                  style={{ cursor: "pointer" }}
                  key={index}
                >
                  <div className="content">
                    <h1>{e.name}</h1>
                    <h1>${e.price}</h1>
                    <hr />
                    <p>1st chain : {e.firstChain}%</p>
                    <p>2nd chain : {e.secondChain}%</p>
                    <p>3rd chain : {e.thirdChain}%</p>
                    <p>4th chain : {e.fourthChain}%</p>
                    <p>5th chain : {e.fifthChain}%</p>
                  </div>
                </div>
              );
            })
          )}
        </>
      </div>
    </div>
  );
};

export default Products;
