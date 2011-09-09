/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

(function () {
	"use strict";

	var instance;

	HATEOAS_CONSOLE.responseParsers.responseParserFactory = function ResponseParserFactory() {
		
		if (instance !== undefined) {
			return instance;
		}

		var constructors = {
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
		
		instance = {
			create: create
		};
		
		instance.constructor = ResponseParserFactory;
	
		return instance;
	};
	
}());
