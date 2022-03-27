const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const flash = require('connect-flash');

const connectDb = require('./server/config/db-connection');

const checkAuth = require('./server/middleware/check-auth');

const logApi = require('./server/api/log-api');
const logRoute = require('./server/routes/log-routes');
const authRoute = require('./server/routes/auth/auth-routes');

const app = express();

dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');

app.use(flash());

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'chiaveSegreta123',
    saveUninitialized: false,
    resave: false
}))

connectDb();

app.use(passport.initialize());
app.use(passport.session());

app.use(logRoute);
app.use('/auth', checkAuth(), authRoute);
app.use('/api', logApi);


app.listen(PORT, () => console.log('Server in ascolto sula porta 3000'));