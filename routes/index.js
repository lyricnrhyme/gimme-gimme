const router = require('express').Router();
const http = require('http');
const socket = require('socket.io')(http);
const { createRoom } = require('../helper/room');

/*********************************************/
/***       Room/Player Variables          ***/
/*********************************************/
let roomId;
let players = [];
/*********************************************/
/***       Room/Player Variables          ***/
/*********************************************/

router.get('/', (req, res) => {
  roomId = createRoom();
  res.json(roomId)
});

socket.on('connection', () => {
  console.log('connected');
})

router.get('/rooms/:id', (req, res) => {
  const id = req.params.id;
  if (roomId = id) {
    res.json({ success: true });
  }
});

router.post('/rooms/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body
  if (roomId = id) {
    let player = {
      room: roomId,
      name
    }
    if (players.length < 8) {
      players.push(player)
      return res.json(players);
    }
    return res.json({ message: 'Max number of players reached!' })
  }
});

module.exports = router;