/*global describe: false, it: false, beforeEach: false, HATEOAS_CONSOLE: false, expect: false */
describe("RestRequest", function () {
	"use strict";

	var RestRequest = HATEOAS_CONSOLE.models.RestRequest,
		restRequest;

	describe("with default constructor", function () {
		beforeEach(function () {
			restRequest = new RestRequest();
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
			restRequest = new RestRequest(params);
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

		beforeEach(function () {
			restRequest = new RestRequest();
		});

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

		it("should reject illegal headers regardless of case", function () {
			expect(function () {
				restRequest.setHeader("uSER-agenT", "Value");
			}).toThrow({
				name: "Invalid Header",
				message: "You cannot set the value of uSER-agenT; this value is automatically set by the browser"
			});
		});

		it("should throw an exception if key starts with 'Proxy-'", function () {
			expect(function () {
				restRequest.setHeader("Proxy-abc", "Value");
			}).toThrow({
				name: "Invalid Header",
				message: "You cannot set the value of Proxy-abc; header names starting with Proxy- are reserved"
			});
		});

		it("should throw an exception if key starts with 'Sec-'", function () {
			expect(function () {
				restRequest.setHeader("Sec-abc", "Value");
			}).toThrow({
				name: "Invalid Header",
				message: "You cannot set the value of Sec-abc; header names starting with Sec- are reserved"
			});
		});

		it("should reject illegal header prefixes regardless of case", function () {
			expect(function () {
				restRequest.setHeader("proXY-abc", "Value");
			}).toThrow({
				name: "Invalid Header",
				message: "You cannot set the value of proXY-abc; header names starting with Proxy- are reserved"
			});
		});
	});

	describe("getAllHeaders", function () {

		beforeEach(function () {
			restRequest = new RestRequest();
		});

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