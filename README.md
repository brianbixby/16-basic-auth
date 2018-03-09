![cf](https://i.imgur.com/7v5ASc8.png) Lab 18: Asset Management
======

## Submission Instructions
* Continue to work off of the repository you forked on Monday
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
* create an AWS account
* create an AWS Access Key and Secret
  * add the Access Key and Secret to your `.env` file
* create a new model that represents a file type that you want to store on AWS S3
  * ex: `.mp3`, `.mp4`, `.png`, etc
* create a test that uploads one of these files through a route
* use the `aws-sdk` module to assist with file uploading
* use `multer` to parse the file upload request

## Server Endpoints
##### `/api/resource/:resourceID/new-resource`
* **POST** request
  * should pass data as stringifed JSON in the body of a **POST** request to create a new resource

## Testing
##### `/api/resource/:resourceID/new-resource`
* **POST** test **200**
  * for a request with a valid body
  * test to ensure that you have received a CDN URL from S3 that contains a link to your uploaded asset

## Stretch Goal
Create a **DELETE** route and related test that uses the `deleteObject` method (provided by the `aws-sdk` module) to delete a file from S3. You'll want to pass in a `params` object that contains a "bucket" and an "AWS object key" in order to delete the object from s3.

For example:

``` javascript
var params = {
  Bucket: 's3-bucket-name',
  Key: 'object-filename'
}

s3.deleteObject(params)
```