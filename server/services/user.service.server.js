var app            = require('../../express');
var userModel      = require('../models/user/user.model.server');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;


passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


app.get('/api/moviepedia/user', findUsers);
app.get('/api/moviepedia/user/:userId', findUserById);

app.post('/api/moviepedia/login', passport.authenticate('local'), login);
app.post('/api/moviepedia/register', register);
app.post('/api/moviepedia/logout', logout);
app.get('/api/moviepedia/loggedin', loggedin);

function findUsers (req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    }

    else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else
                    res.sendStatus(404);
            });
    }

    else {
        res.sendStatus(404);
    }

}

function findUserById(req, res) {
    var userId = req.params.userId;

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            });
}


function register(req, res) {
    var newUser = req.body;

    userModel
        .createUser(newUser)
        .then(function (user) {
            req.login(user, function (err) {
                if (err) {
                    res.sendStatus(404)
                } else {
                    res.json(user);
                }
            });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}


function loggedin(req, res) {
    var user = req.user;

    if(req.isAuthenticated()) {
        res.json(user);
    } else {
        res.send('0');
    }
}