/*global HATEOAS_CONSOLE: false, Backbone: false */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.models");

HATEOAS_CONSOLE.models.RestResponse = (function () {
	"use strict";

	return Backbone.Model.extend({
		getHeader: function () {
			return "application/xml";
		}
	});
}());