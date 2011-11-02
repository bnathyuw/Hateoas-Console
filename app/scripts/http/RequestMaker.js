/*global HATEOAS_CONSOLE: false, _: false */

HATEOAS_CONSOLE.namespace("http");

HATEOAS_CONSOLE.http.RequestMaker = function RequestMaker(options) {
	"use strict";
	
	if (!(this instanceof RequestMaker)) {
		return new RequestMaker(options);
	}
	
	this.sendRequest = function (event) {
		options.aggregator.trigger("received", {
			uri: event.request.get("url"),
			response: {
				contentType: "text/html",
				body: ""
			}
		});
	};
	
	_.bindAll(this, "sendRequest");
	
	options.aggregator.bind("send", this.sendRequest);
};