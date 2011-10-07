/*global HATEOAS_CONSOLE: false, describe: false, beforeEach: false, Backbone: false, it: false, expect: false, spyOn: false */

describe("RequestParser", function () {
	"use strict";

	var RequestParser = HATEOAS_CONSOLE.parsers.RequestParser,
		requestParser,
		request,
		uriParser,
		parts;
	
	beforeEach(function () {
		var Request = Backbone.Model.extend({});
		parts = {
			scheme: "http",
			hierarchicalPart: "//www.somewhere.com/path/to/resource",
			query: "query=true",
			fragment: "abc",
			host: "www.somewhere.com",
			path: "here/it/is"
		};
		uriParser = {
			parse: function () {
				return parts;
			}
		};
		requestParser = new RequestParser({uriParser: uriParser});
		request = new Request();
	});
	
	it("logs a GET request", function () {
		var log;
		request.set({
			verb: "GET"
		});
		log = requestParser.parse(request);
		expect(log).toContain("GET");
	});
	
	it("logs a POST request", function () {
		var log;
		request.set({
			verb: "POST"
		});
		log = requestParser.parse(request);
		expect(log).toContain("POST");
	});
	
	it("should call UriParser with url", function () {
		var log,
			url = "http://www.somewhere.com/";
		spyOn(uriParser, "parse").andCallThrough();
		request.set({
			url: url
		});
		log = requestParser.parse(request);
		expect(uriParser.parse).toHaveBeenCalledWith(url);
	});
	
	it("should log the path from the URL", function () {
		var log,
			path = "this/is/my/path";
		parts.path = path;
		log = requestParser.parse(request);
		expect(log).toContain("/" + path);
	});
	
	it("should log a null path appropriately", function () {
		var log,
			path = "";
		parts.path = path;
		log = requestParser.parse(request);
		expect(log).toContain(" / HTTP/1.1");
	});
	
	it("should log the host", function () {
		var log,
			host = "www.foo.com";
		parts.host = host;
		log = requestParser.parse(request);
		expect(log).toContain("Host: " + host);
	});
});