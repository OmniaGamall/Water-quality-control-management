const express = require('express');
const path = require('path');

let userRoutes = require(path.join(path.resolve(), "/routes/login/route.js"))
let empRoutes = require(path.join(path.resolve(), "/routes/employee/route.js"))
let expRoutes = require( path.join(path.resolve(), "/routes/experiment/route.js"))
let taskRoutes = require(path.join(path.resolve(), "/routes/task/route.js"))
let notificationRoutes = require(path.join(path.resolve(), "/routes/notification/route.js"))
let testRoutes = require(path.join(path.resolve(), "/routes/test/route.js"))
let chemistRoutes = require(path.join(path.resolve(), "/routes/chemist/route.js"))
let engineerRoutes = require(path.join(path.resolve(), "/routes/engineer/route.js"))
let itRoutes = require(path.join(path.resolve(), "/routes/it/route.js"))
let labRoutes = require(path.join(path.resolve(), "/routes/lab/route.js"))
let operatingRoutes = require(path.join(path.resolve(), "/routes/operating/route.js"))

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(empRoutes);
app.use(expRoutes);
app.use(taskRoutes);
app.use(notificationRoutes);
app.use(testRoutes);
app.use(chemistRoutes);
app.use(engineerRoutes);
app.use(itRoutes);
app.use(labRoutes);
app.use(operatingRoutes);

app.listen(2072, () => {
  console.log('Server is running on port 2072');
});