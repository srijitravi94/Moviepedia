var app                 = require('../../express');
var criticModel         = require('../models/critic/critic.model.server');

app.post('/api/moviepedia/critic/application', submitApplication);
app.get('/api/moviepedia/allCritics/application', getAllCritics);
app.delete('/api/moviepedia/critic/:criticId', deleteCritic);

function submitApplication(req, res) {
    var critic = req.body;

    criticModel
        .createCritic(critic)
        .then(function (critic) {
            res.json(critic);
        }, function (err) {
            res.sendStatus(404);
        });
}

function getAllCritics(req, res) {

    criticModel
        .getAllCritics()
        .then(function (critics) {
            res.json(critics);
        }, function (err) {
            res.sendStatus(404);
        });
}


function deleteCritic(req, res) {

    var criticId = req.params.criticId;

    criticModel
        .deleteCritic(criticId)
        .then(function (critics) {
            res.json(critics);
        }, function (err) {
            res.sendStatus(404);
        });
}
