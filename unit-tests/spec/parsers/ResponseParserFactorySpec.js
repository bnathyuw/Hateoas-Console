/*global describe: false, beforeEach: false, it: false, expect: false, HATEOAS_CONSOLE: false */

var ResponseParserFactory = function ResponseParserFactory() {
	"use strict";
	
	if (!this instanceof ResponseParserFactory) {
		return new ResponseParserFactory();
	}
	
	var ResponseParser = HATEOAS_CONSOLE.parsers.ResponseParser,
		create = function () {
			return new ResponseParser({
				uriParser: {
					parse: function () {}
				},
				linkFinderFactory: {
					create: function () {}
				},
				uri: "http://www",
				contentType: "text/html",
				response: {}
			});
		};
	
	this.create = create;
};

describe("ResponseParserFactory", function () {
	"use strict";
	
	var responseParserFactory;
	
	beforeEach(function () {
		responseParserFactory = new ResponseParserFactory();
	});
	
	describe("create", function () {
		it("should return a response parser", function () {
			var responseParser = responseParserFactory.create();
			expect(responseParser.constructor.name).toEqual("ResponseParser");
		});
	});
});