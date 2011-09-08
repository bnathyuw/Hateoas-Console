/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.responseParserBase = function ResponseParserBase(spec, my) {
	"use strict";

	my = my || {};
	
	var that = {},
		
		findOrCreateLink = function (uri) {
			var link,
				i;

			for (i = 0; i < my.links.length; i += 1) {
				if (my.links[i].uri === uri) {
					return my.links[i];
				}
			}
			link = {uri: uri, locations: []};
			my.links.push(link);
			return link;
		},
		
		setAttributes =  function (attributeName, values, link) {

			link[attributeName] = link[attributeName] || [];

			if (values === undefined) {
				return;
			}

			values.forEach(function (value) {
				if (link[attributeName].indexOf(value) === -1) {
					link[attributeName].push(value);
				}
			});
		},
		
		addLink = function (spec) {
			var link = findOrCreateLink(spec.uri);

			link.locations.push(spec.location);

			setAttributes("rel", spec.rel, link);
			setAttributes("rev", spec.rev, link);
		
		},
		
		getLinksFromResponse = my.getLinksFromResponse || function () {
			return [];
		},
		
		getLinks = function () {
			var links;
			
			if (my.links === undefined) {
			
				my.links = [];
				
				links = getLinksFromResponse(spec.response);
				
				links.forEach(function (link) {
					addLink(link);
				});
			}
			
			return my.links;
		};
		
	that.getLinks = getLinks;
	
	that.constructor = ResponseParserBase;
	
	return that;
};
