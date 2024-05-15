const app = require("express").Router()
const path = require('path');
const taskController = require(path.join(path.resolve(), "controller/task.js"))


app.post("/addTask", taskController.addTask)
app.get("/getTaskByID/:TaskID", taskController.getTaskByID)

app.get("/getAllTasks", taskController.getAllTasks)
app.delete("/deleteTaskByID/:TaskID", taskController.deleteTaskByID)
app.put("/updateTaskByID/:TaskID", taskController.updateTaskByID)

module.exports = app