/*global HATEOAS_CONSOLE: false, _: false */

HATEOAS_CONSOLE.namespace("http");

HATEOAS_CONSOLE.http.RequestMaker = function RequestMaker(options) {
	"use strict";
	
	if (!(this instanceof RequestMaker)) {
		return new RequestMaker(options);
	}
	
	this.sendRequest = function () {
		options.aggregator.trigger("received");
	};
	
	_.bindAll(this, "sendRequest");
	
	options.aggregator.bind("send", this.sendRequest);
};