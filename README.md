# full-stack

# About Project
This project is split into 4 parts
- Part 1: Create RESTFUL API and deploy endpoints.

# Part 1
A simple RESTFUL API that manages a list of inventory items. This is done via GET, POST, PUT, DELETE API calls locally or through deployed endpoints using Postman.

# Install
- [npm](https://www.npmjs.com/get-npm)
- [Node](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Postman](https://www.postman.com/downloads/)


# Instructions on how to run the API locally
1. Download or Clone the repository.
2. Open Command Prompt and change your directory to `resthub` by typing `cd resthub`.
3. To start the database (*Mongodb*), type `npm run mongo`. 
    > This Command Prompt must remain open for the **database** to run.
4. To download the dependencies needed, open another Command Prompt in the same directory and type `npm install`.
5. To start the server (*nodejs*), type `npm run dev`.
    > This Command Prompt must remain open for the **server** to run. You should see the following result:

    ```
    [Server] Running RestHub on port 8080. [State: development]
    [Database] Database connected successfully.
    [Database] Sample data added.
    ```
6. And you're done! Open `Postman` and try out GET, POST, PUT and DEL API calls. Refer to the [API Calls](#Example-of-API-Calls-using-postman) below for examples.

# Deploying endpoints
## Information of Deployed API
- Server (*nodejs*) is deployed on `Amazon Web Services (AWS)`. 
    > http://resthubserver-env.eba-ykb43kxe.us-east-2.elasticbeanstalk.com/
- Database (*mongodb*) is deployed on `MongoDB Atlas`.

## Instructions to access deployed endpoints using Postman
1. To access the deployed endpoints, open up your browser or `Postman`, and enter the following links to do a GET request:

    http://resthubserver-env.eba-ykb43kxe.us-east-2.elasticbeanstalk.com/api/items (To display all items)

    http://resthubserver-env.eba-ykb43kxe.us-east-2.elasticbeanstalk.com/api/items/1 (To display item with id 1)

    *It uses `/api/items` route, which is the same as the localhost.*
2. For the other type of request, refer to the [API Calls](#Example-of-API-Calls-using-postman) below for examples. 
    > Replace http://localhost:8080/ with
    > http://resthubserver-env.eba-ykb43kxe.us-east-2.elasticbeanstalk.com/ in the examples.


# Database Data Structure
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

# Example of API Calls using Postman
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

