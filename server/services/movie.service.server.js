var app            = require('../../express');
var movieModel      = require('../models/movie/movie.model.server');

app.post('/api/moviepedia/:userId/movie/review', createReview);
app.get('/api/moviepedia/movie/:movieId/review', findReviewsForMovies);
app.get('/api/moviepedia/movie/review/:reviewId', findMovieReviewById);
app.put('/api/moviepedia/movie/review/:reviewId', updateReview);
app.delete('/api/moviepedia/:userId/movie/review/:reviewId', deleteReview);
app.get('/api/moviepedia/movie/review', findAllMovieReviews);

function createReview(req, res) {
    var userId = req.params.userId;
    var review = req.body;

    movieModel
        .createReview(review, userId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findReviewsForMovies(req, res) {
    var movieId = req.params.movieId;

    movieModel
        .findReviewsForMovies(movieId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findMovieReviewById(req, res) {
    var reviewId = req.params.reviewId;

    movieModel
        .findMovieReviewById(reviewId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updateReview(req, res) {
    var reviewId = req.params.reviewId;
    var review = req.body;

    movieModel
        .updateReview(reviewId, review)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteReview(req, res) {
    var reviewId = req.params.reviewId;
    var userId = req.params.userId;

    movieModel
        .deleteReview(reviewId, userId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllMovieReviews(req, res) {
    movieModel
        .findAllMovieReviews()
        .then(function (movieReviews) {
            res.json(movieReviews);
        }, function (err) {
            res.sendStatus(404);
        })
}