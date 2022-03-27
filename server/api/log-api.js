const express = require('express');
const router = express.Router();
const passport = require('../config/passport-config');
const userController = require('../controller/user-controller');

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}))

router.post('/register', userController.create);

module.exports = router;