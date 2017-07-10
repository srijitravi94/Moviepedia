var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    movieId     : String,
    movieName   : String,
    movieImage  : String,
    firstName   : String,
    lastName    : String,
    image       : String,
    summary     : String,
    description : String,
    dateCreated : {type : Date, default: Date.now}
}, {collection : "movie_reviews"});

module.exports = movieSchema;