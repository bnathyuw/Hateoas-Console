/*global describe: false, toString: false, beforeEach: false, it: false, HATEOAS_CONSOLE: false, expect: false, spyOn: false */

describe("LinkFinderFactory", function () {
	"use strict";
	var LinkFinderFactory = HATEOAS_CONSOLE.parsers.LinkFinderFactory,
		constructors = {
			xml: function () {},
			html: function () {},
			"json-p": function () {},
			json: function () {}
		},
		spec = {
			constructors: constructors
		};

	it("should be a singleton", function () {
		var factory1 = new LinkFinderFactory(spec),
			factory2 = new LinkFinderFactory(spec);

		expect(factory1 === factory2).toEqual(true);
	});

	it("should identify itself as LinkFinderFactory", function () {
		var factory = new LinkFinderFactory();

		expect(factory.constructor.name).toEqual("LinkFinderFactory");
	});

	describe("getParser", function () {
		var factory;

		beforeEach(function () {
			factory = new LinkFinderFactory(spec);
		});

		it("should return xmlLinkFinder for text/xml", function () {
			var spy = spyOn(constructors, "xml"),
				parser = factory.create("text/xml");

			expect(spy).toHaveBeenCalled();
		});

		it("should return xmlLinkFinder for application/xml", function () {
			var spy = spyOn(constructors, "xml"),
				parser = factory.create("application/xml");

			expect(spy).toHaveBeenCalled();
		});

		it("should return xmlLinkFinder for application/something+xml", function () {
			var spy = spyOn(constructors, "xml"),
				parser = factory.create("application/something+xml");

			expect(spy).toHaveBeenCalled();
		});

		it("should return jsonLinkFinder for application/json", function () {
			var spy = spyOn(constructors, "json"),
				parser = factory.create("application/json");

			expect(spy).toHaveBeenCalled();
		});

		it("should return jsonpLinkFinder for application/json-p", function () {
			var spy = spyOn(constructors, "json-p"),
				parser = factory.create("application/json-p");

			expect(spy).toHaveBeenCalled();
		});

		it("should return xmlLinkFinder for text/html", function () {
			var spy = spyOn(constructors, "html"),
				parser = factory.create("text/html");

			expect(spy).toHaveBeenCalled();
		});

		it("should be able to cope with charset declarations in the content type", function () {
			var spy = spyOn(constructors, "xml"),
				parser = factory.create("application/xml; charset=utf-8");

			expect(spy).toHaveBeenCalled();
		});

		it("should throw an appropriate error if no constructor can be found", function () {
			expect(function () {
				factory.create("application/foo");
			}).toThrow({
				name: "Constructor Not Found",
				message: "No constructor exists for type application/foo"
			});
		});
	});
});
