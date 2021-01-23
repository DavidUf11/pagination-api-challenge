const apps = [
  { id: 1, name: "my-app-001" },
  { id: 2, name: "my-app-002" },
  { id: 3, name: "my-app-003" },
  { id: 4, name: "my-app-004" },
  { id: 5, name: "my-app-005" },
  { id: 6, name: "my-app-006" },
  { id: 7, name: "my-app-007" },
  { id: 8, name: "my-app-008" },
  { id: 9, name: "my-app-009" },
  { id: 10, name: "my-app-010" },
  { id: 11, name: "my-app-011" },
  { id: 12, name: "my-app-012" },
];

const getApps = (req, res) => {
  // empty obj not OK b/c by required.
  // add logic for handling "by" param missing error

  if (req.query.by === "id") {
    // logic
  }

  const by = req.query.by;

  let start = 0;
  let end = 50;
  let max = 50;
  let order = "asc";

  if (req.query.start) {
    start = Number(req.query.start);
    end = start + 50;
  }
  if (req.query.end) {
    end = Number(req.query.end);
  }
  if (req.query.max) {
    max = Number(req.query.max);
  }
  if (req.query.order) {
    order = req.query.order;
  }

  console.log("start: ", start);
  console.log("end: ", end);
  console.log("max: ", max);
  console.log("order: ", order);
  console.log("by: ", by);

  res.json("hi");

  // start and max
  //   const startIndex = start - 1;
  //   const endIndex = startIndex + Number(max);
  //   const paginatedApps = apps.slice(startIndex, endIndex);
  //   res.json(paginatedApps);
};

module.exports = getApps;
