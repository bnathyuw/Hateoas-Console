/*global Backbone: false, HATEOAS_CONSOLE: false*/

HATEOAS_CONSOLE.namespace("views");

HATEOAS_CONSOLE.views.RequestForm = (function () {
	"use strict";
	return Backbone.View.extend({
		el: "form",
		
		initialize: function (options) {
			this.$("[name=requestBody]").hide();
			this.aggregator = options.aggregator;
		},
		
		events: {
			"change [name=verb]":	"showRequestBody",
			"click	#go":			"saveRequest"
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
			this.model.set({
				url: this.$("[name=url]").val(),
				verb: this.$("[name=verb]").val()
			});
			this.aggregator.trigger("send", this.model);
		}
	});
}());