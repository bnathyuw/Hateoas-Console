﻿/*global Backbone: false*/

HATEOAS_CONSOLE.namespace("views");

HATEOAS_CONSOLE.views.RequestForm = (function () {
	"use strict";
	return Backbone.View.extend({
		el: "form",
		
		initialize: function () {
			this.$("[name=requestBody]").hide();
		},
		
		events: {
			"change [name=verb]":	"showRequestBody"
		},
		
		showRequestBody: function () {
			var verb = this.$("[name=verb]").val();
			if (verb === "POST" || verb === "PUT") {
				this.$("[name=requestBody]").show();
			} else {
				this.$("[name=requestBody]").hide();
			}
		}
	});
}());