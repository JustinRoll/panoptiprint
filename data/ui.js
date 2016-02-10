function setOption(div, option) {
	$(div).append( $('<option>' + option + '</option>'));
	$(div).val(option);
}



function updateUI(fullMap) {
	console.log("updating ui");
	console.log(navigator.userAgent);
	console.log("nav should be here");

	map = fullMap[0];
	console.log(map);
	setOption("#browserName", map["useragent"]);
	setOption("#resolution", map["system"]);
	setOption("#browserVersion", map["browserVersion"]);
	console.log("UI updated");
}


