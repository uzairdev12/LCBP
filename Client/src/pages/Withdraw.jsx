import React, { useState } from "react";
import { toast } from "sonner";

const Withdraw = ({ user }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    AccountPlatform: "",
    accountName: "",
    accountnum: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  function isValidNumber(inputString) {
    return /^\d+$/.test(inputString);
  }
  const withdrawamount = async () => {
    try {
      setLoading(true);
      if (!isValidNumber(data.amount)) {
        toast.error("Amount can only contain numbers");
        setLoading(false);
        return;
      }
      if (user.balance && data.amount > user.balance) {
        toast.error("Insufficient Balance");
        setLoading(false);
        return;
      }
      if (data.amount < 1395) {
        toast.error("Minimum withdraw amount is 5$ (1395 pkr)");
        return;
      }

      let response = await fetch(`${apiUrl}/api/withdraws/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userid: user._id,
          balance: user.balance,
          username: user.username,
        }),
      });
      const res = await response?.json();
      if (!res.success) {
        toast.error(res.message || "An unexpected error occured");
        setLoading(false);
        return;
      }

      toast.success(res.message);
      setLoading(false);
    } catch (e) {
      toast.error("An unexpected error occured");
      setLoading(false);
    }
  };

  return (
    <div className="mainrightpage" style={{ padding: "30px" }}>
      <div className="withdrawCard">
        <h1>Withdraw : </h1>
        <p>Account Balance : {user.balance || 0} pkr</p>
        <p>Withdraw fees 10% : {data.amount * 0.1 || 0} pkr</p>
        <p>Maximum time for withdrawal is 48 hours.</p>
        <input
          placeholder="Enter Amount"
          value={data.amount}
          onChange={(e) => setData({ ...data, amount: e.target.value })}
        />
        <input
          placeholder="Enter Account Name"
          value={data.accountName}
          onChange={(e) => setData({ ...data, accountName: e.target.value })}
        />
        <input
          placeholder="Enter Account Number"
          value={data.accountnum}
          onChange={(e) => setData({ ...data, accountnum: e.target.value })}
        />
        <input
          placeholder="Enter Account Platform"
          value={data.AccountPlatform}
          onChange={(e) =>
            setData({ ...data, AccountPlatform: e.target.value })
          }
        />
        {loading ? (
          <button>Loading...</button>
        ) : (
          <button onClick={withdrawamount}>Withdraw</button>
        )}
      </div>
    </div>
  );
};

export default Withdraw;
