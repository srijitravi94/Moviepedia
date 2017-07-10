var mongoose = require('mongoose');
var movieSchema = require('../movie/movie.schema.server');

var userSchema = mongoose.Schema({
    firstName : String,
    lastName  : String,
    username  : {type : String, unique : true},
    password  : String,
    email     : String,
    phone     : Number,
    image     : String,
    favorites : {
        movies : [String],
        tvshows : [String]
    },
    watchlist : {
        movies : [String],
        tvshows : [String]
    },
    reviews : {
        movies : [movieSchema]
    },
    dateCreated : {type : Date, default: Date.now}
}, {collection : "users"});

module.exports = userSchema;