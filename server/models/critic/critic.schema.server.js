var mongoose = require('mongoose');

var criticSchema = mongoose.Schema({
    userId     : String,
    firstName  : String,
    lastName   : String,
    username   : String,
    speciality : String,
    experience : String
}, {collection : "critics"});

module.exports = criticSchema;