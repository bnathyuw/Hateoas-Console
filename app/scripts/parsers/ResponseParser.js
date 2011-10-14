/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

HATEOAS_CONSOLE.parsers.ResponseParser = function ResponseParser(spec) {
	"use strict";
	
	if (!this instanceof ResponseParser) {
		return new ResponseParser(spec);
	}
	
	if (!spec) {
		throw {
			name: "Missing parameter",
			message: "Required parameter spec is missing"
		};
	}
	
	if (!spec.uriParser) {
		throw {	
			name: "Invalid Parameter",
			message: "Parameter spec is missing a required member: uriParser"
		};
	}
	
	if (!spec.linkFinderFactory) {
		throw {	
			name: "Invalid Parameter",
			message: "Parameter spec is missing a required member: linkFinderFactory"
		};
	}
	
	if (!spec.uri) {
		throw {	
			name: "Invalid Parameter",
			message: "Parameter spec is missing a required member: uri"
		};
	}

	var response = spec.response,
		
		linkFinder = spec.linkFinderFactory.create(spec.contentType),
	
		uriParser = spec.uriParser,
		
		parsedRequestUri = uriParser.parse(spec.uri),
		
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
		
	this.getLinks = getLinks;
};
