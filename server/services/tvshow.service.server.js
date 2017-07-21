var app              = require('../../express');
var tvshowModel      = require('../models/tvshow/tvshow.model.server');

app.post('/api/moviepedia/:userId/tvshow/review', createReview);
app.get('/api/moviepedia/tvshow/:tvshowId/review', findReviewsForTvshow);
app.get('/api/moviepedia/tvshow/review/:reviewId', findTvshowReviewById);
app.put('/api/moviepedia/tvshow/review/:reviewId', updateReview);
app.delete('/api/moviepedia/:userId/tvshow/review/:reviewId', deleteReview);
app.get('/api/moviepedia/tvshow/review', findAllTvshowReviews);

function createReview(req, res) {
    var userId = req.params.userId;
    var review = req.body;

    tvshowModel
        .createReview(review, userId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findReviewsForTvshow(req, res) {
    var tvshowId = req.params.tvshowId;

    tvshowModel
        .findReviewsForTvshow(tvshowId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findTvshowReviewById(req, res) {
    var reviewId = req.params.reviewId;

    tvshowModel
        .findTvshowReviewById(reviewId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updateReview(req, res) {
    var reviewId = req.params.reviewId;
    var review = req.body;

    tvshowModel
        .updateReview(reviewId, review)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteReview(req, res) {
    var userId = req.params.userId;
    var reviewId = req.params.reviewId;

    tvshowModel
        .deleteReview(reviewId, userId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllTvshowReviews(req, res) {
    tvshowModel
        .findAllTvshowReviews()
        .then(function (tvshowReviews) {
            res.json(tvshowReviews);
        }, function (err) {
            res.sendStatus(404);
        })
}
