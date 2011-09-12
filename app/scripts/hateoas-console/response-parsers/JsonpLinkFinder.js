/*global HATEOAS_CONSOLE, responseParser: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

(function () {
	"use strict";
	
	var instance;

	HATEOAS_CONSOLE.responseParsers.jsonpLinkFinder = function JsonpLinkFinder() {

		if (instance) {
			return instance;
		}

		instance = {};
			
		instance.constructor = JsonpLinkFinder;
		
		return instance;
	};

}());