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
  const getstudents = async () => {
    try {
      setLoading(true);
      const result = await fetch(`${apiUrl}/api/class/getstudents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      setStudents(data);
      setLoading(false);
    } catch (e) {
      navigate("/");
      toast.error(e.message);
      setLoading(false);
    }
  };
  const fine = async () => {
    try {
      setLoading(true);
      console.log("request sent");
      const result = await fetch(`${apiUrl}/api/class/finestudents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ students }),
      });

      const data = await result.json();
      console.log(data);
      toast.success(data.message);
      navigate("/manageclasses");
      setLoading(false);
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
              fine();
            }}
          >
            Fine the students
          </p>
          <h1>Add User</h1>
          <div className="adduser">
            <input
              placeholder="username"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button
              onClick={() => {
                if (input === "") {
                  toast.error("Please enter username");
                } else {
                  if (input.split("")[0] !== "@") {
                    setStudents([
                      ...students,
                      { username: `@${input}`, classJoined: "Leave" },
                    ]);
                  } else {
                    setStudents([
                      ...students,
                      { username: input, classJoined: "Leave" },
                    ]);
                  }
                }
              }}
            >
              Add
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Class Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((e) => (
                <tr key={e.username}>
                  <td>{e.username}</td>
                  <td>{e.classJoined}</td>
                  <td
                    onClick={() => {
                      setStudents(students.filter((s) => s !== e));
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
