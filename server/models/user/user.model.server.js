var mongoose   = require('mongoose');
var userSchema = require('./user.schema.server');
var movieSchema = require('../movie/movie.schema.server');
var tvshowSchema = require('../tvshow/tvshow.schema.server');
var userModel  = mongoose.model('userModel', userSchema);
var movieModel = mongoose.model('movieModel', movieSchema);
var tvshowModel = mongoose.model('tvshowModel', tvshowSchema);

userModel.createUser = createUser;
userModel.adminCreateUser = adminCreateUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findAllUsers = findAllUsers;
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
userModel.deleteMovieReviewsForUser = deleteMovieReviewsForUser;
userModel.addTvshowReviewsForUser = addTvshowReviewsForUser;
userModel.deleteTvshowReviewsForUser = deleteTvshowReviewsForUser;
userModel.followUsers = followUsers;
userModel.unfollowUsers = unfollowUsers;
userModel.findUserByName = findUserByName;
userModel.isUserFollowed = isUserFollowed;
userModel.addCriticToUser = addCriticToUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByTwitterId = findUserByTwitterId;

module.exports = userModel;

function createUser(user) {

    if(user.image === null || user.image === '' || typeof user.image === 'undefined') {
        user.image = "https://www.drupal.org/files/issues/default-avatar.png";
    }
    user.roles = ['USER'];
    return userModel
        .create(user);
}

function adminCreateUser(user) {
    user.image = "https://www.drupal.org/files/issues/default-avatar.png";
    user.password = "$2a$10$31YCX7EIFyI9yRIBGp.RTOvNWDgqFNdcJsAEAywAS8HKG8O7W.Bf2";

    if(user.roles) {
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['USER'];
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

function findAllUsers() {
    return userModel
        .find();
}

function findUserById(userId) {
    return userModel
        .findById({'_id' : userId});
}

function updateUser(user, userId) {
    delete user.username;
    delete user.password;

    if(typeof user.roles === 'string') {
        user.roles = user.roles.split(',');
    }

    return userModel
        .update({_id: userId}, {$set: user});
}


function deleteUser(userId) {
    return userModel
        .remove({'_id' : userId})
        .then(function () {
            return movieModel
                .remove({'userId' : userId})
                .then(function () {
                   return tvshowModel
                       .remove({'userId' : userId});
                });
        });
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

function deleteMovieReviewsForUser(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.reviews.movies.indexOf(reviewId);
            user.reviews.movies.splice(index, 1);
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

function deleteTvshowReviewsForUser(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.reviews.tvshows.indexOf(reviewId);
            user.reviews.tvshows.splice(index, 1);
            return user.save();
        });
}

function followUsers(currentUserId, followUserId) {
    return userModel
        .update({_id: currentUserId}, {$addToSet: {following: followUserId}})
        .then(function (user) {
            return userModel
                .update({_id: followUserId}, {$addToSet: {followers: currentUserId}});
        });
}

function unfollowUsers(currentUserId, unfollowUserId) {
    return userModel
        .update({_id: currentUserId}, {$pullAll: {following: [unfollowUserId]}})
        .then(function (user) {
            return userModel
                .update({_id: unfollowUserId}, {$pullAll: {followers: [currentUserId]}});
        });
}

function findUserByName(name) {
    return userModel
        .find({$or :
            [
            {"username" : {$regex : ".*" +name+ ".*"}},
            {"firstName" : {$regex : ".*" +name+ ".*"}},
            {"lastName" : {$regex : ".*" +name+ ".*"}}
            ]
        });
}

function isUserFollowed(currentUserId, followUserId) {
    return userModel
        .findOne({_id: currentUserId, following: {$in: [followUserId]}});
}

function addCriticToUser(userId) {
    return userModel
        .update({'_id' : userId}, {$push : {roles : 'CRITIC'}});
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {
    return userModel
        .findOne({'facebook.id': facebookId});
}

function findUserByTwitterId(twitterId) {
    return userModel
        .findOne({'twitter.id': twitterId});
}