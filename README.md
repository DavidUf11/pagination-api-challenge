# Pagination API Challenge
An API for accessing a seeded data set of apps that returns paginated, JSON-format app data according to user queries. 

## Usage

### Parameters 
If requesting data within a certain range, the following query parameters are available. 

| Parameters       | Required?     | Valid Values|
| :------------- | :----------: | :----------- |
|  `by` | yes   | id, name    |
|  `start` | no   | If ordering by id, any number corresponding to an id within the data set; if ordering by name, a name of any app within the data set |
|  `end` | no   | If ordering by id, any number corresponding to an id within the data set; if ordering by name, a name of any app within the data set |
|  `end` | no   | Any number between zero and the number of items in the data set (seeded data set contains 105 entries) |
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

Request: `GET` from `https://pagination-api-challenge.herokuapp.com/apps?by=id&start=3&end=6&order=desc` 
Response: 
```
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
    },
    {
        "id": 3,
        "name": "my-app-003"
    }
]
```

Request `GET` from `https://pagination-api-challenge.herokuapp.com/apps?by=name&start=my-app-027&max=4`
Response:
```
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
    },
    {
        "id": 30,
        "name": "my-app-030"
    }
]
```

## Usage

## How It Works
