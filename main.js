$(function(){
	$("#go").click(submitRequest);	
	$("#request").ajaxSend(logRequest);
	$("#response").ajaxComplete(logResponse);
	$("#response a").live("click", doGetRequest);
	$("[name=verb]").change(showRequestBody);
	$("[name=requestBody]").hide();
});

function submitRequest(){
	var verb = $("[name=verb]").val();
	var url = $("[name=url]").val();
	var settings = {
		url: url,
		type: verb
	};
	var requestBody = $("[name=requestBody]").val();
	if(requestBody != undefined) settings.data = requestBody;
	$.ajax(settings);
}

function logRequest(e, jqXHR, settings){
	var requestText = settings.type + " " + settings.url + " HTTP/1.1";
	if(settings.data != undefined) requestText += "\n\n" + settings.data;
	$(this).text(requestText);
}

function logResponse(e, jqXHR, settings){
	var responseText = "HTTP/1.1 " + jqXHR.status;
	responseText += "\n" + jqXHR.getAllResponseHeaders();
	if(jqXHR.responseText != undefined) responseText += "\n\n" + jqXHR.responseText;
	$(this).text(responseText);
	
	var html = $(this).html();
	$(this).html(addLinks(html));
}

function doGetRequest(){
	var url = this.href;
	$("[name=url]").val(url);
	
	var verb = "GET";
	$("[name=verb]").val(verb);
	
	$.ajax({
		url: url,
		verb: verb
	});
	
	$("[name=requestBody]").hide();
	return false;
}

function showRequestBody(){
	switch($(this).val())
	{
		case "PUT":
		case "POST":
			$("[name=requestBody]").show();
			break;
		default:
			$("[name=requestBody]").hide();
			break;
	}
}

function addLinks(input){
	var urlRegex = /https?:\/\/([\S]+\.)+[A-Z]+(\/[a-z0-9\._\/~%\-\+&\#\?!=\(\)@]*)?/gi;	
	return input.replace(urlRegex, "<a href=\"$&\">$&</a>");
}