// ==UserScript==
// @name         bro3_Auto_Bilder
// @namespace    http://at-n2.net/
// @description  ブラウザ三国志 自動建築スクリプト By nottisan+s4_08
// @include      http://*.3gokushi.jp/*
// ==/UserScript==

////	add	mouse_ivent
////	初期値変更
////	フォント：メイリオ
////	バックカラー・フォントサイズ変更
////	リンクをプロパティページに移動：addOpenLinkHtml削除
////	LookAroundTimeをVarに弾き出し
////	※未：各関数の意義検討：呼出回数・行数からインライン化
//2010.10.25 「研究中」「建物削除中」の時建設されないバグを修正
//2010.10.28 「ALLクリア」機能実装
//2010.10.28 市場糧自動変換機能仮実装
//2010.10.29 城・砦・村がレベルアップされないバグを修正
//2010.10.29 市場糧自動変換機能バグ取り完了
//2010.10.31 糧村化機能実装
//20110201 nokinさんスキル自動使用部分利用＋強制使用変更
//20110201 寄付削除

//市場用
var OPT_RISE_MAX = 30000; //市場変換開始する糧の量
var OPT_TO_WOOD = 10000; //木に変換する糧
var OPT_TO_STONE = 10000; //石に変換する糧
var OPT_TO_IRON = 10000; //鉄に変換する糧
var WOOD = 101; //木の内部コード
var STONE = 102; //石の内部コード
var IRON = 103; //鉄の内部コード
var RICE = 104; //糧の内部コード

//新規作成用
var OPT_KATEMURA = 0; //自動糧村化オプション
var OPT_TORIDE = 0; //自動砦化オプション
var OPT_SOUKO_MAX = 2; //倉庫の最大数

//内政用 by nottisan
var OPT_DOME = 1

//グローバル変数
var VERSION = "0.0.6βs4_08";  //バージョン情報
var INTERVAL=1000;  //負荷対策 回線速度によっては正常動作しない時があります。その際は数値を増やしてください。1秒=1000
var HOST = location.hostname; //アクセスURLホスト
var PGNAME = "_Auto_Bilder_"; //グリモン領域への保存時のPGの名前
var TIMEOUT_URL ="/false/login_sessionout.php"; //タイムアウト時のURLの一部
var g_MD="";

var SENDTFLG_TIMEOUT = 0;	//タイムアウト画面
var SENDTFLG_LOGIN_MENU = 1;	//ログイン画面
var SENDTFLG_LOGIN = 2;	        //ログイン中
var d = document;

// 保存データデリミタ
var DELIMIT1 = "#$%";
var DELIMIT2 = "&?@";
var DELIMIT3 = "{=]";
var DELIMIT4 = "|-/";

//保存データインデックス（拠点）
var IDX_XY = 0; //座標
var IDX_BASE_NAME = 1; //拠点名
var IDX_URL = 2; //拠点URL
var IDX_ACTIONS = 3; //実行中作業

//保存データインデックス（実行中作業）
var IDX2_STATUS = 0; //ステータス
var IDX2_TIME = 1; //完了時刻
var IDX2_TYPE = 2; //種別 C:都市画面、D:内政スキル、Fxy:施設座標
var IDX2_ALERTED = 3; //通知済フラグ

var OPT_CHKBOX_AVC = 1;		////巡回チェックボックス
var OPT_CHKBOX = [1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0];
var OPT_MAX_LV = "20";
var OPT_FUC_NAME = ["拠点","伐採所","石切り場","製鉄所","畑","倉庫",
                    "銅雀台","鍛冶場","防具工場","練兵所","兵舎","弓兵舎",
                    "厩舎","宿舎","兵器工房","市場","訓練所","水車","工場",
                    "研究所","大宿舎","遠征訓練所","見張り台","修行所"];

//市場変換処理用
var OPT_ICHIBA = 0;
var OPT_ICHIBA_PA = 0;
var OPT_ICHIBA_PATS = ["平均的に変換","一括変換"];
var d = document;
var $ = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $a = function(xp,dc) { var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); };

//LvUPリンク
var LVUPLINK = "http://SITE/facility/build.php?x=urlX&y=urlY&village_id=viID#ptop";
var URL_SITE = "SITE";
var URL_X = "urlX";
var URL_Y = "urlY";
var URL_viID = "viID";

//新規作成リンク
var CREATELINK = "http://SITE/facility/build.php?id=fID&x=urlX&y=urlY&village_id=viID";
var URL_fID = "fID"; //建物のID
var HATAKE = 215;
var SOUKO = 233;
var SUZUME = 216;
var VillageData = new Array();
var OPT_VILLAGE = new Array();
var isMixi = true;
disp_Options();

//Main
(function(){
	//君主プロフィール画面なら都市画面URLを取得
	if ((location.pathname == "/user/" || location.pathname == "/user/index.php") &&
		getParameter("user_id") == "") {
		getUserProf();
	}
	//拠点画面なら対象建築物の建築チェック
	if (location.pathname == "/village.php") {
		setVillageFacility();

		//市場処理
		ichibaChange();

		//自動内政処理 by nottisan
		Auto_Domestic();

		forwardNextVillage();
	}else{
		if(location.pathname != "/facility/castle_send_troop.php"){
			var villages = loadVillages(HOST+PGNAME);
			var vURL = villages[0][IDX_URL];
			var tid=setTimeout(function(){location.href = vURL;},1800000);
		}
	}

})();

function setVillageFacility() {
	var cnt=0;
	var vID = "";
	//座標を取得
	var xyElem = document.evaluate('//*[@id="basepoint"]/span[@class="xy"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	vId = trim(xyElem.snapshotItem(0).innerHTML);
	//alert(vId);
	
	//建設情報を取得
	var actionsElem = document.evaluate('//*[@id="actionLog"]/ul/li',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < actionsElem.snapshotLength; i++) {
		var paItem = actionsElem.snapshotItem(i);
		//ステータス
		var buildStatusElem = document.evaluate('./span[@class="buildStatus"]/a',
			paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		//alert(buildStatusElem);
		if (buildStatusElem.snapshotLength > 0) {
			//建物削除等に対応 2010.10.25 byおぜがづ
			for(var j=0; j<buildStatusElem.snapshotLength;j++){
				if(buildStatusElem.snapshotItem(j).parentNode.innerHTML.match(RegExp("(建設中|建設準備中)"))) {
					//施設建設数
					cnt++;
				}
			}
			//施設建設数
			//cnt++;
		}
	}
	//alert(actionsElem.snapshotLength);

	Load_OPT(vId);	//LvUP対象の取得

	//建設予約ができるかどうか
	if(cnt >= 1) return;
	//if(cnt == 2) return;

	if(OPT_KATEMURA == 1) {
		var area_all = new Array();
		area_all = get_area_all();
		var hatake = 0; //畑の総数
		var souko = 0; //倉庫の総数
		var suzume = 0; //雀の総数
		var heichi = 0; //平地の総数
		var suzume_Flag = 0;
		var n = -1;
		for(var i=0;i < area_all.length;i++){
			if(area_all[i].name == "平地"){heichi++;n=i;}
			else if(area_all[i].name.match(/畑\s.*?(\d+)/)){hatake++;if(parseInt(RegExp.$1)>=5){suzume_Flag=1;}}
			else if(area_all[i].name.match(/倉庫/)){souko++;}
			else if(area_all[i].name.match(/銅雀台/)){suzume++;}
		}
		

//		alert("平地:" + heichi + "\n畑:" + hatake + "\n倉庫:" + souko + "\n雀:" + suzume + "\n畑が建てられる平地:" + (tmp - hatake));
		if(heichi>0){ //平地が余っていたら
			var tmp = heichi;
			if(suzume != 1){ //雀がまだ建っていなければ
				tmp -= 1; //平地の数をマイナス1
			}
			if(souko < OPT_SOUKO_MAX){ //倉庫がまだ最大数建っていなければ
				tmp -= (OPT_SOUKO_MAX - souko); //平地の数をマイナス]
			}
//		alert("平地:" + heichi + "\n畑:" + hatake + "\n倉庫:" + souko + "\n雀:" + suzume + "\n畑が建てられる平地:" + (tmp - hatake));
//			if(tmp-hatake > 0){ //それでも平地が余っていれば
			if(tmp > 0){ //それでも平地が余っていれば
				if(Chek_Sigen(new lv_sort("畑",0,"")) != 1){ //資源チェック
					createFacility(HATAKE, area_all); //畑を建てる
					Reload_Flg = 0;
					return;
				};
			} else if(souko < OPT_SOUKO_MAX){ //倉庫が建てられる平地があれば
				if(Chek_Sigen(new lv_sort("倉庫",0,"")) != 1){ //資源チェック
					createFacility(SOUKO, area_all); //倉庫を建てる
					Reload_Flg = 0;
					return;
				}
			} else if(suzume != 1 && suzume_Flag == 1){ //雀がまだ建っていなければ
				if(Chek_Sigen(new lv_sort("銅雀台",0,"")) != 1){ //資源チェック
					createFacility(SUZUME, area_all); //雀を建てる
					Reload_Flg = 0;
					return;
				}
			}
		}
//		alert("平地:" + heichi + "\n畑:" + hatake + "\n倉庫:" + souko + "\n雀:" + suzume);
//		return;
//建てられるスペースがなければ通常の処理を続ける
	}


	var area = new Array();
	area = get_area();

	area.sort(cmp_lv);
	var Reload_Flg = 0;
	for(i=0;i<area.length;i++){
		//alert(area[i].name + ":" + area[i].lv + ":" + area[i].xy);
		//alert(parseInt(area[i].lv) + "::" + parseInt(OPT_MAX_LV));
		
		if(parseInt(area[i].lv) >= parseInt(OPT_MAX_LV)){break;} //指定Lv以上ならメインに戻る
		//建築物名分回す
		//村・城がレベルアップされないバグを修正 2010.10.29 by おぜがづ
		//村・城を追加
		OPT_FUC_NAME.push("村","城","砦");
		if(OPT_CHKBOX[0] == 1) {
			OPT_CHKBOX.push(1,1,1);
		} else {
			OPT_CHKBOX.push(0,0,0);
		}
		OPT_CHKBOX.push
		for(var ii=0;ii<OPT_FUC_NAME.length;ii++){
			//ソートしたLvの低い順に比較する
			if(area[i].name == OPT_FUC_NAME[ii]){
				//建築指示が有るか確認する。
				if(parseInt(OPT_CHKBOX[ii]) == 1){
					//建築に必要な資源が有るかどうかチェック
					var ret = Chek_Sigen(area[i]);
					if(ret == 1){
						//30分後にリロードするかどうか
						Reload_Flg = 1;
						break;
					}
					
					//alert("LvUP開始");
					//alert(parseInt(OPT_CHKBOX[ii]) + "::" + area[i].name + "::" + OPT_FUC_NAME[ii]);
					var mURL = LVUPLINK;
					mURL = mURL.replace(URL_SITE,HOST);
					var Temp = area[i].xy.split(",");
					mURL = mURL.replace(URL_X,Temp[0]);
					mURL = mURL.replace(URL_Y,Temp[1]);
					mURL = mURL.replace(URL_viID,getVillageID(vId));
					var tid=setTimeout(function(){location.href = mURL;},INTERVAL);
					Reload_Flg = 0;
					return;
				}
			}
		}
	}
	
	if(Reload_Flg == 1){
		var tid=setTimeout(function(){location.reload();},600000);
	}

}

//施設一覧取得
function get_area(){
	var results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var area = new Array();
	for(var i=0,n=0; i<results.snapshotLength; i++){
		if(results.snapshotItem(i).alt.match(/(.*?)\s.*?(\d+)/)){
			var strURL = results.snapshotItem(i).href;
			area[n] = new lv_sort(RegExp.$1,RegExp.$2,getURLxy(strURL));
			//alert(area[n].xy);
			n++;
		}
	}
	return area;
}

function get_area_all(){
	var results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var area = new Array();
	for(var i=0,n=0; i<results.snapshotLength; i++){
		var strURL = results.snapshotItem(i).href;
		area[n] = new areas(results.snapshotItem(i).alt,getURLxy(strURL));
		n++;
	}
	return area;
}

//施設建設
function createFacility(f, area){
//	alert("createFacility");
	area.sort(cmp_areas);
	for(var i=0;i<area.length;i++){
		if(area[i].name == "平地"){ //一番最初に見つかった平地に建設
			var mURL = CREATELINK;
			mURL = mURL.replace(URL_SITE,HOST);
			var Temp = area[i].xy.split(",");
			mURL = mURL.replace(URL_X,Temp[0]);
			mURL = mURL.replace(URL_Y,Temp[1]);
			mURL = mURL.replace(URL_viID,getVillageID(vId));
			mURL = mURL.replace(URL_fID,f);
			var tid=setTimeout(function(){location.href = mURL;},INTERVAL);
			return;
		}
	}
}

function areas(name,xy){
	this.name = name;
	this.xy = xy;
}

//比較する関数
function cmp_areas(a,b){
	if(a.xy > b.xy){return 1;} else {return -1;}
}

// 次拠点移動
function forwardNextVillage(){
	loadAVCBox();

	if(OPT_CHKBOX_AVC == 1){
		var vcURL = nextVillageURL(getVillageID(vId));
		var tid=setTimeout(function(){location.href = vcURL;},30000);
	}
}

// 次拠点URL取得
function nextVillageURL(vId){
	var villages = loadVillages(HOST+PGNAME);
	var nextIndex = 0;

	// 現在の拠点のインデックスを検索
	for(var i=0; i<villages.length;i++){
		var url = villages[i][IDX_URL];
		if(vId == getParameter2(villages[i][IDX_URL], "village_id")){
			if(i+1 < villages.length){
				nextIndex = i+1;
			}else{
				nextIndex = 0;
			}
			
			break;
		}
	}

	return villages[nextIndex][IDX_URL];
}

// URLパラメタ取得
function getParameter2(url, key) {
	var str = url.split("?");
	if (str.length < 2) {
		return "";
	}

	var params = str[1].split("&");
	for (var i = 0; i < params.length; i++) {
		var keyVal = params[i].split("=");
		if (keyVal[0] == key && keyVal.length == 2) {
			return decodeURIComponent(keyVal[1]);
		}
	}
	return "";
}



//建築物の格納用
function lv_sort(name,lv,xy){
	this.name = name;
	this.lv = lv;
	this.xy = xy;
}
//比較する関数
function cmp_lv(a,b){
	return a.lv - b.lv;
}
//拠点IDの取得
function getVillageID(vId){
	//villages
	var villages = loadVillages(HOST+PGNAME);
	for(var i=0; i<villages.length;i++){
		if(villages[i][IDX_XY] == vId){
			var vURL = villages[i][IDX_URL];
			var temp = vURL.split("?");
			var temp2 = temp[1].split("=");
			return temp2[1];
		}
	}
}
function getURLxy(strURL){
	//alert(strURL);
	if(strURL == ""){ return "";}
	var strTemp = "";
	strTemp = strURL;
	var Temp = strTemp.split("?");
	var Temp2 = Temp[1].split("&");
	var Temp3 = Temp2[0].split("=");
	var Temp4 = Temp2[1].split("=");
	return Temp3[1] + "," +Temp4[1];
}


//建築設定画面を開く
function openIniBilderBox() {
	closeIniBilderBox();
	addIniBilderHtml();
}

//建築設定画面を閉じる
function closeIniBilderBox() {
	deleteIniBilderHtml();
	deleteIniBilderFrameHtml();
}
//建築対象拠点表示HTML削除
function deleteIniBilderHtml() {
	var elem = d.getElementById("ABContainer");
	if (elem == undefined) return;
	d.body.removeChild(d.getElementById("ABContainer"));
}
//建築対象拠点表示HTML削除
function deleteIniBilderFrameHtml() {
	var elem = d.getElementById("ABContainer");
	if (elem == undefined) return;
	d.body.removeChild(document.getElementById("ABContainer"));
}

//LvUP対象施設設定画面を開く
function openInifacBox(vId) {
	closeInifacBox();
	addInifacHtml(vId);
}
///LvUP対象施設設定画面を閉じる
function closeInifacBox() {
	deleteInifacHtml();
	deleteInifacFrameHtml();
}

///LvUP対象施設設のチェックボックスをクリアする
function clearInifacBox() {
	var checkbox = $a('//input[@type="checkbox"]');
	for(var i= 0;i < checkbox.length; i++) {
		checkbox[i].checked = false;
	}
}

//建築対象施設表示HTML削除
function deleteInifacHtml() {
	var elem = d.getElementById("ABfacContainer");
	if (elem == undefined) return;
	d.body.removeChild(d.getElementById("ABfacContainer"));
}
//建築対象施設表示HTML削除
function deleteInifacFrameHtml() {
	var elem = d.getElementById("ABfacContainer");
	if (elem == undefined) return;
	d.body.removeChild(document.getElementById("ABfacContainer"));
}

//ステイタス取得HTML追加
function addIniBilderHtml() {

	var popupLeft = 500;
	var popupTop = 250;

	if(!isMixi) 
	{
		popupLeft = 700;
		popupTop = 200;
	}

	//表示コンテナ作成
	var ABContainer = d.createElement("div");
	ABContainer.id = "ABContainer";
	ABContainer.style.position = "absolute";
	ABContainer.style.backgroundColor = "DimGray";
	ABContainer.style.border = "outset 2px DimGray";
	ABContainer.style.font =  "メイリオ";  
	ABContainer.style.left = popupLeft + "px";
	ABContainer.style.top = popupTop + "px";
	ABContainer.style.fontSize = "12px";
	ABContainer.style.padding = "3px";
	ABContainer.style.zIndex = 255;
	d.body.appendChild(ABContainer);

    $e(ABContainer, "mousedown", function(event){
                if( event.target != $("ABContainer")) {return false;}
                g_MD="ABContainer";
                g_MX=event.pageX-parseInt(this.style.left,10);
                g_MY=event.pageY-parseInt(this.style.top,10);
                event.preventDefault();});
    $e(d, "mousemove", function(event){
                if(g_MD != "ABContainer") return true;
                var ABContainer = $("ABContainer");
                if( !ABContainer ) return true;
                var x = event.pageX - g_MX;
                var y = event.pageY - g_MY;
                ABContainer.style.left = x + "px";
                ABContainer.style.top = y + "px";
                csaveData("config_window_x", x);
                csaveData("config_window_y", y);
                });
    $e(d, "mouseup", function(event){g_MD="";});
/*	
	//閉じるリンク
	var closeLink = d.createElement("a");
	closeLink.id = "timerCloseLink";
	closeLink.href = "javascript:void(0);";
	closeLink.style.margin = "3px";
	closeLink.innerHTML = "閉じる";
	closeLink.addEventListener("click", function() {closeIniBilderBox()}, true);
	ABContainer.appendChild(closeLink);
*/	
	//バージョン
	var version = d.createElement("span");
	version.style.fontSize = "9px";
	version.style.margin = "3px";
	version.innerHTML = "Ver." + VERSION;
	ABContainer.appendChild(version);
	
	//拠点設定リンクの作成
	var tbl = d.createElement("table");
	tbl.style.border ="0px";
	//拠点情報のロード
	var villages = loadVillages(HOST+PGNAME);
	//拠点情報が無い場合
	if(villages.length == 0){
		var tr = d.createElement("tr");
		var td = d.createElement("td");
		td.style.padding = "3px";
		td.style.verticalAlign = "top";
		td.style.border = "outset 2px black";
		tr.appendChild(td);
		tbl.appendChild(tr);
		var msg = d.createElement("span");
		msg.style.fontSize = "15px";
		msg.style.margin = "3px";
		msg.innerHTML = "インストールありがとうございます。<br>" + 
		                "まずは、プロフィール画面を開いて<br>" +
		                "拠点情報を取得してください。";
		td.appendChild(msg);
	}else{
		for (var i = 0; i < villages.length; i++) {
			var tr = d.createElement("tr");
			var td = d.createElement("td");
			td.style.padding = "3px";
			td.style.verticalAlign = "top";
			td.style.border = "outset 2px black";
			tr.appendChild(td);
			tbl.appendChild(tr);
			//各拠点の設定画面リンク
			var vname = villages[i][IDX_BASE_NAME];
			var opfacLink = d.createElement("a");
			opfacLink.id = "vireLink" + villages[i][IDX_XY];
			opfacLink.href = "javascript:void(0);";
			opfacLink.style.margin = "3px";
			opfacLink.innerHTML = villages[i][IDX_BASE_NAME];
			opfacLink.setAttribute('vId', villages[i][IDX_XY]);
			opfacLink.addEventListener("click", function() {var vId = this.getAttribute('vId');openInifacBox(vId);}, true);
			td.appendChild(opfacLink);
		}
	}
	ABContainer.appendChild(tbl);

	var tbl3 = d.createElement("table");
	tbl3.style.border ="0px";
	var tr3 = d.createElement("tr");
	var td4 = d.createElement("td");
	td4.style.padding = "3px";
	td4.style.verticalAlign = "top";

	loadAVCBox();
	var trA = d.createElement("tr");
	var tdA = d.createElement("td");
	tdA.style.padding = "3px";
	tdA.style.verticalAlign = "top";
	ccreateCheckBox(tdA, "OPT_CHKBOX_AVC", OPT_CHKBOX_AVC, "拠点巡回","5分毎に拠点を巡回する場合はチェックをしてください。",0);
	trA.appendChild(tdA);
	tbl3.appendChild(trA);

	var trB = d.createElement("tr");
	var tdB = d.createElement("td");
	tdB.style.padding = "3px";
	tdB.style.verticalAlign = "top";
	ccreateButton(tdB, "保存", "設定内容を保存します", function() {saveAVCBox()});
	trB.appendChild(tdB);
	tbl3.appendChild(trB);
	
	tr3.appendChild(td4);
	tbl3.appendChild(tr3);
	ccreateButton(td4, "閉じる", "ウインドウを閉じます", function() {closeIniBilderBox()});
	ABContainer.appendChild(tbl3);
	

}

// 拠点巡回読込
function loadAVCBox(){
	OPT_CHKBOX_AVC = parseInt(GM_getValue(HOST+PGNAME+"AVC", ""));
}

// 拠点巡回保存
function saveAVCBox(){
	OPT_CHKBOX_AVC = cgetCheckBoxValue($("OPT_CHKBOX_AVC"));
	GM_setValue(HOST+PGNAME+"AVC", OPT_CHKBOX_AVC);
	var tid=setTimeout(function(){location.reload();},INTERVAL);
}

//施設建設必要資源読込
function loadFacility(){
}

//施設建設必要資源保存
function saveFacility(f){
}

//ステイタス取得HTML追加
function addInifacHtml(vId) {
	var popupLeft = 230;
	var popupTop = 250;

	if(!isMixi) 
	{
		popupLeft = 430;
		popupTop = 200;
	}
	
	//表示コンテナ作成
	var ABfacContainer = d.createElement("div");
	ABfacContainer.id = "ABfacContainer";
	ABfacContainer.style.position = "absolute";
	ABfacContainer.style.backgroundColor = "DimGray";
	ABfacContainer.style.border = "outset 2px DimGray";
	ABfacContainer.style.left = popupLeft + "px";
	ABfacContainer.style.top = popupTop + "px";
	ABfacContainer.style.fontSize = "12px";
	ABfacContainer.style.font =  "メイリオ";  
	ABfacContainer.style.padding = "3px";
	ABfacContainer.style.zIndex = 255;
	ABfacContainer.setAttribute('vId', vId);
	d.body.appendChild(ABfacContainer);
	
    $e(ABfacContainer, "mousedown", function(event){
                if( event.target != $("ABfacContainer")) {return false;}
                g_MD="ABfacContainer";
                g_MX=event.pageX-parseInt(this.style.left,10);
                g_MY=event.pageY-parseInt(this.style.top,10);
                event.preventDefault();});
    $e(d, "mousemove", function(event){
                if(g_MD != "ABfacContainer") return true;
                var ABfacContainer = $("ABfacContainer");
                if( !ABfacContainer ) return true;
                var x = event.pageX - g_MX;
                var y = event.pageY - g_MY;
                ABfacContainer.style.left = x + "px";
                ABfacContainer.style.top = y + "px";
                csaveData("config_window_x", x);
                csaveData("config_window_y", y);
                });
    $e(d, "mouseup", function(event){g_MD="";});

	//入力項目の作成
	var tbl = d.createElement("table");
	tbl.style.border ="0px";
	var tr = d.createElement("tr");
	var td = d.createElement("td");
	td.style.padding = "3px";
	td.style.verticalAlign = "top";
	td.style.border = "outset 2px black";
	tr.appendChild(td);
	tbl.appendChild(tr);
	var villages = loadVillages(HOST+PGNAME);
	for (var i = 0; i < villages.length; i++) {
		//表示中の設定対象拠点名の表示
		if(vId == villages[i][IDX_XY]){
			td.innerHTML = villages[i][IDX_BASE_NAME];
		}
	}
	ABfacContainer.appendChild(tbl);

	Load_OPT(vId);
	var tbl2 = d.createElement("table");
	tbl2.style.border ="0px";
	var tr0 = d.createElement("tr");
	tr0.style.border = "outset 2px black";
	var td1 = d.createElement("td");
	td1.style.padding = "3px";
	td1.style.verticalAlign = "top";
	//td1.style.border = "outset 2px black";
	var td2 = d.createElement("td");
	td2.style.padding = "3px";
	td2.style.verticalAlign = "top";
	//td2.style.border = "outset 2px black";
	var td3 = d.createElement("td");
	td3.style.padding = "3px";
	td3.style.verticalAlign = "top";
	//td3.style.border = "outset 2px black";
	tr0.appendChild(td1);
	tr0.appendChild(td2);
	tr0.appendChild(td3);
	tbl2.appendChild(tr0);

	ccreateCheckBox(td1, "OPT_CHKBOX0", OPT_CHKBOX[0], "拠点","中央の城・村・砦のLvを上げます。",0);
	ccreateCheckBox(td1, "OPT_CHKBOX1", OPT_CHKBOX[1], "伐採所","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td1, "OPT_CHKBOX2", OPT_CHKBOX[2], "石切り場","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td1, "OPT_CHKBOX3", OPT_CHKBOX[3], "製鉄所","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td1, "OPT_CHKBOX4", OPT_CHKBOX[4], "畑","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td1, "OPT_CHKBOX5", OPT_CHKBOX[5], "倉庫","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td1, "OPT_CHKBOX6", OPT_CHKBOX[6], "銅雀台","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td1, "OPT_CHKBOX7", OPT_CHKBOX[7], "鍛冶場","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td1, "OPT_CHKBOX8", OPT_CHKBOX[8], "防具工場","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td2, "OPT_CHKBOX9", OPT_CHKBOX[9], "練兵所","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td2, "OPT_CHKBOX10", OPT_CHKBOX[10], "兵舎","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td2, "OPT_CHKBOX11", OPT_CHKBOX[11], "弓兵舎","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td2, "OPT_CHKBOX12", OPT_CHKBOX[12], "厩舎","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td2, "OPT_CHKBOX13", OPT_CHKBOX[13], "宿舎","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td2, "OPT_CHKBOX14", OPT_CHKBOX[14], "兵器工房","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td2, "OPT_CHKBOX15", OPT_CHKBOX[15], "市場","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td2, "OPT_CHKBOX16", OPT_CHKBOX[16], "訓練所","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td2, "OPT_CHKBOX17", OPT_CHKBOX[17], "水車","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td3, "OPT_CHKBOX18", OPT_CHKBOX[18], "工場","自動でLv上げをする建築物にチェックをしてください。",0);

	ccreateCheckBox(td3, "OPT_CHKBOX19", OPT_CHKBOX[19], "研究所","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td3, "OPT_CHKBOX20", OPT_CHKBOX[20], "大宿舎","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td3, "OPT_CHKBOX21", OPT_CHKBOX[21], "遠征訓練所","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td3, "OPT_CHKBOX22", OPT_CHKBOX[22], "見張り台","自動でLv上げをする建築物にチェックをしてください。",0);
	ccreateCheckBox(td3, "OPT_CHKBOX23", OPT_CHKBOX[23], "修行所","自動でLv上げをする建築物にチェックをしてください。",0);

	ccreateTextBox(td1, "OPT_MAX_LV", OPT_MAX_LV, "最大レベル","自動でLVを上げる最大レベルを指定します。", 5, 5);
	

	var tbl4 = d.createElement("table");
	tbl4.style.border ="0px";
	var tr01 = d.createElement("tr");
	tr0.style.border = "outset 2px black";
	var td11 = d.createElement("td");
	td11.style.padding = "3px";
	td11.style.verticalAlign = "top";
	// td11.style.border = "outset 2px black";
	tr01.appendChild(td11);
	tbl4.appendChild(tr01);


	//糧村化
	ccreateCheckBox(td11,"OPT_KATEMURA", OPT_KATEMURA, "糧村化", "この都市を糧村にする。平地に畑・倉庫×4・銅雀台を建てる。",0);
	ccreateTextBox(td11,"OPT_SOUKO_MAX", OPT_SOUKO_MAX,"設置する倉庫の数","設置する倉庫の数を指定してください。",1,1);
	
	//市場変換処理用
	ccreateCheckBox(td11, "OPT_ICHIBA", OPT_ICHIBA, "市場自動変換", "この都市で糧の市場自動変換をします。", 0);
	ccreateComboBox(td11, "OPT_ICHIBA_PA" , OPT_ICHIBA_PATS, OPT_ICHIBA_PA, "変換パターン","平均変換：糧が一定量になった際に変換指定している一番少ない資源を変換します。   一括変換：糧が一定量になった際に指定してある資源を指定値変換します。",5);
	ccreateTextBox(td11, "OPT_RISE_MAX", OPT_RISE_MAX, "糧が右の数量になったら変換する","自動で糧を他の資源に変換し始める量指定します。", 10, 5);
	ccreateTextBox(td11, "OPT_TO_WOOD", OPT_TO_WOOD, "木に変換する糧の量","自動で木に変換する糧の量を指定します。", 10, 5);
	ccreateTextBox(td11, "OPT_TO_STONE", OPT_TO_STONE, "石に変換する糧の量","自動で石に変換する糧の量を指定します。", 10, 5);
	ccreateTextBox(td11, "OPT_TO_IRON", OPT_TO_IRON, "鉄に変換する糧の量","自動で鉄に変換する糧の量を指定します。", 10, 5);
	
	ABfacContainer.appendChild(tbl);
	ABfacContainer.appendChild(tbl2);
	ABfacContainer.appendChild(tbl4);

	var tbl3 = d.createElement("table");
	tbl3.style.border ="0px";
	var tr3 = d.createElement("tr");
	tr3.style.border = "outset 2px black";
	var td4 = d.createElement("td");
	td4.style.padding = "3px";
	td4.style.verticalAlign = "top";
	tr3.appendChild(td4);
	tbl3.appendChild(tr3);
	ccreateButton(td4, "保存", "設定内容を保存します", function() {SaveInifacBox(ABfacContainer.getAttribute('vId'))});
	ccreateButton(td4, "閉じる", "設定内容を保存せず閉じます", function() {closeInifacBox()});
//	ccreateButton(td4, "ALLｸﾘｱ", "設定内容を消去します。", function() {closeInifacBox()});
	ccreateButton(td4, "ALLｸﾘｱ", "設定内容を消去します。", function() {clearInifacBox()});
	ABfacContainer.appendChild(tbl3);
}
//拠点単位の設定の保存（XY MAX_LV CheckData)
function SaveInifacBox(vId){
	var i;
	var opt = $("OPT_MAX_LV");
	strSave = cgetTextBoxValue(opt) + DELIMIT1;
	for(i=0; i<=23;i++){
		var opt = $("OPT_CHKBOX"+i);
		strSave += cgetCheckBoxValue(opt) + DELIMIT2;
	}

	//市場変換処理用
	strSave += cgetCheckBoxValue($("OPT_ICHIBA")) + DELIMIT2; //市場で変換するかどうかのフラグ
	strSave += cgetTextBoxValue($("OPT_RISE_MAX")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_TO_WOOD")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_TO_STONE")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_TO_IRON")) + DELIMIT2;

	//糧村化
	strSave += cgetCheckBoxValue($("OPT_KATEMURA")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_SOUKO_MAX")) + DELIMIT2;
	
	//自動内政用 by nottisan ここから追加
	strSave += cgetCheckBoxValue($("OPT_DOME")) + DELIMIT2; //内政使用するかのフラグ
	strSave += cgetComboBoxValue($("OPT_ICHIBA_PA")); //市場での変換パターンフラグ
	//ここまで
	
	GM_setValue(HOST+PGNAME+vId, strSave);
}
//拠点単位の設定の読み込み
function Load_OPT(vId){
	
	var src = GM_getValue(HOST+PGNAME+vId, "");
	if (src == "") return;

	var Temp = src.split(DELIMIT1);
	OPT_MAX_LV = Temp[0];
	var Temp2 = Temp[1].split(DELIMIT2);
	var i;
//	for(i=0; i<=Temp2.length;i++){
	for(i=0; i<=23;i++){
		if(Temp2[i] == ""){return;}
		OPT_CHKBOX[i] = parseInt(Temp2[i]);
	}

	//市場変換処理用
	if(Temp2[24] == ""){return;}
	OPT_ICHIBA = parseInt(Temp2[24]);
	OPT_RISE_MAX = parseInt(Temp2[25]);
	OPT_TO_WOOD = parseInt(Temp2[26]);
	OPT_TO_STONE = parseInt(Temp2[27]);
	OPT_TO_IRON = parseInt(Temp2[28]);

	//糧村化
	if(Temp2[29] == ""){return;}
	OPT_KATEMURA = parseInt(Temp2[29]);
	OPT_SOUKO_MAX = parseInt(Temp2[30]);

	//自動内政 by nottisan ここから追加
	if(Temp2[34] == ""){return;}
	OPT_DOME = parseInt(Temp2[34]);
	OPT_ICHIBA_PA = Temp2[35];
	//ここまで
	return;
}
//ユーザプロフィール画面の拠点情報を取得
function getUserProf() {
	var oldVillages = loadVillages(HOST+PGNAME);
	var newVillages = new Array();
	//alert(oldVillages);
	var landElems = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var isLandList = false;
	for (var i=0; i<landElems.snapshotLength; i++) {
		var item = landElems.snapshotItem(i);
		
		if (!isLandList) {
			if (trim(getChildElement(item, 0).innerHTML) == "名前") {
				isLandList = true;
			}
			continue;
		}
		
		//名前項目を取得
		var nameElem = getChildElement(getChildElement(item, 0), 0);
		var name = trim(nameElem.innerHTML);
		var url = nameElem.href;
		
		//座標項目を取得
		var xy = "(" + getChildElement(item, 1).innerHTML + ")";
		
		//人口項目を取得
		var popul = getChildElement(item, 2).innerHTML;
		
		//拠点じゃなければ終了
		if (!isNumeric(popul)) break;
		
		//データマージ
		var newVil = new Array();
		newVil[IDX_ACTIONS] = new Array();
		for (var j = 0; j < oldVillages.length; j++) {
			if (xy == oldVillages[j][IDX_XY]) {
				newVil = oldVillages[j];
			}
		}
		newVil[IDX_XY] = xy;
		newVil[IDX_BASE_NAME] = name;
		newVil[IDX_URL] = url;
		newVillages.push(newVil);
	}
	
	//保存
	saveVillages(HOST+PGNAME, newVillages);
}

//拠点情報を保存
function saveVillage(newData, type) {
	var allData = loadVillages(HOST+PGNAME);
	
	//新旧データをマージ
	var exists = false;
	for (var i = 0; i < allData.length; i++) {
		var villageData = allData[i];
		
		//作業リスト更新
		if (villageData[IDX_XY] == newData[IDX_XY]) {
			exists = true;
			villageData[IDX_BASE_NAME] = newData[IDX_BASE_NAME];
			
			var actions = villageData[IDX_ACTIONS];
			for (var j = actions.length - 1; j >= 0; j--) {
				if (actions[j][IDX2_TYPE] != type) continue;
				var endTime = new Date(actions[j][IDX2_TIME]);
				var nowTime = new Date();
				if (isNaN(endTime.valueOf()) || endTime > nowTime) actions.splice(j, 1);
			}
			villageData[IDX_ACTIONS] = actions.concat(newData[IDX_ACTIONS]);
		}
		
		allData[i] = villageData;
	}
	if (!exists) allData.push(newData);

	//Greasemonkey領域へ永続保存
	saveVillages(HOST+PGNAME, allData);
}
//拠点情報を読み出し
function loadVillages(hostname) {
	var ret = new Array();
	
	var src = GM_getValue(hostname, "");
	if (src == "") return ret;
	
	var villages = src.split(DELIMIT1);
	for (var i = 0; i < villages.length; i++) {
		var fields = villages[i].split(DELIMIT2);
		
		ret[i] = new Array();
		ret[i][IDX_XY] = fields[IDX_XY];
		ret[i][IDX_BASE_NAME] = fields[IDX_BASE_NAME];
		ret[i][IDX_URL] = fields[IDX_URL];
		
		ret[i][IDX_ACTIONS] = new Array();
		if (fields[IDX_ACTIONS] == "") continue;
		var actions = fields[IDX_ACTIONS].split(DELIMIT3);
		for (var j = 0; j < actions.length; j++) {
			ret[i][IDX_ACTIONS][j] = new Array();
			if (actions[j] == "") continue;
			
			var item = actions[j].split(DELIMIT4);
			if (item[IDX2_TYPE] == undefined) item[IDX2_TYPE] = "C";
			
			ret[i][IDX_ACTIONS][j][IDX2_STATUS] = item[IDX2_STATUS];
			ret[i][IDX_ACTIONS][j][IDX2_TIME] = item[IDX2_TIME];
			ret[i][IDX_ACTIONS][j][IDX2_TYPE] = item[IDX2_TYPE];
			ret[i][IDX_ACTIONS][j][IDX2_ALERTED] = item[IDX2_ALERTED];
		}
	}
	
	return ret;
}
//拠点情報を保存
function saveVillages(hostname, newData) {
	
	//配列をデリミタ区切り文字列に変換
	var newDataStr = new Array();
	for (var i = 0; i < newData.length; i++) {
		var villageData = newData[i];
		var actions = villageData[IDX_ACTIONS];
		
		//配列をデリミタ区切り文字列に変換
		for (var j = 0; j < actions.length; j++) {
			actions[j] = genDelimitString(actions[j], DELIMIT4);
		}
		villageData[IDX_ACTIONS] = genDelimitString(actions, DELIMIT3);
		newDataStr[i] = genDelimitString(villageData, DELIMIT2);
	}
	if(newDataStr.length==0){
		return ;
	}
	//Greasemondey領域へ永続保存
	GM_setValue(hostname, genDelimitString(newDataStr, DELIMIT1));
	//alert(genDelimitString(newDataStr, DELIMIT1));

}

//デリミタ区切り文字列生成
function genDelimitString(dataArray, delimiter) {
	var ret = "";
	for (var i=0; i < dataArray.length; i++) {
		if (dataArray[i] != undefined) ret += dataArray[i];
		if (i < dataArray.length-1) ret += delimiter;
	}
	return ret;
}

//URLパラメータ取得
function getParameter(key) {
	var str = location.search.split("?");
	if (str.length < 2) {
		return "";
	}
	
	var params = str[1].split("&");
	for (var i = 0; i < params.length; i++) {
		var keyVal = params[i].split("=");
		if (keyVal[0] == key && keyVal.length == 2) {
			return decodeURIComponent(keyVal[1]);
		}
	}
	return "";
}

//先頭ゼロ付加
function padZero(num) {
	var result;
	if (num < 10) {
		result = "0" + num;
	} else {
		result = "" + num;
	}
	return result;
}
//先頭ゼロ除去
function trimZero(str) {
	var res = str.replace(/^0*/, "");
	if (res == "") res = "0";
	return res;
}

//空白除去
function trim(str) {
	if (str == undefined) return "";
	return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
}

//数値チェック
function isNumeric(num) {
	if (num.match(/^-?[0-9]+$/)) {
		return true;
	}
	return false;
}

//子Element取得
function getChildElement(parentNode, position) {
	var current = 0;
	for (var i = 0; i < parentNode.childNodes.length; i++){
		var childNode = parentNode.childNodes[i];
		if (childNode.nodeType == 1) {
			if (current == position) {
				return childNode;
			}
			current++;
		}
	}
	
	return undefined;
}

//時刻計算（現在時刻に加算、引数hh:mm:ss）
function computeTime(clock) {
	var hour = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$1")));
	if (isNaN(hour)) hour = 0;
	var min = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$2")));
	if (isNaN(min)) min = 0;
	var sec = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$3")));
	if (isNaN(sec)) sec = 0;
	
	var now = new Date();
	var resTime = new Date();
	resTime.setHours(now.getHours() + hour);
	resTime.setMinutes(now.getMinutes() + min);
	resTime.setSeconds(now.getSeconds() + sec);
	
	return resTime;
}

//日時文字列編集（yyyy/mm/dd hh:mm:ss）
function generateDateString(date) {
	var res = "" + date.getFullYear() + "/" + padZero(date.getMonth() + 1) + 
		"/" + padZero(date.getDate()) + " " + padZero(date.getHours()) + ":" + 
		padZero(date.getMinutes()) + ":" + padZero(date.getSeconds());
	return res;
}

//日時文字列編集2（mm/dd hh:mm:ss）
function generateDateString2(date) {
	var res = "" + padZero(date.getMonth() + 1) + "/" + padZero(date.getDate()) + 
		" " + padZero(date.getHours()) + ":" + padZero(date.getMinutes()) + 
		":" + padZero(date.getSeconds());;
	return res;
}

//残時間文字列編集
function generateWaitTimeString(time1, time2) {
	var result = "";
	
	var waitTimeSec = Math.ceil((time1.getTime() - time2.getTime()) / 1000);
	result += Math.floor(waitTimeSec / (60*60));
	result += ":";
	result += padZero(Math.floor((waitTimeSec % (60*60)) / 60));
	result += ":";
	result += padZero(waitTimeSec % 60);
	
	return result;
}

function ccreateTextBox(container, id, def, text, title, size, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "2px";
	dv.style.paddingLeft= left + "px";
	dv.title = title;
	var tb = d.createElement("input");
	tb.type = "text";
	tb.id = id;
	tb.value = def;
	tb.size = size;
	
	var tx = d.createTextNode(text);
	tx.title = title;
	
	dv.appendChild(tx);
	dv.appendChild(tb);
	container.appendChild(dv);
	return tb;
}
function ccreateCheckBox(container, id, def, text, title, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "2px";
	dv.style.paddingLeft= left + "px";
	dv.title = title;
	var cb = d.createElement("input");
	cb.type = "checkbox";
	cb.id = id;
	cb.value = 1;
	if( def ) cb.checked = true;
	
	var lb = d.createElement("label");
	lb.htmlFor = id;
	
	var tx = d.createTextNode(text);
	lb.appendChild( tx );
	
	dv.appendChild(cb);
	dv.appendChild(lb);
	container.appendChild(dv);
	return cb;
}


function ccreateButton(container, text, title, func)
{
	var btn = d.createElement("input");
	btn.style.padding = "1px";
	btn.type = "button";
	btn.value = text;
	btn.title = title;
	container.appendChild(d.createTextNode(" "));
	container.appendChild(btn);
	container.appendChild(d.createTextNode(" "));
	$e(btn, "click", func);
	return btn;
}

function cgetCheckBoxValue(id)
{
	var c = id;
	if( !c ) return 0;
	if( !c.checked ) return 0;
	return 1;
}

function cgetTextBoxValue(id)
{
	var c = id;
	if( !c ) return "";
	return c.value;
}
function ccreateComboBox(container, id, sels, def, text, title, left )
{
    left += 2;
    var dv = d.createElement("div");
    dv.style.padding = "2px";
    dv.style.paddingLeft= left + "px";
    dv.title = title;
    var sel = d.createElement("select");
    sel.id = id;
    for(var i=0; i<sels.length; i++){
        var opt = d.createElement("option");
        opt.value = sels[i];
        opt.appendChild(d.createTextNode(sels[i]));
        sel.appendChild(opt);
    }
    if( def ) sel.value = def;

    var tx = d.createTextNode(text);
    tx.title = title;

    dv.appendChild(tx);
    dv.appendChild(sel);
    container.appendChild(dv);
    return sel;
}
function cgetComboBoxValue(id){
	var c = id;
	if( !c ) return "";
	return c.value;
}
function Chek_Sigen(area){
	//costs
	var cost_wood = [
		[10,35,40,15],
		[25, 88, 100, 38],
		[58, 202, 230, 86],
		[173, 604, 690, 259],
		[431, 1510, 1725, 647],
		[1466, 2847, 3019, 1294],
		[2493, 4839, 5132, 2200],
		[3490, 6775, 7186, 3080],
		[4537, 8807, 9341, 4003],
		[5898, 11450, 12144, 5204],
		[8119, 14434, 15787, 6766],
		[11366, 20207, 22101, 9472],
		[17050, 30311, 33152, 14208],
		[25575, 45467, 49729, 21312],
		[38362, 68199, 74593, 31698]
	];
	var cost_stone= [
		[40, 10, 35, 15],
		[100, 25, 88, 38],
		[230, 58, 202, 86],
		[690, 173, 604, 259],
		[1725, 431, 1510, 647],
		[3019, 1466, 2847, 1294],
		[5132, 2493, 4839, 2200],
		[7186, 3490, 6775, 3080],
		[9341, 4537, 8807, 4003],
		[12144, 5898, 11450, 5204],
		[15787, 8119, 14434, 6766],
		[22101, 11366, 20207, 9472],
		[33152, 17050, 30311, 14208],
		[49729, 25575, 45467, 21312],
		[74593, 38362, 68199, 31968]
	];
	var cost_iron=[
		[35, 40, 10, 15],
		[88, 100, 25, 38],
		[202, 230, 58, 86],
		[604, 690, 173, 259],
		[1510, 1725, 431, 647],
		[2847, 3019, 1466, 1294],
		[4839, 5132, 2493, 2200],
		[6775, 7186, 3490, 3080],
		[8807, 9341, 4537, 4003],
		[11450, 12144, 5898, 5204],
		[14434, 15787, 8119, 6766],
		[20207, 22101, 11366, 9472],
		[30311, 33152, 17050, 14208],
		[45467, 49729, 25575, 21312],
		[68199, 74593, 38362, 31968]
	];
	var cost_rice=[
		[35, 35, 30, 0],
		[88, 88, 75, 0],
		[202, 202, 173, 0],
		[604, 604, 518, 0],
		[1510, 1510, 1294, 0],
		[3019, 3019, 2588, 0],
		[5132, 5132, 4399, 0],
		[7186, 7186, 6159, 0],
		[9341, 9341, 8007, 0],
		[12144, 12144, 10409, 0],
		[15787, 15787, 13532, 0],
		[22101, 22101, 18944, 0],
		[33152, 33152, 28416, 0],
		[49729, 49729, 42625, 0],
		[74593, 74593, 63937, 0]
	];
	var cost_souko=[
		[83, 141, 83, 63],
		[167, 281, 167, 126],
		[300, 506, 300, 226],
		[479, 810, 479, 362],
		[671, 1134, 671, 507],
		[1044, 1253, 1044, 835],
		[1462, 1754, 1462, 1169],
		[1973, 2368, 1973, 1578],
		[2664, 3196, 2664, 2131],
		[3596, 4315, 3596, 2877],
		[4854, 5825, 4854, 3883],
		[6311, 7573, 6311, 5048],
		[8204, 9845, 8204, 6563],
		[10255, 12306, 10255, 8204],
		[12819, 15382, 12819, 10255],
		[15382, 18459, 15382, 12306],
		[18459, 22151, 18459, 14767],
		[21228, 21228, 25473, 16982],
		[24412, 29294, 24412, 19529],
		[28074, 33688, 28074, 22459]
	];
	var cost_syukusya=[
		[35, 20, 35, 80],
		[53, 30, 53, 120],
		[89, 51, 89, 204],
		[147, 84, 147, 337],
		[228, 130, 228, 522],
		[336, 192, 336, 767],
		[476, 272, 476, 1089],
		[653, 373, 653, 1492],
		[868, 496, 868, 1984],
		[1129, 645, 1129, 2580],
		[2032, 1161, 2032, 4644],
		[3658, 2090, 3658, 4644],
		[6951, 3971, 6950, 15882],
		[13205, 7544, 13205, 30177],
		[25090, 14334, 25090, 57336]
	];
	var cost_kojo=[
		[780, 1560, 1560, 3900],
		[1248, 2496, 2496, 6240],
		[1997, 3994, 3994, 9984],
		[4193, 6290, 6290, 11182],
		[5871, 8806, 8806, 15655],
		[10958, 13698, 13698, 16437],
		[15342, 19177, 19177, 23013],
		[19944, 24930, 24930, 29916],
		[25928, 32410, 32410, 38891],
		[33706, 42132, 42132, 50559]
	];
	var cost_suisya=[
		[2940, 980, 980, 4900],
		[4704, 1568, 1568, 7840],
		[7526, 2509, 2509, 12544],
		[10537, 5268, 5268, 14049],
		[14751, 7376, 7376, 19668],
		[20652, 13768, 13768, 20652],
		[28913, 19275, 19275, 28913],
		[37587, 25058, 25058, 37587],
		[48863, 32576, 32576, 48863],
		[63523, 42348, 42348, 63523]
	];
	var cost_ichiba=[
		[100, 100, 50, 50],
		[334, 334, 191, 191],
		[1035, 1035, 592, 592],
		[2795, 2795, 1600, 1600],
		[6328, 6328, 4218, 4218],
		[13288, 13288, 8859, 8859],
		[25248, 25248, 16832, 16832],
		[42921, 42921, 28614, 28614],
		[64381, 64381, 42921, 42921],
		[90134, 90134, 60089, 60089]
	];
	var cost_kenkyu=[
		[275, 110, 110, 55],
		[413, 165, 165, 83],
		[619, 248, 248, 124],
		[1486, 836, 836, 557],
		[2228, 1253, 1253, 836],
		[7521, 6267, 6267, 5015],
		[13538, 11282, 11282, 9025],
		[21436, 17862, 17862, 14290],
		[44675, 37228, 37228, 29784],
		[87725, 73104, 73104, 58483]
	];
	var cost_kunren=[
		[1500, 1600, 2500, 3300],
		[2100, 2240, 3500, 3300],
		[2940, 3136, 4900, 6468],
		[6629, 7326, 13955, 6978],
		[13257, 14653, 27910, 13955],
		[32097, 37679, 55821, 13955],
		[64194, 75358, 111642, 27910],
		[128388, 150716, 223283, 55821],
		[256776, 301432, 446566, 111642],
		[513551, 602865, 893133, 223283]
	];
	var cost_kajiba=[
		[150, 200, 340, 170],
		[400, 300, 680, 340],
		[780, 585, 1326, 663],
		[1482, 1112, 2519, 1260],
		[2742, 2056, 4661, 2330],
		[4935, 3701, 8390, 4195],
		[8636, 6477, 14682, 7341],
		[17640, 14112, 28223, 10584],
		[31566, 25253, 50506, 18940],
		[50506, 40404, 80809, 30303]
	];
	var cost_bougu=[
		[150, 200, 340, 170],
		[300, 400, 680, 340],
		[585, 780, 1326, 663],
		[1112, 1482, 2519, 1260],
		[2056, 2742, 4661, 2330],
		[3701, 4935, 8390, 4195],
		[6477, 8636, 14682, 7341],
		[14112, 17640, 28223, 10584],
		[25253, 31566, 50506, 18940],
		[40404, 50506, 80809, 30303]
	];
	var cost_heiki=[
		[216, 216, 216, 72],
		[432, 432, 432, 144],
		[864, 864, 864, 288],
		[1224, 1224, 1224, 648],
		[1836, 1836, 1836, 972],
		[2662, 2662, 2662, 1409],
		[3860, 3860, 3860, 2044],
		[7357, 7357, 7357, 2452],
		[13242, 13242, 13242, 4414],
		[23836, 23836, 23836, 7945],
		[42905, 42905, 42905, 14302],
		[77229, 77229, 77229, 25743],
		[139013, 139013, 139013, 46338],
		[278026, 278026, 278026, 92675],
		[556051, 556051, 556051, 185350]
	];
	var cost_doujaku=[
		[700, 3500, 2100, 700],
		[1120, 5600, 3360, 1120],
		[1792, 8960, 5376, 1792],
		[3763, 10035, 7526, 3763],
		[5263, 14049, 10537, 5268],
		[9834, 14752, 14752, 9834],
		[13768, 20652, 20652, 13768],
		[17899, 26848, 26848, 17899],
		[23268, 34902, 34902, 23268],
		[30249, 45373, 45373, 30249]
	];
	var cost_renpei=[
		[112, 107, 107, 122],
		[224, 214, 214, 244],
		[448, 428, 428, 488],
		[759, 725, 725, 826],
		[1214, 1160, 1160, 1322],
		[2209, 2110, 2110, 2406],
		[3331, 3182, 3182, 3627],
		[4958, 4736, 4736, 5400],
		[8091, 7729, 7729, 8813],
		[11130, 10632, 10632, 12122]
	];
	var cost_heisya=[
		[72, 360, 72, 216],
		[144, 720, 144, 432],
		[288, 1440, 288, 864],
		[648, 1728, 648, 1296],
		[972, 2592, 972, 1944],
		[1409, 3758, 1409, 2819],
		[2725, 4088, 2725, 4088],
		[6744, 9810, 5518, 2453],
		[12140, 17658, 9933, 4415],
		[21852, 31784, 17879, 7946],
		[39333, 57212, 32182, 14303],
		[70800, 96545, 64364, 25745],
		[127440, 173781, 115854, 46342],
		[254879, 324392, 254879, 92683],
		[509759, 648784, 509759, 185367]
	];
	var cost_yumi=[
		[360, 72, 72, 216],
		[720, 144, 144, 432],
		[1440, 288, 288, 864],
		[1728, 648, 648, 1296],
		[2592, 972, 972, 1944],
		[3758, 1409, 1409, 2819],
		[5450, 2044, 2044, 4087],
		[9810, 6131, 6131, 2453],
		[17658, 12140, 9933, 4415],
		[31784, 21852, 17879, 7946],
		[57212, 39333, 32182, 14303],
		[96545, 70800, 64364, 25745],
		[173781, 127440, 115854, 46342],
		[324392, 254879, 254879, 92683],
		[648784, 509759, 509759, 185367]
	];
	var cost_uma=[
		[72, 72, 360, 216],
		[144, 144, 720, 432],
		[288, 288, 1440, 864],
		[648, 648, 1728, 1296],
		[972, 972, 2592, 1944],
		[1409, 1409, 3758, 2891],
		[2044, 2044, 5450, 4087],
		[5518, 6744, 9810, 2453],
		[9933, 12140, 17658, 4415],
		[17879, 21852, 31784, 7946],
		[32182, 39333, 57212, 14303],
		[64364, 70800, 96545, 25745],
		[115854, 127440, 173781, 46342],
		[254879, 254879, 324392, 92683],
		[509759, 509759, 648784, 185367]
	];

	var cost_shiro=[
		[0, 0, 0, 0],
		[1404, 546, 390, 780],
		[2570, 1000, 714, 1428],
		[4161, 2081, 2081, 2081],
		[7102, 3552, 3552, 3552],
		[9056, 9056, 6037, 6037],
		[14384, 14384, 9589, 9589],
		[22773, 22773, 15183, 15183],
		[33562, 33562, 22374, 22374],
		[44402, 57559, 32890, 29602],
		[65122, 84418, 48239, 43415],
		[95317, 123558, 70605, 63544],
		[113458, 154716, 154716, 92830],
		[150418, 150418, 315878, 135375],
		[219008, 219008, 492770, 164258],
		[294820, 294820, 663345, 221115],
		[488220, 488220, 827854, 318406],
		[839130, 839130, 915414, 457707],
		[1307581, 1307581, 1354280, 700491],
		[1901938, 1901938, 1969864, 1018896]
	];
	var cost_toride=[
		[104, 400, 136, 160],
		[243, 936, 319, 374],
		[438, 1685, 573, 673],
		[1110, 2467, 1357, 1233],
		[1887, 4194, 2307, 2097],
		[3236, 7191, 3954, 3596],
		[5177, 11505, 6327, 5753],
		[10430, 18776, 13560, 9387],
		[18839, 33912, 24492, 16956],
		[33914, 61043, 44087, 30523],
		[66939, 106495, 85196, 45640],
		[119786, 190570, 152456, 81672],
		[213820, 340166, 272133, 145786],
		[423566, 505021, 456148, 244365],
		[708513, 844765, 763014, 408756]
	];
	var cost_mura=[
		[400, 136, 104, 160],
		[936, 319, 243, 374],
		[1685, 573, 438, 673],
		[2467, 1357, 1110, 1233],
		[4194, 2307, 1887, 2097],
		[7191, 3954, 3236, 3596],
		[11505, 6327, 5177, 5753],
		[18776, 13560, 10430, 9387],
		[33912, 24492, 18839, 16956],
		[61043, 44087, 33914, 30523],
		[106495, 85196, 66939, 45640],
		[190570, 152456, 119786, 81672],
		[340166, 272133, 213820, 145786],
		[505021, 456148, 423566, 244365],
		[844765, 763014, 708513, 408756]
	];
	var cost_daisyukusya=[
		[200, 114, 200, 438],
		[320, 183, 320, 701],
		[512, 293, 512, 1121],
		[768, 439, 768, 1682],
		[1152, 658, 1152, 2523],
		[1728, 987, 1728, 3784],
		[2419, 1382, 2419, 5298],
		[3387, 1935, 3387, 7418],
		[4741, 2709, 4741, 10385],
		[6637, 3793, 6637, 14538],
		[8628, 4930, 8628, 18900],
		[11217, 6409, 11217, 24570],
		[14582, 8332, 14582, 31941],
		[18956, 11735, 18956, 40620],
		[25817, 16429, 25817, 49286],
		[32271, 22003, 32271, 60141],
		[42172, 29337, 42172, 69675],
		[52715, 38963, 52715, 84803],
		[66009, 49506, 66009, 93512],
		[79211, 62708, 79211, 108914]
	];
	var cost_ennseikunren=[
		[2884, 4486, 5977, 2723],
		[4614, 7177, 9484, 4357],
		[7382, 11483, 15174, 6972],
		[11811, 18373, 24279, 11155],
		[18898, 29397, 38846, 17848],
		[28347, 44096, 58269, 26772],
		[42521, 66143, 87404, 40158],
		[63781, 99215, 131105, 60238],
		[89294, 138901, 183548, 84333],
		[125011, 194461, 256967, 118066],
		[175015, 272246, 359754, 165292],
		[227520, 353920, 467680, 214880],
		[295776, 460096, 607984, 279344]
	];
	var cost_miharidai=[
		[600, 840, 600, 360 ],
		[960, 1344, 960, 576],
		[1536, 2150, 1536, 922],
		[2458, 3441, 2458, 1475],
		[3932, 5505, 3932, 2359],
		[6291, 8808, 6291, 3775],
		[9437, 13212, 9437, 5662],
		[14156, 19818, 14156, 8493],
		[21233, 29727, 21233, 12740],
		[31850, 44590, 31850, 19110],
		[44590, 62426, 44590, 26754],
		[62426, 87396, 62426, 37456],
		[87397, 122355, 87397, 52438],
		[122355, 171297, 122355, 73413],
		[159062, 222686, 159062, 95437],
		[206780, 289492, 206780, 124068]
	];
	var cost_syugyouzyo=[
		[1600, 1200, 600, 600],
		[2240, 1680, 840, 840],
		[3136, 2352, 1176, 1176],
		[4390, 3293, 1646, 1646],
		[6146, 4610, 2305, 2305],
		[8605, 6454, 3227, 3227],
		[11186, 8390, 4195, 4195],
		[14542, 10907, 5453, 5453],
		[18905, 14179, 7089, 7089],
		[24577, 18433, 9216, 9216],
		[31950, 23963, 11981, 11981],
		[38340, 28755, 14378, 14378],
		[46008, 34506, 17253, 17253],
		[55210, 41407, 20704, 20704],
		[66252, 49689, 24844, 24844],
		[72877, 54658, 27329, 27329],
		[80164, 60123, 30062, 30062],
		[88181, 66136, 33068, 33068],
		[96999, 72749, 36375, 36375],
		[106699, 80024, 40012, 40012]
	];
	var costs = [];

	costs["城"] = cost_shiro;
	costs["伐採所"] = cost_wood;
	costs["石切り場"] = cost_stone;
	costs["製鉄所"] = cost_iron;
	costs["畑"] = cost_rice;
	costs["倉庫"] = cost_souko;
	costs["銅雀台"] = cost_doujaku;
	costs["鍛冶場"] = cost_kajiba;
	costs["防具工場"] = cost_bougu;
	costs["練兵所"] = cost_renpei;
	costs["兵舎"] = cost_heisya;
	costs["弓兵舎"] = cost_yumi;
	costs["厩舎"] = cost_uma;
	costs["宿舎"] = cost_syukusya;
	costs["兵器工房"] = cost_heiki;
	costs["市場"] = cost_ichiba;
	costs["訓練所"] = cost_kunren;
	costs["水車"] = cost_suisya;
	costs["工場"] = cost_kojo;
	costs["研究所"] = cost_kenkyu;
	costs["大宿舎"] = cost_daisyukusya;
	costs["遠征訓練所"] = cost_ennseikunren;
	costs["見張り台"] = cost_miharidai;
	costs["修行所"] = cost_syugyouzyo;
	costs["砦"] = cost_toride;
	costs["村"] = cost_mura;

	//alert(area.name +":" + area.lv +":" +area.xy );
	var RES_NOW = [];
	RES_NOW["wood"] = parseInt( $("wood").innerHTML, 10 );
	RES_NOW["stone"] = parseInt( $("stone").innerHTML, 10 );
	RES_NOW["iron"] = parseInt( $("iron").innerHTML, 10 );
	RES_NOW["rice"] = parseInt( $("rice").innerHTML, 10 );
	try {
		if( costs[area.name].length <= parseInt(area.lv) || // maxinum level reached 
			RES_NOW.wood < costs[area.name][parseInt(area.lv)][0] ||
			RES_NOW.stone< costs[area.name][parseInt(area.lv)][1] ||
			RES_NOW.iron < costs[area.name][parseInt(area.lv)][2] ||
			RES_NOW.rice < costs[area.name][parseInt(area.lv)][3] ) {
				//建築不可 = 1
				return 1;
		}
	}catch(e) {
		console.log("catched");
	}
	return 0;

}

//市場変換処理
function ichibaChange() {
	if(OPT_ICHIBA != 1) {
		//alert("市場自動変換未指定");
		return;
	}

	var ichiba_x = -1; //市場のX座標
	var ichiba_y = -1; //市場のY座標
	var ichiba_lv = -1; //市場のレベル

	var area = new Array();
	area = get_area();

	for(i=0;i<area.length;i++){		
		//市場の座標を取得
		if(area[i].name == "市場") {
			var Temp = area[i].xy.split(",");
			ichiba_x = Temp[0];
			ichiba_y = Temp[1];
			ichiba_lv = area[i].lv;
		}
	}

	if(ichiba_x < 0) {
		alert("市場がありません");
		return;
	}

	var RES_NOW = [];
	RES_NOW["wood"] = parseInt( $("wood").innerHTML, 10 );
	RES_NOW["stone"] = parseInt( $("stone").innerHTML, 10 );
	RES_NOW["iron"] = parseInt( $("iron").innerHTML, 10 );
	RES_NOW["rice"] = parseInt( $("rice").innerHTML, 10 );
	
	//糧が指定量より多いかチェック
	if(RES_NOW["rice"] < OPT_RISE_MAX) {
		//alert("糧が" + OPT_RISE_MAX + "未満");
		return;
	}
	
	if(OPT_ICHIBA_PATS[0] == OPT_ICHIBA_PA){
		var min_sigen = RES_NOW["wood"];

		if(RES_NOW["stone"] < min_sigen ) { min_sigen = RES_NOW["stone"]; }
		if(RES_NOW["iron"] < min_sigen ) { min_sigen = RES_NOW["iron"]; }

		//糧から他の資源に返還開始
		if((OPT_TO_WOOD > 0) && ( RES_NOW["wood"] == min_sigen )) {
			changeResorceToResorce(RICE, OPT_TO_WOOD, WOOD, ichiba_x, ichiba_y);
		} else if((OPT_TO_STONE > 0) && ( RES_NOW["stone"] == min_sigen )) {
			changeResorceToResorce(RICE, OPT_TO_STONE, STONE, ichiba_x, ichiba_y);
		} else if((OPT_TO_IRON > 0) && ( RES_NOW["iron"] == min_sigen )) {
			changeResorceToResorce(RICE, OPT_TO_IRON, IRON, ichiba_x, ichiba_y);
		}
		return;
	}else{

		if(OPT_RISE_MAX < OPT_TO_WOOD+OPT_TO_STONE+OPT_TO_IRON){
			alert("変換する総合計より糧の値を大きくしてください。");
		}else{
			changeResorceToResorce(RICE, OPT_TO_WOOD, WOOD, ichiba_x, ichiba_y);
			changeResorceToResorce(RICE, OPT_TO_STONE, STONE, ichiba_x, ichiba_y);
			changeResorceToResorce(RICE, OPT_TO_IRON, IRON, ichiba_x, ichiba_y);
		}
		return;
	}

	// 資源のバランスが悪い場合、少ない資源を優先的に変換する処理
	// 基本的には変換後も現在の最大量を超えない場合に変換を行う。
	// すなわち、量が最大の資源は変換を行わない。
//	var ichiba_wariai=[0, 40, 42, 44, 46, 48, 50, 52, 54, 56, 60];
//
//	var wariai = ichiba_wariai[ichiba_lv];
//	var max_sigen;
//	var change_flg = 0;
//
//	if(RES_NOW["wood"] > RES_NOW["stone"]) { max_sigen = RES_NOW["wood"]; } else { max_sigen = RES_NOW["stone"]; }
//	if(RES_NOW["iron"] > max_sigen ) { max_sigen = RES_NOW["iron"]; }
//
//
	//糧から他の資源に返還開始
//	if((OPT_TO_WOOD > 0) && ( (RES_NOW["wood"] + OPT_TO_WOOD * wariai / 100) < max_sigen )) {
//		changeResorceToResorce(RICE, OPT_TO_WOOD, WOOD, ichiba_x, ichiba_y);
//		change_flg = 1;
//	}
//		if((OPT_TO_STONE > 0) && ( (RES_NOW["stone"] + OPT_TO_STONE * wariai / 100) < max_sigen )) {
//		changeResorceToResorce(RICE, OPT_TO_STONE, STONE, ichiba_x, ichiba_y);
//		change_flg = 1;
//	}
//	if((OPT_TO_IRON > 0) && ( (RES_NOW["iron"] + OPT_TO_IRON * wariai / 100) < max_sigen )) {
//		changeResorceToResorce(RICE, OPT_TO_IRON, IRON, ichiba_x, ichiba_y);
//		change_flg = 1;
//	}
//
//
//	if(change_flg == 0) {
//
//		// alert("市場変換開始");
//		if(OPT_TO_WOOD > 0) {
//			changeResorceToResorce(RICE, OPT_TO_WOOD, WOOD, ichiba_x, ichiba_y);
//		}
//		if(OPT_TO_STONE > 0) {
//			changeResorceToResorce(RICE, OPT_TO_STONE, STONE, ichiba_x, ichiba_y);
//		}
//		if(OPT_TO_IRON > 0) {
//			changeResorceToResorce(RICE, OPT_TO_IRON, IRON, ichiba_x, ichiba_y);
//		}
//		// alert("市場変換終了");
//	}
//	var tid=setTimeout(function(){location.reload();},INTERVAL);
}

//実変換処理通信部
function changeResorceToResorce(from, tc, to, x, y) {
	var data = "form2=&x=" + x + "&y=" + y + "&change_btn=" + encodeURIComponent("はい") + "&st=1&tf_id=" + from + "&tc=" + tc + "&tt_id=" + to;
	var tid=setTimeout(function(){
		GM_xmlhttpRequest({
			method:"POST", 
			url:"http://" + HOST + "/facility/facility.php",
			headers:{"Content-type":"application/x-www-form-urlencoded"},
			data: data,
			onload:function(x){console.log(x.responseText);}
		});
	},INTERVAL);
}

//自動寄付処理
function autoDonate() {
	if(OPT_KIFU != 1) {
		//alert("自動寄付未指定");
		return;
	}

	//糧が指定量より多いかチェック
	if($("rice").innerHTML < OPT_RISE_KIFU_MAX) {
		//alert("糧が" + OPT_RISE_KIFU_MAX + "未満");
		return;
	}


	sendDonate(OPT_RISE_KIFU);
//	var tid=setTimeout(function(){location.reload();},INTERVAL);
}

//内政スキルの使用
function Auto_Domestic() {	
	var tid=setTimeout(function(){
		GM_xmlhttpRequest({
			method:"GET", 
			url:"http://" + HOST + "/card/domestic_setting.php",
			headers:{"Content-type":"text/html"},
			overrideMimeType:'text/html; charset=utf-8',
			onload:function(x){
				
				var htmldoc = document.createElement("html");
			        htmldoc.innerHTML = x.responseText;
			        
		        	var skillElem = document.evaluate('//*[@class="skill"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if(skillElem.snapshotLength < 1){return;}
				
				for(i=1;i<skillElem.snapshotLength;i++){
					var skillTag = trim(skillElem.snapshotItem(i).innerHTML);
					if((skillTag.indexOf("知識",0) > 1 )||(skillTag.indexOf("技術",0) > 1 )||(skillTag.indexOf("呉の治世",0) > 1 )||(skillTag.indexOf("王佐",0) > 1 ) ){
						var link = skillTag.substring(skillTag.indexOf("href=",0)+6,skillTag.indexOf("\"",skillTag.indexOf("href=",0)+7));
						do {
							link = link.replace(/&amp;/,"&");
						}while(link.indexOf("&amp;",0) > 1)
						GM_xmlhttpRequest({
								method:"GET", 
								url:"http://" + HOST + link,
								headers:{"Content-type":"text/html"},
								overrideMimeType:'text/html; charset=utf-8',
								onload:function(x){
								}
						});
					}
				}
			}
		});
	},INTERVAL);
}

///////////////////////////////////////////////
//Chrome用GM_関数
// @copyright 2009, James Campos
// @license cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	};

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
		return defaultValue;
		var type = value[0];
		value = value.substring(1);
			switch (type) {
				case 'b':
				return value == 'true';
				case 'n':
				return Number(value);
				default:
				return value;
			}
	};

	GM_log = function(message) {
		if (window.opera) {
			opera.postError(message);
		return;
		}
		console.log(message);
	};

	GM_registerMenuCommand = function(name, funk) {
	//todo
	};

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	};
}
///////////////////////////////////////////////
function disp_Options(){
//////////////////////		オプション処理	//////////////////////
	if( !location.pathname.match(/^(\/user\/|\/bbs\/personal_)/) ) return;
	
	if( location.pathname.match(/ranking\.php/) ) return;
	var ul = $("statMenu");
	if( !ul ) return;
	
	var cl = d.createElement("a");
	cl.href = "javascript:void(0);";
	cl.innerHTML = "AutoBuilder";
	$e(cl, "click", function() {openIniBilderBox()});
	
	var li = d.createElement("li");
	li.appendChild(cl);
	li.className = "last";
	ul.appendChild(li);
	
	var lst = $x("//li[@class=\"last\"]");
	if( lst ) {
		lst.className = "";
	}
//////////////////////////////////////////////////////////////////////////
}
