// ==UserScript==
// @name        HUKD Hide ClickSnap deals
// @namespace   none
// @description Hide any deals which mention ClickSnap in the title.
// @include     http://www.hotukdeals.com/*
// @version     2.0
// @grant       none
// ==/UserScript==

var regex = /ClickSnap|Click\&Snap|Click \& Snap|Snap \& Save|shopitize/ig;

//Fix body of page
var snapResults = document.evaluate("//ul[@class='structure s-items s-items-listings detail-view']/li", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
	var elm = snapResults.snapshotItem(i);
        itemText = elm.textContent.trim();
	var result = itemText.match(regex);
	if (result != null)
	{
          snapResults.snapshotItem(i).style.display="none"; 
        }
}

//Fix the Hot Deals panels
//This time we use innerHTML instead of textContent, as the full title is hidden away in the tooltip
var snapResults2 = document.evaluate("//div[@id='sidebar-hottest-deals']/ul/li", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults2.snapshotLength - 1; i >= 0; i--) {
	var elm = snapResults2.snapshotItem(i);
        itemText = elm.innerHTML.trim();
	var result = itemText.match(regex);
	if (result != null)
	{
          snapResults2.snapshotItem(i).style.display="none"; 
        }
}