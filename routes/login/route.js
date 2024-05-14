const app = require('express').Router();
let userController = require("../../controller/login.js")

app.get('/getAllUsers', userController.getUsers);

module.exports = app;