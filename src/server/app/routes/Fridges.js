/**
 * Created by Tom on 07/11/2015.
 */

var express = require('express'),
	responseFactory = require('./../response/Response');

var fridges = function(){

	var fridgeRouter = express.Router();

	fridgeRouter
		/**
		 * @api {post} /fridges/register Register
		 * @apiName RegisterFridge
		 * @apiGroup Fridges
		 *
		 * @apiDescription
		 * Register a new fridge
		 *
		 * @apiParamExample {json} Request-Example:
		 *
		 *      {
		 *          "fridge_no": "UNIQUE_FRIDGE_NUMBER"
		 *      }
		 *
		 * @apiSuccessExample {json} Success-Example:
		 *
		 * {
		 *      "success": true,
		 *      "message": "Fridge logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "token": TOKEN
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error-app.response:
		 *  {
		 *      "success": false,
		 *      "message": "Invalid Login",
		 *      "meta": null,
		 *      "result": null
		 *  }
		 */
		.post('/register', function(req, res){


			var fridgeAuth = require('../modules/auth/FridgeAuth');

			var promise = fridgeAuth.registerFridge(req.body.fridge_no);

			var response = responseFactory();

			promise
				.then(function(data){

					response.setSuccessful(true);
					response.setMessage('Fridge registered');
					response.setResult({token: data});

					res.json(response.getResponse());
				})
				.fail(function(data){
					response.setSuccessful(false);
					response.setMessage(data);

					res.json(response.getResponse());
				});

		});

    fridgeRouter
        /**
         *
         *
         * @api {get} /fridges/listen/:id Listen To Fridge
         * @apiName ListenToFridge
         * @apiGroup Fridges
         *
         * @apiDescription
         * Add the fridge to the list of fridges the user listens to
         *
         * @apiParam {Number} id The fridge to listen to
         *
         * @apiSuccessExample {json} Success
         * {
		 *  "successful": true,
		 *  "message": "User updated",
		 *  "meta": null,
		 *  "result": [
		 *    "14"
		 *  ]
		 * }
         *
         * @apiErrorExample {json} Error - Already listening to fridge
         *
         * {
		 *  "successful": false,
		 *  "message": "Already listening to fridge",
		 *  "meta": null,
		 *  "result": null
		 * }
         *
         *
         */
        .get('/listen/:id', function(req, res){

		    var users = require('../modules/users/users');

		    var promise = users.listenToFridge(req.params.id, req.user);

		    var response = responseFactory();

		    promise
			    .then(function(data){

				    response.setSuccessful(true);
				    response.setMessage('User updated');
				    response.setResult(data);

				    res.json(response.getResponse());
			    })
			    .fail(function(data){
				    response.setSuccessful(false);
				    response.setMessage(data);

				    res.json(response.getResponse());
			    });
        })
        /**
         *
         *
         * @api {delete} /fridges/listen/:id Unlisten To Fridge
         * @apiName UnlistenToFridge
         * @apiGroup Fridges
         *
         * @apiDescription
         * Remove the fridge to the list of fridges the user listens to
         *
         * @apiParam {Number} id The fridge to un-listen to
         *
         * @apiSuccessExample {json} Success
         *
         * {
         *  "successful": true,
         *  "message": "User updated",
         *  "meta": null,
         *  "result": []
         * }
         *
         * @apiErrorExample {json} Error
         *
         * {
         *  "successful": false,
         *  "message": "You are not listening to that fridge",
         *  "meta": null,
         *  "result": null
         * }
         *
         */
        .delete('/listen/:id', function(req, res){

		    var users = require('../modules/users/users');

		    var promise = users.unlistenToFridge(req.params.id, req.user);

		    var response = responseFactory();

		    promise
			    .then(function(data){

				    response.setSuccessful(true);
				    response.setMessage('User updated');
				    response.setResult(data);

				    res.json(response.getResponse());
			    })
			    .fail(function(data){
				    response.setSuccessful(false);
				    response.setMessage(data);

				    res.json(response.getResponse());
			    });

        });

	fridgeRouter.route('/')
		/**
		 *
		 * @api {get} /fridges Get Fridges
		 * @apiName GetFridges
		 * @apiGroup Fridges
		 *
		 * @apiDescription
		 * Get a list of all the fridges the user is entitled to see
		 *
		 * @apiSuccessExample {json} Results
		 *  {
		 *      "success": true,
		 *      "message": "",
		 *      "meta": null,
		 *      "result":
		 *          [
		 *              {
		 *  		        "fridge_no": BARCODE,
		 *  		        "name": PRODUCT NAME,
		 *  		        "description": DESCRIPTION,
		 *  		        "states": [],
		 *  		        "contents":
	     *  		            [
	     *  		                "Product": PRODUCT_SCHEMA,
	     *  		                "current_weight": 500,
	     *  		                "date_added": 2015-12-28T17:25:35.371Z
	     *  		            ]
		 *               },
		 *               {
		 *     		        "fridge_no": BARCODE,
		 *     		        "name": PRODUCT NAME,
		 *     		        "description": DESCRIPTION,
		 *  		        "states": [],
		 *  		        "contents":
		 *  		            [
		 *  		                "Product": PRODUCT_SCHEMA,
		 *  		                "current_weight": 500,
		 *  		                "date_added": 2015-12-28T17:25:35.371Z
		 *  		            ]
		 *            }
		 *          ]
		 *  }
		 *
	     */
		.get(function(req, res){

			var fridges = require('../modules/Fridges/Fridges');

			var promise = fridges.getFridges(req.user);
			var response = responseFactory();

			promise
				.then(function(data){

					response.setSuccessful(true);
					response.setResult(data);

					res.json(response.getResponse());
				})
				.fail(function(data){
					response.setSuccessful(false);
					response.setMessage(data);

					res.json(response.getResponse());
				});

		});

    fridgeRouter.route('/:id')
        /**
         *
         * @api{get} /fridges/:id Get Fridge
         * @apiName Get Fridge
         * @apiGroup Fridges
         *
         * @apiDescription
         * Gets the fridge with the given ID
         *
         * @apiSuccessExample {json} Results
         *  {
		 *      "success": true,
		 *      "message": "",
		 *      "meta": null,
		 *      "result":
		 *          {
		 *		        "fridge_no": BARCODE,
		 *		        "name": PRODUCT NAME,
		 *		        "description": DESCRIPTION,
		 *		        "states": [],
		 *		        "contents":
		 *		            [
		 *		                "Product": PRODUCT_SCHEMA,
		 *		                "current_weight": 500,
		 *		                "date_added": 2015-12-28T17:25:35.371Z
		 *		            ]
		 *          }
		 *  }
         */
        .get(function(req,res){
            var fridge = require('../modules/Fridges/Fridges');

            var promise = fridge.getFridge(req.params.id);

		    var response = responseFactory();

            promise
                .then(function(data){
                    response.setSuccessful(true);
                    response.setResult(data);

                    res.json(response.getResponse());
                })
                .fail(function(data){
                    response.setSuccessful(false);
                    response.setMessage(data);

                    res.json(response.getResponse());
                });
        })
	    /**
	     *
	     * @api {post} /fridges/:id Update Fridge
	     * @apiName Update Fridge
	     * @apiGroup Fridges
	     *
	     * @apiDescription
	     * Updates the fridge with the given ID
	     *
	     * @apiSuccessExample {json} Results
	     *  {
		 *      "success": true,
		 *      "message": "",
		 *      "meta": null,
		 *      "result":
		 *          {
		 *		        "fridge_no": BARCODE,
		 *		        "name": PRODUCT NAME,
		 *		        "description": DESCRIPTION,
		 *		        "states": [],
		 *		        "contents":
		 *		            [
		 *		                "Product": PRODUCT_SCHEMA,
		 *		                "current_weight": 500,
		 *		                "date_added": 2015-12-28T17:25:35.371Z
		 *		            ]
		 *          }
		 *  }
	     */
	    .post(function(req,res){

		    var fridge = require('../modules/Fridges/Fridges');

		    var promise = fridge.updateFridge(req.params.id, req.body);

		    var response = responseFactory();

		    promise
			    .then(function(data){
				    response.setSuccessful(true);
				    response.setResult(data);

				    res.json(response.getResponse());
			    })
			    .fail(function(data){
				    response.setSuccessful(false);
				    response.setMessage(data);

				    res.json(response.getResponse());
			    });

	    });

	fridgeRouter.route('/:id/state/')
		/**
		 *
		 *
		 * @api {get} /fridges/:id/state Get Fridge State
		 * @apiName GetFridgeState
		 * @apiGroup Fridges State
		 *
		 * @apiDescription
		 * Get the state of a fridge of your choice
		 *
		 * @apiPermission user
		 *
		 * @apiParam {number} id The fridge to update
		 *
		 *
		 *
	     */
		.get(function(req, res){

			var fridge = require('../modules/Fridges/Fridges');

			var promise = fridge.getState(req.params.id, req.user);

			var response = responseFactory();

			promise
				.then(function(data){
					response.setSuccessful(true);
					response.setResult(data);

					res.json(response.getResponse());
				})
				.fail(function(data){
					response.setSuccessful(false);
					response.setMessage(data);

					res.json(response.getResponse());
				});

		})
		/**
		 *
		 *
		 * @api {post} /fridges/:id/state Update Fridge State
		 * @apiName UpdateFridgeState
		 * @apiGroup Fridges State
		 *
		 * @apiDescription
		 * Update the state of the fridge
		 *
		 * @apiPermission fridge
		 *
		 * @apiParam {number} id The fridge to update
		 *
		 * @apiParamExample {json} Request-Example
		 * {
		 *  "temperature": 2,
		 *  "door": false,
		 *  "weight": 5000
		 * }
		 *
		 * @apiSuccessExample {json} Success
		 * {
		 *  "successful": true,
         *  "message": null,
         *  "meta": null,
         *  "result": {
         *    "_id": "56827d0145cd1064377f93cd",
         *    "fridge_no": 15,
         *    "name": "15",
         *    "description": "",
         *    "__v": 2,
         *    "createdOn": "2015-12-29T12:30:57.094Z",
         *    "states": [
         *      {
         *          "temperature": 2,
         *          "weight": 5000,
         *          "door": false,
         *          "_id": "56827f3463c97e883f83ccaf",
         *          "date": "2015-12-29T12:40:10.752Z"
         *      },
         *      {
         *        "temperature": 2,
         *        "weight": 5000,
         *        "door": false,
         *        "_id": "568280f1efade42c3eac0197",
         *        "date": "2015-12-29T12:47:36.748Z"
         *      }
         *    ],
         *    "contents": []
         *  }
		 * }
		 *
		 * @apiErrorExample {json} Error
		 * {
         *  "successful": false,
         *  "message": "Validation error",
         *  "meta": null,
         *  "result": null
		 * }
		 *
		 *
	     */
		.post(function(req, res){

			var fridge = require('../modules/Fridges/Fridges');

			var promise = fridge.updateState(req.params.id, req.body, req.user);

			var response = responseFactory();

			promise
				.then(function(data){
					response.setSuccessful(true);
					response.setResult(data);

					res.json(response.getResponse());
				})
				.fail(function(data){
					response.setSuccessful(false);
					response.setMessage(data);

					res.json(response.getResponse());
				});

		});

    fridgeRouter.route('/:id/contents')
        /**
         *
         * @api {get} /fridges/:id/contents Get Contents
         * @apiName getFridgeContents
         * @apiGroup Fridges Content
         *
         * @apiDescription
         * Get the contents of the fridge
         *
         * @apiParam {Number} id The fridge id
         *
         * @apiSuccessExample {json} Success
         *
         * {
		 *  "successful": true,
		 *  "message": null,
		 *  "meta": null,
		 *  "result": [
		 *    {
		 *      "product": {
		 *        "_id": 1234567891240,
		 *        "code": 1234567891240,
		 *        "__v": 0
         *     },
		 *      "current_weight": 500,
		 *      "_id": "5682c010d03510e4037c15b7",
		 *      "date_added": "2015-12-29T17:17:04.788Z"
		 *    },
		 *    {
		 *      "product": {
		 *        "_id": 1234567891241,
		 *        "code": 1234567891241,
		 *        "__v": 0
		 *    },
		 *      "current_weight": 500,
		 *      "_id": "5682c0f45a3a44742351a308",
		 *      "date_added": "2015-12-29T17:20:52.664Z"
		 *    }
		 *  ]
		 *}
         */
        .get(function(req, res){

		    var fridge = require('../modules/Fridges/Fridges');

		    var promise = fridge.getContent(req.params.id, req.user);

		    var response = responseFactory();

		    promise
			    .then(function(data){
				    response.setSuccessful(true);
				    response.setResult(data);

				    res.json(response.getResponse());
			    })
			    .fail(function(data){
				    response.setSuccessful(false);
				    response.setMessage(data);

				    res.json(response.getResponse());
			    });

        })
        /**
         *
         * @api {put} /fridges/:id/contents Add Content
         * @apiName addToFridgeContents
         * @apiGroup Fridges Content
         *
         * @apiDescription
         * Add a new item to the contents of the fridge
         *
         * @apiParam {Number} id The fridge id number
         *
         * @apiParamExample {json} Request
         *
         * {
		 *    "product": {
		 *        "code": 1234567891241,
		 *        "_id": 1234567891241
		 *    },
		 *    "current_weight": 500
		 *}
         *
         * @apiSuccessExample {json} Success
         *
         * {
		 *  "successful": true,
		 *  "message": null,
		 *  "meta": null,
		 *  "result": [
		 *    {
		 *      "product": {
		 *        "_id": 1234567891240,
		 *        "code": 1234567891240,
		 *        "__v": 0
         *     },
		 *      "current_weight": 500,
		 *      "_id": "5682c010d03510e4037c15b7",
		 *      "date_added": "2015-12-29T17:17:04.788Z"
		 *    },
		 *    {
		 *      "product": {
		 *        "_id": 1234567891241,
		 *        "code": 1234567891241,
		 *        "__v": 0
		 *    },
		 *      "current_weight": 500,
		 *      "_id": "5682c0f45a3a44742351a308",
		 *      "date_added": "2015-12-29T17:20:52.664Z"
		 *    }
		 *  ]
		 *}
         *
         */
        .put(function(req, res){

		    var fridge = require('../modules/Fridges/Fridges');

		    var promise = fridge.addContent(req.params.id, req.body, req.user);

		    var response = responseFactory();

		    promise
			    .then(function(data){
				    response.setSuccessful(true);
				    response.setResult(data);

				    res.json(response.getResponse());
			    })
			    .fail(function(data){
				    response.setSuccessful(false);
				    response.setMessage(data);

				    res.json(response.getResponse());
			    });

        });

    fridgeRouter.route('/:id/contents/:contentID')
        /**
         *
         * @api {delete} /fridges/:id/contents/:contentID Delete Contents
         * @apiName removeFromFridgeContents
         * @apiGroup Fridges Content
         *
         * @apiDescription
         * Remove item from the contents of the fridge
         *
         * @apiParam {Number} id The id of the fridge
         * @apiParam {ObjectId} contentID The id of the content
         *
         * @apiSuccessExample {json} Success
         *
         * {
         *  "successful": true,
         *  "message": null,
         *  "meta": null,
         *  "result": [
         *      {
         *          "product": {
         *              "_id": 1234567891241,
         *              "code": 1234567891241,
         *              "__v": 0
         *          },
         *          "current_weight": 500,
         *          "_id": "5682c287e7d75e983ea76eae",
         *          "date_added": "2015-12-29T17:27:35.215Z"
         *      },
         *      {
         *          "product": {
         *              "_id": 1234567891241,
         *              "code": 1234567891241,
         *              "__v": 0
         *          },
         *          "current_weight": 500,
         *          "_id": "5682c36f599432641258e95e",
         *          "date_added": "2015-12-29T17:27:35.215Z"
         *      }
         *  ]
         * }
         *
         * @apiErrorExample {json} Error
         *
         * {
         *  "successful": false,
         *  "message": "Content not found",
         *  "meta": null,
         *  "result": null
         * }
         */
        .delete(function(req, res){

		    var fridge = require('../modules/Fridges/Fridges');

		    var promise = fridge.deleteContent(req.params.id, req.params.contentID, req.user);

		    var response = responseFactory();

		    promise
			    .then(function(data){
				    response.setSuccessful(true);
				    response.setResult(data);

				    res.json(response.getResponse());
			    })
			    .fail(function(data){
				    response.setSuccessful(false);
				    response.setMessage(data);

				    res.json(response.getResponse());
			    });

        })
        /**
         *
         * @api {post} /fridges/:id/contents/:contentID Update Contents
         * @apiName updateFridgeContents
         * @apiGroup Fridges Content
         *
         * @apiDescription
         * Update item in the contents of the fridge
         *
         * @apiParam {Number} id The id of the fridge
         * @apiParam {ObjectId} contentID The id of the content
         *
         * @apiParamExample {json} Request
         *
         * {
         *  "product": {
         *      "_id": 1234567891241,
         *      "code": 1234567891241,
         *      "__v": 0
         *  },
         *  "current_weight": 400,
         *  "_id": "5682c287e7d75e983ea76eae",
         *  "date_added": "2015-12-29T17:27:35.215Z"
         * }
         *
         * @apiSuccessExample {json} Success
         *
         * {
         *  "successful": true,
         *  "message": null,
         *  "meta": null,
         *  "result": [
         *      {
         *          "product": {
         *              "_id": 1234567891241,
         *              "code": 1234567891241,
         *              "__v": 0
         *          },
         *          "current_weight": 400,
         *          "_id": "5682c287e7d75e983ea76eae",
         *          "date_added": "2015-12-29T17:27:35.215Z"
         *      },
         *      {
         *          "product": {
         *              "_id": 1234567891241,
         *              "code": 1234567891241,
         *              "__v": 0
         *          },
         *          "current_weight": 500,
         *          "_id": "5682c36f599432641258e95e",
         *          "date_added": "2015-12-29T17:27:35.215Z"
         *      }
         *  ]
         * }
         *
         * @apiErrorExample {json} Error
         *
         * {
         *  "successful": false,
         *  "message": "Content not found to update",
         *  "meta": null,
         *  "result": null
         * }
         *
         */
        .post(function(req,res){

		    var fridge = require('../modules/Fridges/Fridges');

		    var promise = fridge.updateContent(req.params.id, req.params.contentID, req.body, req.user);

		    var response = responseFactory();

		    promise
			    .then(function(data){
				    response.setSuccessful(true);
				    response.setResult(data);

				    res.json(response.getResponse());
			    })
			    .fail(function(data){
				    response.setSuccessful(false);
				    response.setMessage(data);

				    res.json(response.getResponse());
			    });

        });


	return fridgeRouter;
};

module.exports = fridges;