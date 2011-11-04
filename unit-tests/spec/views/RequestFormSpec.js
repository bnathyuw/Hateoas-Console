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

	describe("effects of submitting the form", function () {
		it("should update the model", function () {
			var spy = spyOn(requestForm.model, "set");
			$("form#request-form").trigger("submit");
			expect(spy).toHaveBeenCalled();
			expect(spy.mostRecentCall.args[0].url).toEqual($("[name=url]").val());
			expect(spy.mostRecentCall.args[0].verb).toEqual($("[name=verb]").val());
		});

		it("should set the request body if the body field is visible", function () {
			var spy = spyOn(requestForm.model, "set"),
				body = "Exegi monumentum aere perennius";
			$("[name=requestBody]").val(body).show();
			$("form#request-form").trigger("submit");
			expect(spy).toHaveBeenCalled();
			expect(spy.mostRecentCall.args[0].body).toEqual(body);
		});

		it("should set the request body to undefined if the body field is not visible", function () {
			var spy = spyOn(requestForm.model, "set"),
				body = "Vixi puellis nuper idoneus";
			$("[name=requestBody]").val(body).hide();
			$("form#request-form").trigger("submit");
			expect(spy).toHaveBeenCalled();
			expect(spy.mostRecentCall.args[0].body).toEqual(undefined);
		});

		it("should trigger a send event", function () {
			var spy = spyOn(requestForm.aggregator, "trigger");
			$("form#request-form").trigger("submit");
			expect(spy.mostRecentCall.args[0]).toEqual("send");
		});

		it("should pass model to send event", function () {
			var spy = spyOn(requestForm.aggregator, "trigger");
			$("form#request-form").trigger("submit");
			expect(spy.mostRecentCall.args[1].request).toEqual(requestForm.model);
		});
	});
});