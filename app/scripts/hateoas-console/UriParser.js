/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

(function () {
	"use strict";

	var instance;

	HATEOAS_CONSOLE.uriParser = function UriParser() {
		
		if (instance !== undefined) {
			return instance;
		}
	
		instance = {};
		
		instance.constructor = UriParser;
	
		return instance;
	};
	
}());
