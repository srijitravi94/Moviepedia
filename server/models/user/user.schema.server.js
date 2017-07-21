var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName : String,
    lastName  : String,
    username  : {type : String, unique : true},
    password  : String,
    email     : String,
    phone     : Number,
    image     : String,

    roles     : [{type: String,
                default : 'USER',
                enum : ['USER', 'ADMIN','CRITIC']}],

    google: {
        id:    String,
        token: String
    },

    facebook: {
        id:    String,
        token: String
    },

    twitter: {
        id:    String,
        token: String
    },

    favorites : {
        movies : [String],
        tvshows : [String]
    },
    watchlist : {
        movies : [String],
        tvshows : [String]
    },
    reviews : {
        movies  : [{type: mongoose.Schema.Types.ObjectId, ref: "movieModel"}],
        tvshows : [{type: mongoose.Schema.Types.ObjectId, ref: "tvshowModel"}]
    },
    followers: [String],
    following: [String],
    dateCreated : {type : Date, default: Date.now}
}, {collection : "users"});

module.exports = userSchema;