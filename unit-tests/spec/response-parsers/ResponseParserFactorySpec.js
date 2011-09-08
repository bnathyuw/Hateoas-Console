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
		
		it("should return xmlResponseParser for application/xml", function () {
			var factory = responseParserFactory(),
				parser = factory.create("application/xml");
			
			expect(parser.constructor.name).toEqual("XmlResponseParser");
		});
		
		it("should return xmlResponseParser for application/something+xml", function () {
			var factory = responseParserFactory(),
				parser = factory.create("application/something+xml");
			
			expect(parser.constructor.name).toEqual("XmlResponseParser");
		});
		
		it("should return jsonResponseParser for application/json", function () {
			var factory = responseParserFactory(),
				parser = factory.create("application/json");
			
			expect(parser.constructor.name).toEqual("JsonResponseParser");
		});
		
		it("should return jsonpResponseParser for application/json-p", function () {
			var factory = responseParserFactory(),
				parser = factory.create("application/json-p");
			
			expect(parser.constructor.name).toEqual("JsonpResponseParser");
		});
	});
});
