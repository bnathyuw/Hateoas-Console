/*global describe: false, HATEOAS_CONSOLE: false, it: false, expect: false */

describe("ResponseParserBase", function () {
	"use strict";
	var responseParserBase = HATEOAS_CONSOLE.responseParsers.responseParserBase;
	
	describe("getLinks", function () {
		it("should return value from getLinksFromResponse", function () {
			var expectedLinks = ["a", "b", "c"],
				getLinksFromResponse = function (response) {
					return expectedLinks;
				},
				responseParser = responseParserBase({}, {getLinksFromResponse: getLinksFromResponse}),
				actualLinks = responseParser.getLinks();
			
			expect(actualLinks).toEqual(expectedLinks);
		});
		
		it("should call getLinksFromResponse only once", function () {
			var callCount = 0,
				getLinksFromResponse = function (response) {
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