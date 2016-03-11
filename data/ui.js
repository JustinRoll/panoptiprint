

$(document).ready(
	(function() {
		$('#userAgent').on('change', function() {
			console.log("sending ua message:" + this.value);
  			self.postMessage(this.value);
  			console.log("ua message sent");
  			
		});

		$('#browserName').on('change', 
			function() {
    			filterChange();
    		});
		$('#browserVersion').on('change', 			
			function() {
    			filterChange();
    		});
		$('#os').on('change',
			function() {
    			filterChange();
    		});
		setup(agentMap);


}));

function filterChange() {
	console.log("filter change");
	filters = {};
	filters["os"] = $('#os').val();
	filters["browser"] = $('#browserName').val();
	filters["browserVersion"] = $('#browserVersion').val();
	newMap = filterMap(agentMap, filters);
	console.log("new map is here");
	console.log(newMap);
	updateAgents(newMap);
}

function updateAgents(newMap) {
	console.log("updating agents");
	$("#userAgent").empty();
	for (var i = 0; i < newMap.length; i++) {
		var subMap = newMap[i];
		setOption("#userAgent", subMap["useragent"]);
	}
}

function setup(fullMap) {
	console.log("setting up parser");
	var parser = new UAParser();

	var uas = {};
	var browsers = {};
	var versions = {};
	var os = {};

	console.log("setting up UI");


	for (var i = 0; i < fullMap.length; i++) {
		var subMap = fullMap[i];
		parser.setUA(subMap["useragent"]);

    	var result = parser.getResult();
    	uas[result["ua"]] = true;
    	browsers[result["browser"]["name"]] = true;
    	versions[result["browser"]["major"]] = true;
    	os[result["os"]["name"]] = true;

		setOption("#userAgent", subMap["useragent"]);
	}

	$('#userAgent').empty();
	for (var k in uas) {
		setOption("#userAgent", k);
	}

	$("#browserName").empty();
	for (var brows in browsers) {
		setOption("#browserName", brows);
	}
	setOption("#browserName", "All");

	$("#browserVersion").empty();
	for (var vers in versions) {
		setOption("#browserVersion", vers);
	}
	setOption("#browserVersion", "All");

	$("#os").empty();
	for (var o in os) {
		setOption("#os", o);
	}
	setOption("#os", "All");

	//setOption("#browserName", map["useragent"]);
	//setOption("#resolution", map["system"]);
	//setOption("#browserVersion", map["browserVersion"]);

}



function setOption(div, option) {
	$(div).append( $('<option>' + option + '</option>'));
	$(div).val(option);
}
/*
   {  
      "percent":"7.0%",
      "useragent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36",
      "system":"Chrome Generic Win7 64-bit",
      "user_agent_string_md5":"06d3d9617a2883877c8f5e774e52c741"
   },
   */

   /*
{  
   "ua":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2",
   "browser":{  
      "name":"Chromium",
      "version":"15.0.874.106",
      "major":"15"
   },
   "engine":{  
      "version":"535.2",
      "name":"WebKit"
   },
   "os":{  
      "name":"Ubuntu",
      "version":"11.10"
   },
   "device":{  

   },
   "cpu":{  
      "architecture":"amd64"
   }
}

   */

function passesFilters(agent, filters) {
	var count = 0;
	var parser = new UAParser();

    
    parser.setUA(agent);

    var pua = parser.getResult();

	for (var filter in filters) {
		val = filters[filter];
		if (filter == "os") {
			if (pua["os"]["name"] == filters[filter] || filters[filter] == "All") {
				count++;
			}
		}
		else if (filter == "browser") {
			if (pua["browser"]["name"] == filters[filter] || filters[filter] == "All") {
				count++;
			}

		}
		else if (filter == "browserVersion") {
			if (pua["browser"]["major"] == filters[filter] || filters[filter] == "All") {
				count++;
			}
		}
	}
	console.log("passed filter count: " + count);
	console.log("total length " + Object.keys(filters).length);

	return count == Object.keys(filters).length;
}



   
function filterMap(fullMap, filters) {
	console.log("test");
	newList = [];
	for (var i = 0; i < fullMap.length; i++) {
 			map = fullMap[i];
 			var agent = map["useragent"];
 			if (passesFilters(agent, filters)) {
 				console.log("appending map");
 				newList.push(map);
 			}

 	}

 	return newList;


}



