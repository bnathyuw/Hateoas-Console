$(function(){
	$("#go").click(submitRequest);	
});

function submitRequest(){
	var verb = $("[name=verb]").val();
	var url = $("[name=url]").val();
	$.ajax({
		url: url,
		type: verb,
		beforeSend: alogRequest,
		complete: alogResponse
	});
}

function logRequest(jqXHR, settings){
	var requestText = settings.type + " " + settings.url + "HTTP/1.1";
	if(jqXHR.requestText != undefined) requestText += jqXHR.requestText;
	$("#request").text(requestText);
}

function logResponse(jqXHR, textStatus){
	var responseText = "HTTP/1.1 " + jqXHR.status + " " + textStatus;
	responseText += "\n" + jqXHR.getAllResponseHeaders();
	$("#response").text(responseText);
}