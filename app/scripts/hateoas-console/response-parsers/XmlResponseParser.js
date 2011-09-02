/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

// TODO: decide if there's a better way to namespace
var HATEOAS_CONSOLE = HATEOAS_CONSOLE || {};
HATEOAS_CONSOLE.RESPONSE_PARSERS = HATEOAS_CONSOLE.RESPONSE_PARSERS || {};

// TODO: use a better OO pattern
HATEOAS_CONSOLE.RESPONSE_PARSERS.XmlResponseParser = function () {
	"use strict";
};

HATEOAS_CONSOLE.RESPONSE_PARSERS.XmlResponseParser.prototype.getLinks = function (response) {
	"use strict";
	var attributeRegex = /(?:href|src|link)="([^"]+)"/g,
		elementRegex = /<(?:href|src|link)[^>]*>([^<]+)<\/(?:href|src|link)>/g,
		linksFound = [],
		links = [],
		match,
		i,
		max;
	
	while ((match = attributeRegex.exec(response)) !== null) {
		linksFound.push({index: match.index, link: match[1]});
	}
	
	while ((match = elementRegex.exec(response)) !== null) {
		linksFound.push({index: match.index, link: match[1]});
	}
	
	linksFound.sort(function (a, b) {
		return a.index - b.index;
	});
	
	for (i = 0, max = linksFound.length; i < max; i += 1) {
		links.push(linksFound[i].link);
	}
	
	return links;
};