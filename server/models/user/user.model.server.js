var mongoose   = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel  = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.favoriteMovie = favoriteMovie;
userModel.unFavoriteMovie = unFavoriteMovie;
userModel.isMovieFavorited = isMovieFavorited;
userModel.watchlistMovie = watchlistMovie;
userModel.undoWatchlistMovie= undoWatchlistMovie;
userModel.isMovieWatchlisted = isMovieWatchlisted;

module.exports = userModel;

function createUser(user) {
    return userModel
        .create(user);
}

function findUserByUsername(username) {
    return userModel
        .findOne({'username' : username});
}

function findUserByCredentials(username, password) {
    return userModel
        .findOne({username : username, password : password});
}

function findUserById(userId) {
    return userModel
        .findById({'_id' : userId});
}

function updateUser(user, userId) {
    delete user.username;
    delete user.password;

    return userModel
        .update({_id: userId}, {$set: user});
}


function deleteUser(userId) {
    return userModel
        .remove({'_id' : userId});
}

function favoriteMovie(userId, movieId) {
    return userModel
        .update({_id: userId}, {$addToSet: {"favorites.movies": movieId}});
}

function unFavoriteMovie(userId, movieId) {
    return userModel
        .update({_id: userId}, {$pullAll: {"favorites.movies": [movieId]}});
}

function isMovieFavorited(userId, movieId) {
    return userModel
        .findOne({_id: userId, "favorites.movies": {$in: [movieId]}});
}

function watchlistMovie(userId, movieId) {
    return userModel
        .update({_id: userId}, {$addToSet: {"watchlist.movies": movieId}});
}

function undoWatchlistMovie(userId, movieId) {
    return userModel
        .update({_id: userId}, {$pullAll: {"watchlist.movies": [movieId]}});
}

function isMovieWatchlisted(userId, movieId) {
    return userModel
        .findOne({_id: userId, "watchlist.movies": {$in: [movieId]}});
}