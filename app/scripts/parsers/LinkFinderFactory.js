/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("parsers");

HATEOAS_CONSOLE.parsers.LinkFinderFactory = (function () {
	"use strict";

	var instance,

		LinkFinderFactory = function LinkFinderFactory(spec) {
			if (!this instanceof LinkFinderFactory) {
				return new LinkFinderFactory(spec);
			}

			if (instance) {
				return instance;
			}

			var	create = function (contentType, createSpec) {
				var	mimeType = contentType.split(";").shift(),
					responseFormat = mimeType.split(/[\/\+]/).pop(),
					Ctor = spec.constructors[responseFormat];

				if (!Ctor) {
					throw {
						name: "Constructor Not Found",
						message: "No constructor exists for type " + contentType
					};
				}

				return new Ctor(createSpec);
			};

			this.create = create;

			instance = this;
		};

	return LinkFinderFactory;
}());
