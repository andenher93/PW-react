var cfg = require('./config');

// Setup Express
var express = require('express');
var app = express();
var publicDir = '/build';

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.use(express.static(__dirname + publicDir));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});

app.listen(3000);
console.log('Server running on 3000');