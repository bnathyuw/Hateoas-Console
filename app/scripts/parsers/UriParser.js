/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("parsers");

HATEOAS_CONSOLE.parsers.UriParser = (function () {
	"use strict";

	var instance,

		UriParser = function UriParser(spec) {

			if (!this instanceof UriParser) {
				return new UriParser();
			}

			if (instance) {
				return instance;
			}

			var memo = {},

				urlRegex = /^([^:]*):([^#?]*)(?:\?([^#]*))?(?:#(.*))?$/,

				parse = function (url) {

					if (memo[url]) {
						return memo[url];
					}

					var match = urlRegex.exec(url),
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

					HppConstructor = spec.hppConstructors[parts.scheme];

					if (HppConstructor) {
						hpp = new HppConstructor();
						extraParts = hpp.parse(parts.hierarchicalPart);
						for (c in extraParts) {
							if (extraParts.hasOwnProperty(c)) {
								parts[c] = extraParts[c];
							}
						}
					}

					memo[url] = parts;

					return memo[url];
				};

			this.parse = parse;

			instance = this;
		};

	return UriParser;
}());
