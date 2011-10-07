/*global $: false, jQuery: false, HATEOAS_CONSOLE: false, Backbone: false, _: false */

(function () {
	"use strict";
	var aggregator = _.extend({}, Backbone.Events),
		request = new HATEOAS_CONSOLE.models.RestRequest(),
		requestForm = new HATEOAS_CONSOLE.views.RequestForm({
			model: request,
			aggregator: aggregator
		});
}());