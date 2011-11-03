/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("parsers");

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
				Ctor = constructors[responseFormat];

			if (!Ctor) {
				throw {
					name: "Constructor Not Found",
					message: "No constructor exists for type " + contentType
				};
			}

			return new Ctor(spec);
		},

		LinkFinderFactory = function LinkFinderFactory() {

			if (!this instanceof LinkFinderFactory) {
				return new LinkFinderFactory();
			}

			if (instance) {
				return instance;
			}

			this.create = create;

			instance = this;
		};

	return LinkFinderFactory;
}());
