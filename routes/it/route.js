const app = require('express').Router();
const path = require('path');

const itController = require(path.join(path.resolve(), "controller/it.js"))

app.post('/addIT', itController.addIT);

module.exports = app;