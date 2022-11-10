### Simple-CRUD-API

## Description

Simple REST API which implements CREATE,READ,UPDATE,DELETE logic with user entities

```bash

#Endpoints

$ POST /users
  Description:
    Allows you to create a new user
  Body:
    firstName [required]
    lastName [required]
  Headers:
    X-API-Key [required] (Should be specified in the .env file)

$ GET /users
  Description:
    Returns a list of users by specified filters in the request query parameters.
    If no parameters were provided, returns all users.
  Params:
    -firstName [optional],
    -lastName [optional],
    -createdBefore [optional] [YYYY-MM-DDTHH:MM:SS] (Returns users created before the specified date)

$ PUT /users/:id
  Description:
    Allows you to update user''s information
  Body:
    firstName [optional]
    lastName [optional]
  Headers:
    X-API-Key [required] (Should be specified in the .env file)

$ DELETE /users/:id
  Description:
    Allows you to delete specific user by id
  Headers:
    X-API-Key [required] (Should be specified in the .env file)

```
## Installation

```bash
#Install all dependencies
$ npm install

#After installing all dependencies, populate the .env with all the necessary data

```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```
