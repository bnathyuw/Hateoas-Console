/*global HATEOAS_CONSOLE, responseParserBase: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.jsonpResponseParser = function JsonpResponseParser(spec, my) {
	"use strict";

	my = my || {};
	
	var that;
	
	that = Object.create(HATEOAS_CONSOLE.responseParsers.responseParserBase(spec, my));
		
	that.constructor = JsonpResponseParser;
	
	return that;
};
