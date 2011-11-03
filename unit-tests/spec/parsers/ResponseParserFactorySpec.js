/*global describe: false, beforeEach: false, HATEOAS_CONSOLE: false, it: false, expect: false, spyOn: false */

describe("ResponseParserFactory", function () {
	"use strict";

	var responseParserFactory,
		linkFinderFactory,
		uriParser,
		response,
		uri;

	beforeEach(function () {
		linkFinderFactory = {
			create: function () {}
		};
		uriParser = {
			parse: function () {}
		};
		response = {
			contentType: "",
			body: ""
		};
		uri = "http://abc.com/";
		responseParserFactory = new HATEOAS_CONSOLE.parsers.ResponseParserFactory({
			uriParser: uriParser,
			linkFinderFactory: linkFinderFactory
		});
	});

	describe("create", function () {
		it("should return a response parser", function () {
			var responseParser = responseParserFactory.create({
				uri: uri,
				response: response
			});
			expect(responseParser.constructor.name).toEqual("ResponseParser");
		});

		it("should create a new ResponseParser", function () {
			spyOn(HATEOAS_CONSOLE.parsers, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				uri: uri,
				response: response
			});
			expect(HATEOAS_CONSOLE.parsers.ResponseParser).toHaveBeenCalled();
		});

		it("should pass in its own uriParser", function () {
			spyOn(HATEOAS_CONSOLE.parsers, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				uri: uri,
				response: response
			});
			expect(HATEOAS_CONSOLE.parsers.ResponseParser.mostRecentCall.args[0].uriParser).
				toEqual(uriParser);
		});

		it("should pass in its own linkFinderFactory", function () {
			spyOn(HATEOAS_CONSOLE.parsers, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				uri: uri,
				response: response
			});
			expect(HATEOAS_CONSOLE.parsers.ResponseParser.mostRecentCall.args[0].linkFinderFactory).
				toEqual(linkFinderFactory);
		});

		it("should pass in the response", function () {
			spyOn(HATEOAS_CONSOLE.parsers, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				uri: uri,
				response: response
			});
			expect(HATEOAS_CONSOLE.parsers.ResponseParser.mostRecentCall.args[0].response).
				toEqual(response);
		});

		it("should pass in the uri", function () {
			spyOn(HATEOAS_CONSOLE.parsers, "ResponseParser").andCallThrough();
			responseParserFactory.create({
				uri: uri,
				response: response
			});
			expect(HATEOAS_CONSOLE.parsers.ResponseParser.mostRecentCall.args[0].uri).
				toEqual(uri);
		});
	});
});