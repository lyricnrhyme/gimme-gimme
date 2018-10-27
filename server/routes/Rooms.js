const router = require('express').Router();
const { createRoom, generatePrompt } = require('../helpers');

/*********************************************/
/***       Room/Player Variables          ***/
/*********************************************/
let rooms = [];
let sockets = [];
let roomID = null;
/*********************************************/
/***       Room/Player Variables          ***/
/*********************************************/

router.route('/')
  .get((req, res) => {
    return res.json('GET Rooms');
  })
  .post((req, res) => {
    const { playerName } = req.body;
    roomID = createRoom();
    rooms.push({
      roomID,
      players: [playerName]
    })

    return res.json({
      roomID: roomID
    });
  })

router.route('/:id')
  .get((req, res) => {
    console.log('get id', rooms);


    rooms.map(room => {
      if (room.roomID === req.params.id) {
        return res.json({
          players: room.players
        });
      } else {
        return res.json([]);
      }
    })
  })
  .post((req, res) => {
    const id = req.params.id;
    const { playerName } = req.body;

    rooms.map(room => {
      if (room.roomID === id) {
        room.players.push(playerName);

        return res.json({
          roomID: room.roomID
        })
      } else {
        /* HOW TO HANDLE ROOM THAT DOESN'T EXIST??? */
        return false;
      }
    })
  });

router.route('/:id/images')
  .get((req, res) => {
    const prompt = generatePrompt();
    res.json(prompt);
  })

module.exports = router;