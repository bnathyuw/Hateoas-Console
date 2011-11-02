/*global HATEOAS_CONSOLE: false, describe: false, _: false, Backbone: false, beforeEach: false, it: false, spyOn: false, expect: false */

describe("RequestMaker", function () {
	"use strict";
	
	var RequestMaker = HATEOAS_CONSOLE.http.RequestMaker,
		aggregator,
		requestMaker,
		request,
		uri = "http://abc.com";
	
	beforeEach(function () {
		aggregator = _.extend({}, Backbone.Events);
		request = {
			get: function () {
				return uri;
			}
		};
		requestMaker = new RequestMaker({
			aggregator: aggregator
		});
	});
	
	it("should trigger received when send is triggered", function () {
		var spy = spyOn(aggregator, "trigger").andCallThrough();
		aggregator.trigger("send", {
			request: request
		});
		expect(spy.mostRecentCall.args[0]).toEqual("received");
	});
	
	it("should pass uri in received event", function () {
		var spy = spyOn(aggregator, "trigger").andCallThrough();
		aggregator.trigger("send", {
			request: request
		});
		expect(spy.mostRecentCall.args[1].uri).toEqual(uri);
	});
	
	it("should pass response in received event", function () {
		var spy = spyOn(aggregator, "trigger").andCallThrough();
		aggregator.trigger("send", {
			request: request
		});
		expect(spy.mostRecentCall.args[1].response).toBeDefined();
	});

});