// ==UserScript==
// @name           Exite Spammer & Advert Removal V4
// @namespace      http://www.combocentral.de
// @description    Removes all Spammers and Adverts and will be updated everytime a new spammer appears!
// @include        http://www.exitemod.com/forums/*
// @include        http://exitemod.com/forums/*

// ==/UserScript==

    var tbody = document.getElementsByTagName('tbody')
    for (var i=1; i<tbody.length; i++){
if ((tbody[i].innerHTML.match('showuser=1133">myg0t_owns_yuo</a></span>')) || 
(tbody[i].innerHTML.match('showuser=1139">')) || 
(tbody[i].innerHTML.match('Thank you for collaborating.')) || 
(tbody[i].innerHTML.match('showuser=011233">')) || 
(tbody[i].innerHTML.match('showuser=1137">rladudrbs</a></span>')) || 
(tbody[i].innerHTML.match('showuser=1147">Spam Man</a></span>')) || 
(tbody[i].innerHTML.match('showuser=1128">MPMES</a></span>')) || 
(tbody[i].innerHTML.match('showuser=1129">myg0t</a></span>')) || 	    	    (tbody[i].innerHTML.match('showuser=1116">thespammer69</a></span>')) || 	    	   	(tbody[i].innerHTML.match('showuser=962">thisisseth</a></span>'))) {
            var d2 = tbody[i].parentNode; 
            d2.parentNode.removeChild(tbody[i].parentNode.nextSibling)
			d2.parentNode.removeChild(tbody[i].parentNode)
			i--;
        }
    }
	