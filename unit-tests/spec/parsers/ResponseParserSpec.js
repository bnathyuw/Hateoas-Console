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
		},
		body = "<!doctype html><html><head><title>Title</title></head><body><h1>Title</h1></body></html>",
		response = {
			get: function (key) {
				switch (key) {
				case "body":
					return body;
				}
			},
			getHeader: function (key) {
				switch (key.toLowerCase()) {
				case "content-type":
					return "text/html";
				}
			}
		},
		parser;

	beforeEach(function () {
		parser = new ResponseParser({
			url: "http://localhost/",
			linkFinderFactory: linkFinderFactory,
			urlParser: new UriParser(),
			response: response
		});
	});

	describe("toHttpString", function () {
		it("should include the response body", function () {
			var httpString = parser.toHttpString();

			expect(httpString).toContain(body);
		});
	});

	describe("getLinks", function () {

		it("should call linkFinder.getLinks with response body", function () {
			var spy = spyOn(linkFinder, "getLinks").andCallThrough();

			links = [];

			parser.getLinks();

			expect(spy).toHaveBeenCalledWith(body);
		});

		it("should return each link from getLinks", function () {
			var actualLinks;

			links = [
				{url: "a", location: 10},
				{url: "b", location: 20},
				{url: "c", location: 30}
			];

			actualLinks = parser.getLinks();

			expect(actualLinks.length).toEqual(3);

			expect(actualLinks[0].url).toEqual("a");
			expect(actualLinks[1].url).toEqual("b");
			expect(actualLinks[2].url).toEqual("c");
		});

		it("should return duplicate links just once", function () {
			var actualLinks;

			links = [
				{url: "a", location: 10},
				{url: "a", location: 20},
				{url: "a", location: 30}
			];

			actualLinks = parser.getLinks();

			expect(actualLinks.length).toEqual(1);

			expect(actualLinks[0].url).toEqual("a");

		});

		it("should return all locations for duplicate links", function () {
			var actualLinks;

			links = [
				{url: "a", location: 10},
				{url: "a", location: 20},
				{url: "a", location: 30}
			];

			actualLinks = parser.getLinks();

			expect(actualLinks.length).toEqual(1);

			expect(actualLinks[0].locations).toEqual([10, 20, 30]);
		});

		it("should return all rel values for duplicate links", function () {
			var actualLinks;

			links = [
				{url: "a", location: 10, rel: ["me"]},
				{url: "a", location: 20, rel: ["you"]},
				{url: "a", location: 30, rel: ["him"]}
			];

			actualLinks = parser.getLinks();

			expect(actualLinks.length).toEqual(1);

			expect(actualLinks[0].rel).toEqual(["me", "you", "him"]);
		});

		it("should should return only distinct rel values", function () {
			var actualLinks;

			links = [
				{url: "a", location: 10, rel: ["me"]},
				{url: "a", location: 20, rel: ["me"]},
				{url: "a", location: 30, rel: ["me"]}
			];

			actualLinks = parser.getLinks();

			expect(actualLinks.length).toEqual(1);

			expect(actualLinks[0].rel).toEqual(["me"]);
		});

		it("should return all rev values for duplicate links", function () {
			var actualLinks;

			links = [
				{url: "a", location: 10, rev: ["me"]},
				{url: "a", location: 20, rev: ["you"]},
				{url: "a", location: 30, rev: ["him"]}
			];

			actualLinks = parser.getLinks();

			expect(actualLinks.length).toEqual(1);

			expect(actualLinks[0].rev).toEqual(["me", "you", "him"]);
		});

		it("should should return only distinct rev values", function () {
			var actualLinks;

			links = [
				{url: "a", location: 10, rev: ["me"]},
				{url: "a", location: 20, rev: ["me"]},
				{url: "a", location: 30, rev: ["me"]}
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
				{url: "http://localhost/bar", location: 10},
				{url: "http://localhost/bar2", location: 20},
				{url: "https://localhost/bar3", location: 30},
				{url: "http://otherhost/bar", location: 40},
				{url: "http://localhost:90/bar", location: 10},
				{url: "/bar", location: 10},
				{url: "bar", location: 10}
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
