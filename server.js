const express = require("express"),
  app = express(),
  getApps = require("./api/controllers/appApiControllers");

app.get("/apps", getApps);

port = process.env.PORT || 4000;

app.listen(port);
console.log("Server listening on port", port);
