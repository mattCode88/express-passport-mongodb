const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    
    // const user = req.user;
    console.log(req.user)
    // const html = `Ciao ${req.user.username}. Sei nella dashboard`;
    res.send('dashboard');
});

router.get('/dashboard-2', (req, res) => {
    res.send('dashbord-2');
})

module.exports = router;