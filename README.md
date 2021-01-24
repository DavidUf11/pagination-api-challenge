# Pagination API Challenge
An API for accessing a seeded data set of apps that returns paginated, JSON-format app data according to user queries. 

## Usage

### Parameters 
If requesting data within a certain range, the following query parameters are available. 

| Parameters       | Required?     | Valid Values|
| :------------- | :----------: | :----------- |
|  `by` | yes   | id, name    |
|  `start` | no   | if ordering by id, any number corresponding to an id within the data set; if ordering by name, a name of any app within the data set |
|  `end` | no   | if ordering by id, any number corresponding to an id within the data set; if ordering by name, a name of any app within the data set |
|  `end` | no   | any number between zero and the number of items in the data set (seeded data set contains 105 entries) |
|  `order` | no   | asc, desc    |

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

**Request:** `GET` from `https://pagination-api-challenge.herokuapp.com/apps?by=id&start=4&end=6&order=desc` 
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
**Request:** `GET` from `https://pagination-api-challenge.herokuapp.com/apps?by=name&start=my-app-027&max=3`  
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
To issue the response, we `slice` the data set using start and end indices according to query parameters in the request (or default values). This subset is returned to the user in JSON format. 
<br/>
When a request is made, we first check if the request contains at least one query parameter:
```
if (JSON.stringify(req.query) !== "{}") {
    // handling a request with a query
} else {
    // sending the response based on default paramater values
}
```
If the request contains no parameters, we sort the data by id in ascending order, and assign default start and end values:
```
apps.sort((a, b) => (a.id > b.id ? 1 : -1));
    start = 1;
    end = 50;
```
If the request contains at least one paramater, we first check the `by` parameter – if it exists and is a valid value, and then whether to sort by `id` or `name`.
<br>
Next we assign values for `start`, `max`, and `end` according to the query (or default values if they are not specified). If 

