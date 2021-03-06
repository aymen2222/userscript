// ==UserScript==
// @name          Tumblr - Fix Reblog Quotes
// @namespace     http://userscripts.org
// @description	  Fits the reblog quotes in a smaller space for easier reading.
// @author        Stephen Elliot
// @include       http://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "div.post_content blockquote {margin-left:0 !important; padding-left:10px !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
