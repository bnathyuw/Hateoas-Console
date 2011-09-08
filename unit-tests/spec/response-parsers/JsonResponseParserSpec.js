/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false */

describe("JsonResponseParser", function () {
	"use strict";
	var jsonResponseParser = HATEOAS_CONSOLE.responseParsers.jsonResponseParser;
	
	describe("getLinks", function () {
	
		it("should return an empty array if there are no links in the response", function () {
			var response = {},
				parser = jsonResponseParser({response: JSON.stringify(response)}),
				links = parser.getLinks();
			
			expect(toString.call(links)).toEqual("[object Array]");
		});
		
		it("should identify a URI string named href", function () {
			var response = {
					href: "http://localhost/bar"	
				},
				parser = jsonResponseParser({response: JSON.stringify(response)}),
				links = parser.getLinks();
			
			expect(links[0].uri).toEqual(response.href);
		});
		
		it("should identify a deeply nested URI string named href", function () {
			var response = {
					foo: {
						bar: {
							href: "http://localhost/bar"
						}
					}
				},
				parser = jsonResponseParser({response: JSON.stringify(response)}),
				links = parser.getLinks();
			
			expect(links[0].uri).toEqual(response.foo.bar.href);
		});
	});
});
