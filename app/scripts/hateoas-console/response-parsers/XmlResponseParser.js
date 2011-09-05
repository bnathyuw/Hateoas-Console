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

		copyAttributes = function (tag, link) {
			return function (attributeName) {
				copyDistinctAttributes(attributeName, tag, link);
			};
		},

		getLinks = function () {
			var searchRegex = /(<[^>]+(?:href|src|link)="([^"]+)"[^>]*>)|(?:(<(?:href|src|link)[^>]*>)([^<]+)<\/(?:href|src|link)>)/g,
				attributes = ["rel", "rev"],
				link,
				match,
				tag,
				uri;
				
			if (this.links === undefined) {
				this.links = [];

				while ((match = searchRegex.exec(this.response)) !== null) {
					tag = match[1] || match[3];
					uri = match[2] || match[4];

					link = findOrCreateLink(this.links, uri);

					link.locations.push(match.index);

					attributes.forEach(copyAttributes(tag, link));
				}

			}
			return this.links;
		},

		XmlResponseParser = function (response) {
			this.response = response;
		};

	XmlResponseParser.prototype = {
		constructor: HATEOAS_CONSOLE.responseParsers.XmlResponseParser,
		getLinks: getLinks
	};

	return XmlResponseParser;
}());