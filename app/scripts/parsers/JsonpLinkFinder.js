/*global HATEOAS_CONSOLE, responseParser: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

HATEOAS_CONSOLE.parsers.JsonpLinkFinder = (function () {
	"use strict";

	var instance,
		getLinks = function () {},

		JsonpLinkFinder = function JsonpLinkFinder() {

			if (!this instanceof JsonpLinkFinder) {
				return new JsonpLinkFinder();
			}

			if (instance) {
				return instance;
			}

			this.getLinks = getLinks;

			instance = this;
		};

	return JsonpLinkFinder;

}());