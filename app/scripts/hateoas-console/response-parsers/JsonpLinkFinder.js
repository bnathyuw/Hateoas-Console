/*global HATEOAS_CONSOLE, responseParser: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.jsonpLinkFinder = function JsonpLinkFinder() {
	"use strict";

	var that;
	
	that = {};
		
	that.constructor = JsonpLinkFinder;
	
	return that;
};
