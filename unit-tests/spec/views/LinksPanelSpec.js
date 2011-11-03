/*global HATEOAS_CONSOLE: false, Backbone: false, describe: false, beforeEach: false, loadFixtures: false, _: false, it: false, spyOn: false, expect: false, $: false */

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
		var response,
			event,
			url = "http://ghi.com";

		beforeEach(function () {
			response = {};
			event = {
				response: response,
				url: url
			};
		});

		it("should get a response parser", function () {
			spyOn(responseParserFactory, "create").andCallThrough();
			aggregator.trigger("received", event);
			expect(responseParserFactory.create).toHaveBeenCalled();
		});

		it("should get a response parser", function () {
			spyOn(responseParserFactory, "create").andCallThrough();
			aggregator.trigger("received", event);
			expect(responseParserFactory.create.mostRecentCall.args[0].response).toEqual(response);
		});

		it("should get the links from the response parser", function () {
			spyOn(responseParser, "getLinks");
			aggregator.trigger("received", event);
			expect(responseParser.getLinks).toHaveBeenCalled();
		});

		it("should output a table", function () {
			var url = "http://test.com/";

			responseParser.getLinks = function () {
				return [
					{ url: url }
				];
			};
			aggregator.trigger("received", event);
			expect($("#links table thead tr th::nth-child(1)").text()).toEqual("Link");
			expect($("#links table tbody tr").length).toEqual(1);
			expect($("#links table tbody tr::nth-child(1) td::nth-child(1) a").attr("href")).toEqual(url);
		});
	});
});