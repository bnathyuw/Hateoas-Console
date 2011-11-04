/*global describe: false, it: false, beforeEach: false, HATEOAS_CONSOLE: false, expect: false */
describe("RestRequest", function () {
	"use strict";

	var restRequest;

	describe("with default constructor", function () {
		beforeEach(function () {
			restRequest = new HATEOAS_CONSOLE.models.RestRequest();
		});

		it("should start with 'verb' equal to 'GET'", function () {
			expect(restRequest.get("verb")).toEqual("GET");
		});

		it("should start with 'url' equal to 'http://hateoas-console.local/'", function () {
			expect(restRequest.get("url")).toEqual("http://hateoas-console.local/");
		});
	});

	describe("with custom constructor", function () {
		var params = {
			verb: "POST",
			url: "http://www.google.com/"
		};

		beforeEach(function () {
			restRequest = new HATEOAS_CONSOLE.models.RestRequest(params);
		});

		it("should start with custom value of 'verb'", function () {
			expect(restRequest.get("verb")).toEqual(params.verb);
		});

		it("should start with custom value of 'url'", function () {
			expect(restRequest.get("url")).toEqual(params.url);
		});
	});

	describe("getAllHeaders", function () {
		it("should return nothing when no headers have been set", function () {
			expect(restRequest.getAllHeaders()).toEqual({});
		});

		it("should return a header if one has been set", function () {
			restRequest.setHeader("Super-Foo", "Bar");
			expect(restRequest.getAllHeaders()).toEqual({
				"Super-Foo": "Bar"
			});
		});
	});
});