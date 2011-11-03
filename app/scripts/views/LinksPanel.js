/*global HATEOAS_CONSOLE: false, _: false, $: false, Backbone: false */
HATEOAS_CONSOLE.namespace("views");

HATEOAS_CONSOLE.views.LinksPanel = (function () {
	"use strict";

	var base = (function () {
		var responseParserFactory;

		return {
			el: "#links",

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
					links = responseParser.getLinks();

				$(this.el).html("<table></table>");
			}
		};
	}());

	return Backbone.View.extend(base);
}());