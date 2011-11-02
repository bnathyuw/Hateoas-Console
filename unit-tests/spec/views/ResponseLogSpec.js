/*global HATEOAS_CONSOLE: false, Backbone: false, describe: false, beforeEach: false, _: false, it: false, spyOn: false, expect: false, loadFixtures: false, $: false */

describe("ResponseLog", function () {
	"use strict";
	
	var ResponseLog = HATEOAS_CONSOLE.views.ResponseLog,
		responseLog,
		aggregator,
		responseParser,
		responseParserFactory;
	
	beforeEach(function () {
		loadFixtures("responseLog.html");
		aggregator = _.extend({}, Backbone.Events);
		responseParser = {
			toHttpString: function () {}
		};
		responseParserFactory = {
			create: function () {
				return responseParser;
			}
		};
		responseLog = new ResponseLog({
			aggregator: aggregator,
			responseParserFactory: responseParserFactory
		});
	});
	
	describe("when received is triggered", function () {
		var response,
			event,
			uri = "http://cde.com";
		
		beforeEach(function () {
			response = {};
			event = {
				response: response,
				uri: uri
			};
		});
	
		it("should get a response parser", function () {
			spyOn(responseParserFactory, "create").andCallThrough();
			aggregator.trigger("received", event);
			expect(responseParserFactory.create).toHaveBeenCalled();
		});
		
		it("should pass the response into the response parser factory", function () {
			spyOn(responseParserFactory, "create").andCallThrough();
			aggregator.trigger("received", event);
			expect(responseParserFactory.create.mostRecentCall.args[0].response).
				toEqual(response);
		});
		
		it("should pass the uri into the response parser factory", function () {
			spyOn(responseParserFactory, "create").andCallThrough();
			aggregator.trigger("received", event);
			expect(responseParserFactory.create.mostRecentCall.args[0].uri).
				toEqual(uri);
		});
		
		it("should get the log from the response parser", function () {
			spyOn(responseParser, "toHttpString");
			aggregator.trigger("received", event);
			expect(responseParser.toHttpString).toHaveBeenCalled();
		});
		
		it("should write the log from the parser to the screen", function () {
			var expectedResponse = "arma virumque cano Troiae qui primus ab oris";
			responseParser.toHttpString = function () {
				return expectedResponse;
			};
			aggregator.trigger("received", event);
			expect($("#response")).toHaveText(expectedResponse);
		});
	});
});