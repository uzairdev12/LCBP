import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./help.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Help = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState();
  const [text, setText] = useState("");
  const [chatidinput, setChatidinput] = useState("");
  const storedID = localStorage.getItem("chatid");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [chatid, setChatid] = useState("");
  const [loading, setLoading] = useState(false);
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
        }),
      });
      let result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "internal server error");
        return;
      }
      setMessages([...messages, { user: true, text }]);
      setText("");
    } catch (e) {
      toast.error(e.message || "internal server error");
    }
  };
  const openChat = async () => {
    if (chatidinput === "" && !storedID) {
      toast.error("Please enter a chat id");
      return;
    }
    try {
      setLoading(true);
      const usedid = storedID || chatidinput;
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
      console.log(result);
      if (!res.ok) {
        toast.error(result.message || "internal server error");
        navigate("/");
        setLoading(false);
        return;
      }
      setMessages([...result.chat.messages]);
      setChatid(result.chat._id);
      localStorage.setItem("chatid", result.chat._id);
      setLoading(false);
    } catch (e) {
      toast.error(e.message || "internal server error");
      setLoading(false);
      navigate("/");
    }
  };
  let InitiateChat = async () => {
    try {
      let res = await fetch(`${apiUrl}/api/chat/initiate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "internal server error");
        return;
      }

      setMessages([...result.newChat.messages]);
      setChatid(result.newChat._id);

      localStorage.setItem("chatid", result.newChat._id);
    } catch (e) {
      toast.error(e.message || "internl server error");
    }
  };
  const deletechat = async () => {
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
      setChatid("");
    } catch (e) {
      toast.error(e.message || "internal server error");
    }
  };
  useEffect(() => {
    if (storedID) {
      openChat();
    }
    const fetchChatsInterval = setInterval(() => {
      if (storedID) {
        openChat();
      }
    }, 10000);

    return () => clearInterval(fetchChatsInterval);
  }, []);

  return (
    <>
      {messages ? (
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
            Has your issue been solved ?{" "}
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
            {messages.map((message, index) => (
              <p
                className={message.user ? "message user" : "message"}
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
      ) : (
        <div className="askidpage">
          {loading ? (
            <>
              <div className="askIDbox">
                <h1>Loading...</h1>
              </div>
            </>
          ) : (
            <>
              <div className="askIDbox">
                <h1>LCBP HELP</h1>
                <div className="Back" onClick={() => navigate("/")}>
                  {" "}
                  <ArrowBackIcon />
                </div>
                <input
                  type="text"
                  placeholder="Enter Chat ID : "
                  onChange={(e) => setChatidinput(e.target.value)}
                  value={chatidinput}
                />
                <button onClick={() => openChat()}>Open Chat</button>
                <p>
                  Don't have a chat ?{" "}
                  <span
                    onClick={() => {
                      InitiateChat();
                    }}
                  >
                    Start a chat
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Help;
