# Code Fellows: Code 401d22: Full-Stack JavaScript

## Lab 16: Basic Authentication

I created an http server using Express and a user model utilizing Mongo. Users are able to query a local MongoDB to create users and retrieve a user's json web token.

## Tech/frameworks/packages

- node 
- MongoDB
- npm
- node packages
  - Production
    - bcrypt
    - bluebird
    - body-parser
    - cors
    - debug
    - dotenv
    - eslint
    - express
    - http-errors
    - jsonwebtoken
    - mongoose
    - morgan
  - Dev
    - jest
    - superagent


## How to use?
Clone this repo, cd into `lab-brian`, run `npm install`, brew install httpie and mongodb if you do not already have them `brew install httpie mongodb`. Please refernce the installation instructions for MongoDB `https://docs.mongodb.com/manual/administration/install-community/`, there is typically 1 or 2 quick things you need to do after you Brew install it. 

Run `npm run start` from terminal to start the server. Open a new tab in terminal and run `mongod` to start the Mongo process. Open another terminal tab and run `mongo` to open a Mongo shell. Lastly, open up a final terminal tab; this is where you will be making all of your server requests, instructions and examples are below.

Make POST/GET/DELETE/PUT requests to the server and your local MongoDB.

## Routes

#### `POST /api/signup`

Create a new  user with the properties `username`, `email`, `password` and `findHash` which is created for you.

```
http POST :3000/api/signup username=briguy999 email=brianbixby0@gmail.com password=password1
```

Throws an error if any of the requested properties that are not created for you are missing.

Will return a json web token if there are no errors.

#### `GET /api/signin`

Retrieve the json web token for a created user.

```
http -a <username>:<password> :3000/api/signin
```
## Tests

run `jest` to check tests.

#### POST

1. should return the  json web token and a 200 status code if there is no error.

#### GET

1. should return the menu object and a 200 status code if there is no error.

## Contribute

You can totally contribute to this project if you want. Fork the repo, make some cool changes and then submit a PR.

## Credits

Initial codebase created by Code Fellows.

## License

MIT. Use it up!