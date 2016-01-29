var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var Request = require("sdk/request").Request;
var text;

Request({
  url: "https://techblog.willshouse.com/2012/01/03/most-common-user-agents",
  onComplete: function (response) {
	console.log("made req");
	text = response.text;
	rest();
  }
}).get();
 
var rest = function() {
var text_entry = require("sdk/panel").Panel({
  contentURL: data.url("main.html"),
  contentScriptFile: [
	data.url("jquery-2.2.0.js"),
	data.url("pullData.js"),
  ],
  contentScriptOptions: {"message" : text}
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

// Show the panel when the user clicks the button.
function handleClick(state) {
  text_entry.show();
}

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
});

}
