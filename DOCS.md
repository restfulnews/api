# RESTfulNews API v0.1.4

Open source news API for quants.

- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Google](#authenticate-with-google)
	
- [Company](#company)
	- [Create Company](#create-company)
	- [Delete Company](#delete-company)
	- [Retrieve company](#retrieve-company)
	- [Update Company](#update-company)
	
- [News](#news)
	- [Create News](#create-news)
	- [Delete News](#delete-news)
	- [Retrieve News](#retrieve-news)
	- [1. Search for news articles](#1.-search-for-news-articles)
	- [Update News](#update-news)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Test if user exists](#test-if-user-exists)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Send email](#send-email)
	- [Update password](#update-password)
	- [Send email](#send-email)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Examples

Curl Usage:

```
curl http://api.restfulnews.com/auth -XPOST \
-H 'Content-Type:application/json' \
-d '{"email":"<email>","password":"<password>"}' \
--oauth2-bearer "<bearer token>"
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

{
 "token":"<bearer token>",
 "user": {
   "id":"<user_id token>",
   "name":"<name>",
   "picture":"<display picture link>",
   "role":"<role>",
   "email":"<email>",
   "createdAt":"<created at date>"
 }
}
```
## Authenticate with Google



	POST /auth/google

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>Google user accessToken.</p>							|

### Examples

Curl Usage:

```
curl http://api.restfulnews.com/auth -XPOST \
-H 'Content-Type:application/json' \
-d '{"token":"<Google OAuth Token>"}' \
--oauth2-bearer "<bearer token>"
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

{
 "token":"<bearer token>",
 "user": {
     "id":"<user_id token>",
     "name":"<name>",
     "picture":"<display picture link>",
     "role":"<role>",
     "email":"<email>",
     "createdAt":"<created at date>"
 }
}
```
# Company

## Create Company



	POST /company

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>user access token.</p>							|

### Examples

Curl Usage:

```
curl --request POST \
--url http://api.restfulnews.com/company \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \
--data '{"name":"<name>", "ticker":"<ticket>", "market":"<market>"}'
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

{
 "id": "<company id>",
 "createdAt": "<created at date>",
 "updatedAt": "<updated at date>",
 "name": "<name>"
}
```
## Delete Company



	DELETE /company/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>admin access token.</p>							|

### Examples

Curl Usage:

```
curl --request DELETE \
--url http://api.restfulnews.com/company/5abcec87b8329b17e45b3e50 \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \
```

## Retrieve company



	GET /company

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>admin access token.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

### Examples

Curl Usage:

```
curl --request GET \
--url http://api.restfulnews.com/company \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

[
 {
  "id": "<company id>",
  "createdAt": "<created at date>",
  "updatedAt": "<updated at date>",
  "name": "<name>"
 },
 ...
]
```
## Update Company



	PUT /company/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>user access token.</p>							|

### Examples

Curl Usage:

```
curl --request PUT \
--url http://api.restfulnews.com/company/<company id> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \
--data '{"name":"<name>", "market":"<market>"}'
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

{
 "id": "<company id>",
 "createdAt": "<created at date>",
 "updatedAt": "<updated at date>",
 "name": "<name>"
}
```
# News

## Create News



	POST /news

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>user access token.</p>							|

### Examples

Curl Usage:

```
curl --request POST \
--url http://api.restfulnews.com/news \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \
--data '{"title": "<title>", "publishedAt": "<published at date>", \
 "fingerprint": "<fingerprint id>", "url": "<url>", "abstract": "<abstract>", \
 "thumbnail": "<thumbnail link>", "source": "<source>"}'

{
 "id": "<news article id>",
 "createdAt": "<created at date>",
 "updatedAt": "<updated at date>",
 "url": "<url>",
 "title": "<title>",
 "source": "<source>",
 "abstract": "<abstract>",
 "thumbnail": "<thumbnail link>"
}
```

## Delete News



	DELETE /news/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>admin access token.</p>							|

### Examples

Curl Usage:

```
curl --request DELETE \
--url http://api.restfulnews.com/news/<news article id> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'
```

## Retrieve News



	GET /news/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| BearerToken			| String			|  <p>user access token.</p>							|

### Examples

Curl Usage:

```
curl --request GET \
--url http://api.restfulnews.com/news/<news article id> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'

{
 "id": "<news article id>",
 "createdAt": "<created at date>",
 "updatedAt": "<updated at date>",
 "url": "<url>",
 "title": "<title>",
 "source": "<source>",
 "abstract": "<abstract>",
 "thumbnail": "<thumbnail link>"
}
```

## 1. Search for news articles



	GET /news/search


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| topics			| String			|  <p>News topics split by a comma(,).</p>							|
| start_date			| Date.toISOString			|  <p>Pulished date interval start. (format: YYYY-MM-DDTHH:mm:ss.sssZ)</p>							|
| end_date			| Date.toISOString			|  <p>Pulished date interval end. (format: YYYY-MM-DDTHH:mm:ss.sssZ)</p>							|
| BearerToken			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

### Examples

Curl Usage:

```
curl --request GET \
--url http://api.restfulnews.com/news/search?topics=<topics>&start_date=<iso_time>&end_date=<iso_time> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \

[
{
 "title": "<title>",
 "publishedAt": "<published at date>",
 "fingerprint": "<fingerprint id>",
 "url": "<url>",
 "abstract": "<abstract>",
 "thumbnail": "<thumbnail>",
 "source": "<source>"
},
...
}
]
```

## Update News



	PUT /news/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>user access token.</p>							|

### Examples

Curl Usage:

```
curl --request PUT \
--url http://api.restfulnews.com/news/<news article id> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \
--data '{"title":"<title>", "url":"<url", "source":"<source>", \
"abstract":"<abstract>", "thumbnail":"<thumbnail>"}'
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

{
 "id": "<news article id>",
 "createdAt": "<created at date>",
 "updatedAt": "<updated at date>",
 "url": "<url>",
 "title": "<title>",
 "source": "<source>",
 "abstract": "<abstract>",
 "thumbnail": "<thumbnail link>"
}
```
# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's picture.</p>							|

### Examples

Curl Usage:

```
curl --request POST --url http://api.restfulnews.com/users \
--header 'content-type: application/json' \
--data '{ "email": "<email>", "password": "<password>", \
"name": "<name>", "picture": "<picture link>"}'
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

{
 "token": <"bearer token">,
 "user":
 {
   "id": "<user id>",
   "name": "<name>",
   "picture": "<picture link>",
   "role": "<role>",
   "email": "<email>",
   "createdAt" : "<created at date>"
 }
}
```
## Delete user



	DELETE /users/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>User access_token.</p>							|

### Examples

Curl Usage:

```
curl --request DELETE \
--url 'http://api.restfulnews.com/users/<user_id>' \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'
```

## Test if user exists



	POST /email/:email


### Examples

Curl Usage:

```
curl --request POST \
--url http://api.restfulnews.com/users/<email> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'
```

## Retrieve current user



	GET /users/me

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>User access_token.</p>							|

### Examples

Curl Usage:

```
curl --request GET \
--url http://api.restfulnews.com/users/me \
--header 'authorization: Bearer <Bearer Token>' \
--header 'content-type: application/json'
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

{
 "id":"<user id>",
 "name":"<name>",
 "picture":"<picture link>",
 "role":"<role>",
 "email":"<email>",
 "createdAt":"<created at date>"
}
```
## Retrieve user



	GET /users/:id


### Examples

Curl Usage:

```
curl --request GET --url http://api.restfulnews.com/users/<user id> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

{
 "id": "<user id>",
 "name": "<name>",
 "picture": "<picture link>",
 "role": "<role>"
}
```
## Retrieve users



	GET /users

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>User access_token.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

### Examples

Curl Usage:

```
curl --request GET \
--url http://api.restfulnews.com/users \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

[
 {
   "id": "<user id>",
   "name": "<name>",
   "picture": "<picture>",
   "role": "<role>",
   "email": "<email>",
   "createdAt": "<created at date>"
 },
 ...
]
```
## Send email



	GET /users/reset-code


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| Object			|  <p>Email address to receive the password reset token.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

### Examples

Curl Usage:

```
curl --request PUT \
 --url http://api.restfulnews.com/users/<user_id>/password \
 --header 'authorization: Bearer <Bearer Token>' \
 --header 'content-type: application/json' \
 --data '{"password":"<new password>}'
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

{
 "id": "<user id>",
 "name": "<name>",
 "picture": "<picture link>",
 "role": "<role>",
 "email": "<email>",
 "createdAt": "<created at date>"
}
```
## Send email



	POST /users/password/


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address</p>							|
| code			| String			|  <p>Code</p>							|

## Update user



	PUT /users/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>User access_token.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|

### Examples

Curl Usage:

```
curl --request PUT \
 --url http://api.restfulnews.com/users/<user_id>/update \
 --header 'authorization: Bearer <Bearer Token>' \
 --header 'content-type: application/json' \
 --data '{"name": "<name>", "picture": "<picture link>"}'
```

### Success Response

Success-Response:

```
HTTP/1.1 200 OK

{
 "id": "<user id>",
 "name": "<name>",
 "picture": "<picture link>",
 "role": "<role>",
 "email": "<email>",
 "createdAt": "<created at date>"
}
```

