/*global describe: false, beforeEach: false, HATEOAS_CONSOLE: false, it: false, expect: false */

describe("PageView", function () {
	"use strict";
	
	var pageView;
	
	beforeEach(function () {
		pageView = new HATEOAS_CONSOLE.views.PageView();
	});
	
	it("should have a method initialize", function () {
		expect(pageView.initialize).toBeTruthy();
	});
	
});