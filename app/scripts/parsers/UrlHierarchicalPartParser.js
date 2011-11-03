/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

HATEOAS_CONSOLE.parsers.UrlHierarchicalPartParser = (function () {
	"use strict";

	var instance,

		UriHierarchicalPartParser = function UrlHierarchicalPartParser() {

			if (!this instanceof UriHierarchicalPartParser) {
				return new UriHierarchicalPartParser();
			}

			if (instance) {
				return instance;
			}

			var hierarchicalPartRegex = /^\/\/(?:([^:]*):([^@]*)@)?(([^\/:]*)(?::([0-9]*))?)(?:\/(.*))?$/,
				parse = function (hierarchicalPart) {
					var match = hierarchicalPartRegex.exec(hierarchicalPart),
						parts;

					if (!match) {
						return;
					}

					parts = {
						username: match[1],
						password: match[2],
						authority: match[3],
						host: match[4],
						port: +match[5],
						path: match[6]
					};

					return parts;
				};

			this.parse = parse;

			instance = this;
		};

	return UriHierarchicalPartParser;
}());
