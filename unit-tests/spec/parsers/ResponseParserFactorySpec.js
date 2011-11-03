/*global describe: false, beforeEach: false, HATEOAS_CONSOLE: false, it: false, expect: false, spyOn: false */

describe("ResponseParserFactory", function () {
	"use strict";

	var responseParserFactory,
		linkFinderFactory,
		urlParser,
		response,
		url,
		responseParser,
		spec;

	beforeEach(function () {
		linkFinderFactory = {
			create: function () {}
		};
		urlParser = {
			parse: function () {}
		};
		response = {
			get: function () {},
			getHeader: function () {}
		};
		url = "http://abc.com/";
		responseParser = {};
		spec = {
			urlParser: urlParser,
			linkFinderFactory: linkFinderFactory,
			ResponseParser: function () {
				return responseParser;
			}
		};
		responseParserFactory = new HATEOAS_CONSOLE.parsers.ResponseParserFactory(spec);
	});

	describe("create", function () {
		it("should create a new ResponseParser", function () {
			var spy = spyOn(spec, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				url: url,
				response: response
			});
			expect(spy).toHaveBeenCalled();
		});

		it("should pass in its own urlParser", function () {
			var spy = spyOn(spec, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				url: url,
				response: response
			});
			expect(spy.mostRecentCall.args[0].urlParser).
				toEqual(urlParser);
		});

		it("should pass in its own linkFinderFactory", function () {
			var spy = spyOn(spec, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				url: url,
				response: response
			});
			expect(spy.mostRecentCall.args[0].linkFinderFactory).
				toEqual(linkFinderFactory);
		});

		it("should pass in the response", function () {
			var spy = spyOn(spec, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				url: url,
				response: response
			});
			expect(spy.mostRecentCall.args[0].response).
				toEqual(response);
		});

		it("should pass in the url", function () {
			var spy = spyOn(spec, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				url: url,
				response: response
			});
			expect(spy.mostRecentCall.args[0].url).
				toEqual(url);
		});
	});
});