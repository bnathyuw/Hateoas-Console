/*global HATEOAS_CONSOLE, responseParserBase: false */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.jsonResponseParser = function JsonResponseParser(spec, my) {
	"use strict";

	my = my || {};
	
	var that,
	
		singleLinkRegExp = /^(?:href|link|src|\S*url|\S*uri)$/g,
		
		multipleLinkRegExp = /^(?:href|link|src|\S*url|\S*uri)s$/g,
		
		getLinksFromResponse = function (response) {
			var links = [];

			JSON.parse(response, function (key, value) {
				if (singleLinkRegExp.test(key)) {
					links.push({uri: value});
				} else if (multipleLinkRegExp.test(key)) {
					value.forEach(function (v) {
						links.push({uri: v});
					});
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
