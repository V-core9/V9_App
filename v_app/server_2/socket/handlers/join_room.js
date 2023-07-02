const { CHAT_BOT } = require('../createWsEventsHandlers');

const join_room = (io, socket, setChatRoom, setAllUsers, chatRoom, allUsers) => (data) => {
  const { username, room } = data; // Data sent from client when join_room event emitted
  socket.join(room); // Join the user to a socket room

  let created_at = Date.now(); // Current timestamp
  // Send message to all users currently in the room, apart from the user that just joined
  socket.to(room).emit('receive_message', {
    message: `${username} has joined the chat room`,
    username: CHAT_BOT,
    created_at,
  });
  // Send welcome msg to user that just joined chat only
  socket.emit('receive_message', {
    message: `Welcome ${username}`,
    username: CHAT_BOT,
    created_at,
  });
  // Save the new user to the room
  setChatRoom(room);
  const newAllUsers = [...allUsers, { id: socket.id, username, room }];
  setAllUsers(newAllUsers);
  const chatRoomUsers = newAllUsers.filter((user) => user.room === room);
  socket.to(room).emit('chatroom_users', chatRoomUsers);
  socket.emit('chatroom_users', chatRoomUsers);

  // Get last 100 messages sent in the chat room
  socket.emit('last_100_messages', JSON.stringify([]));
  // harperGetMessages(room)
  //   .then((last100Messages) => {
  //     // console.log('latest messages', last100Messages);
  //     socket.emit('last_100_messages', last100Messages);
  //   })
  //   .catch((err) => console.log(err));
};

module.exports = join_room;
