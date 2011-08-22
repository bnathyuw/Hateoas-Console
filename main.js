$(function(){
	$("#go").click(submitRequest);	
	$("#request").ajaxSend(logRequest);
	$("#response").ajaxComplete(logResponse);
});

function submitRequest(){
	var verb = $("[name=verb]").val();
	var url = $("[name=url]").val();
	$.ajax({
		url: url,
		type: verb
	});
}

function logRequest(e, jqXHR, settings){
	var requestText = settings.type + " " + settings.url + "HTTP/1.1";
	if(jqXHR.requestText != undefined) requestText += "\n" + jqXHR.requestText;
	$(this).text(requestText);
}

function logResponse(e, jqXHR, textStatus){
	var responseText = "HTTP/1.1 " + jqXHR.status + " " + textStatus;
	responseText += "\n" + jqXHR.getAllResponseHeaders();
	if(jqXHR.responseText != undefined) responseText += "\n" + jqXHR.responseText;
	$(this).text(responseText);
}