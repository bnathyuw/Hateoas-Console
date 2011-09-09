/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */

describe("UriParser", function () {
	"use strict";	
	var uriParser = HATEOAS_CONSOLE.uriParser;
	
	it("should be a singleton", function () {
		var parser1 = uriParser(),
			parser2 = uriParser();
		
		expect(parser1 === parser2).toEqual(true);
	});
	
	it("should identify itself as UriParser", function () {
		var parser = uriParser();
		
		expect(parser.constructor.name).toEqual("UriParser");
	});
	
	describe("parse", function () {
	
		var parser = uriParser();
		
		it("should return correct parts from full uri", function () {
			var parsedUri = parser.parse("http://localhost/foo?bar=1#lala");
			
			expect(parsedUri.scheme).toEqual("http");
			expect(parsedUri.hierarchicalPart).toEqual("//localhost/foo");
			expect(parsedUri.query).toEqual("bar=1");
			expect(parsedUri.fragment).toEqual("lala");
		});
		
		it("should return correct parts when there is no fragment", function () {
			var parsedUri = parser.parse("http://localhost/foo?bar=1");
				
			expect(parsedUri.scheme).toEqual("http");
			expect(parsedUri.hierarchicalPart).toEqual("//localhost/foo");
			expect(parsedUri.query).toEqual("bar=1");
			expect(parsedUri.fragment).toEqual(undefined);
		});
		
		it("should return correct parts when there is no query", function () {
			var parsedUri = parser.parse("http://localhost/foo#lala");
				
			expect(parsedUri.scheme).toEqual("http");
			expect(parsedUri.hierarchicalPart).toEqual("//localhost/foo");
			expect(parsedUri.query).toEqual(undefined);
			expect(parsedUri.fragment).toEqual("lala");
		});
		
		it("should be able to parse an unusual URI", function () {
			var parsedUri = parser.parse("spotify:track:7qJ9jaOyrc9s9xM1dg0L5l");
			
			expect(parsedUri.scheme).toEqual("spotify");
			expect(parsedUri.hierarchicalPart).toEqual("track:7qJ9jaOyrc9s9xM1dg0L5l");
			expect(parsedUri.query).toEqual(undefined);
			expect(parsedUri.fragment).toEqual(undefined);			
		});
		
		it("should return authority and path for http", function () {
			var parsedUri = parser.parse("http://that.place.com:80/foo/bar/goo");
			
			expect(parsedUri.authority).toEqual("that.place.com:80");
			expect(parsedUri.path).toEqual("foo/bar/goo");
		});
		
	});
});
