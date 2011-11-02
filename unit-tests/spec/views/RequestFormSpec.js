/*global describe: false, beforeEach: false, loadFixtures: false, RequestForm: false, it: false, expect: false, $: false, HATEOAS_CONSOLE: false, spyOn: false, _: false, Backbone: false */
describe("RequestForm", function () {
	"use strict";

	var RequestForm = HATEOAS_CONSOLE.views.RequestForm,
		model,
		aggregator,
		requestForm;
	
	beforeEach(function () {
		loadFixtures("requestForm.html");
		model = {
			save: function () {},
			set: function () {}
		};
		aggregator = _.extend({}, Backbone.Events);
		requestForm = new RequestForm({model: model, aggregator: aggregator});
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
		});
		
		it("should update the model", function () {
			spyOn(requestForm.model, "set");
			$("#go").trigger("click");
			expect(requestForm.model.set).toHaveBeenCalledWith({
				url: $("[name=url]").val(),
				verb: $("[name=verb]").val()
			});
		});
		
		it("should trigger a send event", function () {
			spyOn(requestForm.aggregator, "trigger");
			$("#go").trigger("click");
			expect(aggregator.trigger.mostRecentCall.args[0]).toEqual("send");
		});
		
		it("should pass model to send event", function () {
			spyOn(requestForm.aggregator, "trigger");
			$("#go").trigger("click");
			expect(aggregator.trigger.mostRecentCall.args[1].request).toEqual(requestForm.model);
		});
	});
});