// requiring the HTTP interfaces in node
var http = require('http');

var port = 8081
// create an http server to handle requests and response
http.createServer(function (req, res) {

	// sending a response header of 200 OK 
	res.writeHead(200, {'Content-Type': 'text/plain'}); 

	// print out Hello World 
	res.end('Hello World\n'); 

	// use port 8080 

}).listen(port);

console.log('Server running on port '+port+'.');

/*
//https://nodejs.org/es/about/
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo\n');
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});*/