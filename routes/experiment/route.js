const app = require("express").Router()
const path = require('path');

const expController = require(path.join(path.resolve(), "controller/experiment.js"))


app.post("/addExperiment", expController.addExperiment)
app.get("/getAllExperiments", expController.getAllExperiments)
app.delete("/deleteExperimentByID/:ExpID", expController.deleteExperimentByID)


module.exports = app
