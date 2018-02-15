var mysql = require('mysql');

var DbUserName = "root";
var DbPassword = "";
var DbName = "concertsdb";
var DbHost = "localhost";

global.connectionWorked = false;

var dbParams = {
	host: DbHost,
	database: DbName,
	user: DbUserName,
	password: DbPassword
};

var con = mysql.createConnection(dbParams); // con.end();
console.log("Connected successfully to DB with\n"+formatDB_Info());


function formatDB_Info(){
	return "[User='"+DbUserName+"'; Pass='"+DbPassword+
		 "'; DB='"+DbName+"'; Host='"+DbHost+"']";
}

// INSERT INTO `concert` (`idConcert`, `ConcertName`, `InterpretName`, `Place`, `Time`) VALUES (NULL, 'Després de tot', 'Manu Guix', 'Razmatazz', '2018-02-16 21:00:00');
exports.getConcerts = function(callback){
  	//Select all customers and return the result object:
	console.log('DB: SELECT * FROM concert');
	con.query("SELECT * FROM concert", function (err, result, fields) {
		if (err)
			callback(err, false); //throw err;
		else
			callback(result, true);
	});

	//https://www.uno-de-piera.com/api-rest-con-node-js-express-y-mysql/
	//https://stackoverflow.com/questions/14087924/cannot-enqueue-handshake-after-invoking-quit
}

exports.addConcert = function(concert, callback) {

	// Example Sentence: INSERT INTO `concert` (`idConcert`, `ConcertName`, `InterpretName`, `Place`, `Time`)
	// VALUES (NULL, 'Després de tot', 'Manu Guix', 'Razmatazz', '2018-02-16 21:00:00');
	
	
	var queryStr = "INSERT INTO concert (idConcert, ConcertName, InterpretName, Place, Time) VALUES (NULL, '";
	queryStr += concert['ConcertName'] 	 + "','";
	queryStr += concert['InterpretName'] + "','";
	queryStr += concert['Place'] 		 + "','";
	queryStr += concert['Time'] 		 + "');";

	console.log('DB: Insert Concert: '+queryStr);

	con.query(queryStr, function (err, result, fields) {
		if (err)
			callback(err, false); //throw err;
		else
			callback(result, true); // no result
	});
}

//function getFieldNames(fields){
//	var fieldNames = [];
//	for (var i = fields.length - 1; i >= 0; i--) {
//		fieldNames.concat(fields[i].name);
//	}
//	return fieldNames;
//}

//function getJsonFromFields(result, fields){
//	var obj = {}
//	for (var i = fields.length - 1; i >= 0; i--) {
//		var fieldName = fields[i].name;
//		obj[fieldName] = result[fieldName];
//	}
//	return obj;
//}

exports.testConnectionDB = function(){
	
	// NOTE: if fails, probably throws an exception
	// TODO: Study reusing connections

	var res = con.connect(); // assuming that 'connect' will never fail
}

function waitMilliseconds(millis){
	var waitTill = new Date(new Date().getTime() + millis);
	while(waitTill > new Date()){}
}
