/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.responseParserFactory = function XmlParserFactory(spec, my) {
	"use strict";

	my = my || {};
	
	var that = {},
				
		constructors = {
			xml: HATEOAS_CONSOLE.responseParsers.xmlResponseParser,
			json: HATEOAS_CONSOLE.responseParsers.jsonResponseParser,
			"json-p": HATEOAS_CONSOLE.responseParsers.jsonpResponseParser,
			html: HATEOAS_CONSOLE.responseParsers.xmlResponseParser
		},

		create = function (responseType) {
			var	responseFormat = responseType.split(/[\/\+]/).pop(),
				ctor = constructors[responseFormat];
			return ctor();
		};
	
	that.create = create;
	
	that.constructor = XmlParserFactory;
	
	return that;
};
