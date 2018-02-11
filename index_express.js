var express = require('express')
var dt = require('./get_datetime')

var app = express()
var port = 8080

var total_sum = 0

app.get('/', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World \n'+'with Express')
	//res.send('Hello World with Express')
})

app.get('/sum', function (req, res) {
	total_sum++
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Accepted new increment to the total Sum: '+total_sum)
})

app.get('/get', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Get to View The Sum: '+total_sum)
})

app.get('/datetime', function(req, res) { 
	var datetime = dt.myDateTime()

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Datetime: '+datetime)
})


app.listen(port)

console.log('Server running with Express on port '+port+'.');