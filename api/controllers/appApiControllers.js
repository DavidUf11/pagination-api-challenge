const apps = require("../seedData");

let sortById;
let start;
let max;
let end;
let matchingApps;

const getApps = (req, res) => {
  const justNameObjects = apps.map(({ id, ...rest }) => ({ ...rest }));
  const appNames = [];
  justNameObjects.forEach((obj) => appNames.push(obj.name.toLowerCase()));

  if (JSON.stringify(req.query) !== "{}") {
    if (!req.query.by) {
      res.send(
        'Invalid query. "By" paramater is required; valid values are "id" and "name".'
      );
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

        // set query name to start; include spaces in query?
        // if not, make default equal to the app name at index 0, end at index 50
        // handle creating matchingApps using names

        start = req.query.start
          ? appNames.indexOf(req.query.start.toLowerCase()) + 1
          : 1;
        max = req.query.max ? Number(req.query.max) : 50;
        end = req.query.end
          ? appNames.indexOf(req.query.end.toLowerCase()) + 1
          : start + max - 1;
      } else
        res.send(
          'Invalid "by" value. The only valid values are "id" and "name".'
        );
    }

    if (req.query.max) {
      if (end > start + max) {
        end = start + max - 1;
      }
    }

    if (start < 1)
      sortById
        ? res.send('Invalid query. "Start" value must be greater than zero.')
        : res.send(
            `Invalid query. "${req.query.start}" does not exist in the data set.`
          );
    if (end < 1)
      sortById
        ? res.send('Invalid query. "End" value must be greater than zero.')
        : res.send(
            `Invalid query. "${req.query.end}" does not exist in the data set.`
          );
    if (max < 1) throw 'Invalid query. "Max" value must be greater than zero.';
    if (end < start)
      res.send('Invalid query. "End" record cannot precede "start" record.');
    // create counterpart error for sorting by name

    matchingApps = apps.slice(start - 1, end);

    if (req.query.order) {
      if (req.query.order === "desc") {
        sortById
          ? matchingApps.sort((a, b) => (a.id < b.id ? 1 : -1))
          : matchingApps.sort((a, b) => (a.name < b.name ? 1 : -1));
      } else if (req.query.order !== "asc")
        res.send(
          'Invalid "order" value. The only valid values are "asc" and "desc".'
        );
    }
  } else {
    apps.sort((a, b) => (a.id > b.id ? 1 : -1));
    start = 1;
    end = 50;
  }

  matchingApps = apps.slice(start - 1, end);
  res.json(matchingApps);
};

module.exports = getApps;
