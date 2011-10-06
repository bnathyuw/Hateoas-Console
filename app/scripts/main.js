/*global $: false, jQuery: false, HATEOAS_CONSOLE: false, Backbone: false */

(function () {
	"use strict";
	var request = new HATEOAS_CONSOLE.models.RestRequest(),
		requestForm = new HATEOAS_CONSOLE.views.RequestForm({model: request});
		
	Backbone.sync = function(method, model, options) {
		options.success();
	}
}());