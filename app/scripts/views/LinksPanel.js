/*global HATEOAS_CONSOLE: false, _: false, $: false, Backbone: false */

HATEOAS_CONSOLE.namespace("views");

HATEOAS_CONSOLE.views.LinksPanel = (function () {
	"use strict";
	var responseParserFactory,
		template = "<table>\n" +
			"	<thead>\n" +
			"		<tr>\n" +
			"			<th>Link</th>\n" +
			"		</tr>\n" +
			"	</thead>\n" +
			"	<tbody>\n" +
			"		<% _.each(links, function (link) { %><tr>\n" +
			"			<td><a href=\"<%= link.url %>\"><%= link.url %></a></td>\n" +
			"		</tr><% }); %>\n" +
			"	</tbody>\n" +
			"</table>";

	return Backbone.View.extend({
		el: "#links",

		initialize: function (options) {
			_.bindAll(this, "logResponse");
			options.aggregator.bind("received", this.logResponse);
			responseParserFactory = options.responseParserFactory;
		},

		logResponse: function (event) {
			var responseParser = responseParserFactory.create({
					url: event.url,
					response: event.response
				}),
				links = responseParser.getLinks(),
				html = _.template(template, {links: links});

			$(this.el).html(html);
		}
	});

}());