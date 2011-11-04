/*global HATEOAS_CONSOLE: false, Backbone: false */

HATEOAS_CONSOLE.namespace("models");

HATEOAS_CONSOLE.models.RestRequest = function RestRequest(spec) {
	"use strict";

	var headers = {},

		Ctor = Backbone.Model.extend({
			defaults: {
				verb: "GET",
				url: "http://hateoas-console.local/"
			},
			getAllHeaders: function () {
				return headers;
			},
			setHeader: function (key, value) {
				headers[key] = value;
			}
		});

	return new Ctor(spec);
};
