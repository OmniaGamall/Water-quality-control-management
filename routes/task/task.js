const app = require("express").Router()
// Edit path to suitable for all os
let taskController = require("../../controller/experiment.js")


app.post("/addTask", taskController.addTask)
app.get("/getTaskByID/:TaskID", taskController.getTaskByID)

app.get("/getAllTasks", taskController.getAllTasks)
app.delete("/deleteTaskByID/:TaskID", taskController.deleteTaskByID)
app.put("/updateTaskByID/:TaskID", taskController.updateTaskByID)

module.exports = app