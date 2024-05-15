const app = require('express').Router();
const path = require('path');

let empController = require(path.join(path.resolve(), "controller/employee.js"))

app.get('/getAllEmployees', empController.getEmployees);
app.get('/employee/:id', empController.getEmp);
app.post('/addEmp', empController.addEmp);
app.delete('/deleteEmp/:id', empController.deleteEmp);
app.patch('/updateEmpContact/:id', empController.updateEmp);

module.exports = app;