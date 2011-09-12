/*global HATEOAS_CONSOLE, responseParser: false */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.jsonLinkFinder = function JsonLinkFinder(spec, my) {
	"use strict";

	my = my || {};
	
	var that,
	
		singleLinkRegExp = /^\S*(?:href|link|src|url|uri)$/g,
		
		multipleLinkRegExp = /^\S*(?:href|link|src|url|uri)s$/g,
		
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
	
	that = Object.create(HATEOAS_CONSOLE.responseParsers.responseParser(spec, my));
		
	that.constructor = JsonLinkFinder;
	
	return that;
};
