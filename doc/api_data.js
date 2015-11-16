define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p> "
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "C__Users_Tom_Dropbox_UNI_Year_4_CS413_project_src_server_doc_main_js",
    "groupTitle": "C__Users_Tom_Dropbox_UNI_Year_4_CS413_project_src_server_doc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/fridges/register",
    "title": "Register",
    "name": "RegisterFridge",
    "group": "Fridges",
    "description": "<p>Register a new fridge</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n    \"fridge_no\": \"UNIQUE_FRIDGE_NUMBER\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Example:",
          "content": "\n{\n     \"success\": true,\n     \"message\": \"User logged in\",\n     \"meta\": null,\n     \"result\": {\n         \"token\": TOKEN\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-app.Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Login\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/Fridges.js",
    "groupTitle": "Fridges"
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
    "filename": "./app/app.js",
    "groupTitle": "GetApp"
  },
  {
    "type": "put",
    "url": "/products/",
    "title": "Add Product",
    "name": "AddProduct",
    "group": "Product",
    "description": "<p>Add a new product to the product database</p> ",
    "parameter": {
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n    \"name\": PRODUCT NAME,\n    \"code\": BARCODE,\n    \"weight\": WEIGHT,\n    \"description\": DESCRIPTION\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": " {\n     \"success\": true,\n     \"message\": null,\n     \"meta\": null,\n     \"result\": {\n         \"_id\": PRODUCT ID,\n\t\t    \"code\": BARCODE,\n\t\t    \"name\": PRODUCT NAME,\n\t\t    \"weight\": WEIGHT,\n\t\t    \"description\": DESCRIPTION\n\t\t    \"__v\": 0\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n    \"success\": false,\n    \"message\": \"error saving product\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/Products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products/:id",
    "title": "Get Product",
    "name": "GetProduct",
    "group": "Product",
    "description": "<p>Get a product from the database</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>ProductID</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Product Found",
          "content": " {\n     \"success\": true,\n     \"message\": \"User logged in\",\n     \"meta\": null,\n     \"result\": {\n         \"_id\": \"56488392e6159a14220cbbec\",\n\t\t    \"code\": 500159393942,\n\t\t    \"name\": \"Galaxy Smoth Milk Chocolate\",\n\t\t    \"weight\": 400,\n\t\t    \"__v\": 0\n     }\n }",
          "type": "json"
        },
        {
          "title": "Product Doesn't Exist",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error example",
          "content": "{\n    \"success\": false,\n    \"message\": \"Error Reaching DB\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/Products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products?searchText=",
    "title": "Search Products",
    "name": "SearchProduct",
    "group": "Product",
    "description": "<p>Search through the product database to find the text in the title or the description</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Text</p> ",
            "optional": false,
            "field": "searchText",
            "description": "<p>The text to search for</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Results",
          "content": " {\n     \"success\": true,\n     \"message\": \"User logged in\",\n     \"meta\": null,\n     \"result\": [\n         {\n             \"_id\": PRODUCT ID,\n\t\t        \"code\": BARCODE,\n\t\t        \"name\": PRODUCT NAME,\n\t\t        \"weight\": WEIGHT,\n\t\t        \"description\": DESCRIPTION\n\t\t        \"__v\": 0\n         },\n         {\n             \"_id\": PRODUCT ID,\n\t\t        \"code\": BARCODE,\n\t\t        \"name\": PRODUCT NAME,\n\t\t        \"weight\": WEIGHT,\n\t\t        \"description\": DESCRIPTION\n\t\t        \"__v\": 0\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "No Results",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Error Searching DB,\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/Products.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/products/:id",
    "title": "Update Product",
    "name": "UpdatProduct",
    "group": "Product",
    "description": "<p>Update the product in the database</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>ProductID</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n    \"name\": PRODUCT NAME,\n    \"code\": BARCODE,\n    \"weight\": WEIGHT,\n    \"description\": DESCRIPTION\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": " {\n     \"success\": true,\n     \"message\": null,\n     \"meta\": null,\n     \"result\": {\n         \"_id\": PRODUCT ID,\n\t\t    \"code\": BARCODE,\n\t\t    \"name\": PRODUCT NAME,\n\t\t    \"weight\": WEIGHT,\n\t\t    \"__v\": 0\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n    \"success\": false,\n    \"message\": \"error saving product\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/Products.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/users/auth",
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
          "title": "Success-app.Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"token\": TOKEN\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-app.Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Login\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/Users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/register",
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
          "title": "Success-app.Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"User logged in\",\n    \"meta\": null,\n    \"result\": {\n        \"token\": TOKEN\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-app.Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"Invalid Login\",\n    \"meta\": null,\n    \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/Users.js",
    "groupTitle": "User"
  }
] });