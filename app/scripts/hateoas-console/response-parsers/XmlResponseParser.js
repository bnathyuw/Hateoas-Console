/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.XmlResponseParser = (function () {
	"use strict";
	var getLinks,
		Constr;
	
	getLinks = function (response) {
		var attributeRegex = /(?:href|src|link)="([^"]+)"/g,
			elementRegex = /<(?:href|src|link)[^>]*>([^<]+)<\/(?:href|src|link)>/g,
			linksFound = [],
			links = [],
			link,
			match,
			i,
			j,
			addLink = function (match) {
				linksFound.push({location: match.index, uri: match[1]});
			};
		
		while ((match = attributeRegex.exec(response)) !== null) {
			addLink(match);
		}
		
		while ((match = elementRegex.exec(response)) !== null) {
			addLink(match);
		}
		
		linksFound.sort(function (a, b) {
			return a.location - b.location;
		});
		
		// TODO: optimise!
loopLinksFound: 
		for (i = 0; i < linksFound.length; i += 1) {
			link = linksFound[i];
			for (j = 0; j < links.length; j += 1) {
				if (links[j].uri === link.uri) {
					links[j].locations.push(link.location);
					continue loopLinksFound;
				}
			}
			links.push({uri: link.uri, locations: [link.location]});
		}
		
		return links;
	};
	
	Constr = function () {};
		
	Constr.prototype = {
		constructor: HATEOAS_CONSOLE.responseParsers.XmlResponseParser,
		getLinks: getLinks
	};
	
	return Constr;
}());