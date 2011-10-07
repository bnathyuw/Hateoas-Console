/*global describe: false, HATEOAS_CONSOLE: false, beforeEach: false, loadFixtures: false, Backbone: false, _: false, it: false, expect: false, $: false, spyOn: false */
describe("RequestLog", function () {
	"use strict";
	
	var RequestLog = HATEOAS_CONSOLE.views.RequestLog,
		aggregator,
		requestLog,
		requestParser;
	
	beforeEach(function () {
		loadFixtures("requestLog.html");
		aggregator = _.extend({}, Backbone.Events);
		requestParser = {
			parse: function () {}
		};
		requestLog = new RequestLog({
			aggregator: aggregator,
			requestParser: requestParser
		});
	});
	
	describe("when send is triggered", function () {
		var model = {};
		
		it("should call the reqest parser", function () {
			spyOn(requestParser, "parse");
			aggregator.trigger("send", model);
			expect(requestParser.parse).toHaveBeenCalledWith(model);
		});
		
		
	});
});