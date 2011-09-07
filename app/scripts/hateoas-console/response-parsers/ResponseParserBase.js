/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.responseParserBase = function (spec, my) {
	"use strict";

	my = my || {};
	
	var that = {},
		
		getLinksFromResponse = my.getLinksFromResponse || function () {
			return [];
		},
		
		getLinks = function () {

			if (my.links === undefined) {
				my.links = getLinksFromResponse(spec.response);
			}
			
			return my.links;
		};
		
	that.getLinks = getLinks;
	
	return that;
};