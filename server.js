var app          = require('./express');
var bodyParser   = require('body-parser');
var passport     = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: "hello" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.express.static(__dirname + '/client'));

require('./server/app');

var port = process.env.PORT || 3000;

app.listen(port);