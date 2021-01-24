const express = require("express"),
  app = express(),
  getApps = require("./api/controllers/appApiControllers");

app.get("/apps", getApps);

app.get("", (req, res) =>
  res.send(
    "Welcome to David's paginated app API. See https://github.com/DavidUf11/pagination-api-challenge/blob/main/README.md for usage instructions."
  )
);

port = process.env.PORT || 4000;
app.listen(port);
console.log("Server listening on port", port);
