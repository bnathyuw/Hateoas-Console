/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.uriParser");

(function () {
	"use strict";

	var instance;

	HATEOAS_CONSOLE.uriParser.uriParser = function UriParser() {
		
		if (instance) {
			return instance;
		}
		
		var memo = {},
			
			uriRegex = /^([^:]*):([^#?]*)(?:\?([^#]*))?(?:#(.*))?$/,
			
			hppConstructors = {
				http: HATEOAS_CONSOLE.uriParser.urlHierarchicalPartParser,
				https: HATEOAS_CONSOLE.uriParser.urlHierarchicalPartParser,
				ftp: HATEOAS_CONSOLE.uriParser.urlHierarchicalPartParser,
				ftps: HATEOAS_CONSOLE.uriParser.urlHierarchicalPartParser
			},
			
			parse = function (uri) {
				
				if (memo[uri]) {
					return memo[uri];
				}
				
				var match = uriRegex.exec(uri),
					parts,
					hpp,
					hppConstructor,
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
				
				hppConstructor = hppConstructors[parts.scheme];
				
				if (hppConstructor) {
					hpp = hppConstructor();
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
