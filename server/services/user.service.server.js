var app            = require('../../express');
var userModel      = require('../models/user/user.model.server');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;


passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get('/api/moviepedia/user', findUsers);
app.get('/api/moviepedia/user/:userId', findUserById);
app.put('/api/moviepedia/user/:userId', updateUser);
app.delete('/api/moviepedia/user/:userId', deleteUser);
app.put('/api/moviepedia/user/:userId/movie/favorite/:movieId', favoriteMovie);
app.put('/api/moviepedia/user/:userId/movie/unFavorite/:movieId', unFavoriteMovie);
app.get('/api/moviepedia/user/:userId/movie/favorite/:movieId', isMovieFavorited);
app.put('/api/moviepedia/user/:userId/movie/watchlist/:movieId', watchlistMovie);
app.put('/api/moviepedia/user/:userId/movie/undoWatchlist/:movieId', undoWatchlistMovie);
app.get('/api/moviepedia/user/:userId/movie/watchlist/:movieId', isMovieWatchlisted);
app.put('/api/moviepedia/user/:userId/tvshow/favorite/:tvshowId', favoriteTvshow);
app.put('/api/moviepedia/user/:userId/tvshow/unFavorite/:tvshowId', unFavoriteTvshow);
app.get('/api/moviepedia/user/:userId/tvshow/favorite/:tvshowId', isTvshowFavorited);
app.put('/api/moviepedia/user/:userId/tvshow/watchlist/:tvshowId', watchlistTvshow);
app.put('/api/moviepedia/user/:userId/tvshow/undoWatchlist/:tvshowId', undoWatchlistTvshow);
app.get('/api/moviepedia/user/:userId/tvshow/watchlist/:tvshowId', isTvshowWatchlisted);

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

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(user, userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (success) {
            res.sendStatus(200);
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

function favoriteMovie(req, res) {
    var userId = req.params.userId;
    var movieId = req.params.movieId;

    userModel
        .favoriteMovie(userId, movieId)
        .then(function (user) {
            res.json(user);

        }, function (err) {
            res.sendStatus(404);
        });
}

function unFavoriteMovie(req, res) {
    var userId = req.params.userId;
    var movieId = req.params.movieId;

    userModel
        .unFavoriteMovie(userId, movieId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function isMovieFavorited(req, res) {
    var userId = req.params.userId;
    var movieId = req.params.movieId;

    userModel
        .isMovieFavorited(userId, movieId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function watchlistMovie(req, res) {
    var userId = req.params.userId;
    var movieId = req.params.movieId;

    userModel
        .watchlistMovie(userId, movieId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function undoWatchlistMovie(req, res) {
    var userId = req.params.userId;
    var movieId = req.params.movieId;

    userModel
        .undoWatchlistMovie(userId, movieId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function isMovieWatchlisted(req, res) {
    var userId = req.params.userId;
    var movieId = req.params.movieId;

    userModel
        .isMovieWatchlisted(userId, movieId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function favoriteTvshow(req, res) {
    var userId = req.params.userId;
    var tvshowId = req.params.tvshowId;

    userModel
        .favoriteTvshow(userId, tvshowId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function unFavoriteTvshow(req, res) {
    var userId = req.params.userId;
    var tvshowId = req.params.tvshowId;

    userModel
        .unFavoriteTvshow(userId, tvshowId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function isTvshowFavorited(req, res) {
    var userId = req.params.userId;
    var tvshowId = req.params.tvshowId;

    userModel
        .isTvshowFavorited(userId, tvshowId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function watchlistTvshow(req, res) {
    var userId = req.params.userId;
    var tvshowId = req.params.tvshowId;

    userModel
        .watchlistTvshow(userId, tvshowId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function undoWatchlistTvshow(req, res) {
    var userId = req.params.userId;
    var tvshowId = req.params.tvshowId;

    userModel
        .undoWatchlistTvshow(userId, tvshowId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function isTvshowWatchlisted(req, res) {
    var userId = req.params.userId;
    var tvshowId = req.params.tvshowId;

    userModel
        .isTvshowWatchlisted(userId, tvshowId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}