import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "./referrals.css";

const Referrals = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("LCBPUSERNAME");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [referrs, setReferrs] = React.useState(0);
  const [chainTwo, setChainTwo] = React.useState(0);
  const [chainThree, setChainThree] = React.useState(0);
  const [chainFour, setChainFour] = React.useState(0);
  const [chainFive, setChainFive] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) {
          navigate("/login");
        } else {
          const res = await fetch(`${apiUrl}/api/auth/getReffers`, {
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
            console.log(result);
            let { referrs, chaintwo, chainthree, chainfour, chainfive } =
              result;

            setReferrs(referrs);
            setChainTwo(chaintwo);
            setChainThree(chainthree);
            setChainFour(chainfour);
            setChainFive(chainfive);
          }
        }
      } catch (e) {
        toast.error(e.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="referralsPage">
      <div className="Back" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
      <h1 className="MainHeading">Referrals</h1>
      <div className="link">
        <p>
          Your referral link :{" "}
          <span
            onClick={() => {
              window.location.href = `http://localhost:5173/login/${username}`;
            }}
          >
            http://localhost:5173/login/{username}
          </span>
        </p>
      </div>
      <div className="profileoptions">
        <div className="profileoption" onClick={() => navigate("/referrals")}>
          <h1 className="numbers">{referrs}</h1>
          <h1>Direct Referrals</h1>
        </div>
        <div className="profileoption">
          <h1 className="numbers">{chainTwo}</h1>
          <h1>Second chain Referrals</h1>
        </div>
        <div className="profileoption">
          <h1 className="numbers">{chainThree}</h1>
          <h1>Third Chain Referrals</h1>
        </div>
        <div className="profileoption">
          <h1 className="numbers">{chainFour}</h1>
          <h1>Fourth chain Referrals</h1>
        </div>
        <div className="profileoption">
          <h1 className="numbers">{chainFive}</h1>
          <h1>Fifth Chain Referrals</h1>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
