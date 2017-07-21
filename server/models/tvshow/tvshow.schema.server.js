var mongoose = require('mongoose');

var tvshowSchema = mongoose.Schema({
    tvshowId     : String,
    tvshowName   : String,
    tvshowImage  : String,
    userId       : String,
    firstName    : String,
    lastName     : String,
    image        : String,
    isCritic     : Boolean,
    summary      : String,
    description  : String,
    dateCreated  : {type : Date, default: Date.now}
}, {collection : "tvshow_reviews"});

module.exports = tvshowSchema;