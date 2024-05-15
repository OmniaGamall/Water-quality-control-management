const express = require('express');
let userRoutes = require("../routes/login/route.js")
let empRoutes = require("../routes/employee/route.js")
let expRoutes = require("../routes/experiment/route.js")
let taskRoutes = require("../routes/task/route.js")
const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(empRoutes);
app.use(expRoutes);
app.use(taskRoutes);

app.listen(2072, () => {
  console.log('Server is running on port 2072');
});