# RESTful News API
This service enables the customers to receive news from all over the world. The source of the news will be from several sources including The Guardian, USA Tday etc.  

The API conventions we aim to use are outlined in the [OpenAPI specifications](https://swagger.io/docs/specification/about/){:target="_blank"}.

Express based RESTful News API for starter applications. This API's skeleton is based on the Yo RESTful API, with an updated authentication routine (without being transpiled using babel). 

## Contributing

Help keep the code clean be following our contribution Protocols ([CONTRIBUTING.md](CONTRIBUTING.md)).

Versioning will be managed by the product manager(s) and can be found in the changelog ([CHANGELOG.md](CHANGELOG.md))

## Requirements
- MongoDB
- Node >7.4
- pm2 (production)

## Commands

```bash
npm test # test using Jest
npm run test:unit # run unit tests
npm run test:integration # run integration tests
npm run coverage # test and open the coverage report in the browser
npm run lint # lint using ESLint
npm run dev () # run the API in development mode
npm run prod # run the API in production mode
npm run docs # generate API docs
```

## Development task

```npm run dev```

## Authentication

[HTTP BASIC Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme) returning a JWT token.

#### Creating a user
```bash
curl -X POST http://0.0.0.0:9000/users -i -d "email=test@example.com&password=123456&access_token=MASTER_KEY_HERE"
```

#### Authenticating a user
```bash
curl -X POST http://0.0.0.0:9000/auth -i -u test@example.com:123456 -d "access_token=MASTER_KEY_HERE"
```

## Error handling

Errors are handled by the `services/error` middleware. You can pass errors within an async call by calling `next(error)` where error is an Object with a Prototype of error. The APIError constructor function has been provided for creating anticipated operational errors.

## Logging

Logging is achieved via Pino. In development mode we can pipe Node's stdout into Pino for pretty printing.

## Directory structure

### Overview

You can customize the `src` and `api` directories.

```
src/
├─ api/
│  ├─ user/
│  │  ├─ controller.js
│  │  ├─ index.js
│  │  ├─ index.test.js
│  │  ├─ model.js
│  │  └─ model.test.js
│  └─ index.js
├─ services/
│  ├─ express/
│  ├─ facebook/
│  ├─ mongoose/
│  ├─ passport/
│  ├─ sendgrid/
│  └─ your-service/
├─ app.js
├─ config.js
└─ index.js
```

### src/api/

Here is where the API endpoints are defined. Each API has its own folder.

#### src/api/some-endpoint/model.js

It defines the Mongoose schema and model for the API endpoint. Any changes to the data model should be done here.

#### src/api/some-endpoint/controller.js

This is the API controller file. It defines the main router middlewares which use the API model.

#### src/api/some-endpoint/index.js

This is the entry file of the API. It defines the routes using, along other middlewares (like session, validation etc.), the middlewares defined in the `some-endpoint.controller.js` file.

### services/

Here you can put `helpers`, `libraries` and other types of modules which you want to use in your APIs.

# Production

# First time run on AWS Ubuntu 16.04 AMI
1. Clone repo to `/srv/restful-api` (use `~/.ssh/read-key` & `~/.ssh/config` file)
2. Set environment variables file `.env` (see .env.example)
2. Run `restful-api/scripts/init.sh` to set up server

## Useful commands

- `docker-compose logs` Show logs
- TODO: Route up proper PM2 logs to file

## Environment setup

Environment variables from `.env` are accessible by the Node app through docker-compose.yml which routes them into the api container. PM2 automatically makes them available to each Node server.
