const send_message = (io, socket) => (data) => {
  console.info('ws:send_message', data);
  const { message, username, room, created_at } = data;
  io.in(room).emit('receive_message', data); // Send to all users in room, including sender

  //! Save message to database - - - - - - - - -
  // harperSaveMessage(message, username, room, created_at) // Save message in db
  //   .then((response) => console.log(response))
  //   .catch((err) => console.log(err));
  //! - - - - - - - - -
};

module.exports = send_message;
