const app = require('express').Router();
let empController = require("../../controller/employee.js")

app.get('/getAllEmployees', empController.getEmployees);
app.get('/employee/:id', empController.getEmp);
app.post('/addEmp', empController.addEmp);
app.delete('/deleteEmp/:id', empController.deleteEmp);
app.patch('/updateEmpContact/:id', empController.updateEmp);

module.exports = app;