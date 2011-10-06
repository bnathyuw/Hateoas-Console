/*global describe: false, beforeEach: false, loadFixtures: false, RequestForm: false, it: false, expect: false, $: false */
describe("RequestForm", function () {
	"use strict";

	var RequestForm = HATEOAS_CONSOLE.views.RequestForm,
		requestForm;
	
	beforeEach(function () {
		loadFixtures("requestForm.html");
		requestForm = new RequestForm();
	});
	
	it("should hide the request field on initialize", function () {
		expect($("[name=requestBody]")).toBeHidden();
	});
	
	describe("showing or hiding the request field according to the verb", function () {
		var specs = [
			{verb: "GET",		predicate: "toBeHidden"}, 
			{verb: "POST",		predicate: "toBeVisible"}, 
			{verb: "PUT",		predicate: "toBeVisible"}, 
			{verb: "DELETE",	predicate: "toBeHidden"}, 
			{verb: "HEAD",		predicate: "toBeHidden"}, 
			{verb: "OPTIONS",	predicate: "toBeHidden"}
		];
		
		specs.forEach(function (spec) {
			it("should show the request field when " + spec.verb + " is selected", function () {
				$("[name=verb]").
					val(spec.verb).
					trigger("change");
				
				expect($("[name=requestBody]"))[spec.predicate]();
			});
		});
	});
});