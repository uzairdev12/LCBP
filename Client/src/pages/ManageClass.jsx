import React, { useEffect, useState } from "react";
import "./classes.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Classesc = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [classdetails, setClassdetails] = useState({});
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [input, setInput] = useState("");

  const getClassDetails = async () => {
    try {
      setloading(true);
      const response = await fetch(`${apiUrl}/api/class/getclassdetails`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        console.log(data.message);
        setloading(false);
      } else {
        setClassdetails(data.classdetails);
        console.log(data.classdetails);
        setloading(false);
      }
    } catch (e) {
      toast.error(e.message);
      setloading(false);
    }
  };
  const startClass = async () => {
    setloading(true);
    try {
      const res = await fetch(`${apiUrl}/api/class/startclass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          link: input,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);

        setloading(false);
      } else {
        toast.success(data.message);
        getClassDetails();
        setloading(false);
      }
    } catch (e) {
      toast.error(e.message);
      setloading(false);
    }
  };
  const endClass = async () => {
    setloading(true);
    try {
      const res = await fetch(`${apiUrl}/api/class/endclass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setloading(false);
      } else {
        toast.success(data.message);
        getClassDetails();
        setloading(false);
      }
    } catch (e) {
      toast.error(e.message);
      setloading(false);
    }
  };
  useEffect(() => {
    getClassDetails();
  }, []);
  return (
    <div className="classpage">
      <div className="Back" onClick={() => navigate(-1)}>
        {" "}
        <ArrowBackIcon />
      </div>
      {loading || !classdetails ? (
        <h1>Loading</h1>
      ) : classdetails.live ? (
        <>
          <h1>Class is live at the moment</h1>{" "}
          <p
            className="endClass"
            onClick={() => {
              endClass();
            }}
          >
            End Class
          </p>{" "}
        </>
      ) : (
        <>
          <h1>{classdetails.name}</h1>
          <input
            placeholder="Enter Class Link"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            style={{
              margin: "10px 0 10px 0",
            }}
            onClick={() => {
              if (input === "") {
                toast.error("Enter Class Link");
              } else {
                startClass();
              }
            }}
          >
            Start Class
          </button>
        </>
      )}
    </div>
  );
};

export default Classesc;
