// ==UserScript==
// @name          Youtube this week
// @namespace     youtube.com
// @description	Sorts youtube videos directly loaded on current week
// (ascending). It doesn't work at youtube.com home
// @author        Valmen
// @include       *youtube.com/*
// @exclude      *sort=*
// ==/UserScript==

window.location=window.location+'&search_sort=video_date_uploaded&uploaded=w'