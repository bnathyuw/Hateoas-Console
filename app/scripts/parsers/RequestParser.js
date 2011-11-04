/*global HATEOAS_CONSOLE: false */

HATEOAS_CONSOLE.namespace("parsers");

HATEOAS_CONSOLE.parsers.RequestParser = (function () {
	"use strict";

	var RequestParser = function RequestParser(options) {

			if (!this instanceof RequestParser) {
				return new RequestParser();
			}

			var parse = function (request) {
					var verb = request.get("verb"),
						url = request.get("url"),
						parts = options.urlParser.parse(url),
						log;
					log = verb + " /" + (parts.path ? parts.path : "") + " HTTP/1.1";
					log = log + "\n";
					log = log + "Host: " + parts.host;
					return log;
				};

			this.parse = parse;
		};

	return RequestParser;
}());