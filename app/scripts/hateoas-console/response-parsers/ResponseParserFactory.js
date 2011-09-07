/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.responseParserFactory = function XmlParserFactory(spec, my) {
	"use strict";

	my = my || {};
	
	var that = {},
		
		xmlResponseParser = HATEOAS_CONSOLE.responseParsers.xmlResponseParser,
		jsonResponseParser = HATEOAS_CONSOLE.responseParsers.jsonResponseParser,
		
		create = function (responseType) {
			switch (responseType) {
			case "text/xml":
				return xmlResponseParser();
			case "application/json":
				return jsonResponseParser();
			}
			
		};
	
	that.create = create;
	
	that.constructor = XmlParserFactory;
	
	return that;
};