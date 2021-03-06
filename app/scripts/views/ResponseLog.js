/*global HATEOAS_CONSOLE: false, _: false, $: false, Backbone: false */

HATEOAS_CONSOLE.namespace("views");

HATEOAS_CONSOLE.views.ResponseLog = (function () {
	"use strict";
	var responseParserFactory;

	return Backbone.View.extend({
		el: "#response",

		initialize: function (options) {
			_.bindAll(this, "logResponse");
			options.aggregator.bind("received", this.logResponse);
			responseParserFactory = options.responseParserFactory;
		},

		logResponse: function (event) {
			var responseParser = responseParserFactory.create({
					url: event.url,
					response: event.response
				}),
				responseString = responseParser.toHttpString();

			$(this.el).text(responseString);
		}
	});
}());