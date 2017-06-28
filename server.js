var express    = require('express');
var app        = require('./express');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;

app.listen(port);