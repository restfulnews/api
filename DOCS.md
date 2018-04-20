# RESTfulNews API v0.1.4

Open source news API for quants.

- [Auth](#auth)
	- [Basic Authentication](#basic-authentication)
	- [Authenticate with Google](#authenticate-with-google)
	
- [News](#news)
	- [Create News](#create-news)
	- [Delete News](#delete-news)
	- [Retrieve news](#retrieve-news)
	- [Update News](#update-news)
	
- [Search](#search)
	- [Search for news articles (main)](#search-for-news-articles-(main))
	
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

## Basic Authentication

<p>All requests to our API require authentication. The Bearer token must be provided as part of header for every request, using the authorisation Bearer variable. This token is retrieved after a successful login with an e-mail and password using Basic Authentication.</p>

	POST /auth/basic


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User's Email address</p>							|
| password			| String			|  <p>User's password</p>							|

### Examples

Curl Usage:

```
curl http://api.restfulnews.com/auth -XPOST \
-H 'Content-Type:application/json' \
-d '{"email":"<email>","password":"<password>"}' \
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

<p>All requests to our API require authentication. The Bearer token must be provided as part of header for every request, using the authorisation Bearer variable. This token is retrieved after a successful login with using Google Authentication.</p>

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
# News

## Create News

<p>Creates a News object.</p>

	POST /news

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>user access token.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| String			|  <p>Title of the news article.</p>							|
| abstract			| String			|  <p>Abstract of the news article.</p>							|
| url			| String			| **optional** <p>URL to the news article.</p>							|
| source			| String			| **optional** <p>URL Source to the news article.</p>							|
| thumbnail			| String			| **optional** <p>URL Source to the news article thumbnail.</p>							|
| publishedAt			| Date.toISOString			| **optional** <p>Pulished date of the news article. (format: YYYY-MM-DDTHH:mm:ss.sssZ)</p>							|

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

<p>Deletes an existing News object.</p>

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

## Retrieve news

<p>Retrieves a list of News objects.</p>

	GET /news

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
--url http://api.restfulnews.com/news \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'

[
 {
  "id": "<news article id>",
  "createdAt": "<created at date>",
  "updatedAt": "<updated at date>",
  "url": "<url>",
  "title": "<title>",
  "source": "<source>",
  "abstract": "<abstract>",
  "thumbnail": "<thumbnail link>"
 },
 ...
]
```

## Update News

<p>Updates an existing News object with new information.</p>

	PUT /news/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>user access token.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| String			|  <p>Title of the news article.</p>							|
| abstract			| String			|  <p>Abstract of the news article.</p>							|
| url			| String			| **optional** <p>URL to the news article.</p>							|
| source			| String			| **optional** <p>URL Source to the news article.</p>							|
| thumbnail			| String			| **optional** <p>URL Source to the news article thumbnail.</p>							|

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
# Search

## Search for news articles (main)

<p>Search for news articles from our news sources based which can be filtered by Topic, Company, Pulished Date.</p>

	GET /search

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Bearer			| String			|  <p>user access token.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| topics			| String			|  <p>News topics split separated by a comma(,).</p>							|
| companyids			| String			|  <p>List of company id's separated by a comma(,).</p>							|
| start_date			| Date.toISOString			| **optional** <p>Pulished date interval start. (format: YYYY-MM-DDTHH:mm:ss.sssZ)</p>							|
| end_date			| Date.toISOString			| **optional** <p>Pulished date interval end. (format: YYYY-MM-DDTHH:mm:ss.sssZ)</p>							|
| limit			| Integer			| **optional** <p>Maximum news articles to display per page.</p>							|
| page			| Integer			| **optional** <p>Page number of results.</p>							|

### Examples

Curl Usage:

```
curl --request GET \
--url http://api.restfulnews.com/search?topics=<topics>&start_date=<iso_time>&end_date=<iso_time>&companyids=<list of company id's> \
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

Note: the `fingerprint` property is used to distinguish news articles, and is
generated from a hash of the news content.
```

# User

## Create user

<p>Creates a user with the information provided in the parameters.</p>

	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			|  <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

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

<p>Deletes an existing user with the specified User ID.</p>

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

<p>Checks if a user exists with the specified email.</p>

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

<p>Gets the current user who is logged in.</p>

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

<p>Retrieves a user's data when given the User ID.</p>

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

<p>Gets a list of all users.</p>

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

<p>Sends a password reset code to the specified E-mail address.</p>

	GET /users/reset-code


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| Object			|  <p>Email address to receive the password reset token.</p>							|

## Update password

<p>Updates an existing User's password.</p>

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

<p>Updates an existing User's information based on the parameters entered.</p>

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

