/*global HATEOAS_CONSOLE, responseParser: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

(function () {
	"use strict";
	
	var instance;

	HATEOAS_CONSOLE.parsers.jsonpLinkFinder = function JsonpLinkFinder() {

		if (instance) {
			return instance;
		}

		instance = {};
			
		instance.constructor = JsonpLinkFinder;
		
		return instance;
	};

}());