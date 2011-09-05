/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.XmlResponseParser = (function () {
	"use strict";
	var getLinks,
		Constr;
	
	getLinks = function (response) {
		var linkInAttributeRegex = /(<[^>]+(?:href|src|link)="([^"]+)"[^>]*>)/g,
			linkInElementRegex = /(<(?:href|src|link)[^>]*>)([^<]+)<\/(?:href|src|link)>/g,
			linksFound = [],
			links = [],
			link,
			match,
			i,
			addLink = function (location, tag, uri) {
				var link = {location: location, uri: uri},
					addAttribute = function (attributeName) {
						var regex = new RegExp(" " + attributeName + "=\"([^\"]+)\"", "g"),
							match = regex.exec(tag);
						if (match !== null) {
							link[attributeName] = match[1];
						}
					};
				
				addAttribute("rel");
				addAttribute("rev");
				
				linksFound.push(link);
			};
		
		while ((match = linkInAttributeRegex.exec(response)) !== null) {
			addLink(match.index, match[1], match[2]);
		}
		
		while ((match = linkInElementRegex.exec(response)) !== null) {
			addLink(match.index, match[1], match[2]);
		}
		
		linksFound.sort(function (a, b) {
			return a.location - b.location;
		});
		
		linksFound.forEach(function (link) {
			for (i = 0; i < links.length; i += 1) {
				if (links[i].uri === link.uri) {
					links[i].locations.push(link.location);
					return;
				}
			}
			links.push({uri: link.uri, locations: [link.location], rel: link.rel, rev: link.rev});
		});
		
		return links;
	};
	
	Constr = function () {};
		
	Constr.prototype = {
		constructor: HATEOAS_CONSOLE.responseParsers.XmlResponseParser,
		getLinks: getLinks
	};
	
	return Constr;
}());