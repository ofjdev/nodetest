var express = require('express');
var dt = require('./get_datetime');

var app = express();
var port = 8080;

var total_sum = 0;

app.get('/', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Hello World \n'+'with Express');
	res.end();
});

app.get('/sum', function (req, res) {
	total_sum++;
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Accepted new increment to the total Sum: '+total_sum);
	res.end();
});

app.get('/get', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Get to View The Sum: '+total_sum);
	res.end();
});

app.get('/datetime', function(req, res) { 
	var datetime = dt.myDateTime();

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Datetime: '+datetime);
	res.end();
});

app.get('/url', function(req, res) { 
	var URL = req.url;

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Printing URL: '+URL);
	res.end();
});

app.listen(port);

console.log('Server running with Express on port '+port+'.');