
console.log("test");
window.addEventListener('message', function(event) {
        console.log("got message WHAT");
        map = scrapeData(event.data);
        updateUI(map);
      }, false);


function scrapeData(data) {
	agentMap = [];
	console.log(data);
	var table = $(data);
	console.log(table.text());
    var header = table.find("th");
	var rows = table.find("tr");

	header.each(function(idx, element) {
		console.log($.text(element));

	});

	console.log("Entering scrape loop");
	console.log(rows.length);

	for(var i = 0; i < rows.length; i++) {
		row = rows[i];
		console.log("got row");
		var tds = $(row).find("td");
		console.log("got tds " + tds.length);
		subMap = {};
		if (tds.length > 0 ) {
			agentMap.push(subMap);
    		for (var j = 0; j < tds.length; j++) {
        		subMap[$.text(header[j])] = $.text(tds[j]);
			} 
		}
    }
    console.log(agentMap);
	return agentMap; 
}

