/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

(function () {
	"use strict";

	var instance;

	HATEOAS_CONSOLE.parsers.UriParser = function UriParser() {

		if (instance) {
			return instance;
		}

		var memo = {},

			uriRegex = /^([^:]*):([^#?]*)(?:\?([^#]*))?(?:#(.*))?$/,

			hppConstructors = {
				http: HATEOAS_CONSOLE.parsers.UrlHierarchicalPartParser,
				https: HATEOAS_CONSOLE.parsers.UrlHierarchicalPartParser,
				ftp: HATEOAS_CONSOLE.parsers.UrlHierarchicalPartParser,
				ftps: HATEOAS_CONSOLE.parsers.UrlHierarchicalPartParser
			},

			parse = function (uri) {

				if (memo[uri]) {
					return memo[uri];
				}

				var match = uriRegex.exec(uri),
					parts,
					hpp,
					HppConstructor,
					extraParts,
					c;

				if (!match) {
					return;
				}

				parts = {
					scheme: match[1],
					hierarchicalPart: match[2],
					query: match[3],
					fragment: match[4]
				};

				HppConstructor = hppConstructors[parts.scheme];

				if (HppConstructor) {
					hpp = new HppConstructor();
					extraParts = hpp.parse(parts.hierarchicalPart);
					for (c in extraParts) {
						if (extraParts.hasOwnProperty(c)) {
							parts[c] = extraParts[c];
						}
					}
				}

				memo[uri] = parts;

				return memo[uri];
			};

		instance = {
			parse: parse
		};

		instance.constructor = UriParser;

		return instance;
	};

}());
