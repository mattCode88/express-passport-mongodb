const express = require('express');
const router = express.Router();
const cardController = require('../controller/card-controller');

router.post('/card/create', cardController.create);

router.get('/card/show', cardController.find);

router.put('/card/update', cardController.update);

router.delete('/card/delete', cardController.delete);

module.exports = router;