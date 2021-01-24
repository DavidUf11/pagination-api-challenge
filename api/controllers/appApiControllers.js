const e = require("express");

const apps = [
  { id: 3, name: "my-app-003" },
  { id: 11, name: "my-app-011" },
  { id: 6, name: "my-app-006" },
  { id: 10, name: "my-app-010" },
  { id: 7, name: "my-app-007" },
  { id: 1, name: "my-app-001" },
  { id: 2, name: "my-app-002" },
  { id: 4, name: "my-app-004" },
  { id: 12, name: "my-app-012" },
  { id: 8, name: "my-app-008" },
  { id: 5, name: "my-app-005" },
  { id: 9, name: "my-app-009" },
];

let sortById = true;
let start;
let max;
let end;

const getApps = (req, res) => {
  if (req.query.by) {
    if (req.query.by === "id") {
      apps.sort((a, b) => (a.id > b.id ? 1 : -1));

      start = req.query.start ? Number(req.query.start) : 1;
      max = req.query.max ? Number(req.query.max) : 5;
      end = req.query.end ? Number(req.query.end) : start + max - 1;
    } else if (req.query.by === "name") {
      apps.sort((a, b) => (a.name > b.name ? 1 : -1));
      sortById = false;

      start = req.query.start
        ? Number(req.query.start.slice(req.query.start.length - 3))
        : 1;
      max = req.query.max ? Number(req.query.max) : 5;
      end = req.query.end
        ? Number(req.query.end.slice(req.query.end.length - 3))
        : start + max - 1;
    } else
      throw 'Invalid "by" value. The only valid values are "id" and "name".';
  } else
    throw 'Invalid query. "By" paramater is required; valid values are "id" and "name".';

  if (req.query.max) {
    if (end > start + max) {
      end = start + max - 1;
    }
  }

  const matchingApps = apps.slice(start - 1, end);

  if (req.query.order) {
    if (req.query.order === "desc") {
      sortById
        ? matchingApps.sort((a, b) => (a.id < b.id ? 1 : -1))
        : matchingApps.sort((a, b) => (a.name < b.name ? 1 : -1));
    } else if (req.query.order !== "asc")
      throw 'Invalid "order" value. The only valid values are "asc" and "desc".';
  }

  res.json(matchingApps);
};

module.exports = getApps;
