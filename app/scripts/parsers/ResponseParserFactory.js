/*global HATEOAS_CONSOLE: false */

HATEOAS_CONSOLE.namespace("parsers");

HATEOAS_CONSOLE.parsers.ResponseParserFactory = (function () {
	"use strict";
	var ResponseParserFactory = function ResponseParserFactory(spec) {

			if (!this instanceof ResponseParserFactory) {
				return new ResponseParserFactory(spec);
			}

			var create = function (createSpec) {
					return new spec.ResponseParser({
						urlParser: spec.urlParser,
						linkFinderFactory: spec.linkFinderFactory,
						url: createSpec.url,
						response: createSpec.response
					});
				};

			this.create = create;
		};
	return ResponseParserFactory;
}());