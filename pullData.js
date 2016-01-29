
console.log("pulldata loaded");
function scrapeData(var data) {
	agentMap = {};
	console.log("got here");
	var table = $("make-html-table most-common-user-agents");
    var header = table.find("th");
	var rows = table.find("tr")
	for(var i = 0; i < rows.length; i++) {
		var tds = rows.find("td");
		agentMap = {};
		map[i] = agentMap;
    	for (var j = 0; j < tds.length; j++) {
        	agentMap[header[j]] = tds[j];
		} 
    }
	return map; 
}

function scrapeAndSetUi(var data) {
	map = scrapeData(data);
	updateUi(map);
}

function pullMostCommon() {
	pullData("https://techblog.willshouse.com/2012/01/03/most-common-user-agents/");
}


function pullData(var urlToScrape) {

	$.ajax({
     	url: urlToScrape,
     	dataType: 'text',
     	success: scrapeAndSetUi(data)
     }
});
}
