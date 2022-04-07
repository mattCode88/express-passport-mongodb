//Pacchetti npm
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const path = require('path');
const bodyparser = require('body-parser');
const methodOverride = require('method-override');

//funzione di connessione al DB
const connectDb = require('./server/config/db-connection');

//middleware
const checkAuth = require('./server/middleware/check-auth');

//routes
const cardApi = require('./server/api/cards-api');
const logApi = require('./server/api/log-api');
const logRoute = require('./server/routes/log-routes');
const authRoute = require('./server/routes/auth/auth-routes');

//express
const app = express();

//setto l' uso di .env e stabilisco la porta
dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 8000;

app.use(bodyparser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

//setto template engine
app.set('view engine', 'ejs');

//espongo file statici
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

//setto uso flash per messaggi flash
app.use(flash());

//permetto il recupero dati da form
app.use(express.urlencoded({ extended: true }));

//stabilisco l' uso di sessioni
app.use(session({
    secret: process.env.CHIAVE_SEGRETA,
    saveUninitialized: false,
    resave: false
}))

//mi connetto al DB
connectDb();

//setto l' uso di funzioni per usare strategie passport
app.use(passport.initialize());
app.use(passport.session());

//rotte
app.use(logRoute);
app.use('/auth', checkAuth(), authRoute);
app.use('/api', logApi);
app.use('/api', cardApi);

//metto in ascolto il server
app.listen(PORT, () => console.log(`Server in ascolto sula porta ${PORT}`));