/*global HATEOAS_CONSOLE: false, Backbone: false */

HATEOAS_CONSOLE.namespace("models");

HATEOAS_CONSOLE.models.RestRequest = (function () {
	"use strict";

	return Backbone.Model.extend({
		defaults: {
			verb: "GET",
			url: "http://hateoas-console.local/"
		}
	});
}());