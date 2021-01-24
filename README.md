# Pagination API Challenge
An API for accessing a seeded data set of apps that returns paginated, JSON-format data. 

## Usage
Requests can be made directly in the browser at https://pagination-api-challenge.herokuapp.com/ or through an API client like [Postman](https://www.postman.com/).
### Parameters 
If requesting data within a certain range, the following query parameters are available. 

| Parameters       | Required?     | Valid Values|
| :------------- | :----------: | :----------- |
|  `by` | yes*   | id, name    |
|  `start` | no   | if ordering by id, any number corresponding to an id within the data set; if ordering by name, a name of any app within the data set |
|  `end` | no   | if ordering by id, any number corresponding to an id within the data set; if ordering by name, a name of any app within the data set |
|  `max` | no   | any number between zero and the number of items in the data set (seeded data set contains 105 entries) |
|  `order` | no   | asc, desc    |

*Not required if making a request with no range parameters, e.g. `GET` from `/apps`

### Default Values
If no range paramaters are provided, the response will be issued according to the following defaults. 
| Key | Default Value |
| :--- | :--- |
|`by`| id |
|`start`| 1 |
|`end`| 50 |
|`max` | 50 |
|`order`| asc |

### Examples

**Request:** `GET` from `/apps?by=id&start=4&end=6&order=desc` 
<br/>
**Response:** 
```json
[
    {
        "id": 6,
        "name": "my-app-006"
    },
    {
        "id": 5,
        "name": "my-app-005"
    },
    {
        "id": 4,
        "name": "my-app-004"
    }
]
```
---
**Request:** `GET` from `/apps?by=name&start=my-app-027&max=3`  
**Response:**
```json
[
    {
        "id": 27,
        "name": "my-app-027"
    },
    {
        "id": 28,
        "name": "my-app-028"
    },
    {
        "id": 29,
        "name": "my-app-029"
    }
]
```

## How It Works

### Technologies Used
- [Node.js](https://nodejs.org/en/) as a back-end environment
- [Express](https://expressjs.com/) as a server framework

### Logic
To issue a response, we `slice` the data set using start and end indices according to the request's query values (or default values). This subset is returned to the user in JSON format.   
<br/>
When a request is made, we first check if the request contains at least one query parameter:
```JavaScript
if (JSON.stringify(req.query) !== "{}") {
    // generate response data based on query paramaters
} else {
    // generate  response data based on default values
}
```
If the request contains no parameters, we sort the data by `id` in ascending order, and assign default `start` and `end` values:
```JavaScript
apps.sort((a, b) => (a.id > b.id ? 1 : -1));
start = 1;
end = 50;
```
If the request contains at least one paramater, we first check the `by` parameter – whether it exists and is a valid value, and then whether to sort by `id` or `name` (below). This check is first as the value of `by` defines how we assign other paramater values.  
```JavaScript
if (!req.query.by) {
    res.send('Invalid query. "By" paramater is required; valid values are "id" and "name".');
    
} else {

    if (req.query.by === "id") {
        sortById = true;
        // logic to assign start, end, and max values
        
      } else if (req.query.by === "name") {
        sortById = false;
        // logic to assign start, end, and max values
        
      } else {
        res.send('Invalid "by" value. The only valid values are "id" and "name".');
      }
  }
```
Next we assign values for `start`, `max`, and `end` according to the query (or default values if they are not specified). If sorting by `id`, we simply use the numbers query values for `start`, `max`, and `end` (below). If sorting by `name`, we `slice` the last three chartacters of the `start` and `end` values to assign `start` and `end` values.   
```JavaScript
start = req.query.start ? Number(req.query.start) : 1;
max = req.query.max ? Number(req.query.max) : 50;
end = req.query.end ? Number(req.query.end) : start + max - 1;
```
Handling cases in which both an `end` and `max` value are defined, we defer to `max` if the `end` value extends beyond what can fit inside the
maximum page-, subtracting one to attain adjust for the zero-indexed array containing the app data:
```JavaScript
if (end > start + max) {
    end = start + max - 1;
}
```
Lastly, we check if an `order` query was sent and order the matching data accordingly, sorting by the appropriate `by` identifier (below). Since `asc` is the default, we only need to check for `desc` or invalid values. 
```JavaScript
if (req.query.order) {
    if (req.query.order === "desc") {
        sortById
          ? matchingApps.sort((a, b) => (a.id < b.id ? 1 : -1))
          : matchingApps.sort((a, b) => (a.name < b.name ? 1 : -1));
    } else if (req.query.order !== "asc")
        res.send('Invalid "order" value. The only valid values are "asc" and "desc".');
```
Ultimately we issue a response in JSON format containing the paginated subset of data, where `apps` is the original, seeded data set: 
```JavaScript
matchingApps = apps.slice(start - 1, end);
res.json(matchingApps);
```


