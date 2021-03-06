// ==UserScript==
// @name           World Domination
// @description    World Domination, medieval wars, american gangster games on facebook/myspace.
// @namespace      WorldDomination
// @version_timestamp        1240392087074
// @include        *://app.playgamespace.com/app_world/*
// @include        *://apps*.facebook.com/medievalempire/*
// @include        *://apps*.facebook.com/american-gangster/*
// @include        *://api.msappspace.com/apprendering/119034/*
// @include        *://api.msappspace.com/apprendering/120643/*
// @include        *://api.msappspace.com/apprendering/116013/*
// @version		20120225
// ==/UserScript==


// @require http://sizzlemctwizzle.com/updater.php?id=43413
// @include        *://apps*.facebook.com/total-war/*
// @include        *://apps*.facebook.com/medievalempire/*
// @include        *://apps*.facebook.com/american-gangster/*


//var version_scriptNum = 43682; // Change this to the number given to the script by userscripts.org (check the address bar)
//var version_timestamp = 1240392087074; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
//function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/source/" + version_scriptNum +".meta.js" + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText; var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/@version_timestamp\s+([0-9]+)\s*$/m.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);


var TotalWar={

uidr:new RegExp('uid:([0-9]+)','i'),
DoCheckPage:-1,

gameNameRe:new RegExp("^/([^/]+)/"),
gameNameMyspaceRe:new RegExp("/apprendering/([^/]+)/"),

GamePrefix:function() {
	return "http://apps.facebook.com/"+this.GameName()+"/";
},
GameName:function() {
	var m=null;
	if(this.IsMyspace()) {
		m=this.gameNameMyspaceRe.exec(window.location.pathname);
	} else {
		m=this.gameNameRe.exec(window.location.pathname);
	}
	if(m) { return m[1]; }
	GM_log('Error unknown game:'+window.location.pathname);
	return null;
},
GMSetValue:function(n,v) {
	return GM_setValue(this.GameName()+"__"+n,v);
},
GMGetValue:function(n,v) {
	return GM_getValue(this.GameName()+"__"+n,v);
},

GetMinPercent:function() {
	return parseInt(this.GMGetValue('minPercent',73));
},


Click:function(obj) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},

LoadAttackInfoTd:function(td) {
	var rmoney=new RegExp('\\$([0-9,]+)','i');
	var r=new RegExp('([0-9]+)%','i');
	var m=r.exec(td.innerHTML);
	if(!r || !m) return null;
	
	var percent=null;
	if(m) {
		percent=parseFloat(m[1]);
	}
	m=rmoney.exec(td.innerHTML);
	var money=null;
	if(m) {
		money=parseInt(m[1].replace(/,/,''));
	}

	var buts=td.getElementsByTagName('a');
	return {'percent':percent,'money':money,button:buts[0]};
},
LoadAttackInfo:function() {
	var tds=document.getElementsByTagName('td');
	var infos=[];
	var lastUid=null;
	var lastLvl=null;
	var uidr=new RegExp('uid:([0-9]+)["\']');
	var lvlr=new RegExp('Level ([0-9]+)');
	for(var t=0; t<tds.length; t++) {
		var td=tds[t];
		var uidm=uidr.exec(td.innerHTML);
		if(uidm && uidm.length>0) {
			lastUid=uidm[1];
		}
		var lvlm=lvlr.exec(td.innerHTML);
		if(lvlm && lvlm.length>0) {
			lastLvl=lvlm[1];
		}
		var upto;

		if((upto=td.innerHTML.indexOf('Chance'))>0) {
			if(td.innerHTML.indexOf('Chance',upto+6)<0) {
				if(lastUid==null || lastLvl==null) {
					GM_log('internal error, could not find uid/lvl:+'+lastUid+", lvl:"+lastLvl);
				}
				var info=this.LoadAttackInfoTd(td);
				if(!info) continue;
				info['uid']=lastUid;
				info['level']=lastLvl;
				infos.push(info);
			}
		}
	}
	return infos;
},

AttackOnBattlePage:function() {

	var battleLeft=document.getElementById('battle_left_container');
	if(!battleLeft || (battleLeft.innerHTML.indexOf('Battles Left')<0 && battleLeft.innerHTML.indexOf('0:00')<0) ) {
		GM_log('waiting to attack.');
		return;
	}
	
	var infos=this.LoadAttackInfo();
	if(infos.length==0) { 
		GM_log('nothing to attack');
		return;
	}
	var mostMoney=null;
	var targets=[];
	if(!this.IsMyspace() && this.GameName()!="medievalempire") {
		targets=this.GetBestTargets();
	}
	for(var t=0; t<infos.length; t++) {
		var info=infos[t];
		if(info.percent<this.GetMinPercent()) { continue; }
		if(mostMoney==null || info.money>mostMoney.money) {
			mostMoney=info;
		}
	}
	var mostMoneyIsBetter=false;
	if(mostMoney!=null && targets.length>0 && targets[0]!=undefined) {
		if(targets[0].level<mostMoney.level) {
			mostMoneyIsBetter=true;
		}
	}
	if(!targets[0] && mostMoney==null) {
		GM_log('cannot find anyone to attack');
		this.ClickRefresh(15);
		return;
	}
	if(!targets[0] || mostMoneyIsBetter) {
		GM_log('new best target'+mostMoney.uid);
		this.GMSetValue('BestTargets','{"percent":'+mostMoney.percent+
			',"level":'+mostMoney.level+
			',"uid":'+mostMoney.uid+
			'}');
	}
	targets=this.GetBestTargets();
	if(targets.length==0 || targets[0].uid=="") {
		this.BattlePage();
	} else {
		this.AttackUid(targets[0].uid);
	}
	return true;
},
FindTarget:function() {
	// find someone to attack
	return this.AttackOnBattlePage();
},


GetBestTargets:function() {
	var targets=this.GMGetValue('BestTargets','').split(/#/);
	var tars=[];
	for(var t=0; t<targets.length; t++) {
		if(targets[t]=="") { continue; }
		var x;
		eval("x="+targets[t]);
		tars.push(x);
	}
	return tars;
},

BattlePage:function() {
	this.VisitUrl(this.GamePrefix()+'?p=battle&f=start');
},
VisitUrl:function(url) {
	GM_log('url:'+url);
	window.setTimeout(function() {
		document.location.href=url;
	},500+Math.floor(Math.random()*500));
},

IsMyspace:function() {
	return (location.href.indexOf('myspace.com')>=0 || location.href.indexOf('msappspace.com')>=0)?true:false;
},

AttackUid:function(uid) {
	GM_log('attack:'+uid);
	if(this.IsMyspace() || this.GameName()=="medievalempire") {
		var as=document.getElementsByTagName('a');
		var found=false;
		for(var a=0; a<as.length; a++) {
			var aObj=as[a];
			if(aObj.id.indexOf("_"+uid)>=0 && aObj.innerHTML.indexOf('Attack')>=0) {
				this.Click(aObj);
				this.DoCheckPage=3000;
				found=true;
				break;
			}
		}
		if(!found) { GM_log('Cannot find attack for:'+uid); }
		this.DoCheckPage=5000;
		return;
	}

	var js="AJ.request('p=battle&f=attack&aj=1', {'postBody' : 'params=uid:"+uid+"',"+
		"'onComplete': function(response) {"+
		" window.location.reload(); }});";
	var scr=document.createElement('script');
	scr.innerHTML=js;
	document.body.appendChild(scr);
/*
	var url=this.GamePrefix()+'?p=battle&f=select&params=uid:'+
		uid;
	
	this.VisitUrl(url);
*/	
},
ViewUid:function(uid) {
	GM_log('viewuid:'+uid);
	document.location.href=
		this.GamePrefix()+'?p=player&f=view&params=uid:'+
		uid;
},
CheckAttackButton:function() {
	var attackButton=this.GMGetValue('AttackButton');
	if(!attackButton) { return; }
	this.GMSetValue('AttackButton',0);
	var as=document.getElementsByTagName('div');
	for(var a=0; a<as.length; a++) {
		var aObj=as[a];
		if(aObj.className=="big_button" && aObj.innerHTML.indexOf('Attack')>=0) {
			this.Click(aObj);
			break;
		}
	}
},

ChangePercent:function() {
	this.GMSetValue('minPercent',document.getElementById('AttackMinPercent').value);
},
AddChangePercentDiv:function() {
	if(document.getElementById('AttackInfoDiv')) { return; }
	var div=document.createElement('DIV');
	div.id='AttackInfoDiv';
	div.innerHTML="<form>Minimum percent to attack: <input size='3' id='AttackMinPercent' value='"+
		this.GetMinPercent()+
		"' />% "+
		"<input id='AttackSave' type='button' value='Save' /></form>";

	var reseta=document.createElement('a');
	reseta.innerHTML="Reset and stop attacking the best player that we've found";
	reseta.href='javascript:;';
	reseta.addEventListener('click',function() {
		TotalWar.ResetGame(); 
	},false);
	div.appendChild(reseta);
	
	var p=document.getElementById('content');
	
	if(!p) p=document.body;
	p.insertBefore(div,p.childNodes[0]);
	var save=document.getElementById('AttackSave');
	save.addEventListener('click',function() {
		TotalWar.ChangePercent();
	},false);
},

ResetGame:function() {
	this.GMSetValue('BestTargets','');
},
leftRe:new RegExp('/[0-9]+\\s+\\S+\\s+left','i'),

ClickRefresh:function(waitSecs) {
	window.setTimeout(function() {
		var q=document.evaluate("//a[contains(string(),'Refresh List')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		if(q && q.singleNodeValue) {
			GM_log('click refreshlist');
			location.href=q.singleNodeValue.href;
//			TotalWar.Click(q.singleNodeValue);
		} else {
			GM_log('Cannot find refresh link');
		}
//			window.history.go(0);
	}
	,1000*waitSecs);
	this.DoCheckPage=3000+(1000*waitSecs);
},
FindXPath:function(path,obj) {
	if(!obj) obj=document;
	var q=document.evaluate(path,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) {
		return q.singleNodeValue;
	}
	return null;
},
CheckPage:function() {
	this.AddChangePercentDiv();
	if(this.IsMyspace()) {
		this.DoCheckPage=5000;
	} else {
		this.DoCheckPage=8000;
	}
	var tryAgainSS=document.evaluate("//a[@name='try_again_button']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);

	if(document.body.innerHTML.indexOf('No battles left')>0 
	|| document.body.innerHTML.indexOf('limit has been reached')>0
	|| document.body.innerHTML.indexOf('next in ')>0
	) {
		var nexr=new RegExp('(more|next)\\s+(battle\\s+)?in ([0-9]+) minutes','i');
		var nextm=nexr.exec(document.body.innerHTML);
		var mins=1;

		if(nextm && nextm.length>1) {
			mins=parseInt(nextm[3])+1;
		}
		GM_log('no battles left, wait mins:'+mins);
		this.ClickRefresh(mins*60);
	} else if(tryAgainSS && tryAgainSS.singleNodeValue) {
		// stupid server crashed.
		GM_log('server crash, wait a while');
		window.setTimeout(function() { 
			window.history.go(0);
		}
		,30000);
		this.DoCheckPage=-1;
	} else {
		if(this.IsMyspace()) {
			if(this.leftRe.exec(document.body.innerHTML)) {
				TotalWar.AttackOnBattlePage();
			}
		} else {
			var href=document.location.href;
//			var battle=this.FindXPath("//a[contains(@onclick,'attack_input')]");
//			var battle=this.FindXPath("//a[contains(string(),'Attack')]");
			if(href.indexOf("p=battle")>=0) {
			//if(battle) {
				TotalWar.AttackOnBattlePage();
			} else {
				// AttackButton doesn't get set in GMValue, this doesn't do anything...
//			} else if(href.indexOf("p=player")>=0) {
				TotalWar.CheckAttackButton();
			}
		}
	}

	if(this.DoCheckPage>0) {
		window.setTimeout(function() { TotalWar.CheckPage(); },this.DoCheckPage);
	}
}


};

if(GM_registerMenuCommand) {
	GM_registerMenuCommand('World Domination - Reset',function() { TotalWar.ResetGame(); });
}


TotalWar.CheckPage();

