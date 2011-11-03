/*global HATEOAS_CONSOLE: false, Backbone: false */

HATEOAS_CONSOLE.namespace("models");

HATEOAS_CONSOLE.models.RestResponse = (function () {
	"use strict";
	
	var getHeader = function () {
			return "application/xml";
		}

	return Backbone.Model.extend({
		getHeader: getHeader
	});
}());