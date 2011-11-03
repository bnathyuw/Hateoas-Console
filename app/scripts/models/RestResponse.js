/*global HATEOAS_CONSOLE: false, Backbone: false */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.models");

(function () {
	"use strict";
	HATEOAS_CONSOLE.models.RestResponse = Backbone.Model.extend({
		getHeader: function () {
			return "application/xml";
		}
	});
}());