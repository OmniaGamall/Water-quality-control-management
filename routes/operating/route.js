const app = require('express').Router();
const path = require('path');

const operatingController = require(path.join(path.resolve(), "controller/operating.js"))

app.post('/addOperating', operatingController.addOperating);

module.exports = app;
