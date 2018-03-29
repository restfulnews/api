define({ "api": [
  {
    "type": "post",
    "url": "/auth",
    "title": "Authenticate",
    "name": "Authenticate",
    "group": "Auth",
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
        "content": "curl http://api.restfulnews.com/auth -XPOST \\\n-H 'Content-Type:application/json' \\\n-d '{\"email\":\"bobsagget@gmail.com\",\"password\":\"bobsagget\"}' \\\n--oauth2-bearer \"<bearer token>\"",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/auth/index.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/auth"
      }
    ]
  },
  {
    "type": "post",
    "url": "/auth/google",
    "title": "Authenticate with Google",
    "name": "AuthenticateGoogle",
    "group": "Auth",
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
    "url": "/company",
    "title": "Create Company",
    "name": "CreateEntity",
    "group": "Company",
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
            "field": "Company",
            "description": "<p>Company's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"id\": \"<company id>\",\n \"createdAt\": \"<created at date>\",\n \"updatedAt\": \"<updated at date>\",\n \"name\": \"<name>\"\n}",
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
            "description": "<p>Company not found.</p>"
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
        "content": "curl --request POST \\\n--url http://api.restfulnews.com/company \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json' \\\n--data '{\"name\":\"<name>\", \"ticker\":\"<ticket>\", \"market\":\"<market>\"}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/company/index.js",
    "groupTitle": "Company",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/company"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/company/:id",
    "title": "Delete Company",
    "name": "DeleteEntity",
    "group": "Company",
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
            "description": "<p>Company not found.</p>"
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
        "content": "curl --request DELETE \\\n--url http://api.restfulnews.com/company/5abcec87b8329b17e45b3e50 \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json' \\",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/company/index.js",
    "groupTitle": "Company",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/company/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/company",
    "title": "Retrieve company",
    "name": "RetrieveEntity",
    "group": "Company",
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
            "field": "company",
            "description": "<p>List of company.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n[\n {\n  \"id\": \"<company id>\",\n  \"createdAt\": \"<created at date>\",\n  \"updatedAt\": \"<updated at date>\",\n  \"name\": \"<name>\"\n },\n {\n  \"id\": \"<company id>\",\n  \"createdAt\": \"<created at date>\",\n  \"updatedAt\": \"<updated at date>\",\n  \"name\": \"<name>\"\n }\n]",
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
            "description": "<p>admin access only.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Curl Usage:",
        "content": "curl --request GET \\\n--url http://api.restfulnews.com/company \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json' \\",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/company/index.js",
    "groupTitle": "Company",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/company"
      }
    ],
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
    "url": "/company/:id",
    "title": "Retrieve Company",
    "name": "RetrieveEntity",
    "group": "Company",
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
            "field": "Company",
            "description": "<p>Company's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"id\": \"<company id>\",\n \"createdAt\": \"<created at date>\",\n \"updatedAt\": \"<updated at date>\",\n \"name\": \"<name>\"\n}",
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
            "description": "<p>Company not found.</p>"
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
        "content": "curl --request GET \\\n--url http://api.restfulnews.com/company/<company id> \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json' \\",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/company/index.js",
    "groupTitle": "Company",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/company/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/company/:id",
    "title": "Update Company",
    "name": "UpdateEntity",
    "group": "Company",
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
            "field": "Company",
            "description": "<p>Company's data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n \"id\": \"<company id>\",\n \"createdAt\": \"<created at date>\",\n \"updatedAt\": \"<updated at date>\",\n \"name\": \"<name>\"\n}",
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
            "description": "<p>Company not found.</p>"
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
        "content": "curl --request PUT \\\n--url http://api.restfulnews.com/company/<company id> \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json' \\\n--data '{\"name\":\"<name>\", \"market\":\"<market>\"}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/company/index.js",
    "groupTitle": "Company",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/company/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/news",
    "title": "Create News",
    "name": "CreateNews",
    "group": "News",
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
    "groupTitle": "News",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/news"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/news/:id",
    "title": "Delete News",
    "name": "DeleteNews",
    "group": "News",
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
    "groupTitle": "News",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/news/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/news/:id",
    "title": "Retrieve News",
    "name": "RetrieveNews",
    "group": "News",
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
    "groupTitle": "News",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/news/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/news",
    "title": "Retrieve news",
    "name": "RetrieveNews",
    "group": "News",
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
        "content": "curl --request GET \\\n--url http://api.restfulnews.com/news \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json'\n\n[\n {\n  \"id\": \"<news article id>\",\n  \"createdAt\": \"<created at date>\",\n  \"updatedAt\": \"<updated at date>\",\n  \"url\": \"<url>\",\n  \"title\": \"<title>\",\n  \"source\": \"<source>\",\n  \"abstract\": \"<abstract>\",\n  \"thumbnail\": \"<thumbnail link>\"\n },\n {\n  \"id\": \"<news article id>\",\n  \"createdAt\": \"<created at date>\",\n  \"updatedAt\": \"<updated at date>\",\n  \"url\": \"<url>\",\n  \"title\": \"<title>\",\n  \"source\": \"<source>\",\n  \"abstract\": \"<abstract>\",\n  \"thumbnail\": \"<thumbnail link>\"\n }\n]",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/news/index.js",
    "groupTitle": "News",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/news"
      }
    ],
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
    "url": "/news/search",
    "title": "Search for news articles",
    "name": "SearchNews",
    "group": "News",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topics",
            "description": "<p>News topics split by a comma(,).</p>"
          },
          {
            "group": "Parameter",
            "type": "Date.toISOString",
            "optional": false,
            "field": "start_date",
            "description": "<p>Pulished date interval start. (format: YYYY-MM-DDTHH:mm:ss.sssZ)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date.toISOString",
            "optional": false,
            "field": "end_date",
            "description": "<p>Pulished date interval end. (format: YYYY-MM-DDTHH:mm:ss.sssZ)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "BearerToken",
            "description": "<p>user access token.</p>"
          },
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
        "content": "curl --request GET \\\n--url http://api.restfulnews.com/news/search?topics=<topics> \\\n--header 'authorization: Bearer <bearer token>' \\\n--header 'content-type: application/json' \\\n\n[\n{\n \"title\": \"<title>\",\n \"publishedAt\": \"<published at date>\",\n \"fingerprint\": \"<fingerprint id>\",\n \"url\": \"<url>\",\n \"abstract\": \"<abstract>\",\n \"thumbnail\": \"<thumbnail>\",\n \"source\": \"<source>\"\n},\n{\n \"title\": \"<title>\",\n \"publishedAt\": \"<published at date>\",\n \"fingerprint\": \"<fingerprint id>\",\n \"url\": \"<url>\",\n \"abstract\": \"<abstract>\",\n \"thumbnail\": \"<thumbnail>\",\n \"source\": \"<source>\"\n}\n]",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/news/index.js",
    "groupTitle": "News",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/news/search"
      }
    ]
  },
  {
    "type": "put",
    "url": "/news/:id",
    "title": "Update News",
    "name": "UpdateNews",
    "group": "News",
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
    "groupTitle": "News",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/news/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create user",
    "name": "CreateUser",
    "group": "User",
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
            "description": "<p>User's picture.</p>"
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
            "field": "401",
            "description": "<p>Master access only.</p>"
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
        "content": "curl --request POST --url http://api.restfulnews.com/users \\\n--header 'content-type: application/json' --data '{ \\\n\"email\": \"<email>\", \"password\": \"<password>\", \\\n\"name\": \"<name>\", \"picture\": \"<picture link>\"}'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/user/index.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/users"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete user",
    "name": "DeleteUser",
    "group": "User",
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/users/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/email/:email",
    "title": "Test if user exists",
    "name": "FindUserByEmailPublic",
    "group": "User",
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/email/:email"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/me",
    "title": "Retrieve current user",
    "name": "RetrieveCurrentUser",
    "group": "User",
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/users/me"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Retrieve user",
    "name": "RetrieveUser",
    "group": "User",
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Retrieve users",
    "name": "RetrieveUsers",
    "group": "User",
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
          "content": "HTTP/1.1 200 OK\n\n[\n {\n   \"id\": \"<user id>\",\n   \"name\": \"<name>\",\n   \"picture\": \"<picture>\",\n   \"role\": \"<role>\",\n   \"email\": \"<email>\",\n   \"createdAt\": \"<created at date>\"\n },\n {\n   \"id\": \"<user id>\",\n   \"name\": \"<name>\",\n   \"picture\": \"<picture>\",\n   \"role\": \"<role>\",\n   \"email\": \"<email>\",\n   \"createdAt\": \"<created at date>\"\n }\n]",
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
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/users"
      }
    ],
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/users/reset-code"
      }
    ]
  },
  {
    "type": "put",
    "url": "/users/:id/password",
    "title": "Update password",
    "name": "UpdatePassword",
    "group": "User",
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/users/:id/password"
      }
    ]
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/users/password/"
      }
    ]
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update user",
    "name": "UpdateUser",
    "group": "User",
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://api.restfulnews.com/users/:id"
      }
    ]
  }
] });
