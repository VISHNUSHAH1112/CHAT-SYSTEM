import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { addMessage } from "../Slice/ChatSlice";

const socket = io("http://localhost:5000"); // backend ka URL

function ChatApp() {
  const [input, setInput] = useState("");
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  // Jab server se naya message aaye
  useEffect(() => {
    socket.on("chat:message", (msg) => {
      dispatch(addMessage(msg));
    });
    return () => socket.off("chat:message");
  }, [dispatch]);

  // Message send karna
  const sendMessage = () => {
    if (input.trim()) {
      const newMsg = { text: input, sender: "You" };
      socket.emit("chat:message", newMsg);
      dispatch(addMessage(newMsg));
      setInput("");
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto", padding: "20px" }}>
      <h2>💬 Chat Room</h2>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        style={{ width: "80%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button style={{ width: "18%" }} onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default ChatApp;
