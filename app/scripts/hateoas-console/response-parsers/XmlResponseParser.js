/*global HATEOAS_CONSOLE */
var HATEOAS_CONSOLE = HATEOAS_CONSOLE || {};
HATEOAS_CONSOLE.RESPONSE_PARSERS = HATEOAS_CONSOLE.RESPONSE_PARSERS || {};

HATEOAS_CONSOLE.RESPONSE_PARSERS.XmlResponseParser = function () {
	"use strict";
};
HATEOAS_CONSOLE.RESPONSE_PARSERS.XmlResponseParser.prototype.parse = function (response) {
	"use strict";
	return "result";
};