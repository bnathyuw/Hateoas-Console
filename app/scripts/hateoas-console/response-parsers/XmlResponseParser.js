/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.XmlResponseParser = (function () {
	"use strict";
	
	var findOrCreateLink = function (links, uri) {
			var link,
				i;
			for (i = 0; i < links.length; i += 1) {
				if (links[i].uri === uri) {
					return links[i];
				}
			}
			link = {uri: uri, locations: []};
			links.push(link);
			return link;
		},
		
		copyDistinctAttributes = function (attributeName, tag, link) {
			var regex = new RegExp(" " + attributeName + "=\"([^\"]+)\"", "g"),
				match = regex.exec(tag),
				values;
						
			link[attributeName] = link[attributeName] || [];
			
			if (match === null) {
				return;
			}
			
			values = match[1].split(" ");
			
			values.forEach(function (value) {
				if (link[attributeName].indexOf(value) === -1) {
					link[attributeName].push(value);
				}
			});
		},
		
		getLinks = function (response) {
			var searchRegex = /(<[^>]+(?:href|src|link)="([^"]+)"[^>]*>)|(?:(<(?:href|src|link)[^>]*>)([^<]+)<\/(?:href|src|link)>)/g,
				attributes = ["rel", "rev"],
				links = [],
				link,
				match,
				tag,
				uri,
				copyAttributes = function (attributeName) {
					copyDistinctAttributes(attributeName, tag, link);
				};
			
			while ((match = searchRegex.exec(response)) !== null) {
				tag = match[1] || match[3];
				uri = match[2] || match[4];
				
				link = findOrCreateLink(links, uri);
				
				link.locations.push(match.index);
				
				attributes.forEach(copyAttributes);
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