const axios = require('axios');

exports.addCard = (req, res) => {
    res.render('auth/dashboard-create', { titlePage: 'Create', user: req.user.username, message: req.flash('status-card')});
}

exports.showCards = (req, res) => {
    const username = req.user.username;
    axios.get(`http://localhost:3000/api/card/show?name=${username}`)
        .then(ris => {
            res.render('auth/dashboard-show', {
                titlePage: 'Show',
                user: username,
                cards: ris.data
            });
        }).catch(err => res.send(err));
}