//var http = require('http'); basic library
var express = require('express'); // improving 'http' lib
var dt = require('./get_datetime');
var url = require('url');
var fs = require('fs');

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


app.get('/paramsYearMonth', function(req, res) { 
	var URL = req.url;
	var parsedUrl = url.parse(URL, true); // true to get the Query Parameter String, already parsed
	
	var query = parsedUrl.query; // also suitable '.host', '.pathname' and '.search'
	var year = query.year; // parameter name 'year'
	var month = query.month; // parameter name 'month'

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('\nPrinting URL: '+URL);
	//res.write('\nParsed URL True, Query: '+query); THIS IS NOT POSSIBLE
	// NOT PARSABLE TO STRING

	res.write('\n(Year, Month) = '+year+' '+month);
	res.end();

	// Tested with:
	// http://localhost:8080/paramsYearMonth?year=123123&month=octobeeeeerfest
	// http://localhost:8080/paramsYearMonth?month=February&year=2018
});


// The aim to do this actually is to show How to READ a FILE.
// A better approach to Send an HTML page is:
// if (path.existsSync(filePath)) res.sendfile(filePath);
app.get('/readDemoFile', function(req, res) { 
	
	fs.readFile('demofile1.html', function(err, data) {

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data); // containing the whole file text
		res.write("File 'demofile1.html written to the Stream !!");
		res.end();

	});
});

// some more important directives related to operation with Files on the FileSystem
// (append, open, write, delete, rename)
// Upload -> https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp
// available at: https://www.w3schools.com/nodejs/nodejs_filesystem.asp


// allowing to use NodeJs Server as a FileServer
// Example URL: http://localhost:8080/static/demofile1.html
// having to include each directory desired to be accessible (in this case '.')
// Documentation Here: http://expressjs.com/es/starter/static-files.html
app.use('/static', express.static('.'));

app.listen(port);

console.log('Server running with Express on port '+port+'.');




