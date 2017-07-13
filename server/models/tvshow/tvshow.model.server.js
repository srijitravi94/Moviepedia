var mongoose     = require('mongoose');
var tvshowSchema = require('./tvshow.schema.server');
var tvshowModel  = mongoose.model('tvshowModel', tvshowSchema);
var userModel    = require('../user/user.model.server');

tvshowModel.createReview = createReview;
tvshowModel.findReviewsForTvshow = findReviewsForTvshow;

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