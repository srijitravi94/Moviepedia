var app            = require('../../express');
var movieModel      = require('../models/movie/movie.model.server');

app.post('/api/moviepedia/:userId/movie/review', createReview);
app.get('/api/moviepedia/movie/:movieId/review', findReviewsForMovies);

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