/*global HATEOAS_CONSOLE: false */

HATEOAS_CONSOLE.namespace("parsers");

HATEOAS_CONSOLE.parsers.ResponseParserFactory = function ResponseParserFactory(spec) {
	"use strict";

	if (!this instanceof ResponseParserFactory) {
		return new ResponseParserFactory(spec);
	}

	var create = function create(createSpec) {
			return new HATEOAS_CONSOLE.parsers.ResponseParser({
				urlParser: spec.urlParser,
				linkFinderFactory: spec.linkFinderFactory,
				url: createSpec.url,
				response: createSpec.response
			});
		};

	this.create = create;
};