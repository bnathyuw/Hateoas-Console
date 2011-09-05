/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */
describe("XmlResponseParser", function () {
	"use strict";
	var parser,
		XmlResponseParser = HATEOAS_CONSOLE.responseParsers.XmlResponseParser;
	
	
	beforeEach(function () {
		parser = new XmlResponseParser();
	});
	
	describe("getLinks", function () {
		
		it("should return an empty array if there are no links in the response", function () {
			var links = parser.getLinks("<response></response>");
			
			expect(toString.call(links)).toEqual("[object Array]");
		});
		
		it("should identify a URI in an href attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo href=\"" + expectedLink + "\" /></response>");
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify a URI in a src attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo src=\"" + expectedLink + "\" /></response>");
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify a URI in a link attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo link=\"" + expectedLink + "\" /></response>");
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify a URI in an href element", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><href>" + expectedLink + "</href></response>");
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify a URI in a src element", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><src>" + expectedLink + "</src></response>");
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify a URI in a link element", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><link>" + expectedLink + "</link></response>");
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify several URIs when they are present", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo href=\"" + expectedLink + "\" />" +
						"<bar src=\"" + expectedLink + "1\" />" +
						"<href>" + expectedLink + "2</href>" +
						"<src>" + expectedLink + "3</src></response>");
			
			expect(links.length).toEqual(4);
			expect(links[0].uri).toEqual(expectedLink);
			expect(links[1].uri).toEqual(expectedLink + "1");
			expect(links[2].uri).toEqual(expectedLink + "2");
			expect(links[3].uri).toEqual(expectedLink + "3");
		});
		
		it("should identify several URIs in correct order", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo href=\"" + expectedLink + "\" />" +
						"<href>" + expectedLink + "1</href>" +
						"<bar src=\"" + expectedLink + "2\" />" +
						"<src>" + expectedLink + "3</src></response>");
			
			expect(links.length).toEqual(4);
			expect(links[0].uri).toEqual(expectedLink);
			expect(links[1].uri).toEqual(expectedLink + "1");
			expect(links[2].uri).toEqual(expectedLink + "2");
			expect(links[3].uri).toEqual(expectedLink + "3");
		});
		
		it("should tolerate additional attributes in containing element", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><href rel=\"me\">" + expectedLink + "</href></response>");
				
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should report duplicate links once", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo href=\"" + expectedLink + "\" /><foo href=\"" + expectedLink + "\" /></response>");
			
			expect(links.length).toEqual(1);
		});
		
		it("should report all locations of duplicate links", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><foo href=\"" + expectedLink + "\" /><foo href=\"" + expectedLink + "\" /></response>");
			
			expect(links[0].locations.length).toEqual(2);
			expect(links[0].locations[0]).toEqual(10);
			expect(links[0].locations[1]).toEqual(45);
		});
		
		it("should report locations of duplicate links in correct order", function () {
			var expectedLink = "http://localhost/bar",
				links = parser.getLinks("<response><href>" + expectedLink + "</href><foo href=\"" + expectedLink + "\" /></response>");
			
			expect(links[0].locations.length).toEqual(2);
			expect(links[0].locations[0]).toEqual(10);
			expect(links[0].locations[1]).toEqual(43);
		});
		
	});
});