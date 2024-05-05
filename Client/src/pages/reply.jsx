import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./help.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Reply = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const chatid = useParams().id;
  const sendMessage = async () => {
    if (!text) {
      toast.error("Please enter a message");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/api/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatid,
          message: text,
          admin: true,
        }),
      });
      let result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "internal server error");
        return;
      }
      setMessages([...messages, { user: false, text }]);
      setText("");
    } catch (e) {
      toast.error(e.message || "internal server error");
    }
  };
  const openChat = async () => {
    try {
      const usedid = chatid;
      const res = await fetch(`${apiUrl}/api/chat/getchat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: usedid,
        }),
      });
      let result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "internal server error");
        navigate("/");
        return;
      }
      setMessages([...result.chat.messages]);
    } catch (e) {
      toast.error(e.message || "internal server error");
      navigate("/");
    }
  };

  const deletechat = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this chat? This action cannot be undone."
      )
    )
      return;
    localStorage.removeItem("chatid");
    setMessages(null);
    try {
      let res = await fetch(`${apiUrl}/api/chat/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: chatid,
        }),
      });
      let result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "internal server error");
        return;
      }
      navigate("/lcbpadminssecretchatspage");
    } catch (e) {
      toast.error(e.message || "internal server error");
    }
  };
  useEffect(() => {
    openChat();
    const fetchChatsInterval = setInterval(() => {
      openChat();
    }, 10000);

    return () => clearInterval(fetchChatsInterval);
  }, []);

  return (
    <>
      <div className="helpPage">
        <h1>LCBP Help</h1>
        <p>
          {" "}
          Your chat id is :{" "}
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {chatid}
          </span>
        </p>
        <p className="issuesolved">
          Has their issue been solved ?{" "}
          <span
            className="link"
            onClick={() => {
              deletechat();
            }}
          >
            Yes
          </span>
        </p>
        <div className="Back" onClick={() => navigate("/")}>
          {" "}
          <ArrowBackIcon />
        </div>
        <div className="messages">
          {messages?.map((message, index) => (
            <p
              className={!message.user ? "message user" : "message"}
              key={index}
            >
              <span className="text">{message.text}</span>
            </p>
          ))}
        </div>
        <div className="inputDiv">
          <input
            type="text"
            placeholder="Explain your problem..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Reply;
