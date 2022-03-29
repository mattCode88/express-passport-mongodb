//API di log, richiamo i moduli utili
const express = require('express');
const router = express.Router();
const passport = require('../config/passport-config');
const userController = require('../controller/user-controller');

//chiamata POST sulla rotta /login per effettuare l' autenticazione con strategia passport-local
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}))

//chiamata POST a /register im cui richiamo il metodo create di userController per creare un utente
router.post('/register', userController.create);

module.exports = router;