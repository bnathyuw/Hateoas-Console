/*global HATEOAS_CONSOLE, responseParser: false */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

(function () {
	"use strict";

	var instance,
		
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

	HATEOAS_CONSOLE.responseParsers.jsonLinkFinder = function JsonLinkFinder() {
	
		if (instance) {
			return instance;
		}

		instance = {
			getLinks: getLinks
		};
			
		instance.constructor = JsonLinkFinder;
		
		return instance;
	};
}());