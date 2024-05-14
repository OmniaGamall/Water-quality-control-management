const mysql = require("mysql2")
 
const config = {
    host: "localhost",
    database: "water",
    user: "root",
    port: 3307,
    connectionLimit: 100,
}
 
const connection = mysql.createConnection(config)
 
connection.connect(function(err) {
    if (err) throw(err);
    console.log("Connected!");
});
  
  module.exports = connection;