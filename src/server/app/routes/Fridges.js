/**
 * Created by Tom on 07/11/2015.
 */

var express = require('express'),
	response = require('./../Response/Response')();

var fridges = function(){

	var fridgeRouter = express.Router();

	fridgeRouter.route('/')
		/**
		 * @api {get} /api/fridges Get Fridges
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
		 * @apiSuccessExample {json} Success-app.Response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "PRODUCT": "INFO"   //TODO
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error-app.Response:
		 *  {
		 *      "success": false,
		 *      "message": "Invalid Product Id,
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.get(function(res, req){
			res.send('Gonna naw do that yet');
		});

	fridgeRouter.route('/:id')
		/**
		 * @api {get} /api/fridges/:id Get Fridge State
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
		 * @apiSuccessExample {json} Success-app.Response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "PRODUCT": "INFO"   //TODO
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error-app.Response:
		 *  {
		 *      "success": false,
		 *      "message": "Invalid Product Id,
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.get(function(res, req){
			res.send('Gonna naw do that yet');
		})
		/**
		 * @api {post} /api/fridges/:id Update Fridge State
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
		 * @apiSuccessExample {json} Success-app.Response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "PRODUCT": "INFO"   //TODO
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error-app.Response:
		 *  {
		 *      "success": false,
		 *      "message": "Invalid Product Id,
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.post(function(res, req){
			res.send('Gonna naw do that yet');
		});


	return fridgeRouter;
};

module.exports = fridges;