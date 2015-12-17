/**
 * Created by Tom on 17/12/2015.
 */

angular.module('polyfill', [])
	.run(function(){

		if (!String.prototype.trim) {
			String.prototype.trim = function () {
				return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
			};
		}

	});