const UserCollection = require('../model/User');
const bcrypt = require('bcrypt');

//operazione di create user
exports.create = async (req, res) => {
   
    //recupero user nel db secondo i criteri email e username passati nel form
    const duplicateUser = await UserCollection.findOne({ username: req.body.username });
    const duplicateEmail = await UserCollection.findOne({ email: req.body.email });

    //controllo che user e email non siano dublicati, in tal caso ritorno un messaggio flash di errore e ridireziono a /register
    if (duplicateUser !== null) {
        req.flash('err-message', 'Username non disponibile!');
        res.redirect('/register');
        return
    }
    if (duplicateEmail !== null) {
        req.flash('err-message', 'Email già registrata!');
        res.redirect('/register');
        return
    }
    //controllo che i campi form siano stati compilati
    if (!req.body.username || !req.body.email || !req.body.password) {
        req.flash('err-message', 'Inserisci tutti i campi correttamente!');
        res.redirect('/register');
        return
    }

    /*genero un numero di bit per hashare la password e la hasho con bcrypt.hashSync */
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //new user(creiamo istanza del model)
    const user = new UserCollection({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    //salvo user nel database e ridireziono alla pagina di login
    user
        .save(user)
        .then(data => { res.redirect('/login') })
        .catch(err => { res.status(500).send({ message: err.message || 'Error to create operation' }) });
    
};