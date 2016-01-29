
var html;
$.support.cors = true
var $input = $('<input type="button" id="soso" value="Pull Settings">').click(scrapeAndSetUi);
jQuery("body").append($input);
var map = {};
var html = self.options["message"];
console.log(html);

function scrapeData(data) {
	agentMap = {};
	console.log("got here scrape");
	console.log(html);
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


function scrapeAndSetUi() {
	console.log("scrape set ui")
	map = scrapeData(html);
	updateUi(map);
}


function doStuff(data) {
	console.log("test doStuff");
}

