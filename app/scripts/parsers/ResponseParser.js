/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

HATEOAS_CONSOLE.parsers.ResponseParser = (function () {
	"use strict";

	var ResponseParser = function ResponseParser(spec) {

			if (!this instanceof ResponseParser) {
				return new ResponseParser(spec);
			}

			if (!spec) {
				throw {
					name: "Missing parameter",
					message: "Required parameter spec is missing"
				};
			}

			if (!spec.urlParser) {
				throw {
					name: "Invalid Parameter",
					message: "Parameter spec is missing a required member: urlParser"
				};
			}

			if (!spec.linkFinderFactory) {
				throw {
					name: "Invalid Parameter",
					message: "Parameter spec is missing a required member: linkFinderFactory"
				};
			}

			if (!spec.url) {
				throw {
					name: "Invalid Parameter",
					message: "Parameter spec is missing a required member: url"
				};
			}

			if (spec.response === undefined) {
				throw {
					name: "Invalid Parameter",
					message: "Parameter spec is missing a required member: response"
				};
			}

			var response = spec.response,

				linkFinder = spec.linkFinderFactory.create(response.getHeader("content-type")),

				urlParser = spec.urlParser,

				parsedRequestUri = urlParser.parse(spec.url),

				links,

				compareOrigin = function (parsedLinkUri) {
					if (!parsedRequestUri || !parsedLinkUri) {
						return false;
					}

					// TODO: deal with schemeless URIs

					return parsedRequestUri.scheme === parsedLinkUri.scheme &&
						parsedRequestUri.authority === parsedLinkUri.authority;

				},

				findOrCreateLink = function (url) {
					var link,
						parts,
						i;

					for (i = 0; i < links.length; i += 1) {
						if (links[i].url === url) {
							return links[i];
						}
					}

					parts = urlParser.parse(url);

					link = {
						url: url,
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
					var link = findOrCreateLink(spec.url);

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

					linksFound = linkFinder.getLinks(response.body);

					linksFound.forEach(function (link) {
						addLink(link);
					});

					return links;
				},

				toHttpString = function () {
					return spec.response.get("body");
				};

			this.getLinks = getLinks;

			this.toHttpString = toHttpString;
		};

	return ResponseParser;
}());
