const leaveRoom = require('./utils/leave-room');

const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room

const leave_room = (io, socket) => (data) => {
  const { username, room } = data;
  socket.leave(room);
  const created_at = Date.now();
  // Remove user from memory
  allUsers = leaveRoom(socket.id, allUsers);
  socket.to(room).emit('chatroom_users', allUsers);
  socket.to(room).emit('receive_message', {
    username: CHAT_BOT,
    message: `${username} has left the chat`,
    created_at,
  });
  console.log(`${username} has left the chat`);
};

const disconnect = (io, socket) => () => {
  console.log('User disconnected from the chat');
  const user = allUsers.find((user) => user.id == socket.id);
  if (user?.username) {
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(chatRoom).emit('chatroom_users', allUsers);
    socket.to(chatRoom).emit('receive_message', {
      message: `${user.username} has disconnected from the chat.`,
    });
  }
};

const createWsEventsHandlers = (io, socket) => [
  {
    eventName: 'send_message',
    method: require('./handlers/send_message')(io, socket),
  },
  {
    eventName: 'join_room',
    method: require('./handlers/join_room')(io, socket),
  },
  {
    eventName: 'leave_room',
    method: leave_room(io, socket),
  },
  {
    eventName: 'disconnect',
    method: disconnect(io, socket),
  },
];

module.exports = createWsEventsHandlers;

module.exports.CHAT_BOT = CHAT_BOT;
module.exports.chatRoom = chatRoom;
module.exports.allUsers = allUsers;
