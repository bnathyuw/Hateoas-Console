/*global HATEOAS_CONSOLE */

// TODO: decide if there's a better way to namespace
var HATEOAS_CONSOLE = HATEOAS_CONSOLE || {};
HATEOAS_CONSOLE.RESPONSE_PARSERS = HATEOAS_CONSOLE.RESPONSE_PARSERS || {};

// TODO: use a better OO pattern
HATEOAS_CONSOLE.RESPONSE_PARSERS.XmlResponseParser = function () {
	"use strict";
};

HATEOAS_CONSOLE.RESPONSE_PARSERS.XmlResponseParser.prototype.getLinks = function (response) {
	"use strict";
	var regex = /(?:href|src|link)="(.*)"/g,
		links = [],
		match;
	
	while ((match = regex.exec(response))) {
		links.push(match[1]);
	}
	
	return links;
};