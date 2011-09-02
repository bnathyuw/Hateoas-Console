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
		
		it("should identify a URL in an href element", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><href>" + expectedLink + "</href></response>");
			
			expect(links[0]).toEqual(expectedLink);
		});
		
		it("should identify a URL in a src element", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><src>" + expectedLink + "</src></response>");
			
			expect(links[0]).toEqual(expectedLink);
		});
		
		it("should identify a URL in a link element", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><link>" + expectedLink + "</link></response>");
			
			expect(links[0]).toEqual(expectedLink);
		});
		
		it("should identify several URLs when they are present", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo href=\"" + expectedLink + "\" />" +
						"<bar src=\"" + expectedLink + "1\" />" +
						"<href>" + expectedLink + "2</href>" +
						"<src>" + expectedLink + "3</src></response>");
			
			expect(links.length).toEqual(4);
			expect(links[0]).toEqual(expectedLink);
			expect(links[1]).toEqual(expectedLink + "1");
			expect(links[2]).toEqual(expectedLink + "2");
			expect(links[3]).toEqual(expectedLink + "3");
		});
		
		it("should identify several URLs in correct order", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo href=\"" + expectedLink + "\" />" +
						"<href>" + expectedLink + "1</href>" +
						"<bar src=\"" + expectedLink + "2\" />" +
						"<src>" + expectedLink + "3</src></response>");
			
			expect(links.length).toEqual(4);
			expect(links[0]).toEqual(expectedLink);
			expect(links[1]).toEqual(expectedLink + "1");
			expect(links[2]).toEqual(expectedLink + "2");
			expect(links[3]).toEqual(expectedLink + "3");
		});
		
		it("should tolerate additional attributes in containing element", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><href rel=\"me\">" + expectedLink + "</href></response>");
				
			expect(links[0]).toEqual(expectedLink);
		});
		
	});
});