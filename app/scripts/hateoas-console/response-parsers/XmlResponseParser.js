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
							match = regex.exec(tag),
							values;
						if (match !== null) {
							values = match[1].split(" ");
							link[attributeName] = values;
						}
					};
				
				addAttribute("rel");
				addAttribute("rev");
				
				linksFound.push(link);
			},
			copyDistinctAttributes = function (attributeName, linkFound, link) {
				if (link[attributeName] === undefined) {
					link[attributeName] = linkFound[attributeName];
				} else if (linkFound[attributeName] !== undefined) {
					linkFound[attributeName].forEach(function (value) {
						if (link[attributeName].indexOf(value) === -1) {
							link[attributeName].push(value);
						}
					});
				}
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
		
		linksFound.forEach(function (linkFound) {
			var link;
			for (i = 0; i < links.length; i += 1) {
				link = links[i];
				if (link.uri === linkFound.uri) {
					link.locations.push(linkFound.location);
					
					copyDistinctAttributes("rel", linkFound, link);
					copyDistinctAttributes("rev", linkFound, link);
					
					return;
				}
			}
			links.push({uri: linkFound.uri, locations: [linkFound.location], rel: linkFound.rel, rev: linkFound.rev});
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