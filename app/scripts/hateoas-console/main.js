/*global $:false */

(function () {
	"use strict";

	var submitRequest = function () {
			var verb = $("[name=verb]").val(),
				url = $("[name=url]").val(),
				settings = {
					url: url,
					type: verb
				},
				requestBody = $("[name=requestBody]").val();
			
			if (requestBody !== undefined) {
				settings.data = requestBody;
			}
			$.ajax(settings);
		},

		logRequest = function (e, jqXHR, settings) {
			var requestText = settings.type + " " + settings.url + " HTTP/1.1";
			if (settings.data !== undefined) {
				requestText += "\n\n" + settings.data;
			}
			$(this).text(requestText);
		},

		addLinks = function (input) {
			var urlRegex = /https?:\/\/([\S]+\.)+[A-Z]+(\/[a-z0-9\._\/~%\-\+&\#\?!=\(\)@]*)?/gi;	
			return input.replace(urlRegex, "<a href=\"$&\">$&</a>");
		},

		logResponse = function (e, jqXHR, settings) {
			var responseText = "HTTP/1.1 " + jqXHR.status,
				html;
			responseText += "\n" + jqXHR.getAllResponseHeaders();
			if (jqXHR.responseText !== undefined) {
				responseText += "\n\n" + jqXHR.responseText;
			}
			$(this).text(responseText);
			
			html = $(this).html();
			$(this).html(addLinks(html));
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
		$("#go").click(submitRequest);	
		$("#request").ajaxSend(logRequest);
		$("#response").ajaxComplete(logResponse);
		$("#response a").live("click", doGetRequest);
		$("[name=verb]").change(showRequestBody);
		$("[name=requestBody]").hide();
	});

}());
