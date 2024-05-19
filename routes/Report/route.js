const app = require("express").Router()
const path = require('path');
const reportController = require(path.join(path.resolve(), "controller/report.js"))


app.post("/addReport", reportController.addReport)
app.get("/getReport/:id", reportController.getReportByID)
app.get("/getAllReports", reportController.getAllReports)
app.delete("/deleteReportByID/:RepID", reportController.deleteReportByID)


module.exports = app