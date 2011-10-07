/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */

describe("LinkFinderFactory", function () {
	"use strict";	
	var linkFinderFactory = HATEOAS_CONSOLE.parsers.linkFinderFactory;
	
	it("should be a singleton", function () {
		var factory1 = linkFinderFactory(),
			factory2 = linkFinderFactory();
		
		expect(factory1 === factory2).toEqual(true);
	});
	
	it("should identify itself as LinkFinderFactory", function () {
		var factory = linkFinderFactory();
		
		expect(factory.constructor.name).toEqual("LinkFinderFactory");
	});
	
	describe("getParser", function () {
		it("should return xmlLinkFinder for text/xml", function () {
			var factory = linkFinderFactory(),
				parser = factory.create("text/xml");
			
			expect(parser.constructor.name).toEqual("XmlLinkFinder");
		});
		
		it("should return xmlLinkFinder for application/xml", function () {
			var factory = linkFinderFactory(),
				parser = factory.create("application/xml");
			
			expect(parser.constructor.name).toEqual("XmlLinkFinder");
		});
		
		it("should return xmlLinkFinder for application/something+xml", function () {
			var factory = linkFinderFactory(),
				parser = factory.create("application/something+xml");
			
			expect(parser.constructor.name).toEqual("XmlLinkFinder");
		});
		
		it("should return jsonLinkFinder for application/json", function () {
			var factory = linkFinderFactory(),
				parser = factory.create("application/json");
			
			expect(parser.constructor.name).toEqual("JsonLinkFinder");
		});
		
		it("should return jsonpLinkFinder for application/json-p", function () {
			var factory = linkFinderFactory(),
				parser = factory.create("application/json-p");
			
			expect(parser.constructor.name).toEqual("JsonpLinkFinder");
		});
		
		it("should return xmlLinkFinder for text/html", function () {
			var factory = linkFinderFactory(),
				parser = factory.create("text/html");
			
			expect(parser.constructor.name).toEqual("XmlLinkFinder");
		});
		
		it("should be able to cope with charset declarations in the content type", function () {
			var factory = linkFinderFactory(),
				parser = factory.create("application/xml; charset=utf-8");
				
			expect(parser.constructor.name).toEqual("XmlLinkFinder");
		});
		
		it("should throw an appropriate error if no constructor can be found", function () {
			var factory = linkFinderFactory();
				
			expect(function () {
				factory.create("application/foo");
			}).toThrow({
				name: "Constructor Not Found",
				message: "No constructor exists for type application/foo"
			});
		});
	});
});
