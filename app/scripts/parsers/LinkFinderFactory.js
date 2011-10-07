/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

(function () {
	"use strict";

	var instance,
		
		constructors = {
			xml: HATEOAS_CONSOLE.parsers.xmlLinkFinder,
			json: HATEOAS_CONSOLE.parsers.jsonLinkFinder,
			"json-p": HATEOAS_CONSOLE.parsers.jsonpLinkFinder,
			html: HATEOAS_CONSOLE.parsers.xmlLinkFinder
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

	HATEOAS_CONSOLE.parsers.linkFinderFactory = function LinkFinderFactory() {
		
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
