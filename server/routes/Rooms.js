const router = require('express').Router();
const { createRoom, generatePrompt } = require('../helpers');

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
      players: [{
        name: playerName,
        score: 0
      }],
      round: 1
    })

    return res.json({
      roomID: roomID
    });
  })

router.route('/:id')
  .get((req, res) => {
    rooms.map(room => {
      if (room.roomID === req.params.id) {
        return res.json({
          players: room.players
        });
      }
    })
  })
  .post((req, res) => {
    const id = req.params.id;
    const { playerName } = req.body;

    rooms.map(room => {
      if (room.roomID === id) {
        room.players.push({
          name: playerName,
          score: 0
        });

        return res.json({
          roomID: room.roomID
        })
      } else {
        /* HOW TO HANDLE ROOM THAT DOESN'T EXIST??? */
        return false;
      }
    })
  });

router.get('/:id/images', (req, res) => {
  const prompt = generatePrompt();
  res.json(prompt);
});

router.post('/:id/images', upload.single('photo'), (req, res) => {
  const url = req.file.location;
  const roomID = req.params.id;
  const { prompt, player } = req.body;
  let params = { url }
  // let classifiedResults;
  // let classifyPromise = new Promise((resolve, reject) => {
  visualRecognition.classify(params, (err, response) => {
    if (err) reject(err);
    else {
      let classifications = Object.values(response.images[0].classifiers[0].classes);
      classifications.map(result => {
        if (result.class === prompt && result.score > 0.5) {
          rooms.map(room => {
            if (room.roomID === roomID) {
              room.players.map(participants => {
                if (participants.name === player) {
                  participants.score += 1;
                }
              })
            }
          })
          res.json({ success: true })
        }
      })
    }
  })
});

router.get('/:id/scores', (req, res) => {
  const roomID = req.params.id;
  rooms.map(room => {
    if (room.roomID === roomID) {
      room.round += 1;
      if (room.round < 5) {
        res.json(room.players);
      } else {
        res.json({
          redirect: true,
          players: room.players
        })
      }
    }
  })
})


module.exports = router;