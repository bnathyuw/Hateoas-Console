/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */
describe("XmlResponseParser", function () {
	"use strict";
	var xmlResponseParser = HATEOAS_CONSOLE.responseParsers.xmlResponseParser;
	
	describe("	getLinks", function () {
		
		it("should return an empty array if there are no links in the response", function () {
			var my = {},
				parser = xmlResponseParser({response: "<response></response>"}),
				links = parser.getLinks();
			
			expect(toString.call(links)).toEqual("[object Array]");
		});
		
		it("should identify a URI in an href attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><foo href=\"" + expectedLink + "\" /></response>"}).
					getLinks();
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify a URI in a src attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><foo src=\"" + expectedLink + "\" /></response>"}).
					getLinks();
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify a URI in a link attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><foo link=\"" + expectedLink + "\" /></response>"}).
					getLinks();
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify a URI in an href element", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><href>" + expectedLink + "</href></response>"}).
					getLinks();
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify a URI in a src element", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><src>" + expectedLink + "</src></response>"}).
					getLinks();
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify a URI in a link element", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><link>" + expectedLink + "</link></response>"}).
					getLinks();
			
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should identify several URIs when they are present", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><foo href=\"" + expectedLink + "\" />" +
						"<bar src=\"" + expectedLink + "1\" />" +
						"<href>" + expectedLink + "2</href>" +
						"<src>" + expectedLink + "3</src></response>"}).
					getLinks();
			
			expect(links.length).toEqual(4);
			expect(links[0].uri).toEqual(expectedLink);
			expect(links[1].uri).toEqual(expectedLink + "1");
			expect(links[2].uri).toEqual(expectedLink + "2");
			expect(links[3].uri).toEqual(expectedLink + "3");
		});
		
		it("should identify several URIs in correct order", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><foo href=\"" + expectedLink + "\" />" +
						"<href>" + expectedLink + "1</href>" +
						"<bar src=\"" + expectedLink + "2\" />" +
						"<src>" + expectedLink + "3</src></response>"}).
					getLinks();
			
			expect(links.length).toEqual(4);
			expect(links[0].uri).toEqual(expectedLink);
			expect(links[1].uri).toEqual(expectedLink + "1");
			expect(links[2].uri).toEqual(expectedLink + "2");
			expect(links[3].uri).toEqual(expectedLink + "3");
		});
		
		it("should tolerate additional attributes in containing element", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><href rel=\"me\">" + expectedLink + "</href></response>"}).
					getLinks();
				
			expect(links[0].uri).toEqual(expectedLink);
		});
		
		it("should report duplicate links once", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><foo href=\"" + expectedLink + "\" /><foo href=\"" + expectedLink + "\" /></response>"}).
					getLinks();
			
			expect(links.length).toEqual(1);
		});
		
		it("should report all locations of duplicate links", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><foo href=\"" + expectedLink + "\" /><foo href=\"" + expectedLink + "\" /></response>"}).
					getLinks();
			
			expect(links[0].locations.length).toEqual(2);
			expect(links[0].locations[0]).toEqual(10);
			expect(links[0].locations[1]).toEqual(45);
		});
		
		it("should report locations of duplicate links in correct order", function () {
			var expectedLink = "http://localhost/bar",
				links = xmlResponseParser({response: "<response><href>" + expectedLink + "</href><foo href=\"" + expectedLink + "\" /></response>"}).
					getLinks();
			
			expect(links[0].locations.length).toEqual(2);
			expect(links[0].locations[0]).toEqual(10);
			expect(links[0].locations[1]).toEqual(43);
		});
		
		it("should add rel attribute from tag with href attribute", function () {
			var expectedRel = "me",
				links = xmlResponseParser({response: "<response><foo rel=\"" + expectedRel + "\" href=\"http://localhost/bar\"/></response>"}).
					getLinks();
				
			expect(links[0].rel).toContain(expectedRel);
		});
		
		it("should add rel attribute from href tag", function () {
			var expectedRel = "me",
				links = xmlResponseParser({response: "<response><href rel=\"" + expectedRel + "\">http://localhost/bar\"</href></response>"}).
					getLinks();
				
			expect(links[0].rel).toContain(expectedRel);
		});
		
		it("should add several rel attribute values when appropriate", function () {
			var links = xmlResponseParser({response: "<response><foo rel=\"me you him\" href=\"http://localhost/bar\"/></response>"}).
					getLinks();
				
			expect(links[0].rel).toContain("me");
			expect(links[0].rel).toContain("you");
			expect(links[0].rel).toContain("him");
		});
		
		it("should add all rel attribute values when a link appears twice", function () {
			var links = xmlResponseParser({response: "<response><foo rel=\"me you him\" href=\"http://localhost/bar\"/>" + 
						"<foo rel=\"her it\" href=\"http://localhost/bar\"/></response>"}).
					getLinks();
				
			expect(links[0].rel).toContain("me");
			expect(links[0].rel).toContain("you");
			expect(links[0].rel).toContain("him");
			expect(links[0].rel).toContain("her");
			expect(links[0].rel).toContain("it");
		});
		
		it("should not duplicate rel attribute values", function () {
			var links = xmlResponseParser({response: "<response><foo rel=\"me\" href=\"http://localhost/bar\"/>" + 
						"<foo rel=\"me\" href=\"http://localhost/bar\"/></response>"}).
					getLinks();
				
			expect(links[0].rel).toContain("me");
			expect(links[0].rel.length).toEqual(1);
		});
		
		it("should not duplicate rel attribute values even from a single element", function () {
			var links = xmlResponseParser({response: "<response><foo rel=\"me me\" href=\"http://localhost/bar\"/></response>"}).
					getLinks();
				
			expect(links[0].rel).toContain("me");
			expect(links[0].rel.length).toEqual(1);
		});
		
		it("should add rev attribute from tag with href attribute", function () {
			var expectedRev = "me",
				links = xmlResponseParser({response: "<response><foo rev=\"" + expectedRev + "\" href=\"http://localhost/bar\"/></response>"}).
					getLinks();
				
			expect(links[0].rev).toContain(expectedRev);
		});
		
		it("should add rev attribute from href tag", function () {
			var expectedRev = "me",
				links = xmlResponseParser({response: "<response><href rev=\"" + expectedRev + "\">http://localhost/bar\"</href></response>"}).
					getLinks();
				
			expect(links[0].rev).toContain(expectedRev);
		});
		
		it("should add several rev attribute values when appropriate", function () {
			var links = xmlResponseParser({response: "<response><foo rev=\"me you him\" href=\"http://localhost/bar\"/></response>"}).
					getLinks();
				
			expect(links[0].rev).toContain("me");
			expect(links[0].rev).toContain("you");
			expect(links[0].rev).toContain("him");
		});
		
		it("should add all rev attribute values when a link appears twice", function () {
			var links = xmlResponseParser({response: "<response><foo rev=\"me you him\" href=\"http://localhost/bar\"/>" + 
						"<foo rev=\"her it\" href=\"http://localhost/bar\"/></response>"}).
					getLinks();
				
			expect(links[0].rev).toContain("me");
			expect(links[0].rev).toContain("you");
			expect(links[0].rev).toContain("him");
			expect(links[0].rev).toContain("her");
			expect(links[0].rev).toContain("it");
		});
		
		it("should not duplicate rev attribute values", function () {
			var links = xmlResponseParser({response: "<response><foo rev=\"me\" href=\"http://localhost/bar\"/>" + 
						"<foo rev=\"me\" href=\"http://localhost/bar\"/></response>"}).
					getLinks();
				
			expect(links[0].rev).toContain("me");
			expect(links[0].rev.length).toEqual(1);
		});
		
		it("should not duplicate rel attribute values even from a single element", function () {
			var links = xmlResponseParser({response: "<response><foo rel=\"me me\" href=\"http://localhost/bar\"/></response>"}).
					getLinks();
				
			expect(links[0].rel).toContain("me");
			expect(links[0].rel.length).toEqual(1);
		});
	});
});