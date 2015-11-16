/**
 * Created by Tom on 07/11/2015.
 */

var express = require('express'),
	response = require('./../Response/Response')();

var contents = function(){

	var contentsRouter = express.Router();

	contentsRouter.route('/:id')
		/**
		 *
		 * @apiIgnore
		 *
		 * @api {get} /contents/:id Get Contents
		 * @apiName GetContents
		 * @apiGroup Contents
		 *
		 * @apiDescription
		 * Get the contents of a fridge
		 *
		 * @apiSuccessExample {json} Success-app.Response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": [
		 *          {"PRODUCT": "INFO"},    //TODO
		 *          {"PRODUCT": "INFO"}
		 *      ]
		 *  }
		 *
		 *  @apiErrorExample {json} DB-Error-app.Response:
		 *  {
		 *      "success": false,
		 *      "message": "DB is busted",
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.get(function(res, req){

			res.send('Gonna naw do that yet');

		})
		/**
		 *
		 * @apiIgnore
		 *
		 * @api {put} /contents/:id Add Content
		 * @apiName AddContent
		 * @apiGroup Contents
		 *
		 * @apiDescription
		 * Add something new and tasty to the fridge
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
		 *  @apiErrorExample {json} DB-Error-app.Response:
		 *  {
		 *      "success": false,
		 *      "message": "DB is busted",
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.put(function(res, req){





			res.send('Gonna naw do that yet');
		})
		/**
		 *
		 * @apiIgnore
		 *
		 * @api {post} /contents/:id Update Content
		 * @apiName UpdateContent
		 * @apiGroup Contents
		 *
		 * @apiDescription
		 * Update the contents of the fridge
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
		.post(function(req, res){

			res.send('Gonna naw do that yet');

		})
		/**
		 *
		 * @apiIgnore
		 *
		 * @api {delete} /contents/:id Delete Content
		 * @apiName DeleteContent
		 * @apiGroup Contents
		 *
		 * @apiDescription
		 * Remove an item from the fridge
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
		.delete(function(req, res){

			res.send('Gonna naw do that yet');

		});

	return contentsRouter;
};

module.exports = contents;