/*global HATEOAS_CONSOLE, responseParser: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.jsonpLinkFinder = function JsonpLinkFinder(spec, my) {
	"use strict";

	my = my || {};
	
	var that;
	
	that = {};
		
	that.constructor = JsonpLinkFinder;
	
	return that;
};
