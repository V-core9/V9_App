const leaveRoom = require('../utils/leave-room');

const disconnect = (io, socket, setChatRoom, setAllUsers, chatRoom, allUsers) => () => {
  console.log('User disconnected from the chat');
  const user = allUsers?.find((user) => user.id == socket.id);
  if (user?.username) {
    const newAllUsers = leaveRoom(socket.id, allUsers);
    setAllUsers(newAllUsers);
    socket.to(chatRoom).emit('chatroom_users', newAllUsers);
    socket.to(chatRoom).emit('receive_message', {
      message: `${user.username} has disconnected from the chat.`,
    });
  }
};

module.exports = disconnect;
