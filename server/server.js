require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const socket = require('socket.io');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { generatePrompt } = require('../server/helpers')

const PORT = process.env.PORT || process.env.EXPRESS_CONTAINER_PORT || 8989;

server.use(express.static(path.join(__dirname, '..', 'build')));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static('public'))

server.use('/api', routes);
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const app = server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
});

const io = socket(app);

io.on('connection', socket => {
  socket.on('CREATE', data => {
    socket.join(data.roomID);
    let countdown = 10;

    const timer = setInterval(() => {
      io.to(data.roomID).emit('TICK', countdown)
      countdown--;

      if (countdown === -1) {
        clearInterval(timer);
      }
    }, 1000)
  })

  socket.on('JOIN', data => {
    socket.join(data.roomID);
    io.to(data.roomID).emit('JOINED', data.userName);
  })

  socket.on('START_GAME', startData => {
    // console.log('START', startData);

    socket.join(startData.roomID)
    io.to(startData.roomID).emit('PROMPT', generatePrompt())
    let countdown = 30;

    const timer = setInterval(() => {
      io.to(startData.roomID).emit('TICK', countdown)
      countdown--;

      if (countdown === -1) {
        clearInterval(timer);
      }
    }, 1000)
  });

  socket.on('WIN_ROUND', data => {
    socket.join(data.roomID)
    let countdown = 15;

    const timer = setInterval(() => {
      io.to(data.roomID).emit('ROUND_END', countdown)
      countdown--;

      if (countdown === -1) {
        clearInterval(timer);
      }
    }, 1000)
    io.emit('WINNER', data.userName);

  });

  socket.on('END_ROUND', data => {
    socket.disconnect(true);
    // let countdown = 15;

    // const timer = setInterval(() => {
    //   io.emit('TICK', countdown)
    //   countdown--;

    //   if (countdown === -1) {
    //     clearInterval(timer);
    //   }
    // }, 1000)
  });

  socket.on('REDIRECT', () => {
    io.emit('MOVE_TO_NEXT_ROUND', { redirect: true })
  })
});