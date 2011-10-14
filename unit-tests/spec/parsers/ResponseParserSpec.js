/*global describe: false, HATEOAS_CONSOLE: false, it: false, expect: false, beforeEach: false, spyOn: false */

describe("ResponseParser", function () {
	"use strict";
	var ResponseParser = HATEOAS_CONSOLE.parsers.ResponseParser,
		UriParser = HATEOAS_CONSOLE.parsers.UriParser,
		links,
		linkFinder = {
			getLinks: function () {
				return links;
			}
		},
		linkFinderFactory = {
			create: function () {
				return linkFinder;
			}
		};
		
	describe("constructor", function () {
		it("should throw an exception if no spec is passed in", function () {
			expect(function () {
				var parser = new ResponseParser();
			}).toThrow({
				name: "Missing Parameter",
				message: "Required parameter spec is missing"
			});
		});
		
		it("should throw an exception if no linkFinderFactory is passed in", function () {
			expect(function () {
				var parser = new ResponseParser({
						uri: "http://localhost/",
						uriParser: new UriParser()
					});
			}).toThrow({
				name: "Invalid Parameter",
				message: "Parameter spec is missing a required member: linkFinderFactory"
			});
		});
		
		it("should throw an exception if no uriParser is passed in", function () {
			expect(function () {
				var parser = new ResponseParser({
						uri: "http://localhost/",
						linkFinderFactory: linkFinderFactory
					});
			}).toThrow({
				name: "Invalid Parameter",
				message: "Parameter spec is missing a required member: uriParser"
			});
		});
		
		it("should throw an exception if no uri is passed in", function () {
			expect(function () {
				var parser = new ResponseParser({
						uriParser: new UriParser(),
						linkFinderFactory: linkFinderFactory
					});
			}).toThrow({
				name: "Invalid Parameter",
				message: "Parameter spec is missing a required member: uri"
			});
		});
	});
	
	describe("getLinks", function () {
		
		var parser;
		
		beforeEach(function () {
			parser = new ResponseParser({
				uri: "http://localhost/",
				linkFinderFactory: linkFinderFactory,
				uriParser: new UriParser()
			});
		});
	
		it("should return each link from getLinks", function () {
			var actualLinks;
			
			links = [
				{uri: "a", location: 10},
				{uri: "b", location: 20},
				{uri: "c", location: 30}
			];
		
			actualLinks = parser.getLinks();
			
			expect(actualLinks.length).toEqual(3);
			
			expect(actualLinks[0].uri).toEqual("a");
			expect(actualLinks[1].uri).toEqual("b");
			expect(actualLinks[2].uri).toEqual("c");
		});
		
		it("should return duplicate links just once", function () {
			var actualLinks;
			
			links = [
				{uri: "a", location: 10},
				{uri: "a", location: 20},
				{uri: "a", location: 30}
			];
			
			actualLinks = parser.getLinks();
		
			expect(actualLinks.length).toEqual(1);
			
			expect(actualLinks[0].uri).toEqual("a");

		});
		
		it("should return all locations for duplicate links", function () {
			var actualLinks;
			
			links = [
				{uri: "a", location: 10},
				{uri: "a", location: 20},
				{uri: "a", location: 30}
			];
			
			actualLinks = parser.getLinks();
			
			expect(actualLinks.length).toEqual(1);
			
			expect(actualLinks[0].locations).toEqual([10, 20, 30]);
		});
		
		it("should return all rel values for duplicate links", function () {
			var actualLinks;
			
			links = [
				{uri: "a", location: 10, rel: ["me"]},
				{uri: "a", location: 20, rel: ["you"]},
				{uri: "a", location: 30, rel: ["him"]}
			];
			
			actualLinks = parser.getLinks();
			
			expect(actualLinks.length).toEqual(1);
			
			expect(actualLinks[0].rel).toEqual(["me", "you", "him"]);
		});
		
		it("should should return only distinct rel values", function () {
			var actualLinks;
			
			links = [
				{uri: "a", location: 10, rel: ["me"]},
				{uri: "a", location: 20, rel: ["me"]},
				{uri: "a", location: 30, rel: ["me"]}
			];
			
			actualLinks = parser.getLinks();
			
			expect(actualLinks.length).toEqual(1);
			
			expect(actualLinks[0].rel).toEqual(["me"]);
		});
		
		it("should return all rev values for duplicate links", function () {
			var actualLinks;
			
			links = [
				{uri: "a", location: 10, rev: ["me"]},
				{uri: "a", location: 20, rev: ["you"]},
				{uri: "a", location: 30, rev: ["him"]}
			];
			
			actualLinks = parser.getLinks();
			
			expect(actualLinks.length).toEqual(1);
			
			expect(actualLinks[0].rev).toEqual(["me", "you", "him"]);
		});
		
		it("should should return only distinct rev values", function () {
			var actualLinks;
			
			links = [
				{uri: "a", location: 10, rev: ["me"]},
				{uri: "a", location: 20, rev: ["me"]},
				{uri: "a", location: 30, rev: ["me"]}
			];
			
			actualLinks = parser.getLinks();
			
			expect(actualLinks.length).toEqual(1);
			
			expect(actualLinks[0].rev).toEqual(["me"]);
		});
		
		it("should call getLinks only once", function () {
			var callCount = 0;
		
			spyOn(linkFinder, "getLinks").
				andCallFake(function () {
					callCount = callCount + 1;
					return links;
				});
			
			parser.getLinks();
			parser.getLinks();
			
			expect(callCount).toEqual(1);
		});
		
		it("should mark links as same origin if and only if they have the same scheme and authority", function () {
			var actualLinks;
			links = [
				{uri: "http://localhost/bar", location: 10},
				{uri: "http://localhost/bar2", location: 20},
				{uri: "https://localhost/bar3", location: 30},
				{uri: "http://otherhost/bar", location: 40},
				{uri: "http://localhost:90/bar", location: 10},
				{uri: "/bar", location: 10},
				{uri: "bar", location: 10}
			];

			actualLinks = parser.getLinks();
			
			expect(actualLinks[0].hasSameOrigin).toEqual(true);
			expect(actualLinks[1].hasSameOrigin).toEqual(true);
			expect(actualLinks[2].hasSameOrigin).toEqual(false);
			expect(actualLinks[3].hasSameOrigin).toEqual(false);
			expect(actualLinks[4].hasSameOrigin).toEqual(false);
			expect(actualLinks[5].hasSameOrigin).toEqual(false);
			expect(actualLinks[6].hasSameOrigin).toEqual(false);
		});
	});
});
