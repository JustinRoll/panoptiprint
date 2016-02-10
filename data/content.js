
function pullData() {

	$.ajax({
		type: "GET",
		url: "https://techblog.willshouse.com/2012/01/03/most-common-user-agents",
  		success: recieveData,
  		dataType: "text"

	});
}

function recieveData(data) {
	
	window.postMessage(data, "*");
	console.log("message sent");

}
//exportFunction(recieveData, unsafeWindow, {defineAs: "pullData"});
exportFunction(pullData, unsafeWindow, {defineAs: "pullData"});
