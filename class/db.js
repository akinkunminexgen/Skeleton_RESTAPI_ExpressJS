const mysql = require('mysql');

const con = mysql.createConnection({
    host: "sql5.freesqldatabase.com",
    user: "sql5727177",
    password: "uiXJEYVd9y",
    database: "sql5727177"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  module.exports = con;