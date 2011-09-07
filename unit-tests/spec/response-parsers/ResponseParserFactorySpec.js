/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */

describe("ResponseParserFactory", function () {
	"use strict";	
	var responseParserFactory = HATEOAS_CONSOLE.responseParsers.responseParserFactory;
	
	describe("getParser", function () {
		it("should return xmlResponseParser for text/xml", function () {
			var factory = responseParserFactory(),
				parser = factory.create("text/xml");
			
			expect(parser.constructor.name).toEqual("XmlResponseParser");
		});
		
		it("should return jsonResponParser for application/json", function () {
			var factory = responseParserFactory(),
				parser = factory.create("application/json");
			
			expect(parser.constructor.name).toEqual("JsonResponseParser");
		});
	});
});