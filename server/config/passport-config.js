// const { ObjectID } = require('bson');
const { ObjectID } = require('mongodb');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserCollection = require('../model/User');

passport.use('local-login', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    // if (username == 'matteo' && password == '123') {
    //     const user = { id: 1, username: 'matteo' };
    //     return done(null, user);
    // }
    const user = await UserCollection.findOne({ username: username });
    // const bool = bcrypt.compareSync(password, user.password);
    if (!user) {
        return done(null, false, { message: req.flash('loginFallito', 'Username non corretto!')});
    }

    const bool = bcrypt.compareSync(password, user.password);
    if (!bool) {
        return done(null, false, { message: req.flash('loginFallito', 'Password non corretta!')});
    }
    
    return done(null, user);
    // return done(null, false, { message: req.flash('loginFallito', 'I dati non sono corretti!')});
}));

// user.password !== password

passport.serializeUser((user, done) => {
    // done(null, user.id)
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    // const user = { id: 1, username: 'matteo' };
    const user = await UserCollection.findOne({ _id: ObjectID(id) });
    done(null, user);
})

module.exports = passport;