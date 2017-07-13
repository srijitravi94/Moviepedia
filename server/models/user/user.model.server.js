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
userModel.undoWatchlistMovie = undoWatchlistMovie;
userModel.isMovieWatchlisted = isMovieWatchlisted;
userModel.favoriteTvshow = favoriteTvshow;
userModel.unFavoriteTvshow = unFavoriteTvshow;
userModel.isTvshowFavorited = isTvshowFavorited;
userModel.watchlistTvshow = watchlistTvshow;
userModel.undoWatchlistTvshow = undoWatchlistTvshow;
userModel.isTvshowWatchlisted = isTvshowWatchlisted;
userModel.addMovieReviewsForUser = addMovieReviewsForUser;
userModel.addTvshowReviewsForUser = addTvshowReviewsForUser;

module.exports = userModel;

function createUser(user) {

    if(user.image === null || user.image === '' || typeof user.image === 'undefined') {
        user.image = "https://www.drupal.org/files/issues/default-avatar.png";
    }
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

function favoriteTvshow(userId, tvshowId) {
    return userModel
        .update({_id: userId}, {$addToSet: {"favorites.tvshows": tvshowId}});
}

function unFavoriteTvshow(userId, tvshowId) {
    return userModel
        .update({_id: userId}, {$pullAll: {"favorites.tvshows": [tvshowId]}});
}

function isTvshowFavorited(userId, tvshowId) {
    return userModel
        .findOne({_id: userId, "favorites.tvshows": {$in: [tvshowId]}});
}

function watchlistTvshow(userId, tvshowId) {
    return userModel
        .update({_id: userId}, {$addToSet: {"watchlist.tvshows": tvshowId}});
}

function undoWatchlistTvshow(userId, tvshowId) {
    return userModel
        .update({_id: userId}, {$pullAll: {"watchlist.tvshows": [tvshowId]}});
}

function isTvshowWatchlisted(userId, tvshowId) {
    return userModel
        .findOne({_id: userId, "watchlist.tvshows": {$in: [tvshowId]}});
}


function addMovieReviewsForUser(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.reviews.movies.push(reviewId);
            return user.save();
        });
}

function addTvshowReviewsForUser(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.reviews.tvshows.push(reviewId);
            return user.save();
        });
}