const UserCollection = require('../model/User');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: 'Inserisci i dati correttamente!' });
        return
    }

    /*genero un numero di bit per hashare la password e la hasho con hashSync */
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //new user(creiamo istanza del model)
    const user = new UserCollection({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    //save user in database
    user
        .save(user)
        .then(data => { res.redirect('/login') })
        .catch(err => { res.status(500).send({ message: err.message || 'Error to create operation' }) });
};