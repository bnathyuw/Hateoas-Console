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

	describe("setHeader", function () {
		var illegalHeaders = [
				"Accept-Charset",
				"Accept-Encoding",
				"Connection",
				"Content-Length",
				"Cookie",
				"Cookie2",
				"Content-Transfer-Encoding",
				"Date",
				"Expect",
				"Host",
				"Keep-Alive",
				"Referer",
				"TE",
				"Trailer",
				"Transfer-Encoding",
				"Upgrade",
				"User-Agent",
				"Via"
			];

		illegalHeaders.forEach(function (header) {
			it("should throw an exception if key is " + header, function () {
				expect(function () {
					restRequest.setHeader(header, "Value");
				}).toThrow({
					name: "Invalid Header",
					message: "You cannot set the value of " + header + "; this value is automatically set by the browser"
				});
			});
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