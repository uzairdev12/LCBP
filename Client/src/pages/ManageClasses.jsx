import React, { useEffect, useState } from "react";
import "./classes.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Classesb = () => {
  const navigate = useNavigate();
  const [showinput, setshowinput] = useState(false);
  const [input, setinput] = useState("");
  const [loading, setloading] = useState(false);
  const [classes, setClasses] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const addclass = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/class/addclass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setshowinput(!showinput);
        getClasses();
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
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
        console.log(data.message);
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
  return (
    <div className="classpage">
      <div className="Back" onClick={() => navigate(-1)}>
        {" "}
        <ArrowBackIcon />
      </div>
      {showinput ? (
        <div className="addClass">
          <div className="Back" onClick={() => setshowinput(!showinput)}>
            {" "}
            <ArrowBackIcon />
          </div>
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setinput(e.target.value)}
            value={input}
          />
          <button onClick={addclass}>Add</button>
        </div>
      ) : null}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Manage Classes</h1>
          <p>Manage all classes here class</p>
          <h5 className="classLink red" onClick={() => navigate(`/cutfines`)}>
            Cut fines
          </h5>
          <h5 className="classLink" onClick={() => setshowinput(!showinput)}>
            <AddIcon />
          </h5>
          <p>Classes : </p>
          {classes.map((item) => (
            <h5
              className="classLink"
              onClick={() => navigate(`/manageclass/${item._id}`)}
              key={item._id}
            >
              {item.name}
            </h5>
          ))}
        </>
      )}
    </div>
  );
};

export default Classesb;
