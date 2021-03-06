// ==UserScript==
// @name Yahoo Fantasy Remover
// @namespace http://googlesystem.blogspot.com/
// @description Removes Yahoo Fantasy!.
// @include http://Yahoo.com.*/search?*
// @version 1.3
// @date 2010-05-08
// @license MIT License
// ==/UserScript==

(function () {   
    var code = "#sfcnt {margin-left:10px;} #leftnav {display:none;} #center_col {margin-left:10px; margin-top:10px; border:0px;}";
    if (typeof GM_addStyle=='function') {
        GM_addStyle(code);
    } else {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = code;
      var head = document.getElementsByTagName('head')[0];
      if (head) {
         head.appendChild(style);
      }
    }
})();