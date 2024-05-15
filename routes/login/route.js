const app = require('express').Router();
const path = require('path');

const userController = require(path.join(path.resolve(), "controller/login.js"))

app.get('/getAllUsers', userController.getUsers);
app.get('/user/:username', userController.getUser);
app.post('/addUser', userController.addUser);
app.delete('/deleteUser/:username', userController.deleteUser);
app.patch('/updateUser/:username', userController.updateUser);

module.exports = app;