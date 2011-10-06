/*global HATEOAS_CONSOLE, responseParser: false */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

(function () {
	"use strict";
	
	var instance,
	
		getAttributeValues = function (attributeName, tag) {
			var regex = new RegExp(" " + attributeName + "=\"([^\"]+)\"", "g"),
				match = regex.exec(tag);

			if (!match) {
				return [];
			}

			return match[1].split(" ");
		},
		
		getLinks = function (response) {
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

	HATEOAS_CONSOLE.responseParsers.xmlLinkFinder = function XmlLinkFinder() {
	
		if (instance) {
			return instance;
		}

		instance = {
			getLinks: getLinks
		};
			
		instance.constructor = XmlLinkFinder;
		
		return instance;
	};
}());