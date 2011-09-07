/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.responseParserBase = function (spec, my) {
	"use strict";

	my = my || {};
	
	my.getLinksFromResponse = my.getLinksFromResponse || function () {
		return [];
	};
	
	var that = {},
		
		getResponse = function () {
			return spec.response;
		},

		getLinks = function () {
			var response = getResponse();
				
			if (my.links === undefined) {
				my.links = my.getLinksFromResponse(response);
			}
			
			return my.links;
		};
		
	that.getLinks = getLinks;
	
	return that;
};