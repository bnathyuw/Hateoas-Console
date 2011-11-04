/*global HATEOAS_CONSOLE: false, Backbone: false */

HATEOAS_CONSOLE.namespace("models");

HATEOAS_CONSOLE.models.RestRequest = function RestRequest(spec) {
	"use strict";

	var illegalHeaders = [
			"Accept-Charset",
			"Accept-Encoding",
			"Connection",
			"Content-Length",
			"Cookie",
			"Cookie2",
			"Content-Transfer-Encoding",
			"Date",
			"Expect",
			"Host",
			"Keep-Alive",
			"Referer",
			"TE",
			"Trailer",
			"Transfer-Encoding",
			"Upgrade",
			"User-Agent",
			"Via"
		],

		headers = {},

		Ctor = Backbone.Model.extend({
			defaults: {
				verb: "GET",
				url: "http://hateoas-console.local/"
			},
			getAllHeaders: function () {
				return headers;
			},
			setHeader: function (key, value) {
				if (illegalHeaders.indexOf(key) !== -1) {
					throw {
						name: "Invalid Header",
						message: "You cannot set the value of " + key + "; this value is automatically set by the browser"
					};
				}
				headers[key] = value;
			}
		});

	return new Ctor(spec);
};
