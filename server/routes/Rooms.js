const router = require('express').Router();
const { createRoom } = require('../helpers');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
const WATSON_KEY = process.env.IAM_WATSON_KEY;

const s3 = new aws.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: 'public-read-write',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        `${Date.now().toString()}-${file.originalname}`
      );
    }
  })
});

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: WATSON_KEY
})

/*********************************************/
/***       Room/Player Variables          ***/
/*********************************************/
let rooms = [];
let roomID = null;
/*********************************************/
/***       Room/Player Variables          ***/
/*********************************************/

router.route('/')
  .get((req, res) => {
    return res.json({ message: 'GET Rooms' });
  })
  .post((req, res) => {
    const { playerName } = req.body;
    roomID = createRoom();
    rooms.push({
      roomID,
      players: [{
        name: playerName,
        score: 0
      }],
      winner: null,
      winningPhoto: ''
    })

    return res.json({
      roomID: roomID
    });
  })

router.route('/:id')
  .get((req, res) => {
    const roomID = req.params.id;
    rooms.map(room => {
      if (room.roomID === roomID) {
        return res.json({
          players: room.players
        });
      }
    })
  })
  .post((req, res) => {
    const roomID = req.params.id;
    const { playerName } = req.body;
    if (!rooms.length) {
      return res.json({ message: `Room doesn't exist!` })
    }
    else {
      rooms.map(room => {
        if (room.roomID === roomID) {
          let nameCheck = room.players.some(player => player.name === playerName)
          // if (nameCheck) {
          room.players.push({
            name: playerName,
            score: 0
          });
          return res.json({
            roomID: room.roomID
          })
          //   } else {
          //     return res.json({ message: `Player name taken in this room!` })
          //   }
          // } else {
          //   return res.json({ message: `Room doesn't exist!` })
        }
      })
    }
  });

router.post('/:id/images', upload.single('photo'), (req, res) => {
  const url = req.file.location;
  const roomID = req.params.id;
  const { prompt, player } = req.body;
  let params = { url };
  let matchSuccess = false;
  let finalRedirect = false;
  visualRecognition.classify(params, (err, response) => {
    if (err) console.log(err);
    else {
      let classifications = Object.values(response.images[0].classifiers[0].classes);
      let matchingClassification = classifications.find(result => result.class.includes(prompt) && result.score > 0.5);
      if (matchingClassification) {
        rooms.map(room => {
          if (room.roomID === roomID) {
            room.players.map(participant => {
              if (participant.name === player) {
                room.winner = player;
                room.winningPhoto = url;
                participant.score++;
                if (participant.score > 2) {
                  finalRedirect = true;
                }
                matchSuccess = true;
              }
            })
          }
        })
      }
      if (matchSuccess && finalRedirect) {
        return res.json({ success: true, finalRedirect: true })
      }
      else if (matchSuccess) {
        return res.json({ success: true })
      } else {
        return res.json({ success: false })
      }
    }
  })
});

router.get('/:id/scores', (req, res) => {
  const roomID = req.params.id;
  rooms.map(room => {
    if (room.roomID === roomID) {
      res.json({
        winningPhoto: room.winningPhoto,
        winner: room.winner,
        players: room.players,
        redirect: true,
      });
    } else {
      res.json({ redirect: null })
    }
  })
})

router.get('/:id/results', (req, res) => {
  const roomID = req.params.id;
  let room = rooms.filter(room => room.roomID === roomID);
  let currentHighestScore;
  room[0].players.map(participant => {
    if (!currentHighestScore) {
      currentHighestScore = participant;
    } else if (currentHighestScore.score < participant.score) {
      currentHighestScore = participant;
      room.highestScore = currentHighestScore;
    }
  })
  return res.json(room[0]);
})

module.exports = router;