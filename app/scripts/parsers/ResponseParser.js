/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

HATEOAS_CONSOLE.parsers.ResponseParser = function ResponseParser(spec) {
	"use strict";
	
	spec = spec || {};

	var that = {},
	
		response = spec.response || "",
		
		uri = spec.uri || "",
		
		contentType = spec.contentType || "",
		
		linkFinder = spec.linkFinder || new HATEOAS_CONSOLE.parsers.LinkFinderFactory().create(contentType),
	
		uriParser = spec.uriParser || new HATEOAS_CONSOLE.parsers.UriParser(),
		
		parsedRequestUri = uriParser.parse(uri),
		
		links,
	
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

			for (i = 0; i < links.length; i += 1) {
				if (links[i].uri === uri) {
					return links[i];
				}
			}
			
			parts = uriParser.parse(uri);
			
			link = {
				uri: uri,
				parts: parts,
				locations: [], 
				hasSameOrigin: compareOrigin(parts)
			};
			links.push(link);
			return link;
		},
		
		setAttributes =  function (attributeName, values, link) {

			link[attributeName] = link[attributeName] || [];

			if (!values) {
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
		
		getLinks = function () {
			if (links) {
				return links;
			}
			
			var linksFound;
			
			links = [];
			
			linksFound = linkFinder.getLinks(response);
			
			linksFound.forEach(function (link) {
				addLink(link);
			});
			
			return links;
		};
		
	that.getLinks = getLinks;
	
	that.constructor = ResponseParser;
	
	return that;
};
