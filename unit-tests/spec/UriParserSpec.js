/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */

describe("UriParser", function () {
	"use strict";	
	var uriParser = HATEOAS_CONSOLE.uriParser;
	
	it("should be a singleton", function () {
		var parser1 = uriParser(),
			parser2 = uriParser();
		
		expect(parser1 === parser2).toEqual(true);
	});
	
	it("should identify itself as UriParser", function () {
		var parser = uriParser();
		
		expect(parser.constructor.name).toEqual("UriParser");
	});
});
