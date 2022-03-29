//rotte che non necessitano di autenticazione
const express = require('express');
const router = express.Router();

//rotta radice: homepage
router.get('/', (req, res) => {
    res.render('home-page', { titlePage: 'Home Page'});
})

//rotta di login
router.get('/login', (req, res) => {
    //se l' utente è autenticato e prova ad accedere alla rotta /login lo rimando alla dashboard
    if (req.isAuthenticated()) return res.redirect('/auth/dashboard');
    res.render('login', { message: req.flash('loginFallito'), titlePage: 'Login' });
});

//rotta di registrazione, effettuo il medesimo controllo di /login
router.get('/register', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/auth/dashboard');
    res.render('register', { titlePage: 'Register', message: req.flash('err-message') });
});

//accedendo a /logout, l' utente effettua il logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})

module.exports = router;