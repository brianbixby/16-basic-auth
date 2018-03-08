![cf](https://i.imgur.com/7v5ASc8.png) Lab 17: Bearer Authorization
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
* Open a pull request to this repository
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Configuration 
Configure the root of your repository with the following files and directories. Thoughtfully name and organize any additional configuration or module files.
* **README.md** - contains documentation
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file 
* **.eslintrc** - contains the course linter configuratoin
* **.eslintignore** - contains the course linter ignore configuration
* **package.json** - contains npm package config
  * create a `lint` script for running eslint
  * create a `start` script for running your server
  * create a `test` script for running your tests
* **server.js** - runs your application
* **model/** - contains mongoose schemas
* **route/** - contains your routes
* **lib/** - contains custom middleware and helpers
* **\_\_test\_\_/** - contains route tests

## Feature Tasks
##### Minimum Requirements
* create a new branch and use the same forked repository that you created yesterday
* create a `bearer-auth-middleware` module (feel free to use the one from lecture as a reference point)
* create a new resource that has at least three properties
  * this resource must have a property of `userID` that references the `_id` of the user that created the resource
* as always, use the **npm** `debug` module to log function calls that are used within your application
* use the express `Router` to create routes for doing **RESTFUL CRUD** operations against your resource

## Server Endpoints
##### `/api/resource-name`
* **POST** request
  * should pass data as stringifed JSON in the body of a **POST** request to create a new resource

##### `/api/resource-name/:id`
* **GET** request
  * should pass the id of a resource though the url endpoint to `req.params` to fetch a resource   
* **PUT** request
  * should pass data as stringifed JSON in the body of a put request to update a resource
* **DELETE** request
  * should pass the id of a resource though the url endpoint *(using `req.params`)* to delete a resource   

## Testing
##### `/api/resource-name`
* **GET** test **200**
  * for requests made with a valid id
* **GET** test **401**
  * if no token was provided
* **GET** test **404**
  * for a valid request with an id that was not found
* **PUT** test **200**
  * for a post request with a valid body
* **PUT** test **401**
  * if no token was provided
* **PUT** test **400**
  * if the body was invalid
* **PUT** test **404**
  * for a valid request made with an id that was not found
* **POST** test **200**
  * for a request with a valid body
* **POST** test **401**
  * if no token was provided
* **POST** test **400**
  * if no body was provided or if the body was invalid
* create a test to ensure that your API returns a status code of **404** for routes that have not been registered

## Stretch Goals
* **GET** request to `/api/resource-name` should return an array of all of the ids for that resource