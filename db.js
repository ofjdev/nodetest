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



exports.testConnectionDB = function(){
	
	// NOTE: if fails, probably throws an exception
	// TODO: Study reusing connections

	var res = con.connect(); // assuming that 'connect' will never fail
}

function waitMilliseconds(millis){
	var waitTill = new Date(new Date().getTime() + millis);
	while(waitTill > new Date()){}
}
