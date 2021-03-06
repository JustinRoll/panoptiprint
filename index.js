var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var Request = require("sdk/request").Request;
var text;
var text_entry;

var PrefServ = require('./PrefServ');
//var json = JSON.parse("./data/useragents.json");
//console.log(json);

 


text_entry = require("sdk/panel").Panel({
  contentURL: data.url("main.html"),
    width: 900,
  height: 400,
  onMessage: function(contentScriptMessage) {
    console.log("got UAmessage! it is " + contentScriptMessage);
    setAgent(contentScriptMessage);
  },
    // Handle message from the content script
  contentScriptFile: [
  data.url("jquery-2.2.0.js"),
	data.url("content.js"),
  data.url("ua-parser.js"),
  data.url("useragents.json"),
  data.url("ui.js"),
  data.url("pullData.js")

  ]
});

// Create a button
require("sdk/ui/button/action").ActionButton({
  id: "show-panel",
  label: "Show Panel",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});



// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
});


// Show the panel when the user clicks the button.
function handleClick(state) {
  text_entry.show();
}

function setAgent(userAgent) {
  prefs = require("sdk/preferences/service");
  prefs.set("general.useragent.override", userAgent);
  //prefs.set("general.useragent.vendor", "Opera");
  //prefs.set("general.appversion.override", "420");
}

//setAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36");
//setAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/601.4.4 (KHTML, like Gecko) Version/9.0.3 Safari/601.4.4")
//setAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36")
//setAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36")
//setAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0")
//setAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36")
//setAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36")
//setAgent("Mozilla/5.0 (Windows NT 10.0; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0")
//setAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36")
//setAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko")


