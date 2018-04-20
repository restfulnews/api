define({ "api": [
  {
    "type": "post",
    "url": "/auth/basic",
    "title": "Basic Authentication",
    "name": "Authenticate",
    "group": "Auth",
    "description": "<p>All requests to our API require authentication. The Bearer token must be provided as part of header for every request, using the authorisation Bearer variable. This token is retrieved after a successful login with an e-mail and password using Basic Authentication.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's Email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User Bearer <code>token</code> to be passed to other requests.</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Current user's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"token\":\"<bearer token>\",\n \"user\": {\n   \"id\":\"<user_id token>\",\n   \"name\":\"<name>\",\n   \"picture\":\"<display picture link>\",\n   \"role\":\"<role>\",\n   \"email\":\"<email>\",\n   \"createdAt\":\"<created at date>\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Master access only or invalid credentials.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl http://api.restfulnews.com/auth -XPOST \\\n-H 'Content-Type:application/json' \\\n-d '{\"email\":\"<email>\",\"password\":\"<password>\"}' \\",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/auth/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/google",
    "title": "Authenticate with Google",
    "name": "AuthenticateGoogle",
    "group": "Auth",
    "description": "<p>All requests to our API require authentication. The Bearer token must be provided as part of header for every request, using the authorisation Bearer variable. This token is retrieved after a successful login with using Google Authentication.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>Google user accessToken.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User <code>access_token</code> to be passed to other requests.</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Current user's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"token\":\"<bearer token>\",\n \"user\": {\n     \"id\":\"<user_id token>\",\n     \"name\":\"<name>\",\n     \"picture\":\"<display picture link>\",\n     \"role\":\"<role>\",\n     \"email\":\"<email>\",\n     \"createdAt\":\"<created at date>\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Invalid credentials.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/auth"
      }
    ],
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl http://api.restfulnews.com/auth -XPOST \\\n-H 'Content-Type:application/json' \\\n-d '{\"token\":\"<Google OAuth Token>\"}' \\\n--oauth2-bearer \"<bearer token>\"",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/auth/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/news",
    "title": "Create News",
    "name": "CreateNews",
    "group": "News",
    "description": "<p>Creates a News object.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the news article.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "abstract",
            "description": "<p>Abstract of the news article.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "url",
            "description": "<p>URL to the news article.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "source",
            "description": "<p>URL Source to the news article.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "thumbnail",
            "description": "<p>URL Source to the news article thumbnail.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date.toISOString",
            "optional": true,
            "field": "publishedAt",
            "description": "<p>Pulished date of the news article. (format: YYYY-MM-DDTHH:mm:ss.sssZ)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>user access token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "News",
            "description": "<p>News's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>News not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>user access only.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request POST \\\n--url http://api.restfulnews.com/news \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json' \\\n--data '{\"title\": \"<title>\", \"publishedAt\": \"<published at date>\", \\\n \"fingerprint\": \"<fingerprint id>\", \"url\": \"<url>\", \"abstract\": \"<abstract>\", \\\n \"thumbnail\": \"<thumbnail link>\", \"source\": \"<source>\"}'\n\n{\n \"id\": \"<news article id>\",\n \"createdAt\": \"<created at date>\",\n \"updatedAt\": \"<updated at date>\",\n \"url\": \"<url>\",\n \"title\": \"<title>\",\n \"source\": \"<source>\",\n \"abstract\": \"<abstract>\",\n \"thumbnail\": \"<thumbnail link>\"\n}",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/news/index.js",
    "groupTitle": "News"
  },
  {
    "type": "delete",
    "url": "/news/:id",
    "title": "Delete News",
    "name": "DeleteNews",
    "group": "News",
    "description": "<p>Deletes an existing News object.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>admin access token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>News not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>admin access only.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request DELETE \\\n--url http://api.restfulnews.com/news/<news article id> \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/news/index.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/news",
    "title": "Retrieve news",
    "name": "RetrieveNews",
    "group": "News",
    "description": "<p>Retrieves a list of News objects.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>admin access token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "news",
            "description": "<p>List of news.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>admin access only.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request GET \\\n--url http://api.restfulnews.com/news \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json'\n\n[\n {\n  \"id\": \"<news article id>\",\n  \"createdAt\": \"<created at date>\",\n  \"updatedAt\": \"<updated at date>\",\n  \"url\": \"<url>\",\n  \"title\": \"<title>\",\n  \"source\": \"<source>\",\n  \"abstract\": \"<abstract>\",\n  \"thumbnail\": \"<thumbnail link>\"\n },\n ...\n]",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/news/index.js",
    "groupTitle": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "q",
            "description": "<p>Query to search.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..30",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..100",
            "optional": true,
            "field": "limit",
            "defaultValue": "30",
            "description": "<p>Amount of returned items.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "sort",
            "defaultValue": "-createdAt",
            "description": "<p>Order of returned items.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "fields",
            "description": "<p>Fields to be returned.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/news/:id",
    "title": "Retrieve News",
    "name": "RetrieveNews",
    "group": "News",
    "description": "<p>Retrieves a News object based on the news article ID entered.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "BearerToken",
            "description": "<p>user access token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "News",
            "description": "<p>News's data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>News not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>user access only.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request GET \\\n--url http://api.restfulnews.com/news/<news article id> \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json'\n\n{\n \"id\": \"<news article id>\",\n \"createdAt\": \"<created at date>\",\n \"updatedAt\": \"<updated at date>\",\n \"url\": \"<url>\",\n \"title\": \"<title>\",\n \"source\": \"<source>\",\n \"abstract\": \"<abstract>\",\n \"thumbnail\": \"<thumbnail link>\"\n}",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/news/index.js",
    "groupTitle": "News"
  },
  {
    "type": "put",
    "url": "/news/:id",
    "title": "Update News",
    "name": "UpdateNews",
    "group": "News",
    "description": "<p>Updates an existing News object with new information.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the news article.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "abstract",
            "description": "<p>Abstract of the news article.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "url",
            "description": "<p>URL to the news article.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "source",
            "description": "<p>URL Source to the news article.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "thumbnail",
            "description": "<p>URL Source to the news article thumbnail.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>user access token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "News",
            "description": "<p>News's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"id\": \"<news article id>\",\n \"createdAt\": \"<created at date>\",\n \"updatedAt\": \"<updated at date>\",\n \"url\": \"<url>\",\n \"title\": \"<title>\",\n \"source\": \"<source>\",\n \"abstract\": \"<abstract>\",\n \"thumbnail\": \"<thumbnail link>\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>News not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>user access only.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request PUT \\\n--url http://api.restfulnews.com/news/<news article id> \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json' \\\n--data '{\"title\":\"<title>\", \"url\":\"<url\", \"source\":\"<source>\", \\\n\"abstract\":\"<abstract>\", \"thumbnail\":\"<thumbnail>\"}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/news/index.js",
    "groupTitle": "News"
  },
  {
    "type": "get",
    "url": "/search",
    "title": "Search for news articles (main)",
    "name": "SearchNews",
    "group": "Search",
    "description": "<p>Search for news articles from our news sources based which can be filtered by Topic, Company, Pulished Date.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>user access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topics",
            "description": "<p>News topics split separated by a comma(,).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyids",
            "description": "<p>List of company id's separated by a comma(,).</p>"
          },
          {
            "group": "Parameter",
            "type": "Date.toISOString",
            "optional": true,
            "field": "start_date",
            "defaultValue": "date_5_years_ago",
            "description": "<p>Pulished date interval start. (format: YYYY-MM-DDTHH:mm:ss.sssZ)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date.toISOString",
            "optional": true,
            "field": "end_date",
            "defaultValue": "current_date",
            "description": "<p>Pulished date interval end. (format: YYYY-MM-DDTHH:mm:ss.sssZ)</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>Maximum news articles to display per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page number of results.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "news",
            "description": "<p>List of news.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request GET \\\n--url http://api.restfulnews.com/search?topics=<topics>&start_date=<iso_time>&end_date=<iso_time>&companyids=<list of company id's> \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json' \\\n\n[\n{\n \"title\": \"<title>\",\n \"publishedAt\": \"<published at date>\",\n \"fingerprint\": \"<fingerprint id>\",\n \"url\": \"<url>\",\n \"abstract\": \"<abstract>\",\n \"thumbnail\": \"<thumbnail>\",\n \"source\": \"<source>\"\n},\n...\n}\n]\n\nNote: the `fingerprint` property is used to distinguish news articles, and is\ngenerated from a hash of the news content.",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/search/index.js",
    "groupTitle": "Search"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create user",
    "name": "CreateUser",
    "group": "User",
    "description": "<p>Creates a user with the information provided in the parameters.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "picture",
            "description": "<p>User's picture.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "user",
              "admin"
            ],
            "optional": true,
            "field": "role",
            "defaultValue": "user",
            "description": "<p>User's role.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 201": [
          {
            "group": "Sucess 201",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"token\": <\"bearer token\">,\n \"user\":\n {\n   \"id\": \"<user id>\",\n   \"name\": \"<name>\",\n   \"picture\": \"<picture link>\",\n   \"role\": \"<role>\",\n   \"email\": \"<email>\",\n   \"createdAt\" : \"<created at date>\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "409",
            "description": "<p>Email already registered.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request POST --url http://api.restfulnews.com/users \\\n--header 'content-type: application/json' \\\n--data '{ \"email\": \"<email>\", \"password\": \"<password>\", \\\n\"name\": \"<name>\", \"picture\": \"<picture link>\"}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete user",
    "name": "DeleteUser",
    "group": "User",
    "description": "<p>Deletes an existing user with the specified User ID.</p>",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access only",
        "description": "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>User access_token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "204",
            "description": "<p>No Content.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Admin access only.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request DELETE \\\n--url 'http://api.restfulnews.com/users/<user_id>' \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/email/:email",
    "title": "Test if user exists",
    "name": "FindUserByEmailPublic",
    "group": "User",
    "description": "<p>Checks if a user exists with the specified email.</p>",
    "permission": [
      {
        "name": "public"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "exists:",
            "description": "<p>true</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request POST \\\n--url http://api.restfulnews.com/users/<email> \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/me",
    "title": "Retrieve current user",
    "name": "RetrieveCurrentUser",
    "group": "User",
    "description": "<p>Gets the current user who is logged in.</p>",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>User access_token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"id\":\"<user id>\",\n \"name\":\"<name>\",\n \"picture\":\"<picture link>\",\n \"role\":\"<role>\",\n \"email\":\"<email>\",\n \"createdAt\":\"<created at date>\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request GET \\\n--url http://api.restfulnews.com/users/me \\\n--header 'authorization: Bearer <Bearer Token>' \\\n--header 'content-type: application/json'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Retrieve user",
    "name": "RetrieveUser",
    "group": "User",
    "description": "<p>Retrieves a user's data when given the User ID.</p>",
    "permission": [
      {
        "name": "public"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"id\": \"<user id>\",\n \"name\": \"<name>\",\n \"picture\": \"<picture link>\",\n \"role\": \"<role>\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request GET --url http://api.restfulnews.com/users/<user id> \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Retrieve users",
    "name": "RetrieveUsers",
    "group": "User",
    "description": "<p>Gets a list of all users.</p>",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access only",
        "description": "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>User access_token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n[\n {\n   \"id\": \"<user id>\",\n   \"name\": \"<name>\",\n   \"picture\": \"<picture>\",\n   \"role\": \"<role>\",\n   \"email\": \"<email>\",\n   \"createdAt\": \"<created at date>\"\n },\n ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Admin access only.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request GET \\\n--url http://api.restfulnews.com/users \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "q",
            "description": "<p>Query to search.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..30",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..100",
            "optional": true,
            "field": "limit",
            "defaultValue": "30",
            "description": "<p>Amount of returned items.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "sort",
            "defaultValue": "-createdAt",
            "description": "<p>Order of returned items.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "fields",
            "description": "<p>Fields to be returned.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/reset-code",
    "title": "Send email",
    "name": "SendPasswordReset",
    "group": "User",
    "description": "<p>Sends a password reset code to the specified E-mail address.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "email",
            "description": "<p>Email address to receive the password reset token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "optional": false,
            "field": "202",
            "description": "<p>Accepted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id/password",
    "title": "Update password",
    "name": "UpdatePassword",
    "group": "User",
    "description": "<p>Updates an existing User's password.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic authorization with email and password.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..",
            "optional": false,
            "field": "password",
            "description": "<p>User's new password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"id\": \"<user id>\",\n \"name\": \"<name>\",\n \"picture\": \"<picture link>\",\n \"role\": \"<role>\",\n \"email\": \"<email>\",\n \"createdAt\": \"<created at date>\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Current user access only.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request PUT \\\n --url http://api.restfulnews.com/users/<user_id>/password \\\n --header 'authorization: Bearer <Bearer Token>' \\\n --header 'content-type: application/json' \\\n --data '{\"password\":\"<new password>}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/password/",
    "title": "Send email",
    "name": "UpdatePasswordWithToken",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Code</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "optional": false,
            "field": "202",
            "description": "<p>Accepted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update user",
    "name": "UpdateUser",
    "group": "User",
    "description": "<p>Updates an existing User's information based on the parameters entered.</p>",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>You must pass <code>access_token</code> parameter or a Bearer Token authorization header to access this endpoint.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Bearer",
            "description": "<p>User access_token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>User's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "picture",
            "description": "<p>User's picture.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"id\": \"<user id>\",\n \"name\": \"<name>\",\n \"picture\": \"<picture link>\",\n \"role\": \"<role>\",\n \"email\": \"<email>\",\n \"createdAt\": \"<created at date>\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "400",
            "description": "<p>Some parameters may contain invalid values.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Current user or admin access only.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>User not found.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request PUT \\\n --url http://api.restfulnews.com/users/<user_id>/update \\\n --header 'authorization: Bearer <Bearer Token>' \\\n --header 'content-type: application/json' \\\n --data '{\"name\": \"<name>\", \"picture\": \"<picture link>\"}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User"
  }
] });
