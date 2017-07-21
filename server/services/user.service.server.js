var app            = require('../../express');
var userModel      = require('../models/user/user.model.server');
var passport       = require('passport');
var bcrypt         = require("bcrypt-nodejs");
var LocalStrategy  = require('passport-local').Strategy;
var multer         = require('multer');
var upload         = multer({ dest: __dirname+'/../../client/uploads' });


passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get('/api/moviepedia/user', findUsers);
app.get('/api/moviepedia/user/:userId', findUserById);
app.put('/api/moviepedia/user/:userId', updateUser);
app.delete('/api/moviepedia/user/:userId', deleteUser);
app.post ("/api/moviepedia/upload", upload.single('myFile'), uploadImage);
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
app.put('/api/moviepedia/user/:currentUserId/follow/:followUserId', followUsers);
app.put('/api/moviepedia/user/:currentUserId/unfollow/:unfollowUserId', unfollowUsers);
app.get('/api/moviepedia/user/:currentUserId/follow/:followUserId', isUserFollowed);
app.get('/api/moviepedia/searchUser', findUserByName);

app.post('/api/moviepedia/login', passport.authenticate('local'), login);
app.post('/api/moviepedia/register', register);
app.post('/api/moviepedia/logout', logout);
app.get('/api/moviepedia/loggedin', loggedin);
app.get('/api/moviepedia/checkAdmin', checkAdmin);

app.get('/api/moviepedia/checkAdmin/user', isAdmin, adminFindAllUsers);
app.post('/api/moviepedia/checkAdmin',isAdmin, adminCreateUser);
app.delete('/api/moviepedia/checkAdmin/:userId',isAdmin, adminDeleteUser);
app.put('/api/moviepedia/checkAdmin/:userId',isAdmin, adminUpdateUser);
app.put('/api/moviepedia/critic/:userId/addRole', isAdmin, addCriticToUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

app.get('/auth/google',
    passport.authenticate('google', {
        scope : ['profile', 'email']
    })
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/',
        failureRedirect: '/#/login'
    })
);

var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields : ['id', 'emails','name','photos']
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope : ['email']
    })
);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#/',
        failureRedirect: '/#/login'
    })
);

var TwitterStrategy = require('passport-twitter').Strategy;
var twitterConfig = {
    consumerKey         : process.env.TWITTER_CONSUMER_KEY,
    consumerSecret      : process.env.TWITTER_CONSUMER_SECRET,
    callbackURL         : process.env.TWITTER_CALLBACK_URL,
    userProfileURL      : process.env.TWITTER_USER_PROFILE_URL
};

passport.use(new TwitterStrategy(twitterConfig, twitterStrategy));
app.get('/auth/twitter',
    passport.authenticate('twitter', {
        scope : ['email']
    })
);

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/#/',
        failureRedirect: '/#/login'
    })
);

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

function uploadImage(req, res) {

    var myFile        = req.file;
    var userId        = req.body.userId;

    var originalname  = myFile.originalname;
    var filename      = myFile.filename;
    var path          = myFile.path;
    var destination   = myFile.destination;
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;


    userModel
        .findUserById(userId)
        .then(function (user) {
            user.image = '/uploads/' +filename;
            userModel
                .updateUser(user, userId)
                .then(function () {
                    res.redirect("/#/profile/" +userId);
                });
        });
}

function localStrategy(username, password, done) {

    userModel
        .findUserByUsername(username)
        .then(function(user) {
            if(user) {
                if (bcrypt.compareSync (password, user.password)) {
                    return userModel
                        .findUserByCredentials(username, user.password)
                        .then(function (user) {
                            if (user) {
                                return done(null, user);
                            } else {
                                return done(null, false);
                            }
                        });
                }
                else {
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
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

    newUser.password = bcrypt.hashSync(newUser.password);

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

function checkAdmin(req, res) {
    var user = req.user;

    if(req.isAuthenticated() && user.roles.indexOf('ADMIN')>-1) {
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

function followUsers(req, res) {
    var currentUserId = req.params.currentUserId;
    var followUserId  = req.params.followUserId;

    userModel
        .followUsers(currentUserId, followUserId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function unfollowUsers(req, res) {
    var currentUserId = req.params.currentUserId;
    var unfollowUserId  = req.params.unfollowUserId;

    userModel
        .unfollowUsers(currentUserId, unfollowUserId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function isUserFollowed(req, res) {
    var currentUserId = req.params.currentUserId;
    var followUserId  = req.params.followUserId;

    userModel
        .isUserFollowed(currentUserId, followUserId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findUserByName(req, res) {
    var name = req.query.name;

    userModel
        .findUserByName(name)
        .then(function (users) {
            res.json(users);
        }, function (err) {
            res.sendStatus(404);
        });
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}


function adminFindAllUsers(req, res) {
    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        }, function (err) {
            res.sendStatus(404);
        });
}

function adminCreateUser(req, res) {
    var newUser = req.body;

    userModel
        .adminCreateUser(newUser)
        .then(function (newUser) {
            res.json(newUser);
        }, function (err) {
            res.sendStatus(404);
        });
}

function adminDeleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status)
        }, function (err) {
            res.sendStatus(404);
        });
}

function adminUpdateUser(req, res) {
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

function addCriticToUser(req, res) {
    var userId = req.params.userId;

    userModel
        .addCriticToUser(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404);
        });
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        image : profile._json.image.url,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel
                        .createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            })

        .then(function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            });
}


function facebookStrategy(accessToken, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if(user) {
                return done(null, user);
            } else {
                var email = profile.emails[0].value;
                var emailParts = email.split("@");
                var newFacebookUser = {
                    username:  emailParts[0],
                    firstName: profile.name.givenName,
                    lastName:  profile.name.familyName,
                    image : profile.photos[0].value,
                    email:     email,
                    facebook: {
                        id:    profile.id,
                        token: accessToken
                    }
                };
                return userModel
                    .createUser(newFacebookUser);
            }
        }, function(err) {
            if (err) { return done(err); }
        })

        .then(function(user){
                return done(null, user);
            },
            function(err){
                if (err) {
                    return done(err);
                }
            });
}

function twitterStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByTwitterId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newTwitterUser = {
                        username:  profile.username || emailParts[0],
                        firstName: profile.displayName,
                        image : profile.photos[0].value,
                        email : profile.emails[0].value,
                        twitter: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel
                        .createUser(newTwitterUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            })

        .then(function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            });
}