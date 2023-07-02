import styles from "./styles.module.css";
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const created_at = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      // eslint-disable-next-line react/prop-types
      socket.emit("send_message", { username, room, message, created_at });
      setMessage("");
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          className={styles.messageInput}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
