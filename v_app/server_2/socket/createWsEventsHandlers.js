const send_message = require('./handlers/send_message');
const join_room = require('./handlers/join_room');
const leave_room = require('./handlers/leave_room');
const disconnect = require('./handlers/disconnect');

const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
function setChatRoom(room) {
  chatRoom = room;
}
let allUsers = []; // All users in current chat room
function setAllUsers(users) {
  allUsers = [...users];
}

const createWsEventsHandlers = (io, socket) => [
  {
    eventName: 'send_message',
    method: send_message(io, socket, setChatRoom, setAllUsers, chatRoom, allUsers),
  },
  {
    eventName: 'join_room',
    method: join_room(io, socket, setChatRoom, setAllUsers, chatRoom, allUsers),
  },
  {
    eventName: 'leave_room',
    method: leave_room(io, socket, setChatRoom, setAllUsers, chatRoom, allUsers),
  },
  {
    eventName: 'disconnect',
    method: disconnect(io, socket, setChatRoom, setAllUsers, chatRoom, allUsers),
  },
];

module.exports = {
  createWsEventsHandlers,
};
module.exports.CHAT_BOT = CHAT_BOT;
