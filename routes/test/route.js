const app = require('express').Router();
const path = require('path');

const testController = require(path.join(path.resolve(), "controller/test.js"))

app.get('/getAllTests', testController.getTests);
app.post('/addTest', testController.addTest);
app.delete('/deleteTest/:id', testController.deleteTest);
app.patch('/updateTest/:id', testController.updateTest);
app.get('/getTestByID/:testID', testController.getTestByID)
module.exports = app;