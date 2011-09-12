/*global HATEOAS_CONSOLE, responseParserBase: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.jsonpLinkFinder = function JsonpLinkFinder(spec, my) {
	"use strict";

	my = my || {};
	
	var that;
	
	that = Object.create(HATEOAS_CONSOLE.responseParsers.responseParser(spec, my));
		
	that.constructor = JsonpLinkFinder;
	
	return that;
};
