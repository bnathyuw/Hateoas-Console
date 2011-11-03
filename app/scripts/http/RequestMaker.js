/*global HATEOAS_CONSOLE: false, _: false */

HATEOAS_CONSOLE.namespace("http");

(function () {
	"use strict";

	var RestResponse = HATEOAS_CONSOLE.models.RestResponse;

	HATEOAS_CONSOLE.http.RequestMaker = function RequestMaker(spec) {

		if (!(this instanceof RequestMaker)) {
			return new RequestMaker(spec);
		}

		var handler = function () {
			if (this.readyState === 4) {
				spec.aggregator.trigger("received", {
					url: this.url,
					response: new RestResponse({
						body: this.responseText
					})
				});
			}
		};

		this.sendRequest = function (event) {
			var xmlHttpRequest = new spec.XMLHttpRequest(),
				request = event.request,
				url = request.get("url"),
				verb = request.get("verb"),
				body = request.get("body");

			xmlHttpRequest.onreadystatechange = handler;
			xmlHttpRequest.url = url;
			xmlHttpRequest.open(verb, url, true);
			xmlHttpRequest.send(body);
		};

		_.bindAll(this, "sendRequest");

		spec.aggregator.bind("send", this.sendRequest);
	};
}());