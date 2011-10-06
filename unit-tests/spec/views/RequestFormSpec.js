/*global describe: false, beforeEach: false, loadFixtures: false, RequestForm: false, it: false, expect: false, $: false, HATEOAS_CONSOLE: false, spyOn */
describe("RequestForm", function () {
	"use strict";

	var RequestForm = HATEOAS_CONSOLE.views.RequestForm,
		model,
		requestForm;
	
	beforeEach(function () {
		loadFixtures("requestForm.html");
		model = {
			save: function () {},
			set: function () {}
		};
		requestForm = new RequestForm({model: model});
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
	
	describe("effects of clicking 'Go'", function () {
		beforeEach(function () {
			spyOn(requestForm.model, "save");
			spyOn(requestForm.model, "set");
			$("#go").trigger("click");
		});
		
		it("should update and save the model", function () {
			expect(requestForm.model.save).toHaveBeenCalledWith({
				url: $("[name=url]").val(),
				verb: $("[name=verb]").val()
			});
		});
	});
});