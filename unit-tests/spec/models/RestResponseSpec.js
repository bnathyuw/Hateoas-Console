/*global describe: false, HATEOAS_CONSOLE: false, beforeEach: false, it: false, expect: false */

describe("RestResponse", function () {
	"use strict";

	var RestResponse = HATEOAS_CONSOLE.models.RestResponse,
		restResponse;

	beforeEach(function () {
		restResponse = new RestResponse({
			headers: "Content-Type: application/xml"
		});
	});

	describe("getHeader", function () {
		it("returns the correct value", function () {
			var header = restResponse.getHeader("Content-Type");
			expect(header).toEqual("application/xml");
		});
	});

});