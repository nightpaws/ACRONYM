/**
 * Created by Tom on 07/11/2015.
 */

var express = require('express'),
	response = require('./../response/Response')();

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
		 *      "message": "User logged in",
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

	fridgeRouter.route('/')
		/**
		 *
		 * @apiIgnore
		 *
		 * @api {get} /fridges Get Fridges
		 * @apiName GetFridges
		 * @apiGroup Fridges
		 *
		 * @apiDescription
		 * Get a list of all the fridges the user is entitled to see
		 *
		 * @apiParamExample {json} Request-Example:
		 *  {
				 *      "PRODCUT": "INFO"       //TODO
				 *  }
		 *
		 * @apiSuccessExample {json} Success-app.response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "PRODUCT": "INFO"   //TODO
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error-app.response:
		 *  {
		 *      "success": false,
		 *      "message": "Invalid Product Id,
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.get(function(req, res){
			res.send('Gonna naw do that yet');
		});

    fridgeRouter.route('/:id')
        /**
         * @apiIgnore
         *
         * @api{get} /fridges/:id Get fridge
         * @apiName Get Fridge
         * @apiGroup GetFridges
         *
         * @apiDescription
         * Gets the fridge with the given ID
         */
        .get(function(req,res){
            var fridge = require('../modules/Fridges/Fridges');

            var promise = fridge.getFridge(req.params.id);

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
		 * @apiIgnore
		 *
		 * @api {get} /fridges/:id Get Fridge State
		 * @apiName GetFridgeState
		 * @apiGroup Fridges State
		 *
		 * @apiDescription
		 * Get the state of a fridge of your choice
		 *
		 * @apiParamExample {json} Request-Example:
		 *  {
					 *      "PRODCUT": "INFO"       //TODO
					 *  }
		 *
		 * @apiSuccessExample {json} Success-app.response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "PRODUCT": "INFO"   //TODO
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error-app.response:
		 *  {
		 *      "success": false,
		 *      "message": "Invalid Product Id,
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.get(function(req, res){
			res.send('Gonna naw do that yet');
		})
		/**
		 *
		 * @apiIgnore
		 *
		 * @api {post} /fridges/:id Update Fridge State
		 * @apiName UpdateFridgeState
		 * @apiGroup Fridges State
		 *
		 * @apiDescription
		 * Update the state of the fridge
		 *
		 * @apiParamExample {json} Request-Example:
		 *  {
						 *      "PRODCUT": "INFO"       //TODO
						 *  }
		 *
		 * @apiSuccessExample {json} Success-app.response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "PRODUCT": "INFO"   //TODO
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error-app.response:
		 *  {
		 *      "success": false,
		 *      "message": "Invalid Product Id,
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.post(function(req, res){
			res.send('Gonna naw do that yet');
		});


	return fridgeRouter;
};

module.exports = fridges;