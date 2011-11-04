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

		illegalHeaderPrefixes = [
			"Proxy-",
			"Sec-"
		],

		headers = {},

		validateKeyChars = function (key, value) {
			var i,
				len;

			for (i = 0, len = key.length; i < len; i = i + 1) {
				if (key.charCodeAt(i) > 0xFF) {
					throw {
						name: "Invalid Header",
						message: "You cannot set the value of " + key + " as it contains character outside the permitted range"
					};
				}
			}
		},

		validateValueChars = function (key, value) {
			var i,
				len;

			for (i = 0, len = value.length; i < len; i = i + 1) {
				if (value.charCodeAt(i) > 0xFF) {
					throw {
						name: "Invalid Header",
						message: "You cannot set the value of " + key + " as it contains character outside the permitted range"
					};
				}
			}
		},

		validateHeaderIsLegal = function (key, value) {
			var lowerCaseKey = key.toLowerCase();

			illegalHeaders.forEach(function (header) {
				if (header.toLowerCase() === lowerCaseKey) {
					throw {
						name: "Invalid Header",
						message: "You cannot set the value of " + key + "; this value is automatically set by the browser"
					};
				}
			});
		},

		validateHeaderPrefixIsLegal = function (key, value) {
			var lowerCaseKey = key.toLowerCase();

			illegalHeaderPrefixes.forEach(function (prefix) {
				if (lowerCaseKey.indexOf(prefix.toLowerCase()) === 0) {
					throw {
						name: "Invalid Header",
						message: "You cannot set the value of " + key + "; header names starting with " + prefix + " are reserved"
					};
				}
			});
		},

		validateHeader = function (key, value) {
			validateKeyChars(key, value);
			validateValueChars(key, value);
			validateHeaderIsLegal(key, value);
			validateHeaderPrefixIsLegal(key, value);
		},

		setHeader = function (key, value) {
			validateHeader(key, value);

			headers[key] = value;
		},

		getAllHeaders = function () {
			return headers;
		},

		Ctor = Backbone.Model.extend({
			defaults: {
				verb: "GET",
				url: "http://hateoas-console.local/"
			},
			getAllHeaders: getAllHeaders,
			setHeader: setHeader
		});

	return new Ctor(spec);
};
