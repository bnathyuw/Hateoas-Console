HATEOAS_CONSOLE.namespace("HATEOAS_CONSOLE.models");

HATEOAS_CONSOLE.models.RestResponse = Backbone.Model.extend({
	getHeader: function () {
		return "application/xml";
	}
});