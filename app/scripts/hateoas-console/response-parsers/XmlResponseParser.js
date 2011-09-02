/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.XmlResponseParser = (function () {
	"use strict";
	var getLinks = function (response) {
			var attributeRegex = /(?:href|src|link)="([^"]+)"/g,
				elementRegex = /<(?:href|src|link)[^>]*>([^<]+)<\/(?:href|src|link)>/g,
				linksFound = [],
				links = [],
				match,
				i,
				max;
			
			while ((match = attributeRegex.exec(response)) !== null) {
				linksFound.push({index: match.index, link: match[1]});
			}
			
			while ((match = elementRegex.exec(response)) !== null) {
				linksFound.push({index: match.index, link: match[1]});
			}
			
			linksFound.sort(function (a, b) {
				return a.index - b.index;
			});
			
			for (i = 0, max = linksFound.length; i < max; i += 1) {
				links.push(linksFound[i].link);
			}
			
			return links;
		},
		Constr = function () {};
		
	Constr.prototype = {
		constructor: HATEOAS_CONSOLE.responseParsers.XmlResponseParser,
		getLinks: getLinks
	};
	
	return Constr;
}());