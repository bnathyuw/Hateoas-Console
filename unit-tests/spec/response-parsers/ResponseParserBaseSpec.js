/*global describe: false, HATEOAS_CONSOLE: false, it: false, expect: false */

describe("ResponseParserBase", function () {
	"use strict";
	var responseParserBase = HATEOAS_CONSOLE.responseParsers.responseParserBase;
	
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
			
			expect(actualLinks).toEqual(expectedLinks);
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
	});
});
