/*global HATEOAS_CONSOLE: false */
HATEOAS_CONSOLE.namespace("parsers");

HATEOAS_CONSOLE.parsers.RequestParser = function RequestParser(options) {
	"use strict";

	if (!(this instanceof RequestParser)) {
		return new RequestParser();
	}

	this.parse = function (request) {
		var verb = request.get("verb"),
			url = request.get("url"),
			parts = options.urlParser.parse(url),
			log;
		log = verb + " /" + parts.path + " HTTP/1.1";
		log = log + "\n";
		log = log + "Host: " + parts.host;
		return log;
	};

};