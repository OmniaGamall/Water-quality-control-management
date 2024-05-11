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

connection.query("SELECT * FROM employee", (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
  
    // Print the results
    console.log("Employee data:");
    console.log(results);
  });
  
  // Close the connection
  connection.end(err => {
    if (err) {
      console.error("Error closing connection:", err);
      return;
    }
    console.log("Connection closed.");
  });