/*global describe: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */
describe("XmlResponseParser", function () {
	"use strict";
	var parser;
	
	beforeEach(function () {
		parser = new HATEOAS_CONSOLE.RESPONSE_PARSERS.XmlResponseParser();
	});
	
	it("should be able to parse a result", function () {
		var response = "<response></response>",
			output = parser.parse(response);
		
		expect(typeof output).toEqual("string");
	});
});