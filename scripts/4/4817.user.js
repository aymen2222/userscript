// ==UserScript==
// @name	        Last.fm - My Top Tracks - Fixed
// @namespace      http://bear.unixbsd.info/~zaltan/lastfm/
// @description    Shows any tracks on Last.fm artist pages that you've listened to by that artist.
// @include        http://www.last.fm/music/*
// ==/UserScript==

/* CUSTOM VARIABLES */
// chartLimit:		Maximum number of songs to display in "My Top Tracks" on
//					each artist's page. Set to 0 for no limit. Default is 10.
var chartLimit = 20;

// cacheTimeout:	Script will use the cache for this amount of time (in
//					minutes) before updating. Set to 0 to disable cacheing.
//					Default is 60 * 24 (60 mins in an hour * 24 hours in a
//					day = daily). [NB: * is multiplication.]
var cacheTimeout = 60 * 24;

/* SCRIPT */
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function escape2(str) {
	var times;
	if (arguments.length < 2) {
		times = 1;
	} else {
		times = arguments[1];
	}
	for (var i = 0; i < times; i++) {
		str = encodeURIComponent(str).replace(/\%20/g, "+");
	}
	return str;
}

function unescape2(str) {
	var times;
	if (arguments.length < 2) {
		times = 1;
	} else {
		times = arguments[1];
	}
	for (var i = 0; i < times; i++) {
		str = decodeURIComponent(str.replace(/\+/g, "%20"));
	}
	return str;
}

function doChart(xml, username, artist) {
	var XMLtracks = xml[0].tr;
	var tracks = new Array();
	var lastPos = 0;
	var lastCount;
	var j = 0;
	var extratd = 1;
	for (var i = 0; i < XMLtracks.length(); i++) {
		var trackURL = XMLtracks[i].td[1].span.a.@href;
		var re = /\/music\/([^\/]+)\/_\/([^\/]+)/;
		if(extratd == 1) {
			trackURL = XMLtracks[i].td[2].span.a.@href;
		}
		var matches = re.exec(trackURL);
		if (matches == null) {
			continue;
		}
		var currArtist = matches[1];
		var currName = matches[2];
		if(extratd == 1) {
			currCount = XMLtracks[i].td[3].div.span;
			extratd = 0;
		} else {
			var currCount = XMLtracks[i].td[2].div.span;
		}
		if (unescape2(currArtist) != artist) {
			continue;
		}
		tracks[j] = new Array();
		tracks[j]["name"] = currName;
		tracks[j]["count"] = currCount;
		if (j == 0) {
			tracks[0]["pos"] = 1;
			var maxCount = tracks[0]["count"];
		} else {
			if (tracks[j]["count"] == lastCount) {
				tracks[j]["pos"] = lastPos;
			} else {
				tracks[j]["pos"] = j + 1;
			}
		}
		tracks[j]["width"] = Math.max(12, Math.round(tracks[j]["count"] / maxCount * 100));
		lastPos = tracks[j]["pos"];
		lastCount = tracks[j]["count"];
		j++;
	}
	if (tracks.length < 1) {
		return;
	}
	var barCharts = xpath("//a[@title='More top tracks...']");
	var insertBeforeHere = barCharts.snapshotItem(barCharts.snapshotLength - 1);
	var newnode = document.createElement("div");
	newnode.setAttribute("id", "mychart");
	newnode.setAttribute("style", "width: 100%;");
	
	insertBeforeHere.parentNode.parentNode.insertBefore(newnode, insertBeforeHere.parentNode);
	var mychart = document.getElementById("mychart");
	if (!mychart) {
	  return;
	}
	if (chartLimit < 1) {
	  chartLimit = 500;
	}
	var HTML = "<h3><a href=\"/user/"+escape2(username)+"/charts/&charttype=overall&subtype=track\" title=\"More top tracks...\">Top Tracks (me)</a></h3><div ><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" class=\"barChart\">";
	var firstitem = 1;
	for (var k = 0; k < tracks.length && k < chartLimit; k++) {
		HTML += "<tr><td class=\"position\">"+tracks[k]["pos"]+"</td>"+(firstitem?"<td class=\"separator\" rowspan=\"20\"><span>&nbsp;</span></td>":"")+"<td width=\"50%\" class=\"subject\"><span><a title=\""+unescape2(tracks[k]["name"], 2)+"\" href=\"/music/"+artist+"/_/"+tracks[k]["name"]+"\">"+unescape2(tracks[k]["name"], 2)+"</a></span></td><td style=\"width: 50%;\" class=\"quantifier\"><div style=\"width:"+tracks[k]["width"]+"%;\"><span>"+tracks[k]["count"]+"</span></div></td></tr>";
		firstitem = 0;
	}
	HTML += "</table></div></div><p class=\"chartmore\"><span>for me</span><span class=\"li\"><a href=\"/user/"+escape2(username)+"/charts/&charttype=overall&subtype=track\">More top tracks...</a></span></p>";
	mychart.innerHTML = HTML;
}

function fixHTML(html) {
	var re = /<table [^>]+>(.|\n)+<\/table>/;
	var matches = re.exec(html);
	if (matches == null) {
	  return 0;
	} else {
	  return matches[0];
	}
}

(function() {
	if (!location.href.match(/^http\:\/\/www\.last\.fm\/music\/([^\/]+)[\/]*$/, "i")) {
		return;
	}
	var usernameLink = xpath("//span");
	if (usernameLink.snapshotLength > 0) {
		var username = usernameLink.snapshotItem(0).innerHTML;
	} else {
		return;
	}
	var artistHTML = xpath("//div[@id='LastHeadline']/h1");
	if (artistHTML.snapshotLength > 0) {
		var artist = artistHTML.snapshotItem(0).firstChild.innerHTML;
	} else {
		return;
	}
	var usedCache = 0;
	if (cacheTimeout > 0) {
		var cacheTimestamp = GM_getValue("mytoptracks_"+username+"_timestamp", 0);
		var d = new Date();
		var currentTimestamp = Math.ceil(d.getTime() / 60000);
		if (currentTimestamp - cacheTimestamp <= cacheTimeout) {
			var cacheValue = GM_getValue("mytoptracks_"+username+"_xml", 0);
			if (cacheValue) {
				var xml = new XML(cacheValue);
				doChart(xml, username, artist);
				usedCache = 1;
			}
		}
	}
	if (!usedCache) {
		GM_xmlhttpRequest({
			method: "GET",
					url: "http://www.last.fm/user/" + escape2(username) + "/charts/?charttype=overall&subtype=track",
			onload: function(responseDetails) {
					var xmlText = fixHTML(responseDetails["responseText"]).replace('&nbsp;', '');
					var regexp = /\s&\s/g;
					xmlText = xmlText.replace(regexp, "foo");
				if (!xmlText) {
					return;
				}
				if (cacheTimeout > 0) {
					var d = new Date();
					var currentTimestamp = Math.ceil(d.getTime() / 60000);
					GM_setValue("mytoptracks_"+username+"_timestamp", currentTimestamp);
					GM_setValue("mytoptracks_"+username+"_xml", xmlText);
				}
				
				var xml = new XML(xmlText);
				doChart(xml, username, artist);
			}
		});
	}
})();

