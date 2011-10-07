/*global $: false, jQuery: false, HATEOAS_CONSOLE: false, Backbone: false, _: false */

(function () {
	"use strict";
	var RestRequest = HATEOAS_CONSOLE.models.RestRequest,
		RequestParser = HATEOAS_CONSOLE.parsers.RequestParser,
		UriParser = HATEOAS_CONSOLE.parsers.UriParser,
		RequestLog = HATEOAS_CONSOLE.views.RequestLog,
		ResponseLog = HATEOAS_CONSOLE.views.ResponseLog,
		RequestForm = HATEOAS_CONSOLE.views.RequestForm,
		RequestMaker = HATEOAS_CONSOLE.http.RequestMaker,
		
		aggregator = _.extend({}, Backbone.Events),
	
		request = new RestRequest(),
		
		requestParser = new RequestParser({
			uriParser: new UriParser()
		}),
		
		requestLog = new RequestLog({
			aggregator: aggregator,
			requestParser: requestParser
		}),
		
		responseParser = {
			toHttpString: function () {
				return "<title>HATEOAS console</title>";
			}
		},
		
		responseParserFactory = {
			create: function () {
				return responseParser;
			}
		},
		
		responseLog = new ResponseLog({
			aggregator: aggregator,
			responseParserFactory: responseParserFactory
		}),
		
		requestForm = new RequestForm({
			model: request,
			aggregator: aggregator
		}),
		
		requestMaker = new RequestMaker({
			aggregator: aggregator
		});
}());