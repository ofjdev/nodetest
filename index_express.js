//var http = require('http'); basic library
var express = require('express'); // improving 'http' lib
var dt = require('./get_datetime');
var url = require('url');
var fs = require('fs');
var uc = require('upper-case');
var db = require('./db');

var app = express();
var port = 8080;

var total_sum = 0;

function genericResponse(response, text) {
	response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	response.write(text);
	response.end();
}

//'application/json; charset=utf-8'

/*function responseUTF8(response, text) {
	response.writeHead(200,
		{'Content-Type': 'text/plain; charset=utf-8'});
	response.write(text);
	response.end();
}*/

app.get('/getConcerts', function(req,res){

	var callbackResult = function(result, is_ok){

		if ( ! is_ok ){
			if(result === null)
				genericResponse(res, "result === null: "+result);
			else if(result === undefined)
				genericResponse(res, "result === undefined: "+result);

		} else {
			if( result.length == 0 )
				genericResponse(res, "No concerts added, yet.");
			else {
				console.log(JSON.stringify(result));
				genericResponse(res, JSON.stringify(result)); //result.toString() );		
			}
		}
	};

	db.getConcerts(callbackResult);
});


app.get('/testDb', function(req, res) {
	try {
		db.testConnectionDB();
		genericResponse(res, "Connection to DB Successful.");
	} catch(err){
		genericResponse(res, "Connection to DB FAILED !!");
	}
});


app.get('/', function (req, res) {
	genericResponse(res, 'Hello World \n'+'with Express');
});


app.get('/uppercase', function (req, res) {
	genericResponse(res, uc('Hello World \n'+'with Express'));
});


app.get('/sum', function (req, res) {
	total_sum++;
	genericResponse(res, 'Accepted new increment to the total Sum: '+total_sum);
});


app.get('/get', function (req, res) {
	genericResponse(res, 'Get to View The Sum: '+total_sum);
});


app.get('/datetime', function(req, res) { 
	var datetime = dt.myDateTime();
	genericResponse(res, 'Datetime: '+datetime);
});


app.get('/url', function(req, res) { 
	var URL = req.url;
	genericResponse(res, 'Printing URL: '+URL);
});


app.get('/paramsYearMonth', function(req, res) { 
	var URL = req.url;
	var parsedUrl = url.parse(URL, true); // true to get the Query Parameter String, already parsed
	
	var query = parsedUrl.query; // also suitable '.host', '.pathname' and '.search'
	var year = query.year; // parameter name 'year'
	var month = query.month; // parameter name 'month'

	genericResponse(res, '\nPrinting URL: '+URL+
				'\n(Year, Month) = '+year+' '+month);

	// Tested with:
	// http://localhost:8080/paramsYearMonth?year=123123&month=octobeeeeerfest
	// http://localhost:8080/paramsYearMonth?month=February&year=2018
});


// The aim to do this actually is to show How to READ a FILE.
// A better approach to Send an HTML page is:
// if (path.existsSync(filePath)) res.sendfile(filePath);
app.get('/readDemoFile', function(req, res) { 
	
	fs.readFile('demofile1.html', function(err, data) {

		genericResponse(res,
			data + "\n\nFile 'demofile1.html written to the Stream !!");

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




