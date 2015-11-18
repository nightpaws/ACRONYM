/**
 * Created by Tom on 15/11/2015.
 */

var q = require('q');
var deferred = q.defer();
var mongoose = require('mongoose');
var config = require('../../../config');

var products = {

	addProduct: function(product){

		var productModel = require('../../models/Product.model');

		var productDAO = new productModel({
			code: product.code,
			name: product.name,
			weight: product.weight
		});

		productDAO.save(function(err, doc){

			if(err){
				deferred.reject('error saving product');
			}else{
				deferred.resolve(doc);
			}

		});

		return deferred.promise;
	},

	getProduct: function(id){

		var productModel = require('../../models/Product.model');

		deferred = q.defer();
		productModel.findById(id, function(err, doc){

			if(err){
				deferred.reject("Error with product code");
			}else if(doc){
				deferred.resolve(doc);
			}

		});

		return deferred.promise;
	},

	updateProduct: function(id, product){

		var productModel = require('../../models/Product.model');

		deferred = q.defer();

		productModel.findOneAndUpdate(
			{_id: id},
			{
				name: product.name,
				code: product.code,
				weight: product.weight,
				description: product.description
			},
			{new: true},
			function(err, doc) {

				if (err) {
					deferred.reject('Error updating product');
				} else {
					deferred.resolve(doc);
				}

			});

		return deferred.promise;
	},

	searchProducts: function(text){

		var productModel = require('../../models/Product.model');

		deferred = q.defer();

		productModel
			.find(
				{ $text: { $search: text}},
				{ score : { $meta: "textScore" } }
			)
			.sort({ score : { $meta : 'textScore' } })
			.exec(function(err, results){

				if(err){
					deferred.reject('Error searching for string');
				}else{
					deferred.resolve(results);
				}
			});


		return deferred.promise;

	}

};


module.exports = products;