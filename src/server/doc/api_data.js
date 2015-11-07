define({ "api": [
  {
    "type": "put",
    "url": "/api/contents/:id",
    "title": "Add Content",
    "name": "AddContent",
    "group": "Contents",
    "description": "<p>Add something new and tasty to the fridge</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"PRODCUT\": \"INFO\"       //TODO\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"PRODUCT\": \"INFO\"   //TODO\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "DB-Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"DB is busted\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Contents.js",
    "groupTitle": "Contents"
  },
  {
    "type": "delete",
    "url": "/api/contents/:id",
    "title": "Delete Content",
    "name": "DeleteContent",
    "group": "Contents",
    "description": "<p>Remove an item from the fridge</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"PRODCUT\": \"INFO\"       //TODO\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"PRODUCT\": \"INFO\"   //TODO\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Product Id,\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Contents.js",
    "groupTitle": "Contents"
  },
  {
    "type": "get",
    "url": "/api/contents/:id",
    "title": "Get Contents",
    "name": "GetContents",
    "group": "Contents",
    "description": "<p>Get the contents of a fridge</p> ",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": [\n        {\"PRODUCT\": \"INFO\"},    //TODO\n        {\"PRODUCT\": \"INFO\"}\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "DB-Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"DB is busted\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Contents.js",
    "groupTitle": "Contents"
  },
  {
    "type": "post",
    "url": "/api/contents/:id",
    "title": "Update Content",
    "name": "UpdateContent",
    "group": "Contents",
    "description": "<p>Update the contents of the fridge</p> ",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"PRODUCT\": \"INFO\"   //TODO\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Product Id,\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Contents.js",
    "groupTitle": "Contents"
  },
  {
    "type": "get",
    "url": "/api/fridges",
    "title": "Get Fridges",
    "name": "GetFridges",
    "group": "Fridges",
    "description": "<p>Get a list of all the fridges the user is entitled to see</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"PRODCUT\": \"INFO\"       //TODO\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"PRODUCT\": \"INFO\"   //TODO\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Product Id,\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Fridges.js",
    "groupTitle": "Fridges"
  },
  {
    "type": "get",
    "url": "/api/fridges/:id",
    "title": "Get Fridge State",
    "name": "GetFridgeState",
    "group": "Fridges_State",
    "description": "<p>Get the state of a fridge of your choice</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"PRODCUT\": \"INFO\"       //TODO\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"PRODUCT\": \"INFO\"   //TODO\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Product Id,\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Fridges.js",
    "groupTitle": "Fridges_State"
  },
  {
    "type": "post",
    "url": "/api/fridges/:id",
    "title": "Update Fridge State",
    "name": "UpdateFridgeState",
    "group": "Fridges_State",
    "description": "<p>Update the state of the fridge</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"PRODCUT\": \"INFO\"       //TODO\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"PRODUCT\": \"INFO\"   //TODO\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Product Id,\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Fridges.js",
    "groupTitle": "Fridges_State"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Get Application",
    "name": "GetApp",
    "group": "GetApp",
    "description": "<p>Grabs the index html file that is the wonderful SPA.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "html",
            "description": "<p>file</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "GetApp"
  },
  {
    "type": "put",
    "url": "/api/products/",
    "title": "Add Product",
    "name": "AddProduct",
    "group": "Product",
    "description": "<p>Add a new product to the product database</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"PRODCUT\": \"INFO\"       //TODO\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"PRODUCT\": \"INFO\"   //TODO\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "DB-Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"DB is busted\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/api/products/:id",
    "title": "Get Product",
    "name": "GetProduct",
    "group": "Product",
    "description": "<p>Get a product from the database</p> ",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"PRODUCT\": \"INFO\"   //TODO\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Product Id,\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/api/products/",
    "title": "Search Products",
    "name": "SearchProduct",
    "group": "Product",
    "description": "<p>Search through the product database</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"PRODCUT\": \"INFO\"       //TODO\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": [\n        {\"PRODUCT\": \"INFO\"},    //TODO\n        {\"PRODUCT\": \"INFO\"}\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "DB-Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"DB is busted\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Products.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/api/products/:id",
    "title": "Update Product",
    "name": "UpdatProduct",
    "group": "Product",
    "description": "<p>Update the product in the database</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"PRODCUT\": \"INFO\"       //TODO\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"PRODUCT\": \"INFO\"   //TODO\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Product Id,\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Products.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/api/users/auth",
    "title": "Authenticate",
    "name": "AuthenticateUser",
    "group": "User",
    "description": "<p>You a user? You logged out? Well make a cheeky wee request to this then, what are you waiting for!</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\": \"username\",\n    \"passphrase\": \"passphrase\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"token\": \"token\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Login\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/register",
    "title": "Register",
    "name": "RegisterUser",
    "group": "User",
    "description": "<p>You not a user? You wishing you where a user of this wonderful service? Well I have the API for you!</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"username\": \"username\",\n    \"passphrase\": \"passphrase\",\n    \"email\": \"email\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"token\": \"token\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Login\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/Users.js",
    "groupTitle": "User"
  }
] });