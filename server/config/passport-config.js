//configuro autenticazione
const { ObjectID } = require('mongodb');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserCollection = require('../model/User');

//setto l' utilizzo della strategia passport-local
passport.use('local-login', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    
    //ricerco utente per username
    const user = await UserCollection.findOne({ username: username });

    //se non lo trovo ritorno un messaggio flash di errore
    if (!user) {
        return done(null, false, { message: req.flash('loginFallito', 'Username non corretto!')});
    }

    //comparo password inserita nel form con quella hashata salvata nel DB
    const bool = bcrypt.compareSync(password, user.password);

    //se le password non corrispondono ritorno messaggio flash di errore
    if (!bool) {
        return done(null, false, { message: req.flash('loginFallito', 'Password non corretta!')});
    }
    
    //se passo i controlli ritorno l' utente con la funzione done()
    return done(null, user);

}));

//salvo nella sessione l' id utente autenticato per riconoscerlo ad ogni richista
passport.serializeUser((user, done) => {
    done(null, user._id)
});

//alla richiesta recupero l' utente memorizzato in sessione nel DB e lo associo a req.user
passport.deserializeUser(async (id, done) => {
    const user = await UserCollection.findOne({ _id: ObjectID(id) });
    done(null, user);
})

module.exports = passport;