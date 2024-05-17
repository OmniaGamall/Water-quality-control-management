const app = require("express").Router()
const path = require('path');
const reportController = require(path.join(path.resolve(), "controller/report.js"))


app.post("/addReport", reportController.addReport)
app.get("/getReportByID/:RepID", reportController.getReportByID)
app.get("/getAllReports", reportController.getAllReports)
app.delete("/deleteReportByID/:RepID", reportController.deleteReportByID)
app.put("/updateReport", reportController.updateReport)

module.exports = app