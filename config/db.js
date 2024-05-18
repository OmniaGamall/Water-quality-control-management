const mysql = require("mysql2")
 
const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "water_analysis_system",
    port: 3307,
}
 
const connection = mysql.createConnection(config)
 
connection.connect(function(err) {
    if (err) throw(err);
    console.log("Connected!");
});
  
module.exports = connection;