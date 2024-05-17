const app = require('express').Router();
const path = require('path');

const chemistController = require(path.join(path.resolve(), "controller/chemist.js"))

app.post('/addChemist', chemistController.addChemist);
app.get('/getAllChemists', chemistController.getAllChemists)
app.get('/getChemistByID/:ChID', chemistController.getChemistByID);

module.exports = app;
