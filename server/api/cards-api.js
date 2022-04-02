const express = require('express');
const router = express.Router();
// const passport = require('../config/passport-config');
const cardController = require('../controller/card-controller');

router.post('/card/create', cardController.create);

router.get('/card/show', cardController.find);

module.exports = router;