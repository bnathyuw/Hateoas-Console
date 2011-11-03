/*global $: false, jQuery: false, HATEOAS_CONSOLE: false, Backbone: false, _: false, XMLHttpRequest */

(function () {
	"use strict";
	var RestRequest = HATEOAS_CONSOLE.models.RestRequest,
		RestResponse = HATEOAS_CONSOLE.models.RestResponse,
		RequestParser = HATEOAS_CONSOLE.parsers.RequestParser,
		ResponseParser = HATEOAS_CONSOLE.parsers.ResponseParser,
		ResponseParserFactory = HATEOAS_CONSOLE.parsers.ResponseParserFactory,
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
			urlParser: new UriParser()
		}),

		requestLog = new RequestLog({
			aggregator: aggregator,
			requestParser: requestParser
		}),

		responseParserFactory = new ResponseParserFactory({
			urlParser: new UriParser(),
			linkFinderFactory: new LinkFinderFactory({
				constructors: {
					xml: HATEOAS_CONSOLE.parsers.XmlLinkFinder,
					json: HATEOAS_CONSOLE.parsers.JsonLinkFinder,
					"json-p": HATEOAS_CONSOLE.parsers.JsonpLinkFinder,
					html: HATEOAS_CONSOLE.parsers.XmlLinkFinder
				}
			})
		}),

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
			aggregator: aggregator,
			XMLHttpRequest: XMLHttpRequest,
			RestResponse: RestResponse
		});
}());