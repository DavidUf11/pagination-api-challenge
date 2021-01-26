# Paginated API Challenge
An API for accessing a seeded data set of apps that returns paginated, JSON-format data

## Usage
Requests can be made directly in the browser at https://pagination-api-challenge.herokuapp.com/ or through an API client like [Postman](https://www.postman.com/).
### Content
The data set contains 105 objects representing apps with randomly generated app names and IDs that enumarate those objects. For example: 
```JSON
{
    "id": 66,
    "name": "Distributed scalable project"
}
```
### Parameters 
If requesting data within a certain range, the following query parameters are available. 

| Parameters       | Required?     | Valid Values|
| :------------- | :----------: | :----------- |
|  `by` | yes*   | id, name    |
|  `start` | no   | if ordering by id, any number corresponding to an id within the data set; if ordering by name, the name of any app within the data set |
|  `end` | no   | if ordering by id, any number corresponding to an id within the data set; if ordering by name, the name of any app within the data set |
|  `max` | no   | any number between one and the number of items in the data set (seeded data set contains 105 entries) |
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
        "id": 4,
        "name": "Mandatory bottom-line encryption"
    },
    {
        "id": 5,
        "name": "Reactive static matrices"
    },
    {
        "id": 6,
        "name": "Triple-buffered client-server framework"
    }
]
```
---
**Request:** `GET` from `/apps?by=name&start=distributed scalable project&max=3`  
**Response:**
```json
[
    {
        "id": 66,
        "name": "Distributed scalable project"
    },
    {
        "id": 55,
        "name": "Diverse system-worthy intranet"
    },
    {
        "id": 41,
        "name": "Down-sized zero administration utilisation"
    }
]
```

## How It Was Built

### Technologies Used
- [Node.js](https://nodejs.org/en/) as a back-end environment
- [Express](https://expressjs.com/) as a server framework
- [Nodemon](https://nodemon.io/) for automatic server restart in development
- [Faker](https://github.com/Marak/Faker.js#readme) to generate seed data
- [Heroku](https://www.heroku.com/) for deployment

### Approach

1. To generate a subset of data to return, we can `slice` original the data set. To do so, we will need to dynamically generate start and end indices according to the request's query values (or default values). 

2. Firstly, we need to know if the request contains at least one query parameter. If not, we can send the response right away using default values. 

3. If the response does contain a query, we first need to check the `by` parameter since this defines how we will assign other paramater values. We check whether it exists & is a valid value, and then whether to sort by `id` or `name`  

4. Next we assign values for `start`, `max`, and `end`. Since these paramaters are optional, we must check if the request contains paramaters for each. Using conditional logic, we either a sign a value based on the query or a default value to each of `start`, `max`, and `end`. 

5. Importantly, the start and end indices we use to `slice` the data set must be numerical. If sorting by `id`, assigning these values is straightforward. If by `name` however, we must generate a new array containing all of the `name` values in the data set, and assign `start` and `end` values based on the index of the app name matching the query.  

6. Lastly, we check if an `order` value was included in the query. This check takes place after the subset to be sent has already been generated so as not to interfere with the logic that accomplishes this. If an `order` value was included, we only need to check for `desc` or invalid values. We `sort` the subset accordingly. 

7. Ultimately we issue a response in JSON format containing the paginated subset of data, where `apps` is the original, seeded data set: 


### Code 

To issue a response, we `slice` the data set using start and end indices according to the request's query values (or default values). This subset is returned to the user in JSON format.   
<br/>
When a request is made, we first check if the request contains at least one query parameter (below). This way we know which portions of the logic to execute.
1. 
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
If the request includes a query, we first check the `by` parameter – whether it exists and is a valid value, and then whether to sort by `id` or `name` (below). For requests with queries, this check must come first as the value of `by` defines how we assign other paramater values.  
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
Next we assign values for `start`, `max`, and `end` according to the query (or default values if any are not specified). If sorting by `id`, we simply use the query values for `start`, `max`, and `end` (below). If sorting by `name`, we take the index of an array containing all of the `name` values in the data set.   
```JavaScript
start = req.query.start ? Number(req.query.start) : 1;
max = req.query.max ? Number(req.query.max) : 50;
end = req.query.end ? Number(req.query.end) : start + max - 1;
```
Handling cases in which both an `end` and `max` value are defined, we defer to `max` if the `end` value extends beyond what can fit inside the maximum page, subtracting one to adjust for the fact that the array containing the app data is zero-indexed:
```JavaScript
if (end > start + max) {
    end = start + max - 1;
}
```
Lastly, we check if an `order` query was sent and order the matching data accordingly, sorting by the appropriate `by` identifier (below). Since `asc` is the default, we only need to check for `desc` or invalid values. This check is last as the ordering is applied only to the subset of data to be sent. 
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


