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

		create = function (contentType, spec) {
			var	mimeType = contentType.split(";").shift(),
				responseFormat = mimeType.split(/[\/\+]/).pop(),
				ctor = constructors[responseFormat];
			
			if (ctor === undefined) {
				throw { 
					name: "Constructor Not Found",
					message: "No constructor exists for type " + contentType
				};
			}
			
			return ctor(spec);
		};
	
	that.create = create;
	
	that.constructor = XmlParserFactory;
	
	return that;
};
