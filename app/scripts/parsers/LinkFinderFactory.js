/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

HATEOAS_CONSOLE.parsers.LinkFinderFactory = (function () {
	"use strict";

	var instance,

		constructors = {
			xml: HATEOAS_CONSOLE.parsers.XmlLinkFinder,
			json: HATEOAS_CONSOLE.parsers.JsonLinkFinder,
			"json-p": HATEOAS_CONSOLE.parsers.JsonpLinkFinder,
			html: HATEOAS_CONSOLE.parsers.XmlLinkFinder
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

	return function LinkFinderFactory() {

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
