var mongoose          = require('mongoose');
var criticSchema      = require('./critic.schema.server');
var criticModel       = mongoose.model('criticModel', criticSchema);


criticModel.createCritic  = createCritic;
criticModel.getAllCritics = getAllCritics;
criticModel.deleteCritic = deleteCritic;

module.exports = criticModel;

function createCritic(critic) {
    return criticModel
        .create(critic);
}

function getAllCritics() {
    return criticModel
        .find();
}

function deleteCritic(criticId) {
    return criticModel
        .remove({'_id' : criticId});
}