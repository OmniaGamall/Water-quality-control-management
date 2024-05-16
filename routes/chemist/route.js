const app = require('express').Router();
const path = require('path');

const chemistController = require(path.join(path.resolve(), "controller/chemist.js"))

// app.get('/getAllChemists', chemistController.getChemists);
// app.get('/chemist/:id', chemistController.getChemist);
app.post('/addChemist', chemistController.addChemist);

module.exports = app;
