const app = require("express").Router()
const path = require('path');
const taskController = require(path.join(path.resolve(), "controller/task.js"))


app.post("/addTask/:EmpID", taskController.addTask)
app.get("/getTaskByID/:TaskID", taskController.getTaskByID)

app.get("/getAllTasks", taskController.getAllTasks)
app.delete("/deleteTaskByID/:TaskID/:EmpID", taskController.deleteTaskByID)
app.put("/updateTaskByID/:TaskID/:EmpID", taskController.updateTaskByID)

module.exports = app