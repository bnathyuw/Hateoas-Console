/*global HATEOAS_CONSOLE: false, Backbone: false */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.models");

HATEOAS_CONSOLE.models.RestRequest = Backbone.Model.extend({
	defaults: {
		verb: "GET",
		url: "http://hateoas-console.local/"
	}
});