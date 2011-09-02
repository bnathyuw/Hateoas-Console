/*global describe: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */
describe("XmlResponseParser", function () {
	"use strict";
	var parser;
	
	beforeEach(function () {
		parser = new HATEOAS_CONSOLE.RESPONSE_PARSERS.XmlResponseParser();
	});
	
	describe("getLinks", function () {
		
		it("should return an empty array if there are no links in the response", function () {
			var links = parser.getLinks("<response></response>");
			
			expect(Object.prototype.toString.call(links)).toEqual("[object Array]");
		});
		
		it("should identify a URL in an href attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo href=\"" + expectedLink + "\" /></response>");
			
			expect(links[0]).toEqual(expectedLink);
		});
		
		it("should identify a URL in a src attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo src=\"" + expectedLink + "\" /></response>");
			
			expect(links[0]).toEqual(expectedLink);
		});
		
		it("should identify a URL in a link attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo link=\"" + expectedLink + "\" /></response>");
			
			expect(links[0]).toEqual(expectedLink);
		});
		
	});
});