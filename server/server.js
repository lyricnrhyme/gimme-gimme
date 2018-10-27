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
  roomId = createRoom();
  rooms.push({
    roomId,
    players: [player]
  });
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
  // sockets.push(socket.id)
  socket.on('create', room => {
    console.log('rooms ', rooms);
    socket.rooms[room] = room;
    console.log(socket.rooms)
    // console.log(Object.keys(socket.rooms));
  })
});