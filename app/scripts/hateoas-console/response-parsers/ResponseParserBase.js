/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.responseParserBase = function ResponseParserBase(spec, my) {
	"use strict";

	my = my || {};
	
	var that = {},
	
		compareOrigin = function (requestUri, uri) {
			var uriParser = HATEOAS_CONSOLE.uriParser.uriParser(),
				parsedRequestUri,
				parsedLinkUri;
			
			parsedRequestUri = uriParser.parse(requestUri);
			
			if (!parsedRequestUri) {
				return false;
			}
			
			parsedLinkUri = uriParser.parse(uri);
			
			// TODO: deal with schemeless URIs
			
			if (!parsedLinkUri) {
				return false;
			}
			
			return parsedRequestUri.scheme === parsedLinkUri.scheme &&
				parsedRequestUri.authority === parsedLinkUri.authority;
			
		},
		
		findOrCreateLink = function (uri) {
			var link,
				i;

			for (i = 0; i < my.links.length; i += 1) {
				if (my.links[i].uri === uri) {
					return my.links[i];
				}
			}
			
			link = {
				uri: uri, 
				locations: [], 
				hasSameOrigin: compareOrigin(spec.uri, uri)
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
	
	that.constructor = ResponseParserBase;
	
	return that;
};
