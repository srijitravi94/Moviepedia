var mongoose   = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel  = mongoose.model('movieModel', movieSchema);
var userModel    = require('../user/user.model.server');

movieModel.createReview = createReview;
movieModel.findReviewsForMovies = findReviewsForMovies;
movieModel.findMovieReviewById = findMovieReviewById;
movieModel.updateReview = updateReview;
movieModel.deleteReview = deleteReview;
movieModel.findAllMovieReviews = findAllMovieReviews;

module.exports = movieModel;

function createReview(review, userId) {
    return movieModel
        .create(review)
        .then(function (review) {
            return userModel
                .addMovieReviewsForUser(userId, review._id);
        });
}

function findReviewsForMovies(movieId) {
    return movieModel
        .find({movieId : movieId});
}

function findMovieReviewById(reviewId) {
    return movieModel
        .findOne({_id: reviewId});
}

function updateReview(reviewId, review) {
    return movieModel
        .update({_id: reviewId}, {$set: review});
}

function deleteReview(reviewId, userId) {
    return movieModel
        .remove({'_id' : reviewId})
        .then(function () {
            return userModel
                .deleteMovieReviewsForUser(userId, reviewId);
        });
}

function findAllMovieReviews() {
    return movieModel
        .find();
}