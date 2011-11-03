/*global HATEOAS_CONSOLE, responseParser: false */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

HATEOAS_CONSOLE.parsers.JsonLinkFinder = (function () {
	"use strict";

	var instance,

		singleLinkRegExp = /^\S*(?:href|link|src|url|url)$/g,

		multipleLinkRegExp = /^\S*(?:href|link|src|url|url)s$/g,

		getLinks = function (response) {
			var links = [];

			JSON.parse(response, function (key, value) {
				if (singleLinkRegExp.test(key)) {
					links.push({url: value});
				} else if (multipleLinkRegExp.test(key)) {
					value.forEach(function (v) {
						links.push({url: v});
					});
				}
				return value;
			});

			return links;
		};

	return function JsonLinkFinder() {

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