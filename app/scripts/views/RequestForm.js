/*global Backbone: false, HATEOAS_CONSOLE: false*/

HATEOAS_CONSOLE.namespace("views");

HATEOAS_CONSOLE.views.RequestForm = (function () {
	"use strict";
	return Backbone.View.extend({
		el: "form#request-form",

		initialize: function (options) {
			this.$("[name=requestBody]").hide();
			this.aggregator = options.aggregator;
		},

		events: {
			"change [name=verb]":	"showRequestBody",
			"submit":				"saveRequest"
		},

		showRequestBody: function () {
			var verb = this.$("[name=verb]").val();
			if (verb === "POST" || verb === "PUT") {
				this.$("[name=requestBody]").show();
			} else {
				this.$("[name=requestBody]").hide();
			}
		},

		saveRequest: function () {
			var url = this.$("[name=url]").val(),
				verb = this.$("[name=verb]").val(),
				bodyEl = this.$("[name=requestBody]"),
				body = bodyEl.is(":visible") ? bodyEl.val() : undefined;

			this.model.set({
				url: url,
				verb: verb,
				body: body
			});

			this.aggregator.trigger("send", {
				request: this.model
			});
			
			return false;
		}
	});
}());