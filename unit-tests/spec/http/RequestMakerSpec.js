/*global HATEOAS_CONSOLE: false, describe: false, _: false, Backbone: false, beforeEach: false, it: false, spyOn: false, expect: false */

describe("RequestMaker", function () {
	"use strict";

	var RequestMaker = HATEOAS_CONSOLE.http.RequestMaker,
		aggregator,
		requestMaker,
		request,
		url = "http://abc.com",
		xmlHttpRequest,
		verb = "GET",
		body = "this=that&these=those&foo=bar",
		attributes = {
			url: url,
			verb: verb,
			body: body
		},
		requestMakerSpec,
		responseText = "Ille mi par esse deo videtur",
		headers = "this: that\nthose: these",
		status = 100,
		statusText = "Continue";

	beforeEach(function () {
		aggregator = _.extend({}, Backbone.Events);
		xmlHttpRequest = {
			open: function () {},
			send: function () {},
			getAllResponseHeaders: function () {
				return headers;
			}
		};
		request = {
			get: function (key) {
				return attributes[key];
			}
		};
		requestMakerSpec = {
			aggregator: aggregator,
			XMLHttpRequest: function () {
				return xmlHttpRequest;
			},
			RestResponse: function () {}
		};
		requestMaker = new RequestMaker(requestMakerSpec);
	});

	describe("when send is triggered", function () {

		it("should open xmlHttpRequest", function () {
			var spy = spyOn(xmlHttpRequest, "open");
			aggregator.trigger("send", {
				request: request
			});
			expect(spy).toHaveBeenCalledWith(verb, url, true);
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
			xmlHttpRequest.status = status;
			xmlHttpRequest.statusText = statusText;
			aggregator.trigger("send", {
				request: request
			});
		});

		it("should create a response", function () {
			var spy = spyOn(requestMakerSpec, "RestResponse");
			xmlHttpRequest.onreadystatechange();
			expect(spy).toHaveBeenCalled();
		});

		it("should pass body into response", function () {
			var spy = spyOn(requestMakerSpec, "RestResponse");
			xmlHttpRequest.onreadystatechange();
			expect(spy.mostRecentCall.args[0].body).toEqual(responseText);
		});

		it("should pass status into response", function () {
			var spy = spyOn(requestMakerSpec, "RestResponse");
			xmlHttpRequest.onreadystatechange();
			expect(spy.mostRecentCall.args[0].status).toEqual(status);
		});

		it("should pass status text into response", function () {
			var spy = spyOn(requestMakerSpec, "RestResponse");
			xmlHttpRequest.onreadystatechange();
			expect(spy.mostRecentCall.args[0].statusText).toEqual(statusText);
		});

		it("should pass headers into response", function () {
			var spy = spyOn(requestMakerSpec, "RestResponse");
			xmlHttpRequest.onreadystatechange();
			expect(spy.mostRecentCall.args[0].headers).toEqual(headers);
		});

		it("should trigger received", function () {
			var spy = spyOn(aggregator, "trigger").andCallThrough();
			xmlHttpRequest.onreadystatechange();
			expect(spy).toHaveBeenCalled();
			expect(spy.mostRecentCall.args[0]).toEqual("received");
		});

		it("should pass url", function () {
			var spy = spyOn(aggregator, "trigger").andCallThrough();
			xmlHttpRequest.onreadystatechange();
			expect(spy.mostRecentCall.args[1].url).toEqual(url);
		});

		it("should pass response", function () {
			var spy = spyOn(aggregator, "trigger").andCallThrough(),
				response = {};
			requestMakerSpec.RestResponse = function () {
				return response;
			};
			xmlHttpRequest.onreadystatechange();
			expect(spy.mostRecentCall.args[1].response).toEqual(response);
		});
	});

});