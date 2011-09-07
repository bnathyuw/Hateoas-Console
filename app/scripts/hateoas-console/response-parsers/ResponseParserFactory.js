/*global HATEOAS_CONSOLE */
/*jslint regexp: true */

HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.responseParsers");

HATEOAS_CONSOLE.responseParsers.responseParserFactory = function XmlParserFactory(spec, my) {
	"use strict";

	my = my || {};
	
	var that = {},
		
		xmlResponseParser = HATEOAS_CONSOLE.responseParsers.xmlResponseParser,
		
		create = function () {
			return xmlResponseParser();
		};
	
	that.create = create;
	
	that.constructor = XmlParserFactory;
	
	return that;
};