# Pagination API Challenge
An API for accessing a seeeded data set of apps that returns paginated, JSON-format app data according to user queries. 

## Range Format 

#### Parameters


Making a `GET` request on the `/apps` endpoint 

| Parameters       | Required?     | Valid Values|
| :------------- | :----------: | -----------: |
|  `by` | yes   | id, name    |
|  `start` | no   | Any number corresponding to an id within the data set if ordering by id, or a name of any app within the data set if ordering by name    |
|  `end` | no   | Any number corresponding to an id within the data set if ordering by id, or a name of any app within the data set if ordering by name     |
|  `end` | no   | Any number between zero and the number of items in the data set    |
|  `order` | no   | asc, desc    |



- Paramaters 
  - required/not
  - expected response
  - defaults

## Usage

## How It Works
