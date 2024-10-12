const express = require('express');
const mongodb = require('./src/data/database.js');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const session = require('express-session'); 
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const { get } = require('mongoose');

port = 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    // .use((req, res, next) => {
    //     res.header(
    //         'Access-Control-Allow-Origin', 
    //         '*');
    //     res.header(
    //         'Access-Control-Allow-Headers', 
    //         'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    //     res.header(
    //         'Access-Control-Allow-Methods', 
    //         'GET, POST, PUT, DELETE, OPTIONS');
    //     next();
    // })
    .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }))
    .use(cors({ origin: '*' }))
    .use('/', require('./src/routes'));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, callback) {
    return callback(null, profile);
  }
));

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});

app
    .get('/', (req, res) => {
        res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out');
    })
    .get('/github/callback', passport.authenticate('github', {
        failureRedirect: '/api-docs', session: false}),
        (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}); 