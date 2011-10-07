/*global HATEOAS_CONSOLE: false, describe: false, _: false, Backbone: false, beforeEach: false, it: false, spyOn: false, expect: false */

describe("RequestMaker", function () {
	"use strict";
	
	var RequestMaker = HATEOAS_CONSOLE.http.RequestMaker,
		aggregator,
		requestMaker;
	
	beforeEach(function () {
		aggregator = _.extend({}, Backbone.Events);
		requestMaker = new RequestMaker({
			aggregator: aggregator
		});
	});
	
	it("should trigger received when send is triggered", function () {
		var spy = spyOn(aggregator, "trigger").andCallThrough();
		aggregator.trigger("send");
		expect(spy.mostRecentCall.args[0]).toEqual("received");
	});
});