const { CHAT_BOT } = require('../createWsEventsHandlers');
const leaveRoom = require('../utils/leave-room');

const leave_room = (io, socket, setChatRoom, setAllUsers, chatRoom, allUsers) => (data) => {
  const { username, room } = data;
  socket.leave(room);
  const created_at = Date.now();
  // Remove user from memory
  const newAllUsers = leaveRoom(socket.id, allUsers);
  setAllUsers(newAllUsers);
  socket.to(room).emit('chatroom_users', newAllUsers);
  socket.to(room).emit('receive_message', {
    username: CHAT_BOT,
    message: `${username} has left the chat`,
    created_at,
  });
  console.log(`${username} has left the chat`);
};

module.exports = leave_room;
