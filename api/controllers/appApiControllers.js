const e = require("express"),
  apps = require("../seedData");

let sortById;
let start;
let max;
let end;

const getApps = (req, res) => {
  if (JSON.stringify(req.query) !== "{}") {
    if (!req.query.by) {
      throw 'Invalid query. "By" paramater is required; valid values are "id" and "name".';
    } else {
      if (req.query.by === "id") {
        sortById = true;
        apps.sort((a, b) => (a.id > b.id ? 1 : -1));

        start = req.query.start ? Number(req.query.start) : 1;
        max = req.query.max ? Number(req.query.max) : 50;
        end = req.query.end ? Number(req.query.end) : start + max - 1;
      } else if (req.query.by === "name") {
        sortById = false;
        apps.sort((a, b) => (a.name > b.name ? 1 : -1));

        start = req.query.start
          ? Number(req.query.start.slice(req.query.start.length - 3))
          : 1;
        max = req.query.max ? Number(req.query.max) : 50;
        end = req.query.end
          ? Number(req.query.end.slice(req.query.end.length - 3))
          : start + max - 1;
      } else
        throw 'Invalid "by" value. The only valid values are "id" and "name".';
    }

    if (req.query.max) {
      if (end > start + max) {
        end = start + max - 1;
      }
    }

    if (start < 1)
      throw 'Invalid query. "Start" value must be greater than zero.';
    if (end < 1) throw 'Invalid query. "End" value must be greater than zero.';
    if (max < 1) throw 'Invalid query. "Max" value must be greater than zero.';
    if (end < start)
      throw 'Invalid query. "End" value cannot be less than "start" value.';

    if (req.query.order) {
      if (req.query.order === "desc") {
        sortById
          ? matchingApps.sort((a, b) => (a.id < b.id ? 1 : -1))
          : matchingApps.sort((a, b) => (a.name < b.name ? 1 : -1));
      } else if (req.query.order !== "asc")
        throw 'Invalid "order" value. The only valid values are "asc" and "desc".';
    }
  } else {
    apps.sort((a, b) => (a.id > b.id ? 1 : -1));
    start = 1;
    max = 50;
    end = start + max - 1;
  }

  const matchingApps = apps.slice(start - 1, end);
  res.json(matchingApps);
};

module.exports = getApps;
