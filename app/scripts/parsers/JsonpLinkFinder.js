/*global HATEOAS_CONSOLE, responseParser: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

HATEOAS_CONSOLE.parsers.JsonpLinkFinder = (function () {
	"use strict";

	var instance;

	return function JsonpLinkFinder() {

		if (instance) {
			return instance;
		}

		instance = {};

		instance.constructor = JsonpLinkFinder;

		return instance;
	};

}());