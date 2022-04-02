//rotte protette da autenticazione
const express = require('express');
const router = express.Router();
const services = require('../../services/auth-render.js');

router.get('/dashboard', (req, res) => {
    res.render('auth/dashboard', { titlePage: 'Dashboard', user: req.user.username});
});

router.get('/dashboard/messaggi', (req, res) => {
    res.render('auth/dashboard-messaggi', { titlePage: 'Messaggi', user: req.user.username});
});

// router.get('/dashboard/create', (req, res) => {
//     res.render('auth/dashboard-create', { titlePage: 'Create', user: req.user.username, message: req.flash('duplicate-card')});
// });
router.get('/dashboard/create', services.addCard);

// router.get('/dashboard/show', (req, res) => {
//     res.render('auth/dashboard-show', { titlePage: 'Show', user: req.user.username});
// });
router.get('/dashboard/show', services.showCards);

router.get('/dashboard/statistiche', (req, res) => {
    res.render('auth/dashboard-stats', { titlePage: 'Statistiche', user: req.user.username});
});

module.exports = router;