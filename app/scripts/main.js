/*global $: false, jQuery: false, HATEOAS_CONSOLE: false, Backbone: false, _: false */

(function () {
	"use strict";
	var aggregator = _.extend({}, Backbone.Events),
	
		request = new HATEOAS_CONSOLE.models.RestRequest(),
		
		requestParser = new HATEOAS_CONSOLE.parsers.RequestParser({
			uriParser: new HATEOAS_CONSOLE.parsers.uriParser()
		}),
		
		requestLog = new HATEOAS_CONSOLE.views.RequestLog({
			aggregator: aggregator,
			requestParser: requestParser
		}),
		
		requestForm = new HATEOAS_CONSOLE.views.RequestForm({
			model: request,
			aggregator: aggregator
		});
}());