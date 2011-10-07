﻿/*global HATEOAS_CONSOLE: false, Backbone: false, describe: false, beforeEach: false */

describe("LinksPanel", function () {
	"use strict";
	
	var LinksPanel = HATEOAS_CONSOLE.views.LinksPanel,
		linksPanel,
		aggregator,
		responseParser,
		responseParserFactory;
	
	beforeEach(function () {
		loadFixtures("linksPanel.html");
		aggregator = _.extend({}, Backbone.Events);
		responseParser = {
			getLinks: function () {}
		};
		responseParserFactory = {
			create: function () {
				return responseParser;
			}
		};
		linksPanel = new LinksPanel({
			aggregator: aggregator,
			responseParserFactory: responseParserFactory
		});
	});
	
	describe("when received is triggered", function () {
		var response;
		
		beforeEach(function () {
			response = {};
		});
	
		it("should get a response parser", function () {
			spyOn(responseParserFactory, "create").andCallThrough();
			aggregator.trigger("received", response);
			expect(responseParserFactory.create).toHaveBeenCalledWith(response);
		});
		
		it("should get the links from the response parser", function () {
			spyOn(responseParser, "getLinks");
			aggregator.trigger("received", response);
			expect(responseParser.getLinks).toHaveBeenCalled();
		});
		
		it("should write the links from the parser to the screen", function () {
			var expectedResponse = "arma virumque cano Troiae qui primus ab oris";
			responseParser.getLinks = function () {
				return expectedResponse;
			};
			aggregator.trigger("received", response);
			expect($("#links")).toHaveText(expectedResponse);
		});
	});
});