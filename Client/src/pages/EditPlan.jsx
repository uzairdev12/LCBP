import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    name: "",
    price: 0,
    firstChain: 0,
    secondChain: 0,
    thirdChain: 0,
    fourthChain: 0,
    fifthChain: 0,
    boxlimit: 0,
    boxprice: 0,
    boxcooltime: 0,
    amountpkr: 0,
    _id: "",
  });
  const [loading, setLoading] = useState(false);

  // ${apiUrl}/api/plan/updateplan
  const change = async () => {
    try {
      if (!id) {
        throw new Error("Missing plan id");
      }
      setLoading(true);
      const plan = await fetch(`${apiUrl}/api/plan/updateplan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planid: id, plan: data }),
      });
      if (!plan) {
        throw new Error("Failed to update plan");
      }
      const result = await plan.json();
      if (!result) {
        throw new Error("Failed to parse plan update response");
      }
      if (!result.success) {
        throw new Error(result.message || "Unknown error");
      }
      toast.success("Plan updated successfully");
      setLoading(false);
      navigate("//lcbpadminssecretdashboard");
    } catch (e) {
      toast.error(e.message);
      return;
    }
  };
  const loadData = async () => {
    try {
      if (!id) {
        throw new Error("Missing plan id");
      }
      setLoading(true);
      const plan = await fetch(`${apiUrl}/api/plan/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planid: id }),
      });
      if (!plan) {
        throw new Error("Failed to fetch plan details");
      }
      const result = await plan.json();
      if (!result) {
        throw new Error("Failed to parse plan details");
      }
      if (!result.success) {
        throw new Error(result.message || "Unknown error");
      }
      if (!result.plan) {
        throw new Error("Missing plan details");
      }
      setData(result.plan);
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        padding: "50px 0",
        gap: "10px",
      }}
    >
      <h1>Edit PLan</h1>
      <label htmlFor="name" style={{ margin: "0" }}>
        Name
      </label>
      <input
        type="text"
        id="name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <label htmlFor="price" style={{ margin: "0" }}>
        Price
      </label>
      <input
        type="number"
        value={data.price}
        id="price"
        onChange={(e) => setData({ ...data, price: e.target.value })}
      />

      <label htmlFor="amountpkr" style={{ margin: "0" }}>
        Amount in PKR
      </label>
      <input
        type="number"
        id="amountpkr"
        value={data.amountpkr}
        onChange={(e) => setData({ ...data, amountpkr: e.target.value })}
      />

      <label htmlFor="firstChain" style={{ margin: "0" }}>
        First Chain
      </label>
      <input
        type="number"
        id="firstChain"
        value={data.firstChain}
        onChange={(e) => setData({ ...data, firstChain: e.target.value })}
      />

      <label htmlFor="secondChain" style={{ margin: "0" }}>
        Second Chain
      </label>
      <input
        type="number"
        id="secondChain"
        value={data.secondChain}
        onChange={(e) => setData({ ...data, secondChain: e.target.value })}
      />

      <label htmlFor="thirdChain" style={{ margin: "0" }}>
        Third Chain
      </label>
      <input
        type="number"
        value={data.thirdChain}
        id="thirdChain"
        onChange={(e) => setData({ ...data, thirdChain: e.target.value })}
      />

      <label htmlFor="fourthChain" style={{ margin: "0" }}>
        Fourth Chain
      </label>
      <input
        type="number"
        id="fourthChain"
        value={data.fourthChain}
        onChange={(e) => setData({ ...data, fourthChain: e.target.value })}
      />

      <label htmlFor="fifthChain" style={{ margin: "0" }}>
        Fifth Chain
      </label>
      <input
        type="number"
        id="fifthChain"
        value={data.fifthChain}
        onChange={(e) => setData({ ...data, fifthChain: e.target.value })}
      />

      <label htmlFor="boxlimit" style={{ margin: "0" }}>
        Box Limit
      </label>
      <input
        type="number"
        id="boxlimit"
        value={data.boxlimit}
        onChange={(e) => setData({ ...data, boxlimit: e.target.value })}
      />

      <label htmlFor="boxprice" style={{ margin: "0" }}>
        Box Price
      </label>
      <input
        type="number"
        value={data.boxprice}
        id="boxprice"
        onChange={(e) => setData({ ...data, boxprice: e.target.value })}
      />

      <label htmlFor="boxcooltime" style={{ margin: "0" }}>
        Box Cool Time
      </label>
      <input
        type="number"
        value={data.boxcooltime}
        id="boxcooltime"
        onChange={(e) => setData({ ...data, boxcooltime: e.target.value })}
      />
      <button onClick={change}>Update</button>
    </div>
  );
};

export default EditPlan;
