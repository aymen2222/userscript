// Snipestreet user script
// version 0.2
// 2007-08-04
// Copyright (c) 2007
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// v.0.2 adds the option of opening SnipeStreet in a popup window
// To do this, set popup=1 below
// Based on the AuctionSniper script by Scott Winder
// at http://userscripts.org/scripts/show/3410
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Add to SnipeStreet
// @description   Adds a "SnipeStreet" button to eBay auction pages
// @include       http://cgi.ebay.tld/*
// ==/UserScript==

 var popup=0

 var idLoc = location.pathname.indexOf("QQitemZ");
 var itemId, endLoc, btnHTML;

 if (idLoc != -1) {
     idLoc += 7;
     endLoc = location.pathname.indexOf( "QQ", idLoc );
     itemId = location.pathname.substring( idLoc, endLoc );
 } else {
     idLoc = location.search.indexOf("&item=");
     if ( idLoc != -1 ) {
         idLoc += 6;
         var endLoc = location.search.indexOf( "&", idLoc );
         if ( endLoc <= idLoc ) {
             endLoc = location.search.length;
         }
         itemId = location.search.substring( idLoc, endLoc );
     }
 }

 if (idLoc != -1) {
    
     var watchCell = document.getElementById("watching");
    
     if (watchCell) {
         var snipeCell = document.createElement("td");
         snipeCell.id = "sniping";
         snipeCell.setAttribute("valign", "top");
         snipeCell.setAttribute("nowrap", "");
         snipeCell.setAttribute("align", "right");
         watchCell.parentNode.insertBefore(snipeCell, watchCell);
         onsubmit='window.open("",this.target,"height=500,width=500,resizable=yes,scrollbars=yes,status=no");return true;'
         var snipeBtn = document.createElement("div");
         btnHTML= '<form name="form1" method="post" action="http://snipestreet.com/" ';
            if(popup==1) {
               btnHTML=btnHTML+'target="newpopup" onsubmit='+ onsubmit;
            }
            btnHTML=btnHTML+ '>'+
            '<input type="hidden" name="itemnum" value="' + itemId + '">'+
            '<input type="submit" name="Submit" value="SnipeStreet" class="navigation"><br>'+
            '<input type="hidden" name="isMotors" value="no">'+
            '<input type="hidden" name="signal" value="getitem">'+
            '</form></div>';
         snipeBtn.innerHTML = btnHTML;       
         snipeCell.appendChild(snipeBtn);
     }
 }
