/*global $: false, jQuery: false, HATEOAS_CONSOLE: false, Backbone: false, _: false */

(function () {
	"use strict";
	var RestRequest = HATEOAS_CONSOLE.models.RestRequest,
		RequestParser = HATEOAS_CONSOLE.parsers.RequestParser,
		ResponseParser = HATEOAS_CONSOLE.parsers.ResponseParser,
		UriParser = HATEOAS_CONSOLE.parsers.UriParser,
		LinkFinderFactory = HATEOAS_CONSOLE.parsers.LinkFinderFactory,
		RequestLog = HATEOAS_CONSOLE.views.RequestLog,
		ResponseLog = HATEOAS_CONSOLE.views.ResponseLog,
		RequestForm = HATEOAS_CONSOLE.views.RequestForm,
		RequestMaker = HATEOAS_CONSOLE.http.RequestMaker,
		LinksPanel = HATEOAS_CONSOLE.views.LinksPanel,
		
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
			},
			getLinks: function () {
				return "<table><tr><td>Links</td></tr></table>";
			}
		},
		
		responseParserFactory = {
			create: function (response) {
				var spec = {
					uriParser: new UriParser(),
					linkFinderFactory: new LinkFinderFactory(),
					uri: "http://hateoas-console.local/",
					contentType: "application/html"
				};
				return new ResponseParser(spec);
			}
		},
		
		responseLog = new ResponseLog({
			aggregator: aggregator,
			responseParserFactory: responseParserFactory
		}),
		
		linksPanel = new LinksPanel({
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