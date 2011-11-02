/*global HATEOAS_CONSOLE: false, Backbone: false, _: false, $: false */

HATEOAS_CONSOLE.namespace("views");

HATEOAS_CONSOLE.views.RequestLog = (function () {
	"use strict";
	
	return Backbone.View.extend({
		el: "#request",
		
		initialize: function (options) {
			_.bindAll(this, "logRequest");
			options.aggregator.bind("send", this.logRequest);
			this.requestParser = options.requestParser;
		},
		
		logRequest: function (event) {
			var log = this.requestParser.parse(event.request);
			$(this.el).text(log);
		}
	});
}());