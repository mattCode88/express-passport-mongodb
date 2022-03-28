const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home-page', { titlePage: 'Home Page'});
})

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/auth/dashboard');
    res.render('login', { message: req.flash('loginFallito'), titlePage: 'Login' });
});

router.get('/register', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/auth/dashboard');
    res.render('register', { titlePage: 'Register', message: req.flash('err-message') });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})

module.exports = router;