/*global describe: false, beforeEach: false, HATEOAS_CONSOLE: false, it: false, expect: false, spyOn: false */

describe("ResponseParserFactory", function () {
	"use strict";

	var responseParserFactory,
		linkFinderFactory,
		urlParser,
		response,
		url;

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
		responseParserFactory = new HATEOAS_CONSOLE.parsers.ResponseParserFactory({
			urlParser: urlParser,
			linkFinderFactory: linkFinderFactory
		});
	});

	describe("create", function () {
		it("should return a response parser", function () {
			var responseParser = responseParserFactory.create({
				url: url,
				response: response
			});
			expect(responseParser.constructor.name).toEqual("ResponseParser");
		});

		it("should create a new ResponseParser", function () {
			spyOn(HATEOAS_CONSOLE.parsers, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				url: url,
				response: response
			});
			expect(HATEOAS_CONSOLE.parsers.ResponseParser).toHaveBeenCalled();
		});

		it("should pass in its own urlParser", function () {
			spyOn(HATEOAS_CONSOLE.parsers, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				url: url,
				response: response
			});
			expect(HATEOAS_CONSOLE.parsers.ResponseParser.mostRecentCall.args[0].urlParser).
				toEqual(urlParser);
		});

		it("should pass in its own linkFinderFactory", function () {
			spyOn(HATEOAS_CONSOLE.parsers, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				url: url,
				response: response
			});
			expect(HATEOAS_CONSOLE.parsers.ResponseParser.mostRecentCall.args[0].linkFinderFactory).
				toEqual(linkFinderFactory);
		});

		it("should pass in the response", function () {
			spyOn(HATEOAS_CONSOLE.parsers, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				url: url,
				response: response
			});
			expect(HATEOAS_CONSOLE.parsers.ResponseParser.mostRecentCall.args[0].response).
				toEqual(response);
		});

		it("should pass in the url", function () {
			spyOn(HATEOAS_CONSOLE.parsers, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				url: url,
				response: response
			});
			expect(HATEOAS_CONSOLE.parsers.ResponseParser.mostRecentCall.args[0].url).
				toEqual(url);
		});
	});
});