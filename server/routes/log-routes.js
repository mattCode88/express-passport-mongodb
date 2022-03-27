const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Root app')
})

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/auth/dashboard');
    res.render('login', { message: req.flash('loginFallito') });
});

router.get('/register', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/auth/dashboard');
    res.render('register');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})

module.exports = router;