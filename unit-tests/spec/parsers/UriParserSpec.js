/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */

describe("UriParser", function () {
	"use strict";	
	var UriParser = HATEOAS_CONSOLE.parsers.UriParser;
	
	it("should be a singleton", function () {
		var parser1 = new UriParser(),
			parser2 = new UriParser();
		
		expect(parser1 === parser2).toEqual(true);
	});
	
	it("should identify itself as UriParser", function () {
		var parser = new UriParser();
		
		expect(parser.constructor.name).toEqual("UriParser");
	});
	
	describe("parse", function () {
	
		var parser = new UriParser();
		
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
		
		it("should return correct hierarchical subparts for http", function () {
			var parsedUri = parser.parse("http://that.place.com:80/foo/bar/goo");
			
			expect(parsedUri.authority).toEqual("that.place.com:80");
			expect(parsedUri.path).toEqual("foo/bar/goo");
			expect(parsedUri.host).toEqual("that.place.com");
			expect(parsedUri.port).toEqual(80);
		});
		
		it("should return correct hierarchical subparts for a simple http url", function () {
			var parsedUri = parser.parse("https://localhost/foo");
			
			expect(parsedUri.authority).toEqual("localhost");
			expect(parsedUri.path).toEqual("foo");
			expect(parsedUri.host).toEqual("localhost");
			expect(parsedUri.port.toString()).toEqual(NaN.toString());
		});
		
		it("should return correct hierarchical subparts for https", function () {
			var parsedUri = parser.parse("https://that.place.com:80/foo/bar/goo");
			
			expect(parsedUri.authority).toEqual("that.place.com:80");
			expect(parsedUri.path).toEqual("foo/bar/goo");
			expect(parsedUri.host).toEqual("that.place.com");
			expect(parsedUri.port).toEqual(80);
		});
		
		it("should return correct hierarchical subparts for ftp", function () {
			var parsedUri = parser.parse("ftp://that.place.com:80/foo/bar/goo");
			
			expect(parsedUri.authority).toEqual("that.place.com:80");
			expect(parsedUri.path).toEqual("foo/bar/goo");
			expect(parsedUri.host).toEqual("that.place.com");
			expect(parsedUri.port).toEqual(80);
		});
		
		it("should return correct hierarchical subparts for ftps", function () {
			var parsedUri = parser.parse("ftps://that.place.com:80/foo/bar/goo");
			
			expect(parsedUri.authority).toEqual("that.place.com:80");
			expect(parsedUri.path).toEqual("foo/bar/goo");
			expect(parsedUri.host).toEqual("that.place.com");
			expect(parsedUri.port).toEqual(80);
		});
		
		it("should return correct hierarchical subparts when a user is specified", function () {
			var parsedUri = parser.parse("ftps://username:password@that.place.com:80/foo/bar/goo");
			
			expect(parsedUri.username).toEqual("username");
			expect(parsedUri.password).toEqual("password");
			expect(parsedUri.authority).toEqual("that.place.com:80");
			expect(parsedUri.path).toEqual("foo/bar/goo");
			expect(parsedUri.host).toEqual("that.place.com");
			expect(parsedUri.port).toEqual(80);
		});
	});
});
