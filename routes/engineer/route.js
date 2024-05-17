const app = require('express').Router();
const path = require('path');
let engController = require(path.join(path.resolve(), "controller/engineer.js"))

app.post('/addEngineer', engController.addEngineer);
app.get('/getAllEngineers', engController.getAllEngineers)
module.exports = app;