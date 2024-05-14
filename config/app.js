const express = require('express');
let userRoutes = require("../routes/login/route.js")
const app = express();

app.use(express.json());
app.use(userRoutes);

app.listen(4100, () => {
  console.log('Server is running on port 4100');
});