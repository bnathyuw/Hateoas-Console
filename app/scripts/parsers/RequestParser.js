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
						log,
						headers = request.getAllHeaders(),
						header,
						body = request.get("body");
					log = verb + " /" + (parts.path || "") + " HTTP/1.1\n";
					log = log + "Host: " + parts.host + "\n";
					if (headers) {
						for (header in headers) {
							if (headers.hasOwnProperty(header)) {
								log = log + header + ": " + headers[header] + "\n";
							}
						}
					}
					if (body) {
						log = log + body + "\n";
					}
					return log;
				};

			this.parse = parse;
		};

	return RequestParser;
}());