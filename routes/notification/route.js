const app = require('express').Router();
const path = require('path');

const notController = require(path.join(path.resolve(), "controller/notification.js"))

app.get('/getAllNotifications', notController.getNotifications);
app.get('/notification/:id', notController.getNotification);
app.post('/addNotification', notController.addNotification);
app.delete('/deleteNotification/:id', notController.deleteNotification);
app.patch('/updateNotification/:id', notController.updateNotification);
app.get('/showNotificationByID/:EmpID/:NotiID', notController.showNotificationByID);

module.exports = app