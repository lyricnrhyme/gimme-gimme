require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const socket = require('socket.io');
const cors = require('cors');
const PORT = process.env.EXPRESS_CONTAINER_PORT || 8989;
const routes = require('./routes');
const { createRoom } = require('../helper/room');

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))

/*********************************************/
/***       Room/Player Variables          ***/
/*********************************************/
let rooms = [];
let sockets = [];
let roomId = null;
/*********************************************/
/***       Room/Player Variables          ***/
/*********************************************/

// server.use('/', routes);
server.get('/', (req, res) => {
  res.send('smoke test');
});

server.post('/rooms', (req, res) => {
  const { player } = req.body;
  console.log('post ', rooms);
  res.json(roomId);
});

server.get('/rooms/:id', (req, res) => {
  const id = req.params.id;
  let players;
  rooms.map(room => {
    if (room.roomId === id) {
      players = room.players;
    }
  })
  res.json(players);
});

server.post('/rooms/:id', (req, res) => {
  const id = req.params.id;
  const { player } = req.body;
  rooms.map(room => {
    if (room.roomId === id) {
      room.players.push(player);
      return res.json(room.roomId)
    }
  })
});

app = server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
});

module.exports = { app }

const io = socket(app);
io.on('connection', socket => {
  let roomId = socket.id.substring(0, 6);
  rooms.push({
    roomId: roomId,
    socketId: socket.id
  })
  // console.log(rooms);
  socket.on('create', roomId => {
    console.log('roomId :', roomId);
    // rooms.map(room => {
    //   if (room.roomId === roomId) {
    //     socket.join(roomId)
    //     console.log(socket.adapter.rooms);
    //   }
  })
  // socket.rooms[room] = room;
  // console.log(Object.keys(socket.rooms));
  // })
});

// function getRoomId() {
//   return new Promise((resolve, reject) => {
//     resolve(rooms)
//     reject()
//   })
// }