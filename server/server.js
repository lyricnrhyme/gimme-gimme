require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.EXPRESS_CONTAINER_PORT;
const routes = require('./routes');

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))

server.use('/', routes);

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
});