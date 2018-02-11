var mysql = require('mysql');

var DbUserName = "root";
var DbPassword = "";
var DbName = "concertsdb";
var DbHost = "localhost";

global.connectionWorked = false;

function formatDB_Info(){
	return "[User='"+DbUserName+"'; Pass='"+DbPassword+
		 "'; DB='"+DbName+"'; Host='"+DbHost+"']";
}

exports.testConnectionDB = function(){
	var dbParams = {
		host: DbHost,
		database: DbName,
		user: DbUserName,
		password: DbPassword
	};

	var con = mysql.createConnection(dbParams);
	// NOTE: if fails, probably throws an exception
	// TODO: Study to reuse connections

	console.log("Connected successfully to DB with\n"+formatDB_Info());

	// assuming that 'connect' will never fail
	var res = con.connect(function(err) {
	  	/*if (err) {
	  		console.log("DB Connection FAILED !! with\n"+formatDB_Info());
	  		//throw err;
	  		global.connectionWorked = false;
	  	} else {
	  		console.log("Connected successfully to DB with\n"+formatDB_Info());
	  		global.connectionWorked = true;
	  	}*/
	});

	//waitMilliseconds(50);

	con.end();
}

function waitMilliseconds(millis){
	var waitTill = new Date(new Date().getTime() + millis);
	while(waitTill > new Date()){}
}