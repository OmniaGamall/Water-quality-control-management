const app = require('express').Router();
const path = require('path');

const labController = require(path.join(path.resolve(), "controller/lab.js"))

app.post('/addLab', labController.addLab);
app.get('/getAllLabTechs', labController.getAllLabTechs)
module.exports = app;