var mongoose   = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel  = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;

module.exports = userModel;

function createUser(user) {
    return userModel
        .create(user);
}

function findUserByUsername(username) {
    return userModel
        .findOne({'username' : username});
}

function findUserByCredentials(username, password) {
    return userModel
        .findOne({username : username, password : password});
}

function findUserById(userId) {
    return userModel
        .findById({'_id' : userId});
}