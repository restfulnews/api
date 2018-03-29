# restful-news v0.0.1



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
	- [Search for news articles](#search-for-news-articles)
	- [Update News](#update-news)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Send email](#send-email)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Test if user exists](#test-if-user-exists)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Examples

Example Usage:

```
curl http://0.0.0.0:9000/auth -XPOST \
-H 'Content-Type:application/json' \
-d '{"email":"bobsagget@gmail.com","password":"bobsagget"}' \
--oauth2-bearer "<bearer token>"

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


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

### Examples

Example Usage:

```
curl http://0.0.0.0:9000/auth -XPOST \
-H 'Content-Type:application/json' \
-d '{"token":"<Google OAuth Token>"}' \
--oauth2-bearer "<bearer token>"

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


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

### Examples

Example Usage:

```
curl --request POST \
--url http://localhost:9000/company \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \
--data '{"name":"<name>", "ticker":"<ticket>", "market":"<market>"}'

{
 "id": "<company id>",
 "createdAt": "<created at date>",
 "updatedAt": "<updated at date>",
 "name": "<name>"
}
```

## Delete Company



	DELETE /company/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

### Examples

Example Usage:

```
curl --request DELETE \
--url http://localhost:9000/company/5abcec87b8329b17e45b3e50 \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \
```

## Retrieve company



	GET /company


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

### Examples

Example Usage:

```
curl --request GET \
--url http://localhost:9000/company \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \

[
 {
  "id": "<company id>",
  "createdAt": "<created at date>",
  "updatedAt": "<updated at date>",
  "name": "<name>"
 },
 {
  "id": "<company id>",
  "createdAt": "<created at date>",
  "updatedAt": "<updated at date>",
  "name": "<name>"
 }
]
```

## Update Company



	PUT /company/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

### Examples

Example Usage:

```
curl --request PUT \
--url http://localhost:9000/company/<company id> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \
--data '{"name":"<name>", "market":"<market>"}'

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


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

### Examples

Example Usage:

```
curl --request POST \
--url http://localhost:9000/news \
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


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

### Examples

Example Usage:

```
curl --request DELETE \
--url http://localhost:9000/news/<news article id> \
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

Example Usage:

```
curl --request GET \
--url http://localhost:9000/news/<news article id> \
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

## Search for news articles



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

Example Usage:

```
curl --request GET \
--url http://localhost:9000/news/search?topics=<topics> \
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
{
 "title": "<title>",
 "publishedAt": "<published at date>",
 "fingerprint": "<fingerprint id>",
 "url": "<url>",
 "abstract": "<abstract>",
 "thumbnail": "<thumbnail>",
 "source": "<source>"
}
]
```

## Update News



	PUT /news/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

### Examples

Example Usage:

```
curl --request PUT \
--url http://localhost:9000/news/<news article id> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json' \
--data '{"title":"<title>", "url":"<url", "source":"<source>", \
"abstract":"<abstract>", "thumbnail":"<thumbnail>"}'

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

# PasswordReset

## Send email



	GET /users/reset-code


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| Object			|  <p>Email address to receive the password reset token.</p>							|

## Send email



	POST /users/password/


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address</p>							|
| code			| String			|  <p>Code</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's picture.</p>							|

### Examples

Example Usage:

```
curl --request POST --url http://localhost:9000/users \
--header 'content-type: application/json' --data '{ \
"email": "<email>", "password": "<password>", \
"name": "<name>", "picture": "<picture link>"}'

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


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

### Examples

Example Usage:

```
curl --request DELETE \
--url 'http://localhost:9000/users/<user_id>' \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'
```

## Test if user exists



	POST /email/:email


### Examples

Example Usage:

```
curl --request POST \
--url http://localhost:9000/users/<email> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'
```

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

### Examples

Example Usage:

```
curl --request GET \
--url http://localhost:9000/users/me \
--header 'authorization: Bearer <Bearer Token>' \
--header 'content-type: application/json'

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

Example Usage:

```
curl --request GET --url http://localhost:9000/users/<user id> \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'

{
 "id": "<user id>",
 "name": "<name>",
 "picture": "<picture link>",
 "role": "<role>"
}
```

## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

### Examples

Example Usage:

```
curl --request GET \
--url http://localhost:9000/users \
--header 'authorization: Bearer <bearer token>' \
--header 'content-type: application/json'

[
 {
   "id": "<user id>",
   "name": "<name>",
   "picture": "<picture>",
   "role": "<role>",
   "email": "<email>",
   "createdAt": "<created at date>"
 },
 {
   "id": "<user id>",
   "name": "<name>",
   "picture": "<picture>",
   "role": "<role>",
   "email": "<email>",
   "createdAt": "<created at date>"
 }
]
```

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

Example Usage:

```
curl --request PUT \
 --url http://localhost:9000/users/<user_id>/password \
 --header 'authorization: Bearer <Bearer Token>' \
 --header 'content-type: application/json' \
 --data '{"password":"<new password>}'

{
 "id": "<user id>",
 "name": "<name>",
 "picture": "<picture link>",
 "role": "<role>",
 "email": "<email>",
 "createdAt": "<created at date>"
}
```

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|

### Examples

Example Usage:

```
curl --request PUT \
 --url http://localhost:9000/users/<user_id>/update \
 --header 'authorization: Bearer <Bearer Token>' \
 --header 'content-type: application/json' \
 --data '{"name": "<name>", "picture": "<picture link>"}'

{
 "id": "<user id>",
 "name": "<name>",
 "picture": "<picture link>",
 "role": "<role>",
 "email": "<email>",
 "createdAt": "<created at date>"
}
```


