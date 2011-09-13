/*global $:false, HATEOAS_CONSOLE: false */

(function () {
	"use strict";

	var responseParser,
	
		submitRequest = function () {
			var verb = $("[name=verb]").val(),
				url = $("[name=url]").val(),
				settings = {
					url: url,
					type: verb
				},
				requestBody = $("[name=requestBody]").val();
			
			if (requestBody) {
				settings.data = requestBody;
			}
			$.ajax(settings);
		},

		logRequest = function (e, jqXHR, settings) {
			var requestText = settings.type + " " + settings.url + " HTTP/1.1";
			if (settings.data) {
				requestText += "\n\n" + settings.data;
			}
			$(this).text(requestText);
		},

		writeLinks = function (links) {
			var linksDiv = $("#links"),
				table,
				tr,
				td,
				a;
			
			linksDiv.html("");
			
			if (!links) {
				return;
			}
			
			table = $("<table><thead><tr><td>Link</td><td>Rel</td><td>Rev</td><td>Has Same Origin</td></tr></thead></table>");
			
			links.forEach(function (link) {
				tr = $("<tr>");
				td = $("<td>");
				a = $("<a>").
					attr("href", link.uri).
					text(link.uri);
				td.append(a);
				tr.append(td);
				
				td = $("<td>").
					text(link.rel.toString());
				tr.append(td);
				
				td = $("<td>").
					text(link.rev.toString());
				tr.append(td);
				
				td = $("<td>").
					text(link.hasSameOrigin.toString());
				tr.append(td);
				
				table.append(tr);
			});
			
			linksDiv.append(table);
		},

		logResponse = function (e, jqXHR, settings) {
			var responseText = "HTTP/1.1 " + jqXHR.status,
				html,
				contentType = jqXHR.getResponseHeader("Content-Type"),
				parser,
				links;
			
			responseText += "\n" + jqXHR.getAllResponseHeaders();
			if (jqXHR.responseText) {
				responseText += "\n\n" + jqXHR.responseText;
				parser = responseParser({contentType: contentType, response: jqXHR.responseText, uri: settings.url});
				links = parser.getLinks();
				
				writeLinks(links);
			}
			$(this).text(responseText);
			
			html = $(this).html();
		},

		doGetRequest = function () {
			var url = this.href,
				verb = "GET";
			
			$("[name=url]").val(url);
			
			$("[name=verb]").val(verb);
			
			$.ajax({
				url: url,
				verb: verb
			});
			
			$("[name=requestBody]").hide();
			return false;
		},

		showRequestBody = function () {
			switch ($(this).val()) {
			case "PUT":
			case "POST":
				$("[name=requestBody]").show();
				break;
			default:
				$("[name=requestBody]").hide();
				break;
			}
		};

	$(function () {
		responseParser = HATEOAS_CONSOLE.responseParsers.responseParser;
		$("#go").click(submitRequest);	
		$("#request").ajaxSend(logRequest);
		$("#response").ajaxComplete(logResponse);
		$("#response a").live("click", doGetRequest);
		$("#links a").live("click", doGetRequest);
		$("[name=verb]").change(showRequestBody);
		$("[name=requestBody]").hide();
	});

}());
