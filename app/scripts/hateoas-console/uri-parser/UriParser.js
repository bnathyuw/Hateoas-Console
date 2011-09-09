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
		
		var uriRegex = /^([^:]*):([^#?]*)(?:\?([^#]*))?(?:#(.*))?$/,
			hppConstructors = {
				http: HATEOAS_CONSOLE.uriParser.urlHierarchicalPartParser,
				https: HATEOAS_CONSOLE.uriParser.urlHierarchicalPartParser,
				ftp: HATEOAS_CONSOLE.uriParser.urlHierarchicalPartParser,
				ftps: HATEOAS_CONSOLE.uriParser.urlHierarchicalPartParser
			},
			parse = function (uri) {
				var match = uriRegex.exec(uri),
					parts,
					hpp,
					hppConstructor;
				
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
					hpp.parse(parts);
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
	
	HATEOAS_CONSOLE.uriParser.urlHierarchicalPartParser = function UrlHierarchicalPartParser() {
		if (instance) {
			return instance;
		}
		
		var hierarchicalPartRegex = /^\/\/(?:([^:]*):([^@]*)@)?(([^:]*)(?::([0-9]*))?)(?:\/(.*))?$/,
			parse = function (parts) {
				var match = hierarchicalPartRegex.exec(parts.hierarchicalPart);
				
				if (!match) {
					return;
				}
				
				parts.username = match[1];
				parts.password = match[2];
				parts.authority = match[3];
				parts.host = match[4];
				parts.port = +match[5];
				parts.path = match[6];
			};
		
		instance = {
			parse: parse
		};
		
		instance.constructor = UrlHierarchicalPartParser;
		
		return instance;
	};
}());
