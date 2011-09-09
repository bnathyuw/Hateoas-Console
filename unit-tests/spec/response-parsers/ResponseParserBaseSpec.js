/*global describe: false, HATEOAS_CONSOLE: false, it: false, expect: false */

describe("ResponseParserBase", function () {
	"use strict";
	var responseParserBase = HATEOAS_CONSOLE.responseParsers.responseParserBase;
	
	it("should identify itself as ResponseParserBase", function () {
		var parser = responseParserBase();
		
		expect(parser.constructor.name).toEqual("ResponseParserBase");
	});
	
	describe("getLinks", function () {
		it("should return links from getLinksFromResponse", function () {
			var linksReturned = [
					{uri: "a", location: 10},
					{uri: "b", location: 20},
					{uri: "a", location: 30}
				],
				expectedLinks = [
					{uri: 'a', locations: [10, 30], rel: [], rev: []},
					{uri: 'b', locations: [20], rel: [], rev: []}
				],
				getLinksFromResponse = function () {
					return linksReturned;
				},
				responseParser = responseParserBase({}, {getLinksFromResponse: getLinksFromResponse}),
				actualLinks = responseParser.getLinks();
			
			expect(actualLinks.length).toEqual(2);
			
			expect(actualLinks[0].uri).toEqual("a");
			expect(actualLinks[1].uri).toEqual("b");
			
			expect(actualLinks[0].locations).toEqual([10, 30]);
			expect(actualLinks[1].locations).toEqual([20]);

		});
		
		it("should call getLinksFromResponse only once", function () {
			var callCount = 0,
				getLinksFromResponse = function () {
					callCount += 1;
					return [];
				},
				responseParser = responseParserBase({}, {getLinksFromResponse: getLinksFromResponse});
			
			responseParser.getLinks();
			responseParser.getLinks();
			
			expect(callCount).toEqual(1);
		});
		
		it("should mark links as same origin if and only if they have the same scheme and authority", function () {
			var linksReturned = [
					{uri: "http://localhost/bar", location: 10},
					{uri: "http://localhost/bar2", location: 20},
					{uri: "https://localhost/bar3", location: 30},
					{uri: "http://otherhost/bar", location: 40},
					{uri: "http://localhost:90/bar", location: 10},
					{uri: "/bar", location: 10},
					{uri: "bar", location: 10}
				],
				getLinksFromResponse = function () {
				return linksReturned;
				},
				responseParser = responseParserBase({uri: "http://localhost/"}, {getLinksFromResponse: getLinksFromResponse}),
				actualLinks = responseParser.getLinks();
			
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
