// ==UserScript==
// @name            ToN Power bot
// @description     ToN Tools - Remodeled by Jinster & Emma
// @include         *
// ==/UserScript==

if ((window.location.href.indexOf('http://www.kabam.com/thirst-of-night/play') != 0) && 
    (window.location.href.indexOf('https://www.kabam.com/thirst-of-night/play') != 0) &&
    ((window.location.href.indexOf('http://s-static.ak.facebook.com/connect/xd_arbiter.php') != 0) ||
        (window.location.href.indexOf('thirst-of-night') === -1)) && 
    ((window.location.href.indexOf('https://s-static.ak.facebook.com/connect/xd_arbiter.php') != 0) ||
        (window.location.href.indexOf('thirst-of-night') === -1)) && 
    (window.location.href.indexOf('http://kabam1-a.akamaihd.net/pixelkabam/html/pixels/KabamComTON') != 0) &&
    (window.location.href.indexOf('https://kabam1-a.akamaihd.net/pixelkabam/html/pixels/KabamComTON') != 0) &&
    (window.location.href.indexOf('http://kabam1-a.akamaihd.net/pixelkabam/html/pixels/kabamcomton') != 0) &&
    (window.location.href.indexOf('https://kabam1-a.akamaihd.net/pixelkabam/html/pixels/kabamcomton') != 0) &&
    (window.location.href.indexOf('http://www.thirstofnight.com/platforms/kabam') != 0) &&
    (window.location.href.indexOf('https://www.thirstofnight.com/platforms/kabam') != 0) &&
    ((window.location.href.indexOf('http://static.ak.facebook.com/connect/xd_arbiter.php') != 0) ||
        (window.location.href.indexOf('thirst-of-night') === -1)) && 
    ((window.location.href.indexOf('https://static.ak.facebook.com/connect/xd_arbiter.php') != 0) ||
        (window.location.href.indexOf('thirst-of-night') === -1)) && 
    (window.location.href.indexOf('http://apps.facebook.com/thirstofnight') != 0) &&
    (window.location.href.indexOf('https://apps.facebook.com/thirstofnight') != 0) &&
    (window.location.href.indexOf('http://plus.google.com') != 0) && 
    (window.location.href.indexOf('https://plus.google.com') != 0) && 
    (window.location.href.indexOf('http://plusone.google.com') != 0) && 
    (window.location.href.indexOf('https://plusone.google.com') != 0) && 
    (window.location.href.indexOf('http://accounts.google.com') != 0) && 
    (window.location.href.indexOf('https://accounts.google.com') != 0) && 
    (window.location.href.indexOf('-opensocial.googleusercontent.com') === -1) && 
    (window.location.href.indexOf('http://talkgadget.google.com') != 0) && 
    (window.location.href.indexOf('https://talkgadget.google.com') != 0) && 
    (window.location.href.indexOf('http://www.googleapis.com') != 0) && 
    (window.location.href.indexOf('https://www.googleapis.com') != 0)) {
    return;
}

var kabam_iframe_id = 'game_frame';
if (document.getElementById(kabam_iframe_id) != null) { 
    var timeout = 20000;
    var fragmentIndex = window.location.href.indexOf("#");
    if (fragmentIndex != -1) {
        var fragment = window.location.href.substring(fragmentIndex + 1);
        
        var equalsIndex = fragment.indexOf("=");
        if (equalsIndex != -1) {
            var name = fragment.substring(0, equalsIndex);
            var value = fragment.substring(equalsIndex + 1);
            
            if (name.toLowerCase() == "loadafter") {
                timeout = parseInt(value) * 1000;
            }
        }
    }
    setTimeout(make_space, timeout);
    return;
}
function make_space() {
    var content = document.getElementById('content');
    content.style.height = (parseInt(content.style.height) + 350) + "px";
    var frame = document.getElementById(kabam_iframe_id);
    frame.style.height = (parseInt(frame.style.height) + 350) + "px";
 {
    }
}
var serverTimeOffset = 0;
function is_defined(value) {
    if ((typeof value != 'undefined') && (value != null)) {
        return true;
    }
    return false;
}
function toQueryString(params) {
    if (!is_defined(params)) { return ''; }
    var queryStr = "";
        
    var name;
    for (name in params) {
        if (queryStr === "") {
            queryStr = name + "=" + params[name];
        } else {
            queryStr = queryStr + "&" + name + "=" + params[name];
        }
    }
    return queryStr.replace(/\_/g, '%5F');
}
function serverTime() {
	return parseInt(new Date().getTime() / 1000) + serverTimeOffset;
}
if (typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
function decodeEntity(str) {
	var ta = document.createElement('textarea');
	ta.innerHTML = str; 
	return ta.value;
}
function parseQuotedParams(str) {
	var params = {};
    if (!is_defined(str)) { return params; }

	var pattern = /\s*(.*?)\s*=\s*('|")(.*?)\2/g;
	var match;
	while ((match = pattern.exec(str)) !== null) {
		params[match[1]] = match[3];
	}
	return params;
}
function replaceAll(str, replace_this, with_this) {
    if (!is_defined(str)) return null;
    if (!is_defined(replace_this) || !is_defined(with_this)) return str;

    var presentAt = str.indexOf(replace_this);
    while (presentAt != -1) {
	str = str.replace(replace_this, with_this);
	presentAt = str.indexOf(replace_this);
    }
    return str;
}
function disable_element_recursively(elem) {
    if (!is_defined(elem) || !elem) return;

    elem.disabled = true;
    if (elem.childNodes && (elem.childNodes.length > 0)) {
        for (var i = 0; i < elem.childNodes.length; i++) {
            disable_element_recursively(elem.childNodes[i]);
        }
    }
}
function add_style(style_spec, document_to_add_to) {
    if (!is_defined(document_to_add_to) || !document_to_add_to) { document_to_add_to = document; }
    if (!is_defined(style_spec)) { return; }
    
	var target = document_to_add_to.getElementsByTagName('head')[0];
	var obj = document_to_add_to.createElement('style');
	obj.type = 'text/css';
	obj.appendChild(document_to_add_to.createTextNode(style_spec));
	target.appendChild(obj);
}
function get_if_number(numOrStr) {
    if (!is_defined(numOrStr) || !numOrStr) return 0;
    return parseInt(numOrStr);
}
function set_popup_stylesheet(document_to_add_to) {
    if (!is_defined(document_to_add_to) || !document_to_add_to) { document_to_add_to = document; }
    
    var style = '.popup_outer {\
 border: 0px solid #777;\
 padding-left:1px;\
 padding-right:13px;\
		padding-bottom:3px;\
		border-radius: 5px;\
		-moz-border-radius: 5px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 5px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 5px;\
	}\
	.popup_close {\
		position: absolute;\
		display:block;\
		right:6px;\
		margin-top:-1px;\
		width:30px;\
		height:18px;\
		text-align:center;\
		color:#fff;\
		background-color:#555;\
		font-weight:bold;\
		font-size:12px !important;\
		padding:1px;\
		border: 1px solid #666;\
		border-radius: 15px;\
		-moz-border-radius: 5px;\
		cursor: pointer;\
	}\
	.popup_close:hover {\
		background-color:#922;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
	}\
	.popup_bar:hover {\
		cursor: move;\
	}';
	add_style(style, document_to_add_to);
}

var script_windows = {};
function PopUp(name, main_content, x, y, width, height, onClose, document_to_add_to) {
    if (!is_defined(name) || !name) { return null; }
    if ((width <= 0) || (height <= 0)) {
        return null;
    }
    
    if (!is_defined(document_to_add_to) || !document_to_add_to) { document_to_add_to = document; }
    
	var popup_window = script_windows[name];
	if (popup_window) {
		popup_window.show(false);
		return popup_window;
	}
	this.BASE_ZINDEX = 100;

	this.show = show;
	this.getLayer = getLayer;
	this.setLayer = setLayer;
	this.getLocation = getLocation;
	this.focusMe = focusMe;
	this.unfocusMe = unfocusMe;
	this.destroy = destroy;

	this.div = document_to_add_to.createElement('div');
	document_to_add_to.body.appendChild(this.div);
	this.name = name;
	this.onClose = onClose;

	if (x < 0 || x > document_to_add_to.body.offsetWidth) { x = 0; }
	if (y < 0 || y > document_to_add_to.body.offsetHeight) { y = 0; }

	var popupParts = ['outer', 'bar', 'top', 'main', 'close'];
	for (var ind = 0; ind < popupParts.length; ind++) {
		popupParts[popupParts[ind]] = name + '_' + popupParts[ind];
	}
	this.div.id = popupParts['outer'];
	this.div.className = 'popup_outer';
	this.div.style.zIndex = this.BASE_ZINDEX;
	this.div.style.position = 'absolute';
	this.div.style.display = 'none';
	this.div.style.width = width + 'px';
	this.div.style.height = height + 'px';
	this.div.style.top = (y || 0) + 'px';
	this.div.style.left = (x || 0) + 'px';

	var content = '<span id="' + popupParts['close'] + '" class="popup_close">X</span>\
			<table cellspacing=0 width=100% height=100%>\
			    <tr id="' + popupParts['bar'] + '" class="popup_bar">\
				    <td width=100% valign=bottom>\
				        <span id="' + popupParts['top'] + '" class="popup_top"></span>\
				    </td>\
			    </tr>\
			    <tr>\
			        <td height=100% valign=top colspan=2 id="' + popupParts['main'] + '" class="popup_main"></td>\
			    </tr>\
			</table>';

	this.div.innerHTML = content;
	document_to_add_to.getElementById(popupParts['close']).addEventListener('click', e_XClose, false);

    var main_window = document_to_add_to.getElementById(popupParts['main']);
    main_window.innerHTML = main_content;
       
    var event_target = this;
	script_windows[name] = this;
	function e_XClose() {
		event_target.show(false);
		if (is_defined(event_target.onClose)) {
			event_target.onClose();
		}
	}
	function focusMe() {
		this.setLayer(5);
	}
	function unfocusMe() {
		this.setLayer(-5);
	}
	function getLocation() {
		return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
	}
	function destroy() {
		document_to_add_to.body.removeChild(this.div);
		delete script_windows[this.name];
	}
	function setLayer(zi) {
		this.div.style.zIndex = '' + (this.BASE_ZINDEX + zi);
	}
	function getLayer() {
		return parseInt(this.div.style.zIndex) - this.BASE_ZINDEX;
	}
	function show(isShow) {
		if (isShow) {
			this.div.style.display = 'block';
			this.focusMe();
		} else {
			this.div.style.display = 'none';
		}
		return isShow;
	}
	return this;
}
function AjaxRequest(url, opts) {
    if (!is_defined(url)) { return; }
    if (!is_defined(opts)) { return; }
    
	var timer = null, ajax, headers = {}, h, params;

	params = typeof opts.parameters === 'string' ? opts.parameters : toQueryString(opts.parameters);

	if (opts.method != 'GET') {
		headers['content-type'] = 'application/x-www-form-urlencoded';
	} else {
		url = url + ((url.indexOf('?') !== -1) ? '&' : '?') + params;
	}

	ajax = new XMLHttpRequest();
	if (opts && opts.headers && opts.headers.overrideMime) {
	    ajax.overrideMimeType(opts.headers.overrideMime); 
	} else {
    	headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
	}
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			clearTimeout(timer);
			var response = {
				responseText	: ajax.responseText,
				status			: ajax.status,
				statusText		: ajax.statusText,
				ajax			: ajax
			};
			if ((ajax.status >= 200 && ajax.status < 300) || ajax.status == 304) {
				if (opts.onSuccess) {
    				opts.onSuccess(response);
				}
			} else {
				if (opts.onFailure) {
					opts.onFailure(response);
				}
				if (opts['on' + ajax.status]) {
					opts['on' + ajax.status](response);
				}
			}
		} 
	};
	ajax.open(opts.method, url, true);

	for (h in headers) {
		ajax.setRequestHeader(h, headers[h]);
	}
	if (opts.timeoutSecs) {
		timer = setTimeout(timedOut, opts.timeoutSecs * 1000);
	}
	if (opts.method != 'GET') { 
		ajax.send(params);
	} else {
		ajax.send();
	}
	function timedOut() {
		ajax.abort();
		if (opts.onFailure) {
			opts.onFailure({responseText:null, status:599, statusText:'Request Timed Out', ajax:ajax});
		}
	}
}

var STORE_OP = 1;
var RETRIEVE_OP = 2;
var UPDATE_OP = 3;
var REMOVE_OP = 4;
var max_object_id = 0;

function store_object(object) {
    try {
        var handler = handlers[object.type];
        if (handler != null) {
            object = handler.within_current_context(object);
            if (object != null) object = handler.operation_permitted(max_object_id, object, STORE_OP);
        }
        if (object == null) return -1;
        
        object.id = max_object_id;
        localStorage.setItem(max_object_id, JSON.stringify(object));
    } catch (e) {
    }
    return max_object_id++;
}
function retrieve_object(id) {
    if (!is_defined(id)) { return null; }
    try {
        var object = JSON.parse(localStorage.getItem(id));
        
        var handler = handlers[object.type];
        if (handler != null) {
            object = handler.within_current_context(object);
            if (object != null) object = handler.operation_permitted(id, object, RETRIEVE_OP);
        }
        
        if (is_defined(object)) {
            return object; 
        }
        return null;
    } catch (e) {
        return null;
    }
}
function update_object(id, object) {
    if (!is_defined(id)) { return; }
    try {
        var handler = handlers[object.type];
        if (handler) {
            object = handler.within_current_context(object);
            if (object != null) object = handler.operation_permitted(id, object, UPDATE_OP);
        }
        if (object == null) return; 
        
        localStorage.setItem(id, JSON.stringify(object));
    } catch (e) {
    }
}
function remove_object(id) {
    if (!is_defined(id)) { return; }
    var object = null;
    try {
        object = JSON.parse(localStorage.getItem(id));
    } catch (e) {
    }
    if (!object) return;
    
    var handler = handlers[object.type];
    if (handler) {
        object = handler.within_current_context(object);
        if (object != null) object = handler.operation_permitted(id, object, REMOVE_OP);
    }
    if (object == null) return; 
    delete localStorage[id];
}
function init_object_storage() {
    max_object_id = -1;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key > max_object_id) {
            max_object_id = key;
        }
    }
    max_object_id++;
}
function num_stored_objs() {
    return localStorage.length;
}
function get_key(key_index) {
    if (!is_defined(key_index)) { return null; }
    if ((0 > key_index) || (key_index >= localStorage.length)) { 
        return null;
    }
    return localStorage.key(key_index);
}
var handlers = {};
function register_context_handler(type, handler) {
    handlers[type] = handler;
}

var apiServer;
var sessionId;
var userId;
var gangster;
var api_version = 'xylvan'; 
var realmId;

function MyAjaxRequest(url, callback, http_method, method, extra_params) {
	var options = {onSuccess:onSuccess, onFailure:onFailure};
	var ajax, msg;

    if (!is_defined(extra_params) || !extra_params) {
        extra_params = {};
    }
    
    var params = {};
	params['user_id']		= userId;
	params['_session_id']	= sessionId;
	params['version']		= api_version;
	params['gangster']		= gangster;
	params['timestamp']		= parseInt(serverTime());		
	if (method) {
    	params['_method']		= method;		
	}
	for (key in extra_params) {
	    params[key] = extra_params[key];
	}

	options.method = (http_method == 1) ? 'POST' : 'GET';
	options.parameters = params;
	options.timeoutSecs = 25;

	function onSuccess(r) {
		if (r.status == 200 && r.responseText) {
			if (url.indexOf(".xml") !== -1) {
				callback({ok:true, dat:r.responseText});
			} else {
				var data = r.responseText;
				try {
					data = JSON.parse(r.responseText);
				} catch (e) {}
				callback({ok:true, dat:data});
			}
		} else {
			msg = 'The request was successful but no data was returned';
			callback({ok:false, errmsg:msg});
		}
	}

	function onFailure(r) {
		var res = {
			ok		: false,
			status	: r.status,
			errmsg	: r.statusText
		};
		if (r.status > 200 && r.responseText) {
			res.dat = r.responseText;
		} else if (r.status == 509 && !r.responseText) {
			res.errmsg = 'Rate Limit Exceeded, too many requests!';
		} else {
			res.errmsg = 'This browser is not compatible at this time';
		}
		callback(res);
	}
	ajax = new AjaxRequest(apiServer + '/' + url, options);
}

var ui_shell_content =
'<div id="header">\
<ul>\
<table width="100%" cellspacing="1"><tr><td>\
	<li><a href="#" width="12%" id="show_TON_ui_0">Build</a></li>\
        <li><a href="#" width="12%" id="show_TON_ui_1">Research</a></li>\
	<li><a href="#" width="12%" id="show_TON_ui_2">Train</a></li>\
	<li><a href="#" width="8%" id="show_TON_ui_3">Attack</a></li>\
	<li><a href="#" width="18%" id="show_TON_ui_4">Pending Jobs</a></li>\
	<li><a href="#" width="18%" id="show_TON_ui_5">Hide</a></li>\
</td><td width="11%" align="center" style="background-color:black;" id="Script_Name">\
</td></tr></table>\
</ul>\
</div>\
<div id="ui_shell_content" style="background-color:#FFCC66;">\
<table id="Content-Table" width="100%" border="1" cellspacing="0" cellpadding="0" style="font-family:\'Arial Narrow\',sans-serif;font-size:15px;">\
  <tr>\
    <td>\
	<table width="100%" border="0" cellspacing="0" cellpadding="0">\
      <tr>\
        <td width="50%" id="Content-header"> </td> <td><input type="submit" name="Update" value="Update" id="process_TON_action_reqs"/></td>\
        <td width="3%">City:</td>\
        <td width="17%" id="Content-cities"></td>\
<td width="10%">' + 

'        <td width="10%">\
		</td>\
      </tr>\
    </table>\
	</td>\
  </tr>\
  <tr>\
    <td id="Content-body">\
	</td>\
  </tr>\
</table>\
</div>';
var ui_tab_style = '#header ul {\
	list-style: none;\
	padding:0;\
	border:0;\
	margin:0;\
} \
#header li {\
	display: inline;\
	border: light;\
	border-width: 1px 1px 0 1px;\
	margin: 0 0 0 0;\
	font-family:\'Arial Narrow\', sans-serif;\
	font-size: 16px;\
}\
#header li a {\
	padding: 0 1em;\
	background-color:#FFCC66;\
	border-top-left-radius: 5px;\
	border-top-right-radius: 5px;\
}\
#header li a:hover {\
    background-color:#FF9966;\
}\
#header .selected {\
	padding-bottom: 1px; \
	background-color:#FF9900;\
}';
var UI_HORIZONTAL_MARGIN = 10;
function createUI() {
    var document_to_add_to = unsafeWindow.document;

    set_popup_stylesheet(document_to_add_to);
    var script_ui = new PopUp('TON_Script', ui_shell_content, 0, 0, dimensions.width - UI_HORIZONTAL_MARGIN, 20, null, document_to_add_to);
    var ui_content_shell = document_to_add_to.getElementById('ui_shell_content');
    add_style(ui_tab_style, document_to_add_to);
    document_to_add_to.getElementById('show_TON_ui_0').addEventListener('click', function() { show_TON_ui(0); }, false);
    document_to_add_to.getElementById('show_TON_ui_1').addEventListener('click', function() { show_TON_ui(1); }, false);
    document_to_add_to.getElementById('show_TON_ui_2').addEventListener('click', function() { show_TON_ui(2); }, false);
    document_to_add_to.getElementById('show_TON_ui_3').addEventListener('click', function() { show_TON_ui(3); }, false);
    document_to_add_to.getElementById('show_TON_ui_4').addEventListener('click', function() { show_TON_ui(4); }, false);
    document_to_add_to.getElementById('show_TON_ui_5').addEventListener('click', function() { show_TON_ui(5); }, false);
    document_to_add_to.getElementById('process_TON_action_reqs').addEventListener('click', process_TON_action_reqs, false);
    script_ui.show(true);
}

var ui_contents = [
'<table width="100%" border="0" cellspacing="0" cellpadding="0">\
  <tr>\
    <td width="2%">\
      <label>Type:</label>\
	</td>\
    <td width="12%">\
	  <select id="Selected_Building">\
      </select>\
	</td>\
    <td width="2%">\
      <label>Level:</label>\
	</td>\
    <td width="7%">\
	  <select name="select" id="Building_level">\
	    <option value="0">-- All --</option>\
	    <option value="1">1</option>\
	    <option value="2">2</option>\
	    <option value="3">3</option>\
	    <option value="4">4</option>\
	    <option value="5">5</option>\
	    <option value="6">6</option>\
	    <option value="7">7</option>\
	    <option value="8">8</option>\
	    <option value="9">9</option>\
	    <option value="10">10</option>\
	  </select>\
	</td>\
    <td width="6%">Upgrade Level: \
    </td>\
    <td width="8%">\
	  <select name="select" id="Building_Level_To_Upgrade_To">\
	    <option value="0">-- N/A --</option>\
	    <option value="2">2</option>\
	    <option value="3">3</option>\
	    <option value="4">4</option>\
	    <option value="5">5</option>\
	    <option value="6">6</option>\
	    <option value="7">7</option>\
	    <option value="8">8</option>\
	    <option value="9">9</option>\
	    <option value="10">10</option>\
	    <option value="11">11</option>\
	  </select>\
	</td>\
    <td width="2%">Upgrade:</td>\
    <td width="2%"><input id="Building_Upgrade" checked name="Building_Upgrade" type="radio" value="1"/></td>\
    <td width="2%">Remove:</td>\
    <td width="19%"><input id="Building_Remove" name="Building_Upgrade" type="radio" value="0"/></td>\
  </tr>\
</table>',
'<table width="100%" border="1" cellspacing="-5" cellpadding="0">\
  <tr>\
  	<td>Blood Chemistry</td>\
	<td><input id="BloodChemistry" type="textbox" maxlength="2" size="2"/></td>\
  	<td>Crystallography</td>\
	<td><input id="Crystallography" type="textbox" maxlength="2" size="2"/></td>\
  	<td>Concrete Blends</td>\
	<td><input id="ConcreteBlends" type="textbox" maxlength="2" size="2"/></td>\
  	<td>Vein Mining</td>\
	<td><input id="VeinMining" type="textbox" maxlength="2" size="2"/></td>\
  </tr>\
  	<td>Twilight Warfare</td>\
	<td><input id="TwilightWarfare" type="textbox" maxlength="2" size="2"/></td>\
  	<td>Shapeshifting</td>\
	<td><input id="Shapeshifting" type="textbox" maxlength="2" size="2"/></td>\
  	<td>Selective Breeding</td>\
	<td><input id="SelectiveBreeding" type="textbox" maxlength="2" size="2"/></td>\
  	<td>Endurance</td>\
	<td><input id="Endurance" type="textbox" maxlength="2" size="2"/></td>\
  </tr>\
  <tr>\
  	<td>Spectral Vision</td>\
	<td><input id="SpectralVision" type="textbox" maxlength="2" size="2"/></td>\
  	<td>Architecture</td>\
	<td><input id="Architecture" type="textbox" maxlength="2" size="2"/></td>\
  	<td>Blood Transfusions</td>\
	<td><input id="BloodTransfusions" type="textbox" maxlength="2" size="2"/></td>\
  	<td>Gargoyle Agility</td>\
	<td><input id="GargoyleAgility" type="textbox" maxlength="2" size="2"/></td>\
  </tr>\
</table>', 
'<table width="100%" border="1" cellspacing="-5" cellpadding="-20">\
  <tr>\
    <td>Grunts</td>\
	<td><input id="Change_Grunts" type="text" value="0" size="6" maxlength="6"/></td>\
    <td>Trucks</td>\
	<td><input id="Change_Trucks" type="text" value="0" size="6" maxlength="6"/></td>\
    <td>Slashers</td>\
	<td><input id="Change_Slashers" type="text" value="0" size="6" maxlength="6"/></td>\
    <td>Sigbins</td>\
	<td><input id="Change_Sigbins" type="text" value="0" size="6" maxlength="6"/></td>\
  </tr>\
  <tr>\
    <td>Flickerforms</td>\
	<td><input id="Change_Flickerforms" type="text" value="0" size="6" maxlength="6"/></td>\
    <td>Snipers</td>\
	<td><input id="Change_Snipers" type="text" value="0" size="6" maxlength="6"/></td>\
    <td>Vampire Bats</td>\
	<td><input id="Change_VampireBats" type="text" value="0" size="6" maxlength="6"/></td>\
    <td>Nemesis Bats</td>\
	<td><input id="Change_NemesisBats" type="text" value="0" size="6" maxlength="6"/></td>\
  </tr>\
  <tr>\
    <td>Armored Trucks</td>\
	<td><input id="Change_ArmoredTrucks" type="text" value="0" size="6" maxlength="6"/></td>\
    <td>Nosferatu</td>\
	<td><input id="Change_Nosferatu" type="text" value="0" size="6" maxlength="6"/></td>\
    <td>Impalers</td>\
	<td><input id="Change_Impalers" type="text" value="0" size="6" maxlength="6"/></td>\
    <td>Reapers</td>\
	<td><input id="Change_Reapers" type="text" value="0" size="6" maxlength="6"/></td>\
  </tr>\
  <tr>\
    <td>Alchemists</td>\
	<td><input id="Change_Alchemists" type="text" value="0" size="6" maxlength="6"/></td>\
  </tr>\
</table>', 
'<table width="100%" cellspacing="0" cellpadding="0" style="border-bottom-color:#000000;border-bottom-style:ridge;">\
  <tr>\
    <td width="1%">X:</td>\
    <td width="4%"><input id="attacked_x" type="text" size="6" maxlength="3" /></td>\
    <td width="1%">Y:</td>\
    <td width="4%"><input id="attacked_y" type="text" size="6" maxlength="3" /></td>\
    <td width="1%">General:</td>\
    <td width="15%">\
	  <select id="Selected_General">\
	  </select>\
	  <input type="button" value="Zerg Rush!" id="Attack_All_Generals">\
	</td>\
    <td width="1%">Gargoyle:</td>\
    <td width="8%">\
	  <select id="Selected_Gargoyle">\
		<option value="">-- none --</option>\
		<option value="GreatDragon">Gargoyle</option>\
		<option value="StoneDragon">Gargoyle Serpent</option>\
		<option value="WaterDragon">Gargoyle Wolf</option>\
	  </select>\
	</td>\
  </tr>\
</table>\
<table width="100%" border="1" cellspacing="1" cellpadding="-5">\
  <tr>\
    <td>Grunts</td>\
	<td><input id="Attack_Grunts" type="text" value="0" size="7" maxlength="6"/></td>\
    <td>Trucks</td>\
	<td><input id="Attack_Trucks" type="text" value="0" size="7" maxlength="6"/></td>\
    <td>Slashers</td>\
	<td><input id="Attack_Slashers" type="text" value="0" size="7" maxlength="6"/></td>\
    <td>Sigbins</td>\
	<td><input id="Attack_Sigbins" type="text" value="0" size="7" maxlength="6"/></td>\
    <td>Flickerforms</td>\
	<td><input id="Attack_Flickerforms" type="text" value="0" size="7" maxlength="6"/></td>\
    <td>Snipers</td>\
	<td><input id="Attack_Snipers" type="text" value="0" size="7" maxlength="6"/></td>\
  </tr>\
  <tr>\
    <td>Vampire Bats</td>\
	<td><input id="Attack_VampireBats" type="text" value="0" size="7" maxlength="6"/></td>\
    <td>Nemesis Bats</td>\
	<td><input id="Attack_NemesisBats" type="text" value="0" size="7" maxlength="6"/></td>\
    <td>Armored Trucks</td>\
	<td><input id="Attack_ArmoredTrucks" type="text" value="0" size="7" maxlength="6"/></td>\
    <td>Nosferatu</td>\
	<td><input id="Attack_Nosferatu" type="text" value="0" size="7" maxlength="6"/></td>\
    <td>Impalers</td>\
	<td><input id="Attack_Impalers" type="text" value="0" size="7" maxlength="6"/></td>\
    <td>Reapers</td>\
	<td><input id="Attack_Reapers" type="text" value="0" size="7" maxlength="6"/></td>\
  </tr>\
  <tr>\
    <td>Alchemists</td>\
	<td><input id="Attack_Alchemists" type="text" value="0" size="7" maxlength="6"/></td>\
  </tr>\
</table>',
 
'<div id="Pending_Jobs_Div" style="overflow:auto;">\
 <table id="Pending_Jobs_Table" width="100%" border="1" cellspacing="0" cellpadding="0" style="background-color:#FF9933;">\
  <tr>\
    <th width="2%">¦</th>\
    <th width="7%">Type</th>\
    <th width="10%">Operation</th>\
    <th width="18%">Status</th>\
    <th width="30%">Info</th>\
    <th width="15%">Pre-Requisites</th>\
	<th width="16%">\
		<input type="button" style="width: 80px" id="Remove_Now" value="Remove" />\
		<input type="button" style="width: 80px" id="Select_All_Checkboxes" value="Remove All" />\
	</th>\
  </tr>\
 </table>\
</div>',
'</form>'];

function display_pending_jobs() {
    if (ui_tab_type != PENDING_JOBS_TAB) { return; }
    
    var pending_jobs_table = document.getElementById("Pending_Jobs_Table");
    for (var i = pending_jobs_table.rows.length - 1; i > 0; i--) {
        pending_jobs_table.deleteRow(-1);
    }
    
    var curr_city = document.getElementById("cities");
    var curr_city_id = cityInfo[curr_city.value].city.id;
    
    var num_objs = num_stored_objs();
    for (i = 0; i < num_objs; i++) {
        var key = get_key(i);
        var object = retrieve_object(key);
        
        if (!is_defined(object) || !object.hasOwnProperty('type') || (object.type != GAME_REQUEST_TYPE)) { continue; }

        if (object.city != curr_city_id) { continue; }        
        if ((object.status != ERROR_NOT_STARTED) && 
            (object.status != WAITING_FOR_PREREQ) &&
            (object.status != TO_SCHEDULE)) { continue; }

        var new_row = pending_jobs_table.insertRow(-1);
        var selected_box = new_row.insertCell(0);
        var type = new_row.insertCell(1);
        var op = new_row.insertCell(2);
        var status = new_row.insertCell(3);
        var units = new_row.insertCell(4);
        var preReqs = new_row.insertCell(5);
        preReqs.colSpan = 2;
        
        selected_box.innerHTML = "<input name='Select_Job' type='checkbox' id='" + key + "'" +
        ((object.status == TO_SCHEDULE) ? " enabled" : "") + "/>";
        type.innerHTML = unit_types[object.unit_type];
        op.innerHTML = operations[object.op];
        status.innerHTML = job_states[object.status];
        units.innerHTML = get_presentable_names(object.unit, object.unit_type, object.qty, object.location);
        preReqs.innerHTML = get_presentable_preReqs(object.preReq);    
    }
    document.getElementById('Remove_Now').addEventListener('click', function() { jobs_selected(false); }, false);
    document.getElementById('Select_All_Checkboxes').addEventListener('click', function() { jobs_selected(true); }, false);
}
function jobs_selected(removeAll) {
    if (ui_tab_type != PENDING_JOBS_TAB) { return; }
    
    var all_pending_jobs = document.getElementsByName('Select_Job');
    for (var i = 0; i < all_pending_jobs.length; i++) 
	{
		var key = all_pending_jobs[i].id;
		if (removeAll)
		{
			remove_object(key);
		}
		else
		{
			if (all_pending_jobs[i].checked)
			{
				remove_object(key);
			}
		}
    }
    display_pending_jobs();
}
function set_generals_dropdown(city_index, generals_dd_name) {
    if (!city_index) { city_index = capital_index; }
    if (city_index >= cityInfo.length) {
        city_index = capital_index;
    }
    var generals_dd = null;
    if (!generals_dd_name) {
        generals_dd_name = 'Selected_General';
    }
    generals_dd = document.getElementById(generals_dd_name);

    var generals = get_generals_by_city(city_index);
    if (!is_defined(generals) || !generals) {
	generals_dd.innerHTML = "";
        return;
    }
    var dropdown_contents = null;
    if (ui_tab_type == ATTACK_TAB) {
	dropdown_contents = "<option value='0'>-- None --</option>";
    } else {
	dropdown_contents = "<option value='0'>-- Any --</option>";
    }
    for (general_id in generals) {
	dropdown_contents += "<option value='" + general_id + "'>" + generals[general_id].name + "</option>";
    }
    generals_dd.innerHTML = dropdown_contents;
	
	document.getElementById('Attack_All_Generals').addEventListener('click', function() { attack_with_all_generals(); }, false);
}
function attack_with_all_generals()
{
	var selectgenerals = document.getElementById("Selected_General")
	var currentSelectedGeneral = selectgenerals.selectedIndex;
	for (var i=0; i < selectgenerals.length; i++)
	{
		selectgenerals.selectedIndex = i;
		process_TON_action_reqs();
	}
	selectgenerals.selectedIndex = currentSelectedGeneral;
}
function building_selected() {
    if (ui_tab_type != BUILDINGS_TAB) { return; }
    var selected_building = document.getElementById('Selected_Building');
    var beginning_level = document.getElementById('Building_level');
    
	if ((selected_building.value == "Home") || (selected_building.value == "Garrison") ||
	    (selected_building.value == "Farm") || (selected_building.value == "Quarry") ||
	    (selected_building.value == "Mine") || (selected_building.value == "Lumbermill") || 
	    (selected_building.value == "TrainingCamp") || (selected_building.value == "Silo")) {
	    beginning_level.disabled = false;
	} else {
        var city = document.getElementById('cities');
        beginning_level.value = 0;
	    for (var i = 0; i <= cityInfo[city.value].city.buildings.length; i++) {
	        var building = cityInfo[city.value].city.buildings[i];
	        if (building.type == selected_building.value) {
	            beginning_level.value = building.level;
	            break;
	        }
	    }
	    beginning_level.disabled = true;
	}
}
function building_upgrade_clicked(isUpgrade) {
    if (ui_tab_type != BUILDINGS_TAB) { return; }
    var target_level_element = document.getElementById('Building_Level_To_Upgrade_To');
    if (isUpgrade) {
        if (target_level_element.value == 0) {
            target_level_element.value = 11;
        }
        target_level_element.disabled = false;
    } else {
        target_level_element.value = 0;
        target_level_element.disabled = true;
    }
}
function show_buildings_dropdown() {
    if (ui_tab_type != BUILDINGS_TAB) { return; }
    var city_index = document.getElementById('cities').value;

    var buildings = outpost_buildings;
    if (city_index == capital_index) {
        buildings = city_buildings;
    }
    var buildings_dd = document.getElementById('Selected_Building');
    var building_types = "";
    for (key in buildings) {
        building_types += "<option value='" + key + "'>" + buildings[key] + "</option>";
    }
    buildings_dd.innerHTML = building_types;
}

var ui_tab_type = -1;

var BUILDINGS_TAB = 0;
var RESEARCH_TAB = 1;
var TRAINING_TAB = 2;
var ATTACK_TAB = 3;
var PENDING_JOBS_TAB = 4;
var HIDE_TAB = 5;

function show_TON_ui(type) {
    if (!type) { type = BUILDINGS_TAB; } 
    if ((type < BUILDINGS_TAB) || (type > HIDE_TAB)) {
        type = BUILDINGS_TAB;
    }
    ui_tab_type = type;
	
    var cities = document.getElementById('Content-cities');
    var cities_drop_down = "<select id='cities'>";
    for (var i = 0; i < cityInfo.length; i++) {
        cities_drop_down += "<option value='" + i + "'>" + cityInfo[i].city.name + "</option>";
    }
    cities_drop_down += "</select>";
    cities.innerHTML = cities_drop_down;

    ui_tab_type = type;

    var description = document.getElementById('Content-header');
	
    var content = document.getElementById('Content-body');
    content.innerHTML = ui_contents[type];

    for (i = BUILDINGS_TAB; i <= HIDE_TAB; i++) {
        document.getElementById('show_TON_ui_' + i).setAttribute('class', '');
    }
    document.getElementById('show_TON_ui_' + ui_tab_type).setAttribute('class', 'selected');

    var cities_dropdown = document.getElementById('cities');
    if ((ui_tab_type == RESEARCH_TAB) || (ui_tab_type == ATTACK_TAB)) {
        cities_dropdown.value = capital_index;
        cities_dropdown.disabled = true;
    }
    if (ui_tab_type == ATTACK_TAB) {
        set_generals_dropdown(capital_index);
    }
    if (ui_tab_type == PENDING_JOBS_TAB) {
        var pending_jobs_div = document.getElementById('Pending_Jobs_Div');
        pending_jobs_div.style.height = "115px";
        
        display_pending_jobs();
    }
    if (ui_tab_type == HIDE_TAB) {
    ui_content_shell.style.height = '0px';

    }
    var ui_content_shell = document.getElementById('ui_shell_content');

    if (ui_tab_type == BUILDINGS_TAB) {
        cities_dropdown.addEventListener('change', show_buildings_dropdown);
        show_buildings_dropdown();
	    
        document.getElementById('Selected_Building').addEventListener('change', building_selected);
        building_selected();

        var building_upgrade = document.getElementById('Building_Upgrade');
        var building_remove = document.getElementById('Building_Remove');

        building_upgrade.addEventListener('click', function() { building_upgrade_clicked(true); });
        building_remove.addEventListener('click', function() { building_upgrade_clicked(false); });

        building_upgrade_clicked(building_upgrade.checked);
    }

}
function check_and_research(city_id, technology, final_level) {
    var curr_level = researchInfo[technologies[technology]];
    curr_level = is_defined(curr_level) ? parseInt(curr_level) : 0;
    
    if (curr_level >= final_level) {
        return;
    } else if (final_level > 10) {
        final_level = 10;
    }
    for (var i = curr_level; i < final_level; i++) {
        var requirements = {};
        requirements[technology] = {type:TECHNOLOGY, level:i};

        var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: technology, unit_type: TECHNOLOGY, location: 0, op: OP_UPGRADE, status: WAITING_FOR_PREREQ, preReq: requirements};
        submit_action_req(object);
    }
}
function process_TON_action_reqs() {
    var all_cities = document.getElementById('cities');    
    var city_index = all_cities.value;
    if (city_index >= cityInfo.length) {
        return;
    }
	var city_id = cityInfo[city_index].city.id;
	switch (ui_tab_type) {
	case 0:
		var building_type = document.getElementById('Selected_Building').value;
		var building_level = document.getElementById('Building_level').value;

        var level_to_consider_below = 15; 
		var remove = document.getElementById('Building_Remove');
		var isUpgrade = (remove.checked != true);
		if (isUpgrade) {
            level_to_consider_below = document.getElementById('Building_Level_To_Upgrade_To').value;         
        }
        
        var building_ids = [];
        var building_levels = [];
        if (building_level != 0) {
    		var found = false;
	        for (var j = 0; j < cityInfo[city_index].city.buildings.length; j++) {
		    	var building = cityInfo[city_index].city.buildings[j];
			    if ((building.type == building_type) && (building.level == building_level)) {
				    building_ids.push(building.id);
				    building_levels.push(building.level);
    				found = true;
	    			break;
		      	}
		    }
         	if (!found) { 
     	        return; 
     	    }
     	} else {
     	    var num_buildings = 0;
	        for (j = 0; j < cityInfo[city_index].city.buildings.length; j++) {
		    	building = cityInfo[city_index].city.buildings[j];
			    if ((building.type == building_type) && (building.level < level_to_consider_below)) {
				    building_ids[num_buildings] = building.id;
				    building_levels[num_buildings++] = building.level;
		      	}
		    }
     	}
     	for (j = 0; j < building_ids.length; j++) {
   	        var curr_building_level = building_levels[j];
     	    if (isUpgrade) {
    	    	if (level_to_consider_below <= curr_building_level) {
	    	        continue;
	    	    }

	    	    for (var i = curr_building_level; i < level_to_consider_below; i++) {
	    	        var requirements = {};
	    	        requirements[building_ids[j]] = {type:BUILDING, level:i};
                    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: building_ids[j], unit_type: BUILDING, location: 0, qty: 1, op: OP_UPGRADE, status: WAITING_FOR_PREREQ, preReq: requirements};
                    submit_action_req(object);	    	    
  	        	}
    		} else {
       		    remove_building_retry(city_id, building_ids[j]); 
	        }
	    }
		break;
	case 1:
		var BloodChemistry = document.getElementById('BloodChemistry');
		var Crystallography = document.getElementById('Crystallography');
		var ConcreteBlends = document.getElementById('ConcreteBlends');
		var VeinMining = document.getElementById('VeinMining');
		var TwilightWarfare = document.getElementById('TwilightWarfare');
		var Shapeshifting = document.getElementById('Shapeshifting');
		var SelectiveBreeding = document.getElementById('SelectiveBreeding');
		var Endurance = document.getElementById('Endurance');
		var SpectralVision = document.getElementById('SpectralVision');
		var Architecture = document.getElementById('Architecture');
		var BloodTransfusions = document.getElementById('BloodTransfusions');
		var GargoyleAgility = document.getElementById('GargoyleAgility');
        if (!BloodChemistry && !Crystallography && !ConcreteBlends && !VeinMining && 
            !TwilightWarfare && !Shapeshifting && !SelectiveBreeding && !Endurance && 
            !SpectralVision && !Architecture && !BloodTransfusions && !GargoyleAgility) {
            return;
        }
        if (!(BloodChemistry && (BloodChemistry.value != 0)) && !(Crystallography && (Crystallography.value != 0)) &&
            !(ConcreteBlends && (ConcreteBlends.value != 0)) && !(VeinMining && (VeinMining.value != 0)) &&
            !(TwilightWarfare && (TwilightWarfare.value != 0)) && !(Shapeshifting && (Shapeshifting.value != 0)) && 
            !(SelectiveBreeding && (SelectiveBreeding.value != 0)) && !(Endurance && (Endurance.value != 0)) && 
            !(SpectralVision && (SpectralVision.value != 0)) && !(Architecture && (Architecture.value != 0)) && 
            !(BloodTransfusions && (BloodTransfusions.value != 0)) && !(GargoyleAgility && (GargoyleAgility.value != 0))) {
            return;
        }
		if (BloodChemistry && (BloodChemistry.value != 0)) { check_and_research(city_id, 'Blood Chemistry', BloodChemistry.value); }
		if (Crystallography && (Crystallography.value != 0)) { check_and_research(city_id, 'Crystallography', Crystallography.value); }
		if (ConcreteBlends && (ConcreteBlends.value != 0)) { check_and_research(city_id, 'Concrete Blends', ConcreteBlends.value); }
		if (VeinMining && (VeinMining.value != 0)) { check_and_research(city_id, 'Vein Mining', VeinMining.value); }
		if (TwilightWarfare && (TwilightWarfare.value != 0)) { check_and_research(city_id, 'Twilight Warfare', TwilightWarfare.value); }
		if (Shapeshifting && (Shapeshifting.value != 0)) { check_and_research(city_id, 'Shapeshifting', Shapeshifting.value); }
		if (SelectiveBreeding && (SelectiveBreeding.value != 0)) { check_and_research(city_id, 'Selective Breeding', SelectiveBreeding.value); }
		if (Endurance && (Endurance.value != 0)) { check_and_research(city_id, 'Endurance', Endurance.value); }
		if (SpectralVision && (SpectralVision.value != 0)) { check_and_research(city_id, 'Spectral Vision', SpectralVision.value); }
		if (Architecture && (Architecture.value != 0)) { check_and_research(city_id, 'Architecture', Architecture.value); }
		if (BloodTransfusions && (BloodTransfusions.value != 0)) { check_and_research(city_id, 'Blood Transfusions', BloodTransfusions.value); }
		if (GargoyleAgility && (GargoyleAgility.value != 0)) { check_and_research(city_id, 'Gargoyle Agility', GargoyleAgility.value); }
		break;
	case 2:
		var grunts_to_change = document.getElementById('Change_Grunts'); 
		var trucks_to_change = document.getElementById('Change_Trucks'); 
		var slashers_to_change = document.getElementById('Change_Slashers'); 
		var sigbins_to_change = document.getElementById('Change_Sigbins'); 
		var flickerforms_to_change = document.getElementById('Change_Flickerforms'); 
		var snipers_to_change = document.getElementById('Change_Snipers'); 
		var vampireBats_to_change = document.getElementById('Change_VampireBats'); 
		var nemesisBats_to_change = document.getElementById('Change_NemesisBats'); 
		var armoredTrucks_to_change = document.getElementById('Change_ArmoredTrucks'); 
		var nosferatu_to_change = document.getElementById('Change_Nosferatu'); 
		var impalers_to_change = document.getElementById('Change_Impalers'); 
		var reapers_to_change = document.getElementById('Change_Reapers'); 
		var alchemists_to_change = document.getElementById('Change_Alchemists'); 

        if (!grunts_to_change && !trucks_to_change && !slashers_to_change && !sigbins_to_change && 
            !flickerforms_to_change && !snipers_to_change && !vampireBats_to_change && !nemesisBats_to_change && 
            !armoredTrucks_to_change && !nosferatu_to_change && !impalers_to_change && !reapers_to_change &&
            !alchemists_to_change) {
            return;
        }
        if (!(grunts_to_change && (grunts_to_change.value != 0)) && !(trucks_to_change && (trucks_to_change.value != 0)) && 
            !(slashers_to_change && (slashers_to_change.value != 0)) && !(sigbins_to_change && (sigbins_to_change.value != 0)) && 
            !(flickerforms_to_change && (flickerforms_to_change.value != 0)) && !(snipers_to_change && (snipers_to_change.value != 0)) && 
            !(vampireBats_to_change && (vampireBats_to_change.value != 0)) && !(nemesisBats_to_change && (nemesisBats_to_change.value != 0)) && 
            !(armoredTrucks_to_change && (armoredTrucks_to_change.value != 0)) && 
            !(nosferatu_to_change && (nosferatu_to_change.value != 0)) && !(impalers_to_change && (impalers_to_change.value != 0)) &&
            !(reapers_to_change && (reapers_to_change.value != 0)) && !(alchemists_to_change && (alchemists_to_change.value != 0))) {
            return;
        }
		if (grunts_to_change && (grunts_to_change.value != 0)) { change_units_retry(city_id, GRUNTS, grunts_to_change.value); }
		if (trucks_to_change && (trucks_to_change.value != 0)) { change_units_retry(city_id, TRUCKS, trucks_to_change.value); }
		if (slashers_to_change && (slashers_to_change.value != 0)) { change_units_retry(city_id, SLASHERS, slashers_to_change.value); }
		if (sigbins_to_change && (sigbins_to_change.value != 0)) { change_units_retry(city_id, SIGBINS, sigbins_to_change.value); }
		if (flickerforms_to_change && (flickerforms_to_change.value != 0)) { change_units_retry(city_id, FLICKERFORMS, flickerforms_to_change.value); }
		if (snipers_to_change && (snipers_to_change.value != 0)) { change_units_retry(city_id, SNIPERS, snipers_to_change.value); }
		if (vampireBats_to_change && (vampireBats_to_change.value != 0)) { change_units_retry(city_id, VAMPIRE_BATS, vampireBats_to_change.value); }
		if (nemesisBats_to_change && (nemesisBats_to_change.value != 0)) { change_units_retry(city_id, NEMESIS_BATS, nemesisBats_to_change.value); }
		if (armoredTrucks_to_change && (armoredTrucks_to_change.value != 0)) { change_units_retry(city_id, ARMORED_TRUCKS, armoredTrucks_to_change.value); }
		if (nosferatu_to_change && (nosferatu_to_change.value != 0)) { change_units_retry(city_id, NOSFERATU, nosferatu_to_change.value); }
		if (impalers_to_change && (impalers_to_change.value != 0)) { change_units_retry(city_id, IMPALERS, impalers_to_change.value); }
		if (reapers_to_change && (reapers_to_change.value != 0)) { change_units_retry(city_id, REAPERS, reapers_to_change.value); }
		if (alchemists_to_change && (alchemists_to_change.value != 0)) { change_units_retry(city_id, ALCHEMIST, alchemists_to_change.value); }
		break;
	case 3:
		var attacked_x = document.getElementById('attacked_x');
		var attacked_y = document.getElementById('attacked_y');
		var general_to_send = document.getElementById('Selected_General');
		var gargoyle_to_send = document.getElementById('Selected_Gargoyle');
        var attacking_grunts = document.getElementById('Attack_Grunts');
        var attacking_trucks = document.getElementById('Attack_Trucks');
        var attacking_slashers = document.getElementById('Attack_Slashers');
        var attacking_sigbins = document.getElementById('Attack_Sigbins');
        var attacking_flickerforms = document.getElementById('Attack_Flickerforms');
        var attacking_snipers = document.getElementById('Attack_Snipers');
        var attacking_vampireBats = document.getElementById('Attack_VampireBats');
        var attacking_nemesisBats = document.getElementById('Attack_NemesisBats');
        var attacking_armoredTrucks = document.getElementById('Attack_ArmoredTrucks');
        var attacking_nosferatu = document.getElementById('Attack_Nosferatu');
        var attacking_impalers = document.getElementById('Attack_Impalers');
        var attacking_reapers = document.getElementById('Attack_Reapers');
        var attacking_alchemists = document.getElementById('Attack_Alchemists');

        if (!attacked_x || !attacked_y) {
            return;
        }
        if (!general_to_send) {
            return;
        }
        if (!attacking_grunts && !attacking_trucks && !attacking_slashers && !attacking_sigbins &&
            !attacking_flickerforms && !attacking_snipers && !attacking_vampireBats && !attacking_nemesisBats && 
            !attacking_armoredTrucks && !attacking_nosferatu && !attacking_impalers && !attacking_reapers &&
            !attacking_alchemists) {
            return;
        }
        
        var grunts = (attacking_grunts ? parseInt(attacking_grunts.value) : 0);
        var trucks = (attacking_trucks ? parseInt(attacking_trucks.value) : 0);
        var slashers = (attacking_slashers ? parseInt(attacking_slashers.value) : 0); 
        var sigbins = (attacking_sigbins ? parseInt(attacking_sigbins.value) : 0);
        var flickerforms = (attacking_flickerforms ? parseInt(attacking_flickerforms.value) : 0);
        var snipers = (attacking_snipers ? parseInt(attacking_snipers.value) : 0);
        var vampireBats = (attacking_vampireBats ? parseInt(attacking_vampireBats.value) : 0);
        var nemesisBats = (attacking_nemesisBats ? parseInt(attacking_nemesisBats.value) : 0);
        var armoredTrucks = (attacking_armoredTrucks ? parseInt(attacking_armoredTrucks.value) : 0);
        var nosferatu = (attacking_nosferatu ? parseInt(attacking_nosferatu.value) : 0);
        var impalers = (attacking_impalers ? parseInt(attacking_impalers.value) : 0);
        var reapers = (attacking_reapers ? parseInt(attacking_reapers.value) : 0);
        var alchemists = (attacking_alchemists ? parseInt(attacking_alchemists.value) : 0);
        var gargoyle = (gargoyle_to_send ? gargoyle_to_send.value : 0);
        var general = parseInt(general_to_send.value);
        
        if (!grunts && !trucks && !slashers && !sigbins && !flickerforms && !snipers && 
            !vampireBats && !nemesisBats && !armoredTrucks && !nosferatu && !impalers &&
            !reapers && !alchemists) {
            return;
        }
        if ((grunts < 0) || (trucks < 0) || (slashers < 0) || (sigbins < 0) || (flickerforms < 0) || (snipers < 0) || 
            (vampireBats < 0) || (nemesisBats < 0) || (armoredTrucks < 0) || (nosferatu < 0) || (impalers < 0) ||
            (reapers < 0) || (alchemists < 0)) {
            return;
        }
        if (!general) {
            return;
        }
		if (game_setting[GENERALS_LOCATIONS].value[general] != IN_CITY)
		{
			return;
		}
		
		var curr_city = document.getElementById("cities");
		var curr_city_id = cityInfo[curr_city.value].city.id;
		for (var i = 0; i < localStorage.length; i++) 
		{
	        var key = get_key(i);
			var object = retrieve_object(key);
						
			if (!is_defined(object) || !object.hasOwnProperty('type') || (object.type != GAME_REQUEST_TYPE)) 
			{ 
				continue; 
			}
			if (object.city != curr_city_id) { continue; }        
			if ((object.status != ERROR_NOT_STARTED) && (object.status != WAITING_FOR_PREREQ) && (object.status != TO_SCHEDULE))
			{ 
				continue; 
			}
			
			var currentGeneral = get_general_of_troops(object.unit);
	        if (currentGeneral == general) 
			{
	            return;
	        }
		}
        
		var units = get_units_map(grunts, trucks, slashers, sigbins, flickerforms, snipers, 
		    vampireBats, nemesisBats, armoredTrucks, nosferatu, impalers, reapers, alchemists, 
		    gargoyle, general);
		attack_retry(city_id, units, attacked_x.value, attacked_y.value);
		break;
	}
}

var GAME_CONFIG_TYPE = "GameConfig";
var CLEANUP_INTERVAL = "CleanupInterval";
var CLEANUP_STATES = "CleanupStates";

var IN_USE = 1;
var NOT_IN_USE = 2;

var game_config = {};
var game_config_ids = {};

var GENERALS_LOCATIONS = "GeneralsLocations";
var GAME_SETTING_TYPE = "GameSetting";
var game_setting = {};
var game_setting_ids = {};
function restore_setting() {
    for (var i = 0; i < num_stored_objs(); i++) {
        var key = get_key(i);
        var object = retrieve_object(key);
        
        if (!is_defined(object) || !object) { continue; }
        if (!object.hasOwnProperty('type')) { continue; }
        if (object['type'] == GAME_SETTING_TYPE) {
            game_setting[object.name] = object;
            game_setting_ids[object.name] = key;
        } else if (object['type'] == GAME_CONFIG_TYPE) {
            game_config[object.name] = object;
            game_config_ids[object.name] = key;
        } else {
            continue;
        }
    }
    if (!game_setting.hasOwnProperty(GENERALS_LOCATIONS)) {
        var generals_locations = {type:GAME_SETTING_TYPE, name: GENERALS_LOCATIONS, value: {}};
        id = store_object(generals_locations);
        game_setting[GENERALS_LOCATIONS] = generals_locations;
        game_setting_ids[GENERALS_LOCATIONS] = id;
    }
    if (!game_config.hasOwnProperty(CLEANUP_INTERVAL)) {
        var cleanup_interval = {type:GAME_CONFIG_TYPE, name: CLEANUP_INTERVAL, value: 60, context: {}, status: IN_USE};
        id = store_object(cleanup_interval);
        game_config[CLEANUP_INTERVAL] = cleanup_interval;
        game_config_ids[CLEANUP_INTERVAL] = id;
    }
    if (!game_config.hasOwnProperty(CLEANUP_STATES)) {
        var cleanup_states = {type:GAME_CONFIG_TYPE, name: CLEANUP_STATES, value: [ERROR_IN_REQUEST, COMPLETE], context: {}, status: IN_USE};
        id = store_object(cleanup_states);
        game_config[CLEANUP_STATES] = cleanup_states;
        game_config_ids[CLEANUP_STATES] = id;
    }
}
var buildings_DOA_to_TON = {};
var technology_DOA_to_TON = {};
var troops_DOA_to_TON = {};
var dimensions = {};

function init() {
    var found = false;
	var objects = unsafeWindow.document.getElementsByTagName('object');
	if (objects.length < 1) {
	    return false;
	}
   	var attrs = {};
	for (var i = 0; i < objects.length; i++) {
		if (objects[i].type && (objects[i].type == 'application/x-shockwave-flash')) {
    		objects[i].innerHTML += '<param name="wmode" value="opaque">';
         	var params = objects[i].innerHTML;
        	var pattern = /<\s*param\s*(.*?)>/gi;
        	var args, match, param;

        	while ((match = pattern.exec(params)) !== null) {
		        param = parseQuotedParams(match[1]);
		        if (param.name && (param.name === 'flashvars')) {
		            dimensions['width'] = objects[i].width;
		            dimensions['height'] = objects[i].height;
		        
			        args = decodeEntity(param.value).split('&');
        			for (var j = 0; j < args.length; j++) {
		        		var prop = args[j].split('=');
				        attrs[prop[0].trim()] = prop[1].trim();
			        }
			        found = true;
			        break;
		        }
	        }
	        if (found) { break; }
	    }
	}
	if (!found) {
	    return false;
	}

    apiServer = attrs.api_server;
    sessionId = attrs.session_id;
    userId = attrs.user_id;
    gangster = attrs.gangster;
    SERVER_ID = (/realm(\d+)\./.exec(attrs.api_server) || ['', ''])[1];

    buildings_DOA_to_TON = {"Home": "Home", "Fortress": "Downtown", "ScienceCenter": "Research Center",
        "OfficerQuarter": "Generals Crypt", "DragonKeep": "Gargoyle Perch", "MusterPoint": "Assembly Point",
        "Theater": "Nightclub", "StorageVault": "Warehouse", "Wall": "Wall", "Garrison": "Barracks",
        "Farm": "Blood Lab", "Quarry": "Concrete Plant", "Mine": "Crystal Pit", "Lumbermill": "Steelworks",
        "Metalsmith": "Furnace", "Factory": "Arsenal", "Rookery": "Bell Tower", "Sentinel": "Watch Tower"};
    technology_DOA_to_TON = {"Metallurgy": "Twilight Warfare", "Woodcraft": "Vein Mining", 
        "Masonry": "Concrete Blends", "Mining": "Crystallography", "Agriculture": "Blood Chemistry",
        "Clairvoyance": "Shapeshifting", "Dragonry": "Selective Breeding", "RapidDeployment": "Endurance",
        "Medicine": "Blood Transfusions", "Ballistics": "Spectral Vision", "Levitation": "Architecture",
        "AerialCombat": "Gargoyle Agility"};
    troops_DOA_to_TON = {"Conscript": "Grunt", "Porter": "Truck", "Halberdsman": "Slasher", 
        "Minotaur": "Sigbin", "Spy": "Flickerform", "Longbowman": "Sniper", 
        "SwiftStrikeDragon": "Vampire Bat", "BattleDragon": "Nemesis Bat", 
        "ArmoredTransport": "Armored Truck", "Giant": "Nosferatu", "FireMirror": "Impaler",
        "AquaTroop": "Reaper", "StoneTroop": "Alchemist"};

    var footer = document.getElementById("ft");
    realmId = footer.getElementsByTagName('a')[0].innerHTML.trim();
    if (!created_global_objects) {
        init_object_storage();
    }
    restore_setting();

    if (!created_global_objects) {
    setTimeout(gameActionsThread, 0);
    createUI();
    }
    created_global_objects = true;
    return found;
}
var created_global_objects = false;
var scriptLoaded = 0;

function scriptStartup() {
	if (scriptLoaded) {
		return;
	}
	try {
	    if (!init()) {
            setTimeout(scriptStartup, 10000);
			return;
		}
		if (!is_defined(apiServer) || !apiServer) {
			setTimeout(scriptStartup, 10000);
			return;
		}
	} catch (e) {
		setTimeout(scriptStartup, 10000);
		return;
	}
	scriptLoaded = true;
}
setTimeout(scriptStartup, 10000);

var SERVER_ID;
var cityInfo = [];
var capital_index = 0;
var researchInfo = {};
var IN_CITY = 1;
var IN_FIELD = 2;
var PROVISIONED = 3;
var city_id_to_name = [];
var building_id_to_type = [];
var general_id_to_name = [];

var GAME_REQUEST_TYPE = "Game";
function getPlayerInfo(action_cb) {
	MyAjaxRequest('player.json', function response_got(result) {
		if (result.ok && !result.dat.errors) {
			if (result.dat.timestamp) {
				serverTimeOffset = result.dat.timestamp - (new Date().getTime() / 1000);
			}
			var i = 0;
			for (city in result.dat.cities) {
			    if (JSON.stringify(result.dat.cities[city]) === undefined) { 
			        continue; 
			    }
				if (cityInfo[i] === undefined) {
					cityInfo[i] = {};
				}
				cityInfo[i].city = result.dat.cities[city];
				city_id_to_name[cityInfo[i].city.id] = cityInfo[i].city.name;

				for (var j = 0; j < result.dat.cities[city].buildings.length; j++) {
				    building_id_to_type[result.dat.cities[city].buildings[j].id] = result.dat.cities[city].buildings[j].type;
				}

				if (cityInfo[i].city.type == "Capital") { 
				    capital_index = i; 
				} else {
				    i++;
				    continue;
				}
				for (j = 0; j < result.dat.cities[city].generals.length; j++) {
                                    var general = result.dat.cities[city].generals[j];
				    general_id_to_name[general.id] = general.name;
				    if (game_setting[GENERALS_LOCATIONS].value[general.id] != PROVISIONED) {
        		        game_setting[GENERALS_LOCATIONS].value[general.id] = IN_CITY;
        		    }
                }
				for (j = 0; j < result.dat.cities[city].marches.length; j++) {
					var march = result.dat.cities[city].marches[j];
					game_setting[GENERALS_LOCATIONS].value[march.general_id] = IN_FIELD;
				}
				i++;
			}
            for (research_type in result.dat.research) {
                researchInfo[research_type] = result.dat.research[research_type];
            }
            if (action_cb) { action_cb(result, null, COMPLETE); }
		} else {
	        var status_type = PROTOCOL_ERROR; 
            if (action_cb) { status_type = action_cb(result, null, ERROR_NOT_STARTED); }
		}
        update_object(game_setting_ids[GENERALS_LOCATIONS], game_setting[GENERALS_LOCATIONS]);	
	}, 0);

    var footer = document.getElementById("ft");
    var realm = footer.getElementsByTagName('a')[0].innerHTML.trim();
    if (realmId != realm) init();

    get_reports_retry(DEFAULT_REPORT_COUNT);
}
function get_generals_by_city(index) {
    var generals = {};
    
    if (index != capital_index) { return generals; }
    for (var i = 0; i < cityInfo[index].city.generals.length; i++) {
        generals[cityInfo[index].city.generals[i].id] = {name: cityInfo[index].city.generals[i].name};
    }
    return generals;
}

var BUILDING = 1;
var TECHNOLOGY = 2;
var TROOP = 3;
var ATTACK = 4;
var TIME = 5;
var JOB = 6;

var TO_SCHEDULE = 0;
var ERROR_NOT_STARTED = 1;
var RUNNING = 2;
var COMPLETE = 3;
var ERROR_IN_REQUEST = 4;
var WAITING_FOR_PREREQ = 5;

var OP_CREATE = 0;
var OP_UPGRADE = 1;
var OP_DELETE = 2;

var operations = {};
operations[OP_CREATE] = "Create/Start";
operations[OP_UPGRADE] = "Upgrade";
operations[OP_DELETE] = "Delete";

var unit_types = {};
unit_types[BUILDING] = "Building";
unit_types[TECHNOLOGY] = "Technology";
unit_types[TROOP] = "Soldiers";
unit_types[ATTACK] = "Attack";

var job_states = {};
job_states[TO_SCHEDULE] = "Running";
job_states[ERROR_NOT_STARTED] = "Waiting";
job_states[RUNNING] = "Running";
job_states[COMPLETE] = "Finished";
job_states[ERROR_IN_REQUEST] = "Invalid request";
job_states[WAITING_FOR_PREREQ] = "Waiting for pre-requisites";

function get_presentable_names(unit, unit_type, qty, loc) {
    switch (unit_type) {
    case BUILDING:
        return buildings_DOA_to_TON[building_id_to_type[unit]];
    case TECHNOLOGY:
        return unit;
    case TROOP:
        return troops_DOA_to_TON[unit] + "?Quantity=" + qty;
    case ATTACK:
        var TON_troops = {};
        for (DOA_troop in unit) {
            var TON_troop = troops_DOA_to_TON[DOA_troop];
            if (!is_defined(TON_troop) || !TON_troop) continue;
            
            TON_troops[TON_troop] = unit[DOA_troop];
        }
        var general = get_general_of_troops(unit); 
        if (general && general_id_to_name.length) {
            general = general_id_to_name[general];
            TON_troops[general] = 1;
        }
        return JSON.stringify(TON_troops) + " on [" + loc.x + ", " + loc.y + "]";
    default:
        return "";
    }
}
function get_presentable_preReqs(preReqs) {
    if (!is_defined(preReqs) || !preReqs) { return "{}"; }
    
    var presentablePreReqs = [];
    for (objId in preReqs) {
        var requisites = preReqs[objId];
        var objType = requisites['type'];
        
        var preReqPresentable = null;
        switch (objType) {
        case BUILDING:
            var building_type = get_presentable_names(objId, objType);
            preReqPresentable = building_type + ":{level:" + requisites['level'] + "}";
            break;
        case TECHNOLOGY:
            preReqPresentable = objId + ":{level:" + requisites['level'] + "}";
            break;
        case TROOP:
            var TON_troop = troops_DOA_to_TON[objId];
            preReqPresentable = TON_troop + ":{qty:" + requisites['qty'] + "}";
            break;
        case TIME:
            preReqPresentable = "Time:{at:'" + new Date(requisites['time']).toString() + "'}";
            break;
        }
        if (is_defined(preReqPresentable)) presentablePreReqs.push(preReqPresentable);
    }
    return JSON.stringify(presentablePreReqs);
}
function convert_into_preReqs(troops) {
    var troop_preReqs = {};

    for (troop in troops) {
        if (troop.indexOf("General:") == 0) { continue; }
        if (troop.indexOf("Dragon") == (troop.length - "Dragon".length)) { continue; }

        troop_preReqs[troop] = {};
        troop_preReqs[troop]['type'] = TROOP;
        troop_preReqs[troop]['qty'] = troops[troop];
    }
    return troop_preReqs;
}
function submit_action_req(object) {
    return store_object(object);
}
function get_jobs_to_schedule() {
    var jobs = [];
    {
        jobs.push(key);
    }
    var num_objs = num_stored_objs();
    for (var i = 0; i < num_objs; i++) {
        key = get_key(i);
        var object = retrieve_object(key);
        
        if (!is_defined(object) || !object.hasOwnProperty('type') || (object.type != GAME_REQUEST_TYPE)) { continue; }
        
        {
            jobs.push(key);
        }
    }
    return jobs;
}
var previous_cleanup_at = 0;
function gameActionsThread() {
	var curr_time = (new Date().getTime() / 1000);
    var cleanup_now = false;
    if ((curr_time - previous_cleanup_at) > game_config[CLEANUP_INTERVAL].value) {
        previous_cleanup_at = curr_time;
        cleanup_now = false;
    }
    getPlayerInfo();
    var jobs_to_schedule = get_jobs_to_schedule();
    for (var i = 0; i < jobs_to_schedule.length; i++) {
        var key = jobs_to_schedule[i];
        
        var actionRequest = retrieve_object(key);

        if (!is_defined(actionRequest) || (!actionRequest.hasOwnProperty('type')) || (actionRequest.type != GAME_REQUEST_TYPE)) { continue; }
        if (cleanup_now) {
            var cleanup_states = game_config[CLEANUP_STATES].value;
            for (var j = 0; j < cleanup_states.length; j++) {
                if (actionRequest.status == cleanup_states[j]) {
                    continue;
                }
            }
        }
        if (city_id_to_name.length > 0) {
            for (var a = 0; a < cityInfo.length; a++) {
                for (var b = 0; b < cityInfo[a].city.jobs.length; b++) {
                    var job_id = cityInfo[a].city.jobs[b].id;

                    if (job_id == actionRequest.job_id) {
                        actionRequest.status = RUNNING;
                        actionRequest.ran_at = (new Date().getTime() / 1000);
                    }
                }
            }
        } else {
            break;
        }

        if (actionRequest.unit_type == ATTACK) {
            general = get_general_of_troops(actionRequest.unit);
            if (is_defined(general) && general && (game_setting[GENERALS_LOCATIONS].value[general] == PROVISIONED)) {
                if (((actionRequest.provisionedAt + 1200) <= curr_time) && 
                    (actionRequest.status != RUNNING) && (actionRequest.status != COMPLETE)) {
                    game_setting[GENERALS_LOCATIONS].value[general] = IN_FIELD;
                    continue;                    
                }
            }
        }
        var TRANSIENT_STATE_TIMEOUT = 10;
        if (actionRequest.status == TO_SCHEDULE) {
            if (actionRequest.TS) {
                if ((curr_time - actionRequest.TS) >= TRANSIENT_STATE_TIMEOUT) {
                    actionRequest.TS = null;
                    actionRequest.status = ERROR_NOT_STARTED;
                }
            } else {
                actionRequest.TS = curr_time;
            }
            update_object(key, actionRequest);
        }
             
        var can_be_scheduled = false;
        if (actionRequest.status == WAITING_FOR_PREREQ) {
            var pre_req = actionRequest.preReq;
            can_be_scheduled = true;
            if (is_defined(pre_req)) {
                for (obj_id in pre_req) {
                    if (!can_be_scheduled) { break; }
                    
                    var requisites = pre_req[obj_id];
                    var obj_type = requisites['type'];
                
                    var object_found = false;
                    var props_matched = false;
                    switch (obj_type) {
                    case BUILDING:
                        for (var k = 0; k < cityInfo.length; k++) {
                            for (var l = 0; l < cityInfo[k].city.buildings.length; l++) {
                                if (obj_id == cityInfo[k].city.buildings[l].id) {
                                    object_found = true;
                                    props_matched = true;
                                    for (requirement in requisites) {
                                        if (requirement == 'type') { continue; }
                                        if (parseInt(cityInfo[k].city.buildings[l][requirement]) < parseInt(requisites[requirement])) {
                                            props_matched = false;
                                            break;
                                        }
                                    }
                                    if (object_found) { break; }
                                }
                            }
                            if (object_found) { break; }
                        }
                        if (!object_found || !props_matched) {
                            can_be_scheduled = false;
                        }
                        break;
                    case TECHNOLOGY:
                        var research_level = researchInfo[technologies[obj_id]];
                        if (parseInt(requisites['level']) > parseInt(research_level)) {
                            can_be_scheduled = false;
                        }
                        break;
                    case TROOP:
                        var total_troops =
                        parseInt(cityInfo[capital_index].city.units.hasOwnProperty(obj_id) ? cityInfo[capital_index].city.units[obj_id] : 0);
                        if (parseInt(requisites['qty']) > total_troops) {
                            can_be_scheduled = false;
                        }
                        break;
                    case TIME:
                        curr_time = (new Date().getTime());
                        if (curr_time < parseInt(requisites['time'])) {
                            can_be_scheduled = true;
                        }
                        break;
                    case JOB:
                        can_be_scheduled = false;
                        var depending_on = obj_id;
                        var state = requisites['job_state'];
                        var time_gap = requisites['time_gap'];
                        
                        for (j = 0; j < num_stored_objs(); j++) {
                            var key_candidate = get_key(j);
                            var preReq_job = retrieve_object(key_candidate);

                            if (!is_defined(preReq_job)) { continue; }
                            
                            if ((key_candidate == depending_on) && 
                                (preReq_job.status == state) && 
                                (preReq_job.ran_at && ((preReq_job.ran_at + time_gap) <= curr_time))) {
                                can_be_scheduled = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (actionRequest.unit_type == ATTACK) {
                general = get_general_of_troops(actionRequest.unit);
                if (!is_defined(general) || !general) {
                    can_be_scheduled = false;
                } else if (game_setting[GENERALS_LOCATIONS].value[general] == IN_FIELD) {
                    can_be_scheduled = false;
                } else if (game_setting[GENERALS_LOCATIONS].value[general] == IN_CITY) {
                    game_setting[GENERALS_LOCATIONS].value[general] = PROVISIONED;
                    update_object(game_setting_ids[GENERALS_LOCATIONS], game_setting[GENERALS_LOCATIONS]);
                    actionRequest.provisionedAt = Math.floor((new Date().getTime()) / 1000);
                    update_object(key, actionRequest);
                }
            }
        }
        if ((actionRequest.status == ERROR_NOT_STARTED) || can_be_scheduled) {
            if (actionRequest.preReq && (actionRequest.status == ERROR_NOT_STARTED)) {
                actionRequest.status = WAITING_FOR_PREREQ;
                update_object(key, actionRequest);
                continue;
            }
            actionRequest.status = TO_SCHEDULE;            
            switch (actionRequest.unit_type) {
            case BUILDING:
                if (actionRequest.op == OP_UPGRADE) {
                    upgrade_building(actionRequest.city, actionRequest.unit, action_callback, key);
                } else if (actionRequest.op == OP_DELETE) {
                    remove_building(actionRequest.city, actionRequest.unit, action_callback, key);
                }
                break;
            case TECHNOLOGY:
                if (actionRequest.op == OP_UPGRADE) {
                    research_technology(actionRequest.city, actionRequest.unit, action_callback, key);
                } else {
                    actionRequest.status = ERROR_IN_REQUEST;
                }
                break;
            case TROOP:
                if (actionRequest.op == OP_CREATE) {
                    train_units(actionRequest.city, actionRequest.unit, actionRequest.qty, action_callback, key);
                } else if (actionRequest.op == OP_DELETE) {
                    dismiss_units(actionRequest.city, actionRequest.unit, actionRequest.qty, action_callback, key);
                } else {
                    actionRequest.status = ERROR_IN_REQUEST;
                }
                break;
            case ATTACK:
                if (actionRequest.op == OP_CREATE) {
                    attack(actionRequest.city, actionRequest.unit, actionRequest.location.x, actionRequest.location.y, 
                        action_callback, key);
                } else {
                    actionRequest.status = ERROR_IN_REQUEST;
                }
                break;
            default: 
                actionRequest.status = ERROR_IN_REQUEST;
                break;
            }
            update_object(key, actionRequest);
        }
    }
    setTimeout(gameActionsThread, 20000);
}
var PROTOCOL_ERROR = 1;
var DATA_ERROR = 2;
var DATA_SUCCESS = 3;
function action_callback(result, object_id, status) {
    if (!is_defined(status)) { return PROTOCOL_ERROR; }
    if ((status < TO_SCHEDULE) || (status > WAITING_FOR_PREREQ)) {
        return PROTOCOL_ERROR;
    }
    
    var object = retrieve_object(object_id);
    if (!is_defined(object) || !object) { return DATA_ERROR; }
    object.status = status;
    object.job_id = ((result && result.dat.result.job) ? result.dat.result.job.id : 0);
    update_object(object_id, object);
    if ((status == RUNNING) || (status == COMPLETE)) {
        object.ran_at = (new Date().getTime() / 1000);

    }
    return ((status != ERROR_IN_REQUEST) ? DATA_SUCCESS : DATA_ERROR);
}
var city_buildings = {"Home":"Home", "Fortress":"Downtown", "ScienceCenter":"Research Center",
    "OfficerQuarter":"Generals Crypt", "DragonKeep":"Gargoyle Perch", "MusterPoint":"Assembly Point",
    "Theater":"Nightclub", "StorageVault":"Warehouse", "Wall":"Walls", "Garrison":"Barracks",
    "Farm":"Blood Lab", "Quarry":"Concrete Plant", "Mine":"Crystal Pit", "Lumbermill":"Steelworks",
    "Metalsmith":"Furnace", "Factory":"Arsenal", "Rookery":"Bell Tower", "Sentinel":"Watch Tower"};     
var outpost_buildings = {"Home":"Home", "DragonKeep":"Gargoyle Perch", "MusterPoint":"Assembly Point",
    "Wall":"Walls", "Wonder":"Ziggurat", "Silo":"Depot", "TrainingCamp":"Outpost Barracks", 
    "Farm":"Blood Lab", "Quarry":"Concrete Plant", "Mine":"Crystal Pit", "Lumbermill":"Steelworks"};	    

function remove_building_retry(city_id, building_id) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: building_id, unit_type: BUILDING, location: 0, qty: 1, op: OP_DELETE, status: TO_SCHEDULE};
	var id = store_object(object);
    remove_building(city_id, building_id, action_callback, id);
}
function upgrade_building_retry(city_id, building_id) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: building_id, unit_type: BUILDING, location: 0, qty: 1, op: OP_UPGRADE, status: TO_SCHEDULE};
	var id = store_object(object);
    upgrade_building(city_id, building_id, action_callback, id);
}
function remove_building(city_id, building_id, action_cb, context) {
    MyAjaxRequest('cities/' + city_id + '/buildings/' + building_id + '.json', function response_got(result) {
    	if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
	        var status_type = PROTOCOL_ERROR; 
	        if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
	    } else {
	        status_type = DATA_SUCCESS;
	        if (action_cb) { status_type = action_cb(result, context, TO_SCHEDULE); }
	    }
	}, 1, 'delete');
}
function upgrade_building(city_id, building_id, action_cb, context) {
    MyAjaxRequest('cities/' + city_id + '/buildings/' + building_id + '.json', function result_got(result) {
		if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
	        var status_type = PROTOCOL_ERROR; 
	        if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
	    } else {
	        status_type = DATA_SUCCESS;
	        if (action_cb) { status_type = action_cb(result, context, TO_SCHEDULE); }
	    }
	}, 1, 'put');
}
var technologies = {"Twilight Warfare": "Metallurgy", "Vein Mining": "Woodcraft", 
	"Concrete Blends": "Masonry", "Crystallography": "Mining", 
	"Blood Chemistry": "Agriculture", "Shapeshifting": "Clairvoyance",
	"Selective Breeding": "Dragonry", "Endurance": "RapidDeployment", 
	"Blood Transfusions": "Medicine", "Architecture": "Levitation", 
	"Spectral Vision": "Ballistics", "Gargoyle Agility": "AerialCombat"};

function research_technology_retry(city_id, technology_name) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: technology_name, unit_type: TECHNOLOGY, location: 0, op: OP_UPGRADE, status: TO_SCHEDULE};
	var id = store_object(object);
	research_technology(city_id, technology_name, action_callback, id);
}
function research_technology(city_id, technology_name, action_cb, context) {
    if (!technologies.hasOwnProperty(technology_name)) {
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
    if (city_id != cityInfo[capital_index].city.id) {
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;        
    }
    var props = {};
	props['research[research_type]'] = technologies[technology_name];
    props['_eventType'] = 'begin_research_request';

	MyAjaxRequest('cities/' + city_id + '/researches.json', function result_got(result) {
	    if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
	        var status_type = PROTOCOL_ERROR; 
	        if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
	    } else {
	        status_type = DATA_SUCCESS;
	        if (action_cb) { status_type = action_cb(result, context, TO_SCHEDULE); }
	    }
	}, 1, 'post', props);
}
var GRUNTS = "Conscript";
var TRUCKS = "Porter";
var SLASHERS = "Halberdsman";
var SIGBINS = "Minotaur";
var FLICKERFORMS = "Spy";
var SNIPERS = "Longbowman";
var VAMPIRE_BATS = "SwiftStrikeDragon";
var NEMESIS_BATS = "BattleDragon";
var ARMORED_TRUCKS = "ArmoredTransport";
var NOSFERATU = "Giant";
var IMPALERS = "FireMirror";
var REAPERS = "AquaTroop";
var ALCHEMIST = "StoneTroop";

var MAP_LENGTH = 750;
var MAP_WIDTH = 750;

function is_valid_troop_type(troop_type) {
    if ((troop_type == GRUNTS) || (troop_type == TRUCKS) || (troop_type == SLASHERS) || (troop_type == SIGBINS) ||
        (troop_type == FLICKERFORMS) || (troop_type == SNIPERS) || (troop_type == VAMPIRE_BATS) || (troop_type == NEMESIS_BATS) || 
        (troop_type == ARMORED_TRUCKS) || (troop_type == NOSFERATU) || (troop_type == IMPALERS) || (troop_type == REAPERS) ||
        (troop_type == ALCHEMIST)) {
        return true;
    }
    return false;
}
function train_units_retry(city_id, unit_id, quantity) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: unit_id, unit_type: TROOP, location: 0, qty: quantity, op: OP_CREATE, status: TO_SCHEDULE};
	var id = store_object(object);
	train_units(city_id, unit_id, quantity, action_callback, id);
}
function train_units(city_id, unit_id, quantity, action_cb, context) {
    if (quantity <= 0) { 
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return; 
    }
    if (!is_valid_troop_type(unit_id)) { 
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
	var props = {};
	props['units[quantity]']  = quantity;
	props['units[unit_type]'] = unit_id;
	props['_eventType'] = 'beginTrainingRequest';
	
	MyAjaxRequest('cities/' + city_id + '/units.json', function result_got(result) {
		if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
	        var status_type = PROTOCOL_ERROR; 
	        if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
	    } else {
	        status_type = DATA_SUCCESS;
	        if (action_cb) { status_type = action_cb(result, context, TO_SCHEDULE); }
		}
    }, 1, 'post', props);
}
function dismiss_units_retry(city_id, unit_id, quantity) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: unit_id, unit_type: TROOP, location: 0, qty: quantity, op: OP_DELETE, status: TO_SCHEDULE};
	var id = store_object(object);
	dismiss_units(city_id, unit_id, quantity, action_callback, id);
}
function dismiss_units(city_id, unit_id, quantity, action_cb, context) {
    if (quantity <= 0) {
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return; 
    }
    if (!is_valid_troop_type(unit_id)) { 
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
	var props = {};
	props['units[quantity]']  = quantity;
	props['units[unit_type]'] = unit_id;
	props['_eventType'] = 'dismissTroopsRequest';
	
	MyAjaxRequest('cities/' + city_id + '/units/dismiss.json', function result_got(result) {
		if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
	        var status_type = PROTOCOL_ERROR; 
	        if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
	    } else {
	        status_type = DATA_SUCCESS;
	        if (action_cb) { status_type = action_cb(result, context, TO_SCHEDULE); }
		}
    }, 1, 'delete', props);
}
function change_units_retry(city_id, unit_id, quantity) {
    var object;
    var id;
    if (quantity > 0) {
        object = {type:GAME_REQUEST_TYPE, city: city_id, unit: unit_id, unit_type: TROOP, location: 0, qty: quantity, op: OP_CREATE, status: TO_SCHEDULE};
        id = store_object(object);
        train_units(city_id, unit_id, quantity, action_callback, id);
    } else {
        object = {type:GAME_REQUEST_TYPE, city: city_id, unit: unit_id, unit_type: TROOP, location: 0, qty: -quantity, op: OP_DELETE, status: TO_SCHEDULE};
        id = store_object(object);
        dismiss_units(city_id, unit_id, -quantity, action_callback, id);
    }
}
function change_units(city_id, unit_id, quantity, action_cb, context) {
    if (quantity > 0) {
        train_units(city_id, unit_id, quantity, action_cb, context);
    } else {
        dismiss_units(city_id, unit_id, -quantity, action_cb, context);
    }
}
function get_units_map(grunts, trucks, slashers, sigbins, flickerforms, snipers, vampireBats, nemesisBats, 
    armoredTrucks, nosferatu, impalers, reapers, alchemists, gargoyle_type, general_id) {
    var units = {};
    if (grunts != 0) {
        units.Conscript = grunts;
    }
    if (trucks != 0) {
        units.Porter = trucks;
    }
    if (slashers != 0) {
        units.Halberdsman = slashers;
    }
    if (sigbins != 0) {
        units.Minotaur= sigbins;
    }
    if (flickerforms != 0) {
        units.Spy = flickerforms;
    }
    if (snipers != 0) {
        units.Longbowman = snipers;
    }
    if (vampireBats != 0) {
        units.SwiftStrikeDragon = vampireBats;
    }
    if (nemesisBats != 0) {
        units.BattleDragon = nemesisBats;
    }
    if (armoredTrucks != 0) {
        units.ArmoredTransport = armoredTrucks;
    }
    if (nosferatu != 0) {
        units.Giant = nosferatu;
    }
    if (impalers != 0) {
        units.FireMirror = impalers;
    }
    if (reapers != 0) {
        units.AquaTroop = reapers;
    }
    if (alchemists != 0) {
        units.StoneTroop = alchemists;
    }
    if (gargoyle_type) {
        units[gargoyle_type] = 1;
    }
    set_general_of_troops(units, general_id);
    return units;
}
function get_general_of_troops(troops) {
    for (troop in troops) {
        if (troop.indexOf("General:") == 0) {
            return troop.substring("General:".length);
        }
    }
    return 0;
}
function set_general_of_troops(troops, general_id) {
    var existing_general = get_general_of_troops(troops);
    if (is_defined(existing_general) && existing_general) {
        delete troops["General:" + existing_general];
    }
    troops["General:" + general_id] = 1;
}
function get_available_general() {
    for (officer_id in game_setting[GENERALS_LOCATIONS].value) {
        if (game_setting[GENERALS_LOCATIONS].value[officer_id] == IN_CITY) {
            return officer_id;
        }
    }
    return 0;
}
function attack_retry(city_id, units, x, y) {    
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: units, unit_type: ATTACK, location: {x:x, y:y}, qty: 1, op: OP_CREATE, status: TO_SCHEDULE};
    var id = store_object(object);
}
function attack(city_id, units, x, y, action_cb, context) {
  setTimeout(function() {
    if (city_id != cityInfo[capital_index].city.id) {
        city_id = cityInfo[capital_index].city.id;
    }

	var multiple_troops = false;
	var troops_data = "{";
	for (var prescribed_unit in units) {
	    if (prescribed_unit.indexOf("General:") == 0) {
	        continue;
	    }
		if (units[prescribed_unit] > 0) {
			if (multiple_troops === true) {
				troops_data += ',';
			}
			troops_data += '"' + prescribed_unit + '":' + units[prescribed_unit];
			multiple_troops = true;
		}
	}
    if ((x < 0) || (x >= MAP_LENGTH) || (y < 0) || (y >= MAP_WIDTH)) {
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
    if (!multiple_troops) {
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
	    return;
    }
    var general_id = get_general_of_troops(units);
    if (!is_defined(general_id) || !general_id) {
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
	troops_data += "}";

	var props = {};
	props['march[type]']	= 'AttackMarch';
	props['march[units]']		= troops_data;
	props['march[general_id]']	= general_id;
	props['march[x]']			= x;
	props['march[y]']			= y;

    MyAjaxRequest('cities/' + city_id + '/marches.json', function result_got(result) {
		if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
	        var status_type = PROTOCOL_ERROR; 
	        if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
		} else {
	        status_type = DATA_SUCCESS;
	        if (action_cb) { status_type = action_cb(result, context, TO_SCHEDULE); }
		}
	}, 1, 'post', props);
 }, 0);
}
function got_detailed_report(result, context, state) {
    if (state != COMPLETE) { return; }
    reports_by_id[context] = result.dat.result;
 {

    }
}
function got_reports(result, context, state) {
    if (state != COMPLETE) { return; }
    if (!result.dat.result.report_notifications) { return; }
    var curr_reports = result.dat.result.report_notifications;

    for (var i = 0; i < curr_reports.length; i++) {
        if (reports_by_id.hasOwnProperty(curr_reports[i].id)) { continue; }
        get_detailed_report_retry(curr_reports[i].id);
        total_reports_got++;
    }
}
var reports_by_id = {};
var total_reports_got = 0;
var DEFAULT_REPORT_COUNT = 30;
function get_reports_retry(count) {
    get_reports(count, got_reports, null);
}
function get_reports(count, action_cb, context) {
    count = parseInt(count);
    if (count <= 0) { count = DEFAULT_REPORT_COUNT; }

    var props = {};
    props['page'] = 1;
    props['count'] = count;

    MyAjaxRequest('reports.json', function result_got(result) {
        if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
            var status_type = PROTOCOL_ERROR; 
            if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
        } else {
            status_type = DATA_SUCCESS;
            if (action_cb) { status_type = action_cb(result, context, COMPLETE); }
        }
    }, 0, null, props); 
}
function get_detailed_report_retry(id) {
    get_detailed_report(id, got_detailed_report, id);
}
function get_detailed_report(id, action_cb, context) {
    MyAjaxRequest( 'reports/'+ id +'.json', function result_got(result) {
        if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
            var status_type = PROTOCOL_ERROR; 
            if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
        } else {
            status_type = DATA_SUCCESS;
            if (action_cb) { status_type = action_cb(result, context, COMPLETE); }
        }
    }, 0, null, null);
}