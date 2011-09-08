/*global HATEOAS_CONSOLE, responseParserBase: false */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.jsonResponseParser = function JsonResponseParser(spec, my) {
	"use strict";

	my = my || {};
	
	var that,
		
		getLinksFromResponse = function (response) {
			var links = [];

			JSON.parse(response, function (key, value) {
				if (key === "href") {
					links.push({uri: value});
				}
				return value;
			});
			
			return links;
		};
	
	my.getLinksFromResponse = getLinksFromResponse;
	
	that = Object.create(HATEOAS_CONSOLE.responseParsers.responseParserBase(spec, my));
		
	that.constructor = JsonResponseParser;
	
	return that;
};
