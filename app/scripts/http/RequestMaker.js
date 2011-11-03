/*global HATEOAS_CONSOLE: false, _: false */

HATEOAS_CONSOLE.namespace("http");

(function () {
	"use strict";

	var RestResponse = HATEOAS_CONSOLE.models.RestResponse;

	HATEOAS_CONSOLE.http.RequestMaker = function RequestMaker(options) {

		if (!(this instanceof RequestMaker)) {
			return new RequestMaker(options);
		}

		this.sendRequest = function (event) {
			options.aggregator.trigger("received", {
				uri: event.request.get("url"),
				response: new RestResponse()
			});
		};

		_.bindAll(this, "sendRequest");

		options.aggregator.bind("send", this.sendRequest);
	};
}());