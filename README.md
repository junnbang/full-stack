# full-stack

![Travis](https://travis-ci.org/junnbang/full-stack.svg?branch=master)

# About Project
This project is split into 4 parts. Note that each part builds on the previous part. 
- Part 1: Create RESTFUL API and deploy endpoints.
- Part 2: Create test cases and integrate Continuous Integration tool

# Content Page
1. Part 1
    1. [Install](#install)
    1. [Instructions on how to run the API locally](#Instructions-on-how-to-run-the-API-locally)
    1. [Deploying endpoints](#Deploying-endpoints)
    1. [Database Data Structure](#Database-Data-Structure)
    1. [Example of API Calls using Postman](#Example-of-API-Calls-using-Postman)
1. Part 2
    1. [Instructions on how to run tests locally](#Instructions-on-how-to-run-tests-locally)
    1. [Instructions on how is Travis used for automated testing](#Instructions-on-how-Travis-used-for-automated-testing)

# Part 1
A simple RESTFUL API that manages a list of inventory items. This is done via GET, POST, PUT, DELETE API calls locally or through deployed endpoints using Postman.

Tech Stack:
- SERVER: `NodeJS`
- DATABASE: `MongoDB`

## Install
- [npm](https://www.npmjs.com/get-npm)
- [Node](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Postman](https://www.postman.com/downloads/)


## Instructions on how to run the API locally
1. Download or Clone the repository.
2. Open Command Prompt and change your directory to `resthub` by typing `cd resthub`.
3. To start the database (*MongoDB*), type `npm run mongo`. 
    > This Command Prompt must remain **open** for the *database* to run.
4. To download the dependencies needed, open another Command Prompt in the same directory and type `npm install`.
5. To start the server (*NodeJS*), type `npm run dev`.
    > This Command Prompt must remain **open** for the *server* to run. You should see the following result:

    ```
    [Server] Running RestHub on port 8080. [State: development]
    [Database] Database connected successfully.
    [Database] Sample data added.
    ```
6. And you're done! Open `Postman` and try out GET, POST, PUT and DEL API calls. Refer to the [API Calls](#Example-of-API-Calls-using-postman) below for examples.

## Deploying endpoints
### Information of Deployed API
- Server (*NodeJS*) is deployed on `Amazon Web Services (AWS)`. 
    > http://resthubserver-env.eba-ykb43kxe.us-east-2.elasticbeanstalk.com/
- Database (*MongoDB*) is deployed on `MongoDB Atlas`.

### Instructions to access deployed endpoints using Postman
1. To access the deployed endpoints, open up your browser or `Postman`, and enter the following links to do a GET request:

    http://resthubserver-env.eba-ykb43kxe.us-east-2.elasticbeanstalk.com/api/items (To display all items)

    http://resthubserver-env.eba-ykb43kxe.us-east-2.elasticbeanstalk.com/api/items/1 (To display item with id 1)

    *It uses `/api/items` route, which is the same as the localhost.*
2. For the other type of request, refer to the [API Calls](#Example-of-API-Calls-using-postman) below for examples. 
    > Replace http://localhost:8080/ with
    > http://resthubserver-env.eba-ykb43kxe.us-east-2.elasticbeanstalk.com/ in the examples.


## Database Data Structure
The database only consists of 1 data structure which is `items`.

It consists of the following fields: (FORMAT: [NAME : DATATYPE])
- name: `string` (required)
- quantity: `Number` (required)
- price: `Decimal`
- seller_info
  - name: `string`
  - phone: `string`

Sample data:
```
{
    "name": "Canned Food",
    "quantity": 10,
    "price": 10.50,
    "seller_info": {
        "name": "Chloe",
        "phone": "92235003"
    }
}
```

## Example of API Calls using Postman
1. `GET` Request

    http://localhost:8080/api/items (To display all items)
    http://localhost:8080/api/items (To display item with id 1)

    Example
    ![get-request-result](resthub/images/get-request-result.PNG)

2. `POST` Request

    http://localhost:8080/api/items (To add an item)
    
    Example
    ![post-request-result](resthub/images/post-request-result.PNG)
    
3. `PUT` Request

    http://localhost:8080/api/items/1 (Update item with id 1)

    Example
    ![put-request-result](resthub/images/put-request-result.PNG)

4. `DELETE` Request

    http://localhost:8080/api/items/1 (Delete item with id 1)

    Example
    ![delete-request-result](resthub/images/delete-request-result.PNG)

# Part 2
Create test cases for the API calls and use Continuous Integration(CI) tool to automate testing.

Tech Stack:
- Testing Framework: Mocha
- Assertion Library: Chai
- CI Tool: Travis

## Instructions on how to run tests locally
1. Under `resthub` directory, type `npm install` to download all dependencies.
2. Before running the test, start the database by typing `npm run mongo`.
    > This Command Prompt must remain **open** for the *database* to run.

    > The tests are executed using another database which keeps the development/production database clean.
3. Open another Command Prompt in the same directory, and type `npm run test`. This will execute the test cases. The output is as shown below.

    ![test-result](resthub/images/test-result.PNG)

## Instructions on how Travis used for automated testing
1. To use Travis to automate testing, `.travis.yml` file is configured and placed under the root folder. In this case, it triggers a build under the directory, `resthub`.
    
    ```
    language: node_js
    node_js:
    - 12

    services:
    - mongodb

    env:
    - TEST_DIR=resthub

    script:
    - cd $TEST_DIR && npm install && npm test
    ```
2. For every commit to `master` branch, **Travis** will automatically trigger a build. This will check if the recent commit can pass all the test cases. 

    To view the most recent build:

    https://travis-ci.org/github/junnbang/full-stack

    Screenshot of Travis Build:
    ![travis-result](resthub/images/travis-test.PNG)
