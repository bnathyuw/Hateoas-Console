/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.parsers");

(function () {
	"use strict";
	
	var instance;
	
	HATEOAS_CONSOLE.parsers.urlHierarchicalPartParser = function UrlHierarchicalPartParser() {
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
		
		instance = {
			parse: parse
		};
		
		instance.constructor = UrlHierarchicalPartParser;
		
		return instance;
	};
}());
