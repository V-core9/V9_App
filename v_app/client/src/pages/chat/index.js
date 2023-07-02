import styles from './styles.module.css';
import RoomAndUsersColumn from './room-and-users';
import SendMessage from './send-message';
import MessagesReceived from './messages';
import { useNavigate } from 'react-router-dom';

const Chat = ({ username, room, socket }) => {
  const navigate = useNavigate();

  if (!username || !room) navigate('/', { replace: true });

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
