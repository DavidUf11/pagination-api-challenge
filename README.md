# Pagination API Challenge
An API for accessing a seeeded data set of apps that returns paginated, JSON-format app data according to user queries. 

## Range Format 

### Parameters


Making a `GET` request on the `/apps` endpoint 

| Parameters       | Required?     | Valid Values|
| :------------- | :----------: | :----------- |
|  `by` | yes   | id, name    |
|  `start` | no   | Any number corresponding to an id within the data set if ordering by id, or a name of any app within the data set if ordering by name    |
|  `end` | no   | Any number corresponding to an id within the data set if ordering by id, or a name of any app within the data set if ordering by name     |
|  `end` | no   | Any number between zero and the number of items in the data set    |
|  `order` | no   | asc, desc    |

#### Default Values
- `by`: "id"
- `start`: "1"
- `end`: "50"
- `max`: "50"
- `order`: "asc"

#### Examples

Request: `GET` from `https://pagination-api-challenge.herokuapp.com/apps?by=id&start=3&end=7&order=desc` 
Response: 
```
[
    {
        "id": 7,
        "name": "my-app-007"
    },
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
    },
    {
        "id": 3,
        "name": "my-app-003"
    }
]
```

## Usage

## How It Works
