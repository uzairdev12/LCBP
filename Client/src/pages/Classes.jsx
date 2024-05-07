import React, { useEffect, useState } from "react";
import "./classes.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Classes = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [classes, setClasses] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const getClasses = async () => {
    try {
      setloading(true);
      const response = await fetch(`${apiUrl}/api/class/getclasses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        setloading(false);
      } else {
        setClasses(data);
        setloading(false);
      }
    } catch (e) {
      toast.error(e.message);
      setloading(false);
    }
  };
  useEffect(() => {
    getClasses();
  }, []);
  const joinclass = async (classname, classlink) => {
    try {
      const result = await fetch(`${apiUrl}/api/class/joinclass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classname,
          userid: localStorage.getItem("AUTHUSERUNIQUEID"),
        }),
      });
      const data = await result.json();
      console.log(data);
      if (!result.ok) {
        toast.error(data.message);
      } else {
        window.open(classlink, "_blank");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="classpage">
      <div className="Back" onClick={() => navigate("/")}>
        {" "}
        <ArrowBackIcon />
      </div>
      <h1>Classes</h1>
      <p>Join a class</p>
      {loading ? (
        <h3>Loading...</h3>
      ) : classes.length === 0 ? (
        <h3>No classes found</h3>
      ) : (
        classes.map((item) => {
          return (
            <h5
              className="classLink"
              onClick={() => {
                if (item.live) {
                  joinclass(item.name, item.link);
                } else {
                  toast.error("This class is not live yet");
                }
              }}
            >
              {item.name}
            </h5>
          );
        })
      )}
    </div>
  );
};

export default Classes;
