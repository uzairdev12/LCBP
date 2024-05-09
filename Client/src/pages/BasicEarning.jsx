import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./basic.css";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BasicEarning = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const getData = async () => {
    try {
      setLoading(true);
      let res = await fetch(`${apiUrl}/api/auth/getplan`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: localStorage.getItem("AUTHUSERUNIQUEID"),
        }),
      });
      let response = await res.json();
      if (!response.success) {
        toast.error(response.message);
        navigate("/");
        setLoading(true);
      } else {
        if (response.plan) {
          navigate("/userdashboard");
          console.log(response);
        } else {
          const response = await fetch(`${apiUrl}/api/plan/plans`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              id: localStorage.getItem("AUTHUSERUNIQUEID"),
            }),
          });
          const result = await response.json();
          if (result.banned) {
            localStorage.clear();
            navigate("/login");
            return;
          }
          if (!result || !result.success) {
            const errorMessage = result?.message || "Unknown error";
            throw new Error(errorMessage);
          }
          setPlans(result.plans);
          setLoading(false);
        }
      }
    } catch (e) {
      toast.error(e.message);
      navigate("/");
      setLoading(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const buyfreeplan = async (id) => {
    try {
      setLoading(true);
      let res = await fetch(`${apiUrl}/api/request/freeplan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: localStorage.getItem("AUTHUSERUNIQUEID"),
          planid: id,
        }),
      });
      let response = await res.json();
      if (!response.success) {
        toast.error(response.message);
        setLoading(false);
      } else {
        toast.success("Plan purchased successfully");
        navigate("/userdashboard");
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="BasicEarning">
      <div className="Back" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
      <div className="plansWrapper">
        {loading ? (
          <div className="loaderwrapper">
            <TailSpin
              visible={true}
              height="50"
              width="50"
              color="#000000"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <>
            <h1 className="plansHeading">Plans</h1>
            <div className="UserDetailsProducts" style={{ marginTop: "10px" }}>
              {plans.map((e, index) => (
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
                    <button
                      className="buyButton"
                      onClick={() => {
                        if (e._id === "663cd56b1dd7cbf8accae981") {
                          buyfreeplan(e._id);
                        } else {
                          navigate(`/buyPlan/${e._id}`);
                        }
                      }}
                    >
                      Buy Now !
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BasicEarning;
