/*global HATEOAS_CONSOLE, responseParserBase: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.xmlResponseParser = function XmlResponseParser(spec, my) {
	"use strict";

	my = my || {};
	
	var that,
		
		findOrCreateLink = function (links, uri) {
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

		copyAttributes = function (tag, link) {
			return function (attributeName) {
				copyDistinctAttributes(attributeName, tag, link);
			};
		},
		
		getLinksFromResponse = function (response) {
			var links = [],
				searchRegex = /(<[^>]+(?:href|src|link)="([^"]+)"[^>]*>)|(?:(<(?:href|src|link)[^>]*>)([^<]+)<\/(?:href|src|link)>)/g,
				attributes = ["rel", "rev"],
				link,
				match,
				tag,
				uri;

			while ((match = searchRegex.exec(response)) !== null) {
				tag = match[1] || match[3];
				uri = match[2] || match[4];

				link = findOrCreateLink(links, uri);

				link.locations.push(match.index);

				attributes.forEach(copyAttributes(tag, link));
			}
			
			return links;
		};
	
	my.getLinksFromResponse = getLinksFromResponse;
	
	that = Object.create(HATEOAS_CONSOLE.responseParsers.responseParserBase(spec, my));
		
	that.constructor = XmlResponseParser;
	
	return that;
};