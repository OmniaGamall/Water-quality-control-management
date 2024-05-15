const app = require("express").Router()
// Edit path to suitable for all os
let expController = require("../../controller/experiment.js")


app.post("/addExperiment", expController.addExperiment)
app.get("/getAllExperiments", expController.getAllExperiments)
app.delete("/deleteExperimentByID/:ExpID", expController.deleteExperimentByID)


module.exports = app
