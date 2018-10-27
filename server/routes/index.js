const router = require('express').Router();
const Rooms = require('./Rooms');

router.use('/rooms', Rooms);

module.exports = router;