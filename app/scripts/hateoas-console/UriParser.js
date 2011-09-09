/*global HATEOAS_CONSOLE */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE");

(function () {
	"use strict";

	var instance;

	HATEOAS_CONSOLE.uriParser = function UriParser() {
		
		if (instance !== undefined) {
			return instance;
		}
		
		var uriRegex = /^([^:]*):([^#?]*)(?:\?([^#]*))?(?:#(.*))?$/,
			hierarchicalPartParserConstructors = {
				http: HATEOAS_CONSOLE.httpHierarchicalPartParser
			},
			parse = function (uri) {
				var match = uriRegex.exec(uri),
					parts,
					hierarchicalPartParser,
					hierarchicalPartParserConstructor;
				
				if (match === undefined) {
					return;
				}
				
				parts = {
					scheme: match[1],
					hierarchicalPart: match[2],
					query: match[3],
					fragment: match[4]
				};
				
				hierarchicalPartParserConstructor = hierarchicalPartParserConstructors[parts.scheme];
				
				if (hierarchicalPartParserConstructor !== undefined) {
					hierarchicalPartParser = hierarchicalPartParserConstructor();
					hierarchicalPartParser.parse(parts);
				}
					
				return parts;
			};
	
		instance = {
			parse: parse
		};
		
		instance.constructor = UriParser;
	
		return instance;
	};
	
}());

(function () {
	"use strict";
	
	var instance;
	
	HATEOAS_CONSOLE.httpHierarchicalPartParser = function HttpHierarchicalPartParser() {
		if (instance !== undefined) {
			return instance;
		}
		
		var hierarchicalPartRegex = /^\/\/(.*)\/(.*)$/,
			parse = function (parts) {
				var match = hierarchicalPartRegex.exec(parts.hierarchicalPart);
				
				if (match === undefined) {
					return;
				}
				
				parts.authority = match[1];
				parts.path = match[2];
			};
		
		instance = {
			parse: parse
		};
		
		instance.constructor = HttpHierarchicalPartParser;
		
		return instance;
	};
}());
