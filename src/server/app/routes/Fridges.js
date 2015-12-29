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
         * @apiSuccessExample
         * ADD THIS
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
         * @apiSuccessExample
         * ADD THIS
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
         */
        .get(function(req, res){
            res.send('Gonna naw do that yet');
        })
        /**
         *
         * @api {put} /fridges/:id/contents Add Content
         * @apiName addToFridgeContents
         * @apiGroup Fridges Content
         *
         * @apiDescription
         * Add a new item to the contents of the fridge
         */
        .put(function(req, res){
            res.send('Gonna naw do that yet');
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
         */
        .delete(function(req, res){
            res.send('Gonna naw do that yet');
        })
        /**
         *
         * @api {post} /fridges/:id/contents/:contentID Update Contents
         * @apiName updateFridgeContents
         * @apiGroup Fridges Content
         *
         * @apiDescription
         * Update item in the contents of the fridge
         */
        .post(function(req,res){
            res.send('Gonna naw do that yet');
        });


	return fridgeRouter;
};

module.exports = fridges;