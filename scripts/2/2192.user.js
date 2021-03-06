// Nana TalkBack Stripper
// version 3.0
// 2008-04-08
// Copyright (c) 2008, Ran Yaniv Hartstein
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Nana TalkBack Stripper", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Nana TalkBack Stripper
// @author          Ran Yaniv Hartstein <http://ranh.co.il/>
// @namespace       http://www.brunotorres.net/greasemonkey/
// @description     Removes the talkback section from Nana.co.il
// @include         http://*nana10.co.il*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); div#AddMsg_TopLink {display: none !important; visibility: hidden !important;} #OpenTalkbackLink {display: none !important; visibility: hidden !important;} #oTalkBack {display: none !important; visibility: hidden !important;} ";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
