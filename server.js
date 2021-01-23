const express = require("express"),
  app = express();

const apps = [
  { id: 1, name: "my-app-001" },
  { id: 2, name: "my-app-002" },
  { id: 3, name: "my-app-003" },
];

app.get("/apps", (req, res) => {
  res.json(apps);
});

port = process.env.PORT || 4000;

app.listen(port);
console.log("Server listening on port", port);
