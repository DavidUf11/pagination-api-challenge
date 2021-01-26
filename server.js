const express = require("express"),
  app = express(),
  getApps = require("./api/controllers/appApiController");

app.get("/apps", getApps);

app.get("", (req, res) =>
  res.send(
    "Welcome to David's paginated app API. Visit t.ly/qkM7 for usage instructions."
  )
);

port = process.env.PORT || 4000;
app.listen(port);
console.log("Server listening on port", port);
