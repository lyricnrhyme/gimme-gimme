// const router = require('express').Router();
// const app = require('../server');
// const socket = require('socket.io');
// const { createRoom } = require('../../helper/room');

// /*********************************************/
// /***       Room/Player Variables          ***/
// /*********************************************/
// let rooms = [];
// /*********************************************/
// /***       Room/Player Variables          ***/
// /*********************************************/

// const io = socket(app);
// io.on('connection', socket => {
//   console.log(socket);
// })

// router.get('/', (req, res) => {
//   res.send('smoke test');
// });

// router.post('/rooms', (req, res) => {
//   const { player } = req.body;
//   let roomId = createRoom();
//   rooms.push({
//     roomId,
//     players: [player]
//   });
//   res.json(roomId);
// });

// router.get('/rooms/:id', (req, res) => {
//   const id = req.params.id;
//   let players;
//   rooms.map(room => {
//     if (room.roomId === id) {
//       players = room.players;
//     }
//   })
//   res.json(players);
// });

// router.post('/rooms/:id', (req, res) => {
//   const id = req.params.id;
//   const { player } = req.body;
//   rooms.map(room => {
//     if (room.roomId === id) {
//       room.players.push(player);
//       return res.json(room.roomId)
//     }
//   })
// });

// module.exports = router;