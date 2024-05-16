const app = require("express").Router()
const path = require('path');
const equipmentController = require(path.join(path.resolve(), "controller/equipment.js"))

app.post("/addEquipment", equipmentController.addEquipment)
app.get("/getEquipmentByID/:EquID", equipmentController.getEquipmentByID)
app.get("/getAllEquipments", equipmentController.getAllEquipments)
app.delete("/deleteEquipmentByID/:EquID", equipmentController.deleteEquipmentByID)
app.put("/updateEquipment", equipmentController.updateEquipment)

module.exports = app;