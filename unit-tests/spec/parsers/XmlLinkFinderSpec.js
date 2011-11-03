/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */

describe("XmlResponseParser", function () {
	"use strict";
	var XmlLinkFinder = HATEOAS_CONSOLE.parsers.XmlLinkFinder;

	it("should identify itself as XmlLinkFinder", function () {
		var parser = new XmlLinkFinder();

		expect(parser.constructor.name).toEqual("XmlLinkFinder");
	});

	describe("getLinks", function () {

		it("should return an empty array if there are no links in the response", function () {
			var parser = new XmlLinkFinder(),
				links = parser.getLinks("<response></response>");

			expect(toString.call(links)).toEqual("[object Array]");
		});

		it("should identify a URI in an href attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><foo href=\"" + expectedLink + "\" /></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});

		it("should identify a URI in a src attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><foo src=\"" + expectedLink + "\" /></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});

		it("should identify a URI in a link attribute", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><foo link=\"" + expectedLink + "\" /></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});

		it("should identify a URI in an attribute ending in url", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><foo my-url=\"" + expectedLink + "\" /></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});

		it("should identify a URI in an attribute ending in uri", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><foo my-uri=\"" + expectedLink + "\" /></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});

		it("should identify a URI in an href element", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><href>" + expectedLink + "</href></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});

		it("should identify a URI in a src element", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><src>" + expectedLink + "</src></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});

		it("should identify a URI in a link element", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><link>" + expectedLink + "</link></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});

		it("should identify a URI in an element ending in url", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><my-url>" + expectedLink + "</my-url></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});


		it("should identify a URI in an element ending in uri", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><my-uri>" + expectedLink + "</my-uri></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});

		it("should identify several URIs when they are present", function () {
			var expectedLink = "http://localhost/bar",
				links = new XmlLinkFinder().
					getLinks("<response><foo href=\"" + expectedLink + "\" />" +
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
				links = new XmlLinkFinder().
					getLinks("<response><foo href=\"" + expectedLink + "\" />" +
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
				links = new XmlLinkFinder().
					getLinks("<response><href rel=\"me\">" + expectedLink + "</href></response>");

			expect(links[0].uri).toEqual(expectedLink);
		});

		it("should add rel attribute from tag with href attribute", function () {
			var expectedRel = "me",
				links = new XmlLinkFinder().
					getLinks("<response><foo rel=\"" + expectedRel + "\" href=\"http://localhost/bar\"/></response>");

			expect(links[0].rel).toContain(expectedRel);
		});

		it("should add rel attribute from href tag", function () {
			var expectedRel = "me",
				links = new XmlLinkFinder().
					getLinks("<response><href rel=\"" + expectedRel + "\">http://localhost/bar\"</href></response>");

			expect(links[0].rel).toContain(expectedRel);
		});

		it("should add several rel attribute values when appropriate", function () {
			var links = new XmlLinkFinder().
					getLinks("<response><foo rel=\"me you him\" href=\"http://localhost/bar\"/></response>");

			expect(links[0].rel).toContain("me");
			expect(links[0].rel).toContain("you");
			expect(links[0].rel).toContain("him");
		});

		it("should not duplicate rel attribute values", function () {
			var links = new XmlLinkFinder().
					getLinks("<response><foo rel=\"me\" href=\"http://localhost/bar\"/>" +
						"<foo rel=\"me\" href=\"http://localhost/bar\"/></response>");

			expect(links[0].rel).toContain("me");
			expect(links[0].rel.length).toEqual(1);
		});

		it("should add rev attribute from tag with href attribute", function () {
			var expectedRev = "me",
				links = new XmlLinkFinder().
					getLinks("<response><foo rev=\"" + expectedRev + "\" href=\"http://localhost/bar\"/></response>");

			expect(links[0].rev).toContain(expectedRev);
		});

		it("should add rev attribute from href tag", function () {
			var expectedRev = "me",
				links = new XmlLinkFinder().
					getLinks("<response><href rev=\"" + expectedRev + "\">http://localhost/bar\"</href></response>");

			expect(links[0].rev).toContain(expectedRev);
		});

		it("should add several rev attribute values when appropriate", function () {
			var links = new XmlLinkFinder().
					getLinks("<response><foo rev=\"me you him\" href=\"http://localhost/bar\"/></response>");

			expect(links[0].rev).toContain("me");
			expect(links[0].rev).toContain("you");
			expect(links[0].rev).toContain("him");
		});
	});
});
