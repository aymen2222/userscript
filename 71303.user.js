// ==UserScript==
// @name           WF Colony Resource Link
// @namespace      http://unidomcorp.com
// @description    Creates a link for the Colony Mining directly to build_facility.php
// @include        http://*.war-facts.com/extras/colony_res.php*
// ==/UserScript==
var build = "http://"+window.location.hostname+"/build_facility?colony="+getURLParam('colony');
for (var i = 1; i <=11; i++) {
	res.rows[i].cells[0].innerHTML = res.rows[i].cells[0].innerHTML.link(build+"&type=1&subtype="+i);
	res.rows[i].cells[0].childNodes[0].target = "maingame";
}


function getURLParam(strParamName){
	var strReturn = "";
	var strHref = window.location.href;
	if ( strHref.indexOf("?") > -1 ) {
		var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
		var aQueryString = strQueryString.split("&");
		}
	return strReturn;
}