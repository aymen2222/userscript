// Generated by brownelfchan and anonymous
// ==UserScript==
// @name        foolz helper
// @version     1.0
// @namespace   Foolz Helper
// @description Highlights deleted posts on Foolz Archive.
// @license     MIT License
// @match       *://archive.foolz.us/*
// @grant       GM_getValue
// @grant       GM_setValue
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFbk5BOyojtsC5vgAAACdJREFUeNpiYMQBGHCBUQ2jGkY1jGqgsYbRwBjVMKphVMMg0wAQYAC2XASBVT/C8QAAAABJRU5ErkJggg
// ==/UserScript==

(function() {
     
    var items = document.getElementsByClassName("icon-trash");
    var stylestr = "padding:5px;margin-left:.5em;border-color:#faa;border:2px solid rgba(255,0,0,1);border-radius:2px";
    for (i = 0; i < items.length; i++) 
    {
        items[i].parentElement.parentElement.parentElement.parentElement.setAttribute("style", stylestr);
    }

  Main.init();

}).call(this);