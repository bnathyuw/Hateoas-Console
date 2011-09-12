/*global HATEOAS_CONSOLE, responseParser: false */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.jsonLinkFinder = function JsonLinkFinder() {
	"use strict";

	var that,
	
		singleLinkRegExp = /^\S*(?:href|link|src|url|uri)$/g,
		
		multipleLinkRegExp = /^\S*(?:href|link|src|url|uri)s$/g,
		
		getLinks = function (response) {
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
	
	that = {
		getLinks: getLinks
	};
		
	that.constructor = JsonLinkFinder;
	
	return that;
};
