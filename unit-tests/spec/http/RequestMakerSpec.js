/*global HATEOAS_CONSOLE: false, describe: false, _: false, Backbone: false, beforeEach: false, it: false, spyOn: false, expect: false */

describe("RequestMaker", function () {
	"use strict";

	var RequestMaker = HATEOAS_CONSOLE.http.RequestMaker,
		aggregator,
		requestMaker,
		request,
		uri = "http://abc.com",
		xmlHttpRequest,
		verb = "GET",
		body = "this=that&these=those&foo=bar",
		attributes = {
			url: uri,
			verb: verb,
			body: body
		},
		responseText = "<!doctype html><html><head><title>Title</title></head><body><h1>Title</h1></body></html>";

	beforeEach(function () {
		aggregator = _.extend({}, Backbone.Events);
		xmlHttpRequest = {
			open: function () {},
			send: function () {}
		};
		request = {
			get: function (key) {
				return attributes[key];
			}
		};
		requestMaker = new RequestMaker({
			aggregator: aggregator,
			XMLHttpRequest: function () {
				return xmlHttpRequest;
			}
		});
	});

	describe("when send is triggered", function () {

		it("should open xmlHttpRequest", function () {
			var spy = spyOn(xmlHttpRequest, "open");
			aggregator.trigger("send", {
				request: request
			});
			expect(spy).toHaveBeenCalledWith(verb, uri, true);
		});

		it("should send xmlHttpRequest", function () {
			var spy = spyOn(xmlHttpRequest, "send");
			aggregator.trigger("send", {
				request: request
			});
			expect(spy).toHaveBeenCalledWith(body);
		});

	});

	describe("when response is received", function () {
		beforeEach(function () {
			xmlHttpRequest.readyState = 4;
			xmlHttpRequest.responseText = responseText;
			aggregator.trigger("send", {
				request: request
			});
		});

		it("should trigger received", function () {
			var spy = spyOn(aggregator, "trigger").andCallThrough();
			xmlHttpRequest.onreadystatechange();
			expect(spy).toHaveBeenCalled();
			expect(spy.mostRecentCall.args[0]).toEqual("received");
		});

		it("should pass uri", function () {
			var spy = spyOn(aggregator, "trigger").andCallThrough();
			xmlHttpRequest.onreadystatechange();
			expect(spy.mostRecentCall.args[1].uri).toEqual(uri);
		});

		it("should pass response", function () {
			var spy = spyOn(aggregator, "trigger").andCallThrough();
			xmlHttpRequest.onreadystatechange();
			expect(spy.mostRecentCall.args[1].response.get("body")).toEqual(responseText);
		});
	});

});