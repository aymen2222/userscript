// ==UserScript==
// @name           eurovisits
// @namespace      -
// @description    auto clicks eurovisits ads
// @include        http://eurovisits.org/surf.php
// ==/UserScript==

//original script by dt (bux.to), modified by flameboy


const surfTable = '//a [@href="http://eurovisits.org/advertise.php"]';
const linksx = '//a[@href]';
var currentWindow;
var currentElement;
var links;

	var surf = document.evaluate(surfTable, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	var container = document.createElement('div');
	
	var button = document.createElement('button');
	button.innerHTML = "Start";
	button.addEventListener('click', startSurf, false);
	container.appendChild(button);
	
	var clear = document.createElement('button');
	clear.innerHTML = "Clear log";
	clear.addEventListener('click', clearDebug , false);
	container.appendChild(clear);
		
	container.appendChild(document.createElement('br'));
	
	var progress = document.createElement('textarea');
	progress.style.width = "100%";
	progress.style.height = "7em";
	progress.setAttribute('readonly', 'true');
	container.appendChild(progress);
	
	surf.parentNode.insertBefore(container, surf);
	
	startSurf();
	
	

function adwatchDone(){
	debug('DONE moving to next..');
	
	
	var strike = document.createElement('strike');
	strike.setAttribute('style', 'color: #660000');
	strike.innerHTML = currentElement.innerHTML;
	currentElement.parentNode.replaceChild(strike, currentElement);
	
	setTimeout(function(){
		currentWindow.close();
		processLink();
	}, 2000);
}

var watcher;

function watchLocation(){
	
	//currentWindow.onLoad.apply(currentWindow,[]);
	
	watcher = setInterval(function(){
		
		var frames = currentWindow.document.getElementsByName('success');
		var frame = frames[0];
		debug('check_' + frame.contentWindow.location.href);
		if(frame.contentWindow.location.href.match("success.php")){
			adwatchDone();
			clearInterval(watcher);
		}
	}, 5000);
	
	
	currentWindow.currentElement = currentElement;
}


function processLink(){
	var element = links.pop();
	
	if(element){
		debug('processing: ' + element.href);
		currentElement = element;
		var url = element.getAttribute('href');
		currentWindow = window.open(url);
		currentWindow.addEventListener('DOMContentLoaded', watchLocation, false);
		debug('opened window, waiting...');
	}else{
		debug('finished all links');
		// currentWindow.close();
		setTimeout("location.reload(true);",10000);
	}
}

function getLinks(){
	var links = document.evaluate(linksx, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var work = [];

	for(var i=0;i<links.snapshotLength;i++){
		var item = links.snapshotItem(i);
		if (((item.href.substring(0,34)=='http://eurovisits.org/view.php?ad=') ||
			(item.href.substring(0,35)=='http://eurovisits.org/viewp.php?ad=')) &&
			(!(item.href=='http://eurovisits.org/viewp.php?ad=') &&
			!(item.href=='http://eurovisits.org/view.php?ad=')))
			work.push(item);
	}
	
	return work;
}



function startSurf(){
	debug('Started');
	button.setAttribute('disabled', 'disabled');
	links = getLinks();
	links.reverse();
	debug("URLS: " + links);
	processLink();
}

function clearDebug(){
	progress.value = "";
}

function debug(str){
	if(progress.value.length >= 1){
		progress.value += "\n" + str;
	}else{
		progress.value = str;
	}
	progress.scrollTop = progress.scrollHeight;

}