var mongoose   = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel  = mongoose.model('movieModel', movieSchema);
var userModel    = require('../user/user.model.server');

movieModel.createReview = createReview;
movieModel.findReviewsForMovies = findReviewsForMovies;

module.exports = movieModel;

function createReview(review, userId) {
    return movieModel
        .create(review)
        .then(function (review) {
            return userModel
                .addReviewsForUser(userId, review._id);
        });
}

function findReviewsForMovies(movieId) {
    return movieModel
        .find({movieId : movieId});
}