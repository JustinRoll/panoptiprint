var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var Request = require("sdk/request").Request;
var text;
var text_entry;

var PrefServ = require('./PrefServ');

 


text_entry = require("sdk/panel").Panel({
  contentURL: data.url("main.html"),
  contentScriptFile: [
  data.url("jquery-2.2.0.js"),
	data.url("content.js")]
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
  prefs.set("general.useragent.vendor", "Opera");
  prefs.set("general.appversion.override", "420");
}

setAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36");
console.log("agent should be set now");

