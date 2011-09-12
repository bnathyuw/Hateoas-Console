/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.responseParser = function ResponseParser(spec, my) {
	"use strict";
	
	spec = spec || {};

	my = my || {};
	
	var that = {},
	
		uriParser = HATEOAS_CONSOLE.uriParser.uriParser(),
		
		parsedRequestUri = uriParser.parse(spec.uri),
	
		compareOrigin = function (parsedLinkUri) {
			if (!parsedRequestUri || !parsedLinkUri) {
				return false;
			}
			
			// TODO: deal with schemeless URIs
			
			return parsedRequestUri.scheme === parsedLinkUri.scheme &&
				parsedRequestUri.authority === parsedLinkUri.authority;
			
		},
		
		findOrCreateLink = function (uri) {
			var link,
				parts,
				i;

			for (i = 0; i < my.links.length; i += 1) {
				if (my.links[i].uri === uri) {
					return my.links[i];
				}
			}
			
			parts = uriParser.parse(uri);
			
			link = {
				uri: uri,
				parts: parts,
				locations: [], 
				hasSameOrigin: compareOrigin(parts)
			};
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
	
	that.constructor = ResponseParser;
	
	return that;
};
