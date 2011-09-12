﻿/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

(function () {
	"use strict";

	var instance;

	HATEOAS_CONSOLE.responseParsers.linkFinderFactory = function LinkFinderFactory() {
		
		if (instance !== undefined) {
			return instance;
		}

		var constructors = {
				xml: HATEOAS_CONSOLE.responseParsers.xmlLinkFinder,
				json: HATEOAS_CONSOLE.responseParsers.jsonLinkFinder,
				"json-p": HATEOAS_CONSOLE.responseParsers.jsonpLinkFinder,
				html: HATEOAS_CONSOLE.responseParsers.xmlLinkFinder
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
		
		instance.constructor = LinkFinderFactory;
	
		return instance;
	};
	
}());
