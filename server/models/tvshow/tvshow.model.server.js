var mongoose     = require('mongoose');
var tvshowSchema = require('./tvshow.schema.server');
var tvshowModel  = mongoose.model('tvshowModel', tvshowSchema);
var userModel    = require('../user/user.model.server');

tvshowModel.createReview = createReview;
tvshowModel.findReviewsForTvshow = findReviewsForTvshow;
tvshowModel.findTvshowReviewById = findTvshowReviewById;
tvshowModel.updateReview = updateReview;
tvshowModel.deleteReview = deleteReview;
tvshowModel.findAllTvshowReviews = findAllTvshowReviews;

module.exports = tvshowModel;

function createReview(review, userId) {
    return tvshowModel
        .create(review)
        .then(function (review) {
            return userModel
                .addTvshowReviewsForUser(userId, review._id);
        });
}

function findReviewsForTvshow(tvshowId) {
    return tvshowModel
        .find({tvshowId : tvshowId});
}

function findTvshowReviewById(reviewId) {
    return tvshowModel
        .findOne({_id: reviewId});
}

function updateReview(reviewId, review) {
    return tvshowModel
        .update({_id: reviewId}, {$set: review});
}

function deleteReview(reviewId, userId) {
    return tvshowModel
        .remove({'_id' : reviewId})
        .then(function (review) {
            return userModel
                .deleteTvshowReviewsForUser(userId, reviewId);
        });
}

function findAllTvshowReviews() {
    return tvshowModel
        .find();
}