/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.XmlResponseParser = (function () {
	"use strict";
	var getLinks = function (response) {
			var attributeRegex = /(?:href|src|link)="([^"]+)"/g,
				elementRegex = /<(?:href|src|link)[^>]*>([^<]+)<\/(?:href|src|link)>/g,
				linksFound = {},
				links = [],
				link,
				match,
				i,
				max,
				uri;
			
			while ((match = attributeRegex.exec(response)) !== null) {
				uri = match[1];
				if (linksFound[uri] === undefined) {
					linksFound[uri] = {locations: [match.index], uri: uri};
				} else {
					linksFound[uri].locations.push(match.index);
				}
			}
			
			while ((match = elementRegex.exec(response)) !== null) {
				uri = match[1];
				if (linksFound[uri] === undefined) {
					linksFound[uri] = {locations: [match.index], uri: uri};
				} else {
					linksFound[uri].locations.push(match.index);
				}
			}
			
			for (link in linksFound) {
				if (linksFound.hasOwnProperty(link)) {
					links.push(linksFound[link]);
				}
			}
			
			links.sort(function (a, b) {
				return a.locations[0] - b.locations[0];
			});
			
			return links;
		},
		Constr = function () {};
		
	Constr.prototype = {
		constructor: HATEOAS_CONSOLE.responseParsers.XmlResponseParser,
		getLinks: getLinks
	};
	
	return Constr;
}());