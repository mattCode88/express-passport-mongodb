const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.render('auth/dashboard', { titlePage: 'Dashboard', user: req.user.username});
});

module.exports = router;