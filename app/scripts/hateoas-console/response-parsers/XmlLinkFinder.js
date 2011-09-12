/*global HATEOAS_CONSOLE, responseParserBase: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.xmlLinkFinder = function XmlLinkFinder(spec, my) {
	"use strict";

	my = my || {};
	
	var that,
		
		getAttributeValues = function (attributeName, tag) {
			var regex = new RegExp(" " + attributeName + "=\"([^\"]+)\"", "g"),
				match = regex.exec(tag);

			if (match === null) {
				return [];
			}

			return match[1].split(" ");
		},
		
		getLinksFromResponse = function (response) {
			var links = [],
				searchRegex = /(<[^>]+\s\S*(?:href|src|link|url|uri)="([^"]+)"[^>]*>)|(?:(<(\S*(?:href|src|link|url|uri))[^>]*>)([^<]+)<\/\4>)/g,
				match,
				tag;

			while ((match = searchRegex.exec(response)) !== null) {
				tag = match[1] || match[3];
				
				links.push({
					uri: match[2] || match[5], 
					rel: getAttributeValues("rel", tag), 
					rev: getAttributeValues("rev", tag), 
					location: match.index
				});
			}
			
			return links;
		};
	
	my.getLinksFromResponse = getLinksFromResponse;
	
	that = Object.create(HATEOAS_CONSOLE.responseParsers.responseParser(spec, my));
		
	that.constructor = XmlLinkFinder;
	
	return that;
};
