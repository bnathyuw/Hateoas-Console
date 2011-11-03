/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */

describe("JsonResponseParser", function () {
	"use strict";
	var JsonLinkFinder = HATEOAS_CONSOLE.parsers.JsonLinkFinder;

	it("should identify itself as JsonLinkFinder", function () {
		var parser = new JsonLinkFinder();
		expect(parser.constructor.name).toEqual("JsonLinkFinder");
	});

	describe("getLinks", function () {

		it("should return an empty array if there are no links in the response", function () {
			var response = {},
				parser = new JsonLinkFinder(),
				links = parser.getLinks(JSON.stringify(response));

			expect(toString.call(links)).toEqual("[object Array]");
		});

		it("should identify a URI from a key named href", function () {
			var response = {
					href: "http://localhost/bar"
				},
				parser = new JsonLinkFinder(),
				links = parser.getLinks(JSON.stringify(response));

			expect(links[0].url).toEqual(response.href);
		});


		it("should identify a URI from a key named link", function () {
			var response = {
					link: "http://localhost/bar"
				},
				parser = new JsonLinkFinder(),
				links = parser.getLinks(JSON.stringify(response));

			expect(links[0].url).toEqual(response.link);
		});

		it("should identify a URI from a key named src", function () {
			var response = {
					src: "http://localhost/bar"
				},
				parser = new JsonLinkFinder(),
				links = parser.getLinks(JSON.stringify(response));

			expect(links[0].url).toEqual(response.src);
		});

		it("should identify a URI from a key ending in url", function () {
			var response = {
					"my-url": "http://localhost/bar"
				},
				parser = new JsonLinkFinder(),
				links = parser.getLinks(JSON.stringify(response));

			expect(links[0].url).toEqual(response["my-url"]);
		});

		it("should identify a URI from a key ending in url", function () {
			var response = {
					"my-url": "http://localhost/bar"
				},
				parser = new JsonLinkFinder(),
				links = parser.getLinks(JSON.stringify(response));

			expect(links[0].url).toEqual(response["my-url"]);
		});


		it("should identify a deeply nested URI", function () {
			var response = {
					foo: {
						bar: {
							href: "http://localhost/bar"
						}
					}
				},
				parser = new JsonLinkFinder(),
				links = parser.getLinks(JSON.stringify(response));

			expect(links[0].url).toEqual(response.foo.bar.href);
		});

		it("should identify multiple URIs in the response", function () {
			var response = {
					foo: {
						href: "http://localhost/bar"
					},
					bar: {
						src: "http://localhost/bar1"
					}
				},
				parser = new JsonLinkFinder(),
				links = parser.getLinks(JSON.stringify(response));

			expect(links.length).toEqual(2);
			expect(links[0].url).toEqual(response.foo.href);
			expect(links[1].url).toEqual(response.bar.src);
		});

		it("should be able to identify links in arrays", function () {
			var response = {
					foo: [
						{
							href: "http://localhost/bar"
						},
						{
							href: "http://localhost/bar2"
						}
					]
				},
				parser = new JsonLinkFinder(),
				links = parser.getLinks(JSON.stringify(response));

			expect(links.length).toEqual(2);
			expect(links[0].url).toEqual(response.foo[0].href);
			expect(links[1].url).toEqual(response.foo[1].href);
		});

		it("should be able to identify an array of links", function () {
			var response = {
					hrefs: ["http://localhost/bar", "http://localhost/bar2"]
				},
				parser = new JsonLinkFinder(),
				links = parser.getLinks(JSON.stringify(response));

			expect(links.length).toEqual(2);
			expect(links[0].url).toEqual(response.hrefs[0]);
			expect(links[1].url).toEqual(response.hrefs[1]);
		});
	});
});
