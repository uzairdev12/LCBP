import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import "./chats.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Chatspage = () => {
  const [allowed, setAllowed] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const allowedstored = localStorage.getItem("ChatsAllowed");
  const [pass, setPass] = useState("");
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const fetchChats = async () => {
    try {
      console.log("hello");
      const res = await fetch(`${apiUrl}/api/chat/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (!response.success) {
        toast.error(response.message);
        return;
      } else {
        setChats(response.chats);
      }
    } catch (e) {
      toast.error(e.message);
      return;
    }
  };
  useEffect(() => {
    fetchChats();
    const fetchChatsInterval = setInterval(() => {
      if (allowed || allowedstored === "true") {
        fetchChats();
      }
    }, 10000);

    return () => clearInterval(fetchChatsInterval);
  }, [allowed, allowedstored]);
  return (
    <>
      {allowed || allowedstored === "true" ? (
        <div className="chatspage">
          <h1> Chats</h1>
          <div className="Back" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </div>
          {chats?.map((e, i) => (
            <div
              className="chat"
              key={i}
              onClick={() => navigate(`/helpuser/${e._id}`)}
            >
              <p>{e.messages[e.messages.length - 1].text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
            gap: "20px",
          }}
        >
          <p>Enter Password</p>
          <input
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            onClick={() => {
              if (pass === "lcbpchatspageadminaccess") {
                setAllowed(true);
                localStorage.setItem("ChatsAllowed", "true");
              } else {
                toast.error("Invalid Password");
              }
            }}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default Chatspage;
