/* eslint-disable react/prop-types */
import styles from "./styles.module.css";
import RoomAndUsersColumn from "./room-and-users";
import SendMessage from "./send-message";
import MessagesReceived from "./messages";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Chat = ({ username, room, socket }) => {
  const navigate = useNavigate();

  if (!username || !room) navigate("/", { replace: true });

  useEffect(() => {
    socket.emit("join_room", { username, room });
  }, []);

  return (
    <div className={styles.chatContainer}>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />

      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;
