/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

(function () {
	"use strict";

	var instance,
		
		constructors = {
			xml: HATEOAS_CONSOLE.responseParsers.xmlLinkFinder,
			json: HATEOAS_CONSOLE.responseParsers.jsonLinkFinder,
			"json-p": HATEOAS_CONSOLE.responseParsers.jsonpLinkFinder,
			html: HATEOAS_CONSOLE.responseParsers.xmlLinkFinder
		},

		create = function (contentType, spec) {
			var	mimeType = contentType.split(";").shift(),
				responseFormat = mimeType.split(/[\/\+]/).pop(),
				ctor = constructors[responseFormat];
		
			if (!ctor) {
				throw { 
					name: "Constructor Not Found",
					message: "No constructor exists for type " + contentType
				};
			}
		
			return ctor(spec);
		};

	HATEOAS_CONSOLE.responseParsers.linkFinderFactory = function LinkFinderFactory() {
		
		if (instance) {
			return instance;
		}

		instance = {
			create: create
		};
		
		instance.constructor = LinkFinderFactory;
	
		return instance;
	};
	
}());
