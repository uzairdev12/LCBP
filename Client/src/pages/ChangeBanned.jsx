import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./classes.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "sonner";

const CutFine = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [searchres, setSearchres] = useState([]);
  const [selected, setSelected] = useState([]);
  const getstudents = async () => {
    try {
      setLoading(true);
      const result = await fetch(`${apiUrl}/api/auth/getblocked`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      if (!data.success) {
        navigate("/");
        toast.error(data.message);
        setLoading(false);
      }
      setStudents(data.users);
      setLoading(false);
    } catch (e) {
      navigate("/");
      toast.error(e.message);
      setLoading(false);
    }
  };
  const change = async () => {
    try {
      if (selected.length === 0) {
        toast.error("No students selected");
        return;
      }
      const result = await fetch(`${apiUrl}/api/auth/changebanned`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selected }),
      });

      const data = await result.json();

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
      } else {
        toast.success(data.message);
        setLoading(false);
        window.location.reload();
      }
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getstudents();
  }, []);
  return (
    <div className="classpage">
      <div className="Back" onClick={() => navigate("/")}>
        {" "}
        <ArrowBackIcon />
      </div>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Cut Fine</h1>
          <p>
            These are the students that attended the classes today, so they
            won't be fined :
          </p>
          <p
            className="fine"
            onClick={() => {
              change();
            }}
          >
            Change
          </p>

          <div className="searchdiv">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Search"
            />
            <button
              onClick={() => {
                if (input === "") {
                  setSearchres([]);
                } else {
                  const newstudents = students.filter((e) =>
                    e.username.includes(input)
                  );
                  if (newstudents.length > 0) {
                    setSearchres(newstudents);
                  } else {
                    setSearchres([]);
                    toast.error("No result found");
                  }
                }
              }}
            >
              Search
            </button>
          </div>
          <p
            className="fine"
            onClick={() => {
              setSelected([]);
            }}
          >
            Deselect All
          </p>

          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchres.length > 0
                ? searchres.map((e) => (
                    <tr
                      key={e.username}
                      style={
                        selected.includes(e.username)
                          ? { backgroundColor: "green", color: "white" }
                          : { color: "black" }
                      }
                    >
                      <td>{e.username}</td>
                      <td
                        onClick={() => {
                          if (selected.includes(e.username)) {
                            const newSelected = selected.filter(
                              (item) => item !== e.username
                            );

                            setSelected(newSelected);
                          } else {
                            setSelected([...selected, e.username]);
                          }
                        }}
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          textDecoration: "underline",
                        }}
                      >
                        Remove
                      </td>
                    </tr>
                  ))
                : students.map((e) => (
                    <tr
                      key={e.username}
                      style={
                        selected.includes(e.username)
                          ? { backgroundColor: "green", color: "white" }
                          : { color: "black" }
                      }
                    >
                      <td>{e.username}</td>
                      <td
                        onClick={() => {
                          if (selected.includes(e.username)) {
                            const newSelected = selected.filter(
                              (item) => item !== e.username
                            );
                            setSelected(newSelected);
                          } else {
                            setSelected([...selected, e.username]);
                          }
                        }}
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          textDecoration: "underline",
                        }}
                      >
                        Remove
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CutFine;
