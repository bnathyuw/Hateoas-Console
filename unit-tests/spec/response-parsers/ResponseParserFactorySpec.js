/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */

describe("ResponseParserFactory", function () {
	"use strict";	
	var responseParserFactory = HATEOAS_CONSOLE.responseParsers.responseParserFactory;
	
	it("should be a singleton", function () {
		var factory1 = responseParserFactory(),
			factory2 = responseParserFactory();
		
		expect(factory1 === factory2).toEqual(true);
	});
	
	it("should identify itself as ResponseParserFactory", function () {
		var factory = responseParserFactory();
		
		expect(factory.constructor.name).toEqual("ResponseParserFactory");
	});
	
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
		
		it("should return jsonpResponseParser for text/html", function () {
			var factory = responseParserFactory(),
				parser = factory.create("text/html");
			
			expect(parser.constructor.name).toEqual("XmlResponseParser");
		});
		
		it("should be able to cope with charset declarations in the content type", function () {
			var factory = responseParserFactory(),
				parser = factory.create("application/xml; charset=utf-8");
				
			expect(parser.constructor.name).toEqual("XmlResponseParser");
		});
		
		it("should throw an appropriate error if no constructor can be found", function () {
			var factory = responseParserFactory();
				
			expect(function () {
				factory.create("application/foo");
			}).toThrow({
				name: "Constructor Not Found",
				message: "No constructor exists for type application/foo"
			});
		});
	});
});
