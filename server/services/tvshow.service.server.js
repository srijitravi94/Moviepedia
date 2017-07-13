var app              = require('../../express');
var tvshowModel      = require('../models/tvshow/tvshow.model.server');

app.post('/api/moviepedia/:userId/tvshow/review', createReview);
app.get('/api/moviepedia/tvshow/:tvshowId/review', findReviewsForTvshow);

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
