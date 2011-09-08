/*global HATEOAS_CONSOLE, responseParserBase: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.jsonResponseParser = function JsonResponseParser(spec, my) {
	"use strict";

	my = my || {};
	
	var that,
		
		getLinksFromResponse = function (response) {
			var links = [],
				parsedResponse = JSON.parse(response),
				c,
				walkObject = function walkObject (obj) {
					for (c in obj) {
						if (obj.hasOwnProperty(c)) {
							if(c === "href") {
								links.push({uri: obj[c]});
							} else {
								walkObject(obj[c]);
							}
						}
					}				
				};
				
			walkObject(parsedResponse);
			
			return links;
		};
	
	my.getLinksFromResponse = getLinksFromResponse;
	
	that = Object.create(HATEOAS_CONSOLE.responseParsers.responseParserBase(spec, my));
		
	that.constructor = JsonResponseParser;
	
	return that;
};
