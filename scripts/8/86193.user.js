var meta = <><![CDATA[
// ==UserScript==
// @name 		T3.6 
// @author		Travianero. Original ms99 (Nux, Lux, onetmt, Velonis Petros, Richard Laffers, Szabka, Victor Garcia-aka Croc-)
// @namespace 	T3.6
// @version 	1.0.1
// @description	Travian3.6 Beyond
// @source 		
// @identifier 	
// @copyright	© Travianero 2010 © ms99, 2008-2010 (parts of this script © Nux, Lux, onetmt, Velonis Petros, Richard Laffers, Szabka, Victor Garcia-aka Croc-)
// @license 	Creative Commons Attribution-Noncommercial-Share Alike 3.0 Mexico License
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
]]></>.toString();

/**
*The original script from Victor Garcia (aka Croc) is licensed under the
*Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License
*To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/
*
*The updated script from ms99 is licensed under the
*Creative Commons Attribution-Noncommercial-Share Alike 3.0 mexico License
*To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/de/
*
*An English translation of the "Creative Commons Attribution-Noncomercial-Share Alike 3.0 License"
*can be found here http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en
/*****************************************************************************
*Copyright © ms99, 2008-2010
*Parts of this script Copyright © Nux, 2008
*Setup page behavior Copyright © Lux, 2008
*Big icons behavior (except default & except Setup) Copyright © onetmt, 2009
*Until then & Residue calculations Copyright © Velonis Petros (mail: velonis.gr) , 2009
*Parts of this script Copyright © Szabka, 2008
*Initial script Copyright Victor Garcia (aka Croc) ©, 2007
*Parts of this script (functions for moving a report/message displayed as a pop-up with the mouse) Copyright © Richard Laffers, 2007
*
*Parts of this code are provided or based on ideas and/or code written by others
*Additional images embedded in this script provided by ms99, Nux, Lux, DMaster, Brains, fr3nchlover, CuPliz13
*Translations to different languages are provided by users of this script
*
*IMPORTANT CONTRIBUTIONS TO THIS SCRIPT (listed in alphabetical order):
*ACE, Acr111, BmW, Brains, Chu Chee Meng, CuPliz13, Dakkie, digital012, david.macej, DMaster, Dream1, EXEMOK, ezGertieY,
*FitForTheLooneyVille, friedturnip, fr3nchlover, Lassie, Lux, MarioCheng, matteo466, MrRyMan, napkin, Nux, onetmt,
*phob0z, rtellezi, Rypi, Sag, samad909, someweirdnobody, Thornheart, vampiricdust, Velonis Petros, yabash, zerokmatrix, Zippo
*
*Please have understanding if I've forgotten somebody with a relevant contribution to this script
*Please send a message via the userscripts.org mailing facility, for credits
*
*Other contributors' (nick)names may be provided in the header of (or inside) the functions
*SPECIAL THANKS to all contributors and translators of this script !
*****************************************************************************/

function functionMain(e) {
	var crtPage = window.location.href;
	var TB36 = new Object();
	TB36.TBStartTime = new Date().getTime();
	TB36.version = '1.0.1';
	TB36.TBEndTime = TB36.TBStartTime;
	TB36.usoL = 'http://userscripts.org/scripts/';
	TB36.usoNo = '86193';
	TB36.url = TB36.usoL + 'source/' + TB36.usoNo + '.user.js';
	TB36.shN = 'TB3.6';
	TB36.sn = 'Travian Beyond for 3.6';
	TB36.usoA = TB36.usoL + 'show/' + TB36.usoNo;
	TB36.origMap = true;
	TB36.BrT = "";
	TB36.TBTRT = function() {return TB36.TBEndTime - TB36.TBStartTime;};
	TB36.versionText = function() {return TB36.version + " - " + TB36.sn;};
	TB36.nTARbT = '';
	TB36.nTASb = '';
	TB36.nTAUb = '';
	TB36.nTANb = '';
	TB36.FmapServer = '';
	TB36.FmapLanguage = '';
	TB36.boolIsThisNPC = false;
	TB36.boolIsNPCExluded = false;
	TB36.T36 = false;
	TB36.M35 = 0;
	TB36.avBKS = false;
	TB36.boolShowNPCLink = crtPage.indexOf(".org") == -1;
	TB36.gServer;
	TB36.fullServerName;
	TB36.UserID = '0';
	TB36.plAc = false;
	TB36.AVP = 0;
	TB36.Mcap = 0;
	TB36.VillageRes = '';
	TB36.hOffBonus = 0;
	TB36.speed = false;
	TB36.tPpH = [0, 0, 0, 0, 0];//total production per hour for all villages -> requires to open all villages on a regular basis to get current data
	TB36.d2spB = [0, 0, 0, 0, 0, 0, 0, 0, 0];//cpbuilding, barracks, big barracks, workshop, stable, big stable, tournament square, townhall, horse drinking through
	//crt coords
	TB36.xCrt = -1000;
	TB36.yCrt = -1000;
	//CN colors (CN_COL_TXT, CN_COL_NEUTRAL, CN_COL_MAX_LVL, CN_COL_NO_UPG, CN_COL_UPG_VIA_NPC)
	TB36.CNc = ['#000000', '#FDF8C1', '#7DFF7D', '#FF9696', '#FFC84B'];
	TB36.DFc = ['#000000', 'white'];

	TB36.wH = window.innerHeight;
	TB36.wW = window.innerWidth;
	
	TB36.isTtB = false;
	
	TB36.lng = 'en';
	var ddX = '680';
	//doc direction
	var docDir = ['left', 'right'];
	if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction") == 'rtl') {docDir = ['right', 'left']; ddX = '100';};
	
	//setup defaults
	TB36.OD = [
	'0', '0', '1', '0', '1', '1', '1', '1', '1', '1',
	'0', '0', '1', '1', '1', '1', '1', '1', '1', '1',
	'1', '1', '1', '1', '0', '0', '1', '0', '1', '0',
	'1', '1', '1', '1', '1', '1', '0', '1', '1', '1',
	'1', '1', '0', '1', '1', '1', '1', '0', '0', '0',
	'3', '0', '0', '1', '1', '0', '1', '1', '0', '0', 
	'1', '1', '0', '1', '0', '',  '',  '',  '',  '0',
	'1', '1', '1', '1', '1', ddX + '|150', ddX + '|170', ddX + '|210', ddX + '|190', ddX + '|220',
	'1', '1', '1', '1', '1', '1', '1', '0', ddX + '|500', ddX + '|500', ddX + '|500'];
	
	TB36.O = TB36.OD;
	
	//transition to new setup GM "cookie" system => remove all items related to "TB36.oldOpt" on the 15th of November, 2009
	TB36.oldOpt = ['scriptlang',//0
	'serverversion2','removeadbanner','forcet31tcap','showbigiconmarket','showbigiconmilitary','showbigiconmilitary2','showbigiconmisc','alliance','showmenusection3','warsim',//10
	'repsite','showinouticons','showcentermapicon','showsendtroopsresources','showpphinvl','showccinvl','showpopinvl','showvl2table','showbipattinvl','showbookmarks',//20
	'floatbookmarks','noteblock','floatnoteblock','nbsize','nbheight','npcassistant','wsanalyser','showstatlinks','mapanalyser','showtravmapuserlinks',//30
	'showtravmapallylinks','showsearchbar','floatsearchbar','showcpinupgtables','showccinupgtables','showuntilthenresidue','showresupgradetable','showcolorreslevels','showresbartable','floatresbartable',//40
	'showbupgtable','showsortedbiupgt','showcenternumbers','showcolorbuildlevels','showbblink','showaddinfomarr','47','marketpreload','rpdefact','noofscouts',//50
	'51','52','showtroopinfotooltips','showrprinfotooltips','55','showcelltypeinfo','showdisttimes','showmaptable','mesreppreload','showmesopenlinks',//60
	'showrepdeltable','showigmlinkforme','showtb3battlereport','showbrstatdetails','cncolorneutral','cncolormaxlevel','cncolornoupgrade','cncolornpcupgrade','consoleloglevel','showresbartable_state',//70
	'showbookmarks_state','noteblock_state','showvl2table_state','showsearchbar_state','resbarXY','userBookmarksXY','noteblockXY','vList2XY','searchbarXY',	'80',//80
	'81','lockbookmarks','83', '84', '85', '86', '87', '88', '89', '90'];
	
	//link to the profile
	var spLnk = '';
	//link to the barracks
	var bksLnk = 'build.php?gid=19';
	//available races
	avRace = ['Romans', 'Teutons', 'Gauls'];
	//merchants speed (normal servers)
	var mts = {'Romans': 16, 'Teutons': 12, 'Gauls': 24};
	//user information: username(0), race(1), disprace(2), capital name(3), capital vid(4), capital newdid (5), capitalxy(6), deltaRaceImg (7)
	TB36.U = ['', '', '', '', '', '', '', 1];
	//available languages
	var arAvLang = ['Server language', 'ar','cl','mx','en'];
	//village information
	function xVillage(aName, vID, newdid, x, y, vLink) {this.vName = aName;this.vID = vID;this.vNewdid = newdid;this.vx = x;this.vy = y;this.vLink = vLink; return this;};
	//a building being upgraded
	function xBiP(aName, tEnd) {var txtLvl = aName[1].replace(")", "");var lvl = txtLvl.split(" ");this.name = aName[0];this.txtLvl = txtLvl;this.lvl = lvl[1];this.endTime = tEnd; return this;};
	function xTiT(aType, aName, t1) {this.type = aType;this.name = aName;this.t1 = t1;var aD = new Date();aD.setTime(aD.getTime());this.crtDate = aD; return this;};
	function yTiT(tType, intNo, strName) {this.tType = tType;this.intNo = intNo;this.strName = strName; return this;};
	//a troop movement (from dorf1.php)
	function xTrMov(iT, no, fT) {this.type = iT;this.no = no;this.fT = fT; return this;};
	function xTtT(tType, necRes, tTime, aRes) {this.necRes = necRes;this.tType = tType;this.tTime = tTime;this.aRes = aRes; return this;};
	
	var vList = new Array();
	//active village
	var actV = new xVillage('', 0, 0, -1000, -1000, '');
	
	var arrTtT = new Array();
	var vNames = '';
	var defaultMF = [5, 5, 4, 2, 4];
	var marketFilters;
	var localGP = "";
	var wsSName;
	var wsURLCropFinderLinkV2 = "http://crop-finder.com/";
	var wsAnalyser =	[["World Analyser", "http://www.travian.ws/analyser.pl?s="], ["Travian Utils", "http://travian-utils.com/?s="], ["Travianbox.com", "http://travianbox.com/stats/"]];
	var mapAnalyser =	[["Travmap", "http://travmap.shishnet.org/"], ["Flash map", "http://travian.org.ua/"]];
	var repSite =		[["Travilog", "http://travilog.org.ua/"], ["T-Reports.net", "http://travian-reports.net/"]];
	var warsimLink = 	["warsim.php", "http://travian.kirilloid.ru/warsim.php"];
	
	var wsURLTravianBox = "http://travianbox.com";
	var urlNow = window.location.pathname + window.location.search;
	jsVoid = 'javaScript:void(0)';
	xGIF = "a/x.gif";
	dlright1 = 'lright1';
	dmid = 'lmidall';
	dTop5 = 'ltop5';
	dTop1 = 'ltop1';
	dmid2 = 'lmid2';
	dleft = 'lleft';
	dmid1 = 'lmid1';
	dmap = 'map1';
	gIc = new Array();

	crtResUnits = new Array(5);//current resource units
	capacity = new Array(4);//capacity of the warehouse/granary
	prodPerHour = new Array(7);//production per hour for the four resource types
	timeToFill = [[-1, ""], [-1, ""], [-1, ""], [-1, ""]];//time to fill the warehouse/granary
	
	NPCResources = 'npcResources';
	NPCbacklinkName = 'npcBackLink';
	NPCURL = '/build.php?gid=17&t=3';

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

	//css Style declarations
	acss =
	"#upgTable {width:682px; border-collapse:collapse; border:1px solid silver; background-color:" + TB36.DFc[1] + "; font-size:8pt; margin:1px; padding:2px; text-align:" + docDir[0] + "; empty-cells:show; line-height:16px;}" +
	"table#upgTable table {background-color:transparent; border-collapse:collapse; border:0px none transparent; font-size:8pt; padding:2px; margin:1px; text-align:" + docDir[1] + "; vertical-align:top;}" +
	"table#upgTable tr {background-color:transparent; border-collapse:collapse; border:0px none transparent; font-size:8pt; padding:2px; margin:1px; text-align:" + docDir[1] + "; vertical-align:top;}" +
	"table#upgTable td {background-color:transparent; border:0px none transparent; font-size:8pt; text-align:" + docDir[1] + "; padding:2px; vertical-align:top;}" +
	"table#upgTable td.center {text-align:center; vertical-align:middle;}" +
	"table#upgTable td.tb3uthc {background-color:#ECECEC; border:1px solid silver; vertical-align:middle; font-weight:normal; text-align:center; width:25%; height:18px;}" +
	"table#upgTable td.tb3utbc {background-color:transparent; border:1px solid silver; margin:0px; text-align:center; vertical-align:top; width:25%; height:18px;}" +
	"table#upgTable a {font-size:8pt; font-weight:bold;}" +
	
	"table.rNt {background-color:transparent; border-collapse:collapse; border:0px none transparent; font-size:8pt; padding:2px; margin:1px; text-align:" + docDir[1] + "; vertical-align:top;}" +
	"table.rNt tr {background-color:transparent; border-collapse:collapse; border:0px none transparent; font-size:8pt; padding:2px; margin:1px; text-align:" + docDir[1] + "; vertical-align:top;}" +
	"table.rNt td {background-color:transparent; border:0px none transparent; font-size:8pt; text-align:" + docDir[1] + "; padding:2px; vertical-align:top;}" +
	"table.rNt td.center {text-align:center; vertical-align:middle;}" +
	
	"table#mapTable {width:682px; border-collapse:collapse; border:1px solid silver; background-color:" + TB36.DFc[1] + "; font-size:8pt; margin:0px; padding:0px; text-align:center; empty-cells:show; line-height:16px;}" +
	"table#mapTable thead td {border:1px solid silver; background-color:#ECECEC; font-size:9pt; font-weight:bold; text-align:center; padding:1px; cursor:default; vertical-align:middle;}" +
	"table#mapTable thead td.tb3mthcp {cursor:pointer;}" +
	"table#mapTable td {border:1px solid silver; background-color:transparent; padding:1px; margin:0px; font-size:8pt; font-weight:normal; text-align:center; vertical-align:middle;}" +
	"table#mapTable td.tb3mtcu {font-weight:bold; color:blue;}" +
	"table#mapTable td.tb3mtcp {padding-" + docDir[1] + ":10px; color:black; text-align:" + docDir[1] + ";}" +

	"div#updDiv {position:absolute; top:200px; " + docDir[0] + ":120px; display:block; padding:1px; z-index:50; clear:both; border:2px solid #C0C0C0; background-color:black; color:yellow;}" +
	
	"table#userbookmarks {border-collapse:collapse; border:0px none transparent; background-color:" + TB36.DFc[1] + "; line-height:16px;}" +
	"table#userbookmarks tr {text-align:" + docDir[0] + "; vertical-align:middle; padding:0 0 0 2px; margin:0px; white-space:nowrap; border-collapse:collapse; border:0px none transparent;}" +	
	"table#userbookmarks td {border:0px none transparent; background-color:" + TB36.DFc[1] + "; text-align:" + docDir[0] + "; font-size:13px; font-weight:normal; color:black; padding:2px; vertical-align:middle;}" +
	"table#userbookmarks td.noact {width:10px;}" +
	"table#userbookmarks td.act {width:10px; color:#FF8000;}" +
	"table#userbookmarks img {cursor:pointer;}" +
	"table#userbookmarks span {padding:0 0 0 4px;}" +

	"table#mkls {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB36.DFc[1] + "; padding:2px; margin:1px; line-height:18px;}" +
	"table#mkls tr {background-color:transparent;}" +
	"table#mkls td {background-color:transparent; border:1px solid silver; font-weight:normal; font-size:8pt; color:black; text-align:" + docDir[1] + "; vertical-align:middle; padding:2px 3px 2px 3px; white-space:nowrap;}" +
	"table#mkls td.mklshh {background-color:#ECECEC; text-align:center; width:16%;}" +
	"table#mkls td.mklsc {text-align:center;}" +
	
	"table#br_table, table#br_table tr {background-color:transparent; border:1px solid #C2C2C2; text-align:center; padding:0px; margin:0px; border-collapse:collapse; width:100%;}" +
	"table#br_table td {background-color: transparent; border:1px solid #C2C2C2; font-size:8pt; text-align:" + docDir[1] + "; padding:2px 7px 2px 2px; margin:0px;}" +
	"table#br_table td.tb3cbrh1 {background-color:#F3F3F3; font-size:10pt; font-weight:bold; color:#000000; text-align:center;}" +
	"table#br_table td.tb3cbrh2 {background-color:#F3F3F3; font-size:10pt; font-weight:bold; color:#FF8000; text-align:center;}" +
	"table#br_table td.tb3cbrh3 {background-color:#F3F3F3; font-size:10pt; font-weight:bold; color:#71D000; text-align:center;}" +
	"table#br_table td.tb3cbrc {text-align:center;}" +
	"table#br_table td.tb3cbrb {font-weight:bold;}" +
	"table#br_table td.tb3cbrr {color:red;}" +
	"table#br_table td.tb3cbrg {color:darkgreen;}" +
	"table#br_table td.tb3cbrbr {font-weight:bold; color:red;}" +
	"table#br_table td.tb3cbrbg {font-weight:bold; color:darkgreen;}" +
	
	"table#mhtt {border-collapse:collapse; border:0px none transparent; font-weight:normal; font-size:8pt; text-align:" + docDir[1] + "; padding:2px; margin:1px; background-color:transparent; empty-cells:show; line-height:16px; white-space:nowrap;}" +
	"table#mhtt tr {border:0px none transparent;}" +
	"table#mhtt td {background-color:transparent; border:0px none transparent; font-weight:normal; font-size:8pt; text-align:" + docDir[1] + "; color:black; padding:2px 7px 2px 0px; margin:0px; vertical-align:middle;}" +
	"table#mhtt td.mCol {color:blue;}" +
	"table#mhtt td.center {text-align:center;}" +
	"table#mhtt td.ld {text-align:" + docDir[0] + "; padding-left:2px;}" +
	"table#mhtt td.dec {text-align:center; font-size:10pt; font-weight:bold; color:green; border-bottom:1px solid grey;}" +
	
	"table#resbar, table#resbar {border-collapse:collapse; border:1px solid silver; background-color:" + TB36.DFc[1] + "; width:auto; line-height:13px; font-weight:normal; font-size:8pt; padding:2px; margin:1px; white-space:nowrap;}" +
	"table#resbar tr {border-collapse:collapse; border:0px none transparent; padding:0px;}" +
	"table#resbar td.tb3c {border-collapse:collapse; border:1px solid silver; background-color:" + TB36.DFc[1] + "; width:auto; line-height:13px; font-weight:normal; font-size:8pt; padding:2px; margin:1px; white-space:nowrap;}" +
	"table#resbar td.lr {border:1px solid silver; background-color:transparent; font-weight:normal; font-size:8pt; text-align:" + docDir[1] + ";}" +
	"table#resbar td.tb3cvn {text-align:center; font-weight:bold; font-size:8pt; color:blue; background-color:#E9EEFC; padding:2px;}" +
	"table#resbar td.tb3chtot {text-align:" + docDir[1] + "; font-weight:bold; font-size:8pt; border-" + docDir[0] + ":2px solid silver; background-color:#FFFFC0; padding:2px;}" +
	"table#resbar td.tb3ctot {border:1px solid silver; text-align:" + docDir[1] + "; font-size:8pt; border-" + docDir[0] + ":2px solid silver; background-color:#FFFFC0; padding:2px;}" +
	"table#resbar td.tb3ctotv {text-align:" + docDir[1] + "; font-size:8pt; border-top:2px solid silver;border-bottom:2px solid silver; border-" + docDir[0] + ":1px solid silver; background-color:#ECECEC; padding:2px;}" +
	"table#resbar td.tb3cresbar {border:1px solid silver; background-color:transparent; padding:0px; width:100px;}" +
	"table.rbrtb {border-collapse:collapse; border:0px none transparent; float:left; height:16px; width:100px; background-color:" + TB36.DFc[1] + ";}" +
	"table.rbrtb tr.rbrtbr, table.rbrtb td {border-collapse:collapse; border:0px none transparent; padding:0px;}" +
	
	"table#vl2table {border-collapse:collapse; border:0 none transparent; background-color:" + TB36.DFc[1] + "; line-height:13px; font-size:10pt; text-align:center; padding:2px; margin:0px; white-space:nowrap; vertical-align:middle;}" +
	"table#vl2table tr td {border:0 none transparent; background-color:transparent; text-align:" + docDir[0] + "; padding:2px; margin:0px; font-weight:normal; font-size:10pt;}" +
	"table#vl2table td.av {color:#FF8000;}" +
	"table#vl2table td.coord {font-size:8pt;}" +

	"div#side_info {width:700px;}" +
	"div#side_info table tbody td {font-size:8pt; white-space:nowrap; text-align:" + docDir[0] + ";}" +
	"div#side_info table tbody td.link {font-size:10pt;}" +

//para la vercion t4 de travian
//izq
"div#ltimeWrap {color:#000000;}"+
"div#mid {margin-left: 5px;}"+
"div#res {top:160px; left:-230px; padding-top:10px;}"+
"div#side_navi {width:130px;}"+
//centrado
/*"div#res {padding-top:10px;}"+
"div#ltimeWrap {color:#000000;}"+*/



		
	"table#vlist {width:auto; background-color:transparent !important; border-collapse:collapse; border:0px none transparent; margin:0px; font-size:13px; font-weight:normal; white-space:nowrap;}" +
	"table#vlist tr	{background-color:transparent;}" +
	"table#vlist tbody td {background-color:transparent; border:0px none transparent; padding:0px 2px 0px 2px; text-align:" + docDir[1] + "; font-size:8pt;}" +
	"table#vlist tr:hover, table#vlist td:hover {background-color:#E5E5F0;}" +
	
	"div.fldiv {position:absolute; display:block; padding:1px; z-index:50; clear:both; border:1px solid #C0C0C0; background-color:" + TB36.DFc[1] + "; z-index:1000;}" +
	"div.dragdiv {text-align:center; font-weight:bold; height:18px; float:" + docDir[0] + "; cursor: pointer; border-bottom:1px solid #C0C0C0; background-color:#ECECEC; z-index:1000; vertical-align:middle;}" +
	"div.mmdiv {height:18px; float:" + docDir[0] + "; cursor: pointer; border-bottom:1px solid #C0C0C0; background-color:" + TB36.DFc[1] + "; width:25px;}" +
	"div.closediv {height:18px; float:" + docDir[0] + "; cursor: pointer; border-bottom:1px solid #C0C0C0; background-color:" + TB36.DFc[1] + "; width:25px;}" +

	"p.delacc {position:absolute; display:block; padding:4px; z-index:2; border:1px solid #00C000; background-color:#FEFFE3; width:130px; text-align:center; " + docDir[1] + ":0px; top:0px;}" +
	"p.delacc span {color:orange;}" +

	"table#noteblock {border-collapse:collapse; border:0px none white; text-align:center; padding:2px; margin:1px; background-color:" + TB36.DFc[1] + ";}" +
	"table#noteblock tr {background-color:transparent; border:0px none transparent;}" +
	"table#noteblock td {border:0px none transparent; background-color:transparent; text-align:center; padding:2px;}" +
	"#noteblockcontent {border:1px solid silver; padding:0px 2px 0px 2px; overflow:auto; font-size:10pt; white-space:nowrap;}" +
	
	"table#delreptable {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB36.DFc[1] + "; padding:2px; margin:1px;}" +
	"table#delreptable tr {border:1px solid silver; text-align:center;}" +
	"table#delreptable tr.rh {background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"table#delreptable td {border:1px solid silver; padding:2px;}" +
	"table#delreptable td.cc {font-weight:bold; font-size:10pt;}" +
	
	"table#stla {width:100%; border-collapse:collapse; border:1px solid silver; font-weight:normal; font-size:8pt; color:black; text-align:center; background-color:" + TB36.DFc[1] + "; padding:1px; margin:1px; line-height:18px;}" +
	"table#stla tr {background-color:transparent;}" +
	"table#stla td {border:1px solid silver; font-size:8pt; text-align:" + docDir[1] + "; vertical-align:middle; padding:1px 2px 1px 2px; white-space:nowrap;}" +
	"table#stla td.stlahh {background-color:#ECECEC; text-align:center; width:5%;}" +
	"table#stla td.stlahh1 {background-color:#ECECEC; text-align:center; width:10%;}" +
	"table#stla td.stlahh2 {background-color:#ECECEC; text-align:center;}" +
	"table#stla td.stlac {background-color:transparent; text-align:center;}" +
	
	"table#soff {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB36.DFc[1] + "; line-height:18px;}" +
	"table#soff tr {background-color:transparent;}" +
	"table#soff td {background-color:transparent; border:1px solid silver; color:black; text-align:" + docDir[1] + "; vertical-align:middle; padding:2px 3px 2px 1px; white-space:nowrap;}" +
	"table#soff td.soffhh {background-color:#ECECEC; text-align:center; width:16%;}" +
	"table#soff td.soffc {text-align:center;}" +
	
	"input#soff, input#soffG {margin-top:3px;" + (docDir[0] == 'right' ? "margin-right:0px" : "margin-right:3px") + "; margin-bottom:3px;" + (docDir[0] == 'right' ? "margin-left:3px" : "margin-left:0px") + "; padding:0px;}" +

	"table#TB3S	{width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB36.DFc[1] + "; padding:2px; margin:1px;}" +
	"table#TB3S tr.srh {background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"table#TB3S td {border:1px solid silver; background-color:transparent; padding:2px; border-collapse:collapse; text-align:" + docDir[0] + "; font-size:8pt;}" +
	"table#TB3S td.srst {background-color:#ECECEC; text-align:" + docDir[0] + "; font-size:9pt; font-weight:bold; color:darkblue;}" +
	"table#TB3S td.s1 {background-color:#ECECEC; text-align:center; width:70%; font-weight:bold;}" +
	"table#TB3S td.s2 {background-color:#ECECEC; text-align:center; width:20%;}" +
	"table#TB3S select, table#TB3S input {font-size:8pt;}" +
	"table#TB3S span {font-size:8pt; font-weight: bold;}" +
	"table#TB3S td.s3 {background-color:#ECECEC; text-align:center; width:10%;}" +
	"table#TB3S img {cursor:pointer;}" +

	"table#cptable {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB36.DFc[1] + "; padding:2px; margin:1px;}" +
	"table#cptable tr {background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"table#cptable td {border-collapse:collapse; border:1px solid silver; background-color:#ECECEC; padding:2px; font-size:8pt; font-weight:bold;}" +
	"table#cptable td.CG {font-weight:normal; background-color:#C8FFC8;}" +
	"table#cptable td.CR {font-weight:normal; background-color:#FFE1E1;}" +

	"table#mbuyf {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB36.DFc[1] + "; padding:2px; margin:1px;}" +
	"table#mbuyf tr {border-collapse:collapse; border:1px solid silver; text-align:center;}" +
	"table#mbuyf td {border:1px solid silver; background-color:transparent; padding:2px; border-collapse:collapse;}" +
	"table#mbuyf td.sf {background-color:#FFE4B5;}" +
	
	"table.allvtroops, table.allvtroops tr td {border-collapse:collapse; border:1px solid silver; text-align:center; padding:2px;}" +
	"table.allvtroops tr th {border-collapse:collapse; border:1px solid silver; text-align:" + docDir[0] + "; padding:2px 7px; width:20%;}" +

	"table#dorf3table, table#dorf3table tr {width:100%; border-collapse:collapse; border:1px solid silver; text-align:center; background-color:" + TB36.DFc[1] + "; padding:2px; margin:1px; font-size:10pt;}" +
	"table#dorf3table td {border:1px solid silver;}" +
	
	"tr#aRselecttraintroops {border-collapse:collapse; background-color:" + TB36.DFc[1] + ";}" +
	"tr#aRselecttraintroops td {border:0px none transparent; background-color:transparent; text-align:center; padding:0px 2px 0px 7px;}" +
	
	"table#BiPTM {border-collapse:collapse; border:1px solid silver; background-color:" + TB36.DFc[1] + ";}" +
	"table#BiPTM tr {border:0px none transparent;}" +
	"table#BiPTM td {border:1px solid silver; font-size:8pt; padding:4px;}" +
	
	
	"tr.cbgx td, td.cbgx {background-color:#FFFFC0; border-collapse:collapse; border:1px solid silver; padding:2px; text-align:center;}" +
		
	"div#tb_tooltip {position:absolute; display:none; padding:2px; z-index:9000; border:1px solid #00C000; background-color:#FFFFCC; -moz-border-radius:5px;}" +
	
	"div#build.gid17 table#target_select {border-collapse:collapse; border:0px none transparent; background-color:transparent; line-height:21px; width:34%; float:left; margin-" + docDir[0] + ":10px;}" +
	"div#build.gid17 table#target_select td.vil input.text {width:90px;}" +

	"div.npc-general {margin:3px 0 0; font-size:7pt; float:none;} " +
	"span.npc-red {color:#DD0000;} " +
	"span.npc-green {color:#009900;}" +

	"div.CNBT {background-color:" + TB36.CNc[1] + "; border:1px solid black; -moz-border-radius:2em; " +
	"padding-top:3px; font-family:Arial, Helvetica, Verdana, sans-serif; font-size:9pt; font-weight:bold; " +
	"color:" + TB36.CNc[0] + "; text-align:center; position:absolute; width:21px; height:18px; cursor:pointer; visibility:hidden; z-index:26;}" +

	//...
	
	"table.tb3tb	{width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:" + TB36.DFc[1] + "; padding:2px; margin:1px;}" +
	"table.tb3tb tr, table.tb3tb td {border:1px solid silver;}" +

	"table.tb3tbnb	{border-collapse:collapse; border:0px none white; font-size:8pt; text-align:center; padding:2px; margin:1px; background-color:" + TB36.DFc[1] + ";}" +
	"table.tb3tbnb tr, table.tb3tbnb td, table.tb3tbnb td.tb3cnb {border:0px none white;}" +
	"tr.tb3rh		{background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"tr.tb3rhb		{background-color:#ECECEC; text-align:center; border:1px solid silver; font-weight:bold;}" +
	"tr.tb3rhnb		{background-color:#ECECEC; text-align:center;}" +
	"tr.tb3r 		{border-collapse:collapse; border:1px solid silver; text-align:center;}" +
	"tr.tb3rnb		{border-collapse:collapse; border:0px none white; text-align:center; white-space:nowrap;}" +
	"td.tb3chbb		{border:1px solid silver; background-color:#ECECEC; padding:2px; font-weight:bold; font-size:10pt;}" +
	"td.tb3chb		{border:1px solid silver; background-color:#ECECEC; padding:2px; font-weight:bold;}" +
	"td.tb3ch		{border:1px solid silver; background-color:#ECECEC; padding:2px; text-align:center;}" +
	"td.tb3chnb		{border:0px none white; background-color:#ECECEC; padding:2px; text-align:center;}" +
	"td.tb3c		{border:1px solid silver; background-color:transparent; padding:2px; border-collapse:collapse;}" +
	"td.tb3cnb		{border:0px none transparent; background-color:transparent; text-align:center; padding:2px;}" +
	"td.tb3cbt		{border-top:1px solid silver; font-size:8pt; color:#000000; text-align:center;}" +
	
	"td.desc, td.desc div, td.desc span {font-size:8pt;}" +
	"h1 {z-index:300; padding-top:16px;}";
	
	acss += ".reslevel {position:absolute; z-index:1; width:17px; height:12px;}" +
	".rf1 {left: 93px; top:27px;}" +
	".rf2 {left: 156px; top:26px;}" +
	".rf3 {left: 216px; top:41px;}" +
	".rf4 {left: 38px; top:59px;}" +
	".rf5 {left: 130px; top:67px;}" +
	".rf6 {left: 195px; top:87px;}" +
	".rf7 {left: 253px; top:81px;}" +
	".rf8 {left: 23px; top:111px;}" +
	".rf9 {left: 74px; top:104px;}" +
	".rf10 {left: 205px; top:136px;}" +
	".rf11 {left: 260px; top:139px;}" +
	".rf12 {left: 33px; top:165px;}" +
	".rf13 {left: 84px; top:158px;}" +
	".rf14 {left: 151px; top:178px;}" +
	".rf15 {left: 230px; top:192px;}" +
	".rf16 {left: 79px; top:211px;}" +
	".rf17 {left: 132px; top:223px;}" +
	".rf18 {left: 182px; top:227px;}";
	GM_addStyle(acss);
	
	//fix for mixed T3.1 & T3.5
	fcss = ".village2_mapTB3 {width:540px; height:448px; position:relative; left:-19px;}" +
	".village2_mapTB3 .building {position:absolute;}" +
	"div#sright table {width:100%}";
	GM_addStyle(fcss);

	//------------------------------------------
	//Modified by Lux
	//------------------------------------------
	cssSetup =	".MsgPageOff {visibility:hidden; display:none; position:absolute; top:-100px; left:-100px;}" +
	".OuterMsgPageOn {position:absolute; top:0px; left:0px; visibility:visible; width:150%; height:100%; background-color:#000000; z-index:1998; opacity:0.75;}" +
	".InnerMsgPageOn {position: absolute; left:25%; top:2.8%; visibility:visible; opacity:1; z-index:1999;}";
	GM_addStyle(cssSetup);
	//------------------------------------------

var t = new Array();

function setDefLang() {
//default = English
//setup
t['0'] = "Idioma"; //please, do not translate !!! translation will never be included into the script !
t['1'] = "Travian v4.x server";
t['2'] = 'Quitar banners publicitarios';
t['3'] = 'Force T3.1 Legionnaire & Phalanx capacity calculation<br>(for mixed T3.1 & T3.5 servers)';
t['4'] = 'Market';
t['5'] = 'Rally point/Barracks/Workshop/Stable';
t['6'] = "Town hall/Hero's mansion/Armoury/Blacksmith";
t['7'] = "Palace/Residence/Academy/Treasury";
t['8'] = 'Alliance';
t['9'] = "Show additional links in left menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['10'] = "Combat simulator link to use:"; //menu left"
t['11'] = "Link to use for posting reports site";
t['12'] = "Show 'dorf1.php' and 'dorf2.php' links";
t['13'] = 'Show "Center map on this village" icon';
t['14'] = "Show 'Send troops/Send resources' icons in village list";
t['15'] = "Show lumber, clay, iron production per hour in village list";
t['16'] = "Show effective crop production in village list";
t['17'] = "Show population in village list";
t['18'] = 'Show additional (2 columns) village list as floating window';
t['19'] = 'Show information about buildings in progress and troop movements<br>in village list';
t['20'] = 'Show bookmarks';
t['21'] = "Show 'User Bookmarks' as floating window";
t['22'] = 'Show note block';
t['23'] = "Show 'NoteBlock' as floating window";
t['24'] = 'Note block size';
t['25'] = 'Note block height';
t['26'] = 'Show NPC Assistant calculations/links';
t['27'] = "World Analyser to use";
t['28'] = "Show analyser statistic links";
t['29'] = 'Map Analyser to use';
t['30'] = 'Show links to map for users';
t['31'] = 'Show links to map for alliances';
t['32'] = "Show 'Search Bar'";
t['33'] = "Show 'Search Bar' as floating window";
t['34'] = "Show CP/day information in upgrade tables";
t['35'] = "Show crop consumption in upgrade tables";
t['36'] = "Show 'Until then/Residue' calculation in upgrade/training tables";
t['37'] = "Show resource fields upgrade table";
t['38'] = 'Show resource level colours';
t['39'] = "Show 'Resource Bar' table";
t['40'] = "Show 'Resource Bar' table as floating window";
t['41'] = "Show buildings upgrade table";
t['42'] = 'Sort buildings by name in upgrade table';
t['43'] = 'Show center numbers';
t['44'] = 'Show building level colours';
t['45'] = "Show blinking levels for buildings being upgraded";
t['46'] = "Show additional information for every merchant arrival";
t['47'] = "Show last market transport";
t['48'] = "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(Default = 1)";
t['49'] = 'Rally point default action';
t['50'] = 'No. of scouts for the "Select scout" function';
t['51'] = "Show last attack";
t['52'] = "Show/use coordinates for last attack";
t['53'] = 'Show troops information in tooltips';
t['54'] = 'Show distance and times to villages in tooltips'; 
t['55'] = "Auto fill in available troops for the internal war simulator";
t['56'] = "Show cell type/oasis info<br>while mousing over the map";
t['57'] = 'Show distances & times';
t['58'] = 'Show table of players/villages/occupied oasis';
t['59'] = 'Number of message/report pages to preload<br>(Default = 1)';
t['60'] = 'Show links to open messages/reports in a pop-up';
t['61'] = 'Show "Delete all" table on the Reports page';
t['62'] = 'Show the "Send IGM" icon for me, too';
t['63'] = 'Show TB3 enhanced Battle Reports';
t['64'] = 'Show details in Report Statistics';
t['65'] = 'Color upgrade available<br>(Default = Empty)';
t['66'] = 'Color max level<br>(Default = Empty)';
t['67'] = 'Color upgrade not possible<br>(Default = Empty)';
t['68'] = 'Color upgrade via NPC<br>(Default = Empty)';
t['69'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING (Default = 0)";
t['82.L'] = 'Lock bookmarks (Hide delete, move up, move down icons)';
t['82.U'] = 'Unlock bookmarks (Show delete, move up, move down icons)';
t['85'] = "Show 'Send troops/Send resources' icons";
t['87'] = "Remember last 1x/2x/3x market send option (if available)";
t['U.2'] = 'Race';
t['U.3'] = 'Name of your capital<br><b>Visit your Profile for an update</b>';
t['U.6'] = 'Coordinates of your capital<br><b>Visit your Profile for an update</b>';
t['SIM'] = 'Combat simulator';
t['QSURE'] = 'Are you sure?';
t['LOSS'] = 'Loss';
t['PROFIT'] = 'Profit';
t['EXTAV'] = 'Extension available';
t['PLAYER'] = 'Player';
t['VILLAGE'] = 'Village';
t['POPULATION'] = 'Population';
t['COORDS'] = 'Coordinates';
t['MAPTBACTS'] = 'Actions';
t['SAVED'] = 'Saved';
t['YOUNEED'] = 'You need';
t['TODAY'] = 'today';
t['TOMORROW'] = 'tomorrow';
t['DAYAFTERTOM'] = 'day after tomorrow';
t['MARKET'] = 'Marketplace';
t['BARRACKS'] = 'Barracks';
t['RAP'] = 'Rally point';
t['STABLE'] = 'Stable';
t['WORKSHOP'] = 'Workshop';
t['SENDRES'] = 'Send resources';
t['BUY'] = 'Buy';
t['SELL'] = 'Sell';
t['SENDIGM'] = 'Send IGM';
t['LISTO'] = 'Available';
t['ON'] = 'on';
t['AT'] = 'at';
t['EFICIENCIA'] = 'Efficiency';
t['NEVER'] = 'Never';
t['ALDEAS'] = 'Village(s)';
t['TIEMPO'] = 'Time';
t['OFREZCO'] = 'Offering';
t['BUSCO'] = 'Searching';
t['TIPO'] = 'Type';
t['DISPONIBLE'] = 'Only available';
t['CUALQUIERA'] = 'Any';
t['YES'] = 'Yes';
t['NO'] = 'No';
t['LOGIN'] = 'Login';
t['MARCADORES'] = 'Bookmarks';
t['ANYADIR'] = 'Add';
t['UBU'] = 'New Bookmark URL';
t['UBT'] = 'New Bookmark Text';
t['DEL'] = 'Delete';
t['MAPA'] = 'Map';
t['MAXTIME'] = 'Maximum time';
t['ARCHIVE'] = 'Archive';
t['SUMMARY'] = 'Summary';
t['TROPAS'] = 'Troops';
t['CHKSCRV'] = 'Update TBeyond';
t['ACTUALIZAR'] = 'Update village information';
t['VENTAS'] = 'Saved Offers';
t['MAPSCAN']  = 'Scan the Map';
t['BIC'] = 'Show extended icons';
t['SAVE'] = 'Save';
t['AT2'] = 'Reinforcement';
t['AT3'] = 'Attack: Normal';
t['AT4'] = 'Attack: Raid';
t['NBSA'] = 'Auto';
t['NBSN'] = 'Normal (small)';
t['NBSB'] = 'Large screen (large)';
t['NBHAX'] = 'Automatic expand height';
t['NBHK'] = 'Default height';
t['NPCSAVETIME'] = 'Save: ';
t['TOTALTROOPS'] = 'Total village troops';
t['SELECTALLTROOPS'] = "Select all troops";
t['PARTY'] = "Festivities";
t['CPPERDAY'] = "CP/day";
t['SLOT'] = "Slot";
t['TOTAL'] = "Total";
t['SELECTSCOUT'] = "Select scout";
t['SELECTFAKE'] = "Select fake";
t['NOSCOUT2FAKE'] = "It's impossible to use scouts for a fake attack !";
t['NOTROOP2FAKE'] = "There aren't troops for a fake attack!";
t['NOTROOP2SCOUT'] = "There aren't troops to scout !";
t['NOTROOPS'] = "There aren't troops in the village !";
t['ALL'] = "All";
t['SH2'] = "In color fields you may enter:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
t['SOREP'] = "Show original report (for posting)";
t['WSIMO1'] = "Internal (provided by the game)";
t['WSIMO2'] = "External (provided by kirilloid.ru)";
t['NONEWVER'] = "You have the latest version available";
t['BVER'] = "You may have a beta version";
t['NVERAV'] = "A new version of the script is available";
t['UPDSCR'] = "Update script now ?";
t['CHECKUPDATE'] = "Checking for script update.<br>Please wait...";
t['CROPFINDER'] = "Crop finder";
t['AVPPV'] = "Average population per village";
t['AVPPP'] = "Average population per player";
t['MAX'] = 'Max';
t['TOTTRTR'] = 'Total troops training';
t['TB3SL'] = TB36.shN + ' Setup';
t['UPDALLV'] = 'Update all villages.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
t['LARGEMAP'] = 'Large map';
t['USETHEMPR'] = 'Use them (proportional)';
t['USETHEMEQ'] = 'Use them (equal)';
t['TOWNHALL'] = 'Town Hall';
t['GSRVT'] = 'Game server';
t['ACCINFO'] = 'Account Information';
t['NBO'] = 'Noteblock';
t['MNUL'] = 'Menu on the left side';
t['STAT'] = 'Statistics';
t['RESF'] = 'Resource fields';
t['VLC'] = 'Village center';
t['MAPO'] = 'Map options';
t['COLO'] = 'Color options';
t['DBGO'] = 'Debug options';
t['HEROSMANSION'] = "Hero's mansion";
t['BLACKSMITH'] = 'Blacksmith';
t['ARMOURY'] = 'Armoury';
t['NOW'] = 'Now';
t['CLOSE'] = 'Close';
t['USE'] = 'Use';
t['USETHEM1H'] = 'Use them (1 hour production)';
t['OVERVIEW'] = 'Overview';
t['FORUM'] = 'Forum';
t['ATTACKS'] = 'Attacks';
t['NEWS'] = 'News';
t['ADDCRTPAGE'] = 'Add current';
t['SCRPURL'] = 'TBeyond page';
t['SPACER'] = 'Spacer';
t['MEREO'] = 'Messages & Reports';
t['ATTABLES'] = 'Troop tables';
t['MTW'] = 'Wasted';
t['MTX'] = 'Exceeding';
t['MTC'] = 'Current load';
t['ALFL'] = 'Link to external forum<br>(Leave empty for internal forum)';
t['MTCL'] = 'Clear all';
t['CKSORT'] = 'Click to sort';
t['MIN'] = 'Min';
t['SVGL'] = 'Shared among villages';
t['VGL'] = 'Village List';
t['UPDATEPOP'] = 'Update population';
t['EDIT'] = 'Edit';
t['NPCO'] = 'NPC Assistant options';
t['NEWVILLAGEAV'] = 'Date/Time';
t['TIMEUNTIL'] = 'Time to wait';
t['CENTERMAP'] = 'Center map on this village';
t['SENDTROOPS'] = 'Send troops';
t['PALACE'] = "Palace";
t['RESIDENCE'] = "Residence";
t['ACADEMY'] = "Academy";
t['TREASURY'] = "Treasury";
t['UPGTB'] = "Resource fields/buildings upgrade tables";
t['RBTT'] = "Resource Bar";
t['RESIDUE'] = 'The residue if you build it ';
t['RESOURCES'] = 'Resources';
t['SH1'] = "Open your Profile for automatic capital/coordinates detection<br>Build the barracks for automatic race detection and then open the village center";
t['RESEND'] = "Send again ?";
t['WSI'] = "War simulator provided by the game";
t['TTT'] = "General troops/distance tooltips";
t['FINDREP'] = "Search the last of";
t['IREPORT1'] = "Won as attacker without losses";
t['IREPORT2'] = "Won as attacker with losses";
t['IREPORT3'] = "Lost as attacker";
t['IREPORT4'] = "Won as defender without losses";
t['IREPORT5'] = "Won as defender with losses";
t['IREPORT6'] = "Lost as defender with losses";
t['IREPORT7'] = "Lost as defender without losses";
}; 

function switchLanguage() {
switch (arAvLang[TB36.O[0]]) {
case "ar":
case "cl":
case "mx"://by Leonel (aka Phob0z) & Gabraham
t['8'] = 'Alianza';
t['SIM'] = 'Simulador de combate';
t['QSURE'] = "\u00bfEst\u00e1s seguro?";
t['LOSS'] = 'P&eacute;rdidas';
t['PROFIT'] = 'Ganancias';
t['EXTAV'] = 'Subir nivel';
t['PLAYER'] = 'Jugador';
t['VILLAGE'] = 'Aldea';
t['POPULATION'] = 'Poblaci&oacute;n';
t['COORDS'] = 'Coordenadas';
t['MAPTBACTS'] = 'Acciones';
t['SAVED'] = 'Guardado';
t['YOUNEED'] = 'Te falta';
t['TODAY'] = 'hoy';
t['TOMORROW'] = 'ma&ntilde;ana';
t['DAYAFTERTOM'] = 'pasado ma&ntilde;ana';
t['MARKET'] = 'Mercado';
t['BARRACKS'] = 'Cuartel';
t['RAP'] = 'Plaza de reuniones';
t['STABLE'] = 'Establo';
t['WORKSHOP'] = 'Taller';
t['SENDRES'] = 'Enviar recursos';
t['BUY'] = 'Comprar';
t['SELL'] = 'Vender';
t['SENDIGM'] = 'Enviar IGM';
t['LISTO'] = 'Listo';
t['ON'] = 'el';
t['AT'] = 'a las';
t['EFICIENCIA'] = 'Eficiencia';
t['NEVER'] = 'Nunca';
t['ALDEAS'] = 'Aldea(s)';
t['TIEMPO'] = 'Tiempo';
t['OFREZCO'] = 'Ofrezco';
t['BUSCO'] = 'Busco';
t['TIPO'] = 'Tipo';
t['DISPONIBLE'] = 'Solo disponible';
t['CUALQUIERA'] = 'Cualquiera';
t['YES'] = 'Si';
t['NO'] = 'No';
t['LOGIN'] = 'Ingresar';
t['MARCADORES'] = 'Marcadores';
t['ANYADIR'] = 'A\u00f1adir';
t['UBU'] = 'URL del nuevo Marcador';
t['UBT'] = 'Nombre del nuevo Marcador';
t['DEL'] = 'Eliminar';
t['MAPA'] = 'Mapa';
t['MAXTIME'] = 'Tiempo m&aacute;ximo';
t['ARCHIVE'] = 'Archivar';
t['SUMMARY'] = 'Resumen';
t['TROPAS'] = 'Tropas';
t['CHKSCRV']  = 'Actualice TBeyond';
t['ACTUALIZAR'] = 'Actualizar informaci&oacute;n de aldea';
t['VENTAS'] = 'Guardar ofertas';
t['MAPSCAN'] = 'Escanear el Mapa';
t['BIC'] = 'Mostrar iconos de acceso r&aacute;pido';
t['22'] = 'Mostrar hoja de notas';
t['SAVE'] = 'Guardar';
t['49'] = 'Opci&oacute;n por defecto cuando se mandan tropas';
t['AT2'] = 'Refuerzos';
t['AT3'] = 'Ataque: Normal';
t['AT4'] = 'Ataque: Asalto';
t['24'] = 'Tama&ntilde;o de la hoja de notas';
t['NBSA'] = 'Autom\u00e1tico';
t['NBSN'] = 'Normal';
t['NBSB'] = 'Grande';
t['25'] = 'Altura de la hoja de notas';
t['NBHAX'] = 'Expandir altura autom\u00e1ticamente';
t['NBHK'] = 'Altura por defecto';
t['43'] = 'Mostrar el nivel de las construcciones en el centro de la aldea';
t['NPCSAVETIME'] = 'Tiempo ahorrado: ';
t['38'] = 'Mostrar colores en el nivel de los recursos';
t['44'] = 'Mostrar colores en el nivel de las construcciones';
t['65'] = 'Color para las actualizaciones disponibles';
t['66'] = 'Color para los niveles m&aacute;ximos';
t['67'] = 'Color para las actualizaciones no disponibles';
t['68'] = 'Color para actualizar por medio de NPC';
t['TOTALTROOPS'] = 'Tropas totales de la aldea';
t['20'] = 'Mostrar marcadores';
t['U.2'] = 'Raza';
t['1'] = "Servidor Travian v2.x?";
t['SELECTALLTROOPS'] = "Seleccionar todas las tropas";
t['PARTY'] = "Fiesta";
t['CPPERDAY'] = "PC/d\u00eda";
t['SLOT'] = "Espacios disp.";
t['TOTAL'] = "Total";
t['SELECTSCOUT'] = "Seleccionar esp&iacute;as";
t['SELECTFAKE'] = "Seleccionar unidad para fake";
t['NOSCOUT2FAKE'] = "No es posible usar esp\u00edas para un fake!";
t['NOTROOP2FAKE'] = "No hay tropas para usar como fake!";
t['NOTROOP2SCOUT'] = "No hay esp\u00edas!";
t['NOTROOPS'] = "No hay tropas en la aldea!";
t['ALL'] = "Todo";
t['SH2'] = "En los campos para escribir en el color, puedes poner:<br>- <b>green</b> o <b>red</b> o <b>orange</b>, etc.<br>- El c&oacute;digo Hexadecimal del color.<br>- D&eacute;jalo vac&iacute;o para usar el color por defecto";
t['SOREP'] = "Mostrar reporte original (para poner en foros)";
t['56'] = "Mostrar el tipo de casilla al ponerle el cursor encima";
t['10'] = "&iquest;Qu&eacute; simulador de combate usar?:<br>(men&uacute; izquierdo)";
t['WSIMO1'] = "Interno (el que trae travian por defecto)";
t['WSIMO2'] = "Externo (kirilloid.ru)";
t['27'] = "&iquest;Qu&eacute; analizador usar para las estad&iacute;sticas?";
t['28'] = "Mostrar enlaces del analizador de estadisticas<br>(icono del mundo al lado de usuarios/alianzas)";
t['NONEWVER'] = "Tiene la \u00faltima versi\u00f3n disponible";
t['BVER'] = "Tal ves tengas una versi\u00f3n beta";
t['NVERAV'] = "Hay una nueva versi\u00f3n del script disponible";
t['UPDSCR'] = "Actualizar el script?";
t['CHECKUPDATE'] = "Buscando nuevas versiones del script.<br>Por favor espera...";
t['CROPFINDER'] = 'Buscar Cultivos';
t['AVPPV'] = "Poblaci&oacute;n promedio por aldea";
t['AVPPP'] = "Poblaci&oacute;n promedio por jugador";
t['37'] = "Mostrar la tabla de actualizaci&oacute;n de los recursos";
t['41'] = "Mostrar la tabla de actualizaci&oacute;n de las construcciones";
t['69'] = "Nivel de Registro de la Consola<br>SOLO PARA PROGRAMADORES O DEPURACI&Oacute;N<br>(Valor por defecto = 0)";
t['48'] = "P&aacute;ginas mostradas en la secci&oacute;n 'Comprar' del mercado<br>(Valor por defecto = 1)";
t['U.3'] = 'Nombre de tu capital<br><b>Revisa tu perfil para actualizarla</b>';
t['U.6'] = 'Coordenadas de tu capital<br><b>Revisa tu perfil para actualizarla</b>';
t['MAX'] = 'Max.';
t['TOTTRTR'] = 'Tropas totales que se estan creando';
t['57'] = 'Mostrar distancias y tiempos en tooltips';
t['TB3SL'] = 'Config. de TBeyond';
t['UPDALLV'] = 'Actualizar todas las aldeas. USAR CON MUCHO CUIDADO, PUEDE LLEVAR A QUE BORREN TU CUENTA!';
t['9'] = "Mostrar enlaces adicionales en el menu de la izquierda<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
t['LARGEMAP'] = 'Mapa grande';
t['USETHEMPR'] = 'Llenar proporcionalmente a la cantidad de cada recurso que hay en los almacenes';
t['USETHEMEQ'] = 'Llenar con la misma cantidad de cada recurso';
t['TOWNHALL'] = 'Ayuntamiento';
t['GSRVT'] = 'Versi&oacute;n del servidor';
t['ACCINFO'] = 'Informaci\u00f3n de la Cuenta';
t['NBO'] = 'Hoja de notas';
t['MNUL'] = 'Men&uacute; en el lado izquierdo';
t['STAT'] = 'Estad&iacute;sticas';
t['RESF'] = 'Campos de recursos';
t['VLC'] = 'Centro de la aldea';
t['MAPO'] = 'Opciones del Mapa';
t['COLO'] = 'Opciones de color';
t['DBGO'] = 'Opciones de depuraci&oacute;n (DEBUG)';
t['4'] = 'Mercado';
t['5'] = 'Plaza de reuniones/Cuartel/Taller/Establo';
t['6'] = "Ayuntamiento/Hogar del H&eacute;roe/Armer&iacute;a/Herrer&iacute;a";
t['HEROSMANSION'] = "Hogar del H&eacute;roe";
t['BLACKSMITH'] = 'Armer&iacute;a';
t['ARMOURY'] = 'Herrer&iacute;a';
t['NOW'] = 'Ahora';
t['CLOSE'] = 'Cerrar';
t['USE'] = 'Usar';
t['USETHEM1H'] = 'Llenar con 1 hora de producci&oacute;n de esta aldea';
t['OVERVIEW'] = 'Resumen';
t['FORUM'] = 'Foro';
t['ATTACKS'] = 'Ataques';
t['NEWS'] = 'Noticias';
t['ADDCRTPAGE'] = 'A\u00F1adir P\u00E1gina Actual';
t['SCRPURL'] = 'P\u00E1g. de TBeyond';
t['50'] = 'N° de esp&iacute;as para selecionar por defecto en "Seleccionar espías"';
t['SPACER'] = 'Separador';
t['53'] = 'Mostrar informaci&oacute;n de tropas en tooltips';
t['MEREO'] = 'Mensajes y Reportes';
t['59'] = 'N&uacute;mero de pag&iacute;nas de mensajes/reportes precargadas<br>(Valor por defecto = 1)';
t['ATTABLES'] = 'Tabla de tropas';
t['MTW'] = 'Disponible';
t['MTX'] = 'Excedido';
t['MTC'] = 'Carga actual';
t['ALFL'] = 'V&iacute;nculo a foro externo<br>(Dejar en blanco para foro interno)';
t['82.L'] = 'Bloquear marcadores (Ocultar iconos de eliminar, subir, bajar)';
t['MTCL'] = 'Limpiar todo';
t['82.U'] = 'Desbloquear marcadores (Mostrar iconos de eliminar, subir, bajar)';
t['CKSORT'] = 'Haga clic para ordenar';
t['MIN'] = 'Min';
t['SVGL'] = "Compartir entre las aldeas";
t['VGL'] = 'Lista de Aldeas';
t['12'] = "Mostrar enlaces 'dorf1.php' y 'dorf2.php'";
t['UPDATEPOP'] = 'Actualizar habitantes';
t['54'] = 'Mostrar tiempos y distancias a aldeas en tooltips';
t['EDIT'] = 'Editar';
t['58'] = 'Mostrar tabla de Jugadores/Aldeas/Oasis ocupados';
t['NEWVILLAGEAV'] = 'Fecha/Hora';
t['TIMEUNTIL'] = 'Tiempo a esperar';
t['61'] = 'Mostrar la tabla "Borrar todo" en la p\u00e1gina de Informes';
t['62'] = 'Mostrar \u00edcono "Enviar IGM" tambi\u00e9n para mi';
t['CENTERMAP'] = 'Centrar mapa sobre esta aldea';
t['13'] = 'Mostrar \u00edcono "Centrar mapa sobre esta aldea"';
t['SENDTROOPS'] = 'Enviar tropas';
t['64'] = 'Mostrar detalles en Inf\u00f3rmes Estad\u00edsticos';
t['7'] = "Palacio/Residencia/Academia/Tesoro";
t['PALACE'] = "Palacio";
t['RESIDENCE'] = "Residencia";
t['ACADEMY'] = "Academia";
t['TREASURY'] = "Tesoro";
t['45'] = "Mostrar nivel parpadeando en los edificios que est\u00e1n siendo ampliados";
t['14'] = "Mostrar \u00edcono 'Enviar tropas/Enviar recursos' en lista de aldeas";
t['36'] = "Mostrar los cálculos de 'Hasta entonces/Excedentes'<br>en las tablas de entrenamiento/mejora";
t['RESIDUE'] = 'Excedentes si construyes ';
t['RESOURCES'] = 'Recursos';
t['34'] = 'Mostrar PC/d\u00EDa en tablas de actualizaci\u00F3n';
t['UPGTB'] = 'Tablas de actualizaci\u00F3n de Recursos y Edificios';
t['35'] = 'Mostrar consumo de cereales en tablas de actualizaci\u00F3n';
t['16'] = 'Mostrar producci\u00F3n efectiva de cereales en lista de aldeas';
t['RBTT'] = 'Barras de Recursos';
t['39'] = "Mostrar tabla 'Barras de Recursos'";
t['40'] = "Mostrar tabla 'Barras de Recursos' como ventana flotante";
t['21'] = "Mostrar 'marcadores' como ventana flotante";
t['23'] = "Mostrar 'hoja de notas' como ventana flotante";
t['17'] = 'Mostrar cantidad de habitantes en lista de aldeas';
t['29'] = 'Analizador de Mapas a ser usado';
t['30'] = 'Mostrar v\u00EDnculo a mapa, para un usuario';
t['31'] = 'Mostrar v\u00EDnculo a mapa, para una alianza';
t['63'] = 'Mostrar Reportes de Batalla mejorados de TB3';
t['18'] = 'Mostrar lista de aldeas adicional (2 columnas) como ventana flotante';
t['60'] = 'Mostrar v\u00EDnculos para abrir mensajes/informes como ventanas emergentes';
t['42'] = 'Ordenar edificios por su nombre en tablas de actualizaci\u00F3n';
t['19'] = 'Mostrar informaci\u00F3n acerca de edificios en construcci\u00F3n y movimiento de tropas<br>en lista de aldeas';
t['32'] = "Mostrar 'Buscador'";
t['3'] = 'Forzar el c\u00E1lculo de capacidad de Legionarios y Falanges seg\u00FAn T3.1<br>(para servidores mixtos T3.1 & T3.5)';
t['33'] = "Mostrar 'Buscador' como ventana flotante";
t['2'] = 'Quitar banners publicitarios';
t['SH1'] = "Abra su Perfil para detectar autom\u00E1ticamente la capital/coordenadas<br>Construya el cuartel para la detecci\u00F3n autom\u00E1tica de la raza y<br>abra entonces el centro de la aldea";
t['46'] = "Mostrar informaci\u00F3n adicional para cada mercader en camino";
t['FINDREP'] = "Buscar el ultimo reporte de";
t['IREPORT1'] = "Ganado sin perdidas";
t['IREPORT2'] = "Ganado con perdidas";
t['IREPORT3'] = "Perdidos en ataque";
t['IREPORT4'] = "Ganado defendiendo sin perdidas";
t['IREPORT5'] = "Ganado defenfiendo con perdidas";
t['IREPORT6'] = "Perdido defendiendo";
t['IREPORT7'] = "Perdido defendiendo sin perdidas";
break;
};
};

var bCost = [[0],//dummy
[//lumberCost gid = 1
[0,0,0,0,0,0],
[40,100,50,60,1,2],
[65,165,85,100,1,3],
[110,280,140,165,2,4],
[185,465,235,280,2,5],
[310,780,390,465,2,6],
[520,1300,650,780,3,8],
[870,2170,1085,1300,4,10],
[1450,3625,1810,2175,4,12],
[2420,6050,3025,3630,5,14],
[4040,10105,5050,6060,6,16],//10
[6750,16870,8435,10125,7,18],
[11270,28175,14090,16905,9,20],
[18820,47055,23525,28230,11,22],
[31430,78580,39290,47150,13,24],
[52490,131230,65615,78740,15,26],
[87660,219155,109575,131490,18,29],
[146395,365985,182995,219590,22,32],
[244480,611195,305600,366715,27,35],
[408280,1020695,510350,612420,32,38],
[681825,1704565,852280,1022740,38,41],//20
[1138650,2846620,1423310,1707970,38,44],
[1901540,4753855,2376925,2852315,38,47],
[3175575,7938935,3969470,4763360,38,50],
[5303210,13258025,6629015,7954815,38,53],
[8856360,22140900,11070450,13284540,38,56]//25
],
[//clayCost gid = 2
[0,0,0,0,0,0],
[80,40,80,50,1,2],
[135,65,135,85,1,3],
[225,110,225,140,2,4],
[375,185,375,235,2,5],
[620,310,620,390,2,6],
[1040,520,1040,650,3,8],
[1735,870,1735,1085,4,10],
[2900,1450,2900,1810,4,12],
[4840,2420,4840,3025,5,14],
[8080,4040,8080,5050,6,16],//10
[13500,6750,13500,8435,7,18],
[22540,11270,22540,14090,9,20],
[37645,18820,37645,23525,11,22],
[62865,31430,62865,39290,13,24],
[104985,52490,104985,65615,15,26],
[175320,87660,175320,109575,18,29],
[292790,146395,292790,182995,22,32],
[488955,244480,488955,305600,27,35],
[816555,408280,816555,510350,32,38],
[1363650,681825,1363650,852280,38,41],//20
[2277295,1138650,2277295,1423310,38,44],
[3803085,1901540,3803085,2376925,38,47],
[6351150,3175575,6351150,3969470,38,50],
[10606420,5303210,10606420,6629015,38,53],
[17712720,8856360,17712720,11070450,38,56]//25
],
[//ironCost gid = 3
[0,0,0,0,0,0],
[100,80,30,60,1,3],
[165,135,50,100,1,5],
[280,225,85,165,2,7],
[465,375,140,280,2,9],
[780,620,235,465,2,11],
[1300,1040,390,780,3,13],
[2170,1735,650,1300,4,15],
[3625,2900,1085,2175,4,17],
[6050,4840,1815,3630,5,19],
[10105,8080,3030,6060,6,21],//10
[16870,13500,5060,10125,7,24],
[28175,22540,8455,16905,9,27],
[47055,37645,14115,28230,11,30],
[78580,62865,23575,47150,13,33],
[131230,104985,39370,78740,15,36],
[219155,175320,65745,131490,18,39],
[365985,292790,109795,219590,22,42],
[611195,488955,183360,366715,27,45],
[1020695,816555,306210,612420,32,48],
[1704565,1363650,511370,1022740,38,51],//20
[2846620,2277295,853985,1707970,38,54],
[4753855,3803085,1426155,2852315,38,57],
[7938935,6351150,2381680,4763360,38,60],
[13258025,10606420,3977410,7954815,38,63],
[22140900,17712720,6642270,13284540,38,66]//25
],
[//cropCost gid = 4
[0,0,0,0,0,0],
[70,90,70,20,1,0],
[115,150,115,35,1,0],
[195,250,195,55,2,0],
[325,420,325,95,2,0],
[545,700,545,155,2,0],
[910,1170,910,260,3,1],
[1520,1950,1520,435,4,2],
[2535,3260,2535,725,4,3],
[4235,5445,4235,1210,5,4],
[7070,9095,7070,2020,6,5],//10
[11810,15185,11810,3375,7,6],
[19725,25360,19725,5635,9,7],
[32940,42350,32940,9410,11,8],
[55005,70720,55005,15715,13,9],
[91860,118105,91860,26245,15,10],
[153405,197240,153405,43830,18,12],
[256190,329385,256190,73195,22,14],
[427835,550075,427835,122240,27,16],
[714485,918625,714485,204140,32,18],
[1193195,1534105,1193195,340915,38,20],//20
[1992635,2561960,1992635,569325,38,22],
[3327700,4278470,3327700,950770,38,24],
[5557255,7145045,5557255,1587785,38,26],
[9280620,11932225,9280620,2651605,38,28],
[15498630,19926810,15498630,4428180,38,30]//25
],
[//sawmillCost gid = 5
[0,0,0,0,0,0],
[520,380,290,90,1,4],
[935,685,520,160,1,6],
[1685,1230,940,290,2,8],
[3035,2215,1690,525,2,10],
[5460,3990,3045,945,2,12]
],
[//brickyardCost gid = 6
[0,0,0,0,0,0],
[440,480,320,50,1,3],
[790,865,575,90,1,5],
[1425,1555,1035,160,2,7],
[2565,2800,1865,290,2,9],
[4620,5040,3360,525,2,11]
],
[//ironFoundryCost gid = 7
[0,0,0,0,0,0],
[200,450,510,120,1,6],
[360,810,920,215,1,9],
[650,1460,1650,390,2,12],
[1165,2625,2975,700,2,15],
[2100,4725,5355,1260,2,18]
],
[//grainMillCost gid = 8
[0,0,0,0,0,0],
[500,440,380,1240,1,3],
[900,790,685,2230,1,5],
[1620,1425,1230,4020,2,7],
[2915,2565,2215,7230,2,9],
[5250,4620,3990,13015,2,11]
],
[//bakeryCost gid = 9
[0,0,0,0,0,0],
[1200,1480,870,1600,1,4],
[2160,2665,1565,2880,1,6],
[3890,4795,2820,5185,2,8],
[7000,8630,5075,9330,2,10],
[12595,15535,9135,16795,2,12]
],
[//warehouseCost gid = 10
[0,0,0,0,0,0],
[130,160,90,40,1,1],
[165,205,115,50,1,2],
[215,260,145,65,2,3],
[275,335,190,85,2,4],
[350,430,240,105,2,5],
[445,550,310,135,3,6],
[570,705,395,175,4,7],
[730,900,505,225,4,8],
[935,1155,650,290,5,9],
[1200,1475,830,370,6,10],//10
[1535,1890,1065,470,7,12],
[1965,2420,1360,605,9,14],
[2515,3095,1740,775,11,16],
[3220,3960,2230,990,13,18],
[4120,5070,2850,1270,15,20],
[5275,6490,3650,1625,18,22],
[6750,8310,4675,2075,22,24],
[8640,10635,5980,2660,27,26],
[11060,13610,7655,3405,32,28],
[14155,17420,9800,4355,38,30]//20
],
[//granaryCost gid = 11
[0,0,0,0,0,0],
[80,100,70,20,1,1],
[100,130,90,25,1,2],
[130,165,115,35,2,3],
[170,210,145,40,2,4],
[215,270,190,55,2,5],
[275,345,240,70,3,6],
[350,440,310,90,4,7],
[450,565,395,115,4,8],
[575,720,505,145,5,9],
[740,920,645,185,6,10],//10
[945,1180,825,235,7,12],
[1210,1510,1060,300,9,14],
[1545,1935,1355,385,11,16],
[1980,2475,1735,495,13,18],
[2535,3170,2220,635,15,20],
[3245,4055,2840,810,18,22],
[4155,5190,3635,1040,22,24],
[5315,6645,4650,1330,27,26],
[6805,8505,5955,1700,32,28],
[8710,10890,7620,2180,38,30]//20
],
[//blacksmithCost gid = 12
[0,0,0,0,0,0],
[170,200,380,130,2,4],
[220,255,485,165,3,6],
[280,330,625,215,3,8],
[355,420,795,275,4,10],
[455,535,1020,350,5,12],
[585,685,1305,445,6,15],
[750,880,1670,570,7,18],
[955,1125,2140,730,9,21],
[1225,1440,2740,935,10,24],
[1570,1845,3505,1200,12,27],//10
[2005,2360,4485,1535,15,30],
[2570,3020,5740,1965,18,33],
[3290,3870,7350,2515,21,36],
[4210,4950,9410,3220,26,39],
[5390,6340,12045,4120,31,42],
[6895,8115,15415,5275,37,46],
[8825,10385,19730,6750,44,50],
[11300,13290,25255,8640,53,54],
[14460,17015,32325,11060,64,58],
[18510,21780,41380,14155,77,62]//20
],
[//armouryCost gid = 13
[0,0,0,0,0,0],
[130,210,410,130,2,4],
[165,270,525,165,3,6],
[215,345,670,215,3,8],
[275,440,860,275,4,10],
[350,565,1100,350,5,12],
[445,720,1410,445,6,15],
[570,925,1805,570,7,18],
[730,1180,2310,730,9,21],
[935,1515,2955,935,10,24],
[1200,1935,3780,1200,12,27],//10
[1535,2480,4840,1535,15,30],
[1965,3175,6195,1965,18,33],
[2515,4060,7930,2515,21,36],
[3220,5200,10150,3220,26,39],
[4120,6655,12995,4120,31,42],
[5275,8520,16630,5275,37,46],
[6750,10905,21290,6750,44,50],
[8640,13955,27250,8640,53,54],
[11060,17865,34880,11060,64,58],
[14155,22865,44645,14155,77,62]//20
],
[//tournamentSquareCost gid = 14
[0,0,0,0,0,0],
[1750,2250,1530,240,1,1],
[2240,2880,1960,305,1,2],
[2865,3685,2505,395,2,3],
[3670,4720,3210,505,2,4],
[4700,6040,4105,645,2,5],
[6015,7730,5255,825,3,6],
[7695,9895,6730,1055,4,7],
[9850,12665,8615,1350,4,8],
[12610,16215,11025,1730,5,9],
[16140,20755,14110,2215,6,10],//10
[20660,26565,18065,2835,7,12],
[26445,34000,23120,3625,9,14],
[33850,43520,29595,4640,11,16],
[43330,55705,37880,5940,13,18],
[55460,71305,48490,7605,15,20],
[70990,91270,62065,9735,18,22],
[90865,116825,79440,12460,22,24],
[116305,149540,101685,15950,27,26],
[148875,191410,130160,20415,32,28],
[190560,245005,166600,26135,38,30]//20
],
[//mainBuildingCost gid = 15
[0,0,0,0,0,0],
[70,40,60,20,2,2],
[90,50,75,25,3,3],
[115,65,100,35,3,4],
[145,85,125,40,4,5],
[190,105,160,55,5,6],
[240,135,205,70,6,8],
[310,175,265,90,7,10],
[395,225,340,115,9,12],
[505,290,430,145,10,14],
[645,370,555,185,12,16],//10
[825,470,710,235,15,18],
[1060,605,905,300,18,20],
[1355,775,1160,385,21,22],
[1735,990,1485,495,26,24],
[2220,1270,1900,635,31,26],
[2840,1625,2435,810,37,29],
[3635,2075,3115,1040,44,32],
[4650,2660,3990,1330,53,35],
[5955,3405,5105,1700,64,38],
[7620,4355,6535,2180,77,41]//20
],
[//rallyPointCost gid = 16
[0,0,0,0,0,0],
[110,160,90,70,1,1],
[140,205,115,90,1,2],
[180,260,145,115,2,3],
[230,335,190,145,2,4],
[295,430,240,190,2,5],
[380,550,310,240,3,6],
[485,705,395,310,4,7],
[620,900,505,395,4,8],
[795,1155,650,505,5,9],
[1015,1475,830,645,6,10],//10
[1300,1890,1065,825,7,12],
[1660,2420,1360,1060,9,14],
[2130,3095,1740,1355,11,16],
[2725,3960,2230,1735,13,18],
[3485,5070,2850,2220,15,20],
[4460,6490,3650,2840,18,22],
[5710,8310,4675,3635,22,24],
[7310,10635,5980,4650,27,26],
[9360,13610,7655,5955,32,28],
[11980,17420,9800,7620,38,30]//20
],
[//marketplaceCost gid = 17
[0,0,0,0,0,0],
[80,70,120,70,4,4],
[100,90,155,90,4,6],
[130,115,195,115,5,8],
[170,145,250,145,6,10],
[215,190,320,190,7,12],
[275,240,410,240,9,15],
[350,310,530,310,11,18],
[450,395,675,395,13,21],
[575,505,865,505,15,24],
[740,645,1105,645,19,27],//10
[945,825,1415,825,22,30],
[1210,1060,1815,1060,27,33],
[1545,1355,2320,1355,32,38],
[1980,1735,2970,1735,39,41],
[2535,2220,3805,2220,46,44],
[3245,2840,4870,2840,55,48],
[4155,3635,6230,3635,67,52],
[5315,4650,7975,4650,80,56],
[6805,5955,10210,5955,96,60],
[8710,7620,13065,7620,115,64]//20
],
[//embassyCost gid = 18
[0,0,0,0,0,0],
[180,130,150,80,5,3],
[230,165,190,100,6,5],
[295,215,245,130,7,7],
[375,275,315,170,8,9],
[485,350,405,215,10,11],
[620,445,515,275,12,13],
[790,570,660,350,14,15],
[1015,730,845,450,17,17],
[1295,935,1080,575,21,19],
[1660,1200,1385,740,25,21],//10
[2125,1535,1770,945,30,24],
[2720,1965,2265,1210,36,27],
[3480,2515,2900,1545,43,30],
[4455,3220,3715,1980,51,33],
[5705,4120,4755,2535,62,36],
[7300,5275,6085,3245,74,39],
[9345,6750,7790,4155,89,42],
[11965,8640,9970,5315,106,45],
[15315,11060,12760,6805,128,48],
[19600,14155,16335,8710,153,51]//20
],
[//barracksCost gid = 19
[0,0,0,0,0,0],
[210,140,260,120,1,4],
[270,180,335,155,1,6],
[345,230,425,195,2,8],
[440,295,545,250,2,10],
[565,375,700,320,2,12],
[720,480,895,410,3,15],
[925,615,1145,530,4,18],
[1180,790,1465,675,4,21],
[1515,1010,1875,865,5,24],
[1935,1290,2400,1105,6,27],//10
[2480,1655,3070,1415,7,30],
[3175,2115,3930,1815,9,33],
[4060,2710,5030,2320,11,36],
[5200,3465,6435,2970,13,39],
[6655,4435,8240,3805,15,42],
[8520,5680,10545,4870,18,46],
[10905,7270,13500,6230,22,50],
[13955,9305,17280,7975,27,54],
[17865,11910,22120,10210,32,58],
[22865,15245,28310,13065,38,62]//20
],
[//stableCost gid = 20
[0,0,0,0,0,0],
[260,140,220,100,2,5],
[335,180,280,130,3,8],
[425,230,360,165,3,11],
[545,295,460,210,4,14],
[700,375,590,270,5,17],
[895,480,755,345,6,20],
[1145,615,970,440,7,23],
[1465,790,1240,565,9,26],
[1875,1010,1585,720,10,29],
[2400,1290,2030,920,12,32],//10
[3070,1655,2595,1180,15,36],
[3930,2115,3325,1510,18,40],
[5030,2710,4255,1935,21,44],
[6435,3465,5445,2475,26,48],
[8240,4435,6970,3170,31,52],
[10545,5680,8925,4055,37,56],
[13500,7270,11425,5190,44,60],
[17280,9305,14620,6645,53,64],
[22120,11910,18715,8505,64,68],
[28310,15245,23955,10890,77,72]//20
],
[//workshopCost gid = 21
[0,0,0,0,0,0],
[460,510,600,320,4,3],
[590,655,770,410,4,5],
[755,835,985,525,5,7],
[965,1070,1260,670,6,9],
[1235,1370,1610,860,7,11],
[1580,1750,2060,1100,9,13],
[2025,2245,2640,1405,11,15],
[2590,2870,3380,1800,13,17],
[3315,3675,4325,2305,15,19],
[4245,4705,5535,2950,19,21],//10
[5430,6020,7085,3780,22,24],
[6950,7705,9065,4835,27,27],
[8900,9865,11605,6190,32,30],
[11390,12625,14855,7925,39,33],
[14580,16165,19015,10140,46,36],
[18660,20690,24340,12980,55,39],
[23885,26480,31155,16615,67,42],
[30570,33895,39875,21270,80,45],
[39130,43385,51040,27225,96,48],
[50090,55535,65335,34845,115,51]//20
],
[//academyCost gid = 22
[0,0,0,0,0,0],
[220,160,90,40,5,4],
[280,205,115,50,6,6],
[360,260,145,65,7,8],
[460,335,190,85,8,10],
[590,430,240,105,10,12],
[755,550,310,135,12,15],
[970,705,395,175,14,18],
[1240,900,505,225,17,21],
[1585,1155,650,290,21,24],
[2030,1475,830,370,25,27],//10
[2595,1890,1065,470,30,30],
[3325,2420,1360,605,36,33],
[4255,3095,1740,775,43,36],
[5445,3960,2230,990,51,39],
[6970,5070,2850,1270,62,42],
[8925,6490,3650,1625,74,46],
[11425,8310,4675,2075,89,50],
[14620,10635,5980,2660,106,54],
[18715,13610,7655,3405,128,58],
[23955,17420,9800,4355,153,62]//20
],
[//crannyCost gid = 23
[0,0,0,0,0,0],
[40,50,30,10,1,0],
[50,65,40,15,1,0],
[65,80,50,15,2,0],
[85,105,65,20,2,0],
[105,135,80,25,2,0],
[135,170,105,35,3,1],
[175,220,130,45,4,2],
[225,280,170,55,4,3],
[290,360,215,70,5,4],
[370,460,275,90,6,5]//10
],
[//townhallCost gid = 24
[0,0,0,0,0,0],
[1250,1110,1260,600,6,4],
[1600,1420,1615,770,7,6],
[2050,1820,2065,985,9,8],
[2620,2330,2640,1260,10,10],
[3355,2980,3380,1610,12,12],
[4295,3815,4330,2060,15,15],
[5500,4880,5540,2640,18,18],
[7035,6250,7095,3380,21,21],
[9005,8000,9080,4325,26,24],
[11530,10240,11620,5535,31,27],//10
[14755,13105,14875,7085,37,30],
[18890,16775,19040,9065,45,33],
[24180,21470,24370,11605,53,36],
[30950,27480,31195,14855,64,39],
[39615,35175,39930,19015,77,42],
[50705,45025,51110,24340,92,46],
[64905,57635,65425,31155,111,50],
[83075,73770,83740,39875,133,54],
[106340,94430,107190,51040,160,58],
[136115,120870,137200,65335,192,62]//20
],
[//residenceCost gid = 25
[0,0,0,0,0,0],
[580,460,350,180,2,1],
[740,590,450,230,3,2],
[950,755,575,295,3,3],
[1215,965,735,375,4,4],
[1555,1235,940,485,5,5],
[1995,1580,1205,620,6,6],
[2550,2025,1540,790,7,7],
[3265,2590,1970,1015,9,8],
[4180,3315,2520,1295,11,9],
[5350,4245,3230,1660,12,10],//10
[6845,5430,4130,2125,15,12],
[8765,6950,5290,2720,18,14],
[11220,8900,6770,3480,21,16],
[14360,11390,8665,4455,26,18],
[18380,14580,11090,5705,31,20],
[23530,18660,14200,7300,37,22],
[30115,23885,18175,9345,44,24],
[38550,30570,23260,11965,53,26],
[49340,39130,29775,15315,64,28],
[63155,50090,38110,19600,77,30]//20
],
[//palaceCost gid = 26
[0,0,0,0,0,0],
[550,800,750,250,6,1],
[705,1025,960,320,7,2],
[900,1310,1230,410,9,3],
[1155,1680,1575,525,10,4],
[1475,2145,2015,670,12,5],
[1890,2750,2575,860,15,6],
[2420,3520,3300,1100,18,7],
[3095,4505,4220,1405,21,8],
[3965,5765,5405,1800,26,9],
[5075,7380,6920,2305,31,10],//10
[6495,9445,8855,2950,37,12],
[8310,12090,11335,3780,45,14],
[10640,15475,14505,4835,53,16],
[13615,19805,18570,6190,64,18],
[17430,25355,23770,7925,77,20],
[22310,32450,30425,10140,92,22],
[28560,41540,38940,12980,111,24],
[36555,53170,49845,16615,133,26],
[46790,68055,63805,21270,160,28],
[59890,87110,81670,27225,192,30]//20
],
[//treasuryCost gid = 27
[0,0,0,0,0,0],
[2880,2740,2580,990,7,4],
[3630,3450,3250,1245,9,6],
[4570,4350,4095,1570,10,8],
[5760,5480,5160,1980,12,10],
[7260,6905,6505,2495,15,12],
[9145,8700,8195,3145,18,15],
[11525,10965,10325,3960,21,18],
[14520,13815,13010,4990,26,21],
[18295,17405,16390,6290,31,24],
[23055,21930,20650,7925,37,27],//10
[29045,27635,26020,9985,45,30],
[36600,34820,32785,12580,53,33],
[46115,43875,41310,15850,64,36],
[58105,55280,52050,19975,77,39],
[73210,69655,65585,25165,92,42],
[92245,87760,82640,31710,111,46],
[116230,110580,104125,39955,133,50],
[146450,139330,131195,50340,160,54],
[184530,175560,165305,63430,192,58],
[232505,221205,208285,79925,230,62]//20
],
[//tradeOfficeCost gid = 28
[0,0,0,0,0,0],
[1400,1330,1200,400,4,3],
[1790,1700,1535,510,4,5],
[2295,2180,1965,655,5,7],
[2935,2790,2515,840,6,9],
[3760,3570,3220,1075,7,11],
[4810,4570,4125,1375,9,13],
[6155,5850,5280,1760,11,15],
[7880,7485,6755,2250,13,17],
[10090,9585,8645,2880,15,19],
[12915,12265,11070,3690,19,21],//10
[16530,15700,14165,4720,22,24],
[21155,20100,18135,6045,27,27],
[27080,25725,23210,7735,32,30],
[34660,32930,29710,9905,39,33],
[44370,42150,38030,12675,46,36],
[56790,53950,48680,16225,55,39],
[72690,69060,62310,20770,67,42],
[93045,88395,79755,26585,80,45],
[119100,113145,102085,34030,96,48],
[152445,144825,130670,43555,115,51]//20
],
[//greatBarrackCost gid = 29
[0,0,0,0,0,0],
[630,420,780,360,1,4],
[805,540,1000,460,1,6],
[1030,690,1280,590,2,8],
[1320,880,1635,755,2,10],
[1690,1125,2095,965,2,12],
[2165,1445,2680,1235,3,15],
[2770,1845,3430,1585,4,18],
[3545,2365,4390,2025,4,21],
[4540,3025,5620,2595,5,24],
[5810,3875,7195,3320,6,27],//10
[7440,4960,9210,4250,7,30],
[9520,6345,11785,5440,9,33],
[12185,8125,15085,6965,11,36],
[15600,10400,19310,8915,13,39],
[19965,13310,24720,11410,15,42],
[25555,17035,31640,14605,18,46],
[32710,21810,40500,18690,22,50],
[41870,27915,51840,23925,27,54],
[53595,35730,66355,30625,32,58],
[68600,45735,84935,39200,38,62]//20
],
[//greatStableCost gid = 30
[0,0,0,0,0,0],
[780,420,660,300,2,5],
[1000,540,845,385,3,8],
[1280,690,1080,490,3,11],
[1635,880,1385,630,4,14],
[2095,1125,1770,805,5,17],
[2680,1445,2270,1030,6,20],
[3430,1845,2905,1320,7,23],
[4390,2365,3715,1690,9,26],
[5620,3025,4755,2160,10,29],
[7195,3875,6085,2765,12,32],//10
[9210,4960,7790,3540,15,36],
[11785,6345,9975,4535,18,40],
[15085,8125,12765,5805,21,44],
[19310,10400,16340,7430,26,48],
[24720,13310,20915,9505,31,52],
[31640,17035,26775,12170,37,56],
[40500,21810,34270,15575,44,60],
[51840,27915,43865,19940,53,64],
[66355,35730,56145,25520,64,68],
[84935,45735,71870,32665,77,72]//20
],
[//citywallCost gid = 31
[0,0,0,0,0,0],
[70,90,170,70,1,0],
[90,115,220,90,1,0],
[115,145,280,115,2,0],
[145,190,355,145,2,0],
[190,240,455,190,2,0],
[240,310,585,240,3,1],
[310,395,750,310,4,2],
[395,505,955,395,4,3],
[505,650,1225,505,5,4],
[645,830,1570,645,6,5],//10
[825,1065,2005,825,7,6],
[1060,1360,2570,1060,9,7],
[1355,1740,3290,1355,11,8],
[1735,2230,4210,1735,13,9],
[2220,2850,5390,2220,15,10],
[2840,3650,6895,2840,18,12],
[3635,4675,8825,3635,22,14],
[4650,5980,11300,4650,27,16],
[5955,7655,14460,5955,32,18],
[7620,9800,18510,7620,38,20]//20
],
[//earthwallCost gid = 32
[0,0,0,0,0,0],
[120,200,0,80,1,0],
[155,255,0,100,1,0],
[195,330,0,130,2,0],
[250,420,0,170,2,0],
[320,535,0,215,2,0],
[410,685,0,275,3,1],
[530,880,0,350,4,2],
[675,1125,0,450,4,3],
[865,1440,0,575,5,4],
[1105,1845,0,740,6,5],//10
[1415,2360,0,945,7,6],
[1815,3020,0,1210,9,7],
[2320,3870,0,1545,11,8],
[2970,4950,0,1980,13,9],
[3805,6340,0,2535,15,10],
[4870,8115,0,3245,18,12],
[6230,10385,0,4155,22,14],
[7975,13290,0,5315,27,16],
[10210,17015,0,6805,32,18],
[13065,21780,0,8710,38,20]//20
],
[//palisadeCost gid = 33
[0,0,0,0,0,0],
[160,100,80,60,1,0],
[205,130,100,75,1,0],
[260,165,130,100,2,0],
[335,210,170,125,2,0],
[430,270,215,160,2,0],
[550,345,275,205,3,1],
[705,440,350,265,4,2],
[900,565,450,340,4,3],
[1155,720,575,430,5,4],
[1475,920,740,555,6,5],//10
[1890,1180,945,710,7,6],
[2420,1510,1210,905,9,7],
[3095,1935,1545,1160,11,8],
[3960,2475,1980,1485,13,9],
[5070,3170,2535,1900,15,10],
[6490,4055,3245,2435,18,12],
[8310,5190,4155,3115,22,14],
[10635,6645,5315,3990,27,16],
[13610,8505,6805,5105,32,18],
[17420,10890,8710,6535,38,20]//20
],
[//stonemasonCost gid = 34
[0,0,0,0,0,0],
[155,130,125,70,1,2],
[200,165,160,90,1,3],
[255,215,205,115,2,4],
[325,275,260,145,2,5],
[415,350,335,190,2,6],
[535,445,430,240,3,8],
[680,570,550,310,4,10],
[875,730,705,395,4,12],
[1115,935,900,505,5,14],
[1430,1200,1155,645,6,16],//10
[1830,1535,1475,825,7,18],
[2340,1965,1890,1060,9,20],
[3000,2515,2420,1355,11,22],
[3840,3220,3095,1735,13,24],
[4910,4120,3960,2220,15,26],
[6290,5275,5070,2840,18,29],
[8050,6750,6490,3635,22,32],
[10300,8640,8310,4650,27,35],
[13185,11060,10635,5955,32,38],
[16880,14155,13610,7620,38,41]//20
],
[//breweryCost gid = 35
[0,0,0,0,0,0],
[1460,930,1250,1740,5,6],
[2045,1300,1750,2435,6,9],
[2860,1825,2450,3410,7,12],
[4005,2550,3430,4775,8,15],
[5610,3575,4800,6685,10,18],
[7850,5000,6725,9360,12,22],
[10995,7000,9410,13100,14,26],
[15390,9805,13175,18340,17,30],
[21545,13725,18445,25680,21,34],
[30165,19215,25825,35950,25,38]//10
],
[//trapperCost gid = 36
[0,0,0,0,0,0],
[100,100,100,100,1,4],
[130,130,130,130,1,6],
[165,165,165,165,2,8],
[210,210,210,210,2,10],
[270,270,270,270,2,12],
[345,345,345,345,3,15],
[440,440,440,440,4,18],
[565,565,565,565,4,21],
[720,720,720,720,5,24],
[920,920,920,920,6,27],//10
[1180,1180,1180,1180,7,30],
[1510,1510,1510,1510,9,33],
[1935,1935,1935,1935,11,36],
[2475,2475,2475,2475,13,39],
[3170,3170,3170,3170,15,42],
[4055,4055,4055,4055,18,46],
[5190,5190,5190,5190,22,50],
[6645,6645,6645,6645,27,54],
[8505,8505,8505,8505,32,58],
[10890,10890,10890,10890,38,62]//20
],
[//herosMansionCost gid = 37
[0,0,0,0,0,0],
[700,670,700,240,1,2],
[930,890,930,320,1,3],
[1240,1185,1240,425,2,4],
[1645,1575,1645,565,2,5],
[2190,2095,2190,750,2,6],
[2915,2790,2915,1000,3,8],
[3875,3710,3875,1330,4,10],
[5155,4930,5155,1765,4,12],
[6855,6560,6855,2350,5,14],
[9115,8725,9115,3125,6,16],//10
[12125,11605,12125,4155,7,18],
[16125,15435,16125,5530,9,20],
[21445,20525,21445,7350,11,22],
[28520,27300,28520,9780,13,24],
[37935,36310,37935,13005,15,24],
[50450,48290,50450,17300,18,27],
[67100,64225,67100,23005,22,30],
[89245,85420,89245,30600,27,33],
[118695,113605,118695,40695,32,36],
[157865,151095,157865,54125,37,39]//20
],
[//greatWarehouseCost gid = 38
[0,0,0,0,0,0,0],
[650,800,450,200,1,1],
[830,1025,575,255,1,2],
[1065,1310,735,330,2,3],
[1365,1680,945,420,2,4],
[1745,2145,1210,535,2,5],
[2235,2750,1545,685,3,6],
[2860,3520,1980,880,4,7],
[3660,4505,2535,1125,4,8],
[4685,5765,3245,1440,5,9],
[5995,7380,4150,1845,6,10],//10
[7675,9445,5315,2360,7,12],
[9825,12090,6800,3020,9,14],
[12575,15475,8705,3870,11,16],
[16095,19805,11140,4950,13,18],
[20600,25355,14260,6340,15,20],
[26365,32450,18255,8115,18,22],
[33750,41540,23365,10385,22,24],
[43200,53170,29910,13290,27,26],
[55295,68055,38280,17015,32,28],
[70780,87110,49000,21780,38,30]//20
],
[//greatGranaryCost gid = 39
[0,0,0,0,0,0],
[400,500,350,100,1],
[510,640,450,130,1,2],
[655,820,575,165,2,3],
[840,1050,735,210,2,4],
[1075,1340,940,270,2,5],
[1375,1720,1205,345,3,6],
[1760,2200,1540,440,4,7],
[2250,2815,1970,565,4,8],
[2880,3605,2520,720,5,9],
[3690,4610,3230,920,6,10],//10
[4720,5905,4130,1180,7,12],
[6045,7555,5290,1510,9,14],
[7735,9670,6770,1935,11,16],
[9905,12380,8665,2475,13,18],
[12675,15845,11090,3170,15,20],
[16225,20280,14200,4055,18,22],
[20770,25960,18175,5190,22,24],
[26585,33230,23260,6645,27,26],
[34030,42535,29775,8505,32,28],
[43555,54445,38110,10890,38,30]//20
],
[//WWCost gid = 40
[0,0,0,0,0,0],
[66700,69050,72200,13200,0,1],
[68535,70950,74185,13565,0,2],
[70420,72900,76225,13935,0,3],
[72355,74905,78320,14320,0,4],
[74345,76965,80475,14715,0,5],
[76390,79080,82690,15120,0,6],
[78490,81255,84965,15535,0,7],
[80650,83490,87300,15960,0,8],
[82865,85785,89700,16400,0,9],
[85145,88145,92165,16850,0,10],//10
[87485,90570,94700,17315,0,12],
[89895,93060,97305,17790,0,14],
[92365,95620,99980,18280,0,16],
[94905,98250,102730,18780,0,18],
[97515,100950,105555,19300,0,20],
[100195,103725,108460,19830,0,22],
[102950,106580,111440,20375,0,24],
[105785,109510,114505,20935,0,26],
[108690,112520,117655,21510,0,28],
[111680,115615,120890,22100,0,30],//20
[114755,118795,124215,22710,0,33],
[117910,122060,127630,23335,0,36],
[121150,125420,131140,23975,0,39],
[124480,128870,134745,24635,0,42],
[127905,132410,138455,25315,0,45],
[131425,136055,142260,26010,0,48],
[135035,139795,146170,26725,0,51],
[138750,143640,150190,27460,0,54],
[142565,147590,154320,28215,0,57],
[146485,151650,158565,28990,0,60],//30
[150515,155820,162925,29785,0,64],
[154655,160105,167405,30605,0,68],
[158910,164505,172010,31450,0,72],
[163275,169030,176740,32315,0,76],
[167770,173680,181600,33200,0,80],
[172380,178455,186595,34115,0,84],
[177120,183360,191725,35055,0,88],
[181995,188405,197000,36015,0,92],
[186995,193585,202415,37005,0,96],
[192140,198910,207985,38025,0,100],//40
[197425,204380,213705,39070,0,105],
[202855,210000,219580,40145,0,110],
[208430,215775,225620,41250,0,115],
[214165,221710,231825,42385,0,120],
[220055,227805,238200,43550,0,125],
[226105,234070,244750,44745,0,130],
[232320,240505,251480,45975,0,135],
[238710,247120,258395,47240,0,140],
[245275,253915,265500,48540,0,145],
[252020,260900,272800,49875,0,150],//50
[258950,268075,280305,51245,0,156],
[266070,275445,288010,52655,0,162],
[273390,283020,295930,54105,0,168],
[280905,290805,304070,55590,0,174],
[288630,298800,312430,57120,0,180],
[296570,307020,321025,58690,0,186],
[304725,315460,329850,60305,0,192],
[313105,324135,338925,61965,0,198],
[321715,333050,348245,63670,0,204],
[330565,342210,357820,65420,0,210],//60
[339655,351620,367660,67220,0,217],
[348995,361290,377770,69065,0,224],
[358590,371225,388160,70965,0,231],
[368450,381435,398835,72915,0,238],
[378585,391925,409800,74920,0,245],
[388995,402700,421070,76985,0,252],
[399695,413775,432650,79100,0,259],
[410685,425155,444550,81275,0,266],
[421980,436845,456775,83510,0,273],
[433585,448860,469335,85805,0,280],//70
[445505,461205,482240,88165,0,288],
[457760,473885,495505,90590,0,296],
[470345,486920,509130,93080,0,304],
[483280,500310,523130,95640,0,312],
[496570,514065,537520,98270,0,320],
[510225,528205,552300,100975,0,328],
[524260,542730,567490,103750,0,336],
[538675,557655,583095,106605,0,344],
[553490,572990,599130,109535,0,352],
[568710,588745,615605,112550,0,360],//80
[584350,604935,632535,115645,0,369],
[600420,621575,649930,118825,0,378],
[616930,638665,667800,122090,0,387],
[633895,656230,686165,125450,0,396],
[651330,674275,705035,128900,0,405],
[669240,692820,724425,132445,0,414],
[687645,711870,744345,136085,0,423],
[706555,731445,764815,139830,0,432],
[725985,751560,785850,143675,0,441],
[745950,772230,807460,147625,0,450],//90
[766460,793465,829665,151685,0,460],
[787540,815285,852480,155855,0,470],
[809195,837705,875920,160140,0,480],
[831450,860745,900010,164545,0,490],
[854315,884415,924760,169070,0,500],
[877810,908735,950190,173720,0,510],
[901950,933725,976320,178495,0,520],
[926750,959405,1000000,183405,0,530],
[952235,985785,1000000,188450,0,540],
[1000000,1000000,1000000,193630,0,550]//100
],
[//horsedtCost gid = 41
[0,0,0,0,0,0],
[780,420,660,540,4,5],
[1000,540,845,690,4,8],
[1280,690,1080,885,5,11],
[1635,880,1385,1130,6,14],
[2095,1125,1770,1450,7,17],
[2680,1445,2270,1855,9,20],
[3430,1845,2905,2375,11,23],
[4390,2365,3715,3040,13,26],
[5620,3025,4755,3890,15,29],
[7195,3875,6085,4980,19,31],//10
[9210,4960,7790,6375,22,35],
[11785,6345,9975,8160,27,39],
[15085,8125,12765,10445,32,43],
[19310,10400,16340,13370,39,47],
[24720,13310,20915,17115,46,51],
[31640,17035,26775,21905,55,55],
[40500,21810,34270,28040,67,59],
[51840,27915,43865,35890,80,63],
[66355,35730,56145,45940,96,67],
[84935,45735,71870,58800,115,71]//20
]
];

//Training cost for each unit (4), load capacity (1), attack power (1), def power infantery (1), def power cavalery (1), speed (1) - for normal servers, crop consumption(1)
var uc = new Array();
//Romans
uc[1] = [120,100,150,30,50,40,35,50,6,1];//Legionnaire
uc[2] = [100,130,160,70,20,30,65,35,5,1];//Praetorian
uc[3] = [150,160,210,80,50,70,40,25,7,1];//Imperian
uc[4] = [140,160,20,40,0,0,20,10,16,2];//Equites legati
uc[5] = [550,440,320,100,100,120,65,50,14,3];//Equites imperatoris
uc[6] = [550,640,800,180,70,180,80,105,10,4];//Equites cesaris
uc[7] = [900,360,500,70,0,60,30,75,4,3];//Battering ram
uc[8] = [950,1350,600,90,0,75,60,10,3,6];//Fire catapult
uc[9] = [30750,27200,45000,37500,0,50,40,30,4,5];//Senator
uc[10] = [5800,5300,7200,5500,3000,0,80,80,5,1];//Settler
//Teutons
uc[11] = [95,75,40,40,60,40,20,5,7,1];//Club swinger
uc[12] = [145,70,85,40,40,10,35,60,7,1];//Spearman
uc[13] = [130,120,170,70,50,60,30,30,6,1];//Axeman
uc[14] = [160,100,50,50,0,0,10,5,9,1];//Scout
uc[15] = [370,270,290,75,110,55,100,40,10,2];//Paladin
uc[16] = [450,515,480,80,80,150,50,75,9,3];//Teutonic knight
uc[17] = [1000,300,350,70,0,65,30,80,4,3];//Ram
uc[18] = [900,1200,600,60,0,50,60,10,3,6];//Catapult
uc[19] = [35500,26600,25000,27200,0,40,60,40,4,4];//Chief
uc[20] = [7200,5500,5800,6500,3000,10,80,80,5,1];//Settler
//Gauls
uc[21] = [100,130,55,30,35,15,40,50,7,1];//Phalanx
uc[22] = [140,150,185,60,45,65,35,20,6,1];//Swordsman
uc[23] = [170,150,20,40,0,0,20,10,17,2];//Pathfinder
uc[24] = [350,450,230,60,75,90,25,40,19,2];//Theutates thunder
uc[25] = [360,330,280,120,35,45,115,55,16,2];//Druidrider
uc[26] = [500,620,675,170,65,140,50,165,13,3];//Haeduan
uc[27] = [950,555,330,75,0,50,30,105,4,3];//Ram
uc[28] = [960,1450,630,90,0,70,45,10,3,6];//Trebuchet
uc[29] = [30750,45400,31000,37500,0,40,50,50,5,4];//Chieftain
uc[30] = [5500,7000,5300,4900,3000,0,80,80,5,1];//Settler
//Nature
uc[31] = [0,0,0,0,0,10,25,20,0,1];//Rat
uc[32] = [0,0,0,0,0,20,35,40,0,1];//Spider
uc[33] = [0,0,0,0,0,60,40,60,0,1];//Snake
uc[34] = [0,0,0,0,0,80,66,50,0,1];//Bat
uc[35] = [0,0,0,0,0,50,70,33,0,2];//Wild boar
uc[36] = [0,0,0,0,0,100,80,70,0,2];//Wolf
uc[37] = [0,0,0,0,0,250,140,200,0,3];//Bear
uc[38] = [0,0,0,0,0,450,380,240,0,3];//Crocodile
uc[39] = [0,0,0,0,0,200,170,250,0,3];//Tiger
uc[40] = [0,0,0,0,0,600,440,520,0,5];//Elephant
//Natarian - fr3nchlover
uc[41] = [0,0,0,0,0,20,35,50,0,1];//Pikeman
uc[42] = [0,0,0,0,0,65,30,10,0,1];//Thorned warrior
uc[43] = [0,0,0,0,0,100,90,75,0,1];//Guardsman
uc[44] = [0,0,0,0,0,0,10,0,0,1];//Birds of prey
uc[45] = [0,0,0,0,0,155,80,50,0,2];//Axerider
uc[46] = [0,0,0,0,0,170,140,80,0,3];//Natarian knight
uc[47] = [0,0,0,0,0,250,120,150,0,6];//Warelephant
uc[48] = [0,0,0,0,0,60,45,10,0,5];//Ballista
uc[49] = [0,0,0,0,0,80,50,50,0,0];//Natarian emperor
uc[50] = [0,0,0,0,0,30,40,40,0,0];//Settler
uc[98] = [20,30,10,20,0,0,0,0,0,0];//trap
uc[99] = [20,30,10,20,0,0,0,0,0,0];//trap

var imP = 'data:image/gif;base64,';
var imPNG = 'data:image/png;base64,';
//base64 coded images
var image = {
"igm":			imP + 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==',
"imgo":		imP + 'R0lGODlhCwAPAPcAAEBAQAAm/4CAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACwAPAAAIRwAHABhIkOAAgQcTHgSwcECAhw8RSlQokSHEiAwnKsxo8SLCgRQXAhAgwKFHkiVLKkypUuWAljBRHiT5kiJLlysFjETJU2dAADs=',
"underline":	imP + 'R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=',
"globe":		imP + 'R0lGODlhDAANAPcAAAAAAAVrEwB0CgB4DQB7DQByHwplPQF+MRZlNxJwOQdcRAZYagRkTwFuTRhiUAFjditgawM/pQBHmxVHlx9UgwFApwNGqABGrQJJrwBQtQBUuwBevBJCpxREqRdFqxdWsgFrpQB1tAF4uitcgShOtCJXtjdXpDddvjhXuDtdvTxltQBcwgBrzQFuzQ1oxxxsxRV41EFdiUdemkRerVxsk1lsmkZxvgGCNiSoLDSxLgGGQQGETAGJWQyTcB6beD6NdSWkfky/LEK3RljFNWfNRWzPQ2LKU2/QVHTTan7YdQGAjQiHjw2Xgx6KnQKIoQiEohyilTazjQGJyQKD3AaS2AGG7QmY5BKe+xehxzSd6DCw+meBkHqJmHKQmHaIqnmGo06Qz0mj3kq+/nam2nbNrGfL13rU1JyisqOotKistqW6va6yuYir1pWnwY3YkIjcq4LStZDhkZPhpJ3mpJzlrqTpoqTjtpvV0p3K66rL0qHZ0KLH5qfjzabow7XwxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAA0AAAifAP8J/McHDpk7AwfaeSMnyRAgWfAMdINkjh86RqBMaZLnnx4hReLU6VMGi5MDP/6F8RGEyBEzYqzwIJBADYwnOHJE0XJFyo0CBrq4aLGkBxMqVZQMCOBgy4sVLETo2BECBAMEELiAwaBhQwMBDzJYGBEDzZ4PFS4sUCAhAgcTNASOKdGBwgQPJFDIWDOQjQ0VJ1LMqJEmocA2Xr6cSRgQADs=',
"usethempr":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAntJREFUSEuVlU1ME1EQx1dOHD169OjRo0eP3rTGLV5Mjdui3lCaQEy01bAtfiDRlIgEwbYkxBAwVVGCgZqI8WsNcjBNlYMJoYRaWNq1ZVtWVv6bvGa7fbv7mOSlzb7Z/29m3szbA5yLtQnR43DZbeGMXztr2eXeYa9VUz/F4zdVN92G/ZO+0MGuWyNjiYm5yvLvnIyluxjxm3z1Yfua+HSa9905xAQ9I0ROTL5YyGvav5obxGn/9ZxUuHClP+AI7RZHn6ys5l2zYQ2kIJe2eu6Pp6jQQOeDc+t5eZNVjNWvXFH/Xu4aCDdAUe+Xs1/W7ERyuZwuSZKezWapLtjDsrOPUmbjdLt4pA4N3x2b0TSNemapVEoXBMEQFEVRDwaDTboej0dHUE52e2Bi0QD6fKFWdJadM8TMZhUnwbiVeGZeUtH9HObMqe2tQGRJyheLxXQsFgPDmGneHz1fLJUVpwwJQFEUnQSAZ7Ty2umo1Zrq9Uc69oCRS3udVHaKEsJYKB8axwzGe25NA58dTdvhBbGbw6Dvd/aQJcBoFPxPp9N6MpmsZ08Lfm1d3vK2i6c4jMT8+++OGZoFkCnEYcjY3J14TvasUDDq113f4FSG5eDJiBBfa0OR0aFpDSXe/KnPIe/vOfpt6VfBCQoxKwDZmLvUmjHRw5Hh6Bpum6uh4XuVbZXarTgvwGjlAhAgLFTAavgI3OhNTDXdp7gA+oeeL1WrNdtLgKXsZh/A4s/eZoyBpxmgndcfP8z8XJH3K271RxmRmS3MHIDX33vs0ej06sLnHwramRW+sVkqfl3MFkfGZ4tNZ8byNW67GD2M2eED0TDL8gbEsw1fBQrkP6+jTExmIuLUAAAAAElFTkSuQmCC',
"usethemeq":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAflJREFUSEtjZCAAwpPbHUBK/jExgGlcgOkfwwGQHMefHycWLmz8QchcFHn/+HqB8qZ5Sxat3vvtzoNn70H4PwEAU7d2y9HvVa0LtobGd0kQZWlIcpvH2k1HXv358/cXIUvwyW/be+ZNUmF/Kl5LK1rnz3389BVB3xDrkDfvP31o6Vu+EaulqcUTY1++ev+OWMOIVff1248vmeVTG1AsBYX35l2nnhNrCKnqjp+5/jYorVUDbmlD95Idf/78oSjOCDmic+rq82AL4+PrOUApi5AGSuV37DvzA5T6GUD5jJhkP2XKlP9nzpzBijdu3Pj/5s2beN0EsgOcp0NT2hM+fvr6mZAPAgMD/9vY2ODEIMfgAz9+/voRltJWALSwLQOYkr4SsvDzZ4JuwmvE7z9/focmt1YwgDI6MXmP0iB9/vL9h7C01gAGUJbYd/gCQR9SGqQgO+DFXe+MdddpHaSzFm1/Dc+HoSktBmcv3n5DyFJy5UFRBoo6lNKmqH5Oz7fvPyhLGVhcBKoE6joWrcMoT0EFQP+s9Rd//vxFtUIAZNnClbuvgzM8NgCytLh25qTrtx5TXGOAghHkM5yWITsgLKXDYvr8rU+PnLz6GZSciY27t+8+fTx9/ubHect3fcSIM2Jq4/D0dgVQ3glNbW8gBoeltkag1ApYLAEAIKtp4+xd+jMAAAAASUVORK5CYII=',
"usethem1h":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAA8FJREFUSEudlUtsG2UQx01PPXLkyJEjR46coPQCQjjlgoJIUtITLRWkQoIEVCflWYFUAVEfJKpUoZICgUBUlAqJIkobmkdBVuq68Wu9tnfX6/V6n971n5kPOfL60USMtLI8+3l+8/jP54diu9ihkZkn+UhrX0x8DrJ9rdiv/G5/4N6Ym3vX3S1u5P2zw5MPT7x3/uL85RX7Xqao84NdrH1u4cffnbcSXy3Fhz94ZE/QF0amDywsXq8EQeh3Mnzfh240IFd05IsaspKKgqyhrNbQsBy0WmEkpZ9WVtVXjp0eeyD0ROLCubxEETssDANUdR3ZfAkFqYJyWYWqaNAUFUpFRVGuIEPvJPq0bTsCVfV67eQnl77vCx07/ulL5Ype7fxFMwgooILtrARN0+HZFkLXRmA16DHFZ+jY5Lchl1SktyXqghmBWrbbODJxZioC5X7/cPWm3Hmy1QIUzaDsZXiOg3q9TnAZDaOGgMBNhhLMNk2Uya8pClRKKp2lM9TiTvtjNak9fzjx2A506sOLy0EQRGbmek1kCxXU9BpavicC5wsScvkCfAK2PBeuZWErlcbt9Q1oqgoaJM1XodmqCDnjDnv/zOU1ARwentzPyuoWoWE6YjauWUeTAFyN2yDRyGWRhGs7oqJCsQSTkmmLpkotvU9V+n4zEnL52qrL6o/xnvWTvW5YAugxkNonoK6DkKrNFSvYTKZQNxs9y1IzLaQzNIYuIDPETsdHZ1426qSALmvYHrZzJZqZge8WvgE1A/dTdxE2faFGnapkXzabjfyypFSRKZRBaxXxu57vDo1OHyXg9DgpyeoGBmEIqVTFa0ePIXnnjgi+nb6HkJTLs2LrBtqOR6Ipgtahp3JSfDM+kjgR40Xv3r32advxhXBk2r3/gmcigdi3uLiI8fFxPHPwIJaWVyhJDZxst8llvTZ0OPFcjFfi2m/rPRXuQF1f3CgcfH3zb9iOC78ZUMsC4XvjzQlKSMPsuTk89fSBnla24zBj57r7+IsryZ6UOhycMQe/dXtTyD5HN05OUoTvxs01VOh629pKie+DbHb+Z2VnD+OjJx//ayNFizTY+gmk08fiGQTkkfHoIrfN65NnP6J29ai1ncL/BfKfwDun5q/03Kd8AZye/XbD8/zIJcCg7qe9CrtVyLC5r39JioXvZww9/vaXnyXv5vUHtXcv77iNXNlAWGcCQ6Onnvj8wpJ0/c9/TJbzXgB8RqvWjVtrW8b5S1eNnpn1LbHLeejVmUd5d+JjM1N7eYbGEi9G/hX6QP4F7nAoMfND3esAAAAASUVORK5CYII=',
"bDel":		imP + 'R0lGODlhLQAUAPcAAAAAAHHQAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8i4tNanodqxqNqxqtqxrOC+ucrKyszMzM/Pz9PFw9LS0tnS0NjY2Nra2tzc3OTKxebQyujSzuPd2+Pe3enV0ODg4OLi4uTk5OXm5Obm5ufn5+ro5+jo6Onp6evr6+zs7O7t7e7v7e/v7/Hk4fHx8fPy8fPz8/T09PX19fb29vf29/n08vj4+Pn5+fr6+vz8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAtABQAAAj/AP8J/BegoMGDCBMqXBhg4MCCriJKnEixosWLrgo+xMhx4h86eBh1jMiqIcGRrvzEkZPn1MQ+KKi40YLSVMMArXLq3LnTC5k0Y+B8yhmIAQs2bbLwXNqKVSlOBZuymkq16tQLU7CYOdMFUiMIJ9CsAWPHqtmppCwVZLWqrdu3bvlU2GHlCpYvFEpIURMmhCm4gNuOmlSwrarDiBMjPlQgRZQqVpgkKSPGAyfFmBGDklRQVSpUoEOLFn2JQ4MlUB5byfBotGvRniIV/Gyqtu3buE0NEEDEyZMmIHILtx27IKpSpJIrX858joEDQo4gUVLkDfPryzfJDmBqlKjv4MOH2r+jgEQOHzhUBDEyZIv49+A1KSpIShSo+/jz4we0oMQMGzF8sIEDOvwABAb6JXhfJokUNAoonkQo4YQRLnKDCS3IAEMHnIQyAgI05DABhSRGiAkiBYHSySYstugii1zw0IILL1jgSIt7aBCBCC/2uIkmkxhSECeaZGLkkUga2UMNK6wgQSFJRimlkZMgIiRBmFRCSSVcdullHQQ8kIAeXnaJZJldUhJJIoSYFEAkisQp55x01mnnnVYOMohJBAVgCCF6Biqonn8OauihegoiiEYO9cnQo5Ai5FBAADs=',
"bSave":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC4AAAAUCAMAAADFhv/OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAIDBAMDBgMDhwMEBAQDhwUFBQUFhwUGBwEDigMDigIECgIEiwMECgMEiwMFCwQDiAQECAQEiQUEiQQECgQEiwUFCgUFCwUFiwYFiwYGiAaWqOYHiAcHiQQFDAUFjAUGDAYGDAYGjAYGDQYGjQcGjQcHDQcHjQcHjgcdAAcICQgHjQgHjggIDggIjwkIjgkIjwkJDgkJDwkJD/oJjgoJj/sLjAoKDwoKD/oKjwsKjwsKj/sLDwsLD/sLjwsLj/wLj/ysrKzMzMz8/PwMDQwMjQ0tLS2NjY2tra3NzcwMjgwMD/wNDg0Njw0ODw4ODg4uLi5OTk5ebk5ubm5+fn6Ojo6enp6+vr7Ozs7e3t7u/t7+/v4ODw4Ojw8PDw8fHx8/Pz9PT09fX19vb29/f38Pj/+Pj4+fn5+vr6/Pz8/f39/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfr7zJgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAFpSURBVDhPlZNrUwFRGIBVJGldFosuNsVqY4mEaimUS5uE3JLWPbb+/1e9i+qcaZrR8+3M88x75sycVzEF2KWQS4UcfywFy8r5kjFMlNjfeSLB8xfRcDAY4LweBrt2ADn7jsMLp4tmSNvtqJP6TRZyCYMXTub58NWxasNU7wlyaYJxLnCLuq33UZjqliCfTMYoUeFoPrtd0DEUpsRHyMdvI5SwIL9Pru+1LgpTrSLkb6MBSlBwLeo7jdOEqVk+6vdQAtdXh/u0Q6/Tapw0iamGnA+6HRQuHo+F/JyPcTtpK4mpeh7yXkdE8V7GQmpgY5u2WoyYquUg74otFA/MViuUhYddi8VsxFQ1C7n43EBhzvycWrn30j4mzIQBNfVSBvJmvYbiDnFbK5HIze06QWyqUFPKQj5lq5Vy5YedAxtFUSaSNBoMqrXKtysXc+nZjyzm/wI12UwqJeewHpl0CgE/fYlkcr4e/1q+T12HLuCJR4bvAAAAAElFTkSuQmCC',
"bOK":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC8AAAAWCAYAAABQUsXJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAgVJREFUWEfdl0urQVEUx93Bnd4PcL/lnXlMFMmAiZGUx4SBlDLwKJFHXhERoSiSkMhAKWld/1Vnd06329U+k3PuqT/rbNZev7VaZ7WPxfKfrq+BhYyqX+usAJOBLxXjm0gEi4/HwzQCrwb+fr+TWSTgYdxuN9OJE8DH9XrVrcvlQtvtls7ns+69XuER8Agsq8PhQLFYjGw2G1mtVlY4HKbNZsN7DodDXut0Ony/2+3I5/ORw+GgwWAgHVfAn04nkpUCns/naTabUbPZJJfLRX6/n47HIwMCvtVq0X6/p0AgwIkiGdmY8BPwqJ6MVqsVgyUSCY1/vV4XwL1ej22sBYNBYcvEU/sIePSqjLrdLsOUy2WN/3w+5/VMJsMVhu3xePjb6XTScrmUiqdmFPDr9Zpk1G63GahYLGr8J5MJr6fTaW4j5VmIx+Nso9Vk4ql9BPxisSAZjcdj7t9oNKrxLxQKDFkqlahWq7GdSqX4P6FQiO8rlYpUTIVTwE+nU5JVJBJhmGQyyVXO5XLcGl6vl5AcWgq/IyHEQKth0rjdbhqNRtJxBTw2kRWmCRKw2+2iPTBRMF2wJ1oK8NlsVsRQt49sXAHf7/dJr1BRTBQ8oHr3esVfwCOg2cTwzxPwO4xGo2Ea/ThVVqtVMos08M/qfygHfUwHo0ph/PONyoivgs8if/6bV+5vVrsE+rT9pU4AAAAASUVORK5CYII=',
"bClose":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABMZJREFUSEu1lXtQlFUYxg+jIIXoBMw04vpH2i6sOoIkDgTeYBAFC2uhsBKScNcJqqGRSwiKEitXEa8tStSMOYOQkaloIFPCtGDo4AUQBANUZIGNm6i7sDy956yidvurvtlnzvu9531+z5z9vtm12BXoBVuryczG0oqNjBrFOtVqErOxsmTTabW1tmTiAn1gIQpYgJnGLdj4OJjRNMYM4+PswZiJ3Tea2LBxlN0zjhFjsljvEZPFrvTG6OgoxsbGJlZe/1cK91sBlrTKG0MXtejS5EB/rBD9pCHSSMmXeFBSCMO3hTCSRo//SY/6Bpq5T7pH80PFZr++qFDw+s+dQrjPUrDtq5dMhPTQRl9+NgZIw4ezcZ/0sCDnH2UoyBl5SDMjpCES93E/5zwOCVvuBZYW8OQkui+y0KfJQr8mE8P5mdBsjkXw26oJaWJjYSzIQn5s3LN9mhuiee7rI4buYNZEyPqlHmBqChmsqcKt3FTc3Z2KnrxU6PfswODeHVC8pYTJZMI4PWEuHqiJifnb/gB5uI/7u4hzO/dz6E8fx3uei8AyVnuhv/oc2tPicUsdjy5Sz854/J4ejwPR0QLMXwIexld+z18Ufs8VErpJzPXRvI58Xeo4dBKrXZ2A3tKjeNfdFSzd3wN9FafQHKdEW7wKHQlK3PlMCV2iEoPJKhxQKQXYYDDAaDROrLzmAfuVGzGQpEQ3zd8mXzv5OaclToW73xxGqIucvi5fd9w9WYL6SAXqw9eg4f1ANJNuRgSiN0qBvqhg7AsPE0Hd3d3Q6XRCPGAv9Xs/5DMKtG0w+66FB6I+bA0uE689PxfBzrPBUjzlaNifjWNSO5QtdEQF6bzbDNS+MgPXFkxDIylz5QrxHJ4O4aEZ1G+gfS4tzXMf9592dUSx9AVoYyLhN20KhXg442peOo5IrPHd7Odxcs5zKH/ZGuel1rgsnYRMX28R0N7eic7OJ+ro6KTTKZHh4y3mfqL5H+dYC/9x4hydNQXV0WHwtZn06CQHslAkm4bv59qibJ4tKufboHqBDTJWLRMBLS2taG01KyRUiRs3zDVfRRDNVdH8OfJxfylxiomn/TQCftOtwLZ5yXH90C6ULnRA2WIHVHja47yXPWqW2omAhsYmNDWZxQMyg3wEuPFRv5H6/F67xE74KjzsBeeEmwPqElXwd7Cmn5VX5Wg9sgdnfGahcpUE1YES1AZJcOnNmcgKXSkAj8Xvm99xRPa6v/YvvjETta9JUBUgQaW/BOX+L6F+ZwxenzkVbIv3XHSUHESVwhk165xQF+aEyx/I0LBJhuaPZGiLkf6rWj+R4nqUDFdVMtRHyFC33gla4mg3LMbFfdsQNv9FOsmyebhzQoNfI91Qt9ENlzYtRFOCC1qSXNCR7YLf0l1wM80FrSnmHt9riHXF1RjXZ+orH7uiPnoRrmz2FRzO4yGcz75WeGPk9FfoLdqKntIU9P6QAv2pbeg/m4z+ymQMVpFqkzB8KRFDF5Iw+EsyBn6mvXLqP1Xrz2yF/qxa+AWHeJzL+Wx3gDuKQ5fg0Fp3JCyXYouPFNtXO0GtkCMjRI70YLmo1WvlSAtyRuoaZ7G/1V/2TJ3kJ0Wir1mcw3mcy/nmf73/4bqQlzr1MfYPNcKdTI8iX3wAAAAASUVORK5CYII=',
"bMin":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABHtJREFUSEu1lXlQlGUcxx+PGM0jO8WybMILddnFpnTAtDSnpqZj0tGZnI6xEq0YrzxQIWkByxQQMQSVAIHFRUUOFS8OWUDQRZCFZV1CXOISnClvOfbT82zWTH/pH/nOfPd53t/z+32+7/udnXn7zI7Kwm3wY8Jt8FDhNmiw6DdgoOjTt7/o26+/kD/igS5nr3A6ewS9PcJ5947ounlDdN24Jq63NAq3IcOEmDXnE7q7u+np6XkoUnwx/cMFlF7qYG/5ZVLPOkg1N2OsaMVY1cbBqg4OVXeQWd1JtkWq9io5NZ3kqPWesuV9luUqmRc6XP3pF9rYd74VQ0ULRfUdKL6Y9v7H/5vJgcor/zE5bb+C4guf9+Y/NBP1JoovprwzD9PFdnad/o09RQ0kljaSVOYg5VyLjK4FY2WbjO4KRhmHUUaXLqMzSqXL+FQtXdWr2jFUtpMiY04pb2bvGYeLc6quHcUXk2d/RL61le35dewosBFTYCdOmu0ubiShtImk8haSpWGKuZXUirZ7anetKWalVtd5Ylkz8aUO15ya31lYT66lDcUXk974gKMXmvnxcDWbj1jYkltL+HErkXl2ovLr2VHYQEzRJWKLL0s5iFMqaSK2xOG6jzU18os8j5Z9qn/bKRsRJ+rYeqyWjIomFF+Mfu1djGUNrEwtY5WhnDX7zKzbX8H6jCqCsqoJzrEQcqSGsFwrYcfq2HTMxqbjNsKk1Loptw790VqCD9cQlG0hMKNSzp9nrdFMosmO4ouBnjNYlWJixOIERvon8sKyZDy+S2Ps2nTe9Atlzny/B9LsJaFoAjMZJ+c8VqYxankyX+4qQPHFI+Om821CIY9+FsuQhbsY5hfP098k4b7MwJx5i+jt7cXpdN5Xc+XDPB9wkBHLUnlGzj++OJ4F0SdRfOE2fgZLk0wMXbiHJ7/6leFfJ8rGNJ5bf9BlYrfXU19/f82dv4iRodmMDJRGK9Jwl0afxuSh+GKA5+usNpQw3C8B9yUqLgOj1h7gxZAcl0ltrRWr9f5SJi9FnMQjNIdRAQdkXAa+2JmP4ouh2rcIkiZjlhvxWJ7GGPnK46XBBDkwc+XPqOEH0cw14XjuKWJi5Ek89YcZuy6DJfHFKL4Y4TOPrfuL8QnOQRNwCK/gI3hvPYV3XAneqefQZZ1He7waTb6VicU2JpTa8DwrVWZjYpHNVdedsOCdWYl3mpmXd5vQReSh0x9l6d4yFF9MX7jhb5OIQt6OKMA3Uir2DD7JZnzl33dK3kVeNTXwirkRncWBrqYJL+vv6Gqb0FU7XHV1PjXfztScaqbJB/ONk/OSt3pfJYrvMomt6SDmUidRzX+QXNdGvNzHyv22zpvo/7yN763bjO7qwr2ni6d6uxnk7MZNapDcPyFrz969w2jZ43vtFj90XndxFE9xXSaen2/gH032j0Djp0frH4Z2xWa8A8LRbYhEG7QN3cYoNPrtaEKkQqOZFBKNlz4K7feReAWG4xWwBe2qn9D4hzLJb+O/TMV2ffiW5lrlZ/DhXX8BmUnqCVosKVcAAAAASUVORK5CYII=',
"bMax":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABERJREFUSEu1lQ9MlGUcxx/UmBqRWy1iBi0NFeE4IBMGAVZjbbX+LAqbzdpoglYIlvw5SSwk/v8RiBk5To4/h5z8BwEPkAMhhAPiBO84OP6GcQdSyUToDvj2PK+DDWeDrflu3/f3Pu/v+X2+v+d533evkWdqOYxNnibGJqbE+EkTsnHzFkKIETHauIls2LCJ0BMdr3FgiWBxgSwtUf0zTwz3Z8nS4iLR35uhukvIm16HYTAYsLCw8FjE+MT9g0/ROjyFnPZRiOVjEHfexuWOCRQptChR6FDSM4WKW3dwRck0jSrVNCpUf3KRid2rpPnynjsoU0yimNax+oLOcTRqJsH45LX3Dj1WE8YnLu8e/E+TU/GZ+Oig37oURucur6SwU7uyEsYnTm97o7lfhwtNg8i8PgRR6wiy239Hrnycg+v1eu6ZrSU2N79rAnm0LofWi1qHca1vAoxPHD0/RINqAmkNfUiXqXFeNsCZCVuGOZP1vhRsbvaNUVxsGUFm8xAymgZQc/MPMD6xff19VN+8jZgrPYir6kVCjRJJUjVSr6lXmXz8ydFHbttyE8wkXTZI6/qRXKtG0lUliumLxPjkZbd3IGkbwrfiNgTltyOkoBOniroRXtLNQbVaLXQ6HXcdK1UhlgJipP2Io408nI+ovIXwUgXCirshkHRARFfD+GSLtQeC8pphfjQLL/iLYBmYC6ugAtgILsPLe7WJW4wUbnF1cI+vh1tsHbweasLxTDlsBYXYHSzBDso5klEPxidP7HbH11mN2Pp5Bp7yuYBtfkKYHc+BxclLnMno6BjGxsZo174cdJW8fVflrUKLaJNimPvn4llfIQ6lXQXjE+M9HgjIboapTyaeOXIRZl+KsD2kAJaR5RxwYEADjUbDxUeJ5ZhYE1YRZdgZXASLADG2HxPhcHotGJ9stj6A4PxfYeaXhedpwjIwHy9GVGBHcjVnolSqoFKtLWayN7Yae06X0e0uxEvHxfD5RQbGJ6b8txBOTaxOSLDzxCVYCYqxK1EK658b8EZoEtfheuQZlAB+WgN40TWwDa+A9ckiHBPSHaJ8Yu7ijcTCFuyjCZ6gFHY/VMHhfBMc8uRwKO2CvbQXdg0q2FxXY29bH6zlDyIb28v68EpdL/ZVKuAk6YKT8AacU2XYH1XL8QJzWsH4xN3nO87ENboWbilNcD0ng3OOHE7lCjjXq+HUPIhXO0Zg3zMGvnIcfBUVjWy8v3MELvTLdmnUwKNKCQ+JAgeE8gccyguW/AbG50yiuqeRPjSFc+N/I3RyBgm6GQT/NQvXe/dhNTcHC4Mezy3osW3RgK1LBhhTscjGZjRnOT+PXbNzcLs7y9UzDuMx7oqJo38ylsXzOwu7gCjwg+PBFySCfzoZ9t+ngBeRBl7kT+D9SBVJr8+mgU/vszw/LAn2IXTuN9HgfxUJ2y/OwOaz0BWRlC6tyVo/vv+b/xcAf9f/4T3A6wAAAABJRU5ErkJggg==',
"info":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhpJREFUKFM1kd1Lk3EUxx/pQijqD/C+29qFBt7kosILQzFKijBKqSwpp6IVlClWhgjzLV2aMTOn5dRe1AUuc2K+ZeJcMVm2R1eTfC2VMt3z+31amh84FwfO93w55xui/Oezb1E39mVJv3NHqHFuOaBIQpRd27cpSyvr6bvDQrsj94SNbs0qvSPf9K0On1ppm8HUtcobt8ZLp0bR6zXyrXPU2HxqvW1cvyGY+PpD12CfVAtfzJHTJrnVruGZFTj9gqxWQUYzXKlborhFVe2DkzqltMltuFw9RZpVcvGZ5FKTpMQRoLBL43ywT26EpHpJQsk02Q9cBqWmw0tM8QIJZsHZRklKs6DHq2EbF5x5KklskJx8Iomv+kOO2Y2Sfn+UqNI1IsokR2ol51oCeOYFrhnJaavgeAPE10HsI8mx2yMoqSUfCDeusrcc9lXDqX+CBYFnUZDZKTgRvCH6seTgQ0Fc3hBKabObiHvfCa+SHAhaZ9g1Jn9KppYlhYOC5A7Yb5ZEli2TWRl0uGnqNxzOd6I3B4ixQn6/wL8imf0NtW5J2ls4ZBFE3XGTdNdhUN67/LobpkE1tnicxPZ1cgcEw9Man+Y1LB7Jtd4AR01eUo19amPHR91GFpZXY/rs8j41umA4+Bk/OY4VjMO/uGqbJc7o5ELROzWvomczuC26h7y6lAK74XrVAAm59mB1klXRx3PHBJY21+bmIH8BLUeFBNafPYwAAAAASUVORK5CYII=',
"help":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhVJREFUKFM1kU9Ik3Ecxl/pIBTR3XvX2sECL7mo8GAoRgw6SP8OHSSbRFb0B8WyjGpumi3N0LRZ6bSotkBFZzp1M3NaTVD36sRaDf9Mo6nv7/19GpofeG7f53n48iQp/5kILxhGp2LGnTuSLdFlTZEkKbu2b1OWVtYLdqckd6ftSRnZulV6h2eNbZ6wanf/oqY7zushQZNPYO1Yo6QlSq07rDrc48YNw+TsoqGpY1q99zbKw06Bf1onEpP8TMgbEhS7dPIbYpS3qmrH4LRBsTUHzedrZrjQImn0CxbjEs+UwDcj0HRwBjROv5CYrD8ofDJmVmpdITLL5zHV61xzC2yfNPLadOz9GnFN4h4XnGiU5FSvcrMuiFLwaIR02xqpFZKj9ZKTzYLWb4LIimRpVVLWI8hpgKxnkuO3hlHyrJ9JtcTZWwn7ayC3TTCxIJmN6TzoT6Q7JRnPJYee6mQX+1BsziD77kZIrZYcTFTnt0s6E493hXXKBiRnXXCgTpJWsczFx4mGG/Z+85GSAMY6jcwWKPJK/BGdQFRS/x3MXXDYoZN+O8iZUo9Z8Y/NGa7bB9Ws8nFyP6xT6tcJzutMLuk4JiRXejWO2UPkWbzqS9dXw8YWjnejxsJKr5pxZ4hTr+Yo7ftD5Ze/XHb/JtsS4Nz9PrW4qmdzuC26fSHDR6/K1eoBTEXtG7pU5eWNZxLH+7HN5AT/AFV8jI8kgcGCAAAAAElFTkSuQmCC',
"alliance":		imP + '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',
"alliancegs":	imP + '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',
"mercado":		imP + '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',
"mercadogs":	imP + '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',
"militar":		imP + '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',
"militargs":	imP + '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',
"militar2":		imP + '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',
"militar2gs":	imP + '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',
"misc":			imP + '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',
"miscgs":		imP + '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',
"setup":		imP + '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',
"alliance35":	imP + 'R0lGODlhRgBDAPcAAAAAABIRCyoUBiAgFzUqDTMzLw8dQhs2dTpDXFI0Bmo1Y15CDlpKJlZZNFB2DmpREW1bJ3dkB2BzPHVlNEVFQk9PTlNTU1VWVlRTWFNYXFlZWWNJaWxkSWJjXH5wRn94W2ttaHV2dTpRhzJisjxywW4sjXUomV9ujEh+x2aUIHuhQnyGkWCAslmLzmaY1Huo3J8ICIVyDoNfX5V6eskKCtAnJ/AQEPUuLsZISPRXV/J+foEtpJE0sqQ8xpNblaltvLl8pLVW0cV+tsd33pyGC5aJKauRCbecDKiWMbWrO42HXY2JcJqPb42rXZ+2e6OYXaSbdLOmU5/IYcanBMOnDs+wCM2wFde3Ddm3Bt28DMKrLd2/Js25cOTAAeLADebEDejFBurHCejGCunHDejGDuvIDe3KC+3KDevJFPPMAvDMCfPPCPDMDfPPDfHQHOnJIuvNNdPKR+jST+nbcYGBg46PjouTl5GQgJ+cgZubjZOUk5KbnpiYmJubm56fnoyZrJulsq2niqWkkrCtkbiyi7eylb+6m6KioaWopaKrrKykpKupoKioqK6urqavtKu2vrqtprCyqrS4orS0tL2/t7q6ur+/v5e44bG7wrPFmLjDy7/K1L7R6tOXlvOeneOzs9ib6dKu0djIk8bCpM3MrcPGvM3WvN/buvPnifHorcTFxMfHx8nKycvOzMzNyMzMzM3Nzc3Pzc3Ozs3G0M7Ry8fS2c/Q0NvFxdLTzNLS0tPU1NXV0dXW1tfX19bY1N3e1tjY2Nra2tzd3N7e3svY4tTg7uLT0u7Z2fjNzePD7ODh3+Ll2vLtyOLh4OLj4uPl5OXl5eTm5eXn5ufn5+bo4O7m5ujp5+jo6Onq6evr6+vt7O3t7e3u7e7u7u/v7+Lr9O7w7+70+vrh4fHx7PLy8vPz8/Px9Pby9/T18vX19fb09/X29fX29vf39/rw8Pz3//j4+Pn5+fv7+/j6/fz5+f39/f/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABGAEMAAAj/AP8JHEiwoEGDdPxYegVs2jRG04YBezWJz8GLGDNqvOjnFTt7IOvVkycvhEiRIO15s2Rxo8uXBuvkggdSHrybOOFZyIlTHkh2lujAHJqRzzB7NnnmbLdTaU+QuYQSnfqvztF6TpU2zYpT5CupVDWmSNHECall7bjm3Kr2XDJQcEENCXvQwdi7KqSQQqf2Jtus7OAOGTxELl2CdlOoKNtkrJRM63iy4/nX6dshQTJnHhIqleewSuw6EfauXjlTKlJIMRUZ57p2sOHJs5AUJ65I5W6ak9tDs+YholChSsWM6Ci7g2Y1mqRqVXMVKpwsu9ku3TVeqipNmkRhe6VVwbzR/7pDyRW1VT+C9PbdO7jwVESbOFBRqX4lVsB0rcqkOtMvV6os950twQhTwTDB2JLdJI2E0MSDIKTXw4QUtofKHKiIssxQEjjgBCurvPKKLcIMk8sviqmABBJPUGIJK7w4Q046FaRTDjneaIMNMEtIIYUKIQChXoUTCjHHkXOMogxMlEiQQiav6MKLLrb00kww1ChWRBpqdIFECBiAQAct4FQAzplncoONEz6qwAEdPxDZGxdIcrEITML80qETsPQyZS6w8MKLKWMVccUZaUQBSAZ2OBIJN2aieSY2dzzYhB50+DAhD5z2AMQccoTKBSG+vBSMMqGpUAow+VG5SiVOKP9GBBZndBEFJ5gQU0sIuxw4zK+/9qJHJpLAMssPPPTQaac+cBHHs3GI4lIu8jhThwMe6tJLMMCwUokkdyGxhRldPLGJJppMUsQTFJQI7DC6RGLLMKEgy+m9+PIQhRzQSqvRNPIEg8EAolFCCyt+4HFXDEmM2wUUxOTqCBVYFKHEHXrwoTEfdWR87w6cgizyDjv4AG0cUWhkiT3XdDCABQ1gq1hjKWAbAxJakKEGFkycS0wiR0wxxREWFyJJJIssEYgkJDft9NNPPJvEExlZ4g05IBQAQggFDBAztmDfnMQXYqhRxSDEaFKLI0QcEfQUVVSxIhIPGIFECSY8/bQJJij/EUcSUdzRB0ZWh0DB1gUEcEEIIDTgeAQxFIGEFWaMocYUfhSjCTGOxNA2FVeIYcYaa4Rx6BV486366qp/gEQTeVTSkkGvSOMHBSHQQcEAGfDhBwhbdxDDEVposQUZY6RBxR6YaLIJIBO0XYUXY4xRxhhfYHEEEQqw7r0JJTCxRB2NCMNIIwdVAk8dFYA5AAYKTUJHH354cEQWV8QhxxthpIGEI454BAAh0LYrfKF6ZcACEZ6AhwcwQAEliCDeJBhBE9ChDn6oRDDI0Qs/HOQV5KiEBgpQAA34QRXOOMQkKhGJJ3RBDVuIAxyq5z9NYKIYz2vA8LJQvTFUbBCkOMUS/xawAAhSkIJ0OIQlcvEMcrSDHX6YREFyMQ1yqEJ3GOCDKrDBi0YoCAQeMIMbZEgGMdTqCZs71x90eATqlfEITCAFHvAwCgYkYAEYOGIJNkAHRryiipOBRz2WU5BXwKMcwWiEHk4ojXRUwhK8kMUiihAGfm0hDGRowxQEgS5MJOIPHIjBFLxwPSzEYBCDwIMhRtGABDyAAyFg3NZiqYdcZCOQN5HHKxhRkErYox3d4IUlVgGNdJADEa/oxR2YgIQ2wOGZcChDGo7gCE08YhOO2IMGImCELJyBDEeYACkMYQg8eCABrpyAHtbZsT4cog/bwGUuhzE7geTCHvBghzewof+NdMDjGZMIxjBYsQQirOENoXoDG8plw3M5wg4geMARyFAGLxjhA6NgwgQe8EoGRGACkwDRKlYBC1s0QhtOgaIlBpKLozhFFqooUdK0wAY47A8NYDgCJ2vxDU3YgQ4dIEIWKJqFGDBgowlgwCCY8YEExGAS7xqGMCzhjJQyYqUCeYVLlXKfX0XiA1Sw6RuwVwUlbKIWNsTEHk4AgVGOgQxXiAA6CRCADjCDGYZ4QAw+ENVhqMIWWWkE+rI6DawoZRLz8sUhlGCFhJphChHYQzES4QhMOAIQICDCFZD3hSNE4AMBAMAAPsCMU3yAAA+YQCmiCgtL1KYnk+AlYQ3LE6j/SsMZiHgAGmwqBzRgwQhKeAQgHiFAOkQACwckwxeAS4oBDIAAFGACA6YbgSJEQhrYxa4wKvHaXFpCtv94hTe6K5tKOAO7w0iCGmw6QzaEwQgTGK5wO2AEMXBWgYQ4xQACIAACMIAJp8DDAiIgCGhk97a+VEo9vjsQq5F3wQaWRimswN4xhMEMV8jCFGIwgQ8UgQhfuB72plCEU4xiAAL47ylK+4EHRIADuzgwNFyr4Fd4UCBXtICOd6xjClSgAhbgQBZsioYwVM8MXqBCFYIGBrhewQxkyAJ8mQCB/45iFKSAAgTQGQMIdODHYKbABXi8Yz2ANxfSoG1PLIENcOBC/wtukAMcsCCG67HhClQ4oBq+0AYqUOEMY6hCDBbAACUMwhCDoDIROTCBCDygFJLCxirICw8G27OwSmmHKp4BjlFgwaZbqAIZKmc9M5TBDFW4QhuuUIUyfEHQhibFKD4wgQU8AAJ4kIQHXLwISTkjFuRth2AHAoyt5kSXwgBHEtLwBjig4QoGvF4Zpv0FKmTB1GWIMtEMQYol1HoBHpBjIDiwgBhEwAOSCkYwrCrFgRgbJ+2QRjDUYYUutMF6Y8gCKXt4hiRfgQ3Wyx4RoOBtIjLBEIEYRa0ZULcjQKAR7Ih4MLahFHl4QyEEuadTyJGLdCgBCVNQQ+Wm3UN84+8L3//MQhWIwABbK2EJJt4ouEeBByIQAQKIiHg6bJGOtPBkGnx4BUFegU+etCMeq+iGMkgBgSOAYQ1tAHTJr2fALHwBz47GNTOgoIQtJ4ADdy2Eiz+Ai4hvAxbxcEou6vkPYMim4sFwxjrWQYePW6EKX1BDyasHaH2vHAKLGAUUmPCABBBAAOBeMSE8kIRCRJwdzaiqUoByY4IMQ804SYcxkOEOQRRiCR5oqxdEvnfrqZwIS5AEExZg+NAO4AEeWPEdQkCJcYQEGD4/9sWxShBgFN3ot0AGMvJQzjw8QQmSe7qpEfiFLBBtCRAgYgICEADnwp4Zg0jEI/7wghdc4vvf54T/N3JCz1wYBPdOKccn1r+EQhQCD6i8wxKKcIQrXNgM/b4CER6wAAIAIAEQUH0E8HoTsAQU8AcukIDd133gdwnfgBMscRGXpxTI4AkWeAt5AH+FMAiFUE6gdwRhkAVi4AVx5V/7VQAPUH0FQABVFgInwAIJGIML6H2X8ALf0A4XVwkXQS2SYYEW+An0oAqCMAiBYAgbGAjLhARFYARTQAQEAG6JY2sCCACphQktcIUtEIOcwAkv4AIMaIO5UAcZATA5cQyeoANo6AnHYA/ZQAnwh3CBgEqCkAfeNl0L8AEF8H8LQH0BUAATwAAsgIVY6ALhYA9dqIDehwjgdRC54A7i//CIZoiGkugJyPCIxgAJedCBh1YIgVAId3AHtbYEeagBFCBaIIALS3ACKLCKKHCFrfh9MaiALbACGnGGZyiJOZCLuSiJk9gJd3BliNaBhuABC6AEJEQMdDAAHeAL7IANLcCKq9gCl8AJl+ACWRiLLsACGqEDutiN3uiNaLgIy1QIo0BOo0CMHlABF/AIdBACGpAHq1AKJEAC0CiN31APLyCIMaiNGfEJuXgDABmQAhmQudgJrkAO8aAKd5BwWHZODbACIdABW7MHiEAO1YAC8wiNJMAJhtiK+siPGNEIM4ADA1mSAIkDM9AHVHUmyjAJnncK5yQD57ICjVILiPAMvP8wjzqJkRsZDs8oiFcIkhfBCocwkgBpA0d5A0iJlChZB4ggC9IgKcpACXmwZRPwCN+ACblSC36gDKwwAjpJjyTQAt/ACdDIii0glEOJCEZpA26plG+JA3fACLKgDLogC8NwDdyAJsOQBwzAAXtQC82DCYhQCq1QCmAZliPwAvNwCfR4liiglhcBC4qAA255mZiJA42gC9rADvKQDs3wCrkgUNHATxfAC63QB3aQCHxgCcpADsLAAok5jyNwCfXgAo+JliTwBy/xCTWAmcB5A5/gDblHEuygDSYiC7ZAAbZgC6ywSNZgE+2gDHswAokJlhyZj2G5iiOwiBnRCXAJnJf/+Ql8kRUkIQ8XIA8joRTQMAknAJbWWZvfUAyOmZEoMAK0+BI6gJk1gAO/eZk6QA59oRNc4Q26cAjvSZtj2QJhSQIjcAKHABOW6ZY4IAMdIAO/SQM2gAPVMKCVgRPscA2qwAciYJ0OGp86+aB2MBQaSgMJIBCNUAcX+ps4cAy5lxUfmnnOUAl6cAIlGp/xeQAGMBUwAAMCkHGHEJE4oAPBcKNOkaM4UQ7DID8YgAAicKUHIKSHcRCrUAcgsAKv4E9qAaX51A2y0AexRAdquqUaMVWNwAiTQEXs4KR+kWn6NAyW4AdOCSOswKYvoQ3Z0Aux1QgM4Q3eMKeyQRv5ZKjTT5ALeeo7cUqcfkoU9cAOjfpdjHA+k2AJlkABnPqmfqAxjFAJcloPk0oX8nCnufAKlrAdILAcm8oQw3Copnqqk5qqhuoN0JCrEdcOtvoPAQEAOw==',
"alliance35gs":imP + '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',
"mercado35":	imP + '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',
"mercado35gs":	imP + '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',
"militar35":	imP + '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',
"militar35gs":	imP + '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',
"militar235":	imP + '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',
"militar235gs":imP + 'R0lGODlhRgBDAPcAAAAAAA8PDxsbGxwcHCAgICYmJi4uLjQ0NDc3Nzg4OD8/P0JCQkdHR0hISElJSUtLS0xMTE9PT1BQUFFRUVNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXmBgYGFhYWJiYmVlZWdnZ2hoaGlpaWpqamtra29vb3BwcHJycnNzc3R0dHd3d3l5eXt7e35+foCAgIKCgoWFhYaGhoeHh4iIiImJiYuLi4yMjI2NjZGRkZKSkpSUlJWVlZaWlpeXl5iYmJmZmZubm5ycnJ2dnZ6enp+fn6GhoaOjo6SkpKWlpaampqioqKmpqaqqqqurq6ysrK+vr7CwsLGxsbKysrOzs7S0tLW1tba2tri4uLm5ubq6uru7u7y8vL29vb6+vsDAwMLCwsTExMXFxcfHx8nJycvLy8zMzM7OztDQ0NHR0dLS0tPT09bW1tjY2Nra2tvb29zc3N3d3d7e3t/f3+Li4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6evr6+zs7O3t7e7u7u/v7/Dw8PHx8fPz8/T09PX19fb29vf39/j4+Pv7+/39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABGAEMAAAj/AP8JHEiwoEGDOI6ESQOHDx8ofOrASXNFCEETBzNq3Mhx4JE0iRw9etSoESNGLkqWHHmozAsYLV50nEmz4A4wNgTlCbSop89FFH4ucgkThtEZNZNyaMDhg0EhdR4l4kEjhh2hPYP6FOSihVGjMmikwZF0pgUPGTJcaPpvR9RGPW3wiFEHK1CfhIR4eeH1K4wljMaW1UghQ4cOGTSkvXDiSZk/ixIhKUPI7t1FfXb8MAMEhV8ZI8I0SnRksMEVFjakzbABsYbXETgEATMlDyLLWnuUYOLFjIkWMlqggABm0CJGj9KYHhjigoXDHVS3jm54g4YNECIEwd2zUJQsZtw8/xmBIgaOBIl+PuIT4sWSME5W1IxxIa2H6YdVG2ZNwYSWCGz0pMiAx1XASE9RMAGeG0BAUcUMCfDhUyJ2SLHEDivs8IURRMwERgYWpCXddKutFgERTRBhAR9+vEHGFldckUCMW/wQhRleuEGHGEGAMIBxfJSxxBRjOMFDFVko0YUPdnBUBwf1tTaiaoiJeMELWhCxwwExXBGGGWvEYQcEdsSxxnlMmBEeEzG8UIIRSygxhRViiLFEEF4k2QUUYXAURGGIeVAldRu0xloEL5iQnRYMqPHHIIUYcggFhxhSSA8GqKAGjjsYYQUYZYwxBhheeCHGEEGIkcUQVmixxEZgWP+QGmKHpVWriB1Y0J8AABSgBQ0iPDrIsBIMOwgTHvBAhxlLzBADBStMEUapXoQxhQlFILnEF2EYwYdGJ0SQwX0iGlalrRpE0EQTAQDAQJYMLGHsIMUOIsgRWbghhhpLrJDDAjC8YMW01Voxgw5ZMDFEGGMsEYdGSJzAQQQXFDpluYiOwQMAAESghRYsFFBGHSQzQHIdR1RRpxpGvCBCBCKgkIMYpYKxhRM5dOoEGGJIW0dGT/BAlQkUo7Ufa2lZQESWAATwLg8ICMBCHCWffEQUYrixxQxB4AgECSVUS22pWnQxbRhcNPHzQTO0AQMCIsBwAgURXCfiWQeQEAQNcEf/EIEDEZAwgxCEJ0C4EDBE0RsYMiiYshpIGEFzzWCQ6oXNWuxg0UFItEGEAAEQQcPodLO2QWon8EBCCCiEMIEGH0QwQxq0p7FA7T0wkfUTL3gRBAQemJGFEVo4QXDlpYZhBRRKbJEREnbQUIAAbfBQQAQ0rEA3xRzwIIIDK3wAwwfhTwBE7WkwUPsPKbsRxAtV5ADDAEeosQMURlxucxekguFEFlbQAdCqV4AAjOFzAEBBE4xyAgjAgAcocIELUDADFFiQCDpAHwPQQLsf8EYMNmBBEGCgAgBsZglGyMIWKpeFKVgODGPwwg76ZJAnENCATSggDwDxAQFYgAcneCAR/8ZwBilI4QxtAFkWaqc+2gmhCkeYARMwAAEVZGEGMBBDFHLABWldrgvVGsOqjPAEKHDOcxQgwBhyGAAaAGIF7RJdE+wACEA0AQIQ0AIgtLCCG9AODU1MQxCOwIQZ/IAHUnRDFHjAhCKYwApZqFmdupADIvAADHAoTUHKEIQxAEIKLlgXr2AACBi0SwuiasMeFaCABpzgjR+wARPXp7sczCAHQuMBIWEwgwkY4WxdsIIPGJCAH4jhCqS5QkHAIDRPtqF6DAgAKVkQgACgEgY0aMMKGnCAC0CgDTmMQRve8AYGkPMN7DMDE+SXgx/kQAU8gAAPMDADUX3hTjoAwABmYP+GKzQCCsokSBoYIYgs8ECVdtDCwXh4yjHIrQnbo8A3kxCCEGSBnOYk5yC1GAQVLKAEJLylF7DJBSfI4ApuYMIAVFCFKLghMGYkyBYe0ZOCdhIQbRhDG1DAAAB8DAbYs0AEGiDRj/kuCBg9Zxp24IUojFAFKvDAOoNwRSGUgAALUFnCxHCENRynDpsbSBto2pNEBCILRFAlIMbwBBU0gY8PjIAFFCBRHtjABU+QQ9VIRoc3dHQGHlBBCVQghnb6Tg0gAMACFCcGJmyBJ2XVpEDaEJWfJCIReQhCWgGRUC204QMMWEEEKKCAGDzBDHQ42V5JFgceCNajAYDAg9J0BDP/eMAA/KwCFNaQngnxaSBpqCxWwrAFJGx2rRQIAeBWkIXUqvZkJjvZG24UBRiUAAMeyIEEctBUM1yNq8i0CxRi+o808AEuQlHEFdZQhzcsoQnPzIIYUICE4D5XtdElmRy2cIQc9OC1gYXBIM2gxSugIQwHEgojrkBe86JXKFuowx72oIc4BA0KPHjCHOIw4Q57eA8Q+PAe7GAHPaDTDKnigQejAAU56EEOCMYKI8LQ4EEk+CczvsOH+dBhPehBxB4OsYjtoOMtZOEIm6mDGdTw4z3gIQyOwEojaDyQMNhYymFoMpC3HGQuU/jHWvawHmIslEakQbJmgEEFKMDmNldg/wESiHOcKTABCsj5znjOs573fOcFrLnNbK5AD8jbhvPKOAx+mFce0GAHQczr0fOqF6QnDWk/mOHGP6HyZA2dXjLkYV5xYIMdKA1pSUP6D8KiNB4G2hM0xCEPh1DEeAcCB+HiGA1yGJYgwNCDHeygDI4mNbEojQYZ7AALc6B0HOLQk2VjAQ15SARABxIRsi5CEWLAghv2EIfL/qGtEVABEghx2XKbu9wUOHciBIGFIXxBjEOQwhzUDYdA/AELWFh2HhgxCIUQZKw9ycMOcuCDSmbhEJeNpBeY8ARDqFvd6T63FFp1tjF8YQhJsEO5D8FbNoghD3lQRHr4EFaBpIGsUv8wXhacYIQZLE2RqgrCDgTx8HNHvNxzYJULqRWGMlycCGwwaxoIQQUg5OEnbSj5P+BwHEHQAAzT6kIWsqCFKeQACFXwQhFcIAY2kLvmibj5ZZfQBeONLXljCMMSlpAFO1CBl0/obSLCINmB1KERaPBBFvgH9TCA4Qs+2IE6SzADJzhhB38YieIXXwHFN6IJXDAywc5erTpNYQdAoIMantATfvu7IHB4BBaM4MXJw5UJMoCCE4ZAeiks/vWNH0nK0245nlvBbFPIAgyZSWAq+ASsbTAIHBIhhSlsoQtlz0EOnNAFI5RgCMFsQhyCYATXv17xsX9EHoxAvMlRy2ZeKPv/5byAYVP5YA49CYPSBxIH0m/BWtwv+AzEYAUujCEHOlgBB2bQBJFc/xHZ5wgRswNdUCdjUzlb4EVTMAMzkC8xYAKfdgTOcxBrQDzV4gMr4ANT0AA+MCrKIwMMIABIcCGH8H8AqHiOAARTcAYmkANEMnmUswU+AAE5oCY48AE3sAY7AAcZMQfEU4BWwCsBcABlEAZh8AU5EAYzYABTQAQyYAgmmH2xEgS/0QIikANdMCrUYjbOF0FpggMx8AEzQF4GkQdKMC1gYAVGsAIHMANlMHWZQwckUAAosAJPGIUjkQQRkAJT0BQt0AIeMAM+EAaTE0krQAIwkDtHEAQswAIn/6AGGuF91MIFXPAFXuAEXmAEH8ACMSAtPFACaRAIDxdxNzACKUAHLgAACoACf3iFkiMGylMCMcACPdAbjEgDEaAcBoEGYDAEMUQtYlA5UGcFXpADQRAGUrADI7CMI/ACNpAEbKdCgEQ7SdACpxgDAWAAB9AAIyAcGaCBY6CJs7gDV3MEcYMAQZARO2AFXyAGY0AzRmA5XbAFViABDLABH9CNFiQcf4gCGaAASHCCjyAGLYAAOrAEJGAACnkAG8CKLSA7K1AeH7ADVVAFTOAAJAABHHgQYrADJaB8RtAFMjB+YOQEDUAACLCN3SgcKPABFmACQHADjlYvbPACRaACUv9gAwhgAAxgAQXQAC2JAmcwizDgACoQBDKnAQ7AASLQACRgEINABVMQBAiAACvQgO8YBlngAwpgABbwPQegAOLCATpQBn2ABvJCL8NSBibQS81iAAKAAC5QAARwAAGgA4awBCyAAg4QBFOgBWfwBiSgACLwAWQoEK4SBmfgABYQAhZAeE7QMzNwAAjAmCIgAks4AVnAB4IgCFSABMM2CG/wAQmgA1OAAggAAgjwAApJAAAQA3+wBChgASQwBXTQV3TABhywjFhgEKPyBmEwm0o5Adq4AitgAggQAAlgXRqwBEb5BGjQBnGABE/gB4IgAYLgB3oABhFwkKykAQmgAFX/aQABEANq9z02oAXn9AZ08DsHcAMGITpIMANQV5ULYAAEgFUwwCsRMAXWYwMREAJgwAiJ8AdI8GxrwABrsAZtsAUJ4ANAAAFC5QEtcAAGgAAE4AI4oAOyogNh0FfndAYRsANSYBCEgAUuMAMrGAIuoAMokAAEAARAoAAF4JUX0AImoJQsIAg9kQRxcBIGYhKJ4AYwAAYs0AAW0AAaUJAIUAA24KJfiVQgek4xMAYlahAWRgVggARI4AEacAYuEAN0oAUQQAQp0AI10AAFkAEtgARocBs+cHSXERl/gANlMJkNMC41UJUEYAFrh5FLAJi3+QaB2QRL4AMcIQgzegAf/zABOvAHUnABWgADKwBBlGoUUAAZNyCnWlFW6cEVYvkBMmChAnAAEbAEFsACWhADBjABSEWoS3CYGSFaLSCWHEAHUmACC5SpUJcEDBABaMCjm5oVlpEIaTA3S4ADDAADKQADQIAALBAGUgkCE3AG1voqM7ECHTACDVADKXADIZQEbnAIPcEGWAADEhJwtzGndlEIe4AIguADRrEDS0CHdDcFKoAC6vkGSVAWv4ER/5AIbcAndQCvbEAD3GEZkTEIA4sDzfoCOlAADjAFCwgDWqCY6bgcA9EIg0ARV9AGfdBbWNGpPiFyg1AHdHc/bZCbBMECQAACLhBC8qGxBbEIg2oABwwGBQwxLImgCAVyIIkwLHzQBnQnBEfwscaREQYwAjS7EaMxtDQ2XgBlhAxghON1BIQDBVtQaInQCBuRAUzbtBxBoIJAB22QBmEQIyUAUF7CEHUwCF0rtnJbEARqLHtgLJelCHM7EAEBADs=',
"misc35": 		imP + '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',
"misc35gs":		imP + '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',
"setup35":		imP + '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',
"aup":		imP + 'R0lGODlhEAAQAPcAAAAAADFM1jxX0SJa9Cpj6i5m6CVg9yhv/Chy/Cp3/C579yp7/E9Txkla3V5nwVFl4i+D+S2A/C2D/C+F/C2F/y+I/C+L/D6I7zCJ/zKS/zWV/DWW/zWa/zed/Die/zeg/Dii/z2r/zys/Dyv/D2u/z+w/EyH4EKS7UCe91WG6Eag9E+t+UGx/Eu7/Ey9/1C9/FW//GmN02KO/GSP/GSS/GSU/GeZ/Geb/Gee/Gqf/HqC6HyN71/D/IyNzoWH24WJ3YuO04yK2ICW3Y+Q2JWS05WR1pGR2JCT25KU3ZKW3ZWT2JKY3YOK6oiT6oiY74KX8oqd8oqe8ome9JSa4J2a6o6szpChzpauzpmvyYCq5Yui9Iqj94ql946n+Yup+Yur+Y2u/I2w/LCo27Sz07i80aaj7aqq7aqr76qt76ux8quz8quz9Ku19Ku29K229LO54LzF06zB5dfY3dPa6tra6t3c8u3t7eLh8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjIAP8JHEiwoEGBWKocNHhFxYosCwfCOfECBoo4EeWYEAGDR4kLcw7aiaFBRAsXLDqkOGhFAYcQJEaQ6ABBSEEyBSps8ADigwcOFgi8GShHAAIJGDIozWCBQoIAdAQ6GHAgQYQIEyZIiLAAgQEG/8Y0kEHDxo0cOHLcuGGjxowHYnrskLLlCxgwYfKC8cJFyhMfQHQ0cQJFy5YuXbZoieKkCZMfRKiYQaPGzZo2bdi4SYPmTJkgd4oYOZJkyZTTp5MgGaKkTsSDAQEAOw==',
"adn":	imP + 'R0lGODlhEAAQAPcAAAAAADFM1jxX0SJa9Cpj6i5m6CVg9yhv/Chy/Cp3/C579yp7/E9Txkla3V5nwVFl4i+D+S2A/C2D/C+F/C2F/y+I/C+L/D6I7zCJ/zKS/zWV/DWW/zWa/zed/Die/zeg/Dii/z2r/zys/Dyv/D2u/z+w/EyH4EKS7UCe91WG6Eag9E+t+UGx/Eu7/Ey9/1C9/FW//GmN02KO/GSP/GSS/GSU/GeZ/Geb/Gee/Gqf/HqC6HyN71/D/IyNzoWH24WJ3YuO04yK2ICW3Y+Q2JWS05WR1pGR2JCT25KU3ZKW3ZWT2JKY3YOK6oiT6oiY74KX8oqd8oqe8ome9JSa4J2a6o6szpChzpauzpmvyYCq5Yui9Iqj94ql946n+Yup+Yur+Y2u/I2w/LCo27Sz07i80aaj7aqq7aqr76qt76ux8quz8quz9Ku19Ku29K229LO54LzF06zB5dfY3dPa6tra6t3c8u3t7eLh8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjKAP8JHEiw4L86SoYgSTKlYcMlSY4YKXInSJkzaNK4YdOmzRo3atCYoULkB5MmTqJo2dKlyxYtUJw00QHExxMpXLyACcMTDJgvW6Ts6CHmwYwaNm7cyIEjxw0bNGQ0GPOPgQEECyJImDAhQoQEBwY4EEgnQAIKFjKozYBBAgIBcga+IWCBg4cPIDxsqFCATEEhEDqQGEEiBAcFVgz+S9GBhYsWIjTEsKN4zoUSPGCIMBFX8b84KGC8OAHH88AsK1RcMU2wChbWsAUGBAA7',
"speedl":		imP + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8JHEiwoMAzOBpgqGKwoUAiQrAM1FIAAIATDgs+iTFAgAIQN5hYgWARRsaBQDQIsFCCQgABBkQQ6ZCiy8l/QxoAcHHlH5gWBCwGMXOzzAsABnwIDMOiQAEYCSSIGUhGBoqCZDxgYCJwSQYAF4r8swGAh0AnIQBEMAjGi8AcCQqoCCPwCwMGWo4sAOCBYcMpJCxuQAJmoA4AFgocoEHGYZEGAig4eGlhRpR/XiIAeKDE4ZYZTmlwufJjREUFVv4lWTHFoRQNASIYIVjjgAAWUzOO4aEAgAkqA6eI2NzjJhcTAg7sIAhF5wcpN7NUAMCBK8ElE2AQvdkEQQq6BrncAxwYEAA7',
"speedr":		imP + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==',
"capacity":		imP + 'R0lGODlhDwAQAOZ/AKqlmopuQKyMVpqETFdGI3psSqaXe6ySVczJwpWKcqSdjuLf2aWKWWdQLJqUhYRxQ3tjQLy3qtnTzk09IlpVRod9aP38+mFLLMLBtJ2FW/f38qmOXKWKVpd7RpuOaaKGVN7c1vTz7m5bMpODXHdfN////o12QqqPWqOFRaeNV5d9TotzRYtxQmhVLoBnP62PWJl6Sop1Rf7+/f39/aKhmqiGVI9xRaSHUph+TZGAZJyFYWFTP21WOqiLXY9ySuzp5J+MVJF4SZR5SOLh3Z2AVGVOJ722pfHu525iNrCkiLSvoLe3sk1EKcS7ZVlKNF9XPpF0SH59aczIv/n595GCaXdqMW9qUIVpPGFSNI99Tp6LWnJaK2tVMmpfPquKWNTLxMvGuKSRWKuPXefm4u/s6aGLUqSPUDsvGISBb3ttQIJnN7iuYYBsN5iQe4lrPIVwTZF+TIuAXPPz8/b19WJUKKCCUaKMYpmBULCTW5mAVJ2HU2NFJpp8SVZBIZ1+TP///yH5BAEAAH8ALAAAAAAPABAAAAfsgH+CfyFSVkoIDksyQwgWglMRCR5rdDwXbRFoURh/cxUtF2xNdHsuTxVgITQlDg0rKy5VSA8EFAoSMnIyCXYnLCoHYSJnFBgzg0cjQFkiDDEEE1gAMoMWcVVpLSQtRS4kfQDIfwsjbA8PJBB5KgFbBAB/GgZ3dRspH0QMHTZXF0wavmjhAwPPCwEfOJgI4uaCk3kfYLDgIOBFihQDBqjpU0GGDj81fEDhIEaMECE4uEwA8ScDCgE9OJwQw4BFBhc7FghKYubGhwMvDpSBk6YLS0FkPOgxUcfLgBgFHIwZJOiHkRwQ3lBRoJPqn0AAOw==',
"locked":		imP + 'R0lGODlhDAAQAOZ/APvx0qmIUvnqtc2ra//Fk/+bQ/p2Cf6xZvuROvp+HP15CZ6AT/6GHfV1GPRnAP+4ePnpuP54AfGtS/nowu2dFv7Opv/aufvmqu+0DfXEXvGuQPtzAfCvE/RoAf/y6P7Gj+2ZFfeWT/XCQf+RMPTRfvS7X/nqxMOaW/zbw/iQQOeDBumLB/qlZPPFVvK+NP/JmPjmve7PNf2WP/bYkPK/We2dBf+hTv7x6PvKpfydT/TThv2rWP7y6fmNOv/DjvnqwPK2If/Qpvd5GPDAHvbdo//r2Pvfp//hx/K8Yv+1c/25dfDVR/+iUPLTb/+/humQE+mQGfCiHvyFIvrciPz35u+lEeeDCvhuAemOD/+rYP+vaPHKVPO0OPO6PPvhu/CtIvjnuPTHcu/IK/LEb/uTP/+7f//Mn/C6F/zBkvXblvjovu+lBOuUBvh3D//XtPG3Se2dLv+pXP7fwPXYmv+fSvKrF/fSg/fotPRrB/qlQP+oW/9/DfqMNcGZV//z6f///yH5BAEAAH8ALAAAAAAMABAAAAesgH+CFQUMDExHgoosGwoIPQZ7boo4VzIegjxkI0WCKQp+in83Bk6CCTaignxxp1qqfwhZfyhtBRZBLwQEaFJ6fnhcXh9KBwc7eUZyZg5Ldz9qMBMmAgBUPg4xTSQ6AwNzRGAAZQ5iWy00CwtjJGkQDw5DLl1vfSdIYTMC8GdAdVEBAkgoYedCEgcYOFQB8QQKHA0ZptDpsKYGmxUqrGCh8EVEhBANQooUKSRHIAA7',
"unlockedl":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IArs4c6QAAAYBQTFRFAAAA/sSU9XQV+4Ym/ta2/d3D9nEN/3kB7qsT/+LI/+ra8LMc/qJS8bti/ePP/4ES/7p+//37/vPq/+HG/c+t/pY8/+XN/eHM9deD9oMv/8CI+3oO/7h5/4MVq4xa9oQwp4ZS9n4n///+/5Mz/7Rx7JwW8MdK9+Kz8a8R/atl//fw+Iw5996g/byI7ak6/uTR+uvI++zP8bAs+ee38Lgc9Kwe78Nw//Tq+KFi+JRJ/30I+eSu/frx+oAg/PTg/+3E7Z8E/6RU6Y4H+HUS99WMuZFU+JxZ7J0t/tGr/u7j7qgE/7Jt/6le920E+9mH/KNZ+n0X+okw//v4/9Cl64MF6oQI8cs+6Y0PpYE8++zJ/+7IqolU88JY9chU765H8bMWzYYdmHtL+u/S++7U/+jU/d/J/9q68L4o88V666YN/4AP76oK17h89duh+XMJ9t2m9r9l//Xt/phA/XkK+3UG++Kn9tKF//v3/6BM8cxa+7F3//Hk8LBO+u3B9slM65cFJqizLQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AsOFwYDc4wxCQAAANVJREFUGNNjYEAA82AeUU1WQSQRpWoZK2npElsRJMFCmeIqcX3dADYWhLI0dkYQ7ZFnCRcLkmLmAtGComxwsXKVQE8wo8iXQYtLTFhYmDNFrMKWFSzGo83gZsTvqCzLnyWr7M0iBBJjFWFQDKuNNLCPMky2s2FMhZojmV4pIZEjl5uvniQlDhWTN1GLjUlUMCvTMRbgg4nFc3Bzyynw8mZYI8Q0uE1No11rClxK4WKS2ZkcHAkR7npxfj4wMUUvh3qnkNBwVaM6K5gdFmxMUODsLwQRAgAIGCOyrkYbMQAAAABJRU5ErkJggg==',
"unlockedr":	imP + 'R0lGODlhEwAQAOZ/AP7ElPV0FfuGJv7Wtv3dw/ZxDf95Ae6rE//iyP/q2vCzHP6iUvG7Yv3jz/+BEv+6fv/9+/7z6v/hxv3Prf6WPP/lzf3hzPXXg/aDL//AiPt6Dv+4ef+DFauMWvaEMKeGUvZ+J////v+TM/+0ceycFvDHSvfis/GvEf2rZf/38PiMOffeoP28iO2pOv7k0frryPvsz/GwLPnnt/C4HPSsHu/DcP/06vihYviUSf99CPnkrv368fqAIPz04P/txO2fBP+kVOmOB/h1EvfVjLmRVPicWeydLf7Rq/7u4+6oBP+ybf+pXvdtBPvZh/yjWfp9F/qJMP/7+P/QpeuDBeqECPHLPumND6WBPPvsyf/uyKqJVPPCWPXIVO+uR/GzFs2GHZh7S/rv0vvu1P/o1P3fyf/auvC+KPPFeuumDf+AD++qCte4fPXboflzCfbdpva/Zf/17f6YQP15Cvt1Bvvip/bShf/79/+gTPHMWvuxd//x5PCwTvrtwfbJTOuXBf///yH5BAEAAH8ALAAAAAATABAAAAfRgH8QBCgUC1I2f4qLjIITPHMaGjkbeiGNjAMFTywuFnlyG3CYizhtR4wABmWXpAUUEIwJAhlRpH9McY1IUCN2tyoLjQQ8dxVjCBLKFQkpEwSMEUUxDkAiHA5pHCJKA5hkIFV8WC8+WTBiPTsAmBYYZngXF2sdbG4mYRmYDR4zJVxbwHyoUWeFjAf7PHg5oEBBhw8MGJzRgbARvxMKaNDQQmTPmyF0KjJqgEENmgMHvlwx0qJLkyXtQCT54SfIFCpWSMTokwNThBsFAggdKlSIk0AAOw==',
"external":		imP + 'R0lGODlhCgAKAKIFAAChAf+AALjogArGASnGAf///wAAAAAAACH5BAEAAAUALAAAAAAKAAoAAAMlWFrRvoMsNsNYAWgQBAZKVwhXxnhCQ5gCkYIXOAaFXE+3su1LAgA7',
"iv":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFADs8ADw8ADw9AD0+AD4/AEdHAEhIAElJAExMAU5OAVFRAVJSAlNTAlRUAlZWWLGzW7O2XbS4Xba99AAA+QAA/wAA/wQE/wYG/wgI/wkJ/xMT/xQU/zk5/z09/0FB/0JC/1NT+Vpa/2Ji+WhqmNPTp9vbq9zcr97etODguOLivOTkwObmyenp7/n57/n7//n5////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKEwUCwAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAHlJREFUGFctzskSgjAURNFnRIIQcAw4zwxRhPv/X2dSZa/6bLpaoM91ksyyDwhr9cKnnqyQXn1Dh0GcmBru+911pEklhqe1dnOBWOZw9LAVmIBDQAmFaHj4vj2DFtPArSpPI87IWw3/6agVltMuyEUL/4Au03mh0xZ+eFQR+TbmyMoAAAAASUVORK5CYII=',
"ov":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAT0HBD8JCD4LFiwSGi0TIC8eJDIiMjMpOjcuPjoxPjszBEgJB08MDEIMCkwNC1MOAH4OAH4PAn4QA34RBH0SBX4SBX8TB34UB38VfXt7I4suIoovII0sIYwtIo0uI40vJIsvJI0wK482LI83KJE0L5A6fLuDfbqEf7qFfbyEg4CAm5aYgbuHg72JhL2Khr+MpKGh1OnW1unY7fXu7/Xv8PXw8ffx8vfy8/n0+Pf3+fn5/Pz8/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/pJ70gAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAIJJREFUGFctjtcSgkAUQ6+9a3btIqKCvQIWLPn/3/LujHlJzkMyETK7rIwJT09SmERdqMwioWSRi07BXc5q7VK5BditLIHO+MNDDpiLFgovklVgKD2g+FaoAX0Jgeb+y6sAEzlaoFGp53VgJ4/Zf9l4qTCeGofWi/UBbxt/NPDXKfkDJWUQtUYbGbQAAAAASUVORK5CYII=',
"centermap":	imP + 'R0lGODlhEAAQAPcAAAAAAAATfwx0FRB3GRZ8Hxh9IRl+IxQu/yQ+/yBG5S9J/0NZ/0Ve/0xj/2B1/xyAJSOELCmJMzCOOTaRPzeSQTuURT+XSE6gVk+gV1alX1ukal+pZmGsaXe4fnizvIC9h5up/5LHmJvLoKXQqbjbvKLjqbj/osvT/8LgxcvlztXq2ODv4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiHAAMs+EewoEGDDgIgOMiwIIMADRo2VBAAhESGBwKc+DeBwkWCAQJoKBDAwoqLI0KaCBCCwAeGKyxIKBEgQQATJi5AQFHwA4EQOD2oxGniwYZ/AirgDMmUKE4OA1JA+OC0Ks4HPP9doGAVZwYJJwuKeGA1QoeGKswSfUDiYwYKGCR8LGjAQMOAADs=',
"distl":		imP + 'R0lGODlhDAAMAPcAAAAAACpIgjJWmTdkqzhstDh0uzh7wEdhklJkiFRmiUNjoUhwsFJwqFZ7t1J/vTiExTiMyTiUzTWn1FmEv0mAwEiGxEeVy0CYzlOUy1aVzFacz06x2FKh0nCWxnyey2+k0X+hzHiq1Hus1VvB317D342pz4q02Jew0pW62qOuxajT5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAAwAAAhZAP8JFDiCxMCDAlVIkLAB4cELESJwcDjQAgQIGgZ+CCHCBAoMD0Jm+GegpMmTBioUWMmyZQEK/zp4AFHihAMCOCdQXDBgQAOKCgQIYEAxRYAABygKRJAAYUAAOw==',
"distr":		imP + 'R0lGODlhDAAMANUqADh0uzh7wDhstDiExTWn1DJWmTiUzTdkqypIgjiMyVvB33CWxlacz0eVy0CYzkdhkn+hzG+k0Yq02I2pz6jT5Hiq1FJwqHus1Zew0laVzFRmiVZ7t06x2FKh0lJ/vUiGxFOUy1JkiFmEv0NjoUhwsHyey17D30mAwJW62qOuxf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACoALAAAAAAMAAwAAAZIQJVQaFIMj0IOgUBBCjsGg8OpYiQSDWpmwAWhJJdKRPUJmM/owAnAbrsBKpFg7sFMIKXFcHM4kKhCFgUFI4AqDwgIKYYaIUhBADs=', // Distance Icon - RTL servers
"merchant":		imP + 'R0lGODlhCgAMAPcAAAAAAAAEBQQAAAACCw4GEwARAA8TAg8WDgQZEg8cFRMLAB0WBB0aCRwgHxQ0KSYoGywhHTUvHyInKy0tISwsJC45Kys+PDo1IjM1MjgyNBxFMzNFNzlLMyJMQjZISjxbXj94aU8/L0c6MUZFM1BQTktXY1xkT0V5Y0B4d1B2a2JfQGxeQ2xlS25sXXFsWHl6anR6el+LjmKupFXRyW3NyXLTyoKAZ5GHbpSRcJyXeZ6bfJqRgJ+Xio+hi6eZjq+qjaWikbOti7GtlLiykKamsrvEp8XFoczXt9POsdjUt83Hy+LW2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAKAAwAAAhuAP/9W7HggQqBCIOEgJBBwQ2E/3L4WEJAwA6ISEQoIWKhQhKIPBp4QNGBA8R/G1LQkKGhCEIbBU7MqAGih0AjBgKUiPEhgRCIMAY4QHAA4Y8WGCQcMTEBiEAWESiQ+DfkAgMdAl2MeCGQAQMcAQEAOw==',
"pa":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAMAAAD5aj07AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABYJAREMFBIRBBYQKhk3ACIMByQdAiIaDS0YACwzHjQuBDoqBjsnEzgwHyotJiEtOC1HDCNSCD9bFChhAixyBDhsBjxuGzh/CEAkBUcsAEIwAEY+E048GVY8BFA8DlU4FUEvMWU3BGM7AktCAUBFElNBBUxGL0pTOFdPKF9ENlRbJ1pTOUh9FkJiLkp7KFp0LlN+OmxLAGpKEWJRAGRTDW9cBmNUGXNJDH5OBX1HEHlWCHRWGWlPJmVXJWVbNHdnDn9mD2NkIHtrLXxqOUhMQEVPUF11QV9qemNiRmBpWG5oUXdtRXZmXXtrUnJzV2BqaW51ZXJjekaSCVSMJV+bM1CoAlKhGFOzC1+/FmGxHGWSQG+QSnWKV32FdHavSH+LiotrAYdjEoVzA4RyGphjCJR/Dp18AJt6D5p7H4JmKYNmPoxoMJN+IKx9A6N1G651HLZwAIl/WKl/X4qCF5eIApCFOZqBOaeGBq2aHLePDrOUFayLKqOPMLqcO7qhAJaCSJGMT4KDZYqdbIGTcpGFe5mRZpOSc4eiXoKqYZGqdLSbW7enQ7yjVqulYLCofpXNbcWQBMCbAcWtFM6qFNSkEdq4Cs2rMcWyOOOxBcquSNe+WeDFTImWgZGThIKApZmlhZimkJ67hqWOl6WhhKSkk6q0h6q3lreylaqusai2oaq4o6CysbS0o6Cy0LfVjrjSnq/Mo7HNpb7Io7jIqLXGubnHsK/G2qjawLHJxrzFxcfIi87Hm8fQn8fBoMbEsMXHvs7Yss3butHKodnVrd3Wtdrtufb0lOnpu/bqtvTqvP3xvPz9vcTXyc3ZwcXb2c/X2dXYztjVwMHd6sXa+dfnzdnmxtzkzN3vx93k08vl+c/s99Ts59Dq79Dj/dXp9dLt/9b0/9z3++Duzuroxevsz+Ts2Ovl0eH02u321vHpwf3zxPvyzPr4wPn5yvzx1fny3fv41ebq5ubv+ur16eH39eDy++f+/f7n4/D34PL18fH2+ff68Pb7/v3//AAAANncWdcAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAEeBJREFUWEftmXtUk2e2hweZgsrFSkFAIGiLIN7lkmABISJt4ShIEUERJAGTYCUoRU1CQEUUoVJKJGhEnIQRgxlsdRKjeLyRAzaGEqyYEAiRXIAGCNGoQDkzZ5z9UWsJ2rXadea/mS+LtbisPPnt/e533/jDy3/d84d/Herlvznrh4GBAb0Mnk65QPBb3Pqr/gJSv66zXy5qarp8q7Z0++rV22sFUoGUL+3se/J28q+x+vWyAZlMLpM3XblcW3J89eqVK1dvL63lcvkt4j6xZOhttF9hyfrlcpkOWE2XS0p27EhYudLZeeXK5JLjR7gtQxKDwTD0FtxbWbJ+oMjkcoCJvinZkZAYv9l5tbPz5sT4hO2l/D6jeAihiadrextrAGHJ5SLFPXB8bUJi0rZEp9Ufr3COT9yWmHD8VovBKDYMGYZu3Z4GewurEwhAEgmu3FN06RXJCUDYnJK6eGX8tqQt25L/u6WpWSw2iZv4R7jmsDdYXV1SKcBEAoFQINJ3/V12Gdzu/M6FTUWrl7skxi/ffuFCSuktsaGfzxZI5WawaazvHwqFPK5IBO6SKfR62VNh14vrc9LORfvMiROlvOPg/F55lIPT3KVGcTFXKuqXd06FmbG6pG1XeXXnajhSuU6nk+ufDVxetWq1Q+KKmUeL7WKMd5Y8LOeC3+a5zCtaNVcAHygSsKfAprK6vm+7VFfX0JAWzZHBGeo79Xp+skt8UpJD6uyURR9vD9tgWLXKwcEp3snBIcHF+TI4lR37X7/AprC6pMKrDRcbblxMS02VynQ6vU6hT3FK2ro1ySnFIcFxs8tyh+TNiS7x8dscXbZsTUos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',
"cw":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAMAAAD5aj07AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAkFBA8OAxkIDBoZCBwZFhQxACYTAyofAC4lGSspFCkpGiwyETEpDT0hACgnITsoKzg1JjI3MDs0MSRQBDRdEzxTGjdCKCtsBjltCjl/CUYoAEEzBUA2GFw9H00+LFtKFUdEKENJO0hFMUhFOkdUKlJLJ1RUIFVSPVtTOkJvH0x6GUZrK0x8KlZ8OlpyOGBBD21KCHxTDXZeInFfL2lmL0NESFxLTVNSRVZUT1xlRFlnVGBeTmliR2JhXmpnV213VHRoQX1gWndwVWp0YW9xbH1tY3JxYHtxZXt+a0aAF0SUBU2SG1WNJVaLLVCmDli5E1+hMWSNQGuJTnqKUnGeTX6WTXmbXWiIc3eHYX6BeHysVnu9SnXCOn6DgoRXCYZpC4BoH4plH5NmEp57E4BvPIxwNJV8Kox/ToB9YZiFFK6DAK6NKLGbIoeEX4iDWIuEaoaBcoSIdYmbaoeWcZeRbJyRZ5SSdZKSfZaseZCydJ6xd62bWaWWf6ekd6akfbWteY/CbpjQcIOahI6UhYmTlJmNgJWShZSpg52khZqljpamlp+npKCfkaekhqWjjqyihamnmqG5haO6kK62l6u2nrCyibu2iLe0lraznruylKa2paKyu6i1s7Ozpa/ckrzEjLDImLTemL/GrLzJornJrbzFtLjHvbzbqLXGybrR3ci+i8S2mMnKi8DHls3El8jDntHDntLOmcPAqcXIo8XEvcnFs8fXucrXsMjVv8rZvdnEs9PUrdjSrNnbq9DTu9vUvuDRrujivPLqu/r1vcvYzsPY2s3T19fTxNbVzdDdwdjcw8Pb+dfnzdrnx93lzdvsw93k0t3m3M/k6Mvm+c3q9NPn9NHj/NXu8tzs8dTx/Njz/t74++Hvzunpz+Hm0uPj3eLu1Obu3Ozm0+rq3Oj22fLrxP3nxvfzzPz0xf3wzfnz3P781fj43uXt4uzt6eLu8eHu/+fw4erx4+vx6ePy+O/09/Xz4/Hz6v397fX38/X6/fn79/3//AAAAAAAAK5rAZkAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAEg9JREFUWEftmXtU09eWx+8vBCtSqwGtj6sXeUgTFIU+LGBC9EIIKIpWLeID66uWtmoS0KBWsCUQHoYkkgghkKkTAdGphgZ+4Y7yCogxNA/KQ5SQMWaCCb/EmU7HG3JrF/f84oNotdO71l1r/un5wS+PlXzWd++zz9ln7/xh4p83/vDPQ038zpqYuGc03vutLn21v8bHzRMT/2Ey6Uy6iYl/bz53JjN1U+qvYl/FuufsNZp0uhGNxqRWN5+7cPz48Q+WhYcvSz1eVvYq4MtY/wlMA2p0JpNGq9VqAOr49u0b168PDw8LX78lNTXzbPNLcS9hIffu9ep0Oo1Gq1aDm1bdjKI2Jq8PX7p03vzkjes+OHZNaX0J7Res/9WYdBoA0mnUarVCrdZr9RfObd+YsjZ5/bKti8PWpqSkbPzwcuvoaOcvaC+yfjTptFqdpqdH3aNRK5oVgKZoPvMlkLUufPPWOeFrUzakbNzy9bVrra3XXoS9wPpRZ+oFDIBQqN2sZrVG0Vx2fMsH4eFL0+K3LluzJjl5zYfHMlNPfP3t+bPP015g9QLTFG21UqEQVYQCweuyM8dTly1fFYf3T+zZPGX2kuWZ7y0NX775RE5WfJwn7XnWj/d6ND2KGnFJMau4BrhKq9foFOeAqvVrluKptACSHf5TB680JmzevCVhy5bH4KkZHrDnWOO9Go2iVsw5zT/Niheq1SAgwBvHtqxLTlkbFj9t0+vLU9+Ks24OmzVr3pK5s2cvnpPBpHko82Q9Gtehok5XV9+oSk/fVosGhFZfkzo/ZcOGlDWbZq1bsmb+mtnLlqSkzF+7IWxeGPbQpYYC3+xn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',
"ew":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAEYAAABkCAMAAAAMlLaLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABUKBR0TAi8TIiggACE3HzEmDTAuGT0rHz86HS0vNTY2KitGFjVNDzlCGTZaFD1cKTBkDj1xFUUnAEQ0CWM9B0xFGFJHAVhFGk5HKkdGM1dVNlBbMkl5Ek9/JUl8LlxuLVN3Mll0P2FECGpMH3RaCn9TCnFZG2RYIGNbLW1aK31xLnxwPEtPS1hIT1hVQUxgR1x1ZWhURmZkSml0TWR1W3RvTHxmXnhwRHFxWWhtYWtxcECAEEqPFkqaDFiQLlqtHVGzAGKHOGSpM2q+KmmNSW2XRXGJWX6QUXidV2iRfHyGbXWOcH+DfW+nSHOpTX+2o4xsGZlnEolsLY9/KoJwN618EbN1Cqd8J4t/XJJ+S4mBGImiMqeFDaGLEr6eG4uDSoKDXomBUZmORp2TWYSCb4OeZYaZbo6YfpOUbZmSYZ2RbZaTfoOrWIO8WpmoWJSqeJCybpq4e6efbaWTeKugTayhWrWoR72rVLyxX6+nbKezcbuvZ7CjfbG+ary0doHJTZ7KfpLVZZ7Zd6XCVqnCX6PCabfDY9i3ZNG/debSFMrBbcfCdsTYasfVetLEYt7ReoKPgpOVlIe3mZumiJimkJ69h52oq5u0pa2ag6OlgKWlkKe7j662nKq5mbq0gLSznbi1kaKooKS6oq23tJvOo6jPiq7Glazfi7PJmLvLpbvKrLXIur7Jt7nYoYvXwLbLx7zO1MrFic7IntTTgtjWl8HFrMjGpMrcq8LQs8fctM7cvN7WrtLYv9rXtePOgujciPbXjOLOqufVv+jWt+bpu/XqvPvyu8DHw8PSyczdwsPa1M/Z2NHayN7Yytba0MXb48be9dbnzNnnx97ly9npwt7l1Mvl/tju7NLr99n0/fHc3uroxeDl2+ft0+Xu2+nu1uDw0Oj32vLpwfzmwfnsy/Xr1PDs3f3wxfz3zf/6yvT81vr31vjz3ebq4+Ht7enu4+jr6Or04+v26uX39/Tz6vjz5PT28vH2+fT4+vr8+QAAAAAAAAAAAAAAAAAAAFb4MNMAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAD8pJREFUWEftmG1YU2eax0dGQYwSUFAJCKLyDgKCGN4UoYqCMKIVC7MC4UUQUXBZMoIIbLcGWWgILAgDiIKOuxIZDSB0TAIpDYGN0GIIIWFC2CSESUJ2VYjS+qV7n5MEwbZz9ZqrH3tHDpJczy//+/U85/nN97+I/eYXoXz/K+an4/h3YrP05ueH/ycxr19NT08LBMgP2Ci9/cGDKw9y793+cfSPY5beoAyBgMkFY/JHue23rhy/dPT8iSi/I0d/90PUDzHv3r1+82r6m9HRHiaXDsZFUO3NV44fdziyy29/xJGwQ2FHPwR9gPnu3bu/vnkzLRjt6Lh3uwfWA4bH5FKbzx8/au+wy8/WNyriWFhY2JEPOKswS+/evFn82ysBv6Pj/t22ujoqd3x8nMfnccGjmEP2DuZ+trYREcccHMLswlZzVmJGBdNvpmdgVUdHXVtbW3X17R4eiqHfOhoScjDEfpf5rp07jxwJC7MDW8VZgflLS3s7ly/gcjvu3kesJrq6g8+TSqXj7ecPHQwNDQ+2x9rtCNmxw27HjpDgkODgFaBlzF+ac69caabSmXRqQ9v9YRqNVh/t2cDnAYefax8SGnr4YPiOYBB1MAQMua7kGDD/efz48aOXrtyiUqm11W3DI7Rh2v3ooMAOiUQ6vng++HDoQVi5A5aHhsJ6lBMcvHlZjx7zrzExhw7FxFy60tzckuEDHHApyKfau25iXCqV/ckCgQRbONgBIHizxWb4BRR7e3sDR4f5r9LQ8JDw8PCYo+ebWzIz9/sEBgb6eLdl1tGlMt6CjGu+Gb7aYuf1DAfsZotNtpsc0L8ddpmvxpSGgoWX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',
"rap":			imPNG + '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',
"upgr0":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABo0ByQtFCk9CyY6FTI9Hx9FBSNCBiRBCiVMBClEDitLCSxFEitAGipIEi9MGC1SDjVKGjVeCjdYGDZJJD1TKDhlCjZgEEFdHU1PLERWKENXNVVIJl1QKVpaN0VqHFFvHVd8HkVkJEtlM010JVFnN1V5KltzPl99M21HKGNYLGxZPHVdKmhmOGF/P3hiK3lkM05ZRlZUQ1BlQlxqSV1kVVp0RF9zS2RhSGRiU2Z4SWV6UHZsR3pzTHt3Vnx8Z1eKH0+AIVqIKlqBNF2SJ2eLOWGTLGOUMmiVNmuTPmqaOW6hOXOnO3izNmWDQ2mBTmiJRmyEVm+cSHuCWHGTTHaaS3qbTHeSW3aJZHmFYXiNYnqNanuFcX6QZHekQ4RZK4VqNYNwPIV4SYV6VoK2PYiCV4iTXZSFVYmKa42PcIWVaIeddI2VcYybdIybfJWNZJSTa5iaeIavW4O7QoajZ4uheJagbpWleJqzfqKZeKGsfIbFPobRO4vIRY3UQZbUToiLh5Odg5WcjJmdgp6fipWXk5agiZWqgpyhh56nj56thpuri52zjqOnh6OukaKonKKziqS8gqW2kKSwnKa8kqyxk6y2nam7lK27nbCvj7aulLa6l6q0oq+1rK+/orO8orW7qbq9ori/qry+s7u9uKzDlKzBmrbEnK3AobnHpbzDtr7DvLzLsb3UqcPEn8TIqcTLtMHLu8vOscPUrMTUtMfVusbZssrSssnUvMvbtM3avNHKo9fYrtPaus7jv9jkv/Drtvz4ucPGwcbJwcnPwsvOyszSw83Qy87cxNHVwtLWztLcw9TazNjexNjczNXW0tXZ0trb1drb2M3iw9jlyNbh0dfr0t3h2d3q093w1ejoyeDh0OHj2eHs0+fu3OLw0+Xx2uny1Ojx3P34wvr53AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADlQ5SkAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABEdJREFUOE+NlP9fE3Ucx8+iogIVh0hLtxpzmF8CF9lO8VZDmMhGGRkWMhdrsahwFy4qGkWkFnmAmc08E9FgnUY3BAU2FpvUHG4q6scci4vZ+j8+fY4N2MN4PPL9wz3uy/Pz/vJ63+OFwXsM7B45+H/gWT5R0AfnBa9dRx/3xUp9BuEkPPrh0Lxg22kIb+RBeOn3Ud/64KTvzIEdh7j5Stfuh7A35ayvrTfyXSobafJ1F79/IRH8ka91EcLS7N8CtYubpio67uQlV3DPnThRWmhPAEeVPLjvcq80o4PbvuQZf9brkfTkpT+n7bq1XbY3ATyed+PiqdufK3GF6DH82YyFFonwq+QHU/Hkx90vqlZh0Hf6GgPh+KXrmzJPjikVSoodjnpokpCnLElJffThRxaIk47+VCbEztRkZ8l+ILOEwsXLXsNNx/6JovB4o1GSwAULFj50/7K6pLbIYD5m2SGT6pIksifTMjJwkxcR0Sh/8XqHzQrBIpWg6NOXy78NEFjhVk2RWLJULEjNwMkwj02T6IQnTOLqRuvWLdqGV9sN2Da1RleiEoi1KiXhiuWKs9Gom2i0NtTVvVlUXFmFqZ8v0WlUArXVKqdjheNJ0YOXljd80tioKSpvJ7FiXZFULBFkipWEJxGc7sCrtFobrdJSBrixArWmUCYTqDQ4NVM1oTiltGpKXqjg0N9Tn/3AffL0Qq0ORx3OpvTE69MKrVqr2ggQ6GSI9YclKrVU7p5rcPbOI9I+oVp1EK0WC0VM8ne2abaoRbwkM+rEqqMXItnyTRYwhUCOqzYAsU6jlvPruCs8Hjmp990J8T1OhKqrBpZn6mSox/+GC/8+58qpiTBAPdrWrbOYn5YskjTPTj13wKx4O4f+YpdjDGL+ATvbz6xUNCcZwvHOEhITIlMuDUhqEmIH7CAcAgaDPU1KxQWMT4QkOoavIVa3+DuPBCG2t/xrWwSBNULBxsQueQlcxLsr3rPfdJ7rvAqxrlcKXroAAkNHVmxIN8d1jv0VXg+pqF1N/hr6spNFU9+q1xX2+bm/mKeYNaK3EInWE9vQsFlkatljYx00G+ANwN/FhAAA5t3te4y5ZfTsJJSR0FsYN0XSvoDjNm8AAEwB4CQNlnoqP19oJF3RcNhFldUcMuoV7TQ1yIWAf9pSQk6Gam6q7aSOU7kmcneZQoTCmGPuoz6iKbo/AtBeYt5zvrWZbGUDU4BdS5iI+jcMtuqWj/XGHjc30UszHFp0HBzvaKU6zgcHnfbczT2sXV81NGT/YK2hiwGc/ZeOiZhbTRtA8OT+yrJaBoz0jUwAe9XmHnCTYfsATV1hB4KTCSC8fHjnyqyd/eCPEDfSTZj6wd9oPpZ20X/O+mzcUkYPVhZssA2BQV4pFIHA8LDbkejGM94z7vimprvPCQASA5xjOll2Ltlcj7GT44EAr0TQMcbSg3dh81szhFcTi8bu/wUUhzueP53uUwAAAABJRU5ErkJggg==',
"upgr1":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABULBykVDC4lCEwiBkMsFks2G1cnDVQuEk09J1U+K2MsBno+Ck1PLFpaN0NoHVhjHVFzKG9OEXRGCnNCG3lXCnJSG29MKGddNn5IKHlVJnJaOmR9KXltP3txN1ZTQVBRXFVMclFaZF1eeVtgWlpjfWRba2ViSGRjU250Snx4THx4WWdofn59aFVcmVtkiVlho2Nqjmx1g2p0mHN6nmBqrVuHLWiVNHKqN2iCSG2TRHqDVXOaR3mcUX+AaHuBfX+cYX63QX7EOX+Ih3iBlnuGxoM+CohGFIdcBphLD5FaA59XGIBPKYBUOpdZK5NcNoxhCY9qH5hlB5plF4RtN5FmKJplNphzOqVOCqlRC6ZYG7lYC7hbFaNcKKJnBKx2CalkJadoNaN4ObJlKbRpNbNyO4l7Q4h3U5RrQZh1SJV5Wod4aa9sQKx2TL14Q7h9UMRYCcdiFd1mDdhnEsp5O+RlCsF7RpaGPISpOIqES4yKW4iTXZGDSpWKVJKUXoeJaYuTaYuZdZiGbZWWZ5uad4KoWYK/RYinaJWlepi3dq+HR6uBWLyASLiDVbmXRKeOZ6iPcKOZaqOXdryTaqmneYXHRIzTR5DXTc6dOcmCTMeHVNeJTdiMV9uSW8iUaMOadduVZMehSteoSdOkUeiWWfCVVuaYYeOsXOe4TO+1U/G5V+OhcoCKlZmahoiSvJmlipqol52xh5iloqacgKWnhKismaS3iae1lLWrhraulLa0irm5laiuoKyttai0pau3sLa5pLi9tK2zyKvDjrPDm7jRmbjJpr3FtrrQorzHxcSrl8y2lti8pOargemxh+u5lcbFp8XMt8HTp8nYttHKo9LOtdrbrtXVu9TlvPLGqfDSvPDrtvz4ucPKzczYw83R2NTZxdjc1tfmyd3q0t7w1uDfzejnyeLr1eLyyuLx1/34wvr53Orr5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ7PC0EAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABHdJREFUOE+FlI9fE2Ucx68faGVOJ1kZ2fqlO1sght6dDrGygsxwzoDyJxiNgCx+JAZiiJsKxqgZmIwNJx1XmQTWYMJyLsNBYXVjs1Eb63gON7b6H67nbmMs6/Xq+3rd3XPPvZ/P98fz3BfhoubsaVAfLnqiRkffCNyYmYx7IsKYdY07HGMjDguk1RcHR697PJ6baB4EtMPlAiwbmpoC42P9hw+qdbwNupmbFHlqeirEAkdfPQPv/Q3vV6tqDx3StdDXYyjCsX4wHQIMbdaptikVdDAIXEMtalVNdW0tRK0zqggHAAiZ71ds26Tcrdy9NfnK+Y19ll5Lj6amWqWqVg+6opoIC4LTzqUnFEoeVCqTvlqd9vCjy9I2WCyamoyGIdc4wwoo4rcPT0ibP8/KUkBMuSffbAd258TzK23A73IygLF09wnekSupax7Z+8W5vVmboOYeZVZ3BioVzUcfX9Vrs122/VB6bxI6IICXlpfe92nnudMKpWLx4sRkaYaZ9oS9Vo1MkpKSuuaxRVuXr1o9wYPXjG3ZBxLOfpaz6NY5SWjdwJ/hsC/s9YXDGhlq670zcenXK9Oem4Tgb4YlmXkJZzubEm55AK3zQYIn4eXzqFFNndQVZM6n/QHBHw0vb86943Rnc8JtqCbAYwIJV3gDGrTkiJ3963LKJQhebCKNb7yZ19w0J1nm5rUEzcjDIyON+04Gv03ZMMkhZyiSNBmrCnLvklgjjqMgfPFZJSRVAmypT37HIR0kb0aSSpZ540FB1VdKaukgWPZUA4fktgkk2Y6a/+E28mLO0IVCQX/9eheypcAAgywszEdhhDFJb9S/VVps9YDQhfVjyDt6kqx6tXx/pcQzG2Bs5BVRen2R1fH0EPIlSVKFO3e8mCjiSxLLOFJPX1gEP1MljsYR5BeYdcHc2+dlSqLu4nW9Xgl1oNg0am+8ivxugmvatmy+m4/xX87daG7rewtl645eRbifSKjZZcyeq4llPcurpfipVgLH079HuJ8pQzskTW8VBSKS8bqy4mPHMAyS/RCM1BveYCHjzAdjHkBVBNH6DIGv40EjX28Kkivc8RwUdstMDz37SStBYDx47UyHCSbU3lZVpY5P3OfzaqSmvPTWUwSG8TF6aNo9CnccHgzRQUjC7Yns0K9qkZE0iHECE2N81hwLWOZj6Ny066VMuTXm3SzXw01rWoiLFywQH3fxYJC18yfj3bKyF3LnyzXucCDgNstJUvt2m/4VHBNDa+SE3sM6i7TajtcrK7fPu8cgl4qg1RgpyqSvynmQICCKWQSQAxznZ6z5+yvKXsvcZRKqAK0Lxl2MEzyZPhwBoQU8BRUVFeVl25foig0R0KDV7itZATkCP87EQGDNK9+xMz8nWzPyDUV1kSa99qOWPqenHsNx/KgD/lwRQZYFIzRNwwYIQN8HBlL/Ic2wLJxuwHDxWsjNgJMMG5hphaz1ZFE34PjexLIX5GuldfD/j7kW5qPqsREssd/S0zMs9J7Z2f8aAdbl5/X+F5xd/DckPzbTuvnomAAAAABJRU5ErkJggg==',
"upgr2":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAC5KFzVMGDlXGENbHE1PLERfI1tXOlpeNUVmH0pnKE1lM051JFdtOlJ4Kld3MlZ6MlxzPV58OmtkOFZTQVtgWmNgSGNhUmxsWWZ3R2p3UnZ6Unx4WWRpb2txbWxwdX9+ZH58bHV5fHp+gV6ELWCLMmiZLmWTMWyTPGydNGuZOnWnOWSDQWSATGiGSmyKTW+HU2+KUm+aQHCNT3uCV3GXTnWcTHmWWnmAaXyWZXehSH2Bg4B0TIiTXYuLb4iYbIWTfIuecYueepWSaZSdbZ2bcpybfoWkXImlaI2oc5GhfJGucJOrepird5i1eKGrfqPDfIyNjoWLkYmNkY2ThoyQlo+UmpSbjZ2fgpeck5qdnpuepJ6eq5argZuhi5ynl5yomp22g6CeoqCmh6Sphairgamrk6G0hqCyi6K9hKS7iqm3lraulLO0lLO2mrC7lbi1nb69k6CipKKmq6WspaWpraqtrq22oKywq6u8pa2wsrG2prK7o7a/rLm7p7u9q7W6tLW6vLa2wLS6wrm+xby/yKjGh63HkrLNjrfDn7HMk7TNnLvNm7nWmrbMprjEoLnCrbvPpbrDsr3Eu7PSoLzUor3cor3aqL/Xs77gpMXNm8HbncHJpcDLrcLLs8TKvMLco8PTs8XRusTZssvWtsvUusjbs8vZu9HKo9rbrtXTvtLbtdLfvcLhncLgpMvhtc/gv9LjvPHrs/Drv//xtv35tfz4u8XHxsDEyMTJysjLyMbM1MnN0szVws/dxczR1c/V3NLXxNDVy9LexNPZy9ncz9HU1tLV29Tb0tPZ3tHU4dXa4djc4tvd69TixNrly9rozOLiwe/nxuLs1P31wP/2yP76w/v5yPr53OPl4+Hl6unt4+rs6u/v8Ory4/H06/L08gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKBcQJYAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABAZJREFUOE+NlP9fE3UcxzHRrZMm2NpJLeOLFSpB2XIBRSmNDl2L0LKyb7NZsdMSjEr7JpGfzcnH/NKdzZV9+CKOjDMHXJmUGiZhNBDvS9oq/pP1vtsYNvjBz+Nxt8c+99zr/Xq/Prt3Rvz/a2LjU7G0rcTXjLTdocaCxusCm34oLLgucMPIjoILE7Hz0+C00rHGqwNNdzz3c4I7pl1bzs3gMVZYcfpsy9OLjr67D57+tK49/t1njq0zgE3bbq8bGjq9dlHFOnh6cO36+OBuz5bp4MSG4ea6luHhlmdeeP5oPL6zpa6iva1TM5AWz5UdV39fn09bDHPoW16Ot709cuqVe1YdmSHHC815ljzPl91qpMFhNUcP7jxQsqRk9Yud0xR/pCs3/ykrkhSRJNlhpS93rbjrzuwHvOng33RlX5+kKIooSZIodVfRg6vvK1laNA2kq8cBkzRUEUUlMl5Nx9vbXI/vT1PMt4Y1SAIUPkBV/cY6dUBTJ3PF3CCKmpp+SSJo9jWYEycEnafAgXxrr9g/icmqpi2KeU6u6yT7bPXHKTBWuNCjiv0Jg4mbCDdPnpvrWPVm5Ucp8PttC8OSDuos5KNLNlhqnHs8r742pfjOGfNxNammM7Iqq4oaMTBl9Y+wL304qRhrPGOQ+8UkqjetquBRNaxh3E/cms9Ogu9v/MTcKyo6mNBVNReRXrPdVsMsLlqZBI88+F4zDR6TDjUswYdpxNiZ5eXOBDj46KenRs5WQ61Ujpo28FUWl99bb1/h1cG/fNt3XfxjxNqraono4ciyJq7K1twFSFv7Afx34oMA+e3iAOv1yAAmNaGRiCpvpqlZuQi5EAbw1+1c8JBv7xc4lBtOWoNwFLFflMPWHCqLcqFaxAG4j8UCL/A8xrgqkigtKbIKZx1xWCiTiZrFoNpWAL/CAoHF+TAxPhxRQQoWdKV2VxnnUTdmU3OLkcsH4DEeCwLieZ6EyP22BlWW4UhkRd1ko3JmF2XNnZfrQijQlhGPkh5C6nlewCQwf+kcmyMsj4+HN9lw2U0UY7evAQxh3JERH+0KhQjBLhQQuNK7ly2xWQxGo9GGCXYHEPYHMEI9mBuEHKMEihLeFxAEp2lZeSlPnAwnkKBAtAYxrkF4T6ce+NgJATYFsFBGZea49957Q6bbT0gwCO7BETrE7j6f+j8KUBnzn6Obn3TbM+ebFizHQogIIAB5IPaaV+Ey7PXA7x96rDibMmXNXswAFQT32PsGq02s1DvzT/QEwQK+zcaUUlSWqRiByxCPA6+z7IFf0mbPSYKxq96HfVR5LYNDHDQSeIvd+vUMY4+0+v2Y49wQHE9Ia+hw57nJ2Zs2cY+Tw+Tb0bGxjo7o6OilS9cM6P8AlcpIworLO5cAAAAASUVORK5CYII=',
"upgr3":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAE1PLFVMKlpaN39aFGVdOHJZNGpjLXJqNVZTQVtgWmBZRWNgSGphTm9sR2RiU250Snh6Rnx4WX59Z3F+gHF8iX2AVniCi3iCk4V7OoZ9Q4V4Yo2BPpSFP4uFRoaHVouTWpaKR5KJV5mVWIiKaY2JcoiRY4STfYaYcoiadp+PeJWSaZmVZJuWbZ2aYpydap2ceJikapumcZqrf6KTS6SXVKOgXqmiXLWmWqakaaOqaq2jYa+tb6akd6eqea6sdKqtfLiuZb2yabW0c7e2eb20c7m1er25f8G1ZMKyasW4b8y+bcK8csS+e8q+c8zAb8XBe8rEfdXGbNXJdNTKe9nHetjJdNnLfN7Se+LVeuTZeuvcfPDdfe/iffPjffXoffnof4OHiYyRgYqSn4yckJWcjJWlg5Kjjp+rhpysiZ6ulp6xiaaohaGzhKO2iqW5iquxjqq5hqm7jKK3kaaynKS4kqm8k6q9mraulLS6hLG9jbi3g7q7grm5jrC9kbC9m769k6Sqsqu6oKzBk6/EnbfCkLLDm7TKlrTJnLrJmrzVn7PEoLbKorjHpLrEqrnMo7zMq77Ft77NsLzSo7zQqcHBgcPGi8LIis/LgcfNns3UndbHidXUi93ThN3Rid7ak97bmsLKpMjMt8TTrMHZpcjXtdHKo9jarNPYuc7hvOLWguTZhOvcguzci+rbl/HegvDei+7hhe7gi+7jkPPjg/Pki/bqhPbpifjlhfjljPvshfvri/Pkk/Tlm/TplPTomvnmlPjnnPnrkfnqnfzxi/zwkvbnoPDrtvz4ucTFycTKxMfKzs7JwsvVws7cw9TbxtXU19TY2M3hwdPjxNrlxNvizNvqy9vj0tzq097q2Ozox+Hm2uHs1OPt2+Px2f34wvr53AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+2p9wAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABDNJREFUOE91lI1fE3Ucx8+W6YI6HTULaHAbUobh1F3NqBQztDKKWMk4WI9W1AClACujGYRDlqOGPRGUEYPgYEI3Hu53x8M52GXFSknmGq3/5Prdw2CQfV+vu9c9vO/z/f4+39/3EEGK30/dVuH0uN1tn7hcNVXVLlfT2x9VVDa89dr3v83LBAKPP34+teXuxjZny8fvHnjowLlHn9q7o8HpPuPxeE5v23bP7rrW5s/+EsFLr9yx5XWnu/ucxWItJQjCZqOsh08+8l5DveeMu7nWWdPYWN26iAi/vnT7q/WumoOWch+kCIIap2DYbGT/MwX7qrrboXBTdZ0bEe696eX5Ky3f0lDHDwmCAoAGYAye6dmBLz4/7oRkdaML+SXtxlvfbNv3QClNPUtRo9yhwouTDMNOsQwAozQY/ubB0+0/eJwe5NKH+luytiatx8gACADAdQ3NTc1NTbIdHUPsBFQF3P76nh97epCr0bP5pf1562/YWAzEYFmWYfzDnfj+oZ8Y3zh84ivqDYejyLWrJ8fAGF2St+FOagKMU0dT0CTVOvRmy+CFwQskBclZcHghvIREQ3upYZKgKEshSVFpSSn2832xoMOoUQ+QPrL8BbgwruRrqDgfKrCVW80lZJmPItCtJ/6JwQjG+JhRg5LEkWGYm6YHvvobeaengB61PtFPlpURaBbPi5x44vneHNSa95zoFQ2+u4J8GjoIF0tRL9oI9GhE4kQSfhGMGNGSUWmF4Es3shh6P3ARusb4UzTeuJyi2qcR/RGTFzUjS6EdAQ56wg6qHXJiRRTe8A41AH7oJthTiyxFj3HAz86wKZpgIiiJ8ymwPwAEBjJakXDYDm+mmU7ULr5RSozXYE9joN4IJoJL9k5oFZhCvXFO8kf+wpFcAgLFJmxXNyJEzz42OQ3ogLpvpcDlq6DKHxjAdbq6Bbhxw6ldM1BftSIIC5D95GOq0cdTTZsrLkujkGFgOECr4yYmCAcjajwdy62TZ+aafWMRB4BY43+Se1Fct/mN+HCF9AUQ9BmVhIl0TrIhs3V5Chfv0wVgAzQRpbIEUqPPbloZV6FNL/UJGpkQPLToBJol68lzLYS2S53fJPU6oYVeTYZL4WTwz1wJHMlRfJbN5oPG5No4p4BGChZJj6gyIclLAcneHFXVMieD0YcHaZrzD7Ks1rGc267NPr7CKaD9SRpMT3Ls3Nw6rdEbi0S8di2WWZnAyaBw/hDcQAAwzExXhzZZBUOry65J5BRwAafE2QDcJDPCcVYzjt2fUb2Kk8HFy3gx/NkQftigAHjebDLl7qpsvw4oCB/o8idmrQQA5BGzCcfxzErPak5JLfRo081PF1ryzSYMw3HDzjV5452BBh1LxdJ1ELoL12XuXL2MhBaKlwY9ZoJimC6jZU3SNaBg3643GPbsrr8upmyK/3m36vG/k4AtntEwBKYAAAAASUVORK5CYII=',
"reload":		imP + 'R0lGODlhEAAQAPcAAAAAAB82YSlGfTBTlDZgpjhqsjhwuDh3vTh+wjiHxjiOyjeXzjSo1TK12pqmv7CytLKztpKrzp2rx5G726Cyz6u40r/AwqLH4aPL46zM4qHS58rKzMrKzcvMzszMzsLH0MbM2N3e38ze683n7uDh4eDh4uLi4uHi4+Pj5OXl5ubm5+bn6Ozs7e/v7+/v8PDw8PDw8fLy8vLy8/T09AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiVAP8JFDhjBouBCBPKaNBgxImECVVoYBBjBcSEIhZgSHERoYkLCjKEGIgCBoqBJFy4SJBggsoSJV4kePHwXwsEOHMiUJnTRYl/HFQcGDpUhVCiB1QI7LDCgFOjTqM+FehhRYEVHDisUBGhQAGjHAZW7TDQQgUCFMJ2FMhBwgAQD9YCVSHAgdqOED4ECKBU7lwVG/yuDQgAOw==',
"smap":			imP + 'R0lGODlhDAAMAPcAAAB/DgAm//8AAP/YAICAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIPgAJCBxIcKAAAQQKKEy4kMBBhgUgClyoMGKBAAEmWqSIUaPEih5BgmSYcMAAiSQLmEQJAMDHhi1fRixIk0BAADs=',
"addbookmark":	imP + 'R0lGODlhEAAQAOZ/APV+AfaRA/748/qdVfvKpvl0CvV6APunC/54AvZ8JP/7+P/t3f/9/P/49PijB/2rDv/59P3Dk/7z6v/ewP/HaPeBAvx7DP/u4P62OPzBVv+xSfidBv3o2f/Kc/eQRf/z6fyiM//cr/7q2fSPAfuwKvzQsP/FYvuLBf2uDv+xa//69fuLDv++T//9+/V1Fv+4cP25QvR2APmwJv/VkPSDAPWgAvyqDf/Kmv67RvecBf/lzf/w4v/KcfRpAf/37/iPQf/MlPaEBv/Vp//dpP/gxPipB/q0gP/YtfvJo/eiDvzLpf/isf/Nof/XsvzUtv/IbP+mRP2pEf6sE/+vF/iaVfyfUv+TJf+vGPqoGP/17P717v/VmPusbvmLNPytbv2safaCLf+9dfuZJPhvAf+jU/+mV//DXP/RhvWUAv/Xk/WBAP/38vehBvmmCf2pDvV5H//Lnf/8+fy6RP2XP//+/fafBP7AV//lz/+ybf+/U/++Uf7CWPx9CvRpBP/27v///yH5BAEAAH8ALAAAAAAQABAAAAezgH+Cg39ZO4SIiE0piY0QeAgijYgTYSBck4MKEVsZBReIDAo+C3dHQkMUYnM3RAt+cUxlZC9AIUtpT3saUFZ8BV4qVSswHTNnPCZmdnIyQT9afwwDFVgYLHl6OCRJAD8Ngy0DYwdSU1dRGz0e4IQfFm4PNg8HOX0ciToIKG1sDg51YjhJBOdEETQGDASoQcNIoi8B1CQgUAIMgBFUEnVxEUGAIAVI3iSgQ0iBEgmJ1hBoFwgAOw==',
"addbmthispage":imP + 'R0lGODlhFwAQAOZ/AP/69v+rQ/l8GPV+AfaEMf/RlfqKL/2qDP3Zvf/Kmv6SMvuuI/738f/x5v/kzf/m0vacBP/48v/PgPlxBfumZf/v4f717fu7i/dxCv/27//HlP/BivWRAv/GZv/59faEA/mscf/8+vmlCP16CfyMBf+1MvzHnv/BW/ZsBP/Fkf6ubf/Ytf+DFfulYvuzef26RP7n1fypZv///v/s3f7q2fqhWv/9/P57B//Sqv+zb/mAIf/fwv/69f/+/f+6ff7dwv6mWv2HIf6zLP/VsPvLqP+sYv/Oif2taf+fSfZ/JvigBvR4APicWPqpGf+LJP6/VPuWB//UpPmna//coP/frP/79/mvef7r3feNQPSMAf/juPy3gPhzCPeTSfyWQv+aQPyhL/7z6vmeDPvBl/qpbfusbviECf2qaPeiEvqmH/2pYv/AdP/o1f+uZ/6jNP+oWv+zXP/hx/zRsfuTHP7Xtf/Ylv/Lc//Ej//NoP/Ibf+/eft5DP58DPq4h/+9gv///yH5BAEAAH8ALAAAAAAXABAAAAf/gH9/PAkbgocAFRmHgkM4EYdVGgqQjBU+OIx/AG13kD0rLJWMO3pHNpo8RRshGUgqmn8NGkYCP7EJCjMafAiHMiFVO1F1YDEVHj2HcSxnTgYwIQ8PDjsreFp1JyNfPikadCFsBjojLX8efgFwawVUUxIdTwFuc2ZlkGoYNzWCHlsT0rzIY6fDiRcL0HwAwUAQkAn8EPVBIWZBiRJCmkAYYKWhoDdcbpxD5ILEgZMHlHyQ4lFQDi5BDDxglMCkiJtKBlywpEDHGQy+BFXJAUUEhwEcIGRhEubQjj0UZqAgc6iBl41YxnRZwoEAjUMqUFwJAUKAB0EOMCQhYuFPBjkEKZbc+lNFAIgQbikYOEvDRANNFkzAoKuAwiJBFlzs/IMqlg1lG1y0/RMIADs=',
"addbmspacer":	imP + 'R0lGODlhEwAQAOZrAP/+/f/8+vZrAPumZP/59f/7+P/JmP+SMf57B/x0APhuAPmAIf7r3fuiWvlvAP/69f/Gkvy0ef/BivqCIv727/+rYf/Ej/3ZvP/Ci/2qZ/dyDPdxCPqRPvumYv56CP/s3f6RMvytbPulYv58DP/t3f95AfqmZ/+JIP/9/Py8iv6nWv2NLvp+F/mIL/+EFvmKMv/hxv+aQPuxeP+uZ/VrBPqtcf/Sqv/GlPyqaP/69v+oWvhxB/uyef/Aiv/48//17f61ePxzAP/p1f/27/mrcf2QMf+MJv/27v7s3f57CP+LJPqpbf/Ytv/48vdtBP/9+/dsAPhyB/3Kov/79//59P/Wsv+CFP7n1f3YvPqILv/t3Pd4F//ewf3l0/+fSPyUPvt5DP/VsP/48f2pYv6vbfhzCP2HIf+IH/+mVv717f+wa////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGsALAAAAAATABAAAAengGtrDwYSgoeIYTZihwU3RVSIkjkzFk1rAEwuPpKdDxUYAUdeIZ2mBgcfECMXpp0wVjhKWVcorodPQisLHiKYt4hjGwgNaydnQUBVMSUJJGhGCV9rKjvEaw4KAjJSDlACDBPaHGs6UUkdwJJqZWYtXeqCWgcLGRpY8WtcYCZINEv5yDhhEKDGFgLqprAgEmDNkAEvEAIwVQDEAAqHfvBIcatHhDSCAgEAOw==',
"editbookmark": imP + 'R0lGODlhEAAQAOZ/AP/x5P7z6v7t3/SdBv/8+fq3hv/lzv/69P/cvP/17PiYUffYS/VuCfpzBfhuAfV5HfVqAffZhf/Fkfq8jvmqcf/7+f7p2PZ/KfV2Gf+3d/K/NvVqBPeuKP738fu+j//+/fZyEP/38f/Djv+cRfngqP/38PVzE/nplfbcb/+zb/isMf/Hlv+9hPXaZvTCSPTRYfnWZfeCKvXHWf+4efq6jPffefp+HP+gS/WcEfXTav/o0/jhiPbcaf+MJ/7IkvrbofVxEP/GkvXUJP/Qpv/TrPyrVfLMJf+uZvfQPPfhZvmwevz03P7v5P7m1P/Ytf7ox/PCQvadIvzJovLLQvjNTvnaafjWUvveqvjaU/G4Hf/XtO/DHP1+EPixNf2gUfu5XP+oW//jyv/kyvzln/2xcfZxEPdvBv+SMvqdMPSYFPafF/u9jPjUX/XMLf53Af+8f/qHKvnnifvqw/SeCv7q3P+JIP/u3/+fS/nWbPnfo/vuzP7uz//Il//LnP/o1P///yH5BAEAAH8ALAAAAAAQABAAAAfYgH+CgwRBd3aDiX8fJYs6TiIsBH8Jk4IJWnxhRAgAe24jK2deAoIARwB9Fno5UzVPEmNmTYNDGSdQUSBlaRpJHBSJGWIaGxMBARMbWW0xlwYpcg4TiR4OLQ5rATdvBi8gHYkhXBFVag82aFRbQOGDB3URC3MmAVIMRhAeiQg9KBAFLAiCg8dFAxEhDhiQ8IPNhURkvsSRUQTMDB9XlqhQMshPgwUckPDIQ2IHjC5CMAj8I0DBAwoXIGCxguMCBQYKSgkiwORPhQIDBtCo8IeOJUUsMTxwlygQADs=',
"del":			imP + 'R0lGODlhEAAQAPcAAAAAAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8W9u8i4tNanodqxqNqxqtqxrOC+udPFw9nS0NjT0t/c2+TKxebQyujSzuPd2+Pe3enV0O3e2+vj4ezl4+ro5+7o5+zr6+/t7fHk4fDs6/bt6vTt7PXu7fPy8fXy8fX19Pf29/n08vr29fr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjcAP8JHEjw3585dw4J9AMnDh5OBPucmNImyyVLXcagEfNmksBAC1asYYMFEiULUq6UMcNlEaIHJs6o+VJHIB8KOqpYueJlAokoacCA2DRwEAEUUKhUWYKETJgOkgo+2sBAyZOkVTAoKigwk4AAQ5o4YfKBq0A5BQwEMXIkCRE3lQraSTACR48bKYAUEaKF0UBACkjIqAHDg4YGOXz8uCDQkI0SLGK84CAJk4gDM3BIaNRpyw4WLVxUSDRQTwYIIf454kFDhYoIggpqKiTQE50BDhDkMVsw0h5CvAcGBAA7',
"bau": 			imP + 'R0lGODlhCgAQALMJAJyfokhLU5xmNlRXXl0xCnN2fMzNzX9LHY6RlP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAKABAAAAQwMMlJq73i4ENs7tV3cVdCludkAEiaGMWADAUyxUENGNKcI7ve4BeUDGsG3oSGUFIiADs=',
"ww":			imP + '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',
"pop":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAOCAYAAAAMn20lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAOFJREFUKFNNUEELAWEQnc2WC32/wJbyAxxwdXGS8gfsyUH8Bcqd3OVAFDflorg6bHKU4m+QtNoY84avbE07vTfvvZmP6PeVyhVOJJOczRdYocP74c6CnYKD4YSbnbb2tI/umfF2wynP4zB6KoGegvDmYBJT7UGf07ksV31fCRe+IGyJqkij+bIIAHJJ5a6UKA3ZMIBaLdIcgg2mVXH5ElhdFQBhZ61UEYTXzP9xGKjVG0zn98vBmnZd/EVhKIiuDnJAri9n8+sNrU5HFxkyFZdeCbE21FtMjT1MborJ8+ER+QOubZgWE4PrQAAAAABJRU5ErkJggg==',
"search":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAASxJREFUOE9jYBiaoHlTw//Qxf7/zWcaAenA/zuO7fy/89gOHpy+yViV9t94mh4GBolj1di0vuG/0WTd//mrcsGmg0wG0QVAvuFkHbgYio2B8wL+G03U/b/9yDawBhjYeWTHfwOgOEgew4mmfYb/9ft0MCWAKg36dP+D5DE0+c/0+6/bCXTGEYjTYGDbwW1gcf+Z/piaQO7Xbtf+n704B64RpCFrQdZ/rRYt7H7ymOj937bH/r9Wkw4GTp2X/n/HwR0WKM7z6vP5r1Wv89+63fZ/+eLK/34TA/7r1huA6foVjf93HdmNrsH3v2aNzn+bFgeQJNaAQLWhx/e/do3hf7t2l/97ju0lrMG/L/S/TpXRf/t21//7Tx4krAFk3eLty/47tXgAbdhPnAagHgBQL7l6a7VQzwAAAABJRU5ErkJggg==',
"vmkls":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAASCAYAAACuLnWgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABgVJREFUSEttlH1Q0/cdx4MPc3rXUdvN824PnvWUdVdr27U3b7t1s7Wdc7uOdpvebcOW02NroYKgCJTTIYLIg4MgmAeeE0JCEiEQnpKQBAh5MiEQngkYIvKgdczt7G69tr72k//m/P7zvfvcfd7v+3ze7887SvTYC9/17Zuasb3w+fLW+C+2fGfr8y+urwwbXV89Ha5K/PZLz756f3ei6Ist20SidRu++lK0Wf35uujuO6vmry9FFhb3v/RT80++f/TLsqF1UQJsVPIrDx8+ji+aXnasn1keKHZr3yVcuwO/4iA9pmuoLr3P2KWniNTvQFmegEpVRJu+GLWmmDxNPKcb95Le8NpCje3SIcvc7DODEf/2t4vEG/6P4FFhKNyyz3OzHXHJRzhaL+KzVOCxV1NZX0peXioFmXFkZCeh0JUxMt+FOSglS7WfU4U7SRbvRaZKx2W9zJT3XGA40rflf0gGpzTr7eN1P3DPWzX2GR/SSx/gaLlIf/7PWbBfwN5dSX3TFWSNYoqK0zHJf0N7zTH08uOIK1K5durHyKoykF49yaR4G8uNOx84dAmZo6u39oRW+p9ZI/POtnx3cM6IfdJFdUMRVzLe4bo4AXXSy0RsV1mdbWXSp6TflEvP5Z9xt/5pVms3MZDzTQpTDyMtP0P/VD0SeQbGqhS8PWU0q4vwLMwwfS/QLXLP6Lf7wt2a/pvjVBcdx54fgz3vBbrtlRia85nvy2bE8Css5kScmhS6S97CJfkR1rydSDMP0pjwKv01p7kbMdGpzKZH9jEaYaKmnHdQdypwr4QeijoD4j/5l3yojE2UF3yIPu8XVJ94GZMuH3PxEUbEO7nX8BSh8misVe8T9tXToi5AI0lGWhiPSXGWaXcVbr+SdkUOhqz9aAsPYy55HZ2+HM9SBJHamZ0/sHCDtp5aBlxKWuUp1FUkM9AqaFFwgEHpAYYrdlF/+hU0Z97mtqeG+7N6VsbVrM61MedXUKPOEoxxRNDxHC0fRuM/t5nelO3omq/QHfQgauhP/6x90oqmtZiOy7+k5Q8bUcc/S13yPqbHDLi8DUhKT9EqTWLMWoZVl8UDWyyzzgoe3OrCbixFpaukoPgonaVv0ZD+Bl1Ju9Ed3o78SjIGjx2RxPwR1vAgTdevUZ79eyo/iKE+/ntUph1EpzjP3TseVlYGmXZJ0SVE4z27AUfC14g4S5l1XcNtKud8wVnSk2LxlcYQFO+mWVPAddUFzANqbDMjiDoCZf+2Rdw0GWoRF33MlQtxlKW9Sc7JQ4R60vjM/lvu+IqJBBQYBVFNZ36ILnaHMPHzGI7GCEInYjOWUSa9jEXxF8wnn0NXEoc/aMQZMuP5dAlRe6A4rWuiEfvNKeTV59FbBbGsEuZHtQQqYtasulQdTbD2MGO6HJbGNFi0uShT3qD59W/QUngMl7GAIZsE/dUTdB3fSMeJaCSFf8Y0Mogl1I6od1z2nEAU7L3ZQ+dgO12GAkI36nF2FKJIexFj0lY8Jbvo+d0mqmJ3MeGsorMmlaJTh2hIeRPVe8L+hdXeDqoJ36hlvC0DcdqvUWqlOG4PCffTxNoxji30dA1PyJnx19ClzUNSnk5VdS6qukwufnIMZeVpGmO/xV+PvoZMdoHMM38kNTWOnKx4as4foVryCf7hZrzmcob7ZMwG1PjnB7BN1OCdtfvXSBwTowdWFi2+oEMWerRHy6hXsLQSuSQbcWEihrYi6grjaNKUYLEpBSfKaDbI0WjLuK77GwajHK1WsGufHueojRF31X/CI6qx8Iy2ZSjs3btGUtEVihIifpN9dHZP36QyzbnoaXYsDNMfCtLltaBtr0MtJK9aiAqNtoQWVS5Gk5IOm54Oux7TqAfPyiLd0x34FiyYAwaZTlG0Lbhg3fjEJFbZH0R55/RbrRM1Fw3B2jHfvRkhGoL47kwzubrA7X99yq1/LBL4e0Soj+JYDt4f+udKv9qVZ+kdbdR2+Cb2d/pDm58I/njxEZkn1LYnEO7wukPNDEyq6BVE7BZ+tVcIQK9wvIFimp256d0jpdHGG8FNQs/6J4H/F4ERbS6V4kpRAAAAAElFTkSuQmCC'
};

	//update script (by Richard Gibson, changed by ms99)
	function updScript() {
		divUpd = $d("<b><br>" + T('CHECKUPDATE') + "&nbsp;<br>&nbsp;</b>", [['id', 'updDiv']]);
		aD = $g(dmid1);
		if (aD) aD.appendChild(divUpd);
		if (!GM_getValue) return;
		GM_xmlhttpRequest({
			method: 'GET',
			url: TB36.url + '?source', //don't increase the 'installed' count; just checking
			onload: function(result) {
				removeElement(divUpd);
				if (result.status != 200) return;
				if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
				nv = RegExp.$1;
				if (nv == TB36.version) {
					alert(T('NONEWVER') + ' (v' + TB36.version + ') !');
					return;
				} else if (nv < TB36.version) {
					alert(T('BVER') + ' (v' + TB36.version + ') ?!');
					return;
				} else if (window.confirm(T('NVERAV') + ' (v ' + nv + ')!\n\n' + T('UPDSCR') + '\n'))  window.open (TB36.usoL+'show/'+TB36.usoNo,"mywindowx");
			}});
	};
	
	function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
	function $t(att) {var aTb = document.createElement("TABLE"); $at(aTb, att);	return aTb;};
	function $r(att) {var aRow = document.createElement("TR"); $at(aRow, att); return aRow;};
	function $c(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; $at(aCell, att); return aCell;};
	function $img(att) {var aImg = document.createElement("IMG"); $at(aImg, att); return aImg;};
	function $a(iHTML, att) {var aLink = document.createElement("A"); aLink.innerHTML = iHTML; $at(aLink, att); return aLink;};
	function $i(att) {var aInput = document.createElement("INPUT"); $at(aInput, att); return aInput;};
	function $d(iHTML, att) {var aDiv = document.createElement("DIV"); aDiv.innerHTML = iHTML; $at(aDiv, att); return aDiv;};
	function dummy() {return;};//does nothing. Used when there is no other choice but need to use a function
	function getRndTime(maxrange) {return Math.floor(maxrange * (0.6 + 0.4 * Math.random())); };
	function basename(path) {return path.replace(/.*\//, "");}; //name of a file from a path or URL
	function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);};//returns the element with the aID id (wrapper for getElementById)
	function arrayByN(a, n) {var b = arrayClone(a); for (var i in b) {b[i] *= n;}; return b;};//multiply every element of the "a" array by "n"
	function arrayClone(a) {var b = new Array(); for (var i in a) {b[i] = a[i];}; return b;};//return a copy of the "a" array
	function dF(s) {var s1 = unescape(s.substr(0, s.length - 1)); var ts = ''; for (i = 0; i < s1.length; i++) ts += String.fromCharCode(s1.charCodeAt(i) - s.substr(s.length - 1, 1)); return ts;};
	function arrayAdd(a, b) {if (!a) return arrayClone(b); if (!b) return arrayClone(a); var c = new Array(); for (var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]); return c;};
	function removeElement(ex) {if (ex && ex.parentNode) ex.parentNode.removeChild(ex);};//remove the "ex" element from the current document
	function T(xT) {if (t[xT] != undefined) return t[xT]; else return '---';};//translated t item if available
	function moveElement(ex, dest) {removeElement(ex); dest.appendChild(ex);};//move the "ex" element from the current parent to the destination "dest" node of the DOM
	function arrayToInt(arr) {var h = 0; for (var i in arr) {h += arr[i];}; return h;};//Sum all the values of the arr array
	function insertAfter(node, referenceNode) {node.parentNode.insertBefore(referenceNode, node.nextSibling);};//insert a referenceNode after a specified node
	function $e(aType, iHTML){var ret = document.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;};//Create a new element of the DOM (type, innerHTML)
	function $ls(aX) {return aX.toLocaleString();};//convert a number to local string
	function getCrtServer() {crtPage.search(/http:\/\/(.*)\//); TB36.fullServerName = RegExp.$1; TB36.gServer = TB36.fullServerName.replace(/\.travian\./,''); return;};
	function getUserID() {uLink = $xf("//div[@id='" + dleft + "']//a[contains(@href, 'spieler.php')]"); if (uLink) {TB36.UserID = uLink.href.split("uid=")[1]; spLnk = 'spieler.php?uid=' + TB36.UserID;}; uLink = null; return;};
	function composeGMcookieName(aName, addNewDid) {nC = (addNewDid && addNewDid == true ? TB36.gServer + '_' + TB36.UserID + '_' + actV.vNewdid + '_' + aName : TB36.gServer + '_' + TB36.UserID + '_' + aName); return nC;};
	function getGMcookie(aName, addNewDid) {return decodeURIComponent(GM_getValue(composeGMcookieName(aName, addNewDid), false));};
	function deleteGMcookie(aName, addNewDid) {nc = composeGMcookieName(aName, addNewDid); GM_deleteValue(nc);};
	function xy2id(x, y) {return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));};//get the vID of the cell having the x,y coordinates
	function toSeconds(hTime) {p = hTime.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);};//Compute the seconds for a given human time
	function log(level, msg) {if (console != undefined && level <= TB36.O[69]) console.log(msg);};//Custom log function (log level, message to log)
	function getNewdidFromLink(aLink) {aLink.search(/\?newdid=(\d+)/);return RegExp.$1;};
	function insertTravMapUserLink(aNode, uid, strName) {aNode.parentNode.insertBefore(createMapLink("user", uid, strName), aNode.nextSibling);};//insert Travmap link
	function insertWALink(aNode, uid) {aNode.parentNode.insertBefore(createStatLink("user", uid), aNode.nextSibling);};//insert Travian World Analyser link
	function getColorResBarTooltip(p) {return (p < 90 ? "rgb(" + parseInt(p / 90 * 255) + "," + (100 + p) + ",0)" : "rgb(255," + parseInt((100 - p) / (100 - 90) * 170) + ",0)");};	//by Acr111 (adapted by ms99)
	function getOrigBRTable() {var oT = $xf("//table[@class='tbg'] | //table[@class='std reports_read'] | //table[@class='reports std']"); if (!oT) oT = $g("report_surround"); return oT;};
	function getDR(race) {var tt = 1;switch (race) {case avRace[1] : tt = 11; break; case avRace[2] : tt = 21; break;}; return tt;};
	function getTTime(iTT, xRace, arX) {var tt = getDR(xRace); return Math.round(arX[0] * 3600 / uc[tt + iTT][8] / arX[4] + arX[1] * 3600 / uc[tt + iTT][8] / arX[4] / (1 + arX[2]/10));};
	function getMTime(qDist, xRace) {return Math.round(qDist * 3600 / mts[xRace] / (TB36.speed == true ? 3 : 1));};	
	function setOfferFilter(aOffer, aFilter) {$at(aOffer, [['style', 'display:none;'], ["filtro" + aFilter, "on"]]);};
	function isPostNPC() {return $xf('//p/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[@class="res"]', 'r').snapshotLength == 8;};//check if we are on the page where the NPC trade has been finished
	function composeGMcookieNameV2(aName) {return TB36.gServer + '_' + TB36.UserID + '_' + aName;};
	function getGMcookieV2(aName) {var nC = composeGMcookieNameV2(aName); return gmcookie = eval(GM_getValue(nC, '({})'));};
	function toJSvoid() {aX = $xf("//a[@href='#']", 'l'); for (var i = 0; i < aX.snapshotLength; i++) aX.snapshotItem(i).href = jsVoid;};//convert # links to jsVoid
	function toNumber(aValue) {return parseInt(aValue.replace(/\W/g, "").replace(/\s/g, ""));};
	function hideTT() {$g("tb_tooltip").style.display = 'none';};
	function createTooltip() {var ttD = $d("", [["id", "tb_tooltip"]]); document.body.appendChild(ttD); document.addEventListener("mousemove", updateTooltip, 0); return ttD;};
	function reloadMapFunctions() {TB36.origMap = false; mapFunctions();};
	function updProcRBTT(i, procNo, prC) {prSpan = $e("SPAN", procNo + "%"); $at(prSpan, [["id", "resbarProc_" + i], ["style", "color:" + prC + ";" + (procNo > 90 ? ' ;text-decoration:blink; ' : '')]]); return prSpan;};
	function createCNDiv(lvl, nlvl) {var csB = ((TB36.O[45] == '1' && nlvl && nlvl[1].indexOf("(") != -1) ? 'text-decoration:blink;' : ''); return $d(lvl, [['style', 'visibility:visible;' + csB], ['class', 'CNBT']]);};
	function isThisNPC() {return $xf('//table[@id="npc"] | //tr[@class="rbg"]/td[@colspan="5"]', 'r').snapshotLength == 1 && document.getElementsByName('m2[]').length == 4;};//check if NPC page
	function delD3Tb() {removeElement($g("dorf3table"));};
	function ajaxNDV2(aR) {var ad = document.createElement('div'); ad.innerHTML = aR.responseText;return ad;};
	function setDorf3CheckOption(aStr) {return function() {var aCB = $g(aStr); if (aCB) setGMcookie(aStr, aCB.checked == true ? true : false, false);};};
	function id2xy(vid) {var arrXY = new Array; var ivid = parseInt(vid); arrXY[0] = (ivid%801?(ivid%801)-401:400); arrXY[1] = 400 - (ivid - 401 - arrXY[0]) / 801; return arrXY;};//Inverse function for xy2id(x,y) => id2xy(vid) - fr3nchlover
	function addFillTimeRow() {var tbe = $g('l4').parentNode.parentNode; var tbecn1 = tbe.childNodes[0]; var aRow = getFillTimeRow(); tbe.insertBefore(aRow, tbecn1);};//add the fill time row
	function setUserName(aUN) {TB36.U[0] = aUN; setGMcookieV2('UserInfo', TB36.U, 'UsI');};
	function getCapitalInfo(cNode) {var aVal = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7']//span[@class='c'] | //div[@id='" + dmid2 +"']//table[@id='villages']//span", 'f', cNode); return aVal; aVal = null;};
	function setLngRace(drNode) {var aValue = $xf("//table[@class='tbg']/tbody/tr[5]/td[2] | //td[@class='details']//table/tbody/tr[2]/td[1] | //table[@id='profile']/tbody/tr[3]/td[1]", 'f', drNode); if (aValue) {TB36.U[2] = aValue.textContent; setGMcookieV2('UserInfo', TB36.U, 'UsI');};};
	function getPlayerName(pNode) {var uTb = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg'] | //*[@id='profile']", 'f', pNode); var aTxt = uTb.rows[0].cells[0].textContent; var xi = aTxt.indexOf(" "); var aUN = aTxt.substring(xi + 1).replace(/ /g, ""); return aUN;};
	function setCapitalInfo(aLnk) {var aVal = aLnk.parentNode.getElementsByTagName('A')[0]; TB36.U[4] = aVal.href.match(/\?d=(\d+)/)[1]; TB36.U[3] = aVal.textContent; var xy = id2xy(TB36.U[4]); TB36.U[6] = xy[0] + "|" + xy[1]; setGMcookieV2('UserInfo', TB36.U, 'UsI'); xy = null; return;};
	function updateAllVillages(xi) {for (var i = 0; i < vList.length; i++) {var aTimeOut = getRndTime(1971); setTimeout(refreshVillageV2(vList[i].vNewdid, xi), aTimeOut);}; return;};
	function createDorf3Checkbox() {return $i([['type', 'checkbox'], ['value', '1'], ['checked', 'true']]);};
	function updD3Bullets(newdid, intVal) {var aE = $g('aldea' + newdid + '_boton'); if (TB36.T36 == false) aE.src = gIc["b" + intVal]; else aE.className = "online" + intVal;};
	function getBootyCellInfo(booty) {iHTML = ''; for (var i = 0; i < 4; i++) {iHTML += gIc["r" + (i + 1)] + booty[i] + (i < 3 ? ' + ' : ' = ' + booty[4]);}; return iHTML;};
	function getRPDefAction() {switch (parseInt(TB36.O[49])) {case 1: dRPA = 'att_all_1'; break; case 2: dRPA = 'att_all_2'; break; default: dRPA = 'def1_1'; break;}; return dRPA;};
	function showDeleteAccount(){var aP = $xf("//*[@class='deltimer'] | //p[parent::div[@id='" + dleft + "'] and @style]"); if (aP) {moveElement(aP, document.body); $at(aP, [['class', 'delacc']]);};};
	function isThisNPCexcluded() {return (TB36.O[26] != '1' || TB36.boolIsThisNPC == true || crtPage.indexOf("build.php") == -1 || crtPage.match(/build.php\?(.*)&t=(\d+)/) != null || $g("map1") != null || $xf("//map[@name='map1']") != null);};//check if NPC excluded
	function insertNPCHistoryLink() {var bname = getQueryParameters(urlNow, NPCbacklinkName); if (!bname) bname = "Go back"; var div = $g(dmid2); div.innerHTML += '<p>&nbsp;<a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a></p>';};//insert the NPC assistant back link
	function pauseScript(ms) {var ms1 = getRndTime(ms); var aDate = new Date(); var crtDate = new Date(); do {crtDate = new Date();} while (crtDate - aDate < ms1);};
	function $xf(xpath, xpt, startnode, aDoc) {if (!aDoc) aDoc = document; if (!startnode) startnode = document; var xpres = XPFirst; switch (xpt) {case 'i': xpres = XPIterator; break; case 'l': xpres = XPList; break; case 'r': xpres = XPResult; break;}; var ret = aDoc.evaluate(xpath, startnode, null, xpres, null); return (xpres == XPFirst ? ret.singleNodeValue : ret);};
	function setGMcookie(aName, aValue, addNewDid) {if (TB36.UserID != '0' && TB36.UserID != 0) {var nc = composeGMcookieName(aName, addNewDid); if (aValue) GM_setValue(nC, encodeURIComponent(aValue)); else GM_setValue(nC, false); nc = null;};};
	function removeGMcookieValue(aName, indexNo, reloadPage, aFunctionToRunAfter, addNewDid) {return function(){if (confirm(T('DEL') + ". " + T('QSURE'))) {var valC = getGMcookie(aName, addNewDid); if (valC != "false" && valC != '') {valC = valC.split("$$"); valC.splice(indexNo, 1); valC = valC.join("$$"); setGMcookie(aName, valC, addNewDid); removeElement($xf("//*[@id='" + aName + "']")); if (reloadPage) history.go(0); else aFunctionToRunAfter();};};};};
	function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {var aR = new XMLHttpRequest(); aR.onreadystatechange = function() {if (aR.readyState == 4 && aR.status == 200) onSuccess(aR); else if (aR.readyState == 4 && aR.status != 200) onFailure(aR);}; aR.open(aMethod, url, true); if (aMethod == 'POST') aR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8'); aR.send(param);};
	function setRace(ti) {switch (ti) {case '1': TB36.U[1] = avRace[0]; break; case '11': TB36.U[1] = avRace[1]; break; case '21': TB36.U[1] = avRace[2]; break;}; TB36.U[7] = parseInt(ti); setGMcookieV2('UserInfo', TB36.U, 'UsI');};
	
	function getLanguageAndPlusStatus() {
		var iP = $g("logo");
		var ahref;
		if (iP) {
			if (iP.nodeName == "A") {
				if (iP.firstChild && iP.firstChild.className == "logo_plus") TB36.plAc = true;
				ahref = iP.href;
				TB36.M35 = 2;
			} else if (iP.nodeName == "IMG") {
				if (iP.className && (iP.className == "plus" || iP.className == "logo_plus")) TB36.plAc = true;
				ahref = iP.parentNode.href;
				TB36.M35 = 1;
			};
			if (ahref) {
				aLang = ahref.split(".");
				TB36.lng = aLang[aLang.length - 1].replace("/", "");
			};
			ahref = null;
		} else {
			//T3.1
			iP = $xf("//img[contains(@src, 'plus.gif')]");
			if (iP) {
				iP.src.search(/\/img\/([^\/]+)\//);
				TB36.lng = RegExp.$1.substring(0,2);
			};
			if ($xf("//img[contains(@src, 'travian1.gif')]")) TB36.plAc = true;
		};
		iP = null; ahref = null;
	};

	function addGMcookieValue(aName, values, addNewDid) {
		var nV = '';
		for (var i = 0; i < values.length; i++){
			if (values[i] != ''){
				nV += values[i];
				if (i != values.length - 1) nV += '$';
			} else return;
		};
		var valC = getGMcookie(aName, addNewDid);
		if (valC != "false" && valC != '') valC += "$$" + nV; else valC = nV;
		setGMcookie(aName, valC, addNewDid);
		nV = null; valC = null;
	};

	/**
	 * Create the path of the image, taking into account a local GP
	 * Params: ref Relative path of the image
	 * Returns: Absolute path of the image
	 */
	function img(ref, ld) {
		var imgPath = '';
		if (TB36.T36 == true) imgPath = (!ld ? localGP + "img/" + ref : localGP + "img/lang/" + TB36.lng + '/' + ref); else imgPath = (!ld ? localGP + "img/un/" + ref : localGP + "img/" + TB36.lng + '/' + ref);
		return imgPath;
	};

	//inverse of "toSeconds" -> convert seconds to "human understandable time" => format h:mm:ss (or h:mm:s?)
	function formatTime(sec, aFormat){
		if (sec > -1) {
			var h = Math.floor(sec/3600);
			var m = Math.floor(sec/60) % 60;
			var s = parseInt(sec % 60);
			var ht = "";
			switch (aFormat) {
				case 1: var d = Math.floor(h/24); h = h - d * 24; ht += d + ", "; break;
				case 2: h = h % 24; break;
			};
			ht += h + ":" + (m > 9 ? m: '0' + m) + ":" + (s > 9 ? s : '0' + s);
		} else ht = "0:00:0?";
		h = null; m = null; s = null; d = null;
		return ht;
	};

	//get the active village from the villageList
	function getActiveVillage() {
		var aV = $xf("//td[@class='dot hl'] | //div[@id='vlist']//table[@class='vlist']//tr[@class='sel']//a | //a[@class='active_vl']/../../td/table/tbody/tr/td");
		var v = ['', '', '', -1000, -1000, ''];
		if (aV) {
			try {
				if (TB36.M35 == 2) {
					var tr = aV.parentNode;
					if (tr.cells.length > 3) {
						v[3] = tr.cells[2].textContent.replace("(", "");
						v[4] = tr.cells[4].textContent.replace(")", "");
						v[1] = xy2id(v[3], v[4]);
						v[0] = tr.cells[1].textContent;
						v[5] = tr.cells[1].firstChild;
						v[2] = getNewdidFromLink(v[5].href);
					} else {
						var tmpC = tr.cells[2].textContent.replace("(", "").replace(")", "").split("|");
						v[3] = parseInt(tmpC[0]);
						v[4] = parseInt(tmpC[1]);
						v[1] = xy2id(v[3], v[4]);
						v[0] = tr.cells[1].textContent;
						v[5] = tr.cells[1].firstChild;
						if(!v[5].href) v[5] = tr.cells[1].firstChild.childNodes[0];	
						v[2] = getNewdidFromLink(v[5].href);					
					};
				} else if (TB36.M35 == 0) {
					v[3] = aV.textContent.replace("(", "");
					aV = $xf('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]');
					v[4] = aV.textContent.replace(")", "");
					v[1] = xy2id(v[3], v[4]);
					v[5] = $xf('//a[@class="active_vl"]');
					if (v[5]) v[0] = v[5].textContent;
					v[2] = getNewdidFromLink(v[5].href);
				} else if (TB36.M35 == 1) {
					v[3] = aV.parentNode.parentNode.cells[2].textContent.replace("(", "");
					v[4] = aV.parentNode.parentNode.cells[4].textContent.replace(")", "");
					v[1] = xy2id(v[3], v[4]);
					v[0] = aV.textContent;
					v[5] = aV;
					v[2] = getNewdidFromLink(v[5].href);
				};
				actV = new xVillage(v[0], v[1], v[2], v[3], v[4], v[5].href);
			} catch(e) {
				getActiveVillageFromCookie();
			};
		} else getActiveVillageFromCookie();
		v = null; aV = null;

		function getActiveVillageFromCookie() {
			var xy = id2xy(TB36.U[4]);
			actV = new xVillage(TB36.U[3], TB36.U[4], TB36.U[5], xy[0], xy[1], 'dorf1.php?newdid=' + TB36.U[5]);
			xy = null;
		};
	};

	function computeTextTime(aD){
		var dtNow = new Date();
		var h = ((aD.getTime() - dtNow.getTime()) / 1000 / 3600) + dtNow.getHours() + (dtNow.getMinutes() / 60);
		var timeR = '';
		if (h < 24) timeR = ""; else if (h < 48) timeR = T('TOMORROW'); else if (h < 72) timeR = T('DAYAFTERTOM'); else timeR = T('ON') + " " + to2Str(aD.getDate()) + "/" + to2Str((aD.getMonth()+1));
		return timeR + " " + T('AT') + " " + to2Str(aD.getHours()) + ":" + to2Str(aD.getMinutes());
		//convert to a 2 digit string (time representation)
		function to2Str(n) {return (n > 9 ? n : '0' + n);};
	};

	function calculateTime(needed){
		var maxTime = 0;
		var aTime = 0;
		for (var i = 0; i < 4; i++){
			restante = needed[i] - crtResUnits[i];
			if (restante > 0){
				aTime = Math.round(restante / (prodPerHour[i] / 3600));
				if (aTime > maxTime) maxTime = aTime;
				if (aTime < 0) maxTime = 'Infinity';
			};
		};
		if (maxTime > 0 && maxTime != 'Infinity') maxTime = formatTime(maxTime + 5, 0);//5 sec delay for JS timers
		return maxTime;
	};

	//compute fill time
	function getFillTimeRow() {
		var ttfR = $r();
		var aC, aT, sttf;
		for (var i = 0; i < 4; i++){
			timeToFill[i][0] = -1;
			if (prodPerHour[i] < 0) {
				timeToFill[i][0] = Math.round(crtResUnits[i] / (-prodPerHour[i] / 3600));
				sttf = formatTime(timeToFill[i][0], 0);
			} else if (prodPerHour[i] > 0) {
				timeToFill[i][0] = Math.round((capacity[i] - crtResUnits[i]) / (prodPerHour[i] / 3600)); sttf = formatTime(timeToFill[i][0], 0);
			} else if (prodPerHour[i] == 0) {
				timeToFill[i][0] = -1; sttf = "Infinity";
			};
			if (sttf == -1) {aC = "#008000"; aT = T('NEVER');} else if (timeToFill[i][0] <= 0) {aC = "#FF0000"; aT = sttf.blink();} else if (timeToFill[i][0] < 7200 || prodPerHour[i] < 0) {aC = "#FF0000"; aT = sttf;} else {aC = "#008000"; aT = sttf;};
			timeToFill[i][1] = "<span id='timeouta' style='font-weight:bold; font-size:7pt; color:" + aC + "; white-space:nowrap;'>" + aT + "</span>";
			var pS = (prodPerHour[i] < 0 ? "<span style='color:#FF0000'>" + prodPerHour[i] + "</span>" : "" + prodPerHour[i]);
			aCell = $c('(' + pS + ', ' + timeToFill[i][1] +')', [['style','font-size:7pt; text-align:' + docDir[0] + '; padding-' + docDir[0] + ':25px; white-space:nowrap; vertical-align:top;'], ['colspan','2']]);
			ttfR.appendChild(aCell);
		};
		return ttfR;
	};
	
	//get current resource units, capacity of warehouse/granary, production per hour
	function getResourceInfo() {
		crtResUnits[4] = 0;
		prodPerHour[5] = 0;
		intImg = 0;
		for (var i = 0; i < 4; i++){
			aX = $g('l' + (4-i));
			if (aX) {
				//available resource units
				resIppH = aX.textContent.split("/");
				crtResUnits[i] = parseInt(resIppH[0]);
				crtResUnits[4] += crtResUnits[i];
				//capacity of warehouse/granary
				capacity[i] = parseInt(resIppH[1]);
				//production/h for this resource
				prodPerHour[i] = parseInt(aX.title);
				//sum of production/h for this village (crop = effective production)
				prodPerHour[5] += prodPerHour[i];
				if (i > 0 && TB36.T36 == false) intImg = 1;
				//resource titles
				aS = aX.previousSibling;
				if (aS) {cellImg = aS.previousSibling; if (cellImg) {resImg = cellImg.childNodes[intImg]; if (resImg) t['RES' + (i + 1)] = resImg.title;};};
				if (i == 3) {
					//real crop production of this village (last cell of the row)
					cpRow = aX.parentNode;
					intLastCell = cpRow.cells.length;
					ccCell = cpRow.cells[intLastCell - 1];
					if (ccCell.id == "l" + (4-i)) {
						cpTable = cpRow.parentNode;
						intLastRow = cpTable.rows.length;
						cpRow = cpTable.rows[intLastRow - 1];
						intLastCell = cpRow.cells.length;
						ccCell = cpRow.cells[intLastCell - 1];
					};
					arrCcTxt = ccCell.textContent.split("/");
					//real total crop production of this village
					prodPerHour[4] = parseInt(arrCcTxt[1]);
					prodPerHour[6] = parseInt(arrCcTxt[0]);
					try {
						//text for "crop consumption"
						aX = ccCell.previousSibling.previousSibling.getElementsByTagName("IMG");
						t['RES5'] = aX[0].title;
					} catch(e) {};
				};
			};
		};
	};

	//change the browser title, get active village coords and coords for the cell/oasis/village opened from the map
	function getCrtLocation() {
		crtLocTitle = '';
		var locX;
		
		if (crtPage.indexOf('dorf3') != -1) {
			//the dorf3 page
			TB36.xCrt = actV.vx;
			TB36.yCrt = actV.vy;
			crtLocTitle = T("ALDEAS") + " (" + TB36.xCrt + "|" + TB36.yCrt + ")";
		} else {
			locX = $xf("//h1");
			locXx = $xf("//span[@id='x']");
			locXy = $xf("//span[@id='y']");

			if (locXx) TB36.xCrt = parseInt(locXx.textContent);
			if (locXy) TB36.yCrt = parseInt(locXy.textContent);

			if (locX && !locXx && !locXy) {
				aH = new Array();
				theName = locX.textContent;
				ipLast = theName.lastIndexOf(")");
				if (ipLast + 1 == theName.length || ipLast + 2 == theName.length) {
					if (ipLast > 0) theName = theName.substring(0, ipLast + 1);
					ipLast = theName.lastIndexOf("(");
					if (ipLast != -1) {
						aH[0] = theName.substring(0, ipLast);
						aH[1] = theName.substr(ipLast + 1);
					} else aH[0] = theName;
					crtLocTitle = aH[0];
					if (aH.length > 1) {
						strXY = aH[1].replace(")", "").replace(" ", "").replace(" ", "");
						aCoord = strXY.split("|");
						TB36.xCrt = parseInt(aCoord[0]);
						TB36.yCrt = parseInt(aCoord[1]);
						crtLocTitle += " (" + TB36.xCrt + "|" + TB36.yCrt + ")";
					} else {
						TB36.xCrt = actV.vx;
						TB36.yCrt = actV.vy;
						strXY = "(" + TB36.xCrt + "|" + TB36.yCrt + ")";
						if (crtLocTitle.indexOf(strXY) == -1) crtLocTitle += " " + strXY;
					};
				} else {
					TB36.xCrt = actV.vx;
					TB36.yCrt = actV.vy;
					crtLocTitle = theName + " (" + TB36.xCrt + "|" + TB36.yCrt + ")";
				};
			} else {
				if (locX != null) {
					crtLocTitle = locX.textContent;
					strXY = "(" + TB36.xCrt + "|" + TB36.yCrt + ")";
					if (crtLocTitle.indexOf(strXY) == -1) crtLocTitle += " " + strXY;
				};
			};
		};
		//change browser title
		TB36.BrT = crtLocTitle.replace(/\n/g, "");
		document.title += " - " + TB36.BrT;
		return true;
	};

	function getRaceV3() {
		//co-author Booboo
		imgQM = $g("qgei");
		if (!imgQM) return false;
		clName = imgQM.className;
		if (clName) {
			if (clName.indexOf("l1") != -1) {TB36.U[1] = avRace[0]; TB36.U[7] = 1;};
			if (clName.indexOf("l2") != -1) {TB36.U[1] = avRace[1]; TB36.U[7] = 11;};
			if (clName.indexOf("l3") != -1) {TB36.U[1] = avRace[2]; TB36.U[7] = 21;};
			setGMcookieV2('UserInfo', TB36.U, 'UsI');
			return TB36.U[1];
		};
	};
	
	function getRace() {
		if (TB36.U[1] == '') getRaceV3();
		if ((TB36.U[1] == '') && TB36.avBKS == true) {
			//race cookies are undefined - enter the barracks
			ajaxRequest(bksLnk, 'GET', null, function(ajaxResp) {
				ajaxResp.responseText.search(/unit u(\d+)/); //race recognition - first image in table of troops
				var xV = RegExp.$1;
				if (xV && xV != '') setRace(xV);
			});
		};
		if (TB36.U[1] != '') TB36.U[7] = (TB36.U[1] == avRace[1] ? 11 : (TB36.U[1] == avRace[2] ? 21 : 1));
		return TB36.U[1];
	};

	//Get general information
	function getGeneralData() {
		//pre-logging
		TB36.O[69] = 10;
		//Path to the graphic pack (if available)
		//empty graphics set support added
		cssDeclaration = $xf("//link[starts-with(@href, 'file') and @rel='stylesheet']");
		if (cssDeclaration) {
			csshr = cssDeclaration.href;
			csshr.search(/^file:\/\/[^\/]*\/(.*\/)?(.*)\.css/);
			localGP = RegExp.$1;
			localGP = 'file://' + localGP;
		};
		//game version
		if (!$g(dTop5)) setT36Constants();
		
		getLanguageAndPlusStatus();
		getUserID();
		getCrtServer();
		
		//setup options
		var tmpTB3SV;
		var aTB3S = getGMcookieV2("TB3Setup");
		if (!aTB3S || !aTB3S['SETUP']) {
			//try to get old values
			var boolSaveTB36 = false;
			for (var xi = 0; xi < TB36.oldOpt.length; xi ++) {
				tmpTB3SV = getGMcookie(TB36.oldOpt[xi], false);
				if (tmpTB3SV != 'false') {if (tmpTB3SV == 'min') tmpTB3SV = '0'; else if (tmpTB3SV == 'max') tmpTB3SV = '1'; TB36.O[xi] = tmpTB3SV; boolSaveTB36 = true; GM_deleteValue(TB36.oldOpt[xi]);} else TB36.O[xi] = TB36.OD[xi];
			};
			setGMcookieV2('TB3Setup', TB36.O, 'SETUP');
		} else TB36.O = aTB3S['SETUP'];
		
		if (TB36.O.length != TB36.oldOpt.length) {
			//for additional new TB3Setup cookies in the new format
			for (var xi = TB36.O.length; xi < TB36.oldOpt.length; xi++) {tmpTB3SV = getGMcookie(TB36.oldOpt[xi], false); if (tmpTB3SV != 'false') TB36.O[xi] = tmpTB3SV; else TB36.O[xi] = TB36.OD[xi];};
			setGMcookieV2('TB3Setup', TB36.O, 'SETUP');
		};
		
		//get user information
		var aTB3U = getGMcookieV2('UserInfo');
		if (!aTB3U || !aTB3U['UsI']) setGMcookieV2('UserInfo', TB36.U, 'UsI'); else TB36.U = aTB3U['UsI'];
		
		getActiveVillage();
		getResourceInfo();
		setVillageRes(actV.vID, -1);

		//speed server ?
		if (crtPage.indexOf("speed") != -1 || crtPage.indexOf("vip") != -1 || crtPage.indexOf("research")!= -1) TB36.speed = true;
		
		//server name & analyser server (wsSName)
		crtPage.search(/http:\/\/(.*)\//);
		oldserver =  RegExp.$1;
		crtServerX = oldserver.split(".");
		strFirst = crtServerX[0];
		strLast = crtServerX[crtServerX.length - 1];
		TB36.FmapServer = strFirst;
		TB36.FmapLanguage = strLast;
		
		if (strLast == "uk" || strLast == "us") TB36.FmapLanguage = "en";

		if (strFirst.indexOf("speed") != -1 && strLast == "se") {
			//swedish x server
			wsSName = strLast + "z";
		} else if (strFirst == "speed1" && strLast == "ae") {
			//aex 1
			wsSName = strLast + "z";
		} else if (strFirst == "speed2" && strLast == "ae") {
			//aex 2
			wsSName = strLast + "y";
		} else if (strFirst == "speed" && strLast == "net") {
			TB36.lng = "es"; wsSName = "netx";
		} else if (strFirst == "speed" || strFirst == "speedserver") {
			//all other x servers
			if (strLast.indexOf("asia") != -1) {wsSName = "thx"; TB36.lng = "th";} else wsSName = strLast + "x"; if (strLast == "com") TB36.lng = 'uk';
		} else if (strFirst == "team") {
			wsSName = "team";
		} else if (strFirst == "lv1") {
			wsSName = "lv1";
		} else if (strLast == "com" && strFirst.indexOf("ae") != -1) {
			wsSName = strFirst;
		} else if (strLast == "at") {
			wsSName = "at"; TB36.lng = "de";
		} else if (strLast == "org") {
			if (strFirst == "research") {wsSName = "org"; TB36.lng = "en";} else {wsSName = "org"; TB36.lng = "de";}
		} else if (strLast == "cat") {
			wsSName = "cat";
		} else if (strLast == "net") {
			//Spanish
			TB36.lng = "es"; wsSName = "net" + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		} else if (strLast == "fr" && TB36.O[27] != "1") {
			//france3-exception fr3nchlover; france-exception Turio
			wsSName = "fr" + strFirst.substr(strFirst.search(/[0-9]{1,2}/)); TB36.lng = "fr";
		} else if (strLast == "uk" || strLast == "us" || strLast == "com") {
			wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/)); TB36.lng = "en";
		} else if (TB36.lng == "cl" && strLast == "mx") {
			TB36.lng = "ar"; wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/)); TB36.FmapLanguage = "es";
		} else if (strLast == "asia") {
			wsSName = "th" + strFirst.substr(strFirst.search(/[0-9]{1,2}/)); TB36.lng = "th";
		} else if (strLast == TB36.lng) {
			//all other normal servers
			wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		};

		if (TB36.lng == '') TB36.lng = strLast;
		//set the script language
		if (TB36.O[0] != '0') TB36.O[0] = parseInt(TB36.O[0]); else {var iLx = 0; var xi = 1; while (iLx == 0 && xi < arAvLang.length) {if (arAvLang[xi] == TB36.lng) iLx = xi; xi += 1;}; TB36.O[0] = iLx;};
		if (arAvLang[TB36.O[0]] != 'en') switchLanguage();
		//additional setup items
		t['80'] = t['53'];
		t['81'] = t['54'];
		t['86'] = t['28'] + " &<br>" + t['30'];

		adaptDataToGameVersion();

		//GM_deleteValue("showbigiconalliance");	
		TB36.VillageRes = getGMcookieV2("VillageRes");
		for (var i = 1; i < 5; i++) {if (TB36.O[64 + i] != '') TB36.CNc[i] = TB36.O[64 + i];};
		//stop "Delete all" reports if the user changed the page
		if (getGMcookie("reportsDeleteAll", false) == '1') {if (crtPage.indexOf('berichte.php') == -1) {setGMcookie("reportsDeleteAll", "0", false); setGMcookie("reportsPageToDelete", '', false);};};
		if (getGMcookie("reportsTOSearch", false) != '') {if (crtPage.indexOf('berichte.php') == -1) {setGMcookie("reportsTOSearch", '', false);};};
		
		//get special buildings cookie
		spBcookie = getGMcookieV2("specBuildings");
		if (spBcookie && spBcookie[actV.vNewdid]) TB36.d2spB = spBcookie[actV.vNewdid];
	};

	//hide ad banners
	function hideAd() {
		
		if (TB36.T36 == true) {var aD = $xf("//div[starts-with(@id, 'ltime')]", 'f'); if (aD) $at(aD, [['style', 'width:650px; top:5px; color:white;']]);};
		if (TB36.O[2] == '1') {
			if (TB36.T36 == true) {
				removeElement($xf("//div[@class='dyn1']"));
				removeElement($xf("//div[@class='dyn2']"));
				removeElement($g("ad_iframe"));
				divHeader = $g('dynamic_header');
				if (divHeader) {
					if (crtPage.indexOf("vip") == -1) {
						divHeader.style.height = '100px';
						$g("res").style.top = '150px';
					};
				};
			} else {
				ad = $xf("//iframe");
				if (ad) {
					if (ad.id == '') {
						ad.style.display = 'none'; headerTop = $xf("//html/body/div"); if (headerTop) {headerTop.style.height = '30px'; headerTop.style.backgroundImage = '';};
						header2 = $xf("//html/body/div[2]"); if (header2) header2.style.display = 'none'; header3 = $xf("//html/body/div[3]");if (header3 && header3.id != dTop1) header3.style.display = 'none'; lres = $g("lres2"); if (lres) lres.style.top = '100px';
					};
				};
			};
		};
	};

	//menu on the left side
	function leftMenuLinks() {
		menu = $xf("//td[@class='menu']");
		if (!menu) {
			menu = $xf("//div[@id='" + dleft + "']/p", 'l');
			if (menu.snapshotLength > 1) {
				pFirst = menu.snapshotItem(0);
				for (xi = 1; xi < menu.snapshotLength; xi++) {while (tmp = menu.snapshotItem(xi).firstChild) {removeElement(tmp); pFirst.appendChild(tmp);}; removeElement(menu.snapshotItem(xi));};//by j000
				menu = pFirst;
			} else menu = menu.snapshotItem(0);
		};

		//by j000;
		brs = menu.childNodes;
		for (var i = 0; i < brs.length; i++) {if (brs[i].nodeName.toLowerCase() == "br") {brs[i].parentNode.removeChild(brs[i]); --i;};};
		var aL = [0, [T('LOGIN'), "login.php"], (TB36.O[8] != "1" ? [T('8'), "allianz.php"] : ['', '']), [T('SENDTROOPS'), "a2b.php"], [T('SIM'), warsimLink[parseInt(TB36.O[10])], "_blank"]];

		if (TB36.O[9] == '1') {
			ttblangTR = TB36.lng;
			ttbLang = TB36.lng;
			switch (TB36.lng) {
				case "il": ttbLang = "he"; break;
				case "au":
				case "us": ttblang = "en"; ttblangTR = "us"; break;
				case "uk":
				case "en": ttbLang = "en"; ttblangTR = "uk"; break;
				case "es":
				case "ar":
				case "cl":
				case "mx": ttbLang = "es"; break;
				case "kr": ttbLang = "ko"; break;
				case "pt":
				case "br": ttbLang = "pt"; break;
				case "cn":
				case "tw":
				case "hk": ttbLang = "cn"; break;
				default: ttbLang = TB36.lng; break;
			};

			var wsAO = parseInt(TB36.O[27]);
			var mapAO = parseInt(TB36.O[29]);
			var mapAL = TB36.O[29] == 0 ? mapAnalyser[0][1] + "?lang=" + TB36.lng : TB36.O[29] == '1' ? mapAnalyser[1][1] + TB36.FmapLanguage : '';
			var menuS3L = [0, [T('CROPFINDER'), wsURLCropFinderLinkV2, "_blank"], (TB36.O[11] != "1" ? [repSite[0][0], repSite[0][1] + TB36.lng + "/", "_blank"] : [repSite[1][0], repSite[1][1] + ttblangTR + "/", "_blank"]),	['Traviandope', "http://www.traviandope.com/", "_blank"], ['Toolbox', "http://www.traviantoolbox.com/index.php?lang=" + ttbLang, "_blank"], ['Travian Utility', "http://travianutility.netsons.org/index_en.php", "_blank"], ['TravianBox', wsURLTravianBox + "/stats/server/" + wsSName, "_blank"], [mapAnalyser[mapAO][0], mapAL, "_blank"], [wsAnalyser[wsAO][0], wsAnalyser[wsAO][1] + wsSName, "_blank"]];
			aL = aL.concat(menuS3L);
		};

		for (var i = 0; i < aL.length; i++) {
			if (aL[i]) {
				if (aL[i][1] != '') {
					yh = (aL[i][0].length > 17 ? 40 : 20);
					aLink = $a(aL[i][0], [['href', aL[i][1]], ['style', 'height:' + yh + 'px !important;']]);
					if (aL[i][2]) $at(aLink, [['target', aL[i][2]]]);
					menu.appendChild(aLink);
				};
			} else menu.appendChild($e('HR'));
		};
		aL = null; menuS3L = null;
	};

	function setT36Constants() {
		TB36.T36 = true;
		dlright1 = 'side_info';
		dl = $g(dlright1);
		if (!dl) dlright1 = 'sright';
		dleft = 'side_navi';
		dl = $g(dleft);
		if (!dl) dleft = 'sleft';
		dTop1 = 'header';
		dTop5 = 'mtop';
		dmid2 = 'content';
		dmid1 = 'content';
		dmid = "mid";
		xGIF = (localGP != '' ? img("a/x.gif") : "img/x.gif");
	};

	function adaptDataToGameVersion() {
		var cssBI = "";
		var bIheight = "67";
		if (TB36.T36 == false) {
			gIc["r1"] = '<img src="' + img("r/1.gif") + '" title="' + T('RES1') + '" alt="' + T('RES1') + '">';
			gIc["r2"] = '<img src="' + img("r/2.gif") + '" title="' + T('RES2') + '" alt="' + T('RES2') + '">';
			gIc["r3"] = '<img src="' + img("r/3.gif") + '" title="' + T('RES3') + '" alt="' + T('RES3') + '">';
			gIc["r4"] = '<img src="' + img("r/4.gif") + '" title="' + T('RES4') + '" alt="' + T('RES4') + '">';
			gIc["r41"] = '<img src="' + img("r/4.gif") + '" title="' + T('SENDRES') + '" alt="' + T('SENDRES') + '">';
			gIc["r5"] = '<img src="' + img("r/5.gif") + '" title="' + T('RES5') + '" alt="' + T('RES5') + '">';
			gIc["clock"] = '<img src="' + img("a/clock.gif") + '">';
			gIc["capacity"] = '<img src="' + image["capacity"] + '">';
			gIc["bau"] = img("a/bau.gif");
			gIc["hero"] = '<img src="' + img("u/hero.gif") + '">';
			gIc["att_all"] = '<img src="' + img("a/att_all.gif") + '">';
			gIc["def_i"] = '<img src="' + img("a/def_i.gif") + '">';
			gIc["def_c"] = '<img src="' + img("a/def_c.gif") + '">';
			gIc["def1_1"] = '<img src="' + img("a/def1.gif") + '" title="' + T('AT2') + '" alt="' + T('AT2') + '">';
			gIc["def1"] = '<img src="' + img("a/def1.gif") + '">';
			gIc["def2"] = '<img src="' + img("a/def2.gif") + '">';
			gIc["def3"] = '<img src="' + img("a/def3.gif") + '">';
			gIc["att_all_1"] = '<img src="' + img("a/att_all.gif") + '" title="' + T('AT3') + '" alt="' + T('AT3') + '">';
			gIc["att_all_2"] = '<img src="' + img("a/att_all.gif") + '" title="' + T('AT4') + '" alt="' + T('AT4') + '">';
			for (var xi = 1; xi < 6; xi++) gIc["b" + xi] = img("a/b" + xi + ".gif");
			for (var i = 1; i < 31; i ++) {gIc["u" + i] = img("u/" + i) + ".gif";};
			//big icons
			bIheight = "100";
			//troops
			uc[1] = [120,100,180,40,40,40,35,50,6,1];//Legionnaire
			uc[21] = [100,130,55,30,30,15,40,50,7,1];//Phalanx
		} else {
			gIc["r1"] = '<img class="r1" src="' + xGIF + '" title="' + T('RES1') + '" alt="' + T('RES1') + '">';
			gIc["r2"] = '<img class="r2" src="' + xGIF + '" title="' + T('RES2') + '" alt="' + T('RES2') + '">';
			gIc["r3"] = '<img class="r3" src="' + xGIF + '" title="' + T('RES3') + '" alt="' + T('RES3') + '">';
			gIc["r4"] = '<img class="r4" src="' + xGIF + '" title="' + T('RES4') + '" alt="' + T('RES4') + '">';
			gIc["r41"] = '<img class="r4" src="' + xGIF + '" title="' + T('SENDRES') + '" alt="' + T('SENDRES') + '">';
			gIc["r5"] = '<img class="r5" src="' + xGIF + '" title="' + T('RES5') + '" alt="' + T('RES5') + '">';
			gIc["clock"] = '<img class="clock" src="' + xGIF + '">';
			gIc["capacity"] = '<img src="' + image["capacity"] + '">';
			gIc["bau"] = image["bau"];
			gIc["hero"] = '<img class="unit uhero" src="' + xGIF + '">';
			gIc["def_i"] = '<img class="def_i" src="' + xGIF + '">';
			gIc["def_c"] = '<img class="def_c" src="' + xGIF + '">';
			gIc["def1"] = '<img class="def1" src="' + xGIF + '">';
			gIc["def1_1"] = '<img class="def1" src="' + xGIF + '" title="' + T('AT2') + '" alt="' + T('AT2') + '">';
			gIc["def2"] = '<img class="def2" src="' + xGIF + '">';
			gIc["def3"] = '<img class="def3" src="' + xGIF + '">';
			gIc["att_all"] = '<img class="att_all" src="' + xGIF + '">';
			gIc["att_all_1"] = '<img class="att_all" src="' + xGIF + '" title="' + T('AT3') + '" alt="' + T('AT3') + '">';
			gIc["att_all_2"] = '<img class="att_all" src="' + xGIF + '" title="' + T('AT4') + '" alt="' + T('AT4') + '">';
			gIc["att1"] = '<img class="att1" src="' + xGIF + '">';
			gIc["att2"] = '<img class="att2" src="' + xGIF + '">';
			gIc["iReport iReport2"] = '<img class="iReport iReport2" src="' + xGIF + '">';
			gIc["iReport iReport3"] = '<img class="iReport iReport3" src="' + xGIF + '">';
			gIc["iReport iReport5"] = '<img class="iReport iReport5" src="' + xGIF + '">';
			gIc["iReport iReport6"] = '<img class="iReport iReport6" src="' + xGIF + '">';
			gIc["iReport iReport7"] = '<img class="iReport iReport7" src="' + xGIF + '">';
			//big icons
			image["alliance"] = image["alliance35"];
			image["alliancegs"] = image["alliance35gs"];
			image["mercado"] = image["mercado35"];
			image["mercadogs"] = image["mercado35gs"];
			image["militar"] = image["militar35"];
			image["militargs"] = image["militar35gs"];
			image["militar2"] = image["militar235"];
			image["militar2gs"] = image["militar235gs"];
			image["misc"] = image["misc35"];
			image["miscgs"] = image["misc35gs"];
			image["setup"] = image["setup35"];
			for (var xi = 1; xi < 6; xi++) gIc["b" + xi] = xGIF;
			for (var i = 1; i < 31; i ++) {gIc["u" + i] = xGIF;};
			if (TB36.O[3] == '1') {
				uc[1] = [120,100,180,40,40,40,35,50,6,1];//Legionnaire
				uc[21] = [100,130,55,30,30,15,40,50,7,1];//Phalanx
			};
		};

		gIc["merchant"] = '<img src="' + image["merchant"] + '">';
		gIc["reload"] = '<img src="' + image["reload"] + '">';
		gIc["reload_p"] = '<img src="' + image["reload"] + '" title="' + T('UPDATEPOP') + '" alt="' + T('UPDATEPOP') + '">';
		gIc["reload_v"] = '<img src="' + image["reload"] + '" title="' + T('UPDALLV') + '" alt="' + T('UPDALLV') + '">';
		gIc["usethempr"] = '<img src="' + image["usethempr"] + '" title="' + T('USETHEMPR') + '" alt="' + T('USETHEMPR') + '">';
		gIc["usethemeq"] = '<img src="' + image["usethemeq"] + '" title="' + T('USETHEMEQ') + '" alt="' + T('USETHEMEQ') + '">';
		gIc["usethem1h"] = '<img src="' + image["usethem1h"] + '" title="' + T('USETHEM1H') + '" alt="' + T('USETHEM1H') + '">';
		gIc["del"] = '<img src="' + image["del"] + '" title="' + T('DEL') + '" alt="' + T('DEL') + '" style="cursor:pointer;">';
		
		//big icons style
		cssBI += "#n6, #n7, #n8, #n9, #n10, #n11 {width:70px; height:" + bIheight + "px; background-repeat:no-repeat;}" +
		"#n6:hover,#n7:hover,#n8:hover,#n9:hover,#n10:hover,#n11:hover {background-position:bottom;}" +
		'#n6 {background-image: url(' + image["mercadogs"] + ');}' +
		'#n7 {background-image: url(' + image["militargs"] + ');}' +
		'#n8 {background-image: url(' + image["alliancegs"] + ');}' +
		'#n9 {background-image:  url(' + image["setup"] + ');}' +
		'#n10 {background-image: url(' + image["militar2gs"] + ');}' +
		'#n11 {background-image: url(' + image["miscgs"] + ');}';
		GM_addStyle(cssBI);
	};

	function createHelpTooltip(aT) {
		return function() {
			var aTT = $g("tb_tooltip");
			if (!aTT) aTT = createTooltip();
			aTT.innerHTML = '<p style="margin:5px;">' + T(aT.toUpperCase()) + '</p>';
			aTT.style.display = 'block'; aTT.style.zIndex = '3000'; aTT.style.fontSize = '8pt'; aTT.style.color = 'blue';
		};
	};

	//TB3 Setup page
	function TB3Setup(){
		//TB3 Setup parameters
		var aTBS = [
			[1, "0", "TR", "", -1],
				[2, "0", "SEL", arAvLang, 0],
			[1, "accinfo", "TR", "SH1", -1],
				[2, "U.3", "SP", "", 3],
				[2, "U.6", "SP", "", 6],
				[2, "U.2", "SP", "", 2],
			[1, "gsrvt", "TR", "", -1],
				[2, "1", "CB", "", 1],
				[2, "2", "CB", "", 2],
				[2, "3", "CB", "", 3],
			[1, "bic", "TR", "", -1],
				[2, "4", "CB", "", 4],
				[2, "5", "CB", "", 5],
				[2, "6", "CB", "", 6],
				[2, "7", "CB", "", 7],
				[2, "8", "CB", "", 8],
				[2, "alfl", "T", "", -1],
			[1, "mnul", "TR", "", -1],
				[2, "9", "CB", "", 9],
				[2, "10", "SEL", [T('WSIMO1'), T('WSIMO2')], 10],
				[2, "11", "SEL", [repSite[0][0], repSite[1][0]], 11],
			[1, "vgl", "TR", "", -1],
				[2, "12", "CB", "", 12],
				[2, "13", "CB", "", 13],
				[2, "14", "CB", "", 14],
				[2, "15", "CB", "", 15],
				[2, "16", "CB", "", 16],
				[2, "17", "CB", "", 17],
				[2, "18", "CB", "", 18],
				[2, "19", "CB", "", 19],
			[1, "marcadores", "TR", "", -1],
				[2, "20", "CB", "", 20],
				[2, "21", "CB", "", 21],
				[2, "marcadores", "T", "", -1],
			[1, "nbo", "TR", "", -1],
				[2, "22", "CB", "", 22],
				[2, "23", "CB", "", 23],
				[2, "24", "SEL", [T('NBSA'), T('NBSN'), T('NBSB')], 24],
				[2, "25", "SEL", [T('NBHK'), T('NBHAX')], 25],
			[1, "npco", "TR", "", -1],
				[2, "26", "CB", "", 26],
			[1, "stat", "TR", "", -1],
				[2, "27", "SEL", [wsAnalyser[0][0], wsAnalyser[1][0], wsAnalyser[2][0]], 27],
				[2, "28", "CB", "", 28],
				[2, "29", "SEL", [mapAnalyser[0][0], mapAnalyser[1][0]], 29],
				[2, "30", "CB", "", 30],
				[2, "31", "CB", "", 31],
				[2, "32", "CB", "", 32],
				[2, "33", "CB", "", 33],
			[1, "ttt", "TR", "", -1],
				[2, "53", "CB", "", 53],
				[2, "54", "CB", "", 54],
			[1, "upgtb", "TR", "", -1],
				[2, "34", "CB", "", 34],
				[2, "35", "CB", "", 35],
				[2, "36", "CB", "", 36],
			[1, "resf", "TR", "", -1],
				[2, "37", "CB", "", 37],
				[2, "38", "CB", "", 38],
				[2, "39", "CB", "", 39],
				[2, "40", "CB", "", 40],
			[1, "vlc", "TR", "", -1],
				[2, "41", "CB", "", 41],
				[2, "42", "CB", "", 42],
				[2, "43", "CB", "", 43],
				[2, "44", "CB", "", 44],
				[2, "45", "CB", "", 45],
			[1, "market", "TR", "", -1],
				[2, "46", "CB", "", 46],
				[2, "47", "CB", "", 47],
				[2, "48", "SEL", ["1", "2", "3", "4", "5"], 48],
				[2, "ventas", "T", "", -1],
				[2, "87", "CB", "", 87],
			[1, "rap", "TR", "", -1],
				[2, "49", "SEL", [T('AT2'), T('AT3'), T('AT4')], 49],
				[2, "50", "T", "", 50],
				[2, "51", "CB", "", 51],
				[2, "52", "CB", "", 52],
				[2, "80", "CB", "", 80],
				[2, "81", "CB", "", 81],
				[2, "85", "CB", "", 85],
				[2, "86", "CB", "", 86],
			[1, "wsi", "TR", "", -1],
				[2, "55", "CB", "", 55],
			[1, "mapo", "TR", "", -1],
				[2, "56", "CB", "", 56],
				[2, "57", "CB", "", 57],
				[2, "58", "CB", "", 58],
			[1, "mereo", "TR", "", -1],
				[2, "59", "SEL", ["1", "2", "3", "4", "5"], 59],
				[2, "60", "CB", "", 60],
				[2, "61", "CB", "", 61],
				[2, "62", "CB", "", 62],
				[2, "63", "CB", "", 63],
				[2, "64", "CB", "", 64],
			[1, "colo", "TR", "SH2", -1],
				[2, "65", "T", "", 65],
				[2, "66", "T", "", 66],
				[2, "67", "T", "", 67],
				[2, "68", "T", "", 68],
			[1, "dbgo", "TR", "", -1],
				[2, "69", "SEL", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], 69],
		];
		//no aTBS items from 70 to 79

		//Modified by Lux
		if ($g('TB3S')) {showMsgPage(true); return;};
		var innerPane = $g('InnerMsgPage');
		if (!innerPane) {addDiv(); innerPane = $g('InnerMsgPage');};
		//---

		setupTb = $t([['id', 'TB3S']]);
		tRow = $r([["class", 'srh']]);
		topCell = $c(T('TB3SL') + " - " + TB36.versionText(), [['class', 's1']]);
		//save button
		sCell = $c("", [['class', 's2']]);
		sImg = $img([['src', image["bSave"]], ['title', T('CLOSE')]]);
		sImg.addEventListener("click", TB3SetupSave, 0);
		sCell.appendChild(sImg);
		//close setup
		xCell = $c("", [['class', 's3']]);
		xImg = $img([['src', image["bClose"]], ['title', T('CLOSE')]]);
		xImg.addEventListener("click", function(){showMsgPage(false)}, true);

		xCell.appendChild(xImg);
		tRow.appendChild(topCell);
		tRow.appendChild(sCell);
		tRow.appendChild(xCell);
		setupTb.appendChild(tRow);

		for (var i = 0; i < aTBS.length; i++){
			if (aTBS[i][0] == 1) {
				sectionRow = $r(aTBS[i][2]);
				sTC = $c(T(aTBS[i][1].toUpperCase()), [["class", "srst"], ['colspan', '3']]);
				if (aTBS[i][3] != '') {
					aTN = $e("TEXTNODE", " ");
					aImg = $img([['src', image["help"]]]);
					aImg.addEventListener('mouseover', createHelpTooltip(aTBS[i][3]), false);
					aImg.addEventListener('mouseout', hideTT, false);
					sTC.appendChild(aTN);
					sTC.appendChild(aImg);
				};
				sectionRow.appendChild(sTC);
				setupTb.appendChild(sectionRow);
			} else if (aTBS[i][0] == 2) {
				setupRow = $r();
				setupRowLabel = $c(T(aTBS[i][1].toUpperCase()), [['class', 'srsc1']]);
				setupRow.appendChild(setupRowLabel);
				cI = $c("", [['class', 'srsc2'], ['colspan', '2']]);
				if (aTBS[i][4] != -1) aValue = TB36.O[aTBS[i][4]]; else aValue = getGMcookie(aTBS[i][1], false);
				sVal = (aValue != "false" ? aValue : '');
				switch (aTBS[i][2]) {
					case "CB": pS = $i([['type', 'CHECKBOX']]); if (sVal == "1") $at(pS, [['checked', true]]); break;
					case "T": pS = $i([['type', 'TEXT'], ['style', 'width:360px;'], ['value', sVal]]); break;
					case "SEL": pS = $e('SELECT'); for (var xi = 0; xi < aTBS[i][3].length; xi++) pS.options[xi] = new Option(aTBS[i][3][xi], xi, false, false); pS.selected = sVal; pS.value = parseInt(sVal); break;
					case "SP": pS = $e('SPAN'); sVal = TB36.U[aTBS[i][4]]; pS.innerHTML = sVal; break;
				};
				$at(pS, [['name', aTBS[i][1]]]);
				cI.appendChild(pS);
				setupRow.appendChild(cI);
				setupTb.appendChild(setupRow);
			};
		};

		//create the "Save" row
		saveRow = $r([['class', 'srh']]);
		bCell = $c(T('TB3SL') + " - " + TB36.versionText(), [['class', 's1']]);
		sCell2 = $c("", [['class', 's2']]);
		sImg2 = sImg.cloneNode(true);
		sImg2.addEventListener("click", TB3SetupSave, 0);
		sCell2.appendChild(sImg2);

		xCell2 = $c("", [['class', 's3']]);
		xImg2 = xImg.cloneNode(true);
		xImg2.addEventListener("click", function(){showMsgPage(false)}, true);
		xCell2.appendChild(xImg2);

		saveRow.appendChild(bCell);
		saveRow.appendChild(sCell2);
		saveRow.appendChild(xCell2);
		setupTb.appendChild(saveRow);
		
		//Modified by Lux
		innerPane.appendChild(setupTb); showMsgPage(true);
		//---
		
		var outerPane = $g('OuterMsgPage');
		if (outerPane) $at(outerPane, [['style', 'height:' + (setupTb.clientHeight + 30) + 'px; ']]);
		
		function TB3SetupSave() {
			var aName;
			var aS = $g("TB3S").getElementsByTagName("SELECT");
			for (var i = 0; i < aS.length; i++) {crtValue = aS[i].value; aName = parseInt(aS[i].name); if (!isNaN(aName)) TB36.O[aName] = crtValue; else {aName = aS[i].name; setGMcookie(aName, crtValue, false);};};
			aS = $g("TB3S").getElementsByTagName("INPUT");
			for (var i = 0; i < aS.length; i++) {crtValue = aS[i].value; if (aS[i].type == 'checkbox') crtValue = (aS[i].checked == true ? '1' : '0'); aName = parseInt(aS[i].name); if (!isNaN(aName)) TB36.O[aName] = crtValue; else {aName = aS[i].name; setGMcookie(aName, crtValue, false);};};
			setGMcookieV2('TB3Setup', TB36.O, "SETUP");
			nbnotes = $g('noteblockcontent');
			if (nbnotes) setGMcookie('notas', nbnotes.value, false);
			alert(T('SAVED') + ".");
			location.reload(true);
		};
	};

	function showBigIconsBar(){
		var biBar = $g(dTop5);
		if (biBar == null) return;
		var iBiC = 0;
		var iHTML = '';
		var bbdx = 224;
		if (TB36.T36 == true) {
			hPH = '67';
			clearDiv = $xf("//div[@id='" + dTop5 + "']//div[@class='clear']");
			if (clearDiv) biBar.removeChild(clearDiv);
			strMapCbib = ["0,0,35,33", "35,0,70,33", "0,33,35,67", "35,33,70,67"];
			strMapMbib = ["0,0,70,33", "0,33,35,67", "35,33,70,67"];
		} else {
			hPH = '100';
			strMapCbib = ["0,0,35,50", "35,0,70,50", "0,50,35,100", "35,50,70,100"];
			strMapMbib = ["0,0,70,50", "0,50,35,100", "35,50,70,100"];
		};
		if (docDir[0] == 'right') {if ($g("stime")) bbdx += parseInt(TB36.wW) - parseInt(biBar.offsetLeft) - parseInt(biBar.clientWidth);};
		//log(3, "bbdx = " + bbdx + "; TB36.wW = " + TB36.wW + "; biBar.offsetLeft = " + biBar.offsetLeft + "; biBar.clientWidth = " + biBar.clientWidth);
		
		$at(biBar, [['style', 'display:none; width:900px;']]);
		
		//setup icon
		var sI = $img([['id', 'n9'], ['src', xGIF]]);
		var sL = $a("", [['title', T('TB3SL')], ['href', jsVoid], ['style','float:' + docDir[0] + '; ']]);
		sL.appendChild(sI);
		sL.addEventListener('click', TB3Setup, false);

		aPlus = $xf("//div[@id='" + dTop5 + "']//a[contains(@href, 'plus.php')] | //div[@id='" + dTop1 + "']//a[contains(@href, 'plus.php')]");
		if (aPlus) {
			$at(aPlus, [['href', aPlus.href + '?id=3'], ['style', 'margin-' + docDir[0] + ':30px']]);
			biBar.removeChild(aPlus);
		};

		if (TB36.O[4] == "1") {
			var mkL = $a("<img usemap='#market' id='n6' src='" + xGIF + "'>");
			$at(mkL, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(mkL);
			iBiC += 1;
			iHTML += '<map name="market" onmouseover="bigIconMarket()" onmouseout="bigIconMarketGS()"><area shape="rect" coords="' + strMapMbib[0] + '" href="build.php?gid=17" title="' + T('SENDRES') + '"><area shape="rect" coords="' + strMapMbib[1] + '" href="build.php?gid=17&t=1" title="' + T('BUY') + '"><area shape="rect" coords="' + strMapMbib[2] + '" href="build.php?gid=17&t=2" title="' + T('SELL') + '"></map>';
			gSSw("mercado");
		};
		if (TB36.O[5] == "1") {
			var miL = $a("<img usemap='#militar' id='n7' src='" + xGIF + "'>");
			$at(miL, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(miL);
			iBiC += 1;
			iHTML += '<map name="militar" onmouseover="bigIconMilitar()" onmouseout="bigIconMilitarGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=16&j&k" title="' + T('RAP') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="' + bksLnk +'" title="' + T('BARRACKS') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=20" title="' + T('STABLE') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=21" title="' + T('WORKSHOP') + '"></map>';
			gSSw("militar");
		};
		if (TB36.O[6] == "1") {
			var miL2 = $a("<img usemap='#militar2' id='n10' src='" + xGIF + "'>");
			$at(miL2, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(miL2);
			iBiC += 1;
			iHTML += '<map name="militar2" onmouseover="bigIconMilitar2()" onmouseout="bigIconMilitar2GS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=24" title="' + T('TOWNHALL') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=37" title="' + T('HEROSMANSION') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=12" title="' + T('BLACKSMITH') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=13" title="' + T('ARMOURY') + '"></map>';
			gSSw("militar2");
		};
		if (TB36.O[7] == "1") {
			var mscL = $a("<img usemap='#misc' id='n11' src='" + xGIF + "'>");
			$at(mscL, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(mscL);
			iBiC += 1;
			iHTML += '<map name="misc"  onmouseover="bigIconMisc()" onmouseout="bigIconMiscGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=26" title="' + T('PALACE') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=25" title="' + T('RESIDENCE') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=22" title="' + T('ACADEMY') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=27" title="' + T('TREASURY') + '"></map>';
			gSSw("misc");
		};
		if (TB36.O[8] == "1") {
			var ayL = $a("<img usemap='#alliance' id='n8' src='" + xGIF + "' title='" + T('8') + "' alt = '" + T('8') + "'>");
			$at(ayL, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(ayL);
			iBiC += 1;
			
			//alliance forum link converter
			var alfl = getGMcookie('alfl', false);
			if (alfl == 'false') {
				alfl = getGMcookie("allianceforumlink");
				if (alfl != 'false') setGMcookie('alfl', alfl, false); else setGMcookie('alfl', false, false);
				GM_deleteValue("allianceforumlink");
			};
			
			if (alfl == "false" || alfl == "") alfl = "allianz.php?s=2"; else alfl += ' target="_blank"';
			iHTML += '<map name="alliance" onmouseover="bigIconAlliance()" onmouseout="bigIconAllianceGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="allianz.php" title="' + T('8') + ':&nbsp;' + T('OVERVIEW') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href=' + alfl + ' title="' + T('8') + ':&nbsp;' + T('FORUM') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="allianz.php?s=3" title="' + T('8') + ':&nbsp;' + T('ATTACKS') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="allianz.php?s=4" title="' + T('8') + ':&nbsp;' + T('NEWS') + '"></map>';
			gSSw("alliance");
		};
		if (TB36.plAc) biBar.appendChild(aPlus);

		biBar.innerHTML += iHTML;
		//insert an empty image based on the boolShowBigIconsOptions
		var xM = 150 - iBiC * 35;
		var eI = $img([['src', xGIF], ['style', 'width:' + (xM < 0 ? 0 : xM) + 'px; height:' + hPH + 'px; float:' + docDir[0] + ';']]);
		//biBar.insertBefore(eI, biBar.firstChild);
		//biBar.insertBefore(sL, eI);
		biBar.insertBefore(sL, biBar.firstChild);
		biBar.style.display = '';
		//if (docDir[0] == 'left') biBar.style.left = (parseInt(biBar.offsetLeft) - parseInt(sL.clientWidth)) + "px"; else biBar.style.right = (bbdx - parseInt(sL.clientWidth)) + 'px';
		if (docDir[0] == 'left') biBar.style.left = (parseInt(biBar.offsetLeft) - parseInt(sL.clientWidth)) + "px"; else biBar.style.right = '80px'; // fix display Black_Cat
		eI = null; iHMTL = ''; mkL = null; miL = null; miL2 = null; mscL = null; ayL = null;
		
		//onetmt
		function gSSw (icon) {
			//this function is a workaround for the mouse event unawareness of <area> tag with respect to background image;
			//through gSSw it is possible to change from a greyscale background to a color one, increasing the look and feel coherence with original travian GUI
			icongs = icon + "gs";

			switch (icon) {
				case "mercado": divid = "n6"; funid = "Market"; break;
				case "militar": divid = "n7"; funid = "Militar"; break;
				case "alliance": divid = "n8"; funid = "Alliance"; break;
				case "militar2": divid = "n10"; funid = "Militar2"; break;
				case "misc": divid = "n11"; funid = "Misc"; break;
			};

			mouseoverfun = $e("script", "function bigIcon" + funid + " () {var icon = document.getElementById (\"" + divid + "\"); icon.style.backgroundImage = \"url(\'" + image[icon] + "\')\";}");
			document.body.appendChild (mouseoverfun);
			mouseoutfun = $e("script", "function bigIcon" + funid + "GS () {var icon = document.getElementById (\"" + divid + "\"); icon.style.backgroundImage = \"url(\'" + image[icongs] + "\')\";}");
			document.body.appendChild (mouseoutfun);
		};
	};

	function createStatLink(strType, aX, textURL) {
		var aT;
		var ahws = '';
		var ast = '';
		var tWA = '';
		if (TB36.O[27] == "0") {
			tWA = wsAnalyser[0][0]; if (strType == "user") aT = 'uid='; else if (strType == "ally") aT = 'aid='; ahws = wsAnalyser[0][1] + wsSName + "&" + aT + aX;
		} else if (TB36.O[27] == "1") {
			tWA = wsAnalyser[1][0]; if (strType == "user") aT = 'idu='; else if (strType == "ally") aT = 'ida='; ahws = wsAnalyser[1][1] + wsSName + "&" + aT + aX;
		} else if (TB36.O[27] == "2") {
			tWA = wsAnalyser[2][0]; if (strType == "user") aT = 'player/'; else if (strType == "ally") aT = 'alliance/'; ahws = wsAnalyser[2][1] + aT + wsSName + "/id/" + aX;
		};
		if (textURL) ast = $a(textURL, [['target', '_blank'], ['href', ahws]]); else if (ahws != '') {
			ast = $a("", [['target', '_blank'], ['href', ahws]]); ast.appendChild($img([['src', image["globe"]], ['style', 'margin:0px 2px -2px 3px; display:inline; border:0px none white;'], ['title', tWA]]));
		};
		return ast;
	};

	function createMapLink(strType, aX, strName) {
		var hrefMapPage = '';
		var aLnk = null;
		var smLnk;
		if (TB36.O[29] == '0') {
			smLnk = mapAnalyser[0][1] + "map.php?lang=" + TB36.lng + "&server=" + TB36.fullServerName; var smURLEnd = "&groupby=player&casen=on&format=svg&azoom=on"; if (strType == "user") hrefMapPage = smLnk + "&player=id:" + aX + smURLEnd; else if (strType == "ally") hrefMapPage = smLnk + "&alliance=id:" + aX + smURLEnd;
		} else if (TB36.O[29] == '1') {
			smLnk = mapAnalyser[1][1] + TB36.FmapLanguage + "/" + TB36.FmapServer + "/"; if (strType == "user") hrefMapPage = smLnk + "players/" + strName; else if (strType == "ally") hrefMapPage = smLnk + "clans/" + strName;
		};
		if (hrefMapPage != '') {
			var aImg = $img([['src', image["smap"]], ['style', 'margin:0px 2px -2px 3px; display:inline; border:0px none white;'], ['title', 'Map']]); aLnk = $a("",[['href', hrefMapPage], ['target', '_blank']]); aLnk.appendChild(aImg);
		};
		return aLnk;
	};

	function insertIGMLink(aNode, uid) {
		//IGM link
		var igmL = $a("", [['href', 'nachrichten.php?t=1&id=' + uid]]);
		igmL.appendChild($img([['src', image["igm"]], ['style', 'margin:3px 0px 1px 3px; display:inline;'], ['title', T('SENDIGM')]]));
		aNode.parentNode.insertBefore(igmL, aNode.nextSibling);
		igmL = null;
	};
	
	function addMrInPopup(aNode) {
		if (aNode.parentNode && aNode.parentNode.innerHTML.indexOf(imP) == -1) {
			var aBt = $a("&nbsp;&nbsp;", [['href', jsVoid], ['style', 'height:0px; position:relative; float:' + docDir[1]]]);
			aBt.addEventListener("click", createMesRepPopup(aNode), false);
			aBt.appendChild($img([['src', image['imgo']]]));
			aNode.parentNode.insertBefore(aBt, aNode);
		};

		function createMesRepPopup(aNode) {
			return function() {
				ajaxRequest(aNode.href, 'GET', null, function(ajaxResp) {
					var ad = ajaxNDV2(ajaxResp);
					var aV = $xf("//div[@id='" + dmid2 + "']", 'f', ad);
					if (aV) {
						var tt = $g("mr_tooltip");
						if (!tt) {var dW = 480; if (aV.className == "reports") dW = 550; var iLeft = 680; if (docDir[0] == 'right') iLeft = 400; tt = $df(dW, iLeft, 90, '', '', "mr_tooltip", false);};
						removeElement($g('lmid2_1'));
						$at(aV, [['id', 'lmid2_1']]);
						tt.appendChild(aV);
						//process message
						var aCs = $xf("//td[@background] | //div[@class='underline'] | //div[@id='message']", 'r');
						if (aCs.snapshotLength > 0) {for (var i = 0; i < aCs.snapshotLength; i++) {var aC = aCs.snapshotItem(i); aC.innerHTML = addXYinMsg(aC.innerHTML);};//add coords in message if needed
						} else {battleReportV2(); playerLinks("lmid2_1"); if (TB36.O[53] == "1") showTroopInfoInTooltips();};
						tt.style.display = "block";
					}
				}, dummy);
			};
		};
	};

	function updColTableResBarTooltip(i, procNo, prC) {
		var bTb = $t([['class', 'rbrtb'], ['id', 'resbarTable_' + i]]);
		bRow = $r([['class', 'rbrtbr']]);
		bRow.appendChild($c("", [['style', 'width:' + procNo + 'px; background-color:' + prC + ';'], ['title', crtResUnits[i] + "/" + capacity[i]]]));
		bRow.appendChild($c("", [['style', 'width:' + (100 - procNo) + 'px; background-color:transparent;'], ['title', crtResUnits[i] + "/" + capacity[i]]]));
		bTb.appendChild(bRow);
		return bTb;
	};

	function updateResbarTooltip() {
		getFillTimeRow();
		for (var i = 0; i < 4; i++) {
			procNo = Math.round(crtResUnits[i] / capacity[i] * 100);
			if (procNo > 100) procNo = 100;
			prC = getColorResBarTooltip(procNo);
			aSpan = $g("resbarProc_" + i);
			if (aSpan) aSpan.parentNode.replaceChild(updProcRBTT(i, procNo, prC), aSpan);
			rbT = $g("resbarTable_" + i);
			if (rbT != null) rbT.parentNode.replaceChild(updColTableResBarTooltip(i, procNo, prC), rbT);
		};
	};

	function $df(dWidth, posX, posY, strTitle, sCookieN, divID, boolShowMinMax) {
		var wCMM = 25;
		iPx = parseInt(posX);
		if (iPx < 5) iPx = 10;
		iPy = parseInt(posY);
		if (iPy < 5) iPy = 10;
		if (boolShowMinMax == true) wCMM *= 2;
		var fDiv = $d("", [['id', divID], ['class', 'fldiv'], ['style', 'width:' + dWidth + 'px; top:' + iPy + 'px; left:' + iPx + 'px; -moz-border-radius:5px;']]);
		if (strTitle == T('VGL')) strTitle = "<a href='dorf3.php'>" + strTitle + "</a>";
		if (strTitle == '?') strTitle = "<img src='" + image["search"] + "'</img>";
		dragDiv = $d(strTitle, [['id', 'dragDiv_' + sCookieN], ['class', 'dragdiv'], ['style', 'width:' + (dWidth - wCMM-2) + 'px;']]);
		if (boolShowMinMax == true) {
			var xi = 70;
			switch (sCookieN) {
				case "resbar": xi = 70; break;
				case "userbookmarks": xi = 71; break;
				case "noteblock": xi = 72; break;
				case "vl2table": xi = 73; break;
				case "searchbar": xi = 74; break;
			};
			var mmDiv = $d("", [['id', 'mmdiv_' + sCookieN], ['class', 'mmdiv']]);
			var strImgMM = (TB36.O[xi] == '0' ? 'bMax' : 'bMin');
			var mmImage = $img([['src', image[strImgMM]]]);
			mmImage.addEventListener("click", minmaxDiv, false);
			mmDiv.appendChild(mmImage);
		};
		var closeDiv = $d("", [['class', 'closediv']]);
		var xImg = $img([['src', image["bClose"]], ['title', T('CLOSE')]]);
		xImg.addEventListener("click", fcloseDiv, false);
		closeDiv.appendChild(xImg);
		makeDraggable(fDiv, dragDiv);
		fDiv.appendChild(dragDiv);
		if (mmDiv) fDiv.appendChild(mmDiv);
		fDiv.appendChild(closeDiv);
		document.body.appendChild(fDiv);
		return fDiv;
		
		function minmaxDiv() {
			removeElement($g(divID));
			switch (sCookieN) {
				case "resbar": TB36.O[70] = (TB36.O[70] == '0' ? '1' : '0'); showResBarTooltip(); break;
				case "userbookmarks": TB36.O[71] = (TB36.O[71] == '0' ? '1' : '0'); showUserBookmarks(); break;
				case "noteblock": TB36.O[72] = (TB36.O[72] == '0' ? '1' : '0'); showNoteBlock(); break;
				case "vl2table": TB36.O[73] = (TB36.O[73] == '0' ? '1' : '0'); show2ndVillageList(); break;
				case "searchbar": TB36.O[74] = (TB36.O[74] == '0' ? '1' : '0'); showSearchBar(); break;
			};
			setGMcookieV2('TB3Setup', TB36.O, 'SETUP');
		};
		
		function fcloseDiv() {
			$g(divID).style.display = "none";
			switch (sCookieN) {
				case "resbar": TB36.O[39] = '0'; break;
				case "userbookmarks": TB36.O[20] = '0'; break;
				case "noteblock": TB36.O[22] = '0'; break;
				case "vl2table": TB36.O[18] = '0'; break;
				case "searchbar": TB36.O[32] = '0'; break;
				case "resupg": TB36.O[37] = '0'; break;
				case "bupg": TB36.O[41] = '0'; break;
				case "maptable": TB36.O[58] = '0'; break;
			};
			setGMcookieV2('TB3Setup', TB36.O, 'SETUP');
		};
	};

	function showResBarTooltip() {
		if (TB36.O[39] != "1") return;
		rbT = createResBarTable();
		if (TB36.O[40] != '1') {prbT = $e("P"); prbT.appendChild(rbT); rbT = prbT;} else {rbTminWidth = 200; var xy = TB36.O[75].split("|"); TB36.nTARbT = $df(rbTminWidth, xy[0], xy[1], T('RBTT'), "resbar", "resbarTT", true);};
		TB36.nTARbT.appendChild(rbT);
		rbT = $g("resbar");
		if (rbT && TB36.O[40] == '1') adjustFloatDiv(rbT, rbTminWidth, "resbar");
		setInterval(updateResbarTooltip, 10000);
	};

	function adjustFloatDiv(theTB, xmin, idDrag) {
		if (xmin < theTB.clientWidth) xmin = theTB.clientWidth;
		theTB.parentNode.style.width = (xmin + 1) + 'px';
		var dragDiv = $g('dragDiv_' + idDrag);
		wCMM = 25;
		if ($g('mmdiv_' + idDrag)) wCMM *= 2;
		if (dragDiv) dragDiv.style.width = (xmin - wCMM) + 'px';
		return;
	};
	
	function createResBarTable() {
		var rbT = $t([['id', 'resbar']]);
		if (TB36.O[70] == '0' && TB36.O[40] == '1' ) rbT.style.display = 'none';
		hRow = $r([['class', 'tb3r']]);
		hCell1 = $c(actV.vName, [['class', 'tb3cvn'], ['colspan', '4']]);
		hRow.appendChild(hCell1);
		hCell2 = $c(T('TOTAL')+"*H", [['class', 'tb3chtot']]);
		hRow.appendChild(hCell2);
		rbT.appendChild(hRow);
		//get total production per hour from the VillageRes cookie
		tPpH = [0, 0, 0, 0, 0];
		iHTML = '';
		intTot = 0;
		for (var i = 0; i < vList.length; i++) {if (TB36.VillageRes[vList[i].vID]) {for (var yi = 1; yi < 6; yi++) {tPpH[yi - 1] += (!TB36.VillageRes[vList[i].vID][yi] ? 0 : TB36.VillageRes[vList[i].vID][yi]);};};};
		TB36.tPpH = tPpH;
		intpph = prodPerHour[4];
		intPPH = TB36.tPpH[4];
		for (var i = 0; i < 3; i++) {intpph += prodPerHour[i]; intPPH += TB36.tPpH[i];};
		for (var i = 0; i < 4; i++) {
			procNo = Math.round(crtResUnits[i] / capacity[i] * 100);
			if (procNo > 100) procNo = 100;
			prC = getColorResBarTooltip(procNo);
			aRow = $r([['class', 'tb3r']]);
			aCell = $c("", [['class', 'lr']]);
			aCell.appendChild(updProcRBTT(i, procNo, prC));
			bCell = $c("", [['class', 'tb3cresbar']]);
			bCell.appendChild(updColTableResBarTooltip(i, procNo, prC));
			strSpan = timeToFill[i][1];
			strSpanNew = strSpan.replace("font-weight:bold", "font-weight:normal;");
			intTpPh = (i == 3 ? TB36.tPpH[4] : TB36.tPpH[i]);
			aRow.appendChild($c(gIc["r" + (i + 1)], [['class', 'tb3c']]));
			aRow.appendChild(aCell);
			aRow.appendChild(bCell);
			aRow.appendChild($c(strSpanNew, [['class', 'lr']]));
			aRow.appendChild($c($ls(intTpPh), [['class', 'tb3ctot']]));
			rbT.appendChild(aRow);
		};
		//row for totals per hour
		tRow = $r([['class', 'tb3r']]);
		tRow.appendChild($c(gIc["r1"] +"+"+ gIc["r2"] +"+"+ gIc["r3"] +"+"+ gIc["r4"], [['class', 'tb3c'], ['colspan', '3']]));
		tRow.appendChild($c($ls(intpph), [['class', 'tb3ctotv']]));
		tRow.appendChild($c($ls(intPPH), [['class', 'tb3ctot'], ['style', 'border-top:2px solid silver; border-bottom:2px solid silver;']]));
		rbT.appendChild(tRow);
		//row for total crop consumption
	/*	bRow = $r([['class', 'tb3r']]);
		bRow.appendChild($c(gIc["r5"], [['class', 'tb3c'], ['colspan', '2']]));
		bRow.appendChild($c("", [['class', 'tb3c']]));
		bRow.appendChild($c($ls(prodPerHour[6]), [['class', 'lr']]));
		bRow.appendChild($c($ls(tPpH[4] - tPpH[3]), [['class', 'tb3ctot']]));
		rbT.appendChild(bRow);*/
	 //row for effective crop production 
		cRow = $r([['class', 'tb3r']]);
		cRow.appendChild($c(gIc["r4"] + " - " + gIc["r5"], [['class', 'tb3c'], ['colspan', '3']]));
		//cRow.appendChild($c("", [['class', 'tb3c']]));
		cRow.appendChild($c($ls(prodPerHour[3]), [['class', 'lr']]));
		cRow.appendChild($c($ls(tPpH[3]), [['class', 'tb3ctot']]));
		rbT.appendChild(cRow);
		return rbT;
	};

	function insertUserLinks(aNode, uid, strName) {
		if (aNode.parentNode) {
			if (aNode.parentNode.innerHTML.indexOf(imP) == -1) {
				if (TB36.O[30] == "1") insertTravMapUserLink(aNode, uid, strName);
				if (TB36.O[28] == "1") insertWALink(aNode, uid);
				if (TB36.UserID != uid || (TB36.UserID == uid && TB36.O[62] != "0")) insertIGMLink(aNode, uid);
			};
		};
	};

	function insertAttSendResLinks(aNode, newdid) {
		aP = aNode.parentNode;
		if (aP && aP.innerHTML.indexOf("att_link_" + newdid) == -1) {
			aP.insertBefore($a("&nbsp;" + gIc["r41"], [['href', aNode.href.replace("karte.php?d", "build.php?z") + "&gid=17"]]), aNode.nextSibling);
			aP.insertBefore($a("&nbsp;" + gIc[getRPDefAction()], [['href', 'a2b.php?z=' + newdid], ['id', 'att_link_' + newdid]]), aNode.nextSibling);
		};
	};

	function insertAllyLinks(aNode, aid, strName) {
		aP = aNode.parentNode;
		if (aP && aP.innerHTML.indexOf(imP) == -1) {
			if (TB36.O[31] == "1") aP.insertBefore(createMapLink("ally", aid, strName), aNode.nextSibling);
			if (TB36.O[28] == "1") aP.insertBefore(createStatLink("ally", aid), aNode.nextSibling);
		};
	};

	function getTroopIndexTitleFromImg(tImg) {
		tInfo = [0, ""];
		if (tImg.src.match(/img\/un\/u\/(\d+)\.gif/)) tInfo[0] = RegExp.$1; else {imgCN = tImg.getAttribute("class");if (imgCN && imgCN.indexOf("unit") != -1 && imgCN.search(/(\d+)/) != -1) tInfo[0] = RegExp.$1;};
		tInfo[1] = tImg.title;
		return tInfo;
	};
	
	//add player & ally links - IGM, World Analyser, Map Analyser
	function playerLinks(idNode){
		var wrp = $g(idNode);
		if (!wrp) return;
		var aL = wrp.getElementsByTagName("a");
		for(var i = 0; i < aL.length; i++) {
			//a player link
			if (aL[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
				var a = RegExp.$1;
				if (a == 0) continue;
				if (aL[i].parentNode.className == 'menu' || aL[i].parentNode.nodeName == 'P') continue;
				if (TB36.O[86] == '1' && crtPage.indexOf("build.php?id=39") != -1 || crtPage.indexOf("build.php?id=39") == -1) insertUserLinks(aL[i], a, aL[i].textContent);
			//the attack link for karte.php links
			} else if (aL[i].href.search(/karte.php\?d=(\d+)/) > 0  && crtPage.indexOf("build.php?gid=17") == -1) {
				var vID = RegExp.$1;
				if (vID != actV.vID) {
					if (crtPage.indexOf("build.php?id=39") != -1 && TB36.O[85] == '1' || crtPage.indexOf("build.php?id=39") == -1 && TB36.O[14] == '1') insertAttSendResLinks(aL[i], vID);
					if (TB36.O[54] == "1" && (crtPage.indexOf("berichte.php") != -1 || crtPage.indexOf("spieler.php?") != -1 || crtPage.indexOf("allianz.php?s=3") != -1)) {
						//add a tooltip including distance and troop times - general
						aL[i].addEventListener("mouseover", showCoordAndDist(vID), false);
						aL[i].addEventListener("mouseout", hideTT, false);
					} else if (TB36.O[81] == '1' && (crtPage.indexOf("gid=16") != -1 || crtPage.indexOf("id=39") != -1)) {
						//add a tooltip including distance and troop times - rally point
						aL[i].addEventListener("mouseover", showCoordAndDist(vID), false);
						aL[i].addEventListener("mouseout", hideTT, false);
					};
				};
			//an alliance link
			} else if (aL[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;
				insertAllyLinks(aL[i], a, aL[i].textContent);
			//a message link
			} else if (TB36.O[60] == "1" && (aL[i].href.indexOf("nachrichten.php?id=") != -1 || aL[i].href.indexOf("berichte.php?id=") != -1)) addMrInPopup(aL[i]);
		};

		function showCoordAndDist(vID) {
			return function() {
				ttHTML = "<table id='mhtt'>" + getTroopMerchantTooltipHTML(vID, false, true, true, false, true) + "</table>";
				var ttDiv = $g("tb_tooltip");
				if (ttDiv == null) ttDiv = createTooltip();
				ttDiv.innerHTML = ttHTML;
				ttDiv.style.display = 'block';
				cdT = null;
			};
		};
	};

	//just to add the time tables for troops and merchants
	function quickCity() {
		var formInput = $xf("//form[@name='snd']");
		if (!formInput) return;
		if (crtPage.indexOf('a2b.php') != -1 || crtPage.indexOf('karte.php?d=') != -1) {
			var x = null;
			var y = null;
			strSearch = "//form[@name='snd']";
			aForm = $xf(strSearch);
			if (aForm) {x = $xf(strSearch + "//input[@name='x']"); y = $xf(strSearch + "//input[@name='y']");};
			if (x) x.addEventListener('keyup', function() {captureDestination();}, 0);
			if (y) y.addEventListener('keyup', function() {captureDestination();}, 0);
			if (crtPage.indexOf('a2b.php?z=') != -1 || (crtPage.indexOf('a2b.php?newdid=') != -1 && crtPage.indexOf('z=') != -1)) captureDestination();
		};

		function captureDestination() {
			var xD = x.value;
			var yD = y.value;
			var parOK = null;
			var oldTb = $g("trooptimetable");
			if (xD != "" && yD != "") {
				if (oldTb) {parOK = oldTb.parentNode; oldTb.parentNode.removeChild(oldTb);};
				//compatibility to Travian Battle Analyser
				if (!parOK) {parOK = $xf("//form[@name='snd']/p[4] | //form[@name='snd']/p[3]"); if (!parOK) {bOK = $g("btn_ok"); if (bOK) {parOK = $e("P", ""); bOK.parentNode.appendChild(parOK);};};};
				createTimeTroopTable(parOK, xD, yD, true);
			} else {if (oldTb) oldTb.style.visibility = "hidden";};
			return;
		};
	};

	function battleReportV2(aFrom){
		var origT = getOrigBRTable();
		if (!origT) return;
		var txtorigT = origT.innerHTML;
		if (TB36.O[63] != '1') return;

		var tx = $xf("//table[@class='std reports_read']//table[@class='std'] | //table[@class='tbg']//table[@class='tbg']", 'l');
		if (tx.snapshotLength < 2) tx = $xf("//table[@class='std reports_read']//table[@class='tbg']", 'l');
		if (tx.snapshotLength < 2) tx = $xf("//table[starts-with(@id, 'attacker') or starts-with(@class, 'defender')]", 'l');
		if (tx.snapshotLength < 2) return;

		if (aFrom == "orig") {
			var neworigT = origT.cloneNode(true);
			var divlmid2 = $g(dmid2);
			divlmid2.removeChild(origT);
			//add a paragraph, a table with a text and a checkbox
			var input = $i([['type', 'checkbox'], ['id', 'tb_battlereport']]);
			input.addEventListener("click", function() { shoBR(p1, neworigT, origT); }, 0);

			var p2 = $e("P", "");
			var ptable = $t([['style', 'background-color:' + TB36.DFc[1] + '; width:auto;']]);
			var aRow = $r([['class', 'tb3rnb']]);
			var aCell = $c(T('SOREP') + ":", [['class', 'tb3cnb'], ['style', 'text-align:'+ docDir[0] + ';']]);
			aRow.appendChild(aCell);
			var bCell = $c("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
			bCell.appendChild(input);
			aRow.appendChild(bCell);
			ptable.appendChild(aRow);
			p2.appendChild(ptable);
			divlmid2.appendChild(p2);
			//second paragraph (for displaying the tables)
			var p1 = $e("P", "");
			//append the paragraph to the divlmid2
			p1.appendChild(origT);
			divlmid2.appendChild(p1);
		};

		//get the total booty info (PLUS accounts)
		var gBooty = $xf("//div[@class='carry']");
		var bgBooty = null;
		if (gBooty) bgBooty = gBooty.cloneNode(true);

		//get the total booty
		var booty = 0;
		var labelReward = gIc["capacity"];
		var imgRes = new Array;
		for (var i = 0; i < 4; i++) {imgRes[i] = gIc["r" + (i + 1)];};
		var stBooty = [0, 0, 0, 0];

		if (TB36.T36 == false) {
			var aX = $xf("//tr[@class='cbg1'] | //table[@class='tbg']//tr", 'l');
			if (aX.snapshotLength >= 3){
				var intToProcess = -1;
				for (var i = 0; i < aX.snapshotLength; i++) {if (aX.snapshotItem(i).childNodes.length == 4) intToProcess = i;};
				if (intToProcess > -1) {
					var b = aX.snapshotItem(intToProcess).childNodes[3];
				} else {
					var b = aX.snapshotItem(1).childNodes[1];
					if (b.innerHTML.indexOf('class="res"') == -1) b = aX.snapshotItem(2).childNodes[1];
				};
				if (b.childNodes.length == 8){
					var qBooty = new Array();
					var infoBooty = '';
					for (var i = 0; i < 4; i++) {
						qBooty[i] = parseInt(b.childNodes[i*2 + 1].nodeValue);
						infoBooty += imgRes[i];
						infoBooty += qBooty[i];
						infoBooty += (i < 3 ? ' + ' : ' = ');
						stBooty[i] = qBooty[i];
					};
					booty = arrayToInt(qBooty);
					infoBooty += booty;
					b.innerHTML = infoBooty;
					if (bgBooty != null) b.appendChild(bgBooty);
				};
			};
		} else {
			var aX = tx.snapshotItem(0);
			var infoBooty = '';
			//var b1Table = aX.snapshotItem(0).parentNode;
			var b1Table = aX;
			if (!b1Table.rows[4]) return;
			var xi = 4;
			var gata = false;
			while (xi < b1Table.rows.length && !gata) {
				var bootyCell = b1Table.rows[xi].cells[1];
				if (bootyCell.textContent.indexOf("|") != -1) gata = true;
				xi += 1;
			};
			if (gata) {
				var resInfo = bootyCell;
				for (var xi = 0; xi < bootyCell.childNodes.length; xi++) {
					var aChild = bootyCell.childNodes[xi];
					if (aChild.className == "goods" || aChild.className == "res") resInfo = aChild;
				};
				var aqBooty = resInfo.textContent.split("|");
				if (aqBooty.length > 1) {
					var qBooty = new Array();
					for (var i = 0; i < 4; i++) {
						qBooty[i] = parseInt(aqBooty[i].replace(" ", "").replace(" ", ""));
						infoBooty += imgRes[i];
						infoBooty += qBooty[i];
						if (i < 3) infoBooty += ' + '; else infoBooty += ' = ';
						stBooty[i] = qBooty[i];
					};
					booty = arrayToInt(qBooty);
					infoBooty += booty;
					bootyCell.innerHTML = infoBooty;
					if (bgBooty != null) bootyCell.appendChild(bgBooty);
				};
			};
		};

		var arrLoss = new Array();
		var arrCarry = new Array();
		//there are more tables for the attack (1 = attacker, 1 = attacked and x = reinforcements)
		//tadPower => 0 = attack power; 1 = def_i power; 2 = def_c power; 3 = total loss; 4 = loss res 1; 5 = loss res 2; 6 = loss res 3; 7 = loss ress 4; 8 = crop consumption of killed troops; 9 = hero no.; 10 = crop consumption of initial troops
		var tadPower = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
		var atkLabelCell;
		var defLabelCell;
		var brCell = tx.snapshotItem(0).parentNode;

		for (var g = 0; g < tx.snapshotLength; g++){
			arrCarry[g] = 0;
			tTable = tx.snapshotItem(g);
			attdefPower = [0,0,0];
			intNoOfCells = tTable.rows[1].cells.length - 1;
			if (intNoOfCells == 11) {
				//corrected by JOPS
				if (g == 0) tadPower[0][9] += 1; else tadPower[1][9] += parseInt(tTable.rows[2].cells[11].textContent);
			};
			if (g == 0) atkLabelCell = tTable.rows[0].cells[0].textContent; else defLabelCell = tTable.rows[0].cells[0].textContent;
			for(var j = 1; j < 11; j++){
				tImg = tTable.rows[1].cells[j].getElementsByTagName('img')[0];
				tInd = getTroopIndexTitleFromImg(tImg)[0];
				tNo = parseInt(tTable.rows[2].cells[j].textContent);
				tNoLost = 0;
				if (tTable.rows[3]) tNoLost = parseInt(tTable.rows[3].cells[j].textContent);
				if (!isNaN(tNo)) {
					if (g == 0) {
						attdefPower[0] += uc[tInd][5] * tNo;
						tadPower[0][0] += uc[tInd][5] * tNo;
						tadPower[0][1] += uc[tInd][6] * tNo;
						tadPower[0][2] += uc[tInd][7] * tNo;
						tadPower[0][8] += uc[tInd][9] * tNoLost;
						tadPower[0][10] += uc[tInd][9] * tNo;
					} else {
						attdefPower[0] += uc[tInd][5] * tNo;
						attdefPower[1] += uc[tInd][6] * tNo;
						attdefPower[2] += uc[tInd][7] * tNo;
						tadPower[1][0] += uc[tInd][5] * tNo;
						tadPower[1][1] += uc[tInd][6] * tNo;
						tadPower[1][2] += uc[tInd][7] * tNo;
						tadPower[1][8] += uc[tInd][9] * tNoLost;
						tadPower[1][10] += uc[tInd][9] * tNo;
					};
				};
				u = uc[tInd];
				p = tTable.rows[3] ? tTable.rows[3].cells[j].innerHTML : 0;
				ptu = arrayByN(u, p);
				arrLoss[g] = arrayAdd(arrLoss[g], ptu.slice(0, 4));
				arrCarry[g] += (tTable.rows[2] ? tTable.rows[2].cells[j].innerHTML - p : 0) * u[4];
			};
			//add the attack/def power to the row[1].cells[0]
			var attdefCell = tTable.rows[1].cells[0];
			if (g == 0) {
				//the attacking power
				$at(attdefCell, [['style', 'font-size:8pt; color:#FF8000; text-align:center;']]);
				attdefCell.innerHTML = $ls(attdefPower[0]) + " " + gIc["att_all"];
			} else {
				//the defense power of the defender (per table)
				$at(attdefCell, [['style', 'font-size:8pt; color:green; text-align:center;']]);
				attdefCell.innerHTML = $ls(attdefPower[1]) + " " + gIc["def_i"] + "<br>" + $ls(attdefPower[2]) + " " + gIc["def_c"];
			};

			//add the loss row to the att/def table
			var iHTML = '';
			for (var i = 0; i < 4; i++){
				iHTML += imgRes[i];
				iHTML += arrLoss[g][i];
				if (i < 3) iHTML += ' + '; else iHTML += ' = ';
				if (g == 0) tadPower[0][4 + i] += arrLoss[g][i]; else tadPower[1][4 + i] += arrLoss[g][i];
			};
			var lossTotal = arrayToInt(arrLoss[g]);
			if (g == 0) tadPower[0][3] += lossTotal; else tadPower[1][3] += lossTotal;
			if (lossTotal > 0) iHTML += " <b><font color='red'>" + lossTotal + "</font></b>"; else iHTML += lossTotal;
			var informe = $c(iHTML, [['colspan', intNoOfCells]]);
			var aRow = $r();
			aRow.appendChild($c(T('LOSS'), [['style', 'text-align:left;']]));
			aRow.appendChild(informe);
			tTable.appendChild(aRow);

			//For the attacker we'll compute the profit and efficiency of the attack
			if (g == 0){
				//Profit compared to lossTotal
				var profit = 0;
				if (arrCarry[g] == 0) {booty = 0; for (var i = 0; i < 4; i++) {stBooty[i] = 0;};} else  {profit = ((booty - lossTotal) * 100 / booty).toFixed(2);};
				if (booty == 0)	if (lossTotal == 0) profit = 0; else profit = -100;
				var bCell = $c(profit + "%", [['colspan', intNoOfCells]]);
				var pRow = $r();
				pRow.appendChild($c(T('PROFIT'), [['style', 'text-align:left;']]));
				pRow.appendChild(bCell);
				tTable.appendChild(pRow);

				//Efficiency -> the entire booty compared to how much the attacker can carry back (considering only the troops that survived)
				var efficiency = 100 - ((arrCarry[g] - booty) * 100 / arrCarry[g]);
				if (arrCarry[g] == 0) efficiency = 0;
				var bCell = $c(efficiency.toFixed(2) + "% (" + booty + "/" + arrCarry[g] + ")", [['colspan', intNoOfCells]]);
				var eRow = $r();
				eRow.appendChild($c(T('EFICIENCIA'), [['style', 'text-align:left;']]));
				eRow.appendChild(bCell);
				tTable.appendChild(eRow);
			};
		};

		//add a simple statistics table
		var sTable = $t([['id', 'br_table']]);
		//add the title row
		var sTitleRow = $r();
		sTitleRow.appendChild($c(T('STAT'), [['class', 'tb3cbrh1']]));
		sTitleRow.appendChild($c(atkLabelCell, [['class', 'tb3cbrh2']]));
		sTitleRow.appendChild($c(defLabelCell, [['class', 'tb3cbrh3']]));
		sTable.appendChild(sTitleRow);
		//attack power row
		var atkRow = $r();
		atkRow.appendChild($c(gIc["att_all"], [['class', 'tb3cbrc']]));
		atkRow.appendChild($c($ls(tadPower[0][0])));
		atkRow.appendChild($c($ls(tadPower[1][0])));
		sTable.appendChild(atkRow);
		//def power rows
		var defiRow = $r();
		defiRow.appendChild($c(gIc["def_i"], [['class', 'tb3cbrc']]));
		defiRow.appendChild($c($ls(tadPower[0][1])));
		defiRow.appendChild($c($ls(tadPower[1][1])));
		sTable.appendChild(defiRow);
		var defcRow = $r();
		defcRow.appendChild($c(gIc["def_c"], [['class', 'tb3cbrc']]));
		defcRow.appendChild($c($ls(tadPower[0][2])));
		defcRow.appendChild($c($ls(tadPower[1][2])));
		sTable.appendChild(defcRow);
		//reward row (for the attacker only)
		var rewATotal = $c($ls(booty) + (TB36.O[64] == '1' ? " " + T('TOTAL') : ''), [['class', 'tb3cbrbg']]);
		var rewRow1 = $r();
		var intDetailRowSpan = 1 + parseInt(TB36.O[64]);
		var rewLabelCell = $c(labelReward, [['class', 'tb3cbrc'], ['rowspan', intDetailRowSpan]]);
		rewRow1.appendChild(rewLabelCell);
		if (TB36.O[64] == '1') {var rewA = ''; for (var i = 1; i < 5; i++) {rewA += $ls(stBooty[i - 1]) + " " + imgRes[i - 1] + "<br>";}; rewADetail = $c(rewA, [['class', 'tb3cbrg']]);rewRow1.appendChild(rewADetail);} else rewRow1.appendChild(rewATotal);
		rewRow1.appendChild($c('-', [['class', 'tb3cbrb'], ['rowspan', intDetailRowSpan]]));
		sTable.appendChild(rewRow1);
		if (TB36.O[64] == '1') {var rewRow2 = $r(); rewRow2.appendChild($c($ls(booty) + " " + T('TOTAL'), [['class', 'tb3cbrbg']])); sTable.appendChild(rewRow2);};
		//loss row
		var strLossATotal = $ls(tadPower[0][3]) + (TB36.O[64] == '1' ? " " + T('TOTAL') : '');
		var lossATotal = $c(strLossATotal, [['class', 'tb3cbrb']]);
		if (tadPower[0][3] > 0) $at(lossATotal, [['class', 'tb3cbrbr']]);
		var strLossDTotal = $ls(tadPower[1][3] + booty) + (TB36.O[64] == '1' ? " " + T('TOTAL') : '');
		lossDTotal = $c(strLossDTotal, [['class', 'tb3cbrb']]);
		if (tadPower[1][3] + booty > 0) $at(lossDTotal, [['class', 'tb3cbrbr']]);
		var lossRow1 = $r();
		lossRow1.appendChild($c(T('LOSS'), [['class', 'tb3cbrc'], ['rowspan', intDetailRowSpan]]));
		if (TB36.O[64] == '1') {
			var iLossA = '';
			var iLossD = '';
			for (var i = 1; i < 5; i++) {iLossA += $ls(tadPower[0][i + 3]) + " " + imgRes[i - 1] + "<br>"; iLossD += $ls(tadPower[1][i + 3] + stBooty[i - 1]) + " " + imgRes[i - 1] + "<br>";};
			var lossADetail = $c(iLossA);
			if (tadPower[0][3] > 0) $at(lossADetail,[['class', 'tb3cbrr']]);
			lossRow1.appendChild(lossADetail);
			var lossDDetail = $c(iLossD);
			if (tadPower[1][3] + booty > 0) $at(lossDDetail, [['class', 'tb3cbrr']]);
			lossRow1.appendChild(lossDDetail);
		} else {lossRow1.appendChild(lossATotal); lossRow1.appendChild(lossDTotal);};
		sTable.appendChild(lossRow1);
		if (TB36.O[64] == '1') {var lossRow2 = $r(); lossRow2.appendChild(lossATotal); lossRow2.appendChild(lossDTotal); sTable.appendChild(lossRow2);};
		//crop consumption of initial troops
		var ccRow = $r();
		ccRow.appendChild($c(gIc["r5"], [['class', 'tb3cbrc']]));
		ccRow.appendChild($c(tadPower[0][10] + " (-" + tadPower[0][8] + ")"));
		ccRow.appendChild($c(tadPower[1][10] + " (-" + tadPower[1][8] + ")"));
		sTable.appendChild(ccRow);
		//hero row
		var heroRow = $r();
		heroRow.appendChild($c(gIc["hero"], [['class', 'tb3cbrc']]));
		var accA = (tadPower[0][9] > 0 ? tadPower[1][8] : 0);
		var accD = (tadPower[1][9] > 0 ? Math.floor(tadPower[0][8] / tadPower[1][9]) : 0);
		heroRow.appendChild($c(accA, [['class', 'tb3cbrb']]));
		heroRow.appendChild($c(accD, [['class', 'tb3cbrb']]));
		sTable.appendChild(heroRow);
		//simple paragraph
		brCell.appendChild($e("P"));
		brCell.appendChild(sTable);

		function shoBR(aP, nT, oT) {var iC = $g("tb_battlereport"); if (iC) {if (iC.checked == true) {aP.removeChild(oT); aP.appendChild(nT);} else {aP.removeChild(nT); aP.appendChild(oT);};};};
	};

	//get the troop movements from the "dorf1.php" page
	function getTroopMovements() {
		var arrAtt = new Array();
		var aTM = $xf("//div[@id='troop_movements']//table/tbody/tr | //div[starts-with(@id, 'ltbw')]//table[@class='f10']/tbody/tr | //table[@id='movements']/tbody/tr", 'l');
		var intNo = 0;
		if (aTM.snapshotLength > 0) {
			for (var i = 0; i < aTM.snapshotLength; i++) {
				var aRow = aTM.snapshotItem(i);
				if (aRow.cells.length > 1) {
					var aImg = aRow.cells[0].getElementsByTagName("IMG");
					if (aImg.length > 0) {
						var imgType = aImg[0].className;
						if (imgType == '') imgType = aImg[0].src.substring(aImg.src.lastIndexOf("/") + 1);
						var strTime;
						if (aRow.cells[4]) {
							strTime = aRow.cells[4].getElementsByTagName("SPAN")[0].textContent;
							intNo = parseInt(aRow.cells[1].textContent.replace("»", "").replace("«", ""));
						} else {
							if (aRow.cells[1].getElementsByTagName("SPAN").length == 2) {
								strTime = aRow.cells[1].getElementsByTagName("SPAN")[1].textContent;
								intNo = parseInt(aRow.cells[1].getElementsByTagName("SPAN")[0].textContent);
							} else {
								intNo = parseInt(aRow.cells[1].getElementsByTagName("SPAN")[0].textContent);
								if (aRow.nextSibling) strTime = aRow.nextSibling.cells[1].getElementsByTagName("SPAN")[0].textContent; else strTime = "00:00:00"
							};
						};
						var dFirst = new Date();
						dFirst.setTime(dFirst.getTime() + toSeconds(strTime) * 1000);
						arrAtt[arrAtt.length] = new xTrMov(imgType, intNo, dFirst.getTime());
					};
				};
			};
		};
		setGMcookieV2('TroopMovements', arrAtt, actV.vNewdid);
	};

	//Create the resource fields upgrade table
	function processDorf1() {
		getTroopMovements();
		var vXY = TB36.U[6].split('|');
		var bIsC = xy2id(vXY[0], vXY[1]) == parseInt(actV.vID);//is this the capital
		//get the buildings in progress
		var arrBiP = getArrBiP();
		if (TB36.O[38] == "1") {
			//create the DIV for the coloured level numbers
			var intTop = 69;
			if (TB36.M35 == 1) intTop = 47; else if (TB36.M35 == 2) intTop = 90;
			var posDIV = $d("", [['id', 'resDiv'], ['style', 'position:absolute; top:' + intTop + 'px; left:12px; z-index:11;']]);
			if (TB36.T36 == false) {
				if (docDir[0] == 'right') $at(posDIV, [['style', 'position:absolute; top:69px; left:257px; z-index:20;']]);
			} else {
				if (docDir[0] == 'right') {if (TB36.M35 == 2) pDs = 'position:absolute; top:' + intTop + 'px; left:240px; z-index:20;'; else pDs = 'position:absolute; top:30px; left:257px; z-index:20;'; $at(posDIV, [['style', pDs]]);};
			};
			$g(dmid2).appendChild(posDIV);
		};

		var grid = new Array(4);
		for (var i = 0; i < 4; i ++) {grid[i] = new Array(26); for (var j = 0; j <= 25; j++) {grid[i][j] = 0;};};

		//12 types of villages (only 6 if < T3.5)
		var dist = [
			[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //9 crop
			[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-4-6
			[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3], //15 crop
			[0, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-3-7
			[2, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-4-7
			[2, 3, 3, 0, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-3-4-7
			[2, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-5-4-6
			[2, 0, 0, 2, 0, 3, 3, 2, 2, 1, 1, 2, 0, 3, 3, 1, 3, 3], //4-3-5-6
			[0, 3, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1]  //5-4-3-6
		];

		var rDiv = $xf("//div[starts-with(@id,'village_map')]");
		var aTitle;
		if (rDiv) aTitle = $xf("//map[starts-with(@id, 'rx')]"); else {rDiv = $xf("//div[starts-with(@id,'f')]"); aTitle = $xf("//map[starts-with(@name, 'rx')]");};
		if (rDiv) {if (rDiv.className) rDiv.className.search(/f(\d+)/); else rDiv.id.search(/f(\d+)/); var tipo = RegExp.$1;};
		var imgLvl;
		for (var i = 1; i <= 18; i++){
			imgLvl = 0;
			if (TB36.T36 == false) {imgLvl = $xf("//img[@class='rf" + i + "']");} else {var aLvl = $xf("//img[starts-with(@class, 'reslevel rf" + i + " ')]"); if (aLvl != null) imgLvl = aLvl.className.split(" ")[2].replace("level", "");};
			var crtLevel = 0;
			var strNewLevel = null;
			if (imgLvl != 0) {
				if (TB36.T36 == false) {imgLvl.src.search(/\/s(\d+).gif$/); crtLevel = parseInt(RegExp.$1);} else crtLevel = parseInt(imgLvl);
				if (arrBiP != null) {strNewLevel = getNewUpgradeLevel(arrBiP, '', crtLevel);crtLevel = strNewLevel[0];};
				grid[dist[tipo - 1][i - 1]][crtLevel] = i;
			} else grid[dist[tipo - 1][i - 1]][0] = i;

			var strClass = (TB36.T36 == false ? "rf" : "reslevel rf") + i;
			var resLink = $a("", [['href', "build.php?id=" + i], ['id', "RES" + i], ['class', strClass], ['title', aTitle.areas[i-1].title]]);

			if (posDIV) {aDIV = createCNDiv(crtLevel, strNewLevel); resLink.appendChild(aDIV); posDIV.appendChild(resLink);};

			if (TB36.O[38] == "1") {
				aDIV.style.visibility = 'visible';
				var theDC = TB36.CNc[1];
				if ((bIsC == false && crtLevel < 10) || (bIsC == true && TB36.O[1] != "1") || (bIsC == true && TB36.O[1] == "1" && crtLevel < 12)) {
					//select resource type
					var aCol = colorLvl(crtLevel, dist[tipo - 1][i - 1] + 1);
					if (aCol == 2) theDC = TB36.CNc[4]; else if (aCol == 0) theDC = TB36.CNc[3];
				} else theDC =  TB36.CNc[2];
				aDIV.style.backgroundColor = theDC;
			};
		};

		if (TB36.O[37] == '1') {
			//create the resource fields upgrade table
			var tb1 = $t([['id', 'upgTable']]);
			var aRow1 = $r();
			var bsUT = false;
			tb1.appendChild(aRow1);
			var nE = [0, 0, 0, 0];
			var nR = 0;
			for (var i = 0; i < 4; i++) {
				var td1 = $c(gIc["r" + (i + 1)], [['class', 'tb3uthc']]);
				aRow1.appendChild(td1);
				for (var j = 0; j < 25; j++){
					if ((bIsC) || (!bIsC && j < 10)){
						if (grid[i][j] > 0 && bCost[i + 1][j+1] != null){
							nE[i] = nE[i] + 1;
							for (k = 0; k < 4; k++) {if (nR < nE[k]) {nR = nE[i]; var bRow = $r(); for (xi = 0; xi < 4; xi++) {bRow.appendChild($c("", [['class', 'tb3utbc']]));};tb1.appendChild(bRow);};};
							var tb2 = $t();
							var td4 = tb1.rows[nE[i]].cells[i];
							td4.appendChild(tb2);
							bsUT = true;
							var aRow3 = $r();
							var xOff = j > 9 ? 13 : 17;
							var cDIV = $d(j, [['style', 'font-family: Arial,Helvetica,Verdana,sans-serif; font-size:9pt; color:black; position:relative; top:-28px;' + docDir[0] + ':' + xOff +'px; z-index:100;']]);
							aLnk = $a("", [['href', "/build.php?id=" + grid[i][j]]]);
							aDiv = $d("", [['style', 'width:0%;']]);
							aDiv.appendChild($img([['src', image["upgr" + i]], ['title', T('RES' + (i + 1))]]));
							aDiv.appendChild(cDIV);
							aLnk.appendChild(aDiv);
							aRow3.appendChild($c("").appendChild(aLnk));
							var td3 = $c("");
							cpB = [bCost[i + 1][j][4], bCost[i + 1][j + 1][4]];
							ccB = [bCost[i + 1][j][5], bCost[i + 1][j + 1][5]];
							td3.appendChild(calculateResourceTime(bCost[i + 1][j+1], "100", "/build.php?id=" + grid[i][j], cpB, ccB));
							aRow3.appendChild(td3);
							tb2.appendChild(aRow3);
						};
					};
				};
			};
			if (bsUT == true)  {
				var dxy = TB36.O[88].split("|");
				var drUpg = $df(parseInt(tb1.width), dxy[0], dxy[1], " ", 'resupg', "resupgTT", false);
				drUpg.appendChild(tb1);
				adjustFloatDiv(tb1, 682, 'resupg');
			};
		};
		arrBiP = null; dist = null; bCost = null; grid = null; aDiv = null; aLnk = null; cpB = null; ccB = null; cDIV = null;
	};

	function getNewUpgradeLevel(aB, bName, lvl) {
		var nlvl = [parseInt(lvl), ''];
		for (var xi = 0; xi < aB.length; xi++) {if (aB[xi].name != '') {if (aB[xi].name == bName && parseInt(aB[xi].lvl) == nlvl[0] + 1) {nlvl[0] += 1; nlvl[1] = " (↑ " + (nlvl[0] + 1) + ")";};};};
		return nlvl;
	};

	//Create the buildings upgrade table & center numbers if necessary
	function processDorf2() {
		var mapB = $g('map2');
		if (!mapB) mapB = $xf("//map[@name='" + dmap + "']");
		if (!mapB) return;

		var intCpR = 3;
		var bsUT = false;
		var arrBiP = getArrBiP();
		var bData = new Array();

		function xBinfo(title, href, xy, bImg) {
			//current level and name of the building
			var bName = title;
			var bLevel = title.split(" ");
			var blvl = -1;
			if (bLevel.length > 1) {
				blvl = parseInt(bLevel[bLevel.length - 1]);
				if (isNaN(blvl)) blvl = -1;
				bName = bLevel.pop();
				bName = bLevel.pop();
				bName = bLevel;
				bName = bLevel.join(" ");
			};
			//gid of the building
			var gid = -1;
			var arrGid = bImg.split("/");
			var imgGid = arrGid[arrGid.length-1].split(".");
			if (imgGid[0].search(/(\d+)/) != -1) gid = parseInt(RegExp.$1);
			//create the bInfo object
			this.title = title;
			this.link = href;
			this.xy = xy;
			this.lvl = blvl;
			this.gid = gid;
			this.name = bName;
			this.bImg = bImg;
			return this;
		};

		function sortBuildingsInUpgTable(b, z) {for (var i = 0; i < z; i++) {var k = b[i]; var j = i; while (j > 0 && b[j - 1].name > k.name) {b[j] = b[j - 1]; j--;}; b[j] = k;}; return b;};//insertion sort

		//get the building images
		var bImg = new Array();
		if (TB36.T36 == false) {
			var aXP = $xf("//div[@id='" + dmid2 + "']/img/@src", 'l');
		} else {
			var aXP = $xf("//div[starts-with(@id, 'village_map')]/img[starts-with(@class, 'building') or starts-with(@class, 'dx') or starts-with(@class, 'ww')] | //div[starts-with(@class, 'village2_map') and not (@id='village2_levels')]//img[starts-with(@class, 'building') or starts-with(@class, 'dx')]", 'l');
		};
		if (TB36.T36 == false) bImg[0] = img('g/g16.gif');
		for (var i = 0; i < aXP.snapshotLength; i++) {if (TB36.T36 == false) {bImg[bImg.length] = aXP.snapshotItem(i).nodeValue;} else {clName = aXP.snapshotItem(i).getAttribute("class"); if (clName != null && clName != '') {clName1 = clName.split(" "); if (clName1.length > 1) bImg[bImg.length] = clName1[clName1.length - 1] + ".gif";};};};
		
		//get the type of wall
		var ahref = $xf("//area[@href='build.php?id=40']");
		if (ahref) {
			var b = '';
			switch (TB36.U[1]) {
				case avRace[0]: b = "g/g31.gif"; break;
				case avRace[1]: b = "g/g32.gif"; break;
				case avRace[2]: b = "g/g33.gif"; break;
			};
			if (b != '') {if (TB36.T36 == false) bImg[bImg.length - 2] = img(b); else bImg[bImg.length] = b;};
		};

		//get building array and set the required cookies
		var maxB = bImg.length;
		for (var i = 0; i < bImg.length; i++) {
			bData[i] = new xBinfo(mapB.areas[i].title, mapB.areas[i].href, mapB.areas[i].coords, bImg[i]);
			switch (bData[i].gid) {
				case 25: TB36.d2spB[0] = 25; break; //residence is available
				case 26: TB36.d2spB[0] = 26; break; //palace is available
				case 19: TB36.d2spB[1] = 19; TB36.avBKS = true; if (TB36.U[1] == '' || TB36.U[2] == '') getRace(); break;
				case 29: TB36.d2spB[2] = 29; break;
				case 21: TB36.d2spB[3] = 21; break;
				case 20: TB36.d2spB[4] = 20; break;
				case 30: TB36.d2spB[5] = 30; break;
				case 14: TB36.d2spB[6] = bData[i].lvl; break;
				case 24: TB36.d2spB[7] = 24; break;
				case 41: TB36.d2spB[8] = bData[i].lvl; break;
			};
		};
		setGMcookieV2('specBuildings', TB36.d2spB, actV.vNewdid);
		
		var aTb = $t([['id', 'upgTable']]);
		j = 0;
		k = bImg.length;
		if (TB36.T36 == false) k = k - 1;

		if (TB36.O[42] == '1') bData = sortBuildingsInUpgTable(bData, k);

		divmap2 = $xf("//div[starts-with(@class, 'village2_map d2_')]");
		if (divmap2 && TB36.O[43] == '1') {var dm2c = divmap2.className.split(" "); divmap2.className = 'village2_mapTB3 ' + dm2c[1];};
		
		dy = (TB36.M35 == 0 || TB36.M35 == 2) ? 60 : 30;
		var nr, na, nc, tb2, bLevel, strNewLevel, bRow, aCol, theDC, cpB, ccB, bC, bML, xy, iB;
		for (var i = 0; i < k; i++) {
			if (bData[i].gid != -1 && bData[i].lvl != -1) {
				var strNewLevel = [bData[i].lvl, ''];
				var bLevel = bData[i].lvl;
				if (arrBiP != null) {strNewLevel = getNewUpgradeLevel(arrBiP, bData[i].name, bData[i].lvl); bLevel = strNewLevel[0];};
				if (TB36.O[43] == '1' && bLevel != -1) {
					//show center numbers if required
					aDIV = createCNDiv(bData[i].lvl, strNewLevel);
					xy = bData[i].xy.split(",");
					aDIV.style.top = parseInt(xy[1]) + dy + 'px';
					aDIV.style.left = parseInt(xy[0]) + 95 + 'px';
					bML = getBmaxLevel(bData[i].gid);
					theDC = TB36.CNc[1];
					if (TB36.O[44] == '1') {if (bLevel == bML || bLevel == 100) {theDC =  TB36.CNc[2];} else {var aCol = colorLvl(bLevel, bData[i].gid); switch (aCol) {case 0: theDC = TB36.CNc[3]; break; case 2: theDC = TB36.CNc[4]; break;};};};
					aDIV.style.backgroundColor = theDC;
					$g(dmid2).appendChild(aDIV);
				};

				if (TB36.O[41] == '1') {
					//create a new cell in the building uprade table id necessary
					if (bCost[bData[i].gid] != null && bCost[bData[i].gid][bLevel + 1] != null) {
						//create a new row if necessary
						if (j % intCpR == 0) {var aRow = $r(); aTb.appendChild(aRow);};
						j++;
						bsUT = true;
						//Switch image for the roman wall/pallisade/earth wall/rally point
						if (TB36.M35 != 0) strBc = "building "; else strBc = "";
						var iB = 'class="' + strBc + 'g' + bData[i].gid + '" src="' + xGIF + '"';
						switch (bData[i].gid) {
							//31,32,33 - citywall, earthwall, palisade
							case 31: bData[i].bImg = image["cw"]; iB = 'src="' + bData[i].bImg + '"'; break;
							case 32: bData[i].bImg = image["ew"]; iB = 'src="' + bData[i].bImg + '"'; break;
							case 33: bData[i].bImg = image["pa"]; iB = 'src="' + bData[i].bImg + '"'; break;
							case 16: if (TB36.T36 == false) {bData[i].bImg = image["rap"]; iB = 'src="' + bData[i].bImg + '"';}; break;
							case 40: bData[i].bImg = image["ww"]; iB = 'src="' + bData[i].bImg + '"'; break;
						};
						bC = $c("", [['class', 'tb3utbc'], ['style', 'width:' + Math.floor(100/intCpR) + '%;']]);
						aRow.appendChild(bC);
						tb2 = $t();
						bC.appendChild(tb2);
						nr = $r();
						na = $a(bData[i].title + strNewLevel[1], [['href', bData[i].link]]);
						nc = $c('', [['colspan',"2"], ['class', 'center']]);
						nc.appendChild(na);
						nr.appendChild(nc);
						tb2.appendChild(nr);
						bRow = $r();
						if (TB36.T36 == false) iB = 'src="' + bData[i].bImg + '"';
						var td2 = $c('');
						td2.appendChild($a("<img '" + iB + "'></img>", [['href', bData[i].link]]));
						bRow.appendChild(td2);
						cpB = [bCost[bData[i].gid][bLevel][4], bCost[bData[i].gid][bLevel + 1][4]];
						ccB = [bCost[bData[i].gid][bLevel][5], bCost[bData[i].gid][bLevel + 1][5]];
						var td3 = $c("");
						td3.appendChild(calculateResourceTime(bCost[bData[i].gid][bLevel + 1], "100", bData[i].link, cpB, ccB));
						bRow.appendChild(td3);
						tb2.appendChild(bRow);
					};
				};
			};
		};
		while (j % intCpR != 0) {aRow.appendChild($c("")); j++;};
		if (TB36.O[41] == '1') {
			if (bsUT == true)  {
				var dxy = TB36.O[89].split("|");
				var drUpg = $df(parseInt(aTb.width), dxy[0], dxy[1], " ", 'bupg', "bupgTT", false);
				drUpg.appendChild(aTb);
				adjustFloatDiv(aTb, 682, 'bupg');
			};
		};
		arrBiP = null; bData = null; bImg = null; bCost = null; aDIV = null; cpB = null; ccB = null; nc = null; na = null; nr = null; mb = null;
	};

	function sortTable(sTableID, iCol, sDataType) {
		return function(){
			var oTb = $g(sTableID);
			var oB = oTb.tBodies[0];
			var arR = oB.rows;
			var aTRs = new Array;
			for (var i = 0; i < arR.length; i++) aTRs[i] = arR[i];
			if (oTb.getAttribute("sortCol") == iCol) aTRs.reverse(); else aTRs.sort(generateCompareTRs(iCol, sDataType));
			var oFrg = document.createDocumentFragment();
			for (var i = 0; i < aTRs.length; i++) oFrg.appendChild(aTRs[i]);
			oB.appendChild(oFrg);
			$at(oTb, [['sortCol', iCol]]);
			aTRs = null; arR = null; oB = null; oTb = null;
		};
	};

	function convert(aE, sDataType) {
		switch(sDataType) {
			case "int": return ((aE.nodeValue == null) || !aE.nodeValue.match(/\d+/)) ? 0 : parseInt(aE.nodeValue);
			case "float": return ((aE.nodeValue == null) || !aE.nodeValue.match(/\d+/)) ? 0 : parseFloat(aE.nodeValue);
			default: return (aE == null) ? '' : aE.textContent.toLowerCase();
		};
	};

	function generateCompareTRs(iCol, sDataType) {
		return function compareTRs(oTR1, oTR2) {
			var v1 = convert(oTR1.cells[iCol].firstChild, sDataType);
			var v2 = convert(oTR2.cells[iCol].firstChild, sDataType);
			if (v1 < v2) return -1; else if (v1 > v2) return 1; else return 0;
		};
	};

	function showNoteBlock() {
		//add the noteblock if necessary
		if (TB36.O[22] != '1') return;
		var aTb = createNoteBlock();
		if (TB36.O[23] != '1') {var parNB = $e("P"); parNB.appendChild(aTb); aTb = parNB;} else {var nbXY = TB36.O[77].split("|"); var nbWidth = aTb.style.width; TB36.nTANb = $df(parseInt(nbWidth), nbXY[0], nbXY[1], T('NBO'), 'noteblock', "noteblockTT", true);};
		TB36.nTANb.appendChild(aTb);
	};

	//Create a noteblock (data from GM cookie)
	function createNoteBlock(){
		var sDisp = TB36.O[72] == '0' && TB36.O[23] == '1' ? ' display:none;' : '';
		var tr2 = $r();
		var td2 = $c("");
		var nT = getGMcookie("notas", false);
		if (nT == "false") nT = "";
		//height
		var nl = parseInt(TB36.O[25]) > 0 && nT != '' ? 3 + nT.split("\n").length : 10;
		if (nl > 30) nl = 30;
		//width
		var nboption = parseInt(TB36.O[24]);
		var dI = (nboption == 0 && screen.width >= 1200 || nboption == 2) ? [545, '60'] : [280, '30'];
		var aTb = $t([['id', 'noteblock'], ['style', "width:" + dI[0] + "px;" + sDisp]]);
		var tA = $e("TEXTAREA", nT);
		$at(tA, [["cols", dI[1]], ["id", "noteblockcontent"], ['style', 'background-image: url(' + image["underline"] + '); width:' + (dI[0] - 10) + 'px;'], ["rows", nl]]);
		td2.appendChild(tA);
		tr2.appendChild(td2);
		var tr3 = $r();
		var td3 = $c("", [['style', 'text-align:center;']]);
		var bS = $i([['type', 'image'], ['src', image["bSave"]], ['title', T('SAVE')]]);
		if (TB36.O[23] != '1') $at(bS, [['style', 'padding:3px']]);
		bS.addEventListener("click", function(){setGMcookie("notas", tA.value, false); alert(T('SAVED')); }, 0);
		td3.appendChild(bS);
		tr3.appendChild(td3);
		aTb.appendChild(tr2);
		aTb.appendChild(tr3);
		nT = null;
		return aTb;
	};

	function getTroopsDetails(qDist, xRace, evTS) {
		arX = [qDist, 0, 0, 1, 1];
		if (evTS == true) {if (TB36.d2spB[6] != 0) {arX[2] = parseInt(TB36.d2spB[6]); if (qDist > 30) {arX[0] = 30; arX[1] = qDist - 30;};};};//get the tournament square level
		arX[3] = getDR(xRace);//troop image ZERO index
		if (TB36.speed == true) arX[4] = 2;//multiplier for speed servers
		return arX;
	};

	function createTimeTroopTable(pNode, x2, y2, bAR) {
		var aTb = $t([['id', 'mhtt'],['style', 'width:350px;']]);
		aTb.innerHTML = getTroopMerchantTooltipHTML(xy2id(x2, y2), true, true, true, bAR, false);
		var aD = $d("", [['id', 'trooptimetable']]);
		aD.appendChild(aTb);
		pNode.appendChild(aD);
	};

	function createTimeMerchantTable(pNode, x2, y2) {
		var aTb = $t([['id', 'mhtt'], ['style', 'width:350px;']]);
		aTb.innerHTML = getTroopMerchantTooltipHTML(xy2id(x2, y2), true, true, false, false);
		var aD = $d("", [['id', 'merctt']]);
		aD.appendChild(aTb);
		pNode.appendChild(aD);
	};

	function saveLastMarketSend() {
		var tbDest = $xf("//table[@id='target_validate']");
		if (!tbDest) return;
		var iRep = $xf("//*[@name='x2']");
		if (iRep) {TB36.O[84] = iRep.value; setGMcookieV2('TB3Setup', TB36.O, 'SETUP');};
		var mkls = ['0', '0', '0', '0', -1000, -1000];
		var strDest = tbDest.rows[0].cells[0].textContent;
		var aDest = strDest.match(/\((-?\d+)\s*[\|\,\s\/]\s*(-?\d+)\)/g);
		var xyDest = aDest[0].replace("(", "").replace(")", "").split("|");
		var rtS = $xf("//input[starts-with(@name, 'r')]", 'l');
		if (rtS.snapshotLength > 0) {for (var xi = 0; xi < 4; xi++) {if (rtS.snapshotItem(xi).value == '') mkls[xi] = '0'; else mkls[xi] = rtS.snapshotItem(xi).value;}; mkls[4] = xyDest[0]; mkls[5] = xyDest[1]; setGMcookieV2("mkls", mkls, actV.vID);};
	};
	
	function getLastMarketSend() {
		if (TB36.O[47] != '1') return;
		var cmkls = getGMcookieV2('mkls');
		if (cmkls && cmkls[actV.vID]) {
			var mkls = cmkls[actV.vID];
			var bsh = false;
			for (var xi = 0; xi < 4; xi++) {if (mkls[xi] != 0) bsh = true;};
			if (bsh == true) {
				//create the last send table for this village
				var aTb = $t([['id', 'mkls']]);
				var aRow = $r();
				aRow.appendChild($c('<img src="' + image["vmkls"] + '">', [['class', 'mklshh']]));
				for (var xi = 1; xi < 5; xi++) {aRow.appendChild($c(gIc["r" + xi], [['class', 'mklshh']]));};
				aRow.appendChild($c(T('RESEND'), [['class', 'mklshh']]));
				aRow.appendChild($c(T('DEL'), [['class', 'mklshh']]));
				var bRow = $r();
				bRow.appendChild($c("(" + mkls[4] + "|" + mkls[5] + ")", [['class', 'mklsc']]));
				for (var xi = 0; xi < 4; xi++) {bRow.appendChild($c(mkls[xi]));};
				bRow.appendChild($c('<a href=' + jsVoid + ' onClick = "' + (mkls[0] != 0 ? 'snd.r1.value=' + mkls[0] : '') + (mkls[1] != 0 ? '; snd.r2.value=' + mkls[1] : '') + (mkls[2] != 0 ? '; snd.r3.value=' + mkls[2] : '') + (mkls[3] != 0 ? '; snd.r4.value=' + mkls[3] : '') + '; snd.x.value=' + mkls[4] + '; snd.y.value=' + mkls[5] + ';"><img src="' + image["bOK"] + '" title="' + T('YES') + '" alt="' + T('YES') + '"></a>', [['class', 'mklsc']]));
				
				aLink = $a(gIc["del"], [['href', jsVoid]]);
				aLink.addEventListener("click", hideLastMarketSend(mkls), 0);
				dC = $c("", [['class', 'mklsc']]);
				dC.appendChild(aLink);
				bRow.appendChild(dC);
				
				aTb.appendChild(aRow);
				aTb.appendChild(bRow);
				var ln = $xf("//form[@name = 'snd']//p");
				insertAfter(ln, aTb);
			};
		};
		
		function hideLastMarketSend(mkls) {return function() {for (var xi = 0; xi < 4; xi++) {mkls[xi] = 0;}; setGMcookieV2("mkls", mkls, actV.vID); $g('mkls').style.display = 'none';};};
	};
	
	function isMarketSend() {
		//try to save the last transport for this village
		saveLastMarketSend();
		var bML1 = false;
		var bML2 = false;
		var retValue = 0;
		if ($xf("//form[@action='build.php']")) {
		//if ($xf("//form[@action='build.php' and @name='snd']")) {
			var mL = document.getElementsByTagName("a");
			for (xi = 0; xi < mL.length; xi++) {if (mL[xi].href.indexOf("&t=1") != -1) bML1 = true; if (mL[xi].href.indexOf("&t=2") != -1) bML2 = true;};
			var iText = $xf("//input[@type='Text']|//input[@type='text']", 'l');
			if (bML1 && bML2) retValue = iText.snapshotLength;
		};
		iText = null;
		return (retValue >= 6);
	};

	function setMerchantsCell(tM, colM, rTb) {
		var cM = $g("mhMerchants");
		if (!cM) {rM = $r(); cM = $c(tM, [["id", "mhMerchants"], ["style", 'font-size:11px; color:' + colM + ';line-height:16px;'], ["colspan", '9']]); rM.appendChild(cM); rTb.appendChild(rM);} else {cM.innerHTML = tM; $at(cM, [['style', 'font-size:11px; color:' + colM + ';line-height:16px;']]);};
	};
	
	function marketSend() {
		//we are inside the market, option "Send resources"
		getLastMarketSend();
		// Array of new quantities
		var aQcarry = [100, 250, 500, 1000];
		var bAdjMc = true;
		var strMaxC = $xf("//form//p/b");
		var maxC = 0;
		if (strMaxC) {maxC = toNumber(strMaxC.innerHTML); for (var i = 0; i < aQcarry.length; i++) {if (maxC == aQcarry[i]) {bAdjMc = false; break;};}; setGMcookieV2("merchantscapacity", maxC, actV.vID);} else maxC = TB36.Mcap;
		//Insert new quantities selectable via links on the market -> send resources page
		if (bAdjMc) aQcarry = [100, 500, 1000, maxC];
		var moC = $xf("//td[@class='mer'] | //table[@class='f10']//tr//td[@colspan='2']");
		if (moC) {mCIHTML = moC.innerHTML;
		//for merchant routes - no of repeat actions
		var iRep = $xf("//*[@name='x2']");
		if (iRep && TB36.O[87] == '1') iRep.value = TB36.O[84];
		addCumulativeArrivals(maxC, moC.textContent);
		mName = mCIHTML.split(' ')[0]; setGMcookie("merchantsName", mName, false); maxM = parseInt(mCIHTML.split(' ')[1].split('/')[0]);};
		var maxTr = maxM * maxC;
		var resTb = $xf("//table[@class='f10']");
		if (resTb == null) resTb = $g('send_res');
		if (resTb == null) resTb = $g("send_select");
		var rxI = new Array();
		for (var i = 0; i < 4; i++){
			//Remove original options
			var aRow = resTb.rows[i];
			aRow.removeChild(aRow.cells[3]);

			//clear single resource - code provided by matteo466
			var aCell = $c("", [['style', 'vertical-align:middle; text-align:center;']]);
			var delLink = $a(gIc["del"], [['href', jsVoid]]);
			delLink.addEventListener("click", clearTransportRes(i + 1), false);
			aCell.appendChild(delLink);
			aRow.appendChild(aCell);
			//end code provided by matteo466

			//For each new quantity and resource create a new link with the associated request
			for(var j = 0; j < aQcarry.length; j++){
				var xLink = $a('&nbsp;' + aQcarry[j], [['href', jsVoid], ['style', 'font-size:8pt; white-space:nowrap;']]);
				xLink.addEventListener('click', createEventmarketSend(i, aQcarry[j]), false);
				var aCell = $c("", [['style', 'text-align:center; vertical-align:middle;']]);
				aCell.appendChild(xLink);
				aRow.appendChild(aCell);
			};
			//add the ALL option to the list of links
			var xLink = $a('&nbsp;' + T('ALL'), [['href', jsVoid], ['style', 'font-size:8pt; white-space:nowrap;']]);
			xLink.addEventListener('click', createEventmarketSend(i, crtResUnits[i]), false);
			var aCell = $c("", [['style', 'text-align:center;']]);
			aCell.appendChild(xLink);
			aRow.appendChild(aCell);

			rxI[i + 1] = $xf("//input[@name='r" + (i + 1) + "']");
			rxI[i + 1].addEventListener('keyup', mhRowUpdate, false);
			rxI[i + 1].addEventListener('change', mhRowUpdate, false);
		};

		//add all resource type images and the clear all button
		var clAllRow = $r();

		var aCell = $c(gIc["r1"] + gIc["r2"] + gIc["r3"] + gIc["r4"], [['colspan', '2'], ['style', 'vertical-align:middle; white-space:nowrap;']]);
		clAllRow.appendChild(aCell);
		var aCell = $c("", [['style', 'text-align:center; vertical-align:middle;']]);
		var clAllImg = $img([['src', image["bDel"]], ['title', T('MTCL')]]);
		var clAllLink = $a("", [['href', jsVoid]]);
		clAllLink.appendChild(clAllImg);
		clAllLink.addEventListener("click", clearTransport, false);
		aCell.appendChild(clAllLink);
		clAllRow.appendChild(aCell);

		var emptyCell = $c("");
		clAllRow.appendChild(emptyCell);

		//add the quantities links for all res
		for (var i = 0; i < 4; i++) {
			var uCellA1 = $c("", [['style', 'text-align:center;']]);
			var useThemLinkA1 = $a('<span style="white-space:nowrap;">&nbsp;' + aQcarry[i] + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
			useThemLinkA1.addEventListener('click', createEventmarketSendAll(aQcarry[i]), false);
			uCellA1.appendChild(useThemLinkA1);
			clAllRow.appendChild(uCellA1);
		};

		//add the real ALL resources link (don't know if it really makes sense)
		var uCellA1 = $c("", [['style', 'text-align:center;']]);
		var useThemLinkA1 = $a('<span style="white-space:nowrap;">&nbsp;' + T('ALL') + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
		useThemLinkA1.addEventListener('click', createEventMarketAllRes, false);
		uCellA1.appendChild(useThemLinkA1);
		clAllRow.appendChild(uCellA1);

		resTb.appendChild(clAllRow);

		var merchantsRow = moC.parentNode;
		$at(moC, [['colspan', '3']]);
		var bgTb = $g("target");
		if (!bgTb) bgTb = $g("target_select");
		if (bgTb == null) {
			bgTb = merchantsRow.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			if (bgTb) {
				if (!bgTb.rows) return;
				var bgR = bgTb.rows[0];
				var bgC0 = bgR.cells[0];
				$at(bgC0, [['style', 'width:70%;']]);
				var bgC1 = bgR.cells[1];
				$at(bgC1, [['style', 'width:30%']]);
				var bgR1 = $r();
				var bgC2 = $c("", [['style', 'width:70%;']]);
				bgR1.appendChild(bgC2);
				var bgC3 = $c(moC.innerHTML, [["style", "font-weight:bold; color:darkblue; width:30%;"]]);
				bgR1.appendChild(bgC3);
				bgTb.removeChild(bgR.parentNode);
				bgTb.appendChild(bgR1);
				bgTb.appendChild(bgR);
				merchantsRow.removeChild(moC);
				for (var xi = 1; xi < 4; xi++) {$at(merchantsRow.parentNode.rows[xi].cells[0], [['colspan', '4']]);};
			};
		} else {
			var p1 = $xf("//div[@id='build']//p");
			if (p1) intY = p1.offsetTop + p1.clientHeight + 35; else intY = (docDir[0] == 'left' ? 185 : 150);
			$at(bgTb, [['style', 'position:absolute; ' + docDir[0] + ':350px; top:' + intY + 'px;']]);
			var bgR = bgTb.rows[0];
			var bgC0 = bgR.cells[0];
			$at(bgC0, [['style', 'font-weight:bold; color:darkblue;']]);
			var ccoo = $xf("//td[@class='coo']");
			$at(ccoo, [['colspan', '3']]);
			var cvil = $xf("//td[@class='vil']");
			$at(cvil,[['colspan', '3']]);
		};

		var uTRc = getGMcookie('usethemres', false);
		if (uTRc == 'false') {uTRc = 'true|true|true|true'; setGMcookie('usethemres', uTRc, false);};
		var aUTR = uTRc.split("|");

		var uRow1 = $r();
		var uCell1 = $c(gIc["r1"], [['style', 'width:30px;']]);
		uRow1.appendChild(uCell1);
		var uCell2 = $c("", [['style', 'width:30px;']]);
		var i1Check = $i([['type', 'checkbox'], ['id', 'res1x'], ['title', T('USE') + " " + T('RES1')]]);
		i1Check.checked = eval(aUTR[0]);
		i1Check.addEventListener('click', saveUseThemResOption(1), false);
		uCell2.appendChild(i1Check);
		uRow1.appendChild(uCell2);

		var uCell3 = $c("");
		var useThemLink = $a(gIc["usethempr"], [['href', jsVoid]]);
		useThemLink.addEventListener('click', createEventUseThemAllPr, false);
		uCell3.appendChild(useThemLink);
		uRow1.appendChild(uCell3);

		insertAfter(merchantsRow, uRow1);

		var uRow2 = $r();
		var uCell4 = $c(gIc["r2"]);
		uRow2.appendChild(uCell4);
		var uCell5 = $c("");
		var i2Check = $i([['type', 'checkbox'], ['id', 'res2x'], ['title', T('USE') + " " + T('RES2')]]);
		i2Check.checked = eval(aUTR[1]);
		i2Check.addEventListener('click', saveUseThemResOption(2), false);
		uCell5.appendChild(i2Check);
		uRow2.appendChild(uCell5);

		var uCell6 = $c("");
		var useThemLinkEq = $a(gIc["usethemeq"], [['href', jsVoid]]);
		useThemLinkEq.addEventListener('click', createEventUseThemAllEq, false);
		uCell6.appendChild(useThemLinkEq);
		uRow2.appendChild(uCell6);

		insertAfter(uRow1, uRow2);

		var uRow3 = $r();
		var uCell7 = $c(gIc["r3"]);
		uRow3.appendChild(uCell7);
		var uCell8 = $c("");
		var i3Check = $i([['type', 'checkbox'], ['id', 'res3x'], ['title', T('USE') + " " + T('RES3')]]);
		i3Check.checked = eval(aUTR[2]);
		i3Check.addEventListener('click', saveUseThemResOption(3), false);
		uCell8.appendChild(i3Check);
		uRow3.appendChild(uCell8);

		var uCell9 = $c("");
		var useThemLink1H = $a(gIc["usethem1h"], [['href', jsVoid]]);;
		useThemLink1H.addEventListener('click', createEventUseThemAll1H, false);
		uCell9.appendChild(useThemLink1H);
		uRow3.appendChild(uCell9);

		insertAfter(uRow2, uRow3);

		var uRow4 = $r();
		var uCell10 = $c(gIc["r4"]);
		uRow4.appendChild(uCell10);
		var uCell11 = $c("");
		var i4Check = $i([['type', 'checkbox'], ['id', 'res4x'], ['title', T('USE') + " " + T('RES4')]]);
		i4Check.checked = eval(aUTR[3]);
		i4Check.addEventListener('click', saveUseThemResOption(4), false);
		uCell11.appendChild(i4Check);
		uRow4.appendChild(uCell11);
		uRow4.appendChild($c(""));

		insertAfter(uRow3, uRow4);

		var xyD = new Array();
		xyD[0] = $xf("//form[@name='snd']//input[@name='x']");
		xyD[1] = $xf("//form[@name='snd']//input[@name='y']");
		xyD[0].addEventListener('keyup', captureMerchantDestination, 0);
		xyD[1].addEventListener('keyup', captureMerchantDestination, 0);
		if (crtPage.indexOf("z=") != -1) captureMerchantDestination();

		function saveUseThemResOption(i) {
			return function() {
				var uR = $g('res' + i + 'x');
				if (uR) {var uTRc = getGMcookie('usethemres', false); var aUTR = uTRc.split("|"); if (uR.checked == true) aUTR[i - 1] = 'true'; else aUTR[i - 1] = 'false'; uTRc = aUTR.join("|"); setGMcookie("usethemres", uTRc, false);};
			};
		};

		//matteo466
		function clearTransportRes(i) {return function() {rxI[i].value = ''; mhRowUpdate();};};
		function clearTransport() {for (var i = 1; i < 5; i++) {rxI[i].value = '';}; mhRowUpdate();};

		function createEventUseThemAllPr() {
			var totRes = 0;
			for (var i = 0; i < 4; i++) {var useRes = $g("res" + (i + 1) + "x"); if (useRes && useRes.checked == true) totRes += crtResUnits[i];};
			var dmx = maxTr / totRes;

			//changes by darkytoothpaste to use the full merchants capacity
			var minResource = 99999;
			var minResourceType = 0;
			var totalResourceSent = 0;

			for (var i = 1; i < 5; i++) {
				var useRes = $g("res" + i + "x");
				var aRes = 0;
				if (useRes && useRes.checked == true) {
					aRes = Math.floor(crtResUnits[i - 1] * dmx);
					if (aRes > crtResUnits[i - 1]) aRes = crtResUnits[i - 1];
					if (aRes < minResource) {minResource = aRes; minResourceType = i;};
				};
				rxI[i].value = aRes;
				totalResourceSent += aRes;
			};
			//ensure that we maximise our merchants
			if (crtResUnits[minResourceType - 1] >= (minResource + (maxTr - totalResourceSent))) rxI[minResourceType].value = minResource + (maxTr - totalResourceSent);
			mhRowUpdate();
		};

		function createEventUseThemAllEq() {
			var totRes = 0;
			var intSelected = 0;
			for (var i = 0; i < 4; i++) {var useRes = $g("res" + (i + 1) + "x"); if (useRes && useRes.checked == true) {totRes += crtResUnits[i]; intSelected += 1;};};
			var minA = maxTr / intSelected;
			var minB = totRes / intSelected;
			minX = Math.min(parseInt(minA), parseInt(minB));
			for (var i = 1; i < 5; i++) {
				var useRes = $g("res" + i + "x");
				var aRes = 0;
				if (useRes && useRes.checked == true) {aRes = minX; if (aRes > crtResUnits[i - 1]) aRes = crtResUnits[i - 1];};
				rxI[i].value = aRes;
			};
			mhRowUpdate();
		};

		function createEventUseThemAll1H() {
			var totalRes = 0;
			var intSelected = 0;
			for (var i = 0; i < 4; i++) {
				totalRes += (i == 3 ? prodPerHour[4] : prodPerHour[i]);
				var useRes = $g("res" + (i + 1) + "x");
				if (useRes.checked == true) intSelected += 1;
			};
			var prod1H = [prodPerHour[0], prodPerHour[1],  prodPerHour[2], prodPerHour[4]];

			for (var i = 0; i < 4; i++) {
				var useRes = $g("res" + (i + 1) + "x");
				var aRes = 0;
				if (useRes && useRes.checked == true) {aRes = (intSelected == 4 ? prod1H[i] : Math.floor(totalRes / intSelected)); if (aRes > crtResUnits[i]) aRes = crtResUnits[i];};
				rxI[i + 1].value = aRes;
			};
			mhRowUpdate();
		};

		function createEventMarketAllRes() {for (var i = 0; i < 4; i++) {rxI[i + 1].value = crtResUnits[i];}; mhRowUpdate();};

		function mhRowUpdate() {
			totTransport = 0;
			for (var xi = 1; xi < 5; xi++) {var aR = parseInt(rxI[xi].value); if (!isNaN(aR)) totTransport += aR;};
			totMerchants = Math.ceil(totTransport / maxC);
			mhColor = 'darkgreen';
			crtWaste = maxC - (totTransport - (totMerchants-1) * maxC);
			crtExceed = totTransport - maxTr;
			mhText = gIc["merchant"] + "<b>" + " (" + mName + "): " + totMerchants + "/" + maxM + "<br>" + T('MAX') + ": " + maxM * maxC + "<br>";
			if (totMerchants > maxM) {mhColor = "red"; mhText += T('MTX') + ": "+ crtExceed;} else mhText += T('MTW') + ": "+ crtWaste;
			mhText += "<br>" + T('MTC') + ": " + totTransport + "</b>";
			setMerchantsCell(mhText, mhColor, resTb);
		};

		function createEventmarketSend(i, q) {
			return function(){
				var aI = document.getElementsByTagName('INPUT')[i + 1];
				var aV = aI.value;
				var aS = (aV != '' ? parseInt(aV) : 0);
				aS += q;
				if (aS > crtResUnits[i]) aS = crtResUnits[i];
				if (aS > maxTr) aS = maxTr;
				aI.value = aS;
				mhRowUpdate();
			};
		};

		function createEventmarketSendAll(q) {
			return function(){
				var arrInp = document.getElementsByTagName('INPUT');
				for (var i = 0; i < 4; i++) {
					var aI = arrInp[i + 1];
					var aV = aI.value;
					var aS = (aV != '' ? parseInt(aV) : 0);
					aS += q;
					if (aS > crtResUnits[i]) aS = crtResUnits[i];
					if (aS > maxTr) aS = maxTr;
					aI.value = aS;
				};
				mhRowUpdate();
			};
		};

		function captureMerchantDestination() {
			var x = xyD[0].value;
			var y = xyD[1].value;
			var oD = $g("merctt");
			if (!isNaN(x) && !isNaN(y) && x != '' && y != '') {if (oD) oD.parentNode.removeChild(oD); var pOK = $xf("//form[@name='snd']/p[2]"); createTimeMerchantTable(pOK, x, y);} else {if (oD) oD.style.visibility = "hidden";};
		};

		//initial function provided by david.macej
		//modified by ms99
		function MerchantArrivingTitles(maxC, strAvTotM) {
			var retValue = '';
			var strMparTitles = $xf("//div[@id='" + dmid2 + "']/form/p[@class='b']|//div[@id='" + dmid2 + "']//form/h4", 'r');
			if (strMparTitles.snapshotLength == 0) {return retValue;};
			var retValue1 = strMparTitles.snapshotItem(0).textContent;
			if (strMparTitles.snapshotLength == 2) return retValue1;//2 groups: 1st is arriving mercs, 2nd is own mercs

			var otherMercs = $xf("//div[@id='" + dmid2 + "']/form/table[@class='tbg']/tbody/tr[1]/td[1]/a[1][not(contains(@href,'" + spLnk + "'))]", 'r');
			if (otherMercs.snapshotLength == 0) otherMercs = $xf("//div[@id='" + dmid2 + "']//form/table[@class='traders']/thead/tr[1]/td[1]/a[1][not(contains(@href,'" + spLnk + "'))]", 'r');
			if (otherMercs.snapshotLength > 0) return retValue1; //only 1 group: the arriving mercs group
			var arrAvTotM = strAvTotM.split(" ")[1].split("/");
			var mercsOnWay = arrAvTotM[1] - arrAvTotM[0];

			var resSpanOnMercTables = $xf("//div[@id='" + dmid2 + "']/form/table[@class='tbg']/tbody/tr[3]/td[2]/span[@class='f10']", 'r');
			if (resSpanOnMercTables.snapshotLength == 0) resSpanOnMercTables = $xf("//div[@id='" + dmid2 + "']//form/table[@class='traders']//tr[@class='res']//span[@class='f10']", 'r');
			var totalMercsOnTables = 0;

			for(var i = 0; i < resSpanOnMercTables.snapshotLength; i++) {
				var resSpan = resSpanOnMercTables.snapshotItem(i);
				var tdRes = resSpan.textContent;
				var xPos = tdRes.indexOf("x");
				if (xPos != -1) tdRes = tdRes.substring(xPos + 1);
				var inRes = tdRes.split(" | ");
				var mW = parseInt(inRes[0]);
				var mC = parseInt(inRes[1]);
				var mI = parseInt(inRes[2]);
				var mCr = parseInt(inRes[3]);
				var totalResOnThisTable = mW + mC + mI + mCr;
				var mercsOnThisTable = totalResOnThisTable / maxC;
				totalMercsOnTables += Math.ceil(mercsOnThisTable);
			};
			if (totalMercsOnTables > mercsOnWay) return retValue1; else return retValue;
		};

		//initial function provided by david.macej
		//modified by ms99
		function addCumulativeArrivals(maxC, strAvTotM) {
			//selects the receiving merchants
			var origPar = $xf("//div[@id='" + dmid2 + "']/form/table[@class='tbg']|//div[@id='" + dmid2 + "']/form/p[@class='b']|//div[@id='" + dmid2 + "']//form/h4");
			if (!origPar) return;
			var sendReceive = $xf("//div[@id='" + dmid2 + "']/form/table[@class='tbg']|//div[@id='" + dmid2 + "']/form/p[@class='b']|//div[@id='" + dmid2 + "']//form/table[@class='traders']|//div[@id='" + dmid2 + "']//form/h4", 'r');

			if (sendReceive.snapshotLength == 0) return;
			var strMercArrTitles = MerchantArrivingTitles(maxC, strAvTotM);

			if (strMercArrTitles != origPar.textContent) return;
			var tRow = null;
			var allValues = [0, 0, 0, 0, 0];

			//create table to sum the resources
			var txtPar = origPar.textContent.replace(":", "");
			armTable = $t([['class', 'tb3tb'], ['style', 'line-height:16px; border-collapse:collapse;']]);
			var hRow = $r([['class', 'tb3r']]);
			var hCell = $c(T('SUMMARY') + " - " + txtPar, [['class', 'cbgx'], ['colspan', '6'], ['style', 'font-size:10pt; font-weight:bold;']]);
			hRow.appendChild(hCell);
			armTable.appendChild(hRow);
			var rRow = $r();
			var qRow = $r();
			tRow = $r();

			var cCell = $c(gIc["clock"], [['style', 'background-color:#F3F3F3;']]);
			rRow.appendChild(cCell);
			var tC = $c("", [["id", "timeouta"], ['style', 'font-weight:bold; font-size:9pt;']]);
			qRow.appendChild(tC);
			var eC = $c("");
			tRow.appendChild(eC);

			for (var xi = 1; xi < 6; xi++) {
				if (xi < 5) {
					var iC = $c(gIc["r" + xi], [['style', 'background-color:#F3F3F3;']]);
					var tC = $c("00:00:00", [['id', 'timeouta'], ['style', 'font-weight:normal; font-size:9pt;']]);
				} else {
					var iC = $c(T('TOTAL'), [['style', 'font-weight:bold; background-color:#F3F3F3;']]);
					var tC = $c("");
				};
				rRow.appendChild(iC);
				var qC = $c("0", [['class', 'tb3c'], ['id', "arrmQ" + xi], ['style', 'font-weight:bold; font-size:9pt;']]);
				qRow.appendChild(qC);
				tRow.appendChild(tC);
			};

			armTable.appendChild(rRow);
			armTable.appendChild(qRow);
			armTable.appendChild(tRow);
			var aPar = $e("P", "");
			aPar.appendChild(armTable);
			origPar.appendChild(aPar);
			//finished creating the additional sum table

			//get server time
			var sT = $g("tp1").textContent.split(":");
			var arrRes = [0, 0, 0, 0];
			var sTs = toSeconds(sT[0] + ":" + sT[1] + ":" + sT[2]);
			var aTs = 0;
			var rAtArr = [crtResUnits[0], crtResUnits[1], crtResUnits[2], crtResUnits[3]];

			for (var i = 0; i < sendReceive.snapshotLength; i++) {
				var aTb = sendReceive.snapshotItem(i);
				nName = aTb.nodeName;
				if (i > 0 && (nName == "P" || nName == "H4")) break;
				if (nName == "TABLE") {
					//this is a table for incoming/outgoing/returning merchants
					var iHTML = '';
					var boolAddRow2 = false;
					var bTb = $t([['class', 'tb3tbnb']]);
					var bTbR1 = $r([['class', 'tb3rnb']]);
					var bTbR2 = $r([['class', 'tb3rnb']]);
					var tdRes = aTb.rows[2].cells[1].textContent;
					var xPos = tdRes.indexOf("x");
					if (xPos != -1) tdRes = tdRes.substring(xPos + 1);
					var inRes = tdRes.split(" | ");
					var tdTime = $g('timer' + i);//anyway only the last timer will be used in the armTable
					if (tdTime.offsetParent.nodeName == "P") tdTime = $g('timer' + (i + 1)); //account in the deletion process
					var pTot = 0;
					for (var zi = 0; zi < 4; zi++) {
						var aValue = parseInt(inRes[zi]);
						arrRes[zi] += aValue;
						pTot += aValue;
						allValues[zi] += aValue;
						allValues[4] += aValue;
					};
					insertAfter(aTb.rows[2].cells[1].lastChild, $e("TEXTNODE", "<b> = " + $ls(pTot) + "</b>"));//arrRes[zi]));

					if (TB36.O[46] == '1') {
						var aR = $r([['class', 'tb3r']]);
						xts = toSeconds(tdTime.textContent);
						var deltaS = xts - aTs;
						var xt = formatTime(sTs + xts, 2);
						var aC1 = $c(gIc['clock'] + " " + xt, [['class', 'tb3c'], ['style', 'padding-' + docDir[0] + ':2px; text-align:' + docDir[0] + '; font-weight:bold; font-size:8pt; color:blue;']]);
						var strBorder = 'border-' + docDir[1] + ':1px solid black; ';
						for (xi = 0; xi < 4; xi++) {
							var strColor = '';
							var qu = rAtArr[xi] + parseInt((prodPerHour[xi] / 3600) * deltaS + parseInt(inRes[xi]));
							if (xi == 3) strBorder = '';
							var iHTML1 = " " + gIc['r' + (xi + 1)] + " ";
							var iHTML2 = '';
							if (qu > capacity[xi]) {
								strColor = 'background-color:darkgreen; font-weight:bold; color:white; ';
								iHTML1 += capacity[xi];
								iHTML2 += "(+" + (qu - capacity[xi]) + ")";
								rAtArr[xi] = capacity[xi];
								boolAddRow2 = true;
							} else if (qu < 0) {
								rAtArr[xi] = parseInt(inRes[xi]);
								iHTML2 = "(" + (qu + rAtArr[xi]) + ")";
								iHTML1 += rAtArr[xi];
								strColor = 'background-color:red; font-weight:bold; color:white; ';
								boolAddRow2 = true;
							} else {
								iHTML1 += qu;
								rAtArr[xi] = qu;
							};
							var bC1 = $c(iHTML1, [['class', 'tb3c'], ['style', 'width:25%; padding:0px; padding-' + docDir[0] + ':2px; text-align:' + docDir[0] + '; font-size:8pt;' + strColor + strBorder]]);
							var bC2 = $c(iHTML2, [['class', 'tb3c'], ['style', 'width:25%; padding:0px; padding-' + docDir[0] + ':2px; text-align:center; font-size:8pt;' + strColor + strBorder]]);
							bTbR1.appendChild(bC1);
							bTbR2.appendChild(bC2);
						};
						aTs = xts;
						var aC2 = $c("", [['class', 'tb3c'], ['colspan', '2'], ['style', 'padding:1px; text-align:' + docDir[0] + '; background-color:white; border:0px none transparent;']]);
						bTb.appendChild(bTbR1);
						if (boolAddRow2) bTb.appendChild(bTbR2);
						aC2.appendChild(bTb);
						aR.appendChild(aC1);
						aR.appendChild(aC2);
						aTb.appendChild(aR);
					};
				};
			};

			//add the values  (res1...res4 & Total) to the armTable
			for (var xi = 0; xi < 5; xi++) $g("arrmQ" + (xi + 1)).innerHTML = $ls(allValues[xi]);
			//add the timer for the last arrival
			armTable.rows[2].cells[0].innerHTML = tdTime.textContent;

			var tdTimeSeconds = toSeconds(tdTime.textContent);
			// compute time to fill for total transport
			for (var zi = 0; zi < 4; zi++) {
				var aValue = allValues[zi];
				var timeToEmpty = 0;
				var timeToFill;
				var timeToShow;
				//txtStyle => font color, cell background color, font-weigth
				var txtStyle = ['black', 'white', 'normal'];
				var strX = "";
				var PpS = parseInt(prodPerHour[zi]) / 3600;
				var totalAtArrival = crtResUnits[zi] + PpS * tdTimeSeconds + aValue;

				if (prodPerHour[zi] < 0) {
					timeToEmpty = crtResUnits[zi] / Math.abs(PpS);
					if (timeToEmpty <= tdTimeSeconds) {
						timeToShow = timeToEmpty;
						txtStyle[0] = 'red';
						if (timeToEmpty < 7200) {
							strX = 'text-decoration: blink; ';
							txtStyle = ['white', 'red', 'bold'];
						};
					} else if (timeToEmpty > tdTimeSeconds) {
						timeToEmpty = totalAtArrival / Math.abs(PpS);
						timeToShow = timeToEmpty;
						if (timeToEmpty < 7200) txtStyle = ['white', 'red', 'bold'];
					};
				} else if (prodPerHour[zi] == 0) {
					if (totalAtArrival >= capacity[zi]) {
						timeToFill = tdTimeSeconds;
						timeToShow = timeToFill;
						if (timeToFill < 7200) txtStyle = ['white', 'darkgreen', 'bold'];
					} else {
						timeToShow = T('NEVER');
					};
				} else if (prodPerHour[zi] > 0) {
					timeToFill = (capacity[zi] - crtResUnits[zi]) / PpS;
					timeToFillAtArrival = (capacity[zi] - totalAtArrival) / PpS;
					if (timeToFill <= tdTimeSeconds || timeToFillAtArrival < 0) {
						timeToShow = tdTimeSeconds;
						txtStyle[0] = 'darkgreen';
						strX = 'text-decoration:blink; ';
					} else {
						timeToShow = tdTimeSeconds + timeToFillAtArrival;
						txtStyle[0] = 'darkgreen';
					};
					if (timeToShow < 7200) txtStyle = ['white', 'darkgreen', 'bold'];
				};
				timeToShow = formatTime(timeToShow, 0);

				if (tRow != null) {
					var rtCell = tRow.cells[zi + 1];
					$at(rtCell, [['id', 'timeouta'], ['style', 'font-weight:normal; font-size:9pt; background-color:' + txtStyle[1] + ' !important; font-weight:' + txtStyle[2] + ' !important; color:' + txtStyle[0] + '; important;' + strX]]);
					rtCell.innerHTML = timeToShow;
				};
			};
		};
	};

	//return the number of villages that can be built based on the number of CP available
	function cp2villages(cp){
		var rV;
		if (crtPage.indexOf("speed") != -1) rV = Math.round(Math.pow(3*cp/1600, 1 / 2.3)); else {if (TB36.O[1] == "1") rV = Math.round(Math.pow(cp/2000, 1 / 2)); else rV = Math.round(Math.pow(cp/1600, 1 / 2.3));};//provided by ghqwerty (???)
		return rV;
	};

	//return the no of CP needed to create a specific no of villages (version from fr3nchlover)
	function villages2cp(noVil){
		var rV;
		if (crtPage.indexOf("speed") != -1 || crtPage.indexOf("research") != -1) {
			rV = Math.round(1.6/3 * Math.pow(noVil, 2.3)*10) * 100;
		} else {
			rV = 2000;
			if (noVil > 1) {if (TB36.O[1] == "1") rV = Math.round(2 * Math.pow(noVil, 2)*10) * 100; else rV = Math.round(1.6 * Math.pow(noVil, 2.3)) * 1000;};
		};
		return rV;
	};

	function culturePoints(){
		var aX = $xf("//div[@id='" + dmid2 + "']//b", 'l');
		var intAdd = 0;
		if (TB36.T36 == false) {if (aX.snapshotLength != 5) return; intAdd = 1;} else if (aX.snapshotLength != 4) return;
		
		//CP for all villages
		var prodTotalCP = toNumber(aX.snapshotItem(intAdd + 1).innerHTML);
		//Current no of CP
		var crtTotalCP = toNumber(aX.snapshotItem(intAdd + 2).innerHTML);
		//CP needed to create a new village
		var pc_aldea_prox = toNumber(aX.snapshotItem(intAdd + 3).innerHTML);

		//No of current villages
		var crtVil = cp2villages(pc_aldea_prox);
		//No of villages to be build with current CP

		var textMenu = $xf("//p[@class='txt_menue']");
		if (!textMenu) textMenu = $g("textmenu");
		if (textMenu) var aV = textMenu.textContent.replace('\n', '').split(" |");

		//create the new cp to villages table
		var cpTable = $t([['id', 'cptable']]);
		//header row 11
		var rCP1 = $r();
		var c11 = $c(T('VILLAGE'), [['rowspan', 2]]);
		rCP1.appendChild(c11);
		var c12 = $c(aV[1], [['colspan', 2]]);
		rCP1.appendChild(c12);
		var c13 = $c(gIc["clock"], [['colspan', 2]]);
		rCP1.appendChild(c13);
		cpTable.appendChild(rCP1);
		//header row 2
		var rCP2 = $r();
		var c22 = $c(T('TOTAL'));
		rCP2.appendChild(c22);
		var c23 = $c(T('YOUNEED'));
		rCP2.appendChild(c23);
		var c24 = $c(T('NEWVILLAGEAV'));
		rCP2.appendChild(c24);
		var c25 = $c(T('TIMEUNTIL'));
		rCP2.appendChild(c25);
		cpTable.appendChild(rCP2);

		var maxNewVillages = 1;
		var boolReachedMaxNewVillages = false;
		var strClass = 'CG';

		for (var i = 0; i < maxNewVillages && i < 50; i++) {
			var cpRow = $r();
			var iHTML = [crtVil + i + 1, '', '', '', ''];
			//get the necessary CP for building/conquering a new village
			var reqCP = villages2cp(crtVil + i);

			if (reqCP <= crtTotalCP) {
				var iHTML = [crtVil + i + 1, reqCP, '0', T('NOW'), '0:00:00'];
				strClass = 'CG';
				maxNewVillages += 1;
			} else {
				if (boolReachedMaxNewVillages == false) {maxNewVillages += 2; boolReachedMaxNewVillages = true;};
				//time until able to build/conquer a new village
				var tiempo = ((reqCP - crtTotalCP) / prodTotalCP) * 86400;
				var dtNow = new Date();
				dtNow.setTime(dtNow.getTime() + (tiempo * 1000));
				var iHTML = [crtVil + i + 1, reqCP, reqCP - crtTotalCP, computeTextTime(dtNow), formatTime(tiempo, 1)];
				strClass = 'CR';
			};
			for (var xi = 0; xi < 5; xi++) {var cpCellx = $c(iHTML[xi], [['class', strClass]]); cpRow.appendChild(cpCellx);};
			cpTable.appendChild(cpRow);
		};
		aX.snapshotItem(intAdd + 3).parentNode.parentNode.appendChild(cpTable);
	};

	function getBuyRatioCell(aRow) {
		var tC;
		var aC;
		var aR;
		if (aRow.cells.length > 7) {
			aR = parseInt(aRow.cells[1].textContent) / parseInt(aRow.cells[3].textContent);
			tC = aRow.cells[5];
			aC = aRow.cells[6];
		} else {//M35 = 3;
			aR = parseInt(aRow.cells[0].textContent) / parseInt(aRow.cells[1].textContent);
			tC = aRow.cells[3];
			aC = aRow.cells[4];
		};
		var aCol = ['black', 'white'];
		if (aR < 1.00) aCol = ['red', '#FFE1E1']; else if (aR > 1.00) aCol = ['darkgreen', '#C8FFC8'];
		var rC = $c(aR.toFixed(2), [["style", "font-size:8pt; background-color:" + aCol[1] + "; color:" + aCol[0] + ";"]]);
		if (tC) $at(tC, [['style', 'font-size:8pt; padding:1px; width:11%;']]);
		if (aC) $at(aC, [['style', 'font-size:8pt; width:20%;']]);
		return rC;
	};

	function getBuyAllyCell(aR) {
		//aliance info from the title property of the player
		var iPC = (aR.cells.length > 6 ? 4 : 2);
		var aN = aR.cells[iPC].getAttribute('title');
		if (!aN || aN == "") aN = "-";
		var aC = $c(aN, [['style', 'font-size:8pt; width:15%;']]);
		return aC;
	};

	function addMarketOfferCellEvents(aR) {
		var noC = [1, 4];
		if (aR.cells.length > 7) noC = [3, 6];
		var aC = aR.cells[noC[0]];
		var bC = aR.cells[noC[1]];
		var quantity = parseInt(aC.textContent);
		aC.addEventListener('mouseover', showNeededMerchants, false);
		aC.addEventListener("mouseout", hideTT, 0);
		bC.addEventListener('mouseover', showNeededMerchants, false);
		bC.addEventListener("mouseout", hideTT, 0);

		function showNeededMerchants() {
			var tt = $g("tb_tooltip");
			if (!tt) tt = createTooltip();
			var mTot = (TB36.Mcap != 0 ? Math.ceil(quantity / TB36.Mcap) + " x " + gIc["merchant"] + ' (' + T('MERCHANTS') + ')' : 0);
			var iW = parseInt(mTot) * TB36.Mcap - quantity;
			var aTb = $t([['class', 'tb3tbnb']]);
			var aRow = $r([['class', 'tb3rnb']]);
			aRow.appendChild($c(mTot, [['class', 'tb3cnb'], ['style', 'font-size:8pt; font-weight:bold; color:blue; text-align:' + docDir[0] + ';']]));
			aTb.appendChild(aRow);
			if (iW > 0) {var bRow = $r([['class', 'tb3rnb']]); bRow.appendChild($c(T('MTW') + ": " + iW, [['class', 'tb3cnb'], ['style', 'font-size:8pt; color:red; text-align:' + docDir[0] + ';']])); aTb.appendChild(bRow);};
			tt.innerHTML = "";
			tt.appendChild(aTb);
			tt.style.display = 'block';
		};
	};

	 //Create a new column showing the alliance of the player that offers resources for trade at the market and a ratio column
	function addAllyColumnForMarketOffers() {
		if (crtPage.indexOf('&t=1') == -1 && crtPage.indexOf('build.php?') == -1) return;
		if ($g("summary")) return;
		var aX = $xf("//*[@id='range'] | //*[@id='market_buy']");
		if (!aX) {aX = $xf("//tr[@class='rbg']"); if (aX) aX = aX.parentNode;};
		//prepare insertion of column
		var b = aX.rows;
		$at(b[0].cells[0], [['colspan', '9']]);
		$at(b[b.length - 1].cells[0], [['colspan', '9']]);
		//Create and insert the alliance & ratio columns
		b[1].appendChild($c(T('8')));
		b[1].appendChild($c("%"));
		for(var i = 2; i < b.length - 1; i++) {b[i].appendChild(getBuyAllyCell(b[i])); b[i].appendChild(getBuyRatioCell(b[i])); addMarketOfferCellEvents(b[i]);};
	};

	function quitMarketFilter(aOffer, aFilter, filtros) {
		aOffer.removeAttribute("filtro" + aFilter);
		var rAt = true;
		for (var i = 0; i < filtros.length; i++) if (aOffer.getAttribute("filtro" + filtros[i]) == 'on') rAt = false;
		if (rAt == true) aOffer.removeAttribute("style");
	};

	function marketBuy() {
		if (crtPage.indexOf('&t=1&') != -1 && crtPage.indexOf('&t=1&u=') == -1) return;
		//get the original offers table
		var orOffersTb = $xf("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]");
		if (!orOffersTb) orOffersTb = $g("market_buy");
		if (!orOffersTb) orOffersTb = $g("range");
		getSavedMarketFilters();
		createFilterTable(orOffersTb);
		if (TB36.T36 == false) {var linkid = $xf('//td[@class="rowpic"]/a', 'f', orOffersTb).href.match('id=([0-9]*)&')[1];} else {var lastCell = orOffersTb.rows[orOffersTb.rows.length - 1].cells[0]; var linkid = lastCell.lastChild.href.match('id=([0-9]*)&')[1];};
		//market preload
		marketpreload = parseInt(TB36.O[48]) + 1;
		var pageNo1 = crtPage.indexOf("&u=");
		var intPage = 0;
		if (pageNo1 != -1) {var pageNo2 = crtPage.indexOf("#h2"); var pageNoS1 = crtPage.substring(pageNo1 + 3, pageNo2); var intPage = Math.round(parseInt(pageNoS1) / 40);};
		if (marketpreload > 1) {
			for (var i = 1; i < marketpreload; i++) {setTimeout(createPreloadFunc(i + intPage), getRndTime(1302));};
			var X2 = (marketpreload + intPage) * 40;
			var X1 = (intPage - marketpreload) * 40;
			var backLink = "build.php?id=" + linkid + "&t=1&u=" + X1 + "#h2";
			var forwardLink = "build.php?id=" + linkid + "&t=1&u=" + X2 + "#h2";
			var tdbfLinks = $xf('//td[@class="rowpic"]');
			if (!tdbfLinks) tdbfLinks = orOffersTb.rows[orOffersTb.rows.length - 1].cells[0];
			if (tdbfLinks) {
				if (X1 < 0) {var aSpan = $e("SPAN", "«"); $at(aSpan, [["style", "font-weight:bold;"], ["class", "c"]]);} else {var aSpan = $a("« ", [['href', backLink]]);};
				var fwLink = $a("»&nbsp;", [['href', forwardLink]]);
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			};
		};

		function prepareOrigFilters() {
			var sTb = $g("search_select");
			if (!sTb) return;
			var bTb = $g("bid_select");
			var arrA = sTb.getElementsByTagName("A");
			if (arrA) {for (var i = 0; i < arrA.length; i++) {arrA[i].addEventListener("click", addAllyColumnForMarketOffers, false);};};
			arrA = bTb.getElementsByTagName("A");
			if (arrA) {for (var i = 0; i < arrA.length; i++) {arrA[i].addEventListener("click", addAllyColumnForMarketOffers, false);};};
		};

		function applyFilter(orOffersTb, aType, aOpt) {
			return function() {marketFilters[aType] = aOpt; setGMcookieV2("marketfilters", marketFilters, 'all'); filterMarket(orOffersTb, aType, aOpt);};
		};

		function applyAllFilters(orOffersTb) {for (var i = 0; i < 5; i++) {if (marketFilters[i] != defaultMF[i]) filterMarket(orOffersTb, i , marketFilters[i]);};};

		function filterMarket(orOffersTb, aType, aOpt) {
			for (var i = 2; i < orOffersTb.rows.length - 1; i++) {
				b = orOffersTb.rows[i];
				if (TB36.T36 == false) {
					var isOfPos = true;
					var error = false;
					if (b.childNodes.length > 8) error = true;
					b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/);
					var rOf = RegExp.$1;
					b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/);
					var rSearch = RegExp.$1;
					var qOf = parseInt(b.childNodes[error ? 2 : 1].textContent);
					var qSearch = parseInt(b.childNodes[error ? 6 : 3].textContent);
					if (b.childNodes[error ? 11 : 6].className == 'c') isOfPos = false;
					var trTime = toSeconds(b.childNodes[error ? 10 : 5].textContent);
				} else {
					if (b.cells[0].firstChild.className) {//M35 = 2;
						var rOf = b.cells[0].firstChild.className.replace("r", "");
						var qOf = parseInt(b.cells[1].textContent);
					} else {//M35 = 3;
						var rOf = b.cells[0].getElementsByTagName("IMG")[0].className.replace("r", "");
						var qOf = parseInt(b.cells[0].textContent);
					};
					var isOfPos = false;
					if (b.cells[2].firstChild.className) {//M35 = 2;
						var rSearch = b.cells[2].firstChild.className.replace("r", "");
						var qSearch = parseInt(b.cells[3].textContent);
						if (b.cells[6].className == 'act') isOfPos = true;
						var trTime = toSeconds(b.cells[5].textContent);
					} else {//M35 = 3;
						var rSearch = b.cells[1].getElementsByTagName("IMG")[0].className.replace("r", "");
						var qSearch = parseInt(b.cells[1].textContent);
						if (b.cells[4].className == 'act') isOfPos = true;
						var trTime = toSeconds(b.cells[3].textContent);
					};
				};

				switch (aType) {
					case 0: if ((rOf != aOpt) && aOpt != 5) setOfferFilter(b, "Ofrezco"); else quitMarketFilter(b, "Ofrezco", ["Busco", "Tipo", "Carencia", "Tiempo"]); break;
					case 1: if ((rSearch != aOpt) && aOpt != 5) setOfferFilter(b, "Busco"); else quitMarketFilter(b, "Busco", ["Ofrezco", "Tipo", "Carencia", "Tiempo"]); break;
					case 2: switch(aOpt) {
						case 1: if (qOf <= qSearch) setOfferFilter(b, "Tipo"); else quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
						case 2: if (qOf != qSearch) setOfferFilter(b, "Tipo"); else quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
						case 3: if (qOf >= qSearch) setOfferFilter(b, "Tipo"); else quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
						case 4: quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
					} break;
					case 3: switch(aOpt) {
						case 1: if (isOfPos == false) setOfferFilter(b, "Carencia"); else quitMarketFilter(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]); break;
						case 2: quitMarketFilter(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]); break;
					} break;
					case 4: switch(aOpt) {
						case 1: if (trTime > (60*60)) setOfferFilter(b, "Tiempo"); else quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
						case 2: if (trTime > (2*60*60)) setOfferFilter(b, "Tiempo"); else quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
						case 3: if (trTime > (3*60*60)) setOfferFilter(b, "Tiempo"); else quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
						case 4: quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
					} break;
				};
			};
			for (var i = 0; i < 5; i++) {for (var j = 0; j < 6; j++){var aFilters = $xf("//td[@id='filtro" + i + j + "']"); if (aFilters) {if (i == aType && j == (aOpt - 1)) $at(aFilters, [['class', 'sf']]); else if (i == aType) aFilters.removeAttribute('class');};};};
		};

		function getSavedMarketFilters() {var cookieMF = getGMcookieV2('marketfilters'); if (cookieMF && cookieMF['all']) marketFilters = cookieMF['all']; else {marketFilters = defaultMF; setGMcookieV2('marketfilters', marketFilters, 'all');};};

		function processOfferPage(ajaxResp) {
			var ad = ajaxNDV2(ajaxResp);
			if (TB36.T36 == false) {
				var strOffersTableRows = "//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr";
				var xpres = $xf(strOffersTableRows, 'l', ad);
				var aRows = $xf(strOffersTableRows, 'l');
				var linktr = aRows.snapshotItem(aRows.snapshotLength - 1);
			} else {
				var strOffersTableRows = "//table[@id='market_buy']/tbody/tr | //table[@id='range']/tbody/tr";
				var xpres = $xf(strOffersTableRows, 'l', ad);
				var aRows = $xf(strOffersTableRows, 'l');
				var linktr = aRows.snapshotItem(1).parentNode;
			};
			
			for (var i = 2; i < xpres.snapshotLength - 1; i++) {
				var mrow = xpres.snapshotItem(i);
				mrow.appendChild(getBuyAllyCell(mrow));
				mrow.appendChild(getBuyRatioCell(mrow));
				addMarketOfferCellEvents(mrow);
				if (TB36.T36 == false) linktr.parentNode.insertBefore(mrow, linktr); else linktr.appendChild(mrow);
			};
			applyAllFilters(orOffersTb);
		};

		function createPreloadFunc(page) {return function() {ajaxRequest("build.php?id=" + linkid + "&t=1&u=" + (page * 40) + "#h2", "GET", null, processOfferPage, dummy);};};

		function createFilterTable(orOffersTb) {
			var aTb = $t([['id', 'mbuyf']]);
			//filters for offers, searches and ratio
			var aLabels = [orOffersTb.rows[1].cells[0].textContent, orOffersTb.rows[1].cells[1].textContent];
			for (var j = 0; j < 2; j++){
				var tr = $r();
				tr.appendChild($c(aLabels[j]));
				//4 res for offer and search
				for (var i = 0; i < 4; i++){
					var td = $c("", [['id', 'filtro' + j + i]]);
					var ref = $a(gIc['r' + (i + 1)]);
					if (i + 1 == marketFilters[j]) $at(td, [['class', 'sf']]);
					td.addEventListener('click', applyFilter(orOffersTb, j, i  + 1), 0);
					td.appendChild(ref);
					tr.appendChild(td);
				};
				var td = $c("", [['id', 'filtro' + j + '4']]);
				if (marketFilters[j] == 5) $at(td, [['class', 'sf']]);
				var ref = $a(T('CUALQUIERA'), [['href', jsVoid]]);
				td.addEventListener('click', applyFilter(orOffersTb, j, 5), 0);
				td.appendChild(ref);
				tr.appendChild(td);
				aTb.appendChild(tr);
			};
			//Transation ratio (offer/search)
			var tr = $r();
			tr.appendChild($c(T('TIPO')));
			aLabels = ['1:>1', '1:1', '1:<1', '1:x'];
			for (var i = 0; i < 4; i++){
				var td = $c("", [['id', 'filtro' + 2 + i]]);
				if (i + 1 == marketFilters[2]) $at(td, [['class', 'sf']]);
				var ref = $a(aLabels[i], [['href', jsVoid]]);
				td.addEventListener('click', applyFilter(orOffersTb, 2, i + 1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			};
			tr.appendChild($c(""));
			aTb.appendChild(tr);

			//Max. transport time
			var tr = $r();
			tr.appendChild($c(T('MAXTIME')));
			aLabels = ['1', '2', '3', '>3'];
			for (var i = 0; i < 4; i++){
				var td = $c("", [['id', 'filtro' + 4 + i]]);
				if (i + 1 == marketFilters[4]) $at(td, [['class', 'sf']]);
				var ref = $a(aLabels[i], [['href', jsVoid]]);
				td.addEventListener('click', applyFilter(orOffersTb, 4, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			};
			tr.appendChild($c(""));
			aTb.appendChild(tr);

			//Filter for possible/impossible offers because of the res/merchants availability
			var tr = $r();
			tr.appendChild($c(T('DISPONIBLE')));
			aLabels = [T('YES'), T('NO')];

			for (var i = 0; i < 2; i++){
				var td = $c("", [['colspan', '2'], ['id', 'filtro' + 3 + i]]);
				if (i + 1 == marketFilters[3]) $at(td, [['class', 'sf']]);
				var ref = $a(aLabels[i], [['href', jsVoid]]);
				td.addEventListener('click', applyFilter(orOffersTb, 3, i + 1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			};

			tr.appendChild($c(""));
			aTb.appendChild(tr);

			applyAllFilters(orOffersTb);
			var p = $e("P");
			p.appendChild(aTb);
			orOffersTb.parentNode.insertBefore(p, orOffersTb);
			aLabels = null;
		};
	};

	function TimeToExplore() {
		var shC = true;
		var arrY = $xf('//td[@class="required"] | //p[@id="contract"] | //table[@class="new_building"]//td[@class="res"] | //div[@id="' + dmid2 + '"]//table[@class="f10"]/tbody/tr[1]/td', 'l');
		if (arrY.snapshotLength > 0) {
			for (var i = 0; i < arrY.snapshotLength; i++) {
				var aY = arrY.snapshotItem(i);
				var arRes = getRequiredRes(aY);
				if (arRes == null || arRes.length < 4) shC = false;
				if  (shC == true) {
					$at(aY, [['id', 'npcXX_1']]);
					var e = calculateResourceTime(arRes, "30");
					if (e) {
						var xC = aY.parentNode;
						if (xC) {
							if (xC.nodeName == "TR") {
								var aE = $c("");
								var aR = $r([['class', 'tb3rnb']]);
								aR.appendChild(aE);
								xC.parentNode.appendChild(aR);
								$at(e, [['style', 'width:30%;']]);
							} else if (xC.nodeName == "FORM" || xC.nodeName == "DIV") {
								var aE = $e("P");
								xC.appendChild(aE);
							};
						};
						$at(aE, [['id', 'resNtable']]);
						aE.appendChild(e);
					};
				};
			};
		};
		
		var arrTNPC = $xf("//*[starts-with(@id, 'NPCTT_')]", 'l');
		var aTb = $g("selecttraintroops");
		if (!aTb) {
			aTb = $xf("//table[@class='build_details']");
			if (aTb) {for (var i = 0; i < arrTNPC.snapshotLength; i++) {var ex = calculateResourceTime(arrTtT[i].aRes, "30"); if (ex) {xN = aTb.rows[i + 1].cells[aTb.rows[i + 1].cells.length - 1]; xN.innerHTML = ''; xN.appendChild(ex);};};};
		};
		return;
	};

	//change to the default attack type on the "Rally Point -> Send Troops" page
	function defaultAttackType(){
		//2:Defend, 3:Attack, 4:Raid
		//OASIS - only attack:raid (fr3nchlover)
		if (crtPage.match(/a2b.php\?(.*)&o/)) act = 4; else {
			act = (parseInt(TB36.O[49]) + 2);
			//action = 2 if the destination is one of your own villages
			if (crtPage.search(/z=(\d+)/) >= 0) {z = RegExp.$1; for (var i = 0; i < vList.length; i++) {if (z == vList[i].vID) act = 2;};};
		};
		var rbA = $xf("//input[@value='" + act + "' and @name='c']");
		if (rbA) rbA.checked = true;
		rbA = null;
	};

	function prepareDivDocking() {
		var dD = $g(dlright1);
		if (!dD){dD = $d("", [["id", dlright1]]); $g(dmid).appendChild(dD);};
		if (dD) {TB36.nTAUb = dD; TB36.nTANb = dD; TB36.nTARbT = dD; TB36.nTASb = dD;};
		dD = null;
	};

	//Bookmarks on the right side
	function showUserBookmarks() {
		if (TB36.O[20] != '1') return;
		removeElement($g("userbookmarksTT"));
		removeElement($g("userbookmarks"));
		aTb = getUserBookmarksTable();
		if (TB36.O[71] == '0' && TB36.O[21] == '1') aTb.style.display = 'none';
		if (TB36.O[21] != '1') {
			parBM = $g("parBM");
			if (!parBM) {parBM = $e("P"); $at(parBM, [['id', 'parBM']]); TB36.nTAUb.appendChild(parBM);};
			parBM.appendChild(aTb);
		} else {
			uBminWidth = 215;
			var ubXY = TB36.O[76].split("|");
			$df(uBminWidth, ubXY[0], ubXY[1], T('MARCADORES'), 'userbookmarks', "userbookmarksTT", true).appendChild(aTb);
		};
		playerLinks("userbookmarks");
		aTb = $g('userbookmarks');
		if (aTb && TB36.O[21] == '1') adjustFloatDiv(aTb, uBminWidth, "userbookmarks");
		
		function getUserBookmarksTable() {
			var aTb = $t([['id', 'userbookmarks']]);
			//header row
			var uHr = $r();
			uHr.appendChild(getUserBookmarksHeader());
			aTb.appendChild(uHr);
			//bookmarks string
			var strBM = getGMcookie("marcadores", false);
			if (strBM == "false") {setGMcookie("marcadores", '', false); strBM = '';};

			if (strBM != ''){
				marcadores = new Array();
				strBM = strBM.split("$$");
				for (var i = 0; i < strBM.length; i++) marcadores[i] = strBM[i].split("$");
				for (var i = 0; i < marcadores.length; i++) {
					bmRow = $r();
					strBookmark = marcadores[i][0];
					if (TB36.O[82] != "1") {
						var aDel = $a(gIc["del"], [['href', jsVoid]]);
						aDel.addEventListener("click", removeGMcookieValue("marcadores", i, false, showUserBookmarks, false), 0);
						aC = $c("");
						aC.appendChild(aDel);
						bmRow.appendChild(aC);

						bmRow.appendChild($c("&nbsp;"));

						upC = $c("");
						if (i > 0) {aUp = $a("", [['href', jsVoid]]); aUp.appendChild($img([['src', image["aup"]]])); aUp.addEventListener("click", moveUserBookmark(i, -1), false); upC.appendChild(aUp);};
						bmRow.appendChild(upC);

						downC = $c("");
						if (i < marcadores.length - 1) {var aDown = $a("", [['href', jsVoid]]); aDown.appendChild($img([['src', image["adn"]]])); aDown.addEventListener("click", moveUserBookmark(i, 1), false); downC.appendChild(aDown);};
						bmRow.appendChild(downC);
						bmRow.appendChild($c("&nbsp;"));
						eC = $c("");
						aEdit = $a("", [['href', jsVoid]]);
						aEdit.appendChild($img([['src', image["editbookmark"]], ['title', T('EDIT')]]));
						aEdit.addEventListener("click", editUserBookmark(i), false);
						eC.appendChild(aEdit);
						bmRow.appendChild(eC);
						bmRow.appendChild($c("&nbsp;"));
					} else {
						aCl = 'noact';
						if (marcadores[i][1] == crtPage) aCl = 'act';
						var aC = $c("<span>&#8226;&nbsp;&nbsp;</span>", [['class', aCl]]);
						bmRow.appendChild(aC);
					};
					//fr3nchlover
					if (marcadores[i][1].indexOf("*") != -1) {
						iL = $a(strBookmark + " ", [['href', marcadores[i][1].substring(0, marcadores[i][1].length-1)], ['target','_blank']]);
						iL.appendChild($img([['src', image["external"]]]));
					} else {
						iL = $a(strBookmark);
						if (marcadores[i][1] != "#") $at(iL, [['href', marcadores[i][1].substring(0, marcadores[i][1].length)]]);
					};
					bmC = $c("");
					bmC.appendChild(iL);
					bmRow.appendChild(bmC);
					aTb.appendChild(bmRow);
				};
			};
			return aTb;

			function getUserBookmarksHeader() {
				var hText = $e("B", T('MARCADORES') + ':');
				var aL = new Array();
				aL[0] = $a("",[['href', jsVoid]]);
				aL[0].appendChild($img([['src', image["addbookmark"]], ['title', T('ANYADIR')]]));
				aL[0].addEventListener("click", function() {addUserBookmark();}, 0);
				aL[1] = $a("",[['href', jsVoid]]);
				aL[1].appendChild($img([['src', image["addbmthispage"]], ['title', T('ADDCRTPAGE')]]));
				aL[1].addEventListener("click", function() {addUserBookmark(window.location.href);}, 0);
				aL[2] = $a("", [['href', jsVoid]]);
				aL[2].appendChild($img([['src', image["addbmspacer"]], ['title', T('SPACER')]]));
				aL[2].addEventListener("click", function() {addGMcookieValue("marcadores", ["<hr size='2' width='100%' noshade color=darkgrey>", "#"], false); showUserBookmarks();}, 0);
				var dI = (TB36.O[82] != "1" ? ["unlocked" + docDir[0].substring(0, 1), '82.L', "1", '8'] : ["locked", '82.U', "0", '2']);
				aL[3] = $a("", [['href', jsVoid]]);
				aL[3].appendChild($img([['src', image[dI[0]]], ['title', T(dI[1])]]));
				aL[3].addEventListener("click", function() {TB36.O[82] = dI[2]; setGMcookieV2('TB3Setup', TB36.O, 'SETUP'); showUserBookmarks(); }, false);
				var hCell = $c("", [['colspan', dI[3]]]);
				hCell.appendChild(hText);
				for (var i = 0; i < 4; i++) {hCell.appendChild(document.createTextNode(" " + (i > 0 ? '| ' : ' '))); hCell.appendChild(aL[i]);};
				hText = null; aL = null;
				return hCell;
			};
		};

		function addUserBookmark(ubURL) {
			if (!ubURL) {ubURL = prompt(T('UBU'), TB36.BrT); if (!ubURL || ubURL == '') return;};
			var ubL = prompt(T('UBT'), TB36.BrT);
			if (!ubL || ubL == '') return;
			addGMcookieValue("marcadores", [ubL, ubURL], false);
			showUserBookmarks();
			ubL = null;
		};

		function moveUserBookmark(i, updown) {
			return function(){
				var ubC = getGMcookie("marcadores", false);
				var arrUbC = ubC.split("$$");
				var tmpUb = arrUbC[i + updown];
				arrUbC[i + updown] = arrUbC[i];
				arrUbC[i] = tmpUb;
				ubC = arrUbC.join("$$");
				setGMcookie("marcadores", ubC, false);
				showUserBookmarks();
				ubC = null; arrUbC = null; tmpUb = null;
			};
		};

		function editUserBookmark(i) {
			return function() {
				var ubC = getGMcookie("marcadores", false);
				var arrUbC = ubC.split("$$");
				var tmpUb = arrUbC[i].split("$");
				var ubLabel = prompt(T('UBT'), tmpUb[0]);
				var ubURL = null;
				if (ubLabel != '') ubURL = prompt(T('UBU'), tmpUb[1]);
				if (!ubLabel) ubLabel = tmpUb[0];
				if (!ubURL) ubURL = tmpUb[1];
				if (ubLabel != '' && ubURL != '' && (ubLabel != tmpUb[0] || ubURL != tmpUb[1])) {arrUbC[i] = ubLabel + "$" + ubURL; ubC = arrUbC.join("$$"); setGMcookie("marcadores", ubC, false); showUserBookmarks();};
				ubC = null; arrUbC = null; utLabel = null; ubURL = null;
			};
		};
	};
	
	function getSpielerInfo() {
		if (crtPage.indexOf(spLnk) != -1) {
			var aV = getCapitalInfo();
			if (aV) {setCapitalInfo(aV); setUserName(getPlayerName()); setLngRace();};
		} else {
			//get town coordinates from the spieler.php page via AJAX request
			ajaxRequest(spLnk, 'GET', null, function(ajaxResp) {
				var ad = ajaxNDV2(ajaxResp);
				var aV = getCapitalInfo(ad);
				if (aV) {setCapitalInfo(aV); setUserName(getPlayerName(ad)); setLngRace(ad);};
			});
		};
		aV = null; ad = null;
		return;
	};
	
	function getSingleTownNewdid() {
		ajaxRequest("/dorf3.php", 'GET', null, function(ajaxResp) {
			if (ajaxResp) {
				ajaxResp.responseText.search(/dorf1.php\?newdid=(\d+)/);
				TB36.U[5] = RegExp.$1;
				setGMcookieV2('UserInfo', TB36.U, 'UsI');
			};
		});
		return;
	};

	function createVillageList(dlr1) {
		//single village
		if (TB36.U[4] != '') {
			//idea from Travian3 Beyond Hacked FR (mik french (fr), A_r_e_s (br), Booboo(hu))
			//create village list for single village accounts
			xy = id2xy(TB36.U[4]);
			if (!dlr1) {dlr1 = $d("", [['id', dlright1]]); divlmidall = $g(dmid); divlmidall.appendChild(dlr1);};
			var vTb;
			if (TB36.T36 == false) {
				dlr1.style.position = "relative";
				xVil = $a('<span class="f10 c0 s7 b">' + T('VILLAGE') + ':</span>', [['href', 'dorf3.php']]);
				dlr1.insertBefore(xVil, dlr1.firstChild);
				vTb = $t([['class', "f10"]]);
				aBody = $e("TBODY", "");
				vTb.appendChild(aBody);
				aRow = $r();
				aBody.appendChild(aRow);
				var aC = $c('<span class="c2">&#8226;</span>&nbsp;&nbsp;', [['class', 'nbr']]);
				aRow.appendChild(aC);
				bLink = $a(TB36.U[3], [['class', 'active_vl'], ['href', (TB36.U[5] == '' ? '?newdid=0' : '?newdid=' + TB36.U[5])]]);
				aC.appendChild(bLink);
				bCell = $c("", [['class', 'right']]);
				aRow.appendChild(bCell);
				aTb = $t([["class", "dtbl"]]);
				bCell.appendChild(aTb);
				bBody = $e("TBODY", "");
				aTb.appendChild(bBody);
				bRow = $r();
				bBody.appendChild(bRow);
				bRow.appendChild($c("(" + xy[0], [["class", "right dlist1"]]));
				bRow.appendChild($c("|", [["class", "center dlist2"]]));
				bRow.appendChild($c(xy[1] + ")", [["class", "left dlist3"]]));
				insertAfter(xVil, vTb);
			} else if (TB36.M35 == 1) {
				vDiv = $d("", [['class', 'vlist']]);
				vTb = $t([['class', 'vlist']]);
				tbody = $e("TBODY", "");
				aRow = $r([['class', 'sel']]);
				aRow.appendChild($c("&#8226;", [['class', 'dot']]));
				var aC = $c("", [['class', 'text']]);
				xVil = $a(TB36.U[3], [['href', (TB36.U[5] == '' ? '?newdid=0' : '?newdid=' + TB36.U[5])]]);
				aC.appendChild(xVil);
				aRow.appendChild(aC);
				aRow.appendChild($c("(" + xy[0], [['class', "x"]]));
				aRow.appendChild($c("|"));
				aRow.appendChild($c(xy[1] + ")", [['class', "y"]]));
				tbody.appendChild(aRow);
				vTb.appendChild(tbody);
				xVil = $a('<span class="f10 c0 s7 b">' + T('VILLAGE') + ':</span>', [['href', 'dorf3.php']]);
				xVil.setAttribute('accesskey', '9');
				vDiv.appendChild(xVil);
				vDiv.appendChild(vTb);
				dlr1.insertBefore(vDiv, dlr1.firstChild);
			} else {
				vTb = $t([['id', 'vlist']]);
				ahead = $e("THEAD", "");
				hrow = $r();
				hCell = $c("", [['colspan', '3']]);
				hLink = $a(T('VILLAGE') + ':', [['href', 'dorf3.php'], ['accesskey', '9']]);
				hCell.appendChild(hLink);
				hrow.appendChild(hCell);
				ahead.appendChild(hrow);
				tbody = $e("TBODY", "");
				aRow = $r();
				aRow.appendChild($c("&#8226;", [['class', 'dot hl']]));
				bCell = $c("", [['class', 'link']]);
				bLink = $a(TB36.U[3], [['href', '?newdid=' + (TB36.U[5] == '' ? '0' : TB36.U[5])]]);
				bCell.appendChild(bLink);
				cCell = $c("", [['class', 'aligned_coords']]);
				xD = $d(" (" + xy[0], [['class', 'cox'], ['style', 'padding-' + docDir[0] + ':5px; float:' + docDir[0] + ';']]);
				piD = $d(" | ", [['class', 'pi'], ['style', 'float:' + docDir[0] + ';']]);
				yD = $d(xy[1] + ") ", [['class', 'pi'], ['style', 'padding-' + docDir[1] + ':5px; float:' + docDir[0] + ';']]);
				cCell.appendChild(xD);
				cCell.appendChild(piD);
				cCell.appendChild(yD);
				aRow.appendChild(bCell);
				aRow.appendChild(cCell);
				tbody.appendChild(aRow);
				vTb.appendChild(ahead);
				vTb.appendChild(tbody);
				if ($g("qge")) dlr1.insertBefore(vTb, $g("qge")); else dlr1.insertBefore(vTb, dlr1.fistChild);
			};
			return vTb;
		};
	};

	function vilCount(vCount) {
		var vlH = $xf("//div[@id='" + dlright1 + "']//a[contains(@href, 'dorf3.php')]");
		if (vlH) {
			if (vlH.parentNode.nodeName == "TD") vlH.innerHTML = T('ALDEAS') + " (" + (vCount - 1) + "):&nbsp;&nbsp;"; else vlH.firstChild.innerHTML = T('ALDEAS') + " (" + vCount + "):&nbsp;&nbsp;";
			l = $a(gIc["reload_p"], [['href', jsVoid]]);
			l.addEventListener("click", updatePopulation, false);
			insertAfter(vlH, l);
		};
		vlH = null;

		function updatePopulation() {
			ajaxRequest(spLnk, 'GET', null, function(ajaxResp) {
				var ad = ajaxNDV2(ajaxResp);
				var aTb = $xf("//table[@id='villages'] | //div[@id='" + dmid2 + "']//table[@class='tbg'][2]", 'f', ad);
				if (aTb) {parsePlayerTable(aTb, true); pauseScript(892); location.href = crtPage;}
			});
			return;
		};
	};

	function parsePlayerTable(aTb, bUpd) {
		var vPop = 0;
		var totP = 0;
		var vLnk, aLnk, cxy, vID;
		for (i = 2; i < aTb.rows.length; i++) {
			vPop = parseInt(aTb.rows[i].cells[1].innerHTML);
			totP += vPop;
			vLnk = aTb.rows[i].cells[0].getElementsByTagName("A")[0];
			aLnk = vLnk.href.split("=");
			cxy = id2xy(aLnk[1]);
			vID = xy2id(cxy[0], cxy[1]);
			if (bUpd == true) setVillageRes(vID, vPop);
		};
		vPop = null; vLnk = null; aLnk = null; cxy = null; vID = null;
		return totP;
	};

	function getBiPTMTable(vNewdid) {
		//create the BiP & troop movements table for this village
		var arrBiP = null;
		var arrTM = null;
		var bS = false;
		var xImg, dDT, tDT, atT, bipT, tr1, tr2, aC1, aC2, aC3, aC4, strH, strM;
		var fDiv = $e("DIV");
		var cBiP = getGMcookieV2("BiP");
		var cTM = getGMcookieV2("TroopMovements");
		
		fDiv.innerHTML = '';
		if (cBiP && cBiP[vNewdid] != undefined) arrBiP = cBiP[vNewdid];
		if (cTM && cTM[vNewdid] != undefined) arrTM = cTM[vNewdid];

		if (arrBiP != null) {
			tr1 = $r([['class', 'tb3r']]);
			aC1 = $c("<img src='" + gIc["bau"] + "'>", [['class', 'tb3c'], ['style', 'text-align:center;'],['colspan', '3']]);
			tr1.appendChild(aC1);
			for (var i = 0; i < arrBiP.length; i++) {
				bipT = arrBiP[i].endTime;
				dDT = new Date();
				tDT = dDT.getTime();
				if (tDT < bipT) {
					tr2 = $r();
					aC2 = $c(arrBiP[i].name, [['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					aC3 = $c(arrBiP[i].txtLvl, [['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var strEndTime = new Date();
					strEndTime.setTime(arrBiP[i].endTime);
					strH = strEndTime.getHours();
					if (strH < 10) strH = '0' + strH;
					strM = strEndTime.getMinutes();
					if (strM < 10) strM = '0' + strM;
					aC4 = $c(strH + ":" + strM,  [['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					tr2.appendChild(aC2);
					tr2.appendChild(aC3);
					tr2.appendChild(aC4);
					if (bS == false) {fDiv.appendChild(tr1); bS = true;};
					fDiv.appendChild(tr2);
				};
			};
		};

		bS = false;
		if (arrTM != null) {
			tr1 = $r([['class', 'tb3r']]);
			aC1 = $c(gIc["att_all"], [['class', 'tb3c'], ['style', 'text-align:center;'],['colspan', '3']]);
			tr1.appendChild(aC1);
			for (var i = 0; i < arrTM.length; i++) {
				atT = arrTM[i].fT;
				dDT = new Date();
				tDT = dDT.getTime();
				if (tDT < atT) {
					tr2 = $r([['class', 'tb3r']]);
					xImg = TB36.T36 == true ? gIc[arrTM[i].type] : '<img src="' + img("a/" + arrTM[i].type) + '" height="12px" width= "12px">';
					aC2 = $c(xImg, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					aC3 = $c(arrTM[i].no, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var strFTime = new Date();
					strFTime.setTime(arrTM[i].fT);
					strH = strFTime.getHours();
					strM = strFTime.getMinutes();
					aC4 = $c((strH > 9 ? strH : '0' + strH) + ":" + (strM > 9 ? strM : '0' + strM),  [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					tr2.appendChild(aC2);
					tr2.appendChild(aC3);
					tr2.appendChild(aC4);
					if (bS == false) {fDiv.appendChild(tr1); bS = true;};
					fDiv.appendChild(tr2);
				};
			};
		};
		var vRet = fDiv.innerHTML;
		fDiv = null; xImg = null; dDT = null; tDT = null; atT = null; bipT = null; tr1 = null; tr2 = null; aC1 = null; aC2 = null; aC3 = null; aC4 = null; strH = null; strM = null;
		return vRet;
	};

	function showBiPTMinTT(vNewdid) {
		//show Buildings in Progress and Troop Movements in a tooltip
		return function() {
			var tI = getBiPTMTable(vNewdid);
			if (tI != '') {
				var aT = $g("tb_tooltip");
				if (aT == null) aT = createTooltip();
				aT.innerHTML = "<table id='BiPTM' + width='100px'>" + tI + "</table>";;
				aT.style.display = 'block';
				tI = null; aT = null;
			};
		};
	};

	function villageList() {
		//list of villages
		dlr1 = $g(dlright1);
		divlmid2 = $g(dmid2);
		var vTable = $g('vlist');
		if (!vTable) vTable = $xf("//table[@class='vlist'] | //div[@id='" + dlright1 + "']//table[@class='f10']");
		if (!vTable) vTable = createVillageList(dlr1); else if (TB36.U[4] != '-' || TB36.U[5] != '-') {TB36.U[4] = '-'; TB36.U[5] = '-'; setGMcookieV2('UserInfo', TB36.U, 'UsI');};
		if (!vTable) return;
		vilCount(vTable.rows.length);
		if (dlr1.childNodes[1] && dlr1.childNodes.nodeName == "DIV" || dlr1.childNodes[0] && dlr1.childNodes[0].nodeName == "DIV") vTable = vTable.firstChild;
		zi = 0;
		if (vTable.parentNode.nodeName == "DIV" && (vTable.parentNode.id == 'sright' || vTable.parentNode.id == 'side_info')) zi = 1;
		//$at(dlr1, [['style', 'display:none;']]);
		if (TB36.VillageRes && TB36.VillageRes[actV.vID]) TB36.AVP = TB36.VillageRes[actV.vID][0];
		for (var i = zi; i < vTable.rows.length; i++){
			v = vTable.rows[i];
			vCell = v.cells[1];
			if (!vCell) continue;
			/*
			if (zi == 1) {
				vName = vCell.textContent;
				vLink = vCell.childNodes[0].href;
			} else {
			*/
			if (zi == 1) {
				vName = vCell.textContent;
				vLink = vCell.childNodes[0].href;
				if (!vLink) vLink = vCell.childNodes[0].childNodes[0].href;
				if (!vLink) continue;
			} else {
				if (vCell.className == 'text') {
					vName = vCell.textContent;
					vLink = vCell.childNodes[0].href;
				} else {
					vCell = v.cells[0];
					vChild = vCell.childNodes[2];
					if (vChild.nodeName != "A") vChild = vCell.childNodes[3];
					vName = vChild.textContent;
					vLink = vChild.href;
				};
			};
			
			vNewdid = getNewdidFromLink(vLink);
			if (vNewdid != actV.vNewdid) vNames += '"' + vName + '",';

			if (vCell.nextSibling.childNodes[0].nodeName == "TABLE") {
				strCoords = vCell.nextSibling.childNodes[0].textContent;
				strCoords.search(/\((.*)\n?\|\n?(.*)\)/);
				tmpX = RegExp.$1;
				tmpY = RegExp.$2;
			} else if (vCell.nextSibling.className == 'aligned_coords') {
				tmpC = vCell.nextSibling.textContent.replace("(", "").replace(")", "").split("|");
				tmpX = parseInt(tmpC[0]);
				tmpY = parseInt(tmpC[1]);
			} else {
				tmpX = vCell.nextSibling.textContent.replace("(", "");
				tmpY = vCell.nextSibling.nextSibling.nextSibling.textContent.replace(")", "");
			};

			vID = xy2id(tmpX, tmpY);

			vList[vList.length] = new xVillage(vName, vID, vNewdid, tmpX, tmpY, vLink);
			yi = vList.length - 1;

			popX = [0, 0, 0, 0, 0, 0];
			if (TB36.VillageRes[vList[yi].vID]) popX = TB36.VillageRes[vList[yi].vID];

			if (TB36.O[17] == '1') {
				if (TB36.VillageRes == "false") {popCell = $c("<a href='" + spLnk + "'>?</a>");} else {popCell = $c(popX[0], [['style', 'color:darkgreen;']]);};
				v.appendChild($c(" " + "<img src='" + image["pop"] + "'>", [['style', 'text-align:' + docDir[0] + ';']]));
				v.appendChild(popCell);
			};

			//show res prod/h
			if (TB36.O[15] == '1' && TB36.VillageRes[vList[yi].vID]) {
				for (var xi = 1; xi < 4; xi++) {v.appendChild($c(" " + gIc["r" + xi], [['style', 'text-align:' + docDir[0] + ';']])); v.appendChild($c(TB36.VillageRes[vList[yi].vID][xi]));};
			};
			
			//show effective crop prod/h
			if (TB36.O[16] == "1") {
				cpphColor = "black";
				cpph = parseInt(popX[4]);
				if (cpph > 0) {cpph = "+" + cpph; cpphColor = "darkgreen";} else if (cpph < 0) cpphColor = "red";
				v.appendChild($c(" " + gIc["r4"], [['style', 'text-align:' + docDir[0] + ';']]));
				v.appendChild($c(cpph, [['style', 'color:' + cpphColor + ';']]));
			};

			if (TB36.O[12] == "1") {
				for (var xi = 1; xi < 3; xi++) {
					aCell = $c("");
					aLink = $a("", [['href', 'dorf' + xi + '.php?newdid=' + vList[yi].vNewdid]]);
					if (xi == 1) strImg = "ov"; else strImg = "iv";
					aLink.appendChild($img([['src', image[strImg]], ['title', vList[yi].vName + " (dorf" + xi + ".php)"]]));
					aCell.appendChild(aLink);
					v.appendChild(aCell);
				};
			};
			if (TB36.O[13] == '1') {
				aCell = $c("");
				aLink = $a("", [['href', 'karte.php?z=' + vList[yi].vID]]);
				aLink.appendChild($img([['src', image["centermap"]],['title', T('CENTERMAP') + " (" + vList[yi].vName + ")"]]));
				aCell.appendChild(aLink);
				v.appendChild(aCell);
			};

			if (TB36.O[19] == '1') {
				aCell = $c("");
				aCell.addEventListener("mouseover", showBiPTMinTT(vNewdid), false);
				aCell.addEventListener("mouseout",  hideTT, 0);
				aCell.appendChild($img([['src', image["info"]]]));
				v.appendChild(aCell);
			};

			if (TB36.O[14] == '1') {
				v.appendChild($c("<a href='a2b.php?z=" + vList[yi].vID + "'>" + gIc["def1_1"] + "</a>"));
				v.appendChild($c("<a href='build.php?z=" + vList[yi].vID + "&gid=17'>" + gIc["r41"] + "</a>"));
			};
			if (crtPage.indexOf('karte') != -1) {
				if (TB36.O[57] == "1" && TB36.xCrt != -1000 && TB36.yCrt != -1000) {
					var lDist = getDistance(vList[yi].vx, vList[yi].vy, TB36.xCrt, TB36.yCrt);
					v.appendChild($c(" " + "<img src='" + image["dist" + docDir[0].substr(0,1)] + "'>" + " " + lDist.toFixed(2), [['style', 'color:blue;']]));
				};
			};
		};
		dlr1.style.width = (v.parentNode.clientWidth + 150) + 'px';
		dx = docDir[0] == 'left' ? parseInt(divlmid2.offsetLeft) + parseInt(divlmid2.clientWidth) : parseInt(TB36.wW) - parseInt(divlmid2.offsetLeft);// + parseInt(dlr1.clientWidth);
		$at(dlr1, [['style', 'position:absolute; top:' + divlmid2.offsetTop + 'px; ' + docDir[0] + ':' + dx + 'px;']]);
	};

	function addVillageNamesScript() {
		//own villages for market & rally point send pages
		isAddV = $g("build");
		if (!isAddV) isAddV = $xf('//form[@name="snd" and @action="a2b.php"]');
		iDN = document.getElementsByName("dname");
		if (isAddV && iDN.length > 0) {
			dorfnamen = $e("script");
			dorfnamen.setAttribute("language", "JavaScript");
			iHTML = 'var dorfnamen = new Array(' + vNames.substring(0, vNames.lastIndexOf(',')) + ')';
			dorfnamen.innerHTML = iHTML;
			isAddV.appendChild(dorfnamen);
			iDN[0].setAttribute("onkeyup", "my_village()");
		};
	};
	
	function show2ndVillageList() {
		if (TB36.O[18] != "1") return;
		var VL2W = 250; var vL2Tb = create2ndVLtable(); var vL2XY = TB36.O[78].split("|"); $df(VL2W, vL2XY[0], vL2XY[1], T('VGL'), "vl2table", "vl2tableTT", true).appendChild(vL2Tb); vL2Tb = $g("vl2table"); if (vL2Tb) adjustFloatDiv(vL2Tb, VL2W, "vl2table");
	};

	function create2ndVLtable() {
		var aTb = $t([['id', 'vl2table']]);
		if (TB36.O[73] == '0') aTb.style.display = 'none';
		var strBx = '&nbsp;&#8226&nbsp;&nbsp';
		var maxRows = Math.ceil(vList.length / 2);
		for (var i = 1; i <= maxRows; i++) {
			aRow = $r();
			aCell = $c(strBx);
			if (vList[i - 1].vID == actV.vID) $at(aCell, [['class', 'av']]);
			aLink = $a(vList[i - 1].vName, [['href', vList[i - 1].vLink]]);
			aCell.appendChild(aLink);
			aRow.appendChild(aCell);
			bCell = $c("(" + vList[i - 1].vx + "|" + vList[i - 1].vy + ")", [['class', 'coord']]);
			aRow.appendChild(bCell);
			aRow.appendChild($c("<a href='a2b.php?z=" + vList[i - 1].vID + "'>" + gIc["def1_1"] + "</a>"));
			aRow.appendChild($c("<a href='build.php?z=" + vList[i - 1].vID + "&gid=17'>" + gIc["r41"] + "</a>"));
			tdE = $c('', [['style', 'width:10px;']]);
			aRow.appendChild(tdE);
			if (i + maxRows <= vList.length ) {
				cCell = $c(strBx);
				if (vList[i - 1 + maxRows].vID == actV.vID) $at(cCell, [['class', 'av']]);
				bLink = $a(vList[i - 1 + maxRows].vName, [['href', vList[i - 1 + maxRows].vLink]]);
				cCell.appendChild(bLink);
				aRow.appendChild(cCell);
				aRow.appendChild($c("(" + vList[i - 1 + maxRows].vx + "|" + vList[i - 1 + maxRows].vy + ")", [['class', 'coord']]));
				aRow.appendChild($c("<a href='a2b.php?z=" + vList[i - 1 + maxRows].vID + "'>" + gIc["def1_1"] + "</a>"));
				aRow.appendChild($c("<a href='build.php?z=" + vList[i - 1 + maxRows].vID + "&gid=17'>" + gIc["r41"] + "</a>"));
			} else {
				cCell = $c("", [['colspan', '4']]);
				if (vList.length == 1) $at(cCell, [['style', 'width:250px;']]);
				aRow.appendChild(cCell);
			};
			aTb.appendChild(aRow);
		};
		return aTb;
	};

	function selectFakeTroopsCell(boolShowAll) {
		aCell = null;
		if (TB36.U[1] != '') {
			aCell = $c("", [['id', 'selectfaketroopscell']]);
			for (var xi = 0; xi < 8; xi++) {
				if ((TB36.U[1] != 'Gauls' && xi != 4) || (TB36.U[1] == 'Gauls' && xi != 3)) {
					tAv = $g("troopsav_" + xi);
					if (tAv || boolShowAll) {
						aCell.appendChild($i([['type', 'checkbox'], ['id', 'faketroop_' + (xi)], ['value', '1']]));
						aImg = $img([['src', gIc["u" + (xi + TB36.U[7] - 1)]]]);
						if (TB36.T36 != false) $at(aImg, [['class', "unit u" + (xi + TB36.U[7] - 1)]]);
						aCell.appendChild(aImg);
						aCell.appendChild(document.createTextNode("  "));
					};
				};
			};
		};
		return aCell;
	};

	function showLastAttack() {
		if (TB36.O[51] != '1') return;
		var aF = $xf("//form[@name='snd']");
		if (!aF) return;
		
		var bOK = $xf("//*[@id='btn_ok' and @name='s1']");
		if (bOK) bOK.addEventListener('click', saveLastAttack, false);
		
		var cstla = getGMcookieV2('stla');
		if (cstla && cstla[actV.vID]) {
			var stla = cstla[actV.vID];
			var bsh = false;
			for (var xi = 2; xi < stla.length - 2; xi++) {if (stla[xi] != 0) bsh = true;};
			if (bsh == true) {
				//create the last send attack table for this village
				var aTb = $t([['id', 'stla']]);
				var aRow = $r();
				aRow.appendChild($c('<img class="unit u' + (TB36.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh1']]));
				aRow.appendChild($c(stla[2]));
				aRow.appendChild($c('<img class="unit u' + (3 + TB36.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				aRow.appendChild($c(stla[5]));
				aRow.appendChild($c('<img class="unit u' + (6 + TB36.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				aRow.appendChild($c(stla[8]));
				aRow.appendChild($c('<img class="unit u' + (8 + TB36.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				aRow.appendChild($c(stla[10]));
				var bRow = $r();
				bRow.appendChild($c('<img class="unit u' + (1 + TB36.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh1']]));
				bRow.appendChild($c(stla[3]));
				bRow.appendChild($c('<img class="unit u' + (4 + TB36.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				bRow.appendChild($c(stla[6]));
				bRow.appendChild($c('<img class="unit u' + (7 + TB36.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				bRow.appendChild($c(stla[9]));
				bRow.appendChild($c('<img class="unit u' + (9 + TB36.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				bRow.appendChild($c(stla[11]));
				var cRow = $r();
				cRow.appendChild($c('<img class="unit u' + (2 + TB36.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh1']]));
				cRow.appendChild($c(stla[4]));
				cRow.appendChild($c('<img class="unit u' + (5 + TB36.U[7]) + '" src="' + xGIF + '">', [['class', 'stlahh']]));
				cRow.appendChild($c(stla[7]));
				cRow.appendChild($c('', [['colspan', '2']]));
				if (stla.length > 14) {cRow.appendChild($c('<img class="unit uhero" src="' + xGIF + '">', [['class', 'stlahh']])); cRow.appendChild($c(stla[12]));} else {cRow.appendChild($c('', [['class', 'stlahh']])); cRow.appendChild($c(''));};
				
				var eRow = $r();
				eRow.appendChild($c(T('RESEND'), [['class', 'stlahh1'], ['colspan', '2']]));
				var aL = $a('<img src="' + image["bOK"] + '" title="' + T('YES') + '" alt="' + T('YES') + '">', [['href', jsVoid]]);
				aL.addEventListener("click", setLastAttack, false);
				var sC = $c("", [['class', 'stlac'], ['colspan', '3'], ['style', 'width:100px;']]);
				sC.appendChild(aL);
				eRow.appendChild(sC);
				var fRow = $r();
				eRow.appendChild($c(T('DEL'), [['class', 'stlahh2'], ['colspan', '2']]));
				aDel = $a(gIc["del"], [['href', jsVoid]]);
				aDel.addEventListener("click", hideLastAttackSend, 0);
				var dC = $c("", [['class', 'stlac']]);
				dC.appendChild(aDel);
				eRow.appendChild(dC);
				aTb.appendChild(aRow);
				aTb.appendChild(bRow);
				aTb.appendChild(cRow);
				if (TB36.O[52] == '1') {
					var dRow = $r();
					dRow.appendChild($c('<img src="' + image["vmkls"] + '">', [['class', 'stlahh1']]));
					dRow.appendChild($c("(" + stla[0] + "|" + stla[1] + ")", [['class', 'stlac'], ['colspan', '4']]));
					dRow.appendChild($c(stla[stla.length - 1], [['class', 'stlac'], ['colspan', '3']]));
					aTb.appendChild(dRow);
				};
				aTb.appendChild(eRow);
				//aTb.appendChild(fRow);
				var aP = $e("P", "");
				aP.appendChild(aTb);
				var ln = $g("troops");
				insertAfter(ln, aP);
			};
		};
		
		function setLastAttack() {
			var tx;
			for (var i = 2; i < stla.length - 2; i++) {tx = $xf("//form[@name='snd']//*[@name='t" + (i - 1) + "']"); if (stla[i] != 0 && tx.className != 'text disabled') tx.value = stla[i]; else tx.value = '';};
			updateTroopsPower();
			if (TB36.O[52] == '1') {$xf("//form[@name='snd']//*[@name='x']").value = stla[0]; $xf("//form[@name='snd']//*[@name='y']").value = stla[1];};
			var rbc = $xf("//form//input[@name='c' and @value='" + stla[stla.length - 2] + "']");
			if (rbc) rbc.checked = true;
		};
		
		function hideLastAttackSend() {for (var xi = 2; xi < stla.length; xi++) {stla[xi] = 0;}; setGMcookieV2("stla", stla, actV.vID); $g('stla').style.display = 'none';};
		
		function saveLastAttack() {
			var aT = $xf("//form[@name='snd']//table//input[starts-with (@name, 't')]", 'l');
			var stla = new Array();
			stla[0] = $xf("//form[@name='snd']//*[@name='x']").value;
			stla[1] = $xf("//form[@name='snd']//*[@name='y']").value;
			for (var i = 0; i < aT.snapshotLength; i++) {stla[i + 2] = 0; stla[1 + parseInt(aT.snapshotItem(i).name.replace("t", ""))] = (aT.snapshotItem(i).value != '' ? parseInt(aT.snapshotItem(i).value) : 0);};
			var rbl = $xf("//form//input[@name='c']", 'l');
			for (var i = 0; i < rbl.snapshotLength; i++) {if (rbl.snapshotItem(i).checked == true) {stla[stla.length] = rbl.snapshotItem(i).value; stla[stla.length] = rbl.snapshotItem(i).parentNode.textContent;};};
			setGMcookieV2('stla', stla, actV.vID);
		};
	};
	
	function updateTroopsPower() {
		totals = [["troopsattpower", "att_all", 5, 0], ["troopsdefipower", "def_i", 6, 0], ["troopsdefcpower", "def_c", 7, 0], ["troopscapacity", "capacity", 4, 0], ["troopscropconsumption", "img5", 9, 0]];
		for (var i = 1; i < 11; i++) {
			tInput = $g("t" + i);
			if (tInput) {
				/*
				if (TB36.T36 == false) tImg = tInput.parentNode.previousSibling.firstChild; else tImg = tInput.parentNode.childNodes[1];
				*/
				if (TB36.T36 == false) {
					tImg = tInput.parentNode.previousSibling.firstChild;
				} else {
					tImg = tInput.parentNode.childNodes[1];
					if (!tImg || tImg.nodeType == 3) {
						tImg =$xf(".//preceding-sibling::img", false, tInput);
					}
				}
				//
				tType = getTroopIndexTitleFromImg(tImg)[0];
				if (tInput.value != "") {intTinput = parseInt(tInput.value); for (var j = 0; j < 5; j++) {totals[j][3] += intTinput * uc[tType][totals[j][2]];};};
			};
		};
		for (var j = 0; j < 5; j++) {
			cX = $g(totals[j][0]);
			if (cX) {
				strX = " *";
				switch (j) {
					case 3: iP = gIc["capacity"]; strX = ""; break;
					case 4: iP = gIc["r5"]; strX = ""; break;
					default: iP = gIc[totals[j][1]]; break;
				};
				cX.innerHTML = iP + strX + " " + $ls(totals[j][3]);
			};
		};
		return;
	};
	
	//someweirdnobody (initial), Nux (selectScout & selectFake), ms99 (final), Acr111 (change)
	function selectAllTroops() {
		var iF = $xf("//input[@name='t1' and not (@type='hidden')]");
		if (iF == null) return;
		var tI;
		var tL;
		for (var i = 1; i < 12; i++) {
			tI = $xf("//input[@name='t" + i + "']");
			if (tI) {
				$at(tI, [['id', 't' + i]]);
				tI.addEventListener('keyup', updateTroopsPower, false);
				tI.addEventListener('change', updateTroopsPower, false);
				/*
				if (TB36.T36 == false) {tL = tI.parentNode.nextSibling.firstChild;} else {tL = tI.parentNode.childNodes[5]; if (!tL) tL = tI.parentNode.childNodes[5].childNodes[0];};
				*/
				if (TB36.T36 == false) {
					tL = tI.parentNode.nextSibling.firstChild;
				} else {
					tL = tI.parentNode.childNodes[5]; 
					if (!tL) tL = tI.parentNode.childNodes[5].childNodes[0];
					if (!tL || tL.nodeType == 3) {
						tL =$xf(".//following-sibling::a[@onclick]", false, tI);
					}
				};
				//
				if (tL) {xxx = tL.textContent.replace("(", "").replace(")", ""); if (xxx != '0') {$at(tL, [['id', 'troopsav_' + i]]); tL.addEventListener('click', addUpdateTroopsPower(i, tL), false);};};
			};
		};

		//original position
		header = $xf("//div[@id='" + dmid2 + "']//h1");
		//move the table as suggested by Acr111
		//var header = $xf("//td[@width='33%']");
		arrSelect = [[T('SELECTALLTROOPS'), getAllTroops], [T('SELECTSCOUT'), getScout], [T('SELECTFAKE'), getFakeUnitV2]];
		aTb = $t([["class", "tb3tbnb"], ['style', 'width:auto;']]);
		//change the style of the table as suggested by Acr111
		//aTb.setAttribute("style", "position:relative; left:-20px; z-index: 100; border: 1px solid #00C000; font-size:11px;");
		for (var i = 0; i < 3; i++) {
			aRow = $r([['class', 'tb3rnb']]);
			aCell = $c("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + '; font-size:8pt;']]);
			//change as suggested by Acr111
			//if (i == 0) aCell.setAttribute("colspan", "3");
			aLink = $a(arrSelect[i][0], [['href', jsVoid]]);
			aLink.addEventListener("click", arrSelect[i][1], true);
			aCell.appendChild(aLink);
			aRow.appendChild(aCell);
			if (i == 0) {bCell = $c("", [['colspan', '2']]); aRow.appendChild(bCell);};
			if (i == 1){
				//insert no of fakes cell
				bCell = $c("");
				scoutInput = $i([['type', 'text'], ['id', 'selectscoutnumber'], ['style', 'width:30px; font-size:8pt']]);
				if (isNaN(parseInt(TB36.O[50]))) scoutInput.value = 3; else scoutInput.value = parseInt(TB36.O[50]);
				bCell.appendChild(scoutInput);
				aRow.appendChild(bCell);
				//insert save option to change the setup option directly from the Rally point -> Send troops page
				//cCell = $c("&nbsp;<input type='checkbox' id='savescoutnumber' value='1'></input>&nbsp;" + T('SAVE'));
				//aRow.appendChild(cCell);
			};
			if (i == 2) {
				//allow selection of fake unit
				aCell = selectFakeTroopsCell();
				if (aCell != null) {aCell.setAttribute('colspan', '2'); aRow.appendChild(aCell);};
			};
			aTb.appendChild(aRow);
		};

		insertAfter(header, aTb);

		troopTable = $g("troops");
		if (!troopTable) troopTable = $xf("//table[@class='troops'] | //table[@class='dashed'] | //table[@class='f10']");
		
		//fix for unusual icons appearing under the list of villages - fr3nchlover
		tags7 = $xf("//div[@id='" + dmid2 + "']//td[@class='s7']");
		if ((TB36.T36 == false && troopTable != null && !tags7) || (TB36.T36 == true && troopTable != null)) {
			//"clear all" button
			aRow = $r();
			delCell = $c("", [['colspan', '12'], ['style', 'text-align:center']]);
			clAllLink = $a("<img src='" + image["bDel"] + "' title='" + T('MTCL') + "' alt='" + T('MTCL') + "'>");
			clAllLink.href = jsVoid;
			clAllLink.addEventListener("click", clearAllTroops, false);
			delCell.appendChild(clAllLink);
			aRow.appendChild(delCell);
			troopTable.appendChild(aRow);

			//additional table as requested by users
			if (TB36.T36 == false) parX = $xf("//table[@class='p1']"); else parX = troopTable;
			if (parX) {
				attdefTable = $t([['class', 'tb3tb']]);
				hRow = $r([['class', 'tb3r']]);
				hCell = $c(T('STAT') + " (* = " + T('MIN') + ")", [['colspan', '4'], ['style', 'font-weight:bold;'], ['class', 'tb3ch']]);
				hRow.appendChild(hCell);
				attdefTable.appendChild(hRow);

				//total attack, def_i and def_c power for the selected troops
				bRow = $r([['style', 'text-align:' + docDir[0] + ';']]);

				aCell = $c(gIc["att_all"] + " *", [['id', "troopsattpower"], ['style', 'width:33%;']]);
				bCell = $c(gIc["def_i"] + " *", [['id', "troopsdefipower"], ['colspan', "2"], ['style', 'width:33%;']]);
				cCell = $c(gIc["def_c"] + " *", [['id', "troopsdefcpower"], ['style', 'width:34%;']]);

				bRow.appendChild(aCell);
				bRow.appendChild(bCell);
				bRow.appendChild(cCell);
				attdefTable.appendChild(bRow);
				dRow = $r();

				dRow.appendChild($c(gIc["capacity"], [['id', 'troopscapacity'], ['style', 'text-align:' + docDir[0] + '; width:50%;'], ['colspan', "2"]]));//total capacity
				dRow.appendChild($c(gIc["r5"], [['id', 'troopscropconsumption'], ['style', 'text-align:' + docDir[0] + '; width:50%;'], ['colspan', "2"]]));//crop consumption
				attdefTable.appendChild(dRow);

				aDiv = $d("");
				aDiv.appendChild($e("P", ""));
				aDiv.appendChild(attdefTable);
				insertAfter(parX, aDiv);
			};
		};

		function addUpdateTroopsPower(i, troopLink) {
			return function() {var aNo = parseInt(troopLink.textContent.replace("(", "").replace(")", "")); troopInput = $g("t" + i); if (troopInput) {troopInput.value = aNo; updateTroopsPower();};};
		};

		function clearAllTroops() {for (var i = 1; i < 12; i++) {var troopInput = $g("t" + i); if (troopInput) troopInput.value = '';}; updateTroopsPower(); return;};
		function getTroopInputFields() {return $xf("//form[@name='snd']//table//input[(@type='text' or @type='Text') and not (@name='x') and not (@name='y')] | //table[@class='p1']//table[@class='f10']//input[@type='Text' or @type='text']", 'l');};
		function getTroopInputMaxFields() {return $xf("//form[@name='snd']//table//a | //table[@class='p1']//table[@class='f10']//a", 'l');};

		function getAllTroops() {
			nodeRes = getTroopInputFields();
			//clear all the input fields
			for (var i = 0; i < nodeRes.snapshotLength; i++) {nodeRes.snapshotItem(i).value = ""; };
			troopsForm = document.forms.namedItem("snd");
			nodes = getTroopInputMaxFields();
			if (nodes.snapshotLength > 1) {
				for (var i = 0; i < nodes.snapshotLength; i++) {
					node = nodes.snapshotItem (i);
					if (node.getAttribute("onClick")) {
						node.getAttribute("onClick").search(/document\.snd\.(.*)\.value=(.*); return false;/);
						inputName = RegExp.$1;
						troopValue = RegExp.$2;
						troopInput = troopsForm.elements.namedItem(inputName);
						troopInput.value = troopValue;
					};
				};
				updateTroopsPower();
			} else alert(T('NOTROOPS'));
		};

		function getScout() {
			var indCol = (TB36.U[1] == "Gauls" ? 't3' : 't4');
			var nodeRes = getTroopInputFields();

			//clear all the input fields
			for (var i = 0; i < nodeRes.snapshotLength; i++) { nodeRes.snapshotItem(i).value = ""; };

			//set the attack:raid as action
			rbAction = $xf("//input[@value='4' and @name='c']");
			if (rbAction) rbAction.checked = true;

			troopsForm = document.forms.namedItem("snd");
			maxScout = $xf("//a[contains(@onclick, '" + indCol + "')]");
			if (maxScout) {
				maxScout.getAttribute("onClick").search(/document\.snd\.(.*)\.value=(.*); return false;/);
				inputName = RegExp.$1;
				if (inputName != 't9' && inputName != 't10') {
					scoutInput = troopsForm.elements.namedItem(inputName);
					maxNoOfScouts = parseInt(maxScout.textContent.replace("(", "").replace(")", ""));
					iNoOfScouts = $g('selectscoutnumber');
					if (iNoOfScouts) wNoOfScouts = parseInt(iNoOfScouts.value); else wNoOfScouts = 3;
					if (wNoOfScouts > maxNoOfScouts) wNoOfScouts = maxNoOfScouts;
					scoutInput.value = wNoOfScouts;
					if (scoutInput.value != "" && parseInt(scoutInput.value) > 0) {TB36.O[50] = parseInt(scoutInput.value); setGMcookieV2('TB3Setup', TB36.O, "SETUP");};
					updateTroopsPower();
				};
			} else alert(T('NOTROOP2SCOUT'));
		};

		function getFakeUnitV2() {
			nodeRes = getTroopInputFields();
			//remove previously selected units
			for (var i = 0; i < nodeRes.snapshotLength; i++) {nodeRes.snapshotItem(i).value = "";};
			//set the attack:normal as action
			rbA = $xf("//input[@value='3' and @name='c']");
			if (rbA) rbA.checked = true;
			nodeUnits = getTroopInputMaxFields();
			if (nodeUnits.snapshotLength > 1) {
				chk = false;
				for (var xi = 1; xi < 9; xi++) {
					faketroopselected = $g("faketroop_" + xi);
					if (faketroopselected && faketroopselected.checked) {
						avFake = $g('troopsav_' + xi);
						if (avFake) {
							//there are units available from selected fake troop type
							aInput = $g("t" + xi);
							if (aInput) {aInput.value = 1; chk = true;};
						};
					};
				};
				if (chk == false) {
					//no troops for fake selected or nothing availabe => use default
					tTroop = 2;
					avFake = $g('troopsav_2');
					if (!avFake) {avFake = $g('troopsav_1'); tTroop = 1;};
					if (avFake) {aInput = $g("t" + tTroop); if (aInput) {aInput.value = 1; chk = true;};};
				};
				if (chk == false) alert(T('NOSCOUT2FAKE')); else updateTroopsPower();
			} else alert(T('NOTROOPS'));
		};
	};

	function addAttDefInfoTable() {
		tTable = $xf("//div[@id='troop_village']//table | //div[@id='ltrm']/table | //div[@id='map_details']/table[@id='troops']");
		if (!tTable) return;
		var bS = false;
		if (TB36.M35 != 2) {tDiv = tTable.previousSibling; if (tDiv.nodeName != "DIV") tDiv = tDiv.previousSibling; if (tDiv.nodeName == "DIV") bS = true;} else {tDiv = tTable.rows[0].cells[0]; bS = true;};
		if (bS == true) {tDiv.innerHTML += " "; iImg = $img([['src', image["info"]]]); tDiv.appendChild(iImg); tDiv.addEventListener("mouseover", showAttDefTooltip(), false); tDiv.addEventListener("mouseout",  hideTT, 0);};

		function showAttDefTooltip() {
			return function() {
				adtHTML = "<table id='mhtt' width='100px'>" + getTroopsAttDefInfoTable(tTable, false, true) + "</table>";
				aTooltip = $g("tb_tooltip");
				if (!aTooltip) aTooltip = createTooltip();
				aTooltip.innerHTML = adtHTML;
				aTooltip.style.display = 'block';
			};
		};
	};

	function getTroopsAttDefInfoTable(tNTroops, bMap, bMin) {
		if (!tNTroops) return '';
		tNinfo = [0, 0, 0, 0];
		iHTML = '';
		bInfo = false;
		strMinInfo = '';
		strMinX = '';
		if (!tNTroops.rows) return iHTML;
		for (var i = 0; i < tNTroops.rows.length; i++) {
			aRow = tNTroops.rows[i];
			aImg = aRow.cells[0].firstChild;
			if (aImg.nodeName != 'IMG') aImg = aRow.cells[0].firstChild.firstChild;
			if (aImg && aImg.src) {
				index = getTroopIndexTitleFromImg(aImg)[0];
				if (!isNaN(index) && index > 0) {
					if (bMap) {
						imgHTML = '<img class="' + aImg.className + '" src="' + xGIF + '">';
						if (TB36.T36 == false) imgHTML = "<img src=" + aRow.childNodes[0].firstChild.src + ">";
						iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + imgHTML + "</td><td style='text-align:" + docDir[1] + ";'>" + aRow.cells[1].textContent + "</td></tr>";
					};
					tNo = parseInt(aRow.cells[1].textContent);
					tNinfo[0] += tNo * uc[index][5];
					tNinfo[1] += tNo * uc[index][6];
					tNinfo[2] += tNo * uc[index][7];
					tNinfo[3] += tNo * uc[index][9];
					bInfo = true;
				} else tNinfo[3] += 6; //hero
			} else if (crtPage.indexOf("dorf1.php") != -1) iHTML += "<tr><td>" + aRow.cells[0].textContent + "</td></tr>";
		};
		if (bInfo == true) {
			if (tNinfo[0] != 0 + tNinfo[1] + tNinfo[2] > 0) {
				if (bMap == true) iHTML += "<tr><td>&nbsp;</td></tr>";
				if (bMin == true) {strMinInfo = "* = " + T('MIN'); strMinX = "*"; iHTML += "<tr><td colspan='2' style='font-weight:bold; text-align:center;'>" + T('STAT') + "</td></tr>";};
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIc["att_all"] + strMinX + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + $ls(tNinfo[0]) + "</td></tr>";
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIc["def_i"] + strMinX + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + $ls(tNinfo[1]) + "</td></tr>";
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIc["def_c"] + strMinX + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + $ls(tNinfo[2]) + "</td></tr>";
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIc["r5"] + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + $ls(tNinfo[3]) + "</td></tr>";
				if (bMin == true) iHTML += "<tr><td colspan='2' style='text-align:" + docDir[0] + "; font-size:8pt;'>" + strMinInfo + "</td></tr>";
			};
		};
		return iHTML;
	};

	function addTroopTimes() {
		//append the distance and time for the case the user opened a cell from the map
		if (TB36.xCrt != -1000 && TB36.yCrt != -1000 && TB36.O[57] == "1") {
			lastRowActions = $g('options');
			if (!lastRowActions) {
				idType = '@id';
				if (TB36.T36 == false) idType = '@class';
				lastRowActions = $xf("//div[" + idType + "='map_details_actions']");
			};
			if (lastRowActions) {
				createTimeTroopTable(lastRowActions, TB36.xCrt, TB36.yCrt, true);
				imgOasis = $xf("//img[starts-with(@class, 'w')] | //img[starts-with(@id, 'w')]");
				if (!imgOasis) imgOasis = $g("resfeld");
				if (imgOasis) {
					//we are probably inside an oasis
					if (TB36.T36 == true) {
						tNTroops = $xf("//div[@id='map_details_troops']//table");
						if (tNTroops) {tNTroopsS = tNTroops.childNodes[1];} else {tNTroops = $xf("//table[@id='troop_info']"); if (tNTroops) tNTroopsS = tNTroops.childNodes[3];};
					} else {
						tNTroops = $xf("//table[@class='f10']");
						if (tNTroops) tNTroopsS = tNTroops.childNodes[0];
					};
					if (tNTroopsS) {
						tNInfo = getTroopsAttDefInfoTable(tNTroopsS, false);
						if (tNInfo != '') {
							if (tNTroops.id && tNTroops.id == 'troop_info') {
								//tNTroops.innerHTML += tNInfo;
								var aTb = $t([['id', 'mhtt'], ['style', 'width:150px;']]);
								aTb.innerHTML = tNInfo;
								tNTroops.parentNode.appendChild(aTb);
							} else {
								tNInfoT = $t([['class', 'b'], ['style', 'width:100px; border:0px none white']]);
								tNInfoT.innerHTML = tNInfo;
								aPar = $e("P", "");
								aPar.appendChild(tNInfoT);
								tNTroops.parentNode.appendChild(aPar);
							};
						};
					};
				};
			};
		};
	};

	function showFieldInfoInTooltip(vID, fieldtype, anTb) {
		ttDiv = $g("tb_tooltip");
		if (!ttDiv) ttDiv = createTooltip();
		if (fieldtype != 0) {
			//a map cell or a village
			tmTableHTML = "";
			ttHTML = "<table id='mhtt'>";
			if (fieldtype) {
				//there are 12 types of cells
				dist = [[3, 3, 3, 9], [3, 4, 5, 6], [4, 4, 4, 6], [4, 5, 3, 6], [5, 3, 4, 6], [1, 1, 1, 15], [4, 4, 3, 7], [3, 4, 4, 7], [4, 3, 4, 7], [3, 5, 4, 6], [4, 3, 5, 6], [5, 4, 3, 6]];
				info = dist[fieldtype-1];
				ttHTML += "<tr><td colspan='2'>";
				for (var i = 1; i < 5; i++) {ttHTML += gIc["r" + i] + " " + info[i-1] + ' ';};
				ttHTML += "</td></tr><tr><td>&nbsp;</td></tr>";
			};
			if (TB36.O[57] == "1") tmTableHTML = getTroopMerchantTooltipHTML(vID, false, true, true, false, false);
			ttDiv.innerHTML = ttHTML + tmTableHTML + "</table>";
		} else {
			//an oasis
			ttHTML = getTroopsAttDefInfoTable(anTb, true);
			if (TB36.O[57] == "1") ttHTML += "<tr><td>&nbsp;</td></tr>";
			ttHTML = "<table id='mhtt'>" + ttHTML;
			ttHTML += getTroopMerchantTooltipHTML(vID, false, false, true, false, false) + "</table>";
			ttDiv.innerHTML = ttHTML;
		};
		ttDiv.style.display = 'block';
	};

	function createMapInfoObjV2(area, pos) {
		var mev = new Object();
		mev.area = area;
		mev.pos = pos;
		mev.timeout = 0;
		var fieldtype;
		mev.mouseOverEvent = function() {
			var strRegExp1 = false;
			var strRegExp2 = false;
			mev.area.removeAttribute("title");
			var crtPos = mev.area.href.match(/d=(\d+)/).pop();
			if (TB36.T36 == false) {
				mev.pict = $g("i_"+ area.id.substring(2)).src;
				if (mev.pict.match(/\/(d|t)\d*.gif$/)) strRegExp1 = true; else if (mev.pict.match(/\/(o)\d*.gif$/)) strRegExp2 = true;
				//all AJAX requests
				if (TB36.O[56] == '1')  {
					mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
				} else {
					if (strRegExp1 == true || strRegExp2 == true) showFieldInfoInTooltip(crtPos, null);
				};
			} else {
				if (TB36.O[56] == '1') {
					if (TB36.origMap == true) {
						//this is the case where the user just opened the map
						var kx = area.id.substring(2).split("_");
						var origFieldType = unsafeWindow.m_c;
						fieldtype = origFieldType.ad[kx[0]][kx[1]][2];
						if (fieldtype != 0) {
							//this is an empty cell or a village
							showCellInfo(mev.pos + 1, fieldtype);
							showFieldInfoInTooltip(crtPos, fieldtype);
						} else {
							//this is an oasis
							if (mev.area.href != '') mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout != 0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
						};
					} else {
						//use the map_infobox
						mapInfoBox = $g("map_infobox");
						if (mapInfoBox) {
							aRowContent = mapInfoBox.rows[0].textContent;
							if (aRowContent.indexOf(":") != -1 && aRowContent.indexOf("-")) {
								strType = aRowContent.split(": ");
								if (strType.length > 1) {
									fieldtype = showCellInfo(mev.pos + 1, strType[1]);
									showFieldInfoInTooltip(crtPos, fieldtype);
								};
							} else {
								//2nd alternative
								mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
							};
						} else {
							//2nd alternative
							mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
						};
					};
				} else {
					//show only distance and time
					showFieldInfoInTooltip(crtPos, null);
				};
			};
		};
		mev.mouseOutEvent = function() {clearTimeout(mev.timeout); mev.timeout = 0; hideTT(); };
		mev.scan = function() { ajaxRequest(mev.area.href, "GET", null, function(t) {processMapCell(t, mev, null);}, dummy); };
		return mev;
	};

	function showCellInfo(pos, aType) {
		if (typeof(aType) == 'string') {
			if (aType.indexOf("-") != -1) {
				switch(aType) {
					case "3-3-3-9":  aType = 1; break;
					case "3-4-5-6":  aType = 2; break;
					case "4-4-4-6":  aType = 3; break;
					case "4-5-3-6":  aType = 4; break;
					case "5-3-4-6":  aType = 5; break;
					case "1-1-1-15": aType = 6; break;
					case "4-4-3-7":  aType = 7; break;
					case "3-4-4-7":  aType = 8; break;
					case "4-3-4-7":  aType = 9; break;
					case "3-5-4-6":  aType = 10; break;
					case "4-3-5-6":  aType = 11; break;
					case "5-4-3-6":  aType = 12; break;
				};
			};
		};
		mcDiv = $g('map_info_' + pos);
		if (mcDiv) {
			if (aType < 13) {
				itext = ['', '&nbsp;9', gIc["r3"], '&nbsp;6', gIc["r2"], gIc["r1"], '15', '&nbsp;7', '&nbsp;7', '&nbsp;7', gIc["r2"], gIc["r3"], gIc["r1"]];
				if (TB36.T36 == false) itext = ['', '(9)', gIc["r3"], '(6)', gIc["r2"], gIc["r1"], '(15)', '(7)', '(7)', '(7)', gIc["r2"], gIc["r3"], gIc["r1"]];
				mcDiv.innerHTML = itext[aType];
				if (TB36.T36 == true) $at(mcDiv, [['style', "position:relative; height:16px; width:20px; " + docDir[0] + ":31px; top:45px; z-index:8000; border:1px solid #00C000; background-color:#FEFFE3; -moz-border-radius:10px;"]]);
			};
		};
		return aType;
	};

	function processMapCell(ajaxResp, mev, crtPos) {
		var fieldType;
		var ad = ajaxNDV2(ajaxResp);

		if (TB36.T36 == false) {
			aField = $xf("//img[@id='resfeld']", 'f', ad);
			if (aField) aField = aField.src.search(/\/w(\d+)\.jpg$/); else aField = $xf("//img[starts-with(@id, 'w')]", 'f', ad);

			if (aField) {
				//this is an oasis
				if (crtPos) {
					anTb = $xf("//table[@class='f10']", 'f', ad);
					if (anTb) anTb = anTb.childNodes[0]; //we need only the table not the body
					fieldType = 0;
					showFieldInfoInTooltip(crtPos, 0, anTb);
				};
			} else {
				aField = $xf("//div[starts-with(@id, 'f')]", 'f', ad);
				aField.id.search(/f(\d)/);
				fieldtype = RegExp.$1;
				//this is an empty cell or a village
				showCellInfo(mev.pos + 1, fieldtype);
				if (crtPos) showFieldInfoInTooltip(crtPos, fieldtype);
			};
		} else {
			imgID = $xf("//img[starts-with(@id, 'f')] | //img[starts-with(@class, 'f')]", 'f', ad);
			if (imgID) {
				//a cell or village
				fieldTypeC = imgID.getAttribute("class");
				if (!fieldTypeC) fieldType = imgID.getAttribute("alt"); else fieldType = parseInt(fieldTypeC.replace("f", ""));
				fieldtype = showCellInfo(mev.pos + 1, fieldType);
				if (crtPos) showFieldInfoInTooltip(crtPos, fieldtype);
			} else {
				//perhaps an oasis
				if (crtPos) {
					imgID = $xf("//img[starts-with(@id, 'w')] | //img[starts-with(@class, 'w')]", 'f', ad);
					if (imgID) {
						anTb = $xf("//div[@id='map_details_troops']//table", 'f', ad);
						if (anTb) {
							anTb = anTb.childNodes[1]; //we need only the table not the body
						} else {
							anTb = $xf("//table[@id='troop_info']", 'f', ad);
							if (anTb) anTb = anTb.childNodes[3];
						};
						showFieldInfoInTooltip(crtPos, 0, anTb);
						fieldType = 0;
					};
				};
			};
		};
		return fieldType;
	};

	function getTroopMerchantTooltipHTML(vID, addCoords, addMTime, addTTime, bAR, bDist) {
		var iHTML = "";
		xy = id2xy(vID);
		qDist = getDistance(xy[0], xy[1], actV.vx, actV.vy);
		//add dest coords
		if (bDist == true) {var xyRow = $r(); xyRow.appendChild($c("(" + xy[0] + "|" + xy[1] + ")", [['class', 'dec'], ['colspan', '2']])); iHTML = "<tr>" + xyRow.innerHTML + "</tr>";};
		//add the distance row
		strDist = '';
		aRow = $r();
		aCell = $c("", [['class', 'center']]);
		aCell.appendChild($img([['src', image["dist" + docDir[0].substr(0,1)]]]));
		aRow.appendChild(aCell);

		if (qDist != 0) {
			aRow.appendChild($c(qDist.toFixed(2), [['class', 'mCol']]));
			if (addCoords == true) strDist = "(" + actV.vx + "|" + actV.vy + ") " + "<img src= '" + image["dist" + docDir[0].substr(0,1)] + "'>" + " (" + xy[0] + "|" + xy[1] + ")";
			if (strDist != "") {
				c1Cell = $c("&nbsp;&nbsp;");
				cCell = $c(strDist, [['class', 'mCol'], ['colspan', bAR == true ? '5' : '1']]);
				aRow.appendChild(c1Cell);
				aRow.appendChild(cCell);
			};
			iHTML += "<tr>" + aRow.innerHTML + "</tr>";
		};
		if (strDist != '') strDist = "<td></td>";

		if (TB36.U[1] != '' && qDist != 0) {
			//var avRaceM = ['Romans', 'Teutons', 'Gauls'];
			switch (TB36.U[1]) {
				case avRace[0]: arrRaces = [avRace[1], avRace[2]]; break;
				case avRace[1]: arrRaces = [avRace[0], avRace[2]]; break;
				case avRace[2]: arrRaces = [avRace[0], avRace[1]]; break;
			};
			aColspan = '';
			aAlign = '';
			if (addTTime == true) {aColspan = "colspan='2' "; aAlign = "class='center' ";};
			clockCell = "<td " + aColspan + aAlign + gIc["clock"] + "</td> ";
			if (addTTime == true) {
				//add the clock row
				iHTML += "<tr>" + clockCell;
				clockCell = '';
				if (bAR == true) iHTML += "<td colspan='6'</td>";
				iHTML += "</tr>";
			};
			if (addMTime == true) {
				//add the merchant row
				aTime = getMTime(qDist, TB36.U[1]);
				aMalign = docDir[1];
				iHTML += "<tr>" + clockCell + "<td class='ld'>" + gIc["merchant"] + "</td><td class='mCol'> " + formatTime(aTime, 0) + " h</td>" + strDist;
				if (bAR == true) {
					aTime = getMTime(qDist, arrRaces[0]);
					iHTML += "<td class='ld'>" + gIc["merchant"] + "</td><td class='mCol'> " + formatTime(aTime, 0) + " h</td><td></td>";
					aTime = getMTime(qDist, arrRaces[1]);
					iHTML += "<td class='ld'>" + gIc["merchant"] + "</td><td class='mCol'> " + formatTime(aTime, 0) + " h</td>";
				};
				iHTML += "</tr>";
			};
			if (addTTime == true) {
				//add the troop rows
				var arX = getTroopsDetails(qDist, TB36.U[1], true);
				var arY = getTroopsDetails(qDist, arrRaces[0], false);
				var arZ = getTroopsDetails(qDist, arrRaces[1], false);
				for (var iTT = 0; iTT < 10; iTT++) {
					imgNo = iTT + arX[3];
					aTime = getTTime(iTT, TB36.U[1], arX);
					iHTML += "<tr><td class='ld'><img " + (TB36.T36 == true ? 'class="unit u' + imgNo + '" src="' + xGIF + '"' : "src='" + gIc["u" + imgNo] + "'") + "></td><td>" + "&nbsp;" + formatTime(aTime, 0) + " h</td>" + strDist;
					if (bAR == true) {
						imgNo = iTT + arY[3];
						aTime = getTTime(iTT, arrRaces[0], arY);
						iHTML += "<td class='ld'><img " + (TB36.T36 == true ? 'class="unit u' + imgNo + '" src="' + xGIF + '"' : "src='" + gIc["u" + imgNo] + "'") + "></td><td>" + "&nbsp;" + formatTime(aTime, 0) + " h</td><td>&nbsp;&nbsp;&nbsp</td>";
						imgNo = iTT + arZ[3];
						aTime = getTTime(iTT, arrRaces[1], arZ);
						iHTML += "<td class='ld'><img " + (TB36.T36 == true ? 'class="unit u' + imgNo + '" src="' + xGIF + '"' : "src='" + gIc["u" + imgNo] + "'") + "></td><td>" + "&nbsp;" + formatTime(aTime, 0) + " h</td>";
					};
					iHTML += "</tr>";
				};
			};
		};
		return iHTML;
	};

	//update tooltip position
	function updateTooltip(e){
		var ttD = $g("tb_tooltip");
		var x = (e.pageX + 8);
		var y = (e.pageY + 8);
		var dH = ttD.clientHeight;
		var dW = ttD.clientWidth;
		ttD.style.left = x + "px";
		if (y + dH > TB36.wH) y = y - dH;
		if (crtPage.match(/karte.php/) && y < 180) {x = 700; if (y < 180) y = 180;};
		ttD.style.top = y + "px";
		if (docDir[0] == 'left') {if (x + dW > TB36.wW) x = x - dW;} else if (x < 0) x = 5;
		ttD.style.left = x + "px";
	};

	// Map functions
	function mapFunctions() {
		aTimeOut = getRndTime(1800);
		allArrows = $xf("//area[starts-with(@id, 'ma_n')]", 'l');
		for (var xi = 0; xi < allArrows.snapshotLength; xi++) {if (TB36.origMap == true) allArrows.snapshotItem(xi).addEventListener('click', reloadMapFunctions, false);};

		if (!$g("tb_tooltip")) createTooltip();
		mapcontent = $g('map_content');
		areas = $xf("//map//area[@shape='poly' and (@coords)]", 'l', mapcontent);

		//the village/player/oasis table needs a delay because maps are loaded via AJAX requests
		setTimeout(genMapTable, aTimeOut);
		//recompute the title of the browser because of clicking the arrows
		setTimeout(getCrtLocation, aTimeOut);
		addMapScanLink();
		document.addEventListener("mousemove", updateTooltip, 0);
		installMapEventHandler();

		function installMapEventHandler() {
			for (var i = 1; i < 50; i++) {
				var k1 = (i - 1) % 7;
				var k2 = Math.floor((49 - i) / 7);
				var area = $g("a_" + k1 + "_" + k2);
				var mevobj = createMapInfoObjV2(area, i - 1);
				if (TB36.origMap == true) {area.addEventListener("mouseover", mevobj.mouseOverEvent, false); area.addEventListener("mouseout",  mevobj.mouseOutEvent, false);};
			};
		};

		//the functions needed for the map
		function mapScan() {
			j = 0;
			for (var i = 1; i < 50; i++) {
				if ($g('map_info_' + i).innerHTML == '') {
					k1 = (i - 1) % 7; k2 = Math.floor((49-i)/7);
					if ($g("i_" + k1 + "_" + k2).src.match(/\/(d|t)\d*.gif$/)) {area = $g("a_" + k1 + "_" + k2); mevobj = createMapInfoObjV2(area, i-1); setTimeout(mevobj.scan, j * 600 + getRndTime(600)); j++;};
				};
			};
		};

		function addMapScanLink() {
			removeElement($g('map_opts'));
			if (TB36.O[56] == '1' && TB36.T36 == false) {
				//create the "Scan the Map" link
				b = $xf("//form[@method='post']").parentNode;
				ctable = $t([["id", "map_opts"]]);
				ctbody = $e("TBODY");
				var aMS = $a(T('MAPSCAN'), [['id', 'mapscan'], ['href', jsVoid]]);
				aMS.addEventListener("click", mapScan, 0);
				trc = $r();
				tdc = $c("", [["colspan", '2']]);
				tdc.appendChild(aMS);
				trc.appendChild(tdc);
				ctbody.appendChild(trc);
				ctable.appendChild(ctbody);
				b.appendChild(ctable);
			};
		};

		//generate the table on the "karte.php" page
		function genMapTable(){
			if (areas.snapshotLength > 0 && TB36.O[56] == '1') genMapCellInfoDivs();
			//select the correct images and link titles for the reinf/attack icons

			if (TB36.O[58] != '1') return;
			var dRPA = getRPDefAction();
			removeElement($g('mapTableTT'));
			var aTb = $t([['id', 'mapTable'], ['sortCol', -1]]);
			var thead = $e("THEAD");
			var tbody = $e("TBODY");
			var aRow = $r();
			var cL = ['PLAYER', '8', 'ALDEAS', 'POPULATION', 'COORDS', 'MAPTBACTS'];
			var aTd;
			for (var i = 0; i < cL.length; i++){
				if (i < 4) {
					aTd = $c(T(cL[i]) + " (<img src='" + image["adn"] + "' width='8px' style='cursor:pointer;'><img src='" + image["aup"] + "' width='8px' style='cursor:pointer'>)", [['title', T('CKSORT')], ['class', 'tb3mthcp']]);
					switch(i){case 3: aTd.addEventListener("click", sortTable('mapTable', i, 'int'), 0); break; default: aTd.addEventListener("click", sortTable('mapTable', i), 0);};
				} else aTd = $c(T(cL[i]));
				aRow.appendChild(aTd);
			};
			thead.appendChild(aRow);
			aTb.appendChild(thead);
			var boolMapTable = false;
			var anArea;
			var aClass;
			for (var i = 0; i < 7; i++) {
				for (var j = 0; j < 7; j++) {
					anArea = $g('a_' + i + '_' + j).wrappedJSObject;
					var cInfo = anArea.details;
					if (cInfo && cInfo.name) {
						boolMapTable = true;
						var iRow = $r();
						var aName = cInfo.name;
						var vID = xy2id(cInfo.x, cInfo.y);
						aClass = '';
						if (aName == TB36.U[0]) aClass = 'tb3mtcu';
						iRow.appendChild($c(aName, [['class', aClass]]));
						iRow.appendChild($c(cInfo.ally));
						if (TB36.T36 == false) aHref = anArea.href; else aHref = "karte.php?" + cInfo.querystring;
						iRow.appendChild($c('<a href="' + aHref + '">' + cInfo.dname + '</a>'));
						iRow.appendChild($c(cInfo.ew, [['class', 'tb3mtcp']]));
						iRow.appendChild($c('<a href="' + aHref + '">' + cInfo.x + " | " + cInfo.y + '</a>'));
						iRow.appendChild($c('<a href="a2b.php?z=' + vID + '">' + gIc[dRPA] + '</a>' + '  ' + '<a href="build.php?z=' + vID + '&gid=17">' + gIc["r41"] + '</a>'));
						tbody.appendChild(iRow);
					};
				};
			};
			aTb.appendChild(tbody);
			if (boolMapTable == true) {
				var dxy = TB36.O[90].split("|");
				var drUpg = $df(parseInt(aTb.width), dxy[0], dxy[1], " ", 'mapTable', "mapTableTT", false);
				drUpg.appendChild(aTb);
				adjustFloatDiv(aTb, 682, 'mapTable');
			};
		};

		function genMapCellInfoDivs() {
			var mapinfoX = $g("map_info");
			if (mapinfoX) {
				removeElement(mapinfoX);//remove the big DIV
			} else {
				for (var i = 1; i < 50; i++) {removeElement($g('map_info_' + i));};//remove all the small DIVs
			};
			if (TB36.T36 == false) {var mapinfo = $d("", [['id', 'map_info']]);};

			for(var i = 1; i < 50; i++){
				if (TB36.T36 == false) {
					var divsX = $d("", [['id', 'map_info_' + i], ['class', 'mt' + i], ['style', 'position:relative; left:31px; top:54px; z-index:90; border:1px solid #00C000; background-color:#FFFFCC; -moz-border-radius:10px;']]);
					var divs = $d("", [['class', 'mt' + i], ['style', 'z-index:2;']]);
					divs.appendChild(divsX);
					mapinfo.appendChild(divs);
				} else {
					var divs = $d("", [['id', 'map_info_' + i], ['style', 'position:relative; height:1px; width:1px; ' + docDir[0] +':31px; top:45px; z-index:90; border:1px solid #00C000; background-color:#FFFFCC; -moz-border-radius:10px']]);
					var k1 = (i - 1) % 7;
					var k2 = Math.floor((49-i)/7);
					var mapCell = $g("i_" + k1 + "_" + k2);
					mapCell.appendChild(divs);
				};
			};
			if (TB36.T36 == false) {
				var iniCell = $g("a_0_6");
				if (iniCell) iniCell.parentNode.appendChild(mapinfo);
			};
		};
	};

	function marketSell(){
		//global/local option provided by Zippo.
		marketSellMinMax();
		if (!$xf("//input[@type='hidden' and @name='t' and @value='2']")) return;
		$xf("//form").setAttribute("name", "sell");
		var aX = $xf("//input[@type='image' and @name='s1']");
		aX.addEventListener("click", function(){
			var soff = $g('soff');
			var soffG = $g('soffG');
			var bSOf = true;
			var bSOfG = true;
			if (soff && soff.checked == false) bSOf = false;
			if (soffG && soffG.checked == false) bSOfG = false;
			if (bSOf == true) {
				param = ["m1", "m2", "rid1", "rid2", "d2"];
				checks = ["d1", "ally"];
				values = new Array();
				for (var i = 0; i < param.length; i++) eval("values[" + i + "] = $xf(\"//*[@name='" + param[i] + "']\").value");
				for (var i = 0; i < checks.length; i++){
					try {
						eval("var b = $xf(\"//*[@name='" + checks[i] + "']\").checked");
						if (b == true) values[i + param.length] = '1'; else values[i + param.length] = '0';
					} catch(e) {};
				};
				if (bSOfG == false) values[7] = actV.vID;
				addGMcookieValue("ventas", values, false);
			}
		}, 0);

		//get offers string
		strOffers = getGMcookie("ventas", false);
		if (strOffers == "false") {
			setGMcookie("ventas", '', false);
			strOffers = '';
		};

		ventas = new Array();
		if (strOffers != ''){
			strOffers = strOffers.split("$$");
			j = 0;
			for (var i = 0; i < strOffers.length; i++) {
				strVillage = strOffers[i].split("$")[7];
				if (strVillage == actV.vID || strVillage == undefined ) {
					ventas[j] = strOffers[i].split("$");
					ventas[j][8] = i;
					j++;
				};
			};
		};

		if (ventas.length > 0){
			var aTb = $t([["id", "soff"]]);
			var aR = $r();
			var arH = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('8'), T('SELL'), T('DEL')];
			for (var i = 0; i < arH.length; i++) aR.appendChild($c(arH[i], [['class', 'soffhh']]));
			aTb.appendChild(aR);
			var bR, aC;
			for (var i = 0; i < ventas.length; i++){
				bR = $r();
				bR.appendChild($c(gIc["r" + (ventas[i][2])] + ' ' + ventas[i][0]));
				bR.appendChild($c(gIc["r" + (ventas[i][3])] + ' ' + ventas[i][1]));
				bR.appendChild($c(ventas[i][5] == '1' ? ventas[i][4] : T('NO'), [['class', 'soffc']]));
				bR.appendChild($c(ventas[i][6] == '1' ? T('YES') : T('NO'), [['class', 'soffc']]));
				var sally = '';
				if ($xf("//*[@name='ally']")) sally = '; sell.ally.checked=' + (ventas[i][6] == '1');
				bR.appendChild($c('<a href=' + jsVoid + ' onClick = "sell.m1.value=' + ventas[i][0] + '; sell.m2.value=' + ventas[i][1] + '; sell.rid1.value=' + ventas[i][2] + '; sell.rid2.value=' + ventas[i][3] + '; sell.d2.value=' + ventas[i][4] + '; sell.d1.checked=' + (ventas[i][5] == '1') + sally + '; sell.submit();"><img src="' + image["bOK"] + '" title="' + T('SELL') + '" alt="' + T('SELL') + '"></a>', [['class', 'soffc']]));

				aL = $a(gIc["del"], [['href', jsVoid]]);
				aL.addEventListener("click", removeGMcookieValue("ventas", ventas[i][8] , true, marketSell, false), 0);
				aC = $c("", [['class', 'soffc']]);
				aC.appendChild(aL);
				bR.appendChild(aC);
				aTb.appendChild(bR);
			};
			
			aPar = $e("P", "");
			aPar.appendChild(aTb);
			insertAfter(aX, aPar);
		};
	};

	function getdorf3SelectedVinfo(ad) {
		// newdid of the village
		vID = 0;
		retValue = [-1000, -1000];
		try {
			if (TB36.T36 == false) {
				avLink = $xf("//a[@class='active_vl']", 'f', ad);
				newdid = getNewdidFromLink(avLink.href);
				aX = $xf('//a[@class="active_vl"]/../../td/table/tbody/tr/td', 'f', ad);
				if (aX) {
					X = parseInt(aX.innerHTML.replace("(", ""));
					aY = $xf('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]', ad);
					if (aY) {Y = parseInt(aY.innerHTML.replace(")", ""));vID = xy2id(X, Y);};
				};
			} else {
				if (TB36.M35 == 2) {
					aV = $xf("//td[@class='dot hl']", 'f', ad);
					var tr = aV.parentNode;
					if (tr.cells.length > 3) {
						vx = tr.cells[2].textContent.replace("(", "");
						vy = tr.cells[4].textContent.replace(")", "");				
						newdid = getNewdidFromLink(tr.cells[1].firstChild.href);
					} else {
						var tmpC = tr.cells[2].textContent.replace("(", "").replace(")", "").split("|");
						vx = parseInt(tmpC[0]);
						vy = parseInt(tmpC[1]);
						newdid = getNewdidFromLink(tr.cells[1].firstChild.href);
					};
				} else if (TB36.M35 == 1) {
					aV = $xf("//div[@id='vlist']//table[@class='vlist']//tr[@class='sel']//a", 'f', ad);
					vx = aV.parentNode.parentNode.cells[2].textContent.replace("(", "");
					vy = aV.parentNode.parentNode.cells[4].textContent.replace(")", "");
					newdid = getNewdidFromLink(aV.href);
				};
				vID = xy2id(vx, vy);
			};
		} catch(e) {newdid = actV.vNewdid; vID = actV.vID;};
		retValue[0] = vID;
		retValue[1] = newdid;
		return retValue;
	};

	function processVillage11() {
		var cBiP = getGMcookieV2("BiP");
		var cTM = getGMcookieV2("TroopMovements");
		var arrBiP = null;
		var arrTM = null;

		var crtDate = new Date();
		var crtTime = crtDate.getTime();

		for (var i = 0; i < vList.length; i++) {
			var vNewdid = vList[i].vNewdid;
			if (cBiP && cBiP[vNewdid] != undefined) arrBiP = cBiP[vNewdid]; else arrBiP = null;
			if (cTM && cTM[vNewdid] != undefined) arrTM = cTM[vNewdid]; else arrTM = null;
			var aCell = $xf("//td[@id='aldea" + vNewdid + "_1_3" + "']");
			if (arrBiP != null) {
				var b = new Array();
				b[0] = '-';
				var xi = 0;
				for (var j = 0; j < arrBiP.length; j++) {
					var bipT = arrBiP[j].endTime;
					if (bipT > crtTime) {b[xi] = "<img src='" + gIc["bau"] +  "' title='" + arrBiP[j].name + " " +arrBiP[j].txtLvl + " - " + formatTime((bipT - crtTime) / 1000, 0) + "'>"; xi += 1;};
				};
				aCell.innerHTML = b.join(" ");
			} else aCell.innerHTML = '-';
			var aCell = $xf("//td[@id='aldea" + vNewdid + "_1_2" + "']");
			if (arrTM != null) {
				var c = new Array();
				c[0] = '-';
				var yi = 0;
				for (var j = 0; j < arrTM.length; j++) {
					var atT = arrTM[j].fT;
					if (atT > crtTime) {
						var xImg;
						if (TB36.T36 == false) xImg = '<img src="' + img("a/" + arrTM[j].type) + '" height="12px" width="12px">'; else xImg = gIc[arrTM[j].type];
						c[yi] = '<a href="build.php?newdid=' + vNewdid + '&gid=16" title="' + arrTM[j].no + ' - ' + formatTime((atT - crtTime) / 1000, 0) + '">' + xImg + "</a>";
						yi += 1;
					};
				};
				aCell.innerHTML = c.join(" ");
			} else aCell.innerHTML = '-';
		};
	};

	function processVillage119(ajaxResp) {
		var ad = ajaxNDV2(ajaxResp);
		var newdid = getdorf3SelectedVinfo(ad)[1];
		//Baracks,Big barracks,Stable,BigStable,Workshop,Residence/Palace troops training
		var a = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='5%']", 'f', ad);
		if (a){
			var aCell = $xf("//td[@id='aldea" + newdid + "_1_4" + "']");
			var aTb = a.parentNode.parentNode;
			//var troopTraining = getTroopTrainingArray(aTb); needs rework

			var iHTML = aCell.innerHTML;
			if (iHTML == "-") iHTML = "";
			var gid = "false";
			for (var xi = 0; xi < troopTraining.length; xi++) {
				if (troopTraining[xi][0] > 0) {
					imgNo = xi + TB36.U[7];
					imgName = "src='" + gIc["u" + imgNo] + "'";
					if (TB36.T36 != false) imgName = 'class="unit u' + imgNo + '" src="' + xGIF + '"';
					if (gid != "" && gid != "false") {
						iHTML += "<a href='build.php?newdid=" + newdid + "&gid=" + gid + "'><img " + imgName + " title='" + troopTraining[xi][0] + "' alt='" + troopTraining[xi][1] + "'> ";
					} else {
						iHTML += "<img " + imgName + " title='" + troopTraining[xi][0] + "' alt='" + troopTraining[xi][1] + "'> ";
					};
				};
			};
			aCell.innerHTML = iHTML;
		};
	};

	function processVillage2() {
		//Resources
		var tPpH = [0, 0, 0, 0, 0];
		var tPpHc = 0;
		var bgC = 'white';
		var txC = 'black';
		var pr = 0;

		for (var i = 0; i < vList.length; i++) {
			if (TB36.VillageRes[vList[i].vID]) {
				for (var yi = 6; yi < 10; yi++) {
					var iX = TB36.VillageRes[vList[i].vID][yi];
					tPpH[yi - 6] += iX;
					var aCell = $xf("//td[@id='aldea" + vList[i].vNewdid + "_2_" + (yi - 4) + "']");
					if (aCell) {
						aCell.innerHTML = $ls(iX);
						//background color reintroduced by suggestion of PRO$TI
						pr = Math.ceil(iX / TB36.VillageRes[vList[i].vID][yi + 4] * 100);
						bgC = getColorResBarTooltip(pr);
						txC = ((pr > 60 && pr < 90) ? 'black' : TB36.DFc[1]);
						$at(aCell, [['style', 'background-color:' + bgC + '; font-size:8pt; text-align:' + docDir[1] + '; color:' + txC + '; ']]);
					};
				};
				tPpHc += TB36.VillageRes[vList[i].vID][4];
				var bCell = $xf("//td[@id='aldea" + vList[i].vNewdid + "_2_6" + "']");
				var aVal = TB36.VillageRes[vList[i].vID][4];
				bCell.innerHTML = $ls(aVal);
				var strColor = "black";
				if (aVal < 0) strColor = "red";
				$at(bCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + '; color:' + strColor + ' !important;']]);
			};
		};

		for (var i = 0; i < 4; i++) {var aCell = $xf("//td[@id='aldea_s_2_" + (i + 2) + "']"); aCell.innerHTML = $ls(tPpH[i]); $at(aCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + ';']]);};
		var sCell = $xf("//td[@id='aldea_s_2_6" + "']");
		sCell.innerHTML = $ls(tPpHc);
		$at(sCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + ';']]);
	};

	function processVillage3() {
		//Resources
		for (var i = 0; i < vList.length; i++) {
			var ttFillG;
			var ttFillW = Infinity;
			var ttTemp;
			if (TB36.VillageRes[vList[i].vID]) {
				for (var yi = 6; yi < 10; yi++) {
					var cellNo = yi - 4;
					if (yi == 9) {
						cellNo = 6;
						var cropPerSec = TB36.VillageRes[vList[i].vID][4] / 3600;
						if (cropPerSec > 0 ) ttFillG = (TB36.VillageRes[vList[i].vID][yi + 4] - TB36.VillageRes[vList[i].vID][yi]) / (cropPerSec); else ttFillG = - (TB36.VillageRes[vList[i].vID][yi] / cropPerSec);
					} else {
						var ppS = TB36.VillageRes[vList[i].vID][yi - 5] / 3600;
						ttTemp = (TB36.VillageRes[vList[i].vID][yi + 4] - TB36.VillageRes[vList[i].vID][yi]) / (ppS);
						if (ttTemp < ttFillW) ttFillW = ttTemp;
					};
					var aCell = $xf("//td[@id='aldea" + vList[i].vNewdid + "_3_" + cellNo + "']");
					aCell.innerHTML = Math.round((TB36.VillageRes[vList[i].vID][yi] / TB36.VillageRes[vList[i].vID][yi + 4]) * 100) + " %";
					$at(aCell, [['style', 'font-size:10pt; text-align:' + docDir[1] + ';']]);
				};
				//time to empty/fill the warehouse
				var bCell = $xf("//td[@id='aldea" + vList[i].vNewdid + "_3_5" + "']");
				bCell.innerHTML = formatTime(ttFillW, 0);
				if (ttFillW < 7200) $at(bCell, [['style', 'color:red']]);
				$at(bCell, [['id', 'timeouta']]);
				//time to empty/fill granary
				var cCell = $xf("//td[@id='aldea" + vList[i].vNewdid + "_3_7" + "']");
				cCell.innerHTML = formatTime(ttFillG, 0);
				if (ttFillG < 7200 || cropPerSec < 0) $at(cCell, [['style', 'color:red']]);
				$at(cCell, [['id', 'timeouta']]);
			};
		};
	};

	function processVillage42(ajaxResp){
		var ad = ajaxNDV2(ajaxResp);
		var newdid = getdorf3SelectedVinfo(ad)[1];
		var a = $xf("//div[@id='" + dmid2 + "']//b", 'l', ad);
		var cpi = 0;
		var cpt = 0;
		if (a && a.snapshotLength > 0) {var intAdd = (TB36.T36 == false ? 1 : 0); cpi = a.snapshotItem(intAdd).textContent; cpt = a.snapshotItem(intAdd + 1).textContent;};
		var aCell = $xf("//td[@id='aldea" + newdid + "_4_2" + "']");
		aCell.innerHTML = cpi;
		aCell = $xf("//td[@id='aldea_s_4_2']");
		aCell.innerHTML = cpt;
		updD3Bullets(newdid, 2);
	};

	//function provided by MarioCheng for checking the Townhall and the parties thrown.
	function processVillage43(ajaxResp){
		var ad = ajaxNDV2(ajaxResp);
		var newdid = getdorf3SelectedVinfo(ad)[1];
		var lvl = 0;
		var bTitle = $xf("//div[@id='" + dmid2 + "']//h1", 'f', ad);
		if (bTitle) {var aLvl = bTitle.textContent.split(" "); for (i = 0; i < aLvl.length; i++) {if (!isNaN(parseInt(aLvl[i]))) lvl = parseInt(aLvl[i]);};};
		var aCell = $xf("//td[@id='aldea" + newdid + "_4_3" + "']");
		var showLvl = "Lvl " + lvl;
		var partyTime = "";
		var a = $xf("//td[@width='25%']//span[@id='timer1'] | //table[@class='under_progress']//span[@id='timer1']", 'f', ad);
		if (a) {
			partyTime = a.textContent;
			aCell.innerHTML = "<span id='timeouta' title='" + showLvl + "'>" + partyTime + "</span>";
			aCell.innerHTML = "<a id='timeouta' title = '" + showLvl + "' href='build.php?newdid=" + newdid + "&gid=24'>" + partyTime + "</a>";
		} else {if (lvl > 0) {partyTime = "•"; aCell.innerHTML = "<a href='build.php?newdid=" + newdid + "&gid=24' title='" + showLvl + "'>" + partyTime + "</a>";};};
		updD3Bullets(newdid, 2);
	};

	function processVillage44(ajaxResp) {
		//get available senators/chiefs/settlers
		var ad = ajaxNDV2(ajaxResp);
		var vInfo = getdorf3SelectedVinfo(ad);
		var villageID = vInfo[0];
		var newdid = vInfo[1];

		if (villageID != 0) {
			var allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='troop_details']//a[contains(@href, " + villageID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r', ad);
			if (allTables) {
				var aCell = $g('aldea' + newdid + '_4_4');
				aCell.innerHTML = "";
				var aValue;
				//loop through all table of troops
				for (i = 0; i < allTables.snapshotLength; i++) {
					var aTb = allTables.snapshotItem(i);
					if (aTb.nodeName == "P") break;
					var allTroopCells = aTb.rows[2].cells;
					aValue = toNumber(allTroopCells[9].innerHTML);
					if (aValue != 0) {
						//senators, chiefs, etc.
						for (var xi = 1; xi < aValue + 1; xi++) {
							var aImg = aTb.rows[1].cells[9].firstChild;
							var dImg = aImg.cloneNode(true);
							aCell.appendChild(dImg);
							aCell.innerHTML += " ";
						};
					};
					aValue = toNumber(allTroopCells[10].innerHTML);
					if (aValue != 0) {
						//settlers
						for (var xi = 1; xi < aValue + 1; xi++) {
							var aImg = aTb.rows[1].cells[10].firstChild;
							var dImg = aImg.cloneNode(true);
							aCell.appendChild(dImg);
							aCell.innerHTML += " ";
						};
					};
				};
				if (aCell.innerHTML == "") aCell.innerHTML = "-";
			};
		};
		updD3Bullets(newdid, 2);
	};

	function processVillage45(ajaxResp){
		var ad = ajaxNDV2(ajaxResp);
		var newdid = getdorf3SelectedVinfo(ad)[1];
		var lvl = 0;
		var maxSlots = 0;
		var bTitle = $xf("//div[@id='" + dmid2 + "']//h1", 'f', ad);
		if (bTitle) {var aLvl = bTitle.textContent.split(" "); lvl = parseInt(aLvl[aLvl.length - 1]);};
		var cpbuilding = 0;
		var ocSlots = 0;
		if (lvl != 0) {var spBcookie = getGMcookieV2("specBuildings"); if (spBcookie && spBcookie[newdid]) cpbuilding = spBcookie[newdid][0];};

		var maxSlots = 0;
		maxSlots = (cpbuilding == 26)?((lvl==20)?3:(lvl>=15)?2:(lvl>=10)?1:0):(lvl==20)?2:(lvl>=10)?1:0;

		var expTable = $xf("//div[@id='" + dmid2 + "']//table[@id='expansion'] | //div[@id='" + dmid2 + "']//table[@class='tbg']", 'f', ad);
		if (expTable) {
			var intRows = expTable.rows.length;
			var lrtd = expTable.rows[intRows-1].cells[0];
			var aColspan;
			ocSlots = intRows - 2;
			if (lrtd) aColspan = lrtd.getAttribute("colspan");
			if (aColspan) ocSlots = ocSlots - 1;
		};

		var slots = "" + ocSlots + "/" + maxSlots;

		var aCell = $xf("//td[@id='aldea" + newdid + "_4_5" + "']");
		var oldSlots = aCell.innerHTML;
		if (oldSlots != "-") oldSlots = oldSlots.split("/"); else oldSlots = ["0", "0"];

		aCell.innerHTML = slots;
		var sumCell = $xf("//td[@id='aldea_s_4_5']");
		if (sumCell) {
			var sumCellValue = sumCell.innerHTML.replace(",", "").replace(".", "").replace(" ", "").replace("&nbsp;", "");
			if (sumCellValue == "-") {sumCell.innerHTML = slots;} else {sumCell.innerHTML = (parseInt(sumCellValue.split("/")[0]) + ocSlots - parseInt(oldSlots[0])) + "/" + (parseInt(sumCellValue.split("/")[1]) + maxSlots - parseInt(oldSlots[1]));};
		};

		updD3Bullets(newdid, 2);
	};

	function processVillage5() {
		//Available troops
		var infoX = getGMcookieV2("Troops");
		var arrTT;
		var sumTT = [0,0,0,0,0,0,0,0,0,0,0];

		for (var i = 0; i < vList.length; i++) {
			var vNewdid = vList[i].vNewdid;
			if (infoX && infoX[vNewdid] != undefined) arrTT = infoX[vNewdid]; else arrTT = null;
			if (arrTT) {
				for (var j = 0; j < arrTT.length; j++) {
					var aCell = $xf("//td[@id='aldea" + vNewdid + "_5_" + (j + 2) + "']");
					if (arrTT[j] != 0) {aCell.innerHTML = arrTT[j];	$at(aCell, [['style', 'font-size:8pt; color:black; text-align:center;']]);} else {aCell.innerHTML = "-"; $at(aCell, [['style', 'color:lightgrey; text-align:center;']]);};
					sumTT[j] += arrTT[j];
				};
			};
		};
		//sum of the troops
		for (var i = 2; i < 13; i++) {
			var aCell = $xf("//td[@id='aldea_s_5_" + i + "']");
			if (sumTT[i - 2] != 0) {aCell.innerHTML = sumTT[i - 2]; $at(aCell, [['style', 'font-size:8pt; color:black; text-align:center;']]);} else {aCell.innerHTML = "-"; $at(aCell, [['style', 'color:lightgrey; text-align:center;']]);};
		};
	};


	function refreshVillageV2(newdid, xi){
		return function(){
			updD3Bullets(newdid, 3);
			var specBcookie = getGMcookieV2("specBuildings");
			var d3specBuildings;
			if (specBcookie && specBcookie[newdid]) d3specBuildings = specBcookie[newdid];
			if (xi == 1) {
				//buildings and attacks in progress
				//fix provided by MarioCheng
				var aCell = $xf("//td[@id='aldea" + newdid + "_1_4" + "']");
				aCell.innerHTML = "-";
				//end fix
				ajaxRequest("dorf1.php?newdid=" + newdid, "GET", null, processVillage11, updD3Bullets(newdid, 4));

				var updTroopsTraining = $g("d3Upd_1_3");
				var boolUpdTroopsTraining = false;
				if (updTroopsTraining) boolUpdTroopsTraining = updTroopsTraining.checked;

				if (boolUpdTroopsTraining) {
					//troops in training in the barracks
					var isAvBarracks = d3specBuildings[1];
					if (isAvBarracks != 0) ajaxRequest("build.php?newdid=" + newdid + "&gid=" + isAvBarracks, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					//troops in training in the big barracks
					var isAvBigBarracks = d3specBuildings[2];
					if (isAvBigBarracks != 0) ajaxRequest("build.php?newdid=" + newdid + "&gid=" + isAvBigBarracks, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					//troops in training in the stable
					var isAvStable = d3specBuildings[4];
					if (isAvStable != 0) ajaxRequest("build.php?newdid=" + newdid[i] + "&gid=" + isAvStable, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					//troops in training in the big stable
					var isAvBigStable = d3specBuildings[5];
					if (isAvBigStable != 0) ajaxRequest("build.php?newdid=" + newdid + "&gid=" + isAvBigStable, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					//troops in training in the workshop
					var isAvWorkshop = d3specBuildings[3];
					if (isAvWorkshop != 0) ajaxRequest("build.php?newdid=" + newdid[i] + "&gid=" + isAvWorkshop, "GET", null, processVillage119, updD3Bullets(newdid, 4));
					//troops in training in the residence/palace
					var cpbuilding = d3specBuildings[0];
					if (cpbuilding != 0) ajaxRequest("build.php?newdid=" + newdid + "&gid=" + cpbuilding, "GET", null, processVillage119, updD3Bullets(newdid, 4));
				};
				//cannot get the correct request and table as no residence/palace level 10 available in test accounts
			} else if (xi == 2) {
				ajaxRequest("dorf1.php?newdid=" + newdid, "GET", null, processVillage2, updD3Bullets(newdid, 4));
			} else if (xi == 3) {
				ajaxRequest("dorf1.php?newdid=" + newdid, "GET", null, processVillage3, updD3Bullets(newdid, 4));
			} else if (xi == 4) {
				var cpbuilding = d3specBuildings[0];
				if (cpbuilding != 0) {
					var updPCperDay = $g("d3Upd_4_2");
					var boolupdPCperDay = false;
					if (updPCperDay) boolupdPCperDay = updPCperDay.checked;
					var updSlots = $g("d3Upd_4_5");
					var boolupdSlots = false;
					if (updSlots) boolupdSlots = updSlots.checked;
					var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + cpbuilding;
					if (boolupdPCperDay == true) ajaxRequest(pgAjaxRequest + "&s=2", "GET", null, processVillage42, updD3Bullets(newdid, 4));
					if (boolupdSlots == true) ajaxRequest(pgAjaxRequest + "&s=4", "GET", null, processVillage45, updD3Bullets(newdid, 4));
				} else {
					updD3Bullets(newdid, 5);
					var aCell = $xf("//td[@id='aldea" + newdid + "_4_5" + "']");
					aCell.innerHTML = "0/0";
				};

				//parties thrown in the village
				updParty = $g("d3Upd_4_3");
				boolupdParty = false;
				if (updParty) boolupdParty = updParty.checked;
				if (boolupdParty == true && d3specBuildings[7] != 0) ajaxRequest("build.php?newdid=" + newdid + "&gid=24", "GET", null, processVillage43, updD3Bullets(newdid, 4));
				updSenSettlers = $g("d3Upd_4_4");
				boolupdSenSettlers = false;
				if (updSenSettlers) boolupdSenSettlers = updSenSettlers.checked;
				if (boolupdSenSettlers == true) {ajaxRequest("build.php?newdid=" + newdid + "&gid=16&j&k", "GET", null, processVillage44, updD3Bullets(newdid, 4));};//available senators/chiefs/settlers

			} else if (xi == 5) ajaxRequest("build.php?newdid=" + newdid + "&gid=16&j&k", "GET", null, processVillage5, updD3Bullets(newdid, 4));//add "&j&k" => MarioCheng
		};
	};

	function crD35Tb(newPar, topRowText, secRowText) {
		delD3Tb();
		var aTb = $t([['id', 'dorf3table']]);
		var trTop = $r([["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(5);
		trTop.appendChild(updAllCell);

		var tdTop = $c(topRowText[4], [['class', 'tb3chnb'], ["colspan", "11"], ['style', 'font-weight:bold;']]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);
		var trTop2 = $r([['class', 'tb3rh']]);
		var tdTop2 = $c(secRowText[0], [['class', 'tb3chnb'], ['style', 'width:150px;']]);
		trTop2.appendChild(tdTop2);

		for (xi = 0; xi < 10; xi++) {
			var tdTop2 = $c("-", [["class", "c"]]);
			if (TB36.U[1] != '') {var imgName = TB36.T36 == false ? "src='" + gIc["u" + (xi + TB36.U[7])] + "'" : 'class="unit u' + (xi + TB36.U[7]) + '" src="' + xGIF + '"'; tdTop2 = $c("<img " + imgName + ">", [['class', 'tb3chnb']]);};
			trTop2.appendChild(tdTop2);
		};
		var tdTopHero = $c(gIc["hero"], [['class', 'tb3chnb']]);
		trTop2.appendChild(tdTopHero);
		aTb.appendChild(trTop2);
		rowsDorf3(aTb, 11, 5);
		sumRowDorf3(aTb, 11, 5);
		if (newPar) insertAfter(newPar, aTb);
		processVillage5();
	};

	function crD34Tb(newPar, topRowText, secRowText) {
		delD3Tb();
		var aTb = $t([['id', 'dorf3table']]);
		var trTop = $r([["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(4);
		trTop.appendChild(updAllCell);
		var tdTop = $c(topRowText[3], [['class', 'tb3chnb'], ["colspan", "4"], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);

		var trTop2 = $r();
		for (xi = 0; xi < 5; xi++){
			var tdTop2 = $c('', [['class', 'tb3chnb']]);
			var iHTML = '';
			switch (xi) {
				case 0: iHTML = secRowText[0]; break;
				case 1: iHTML = T('CPPERDAY'); break;
				case 2: iHTML = T('PARTY'); break;
				case 3: iHTML = T('TROPAS'); break;
				case 4: iHTML = T('SLOT'); break;
			};
			tdTop2.innerHTML = iHTML;
			if (xi > 0) {
				var aCB = createDorf3Checkbox();
				aCB.setAttribute('id', 'd3Upd_4_' + (xi + 1));
				tdTop2.appendChild(aCB);
			} else if (xi == 0) $at(tdTop2, [['style', 'width:150px;']]);
			trTop2.appendChild(tdTop2);
		};

		aTb.appendChild(trTop2);
		rowsDorf3(aTb, 4, 4);
		sumRowDorf3(aTb, 4, 4);
		if (newPar) insertAfter(newPar, aTb);
	};

	function crD33Tb(newPar, topRowText, secRowText) {
		delD3Tb();
		var aTb = $t([['id', 'dorf3table']]);
		var trTop = $r([["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(3);
		trTop.appendChild(updAllCell);
		var tdTop = $c(topRowText[2], [['class', 'tb3chnb'], ["colspan", "6"], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);
		var trTop2 = $r();
		for (xi = 0; xi < 7; xi++){
			var tdTop2 = $c('', [['class', 'tb3chnb']]);
			var iHTML = '';
			switch (xi) {
				case 0: iHTML = secRowText[0]; break;
				case 1:
				case 2:
				case 3: iHTML = gIc["r" + xi]; break;
				case 5: iHTML = gIc['r4']; break;
				case 4:
				case 6: iHTML = gIc["clock"]; break;
			};
			tdTop2.innerHTML = iHTML;
			if (xi == 0) $at(tdTop2, [['style', 'width:150px;']]);
			trTop2.appendChild(tdTop2);
		};
		aTb.appendChild(trTop2);
		rowsDorf3(aTb, 6, 3);
		if (newPar) insertAfter(newPar, aTb);
		processVillage3();
	};

	function crD32Tb(newPar, topRowText, secRowText, merchant) {
		delD3Tb();
		var aTb = $t([['id', 'dorf3table']]);
		var trTop = $r([["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(2);
		trTop.appendChild(updAllCell);
		var tdTop = $c(topRowText[1], [['class', 'tb3chnb'], ["colspan", "6"], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);
		var trTop2 = $r([['class', 'tb3rh']]);
		for (xi = 0; xi < 7; xi++){
			var tdTop2 = $c("", [['class', 'tb3chnb']]);
			var iHTML = '';
			switch (xi) {
				case 0: iHTML = secRowText[0]; break;
				case 1:
				case 2:
				case 3:
				case 4: iHTML = gIc["r" + xi]; break;
				case 5: iHTML = gIc["r4"] + "/" + gIc["clock"]; break;
				case 6: iHTML = secRowText[4]; break;
			};
			tdTop2.innerHTML = iHTML;
			if (xi == 0) $at(tdTop2, [['style', 'width:150px;']]);
			trTop2.appendChild(tdTop2);
		};
		aTb.appendChild(trTop2);
		rowsDorf3(aTb, 6, 2, merchant);
		sumRowDorf3(aTb, 6, 2, merchant);
		if (newPar) insertAfter(newPar, aTb);
		processVillage2();
	};

	function crD31Tb(newPar, topRowText, secRowText, merchant) {
		delD3Tb();
		aTb = $t([['id', 'dorf3table']]);
		trTop = $r([["class", "tb3rhb"]]);
		updAllCell = createUpdAllCell(1);
		trTop.appendChild(updAllCell);
		tdTop = $c(topRowText[0], [['class', 'tb3chnb'], ['colspan', '4'], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);
		if (secRowText) {
			trTop2 = $r([['class', 'tb3rh']]);
			for (xi = 0; xi < secRowText.length; xi++){
				tdTop2 = $c(secRowText[xi], [['class', 'tb3chnb']]);
				if (xi == 3) {
					aS = 'd3Upd_1_3';
					aCB = createDorf3Checkbox();
					aCB.setAttribute('id', aS);
					aCBI = getGMcookie(aS, false);
					aCB.checked = eval(aCBI);
					aCB.addEventListener('click', setDorf3CheckOption(aS), false);
					tdTop2.appendChild(aCB);
				} else if (xi == 0) $at(tdTop2, [['style', 'width:150px;']]);
				trTop2.appendChild(tdTop2);
			};
		};
		aTb.appendChild(trTop2);
		rowsDorf3(aTb, secRowText.length - 1, 1, merchant);
		if (newPar) insertAfter(newPar, aTb);
		processVillage11();
	};

	function createUpdAllCell(xi) {
		tdUA = $c("", [['class', 'tb3chnb']]);
		if (xi == 4) {uAL = $a(gIc["reload_v"], [['href', jsVoid]]); uAL.addEventListener('click', function () {updateAllVillages(xi);}, false); tdUA.appendChild(uAL);};
		return tdUA;
	};

	function sumRowDorf3(pNode, maxTD, tabNo, merchant) {
		//Separator row
		trSeparator = $r([['class', 'tb3r']]);
		trSeparator.appendChild($c("", [['class', 'tb3rnb'], ["colspan", "" + (maxTD + 1)]]));
		pNode.appendChild(trSeparator);

		//sum row
		trSum = $r([['class', 'tb3r']]);
		//first sum cell
		ts1 = $c(T('TOTAL'), [['class', 'tb3cnb'], ['style', 'font-weight:bold']]);
		trSum.appendChild(ts1);
		totalMerchants = new Array();
		totalMerchants = [0, 0];
		if (merchant) {
			for (xi = 0; xi < merchant.length; xi++) {
				merchants = merchant[xi].split("/");
				posX = merchants[0].lastIndexOf(">");
				totalMerchants[0] += parseInt(merchants[0].substring(posX + 1));
				posX = merchants[1].indexOf("<");
				totalMerchants[1] += parseInt(merchants[1].substring(0, posX));
			};
		};
		for (var yi = 0; yi < maxTD; yi++) {
			if (merchant && yi == maxTD - 1) {
				ts = $c("" + totalMerchants[0] + "/" + totalMerchants[1], [['class', 'tb3cnb']]);
			} else if (tabNo == 4 && yi == 1) {
				ts = $c("", [["colspan", "2"], ['class', 'tb3cnb']]);
			} else if (tabNo == 4 && yi == 2) {
			} else {
				ts = $c("-", [['class', 'tb3cnb']]);
			};
			ts.setAttribute("id", "aldea_s_" + tabNo + "_" + (yi+2));
			trSum.appendChild(ts);
		};
		pNode.appendChild(trSum);
	};
	
	function rowsDorf3(pNode, maxTD, tabNo, merchant) {
		for (var i = 0; i < vList.length; i++){
			var tr = $r([['class', 'tb3r']]);
			//first cell
			var td1 = $c("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
			var nobr = $e("NOBR", "");
			if (tabNo == 4) {
				var aLink = $a("<img class='online5' src='" + gIc["b5"] + "' title='" + T('ACTUALIZAR') + " (" + vList[i].vName + "-" + vList[i].vNewdid + ")' id='aldea" + vList[i].vNewdid + "_boton'>", [['href', jsVoid]]);
				aLink.addEventListener("click", refreshVillageV2(vList[i].vNewdid, tabNo), 0);
				nobr.appendChild(aLink);
			};
			nobr.appendChild($e("SPAN", ' <a href="dorf1.php?newdid=' + vList[i].vNewdid + '">' + vList[i].vName + '</a>'));
			td1.appendChild(nobr);
			tr.appendChild(td1);
			//second cell and the other ones
			for (yi = 0; yi < maxTD; yi++) {
				var td = $c("-", [['class', 'tb3cnb'], ["id", "aldea" + vList[i].vNewdid + "_" + tabNo + "_" + (yi+2)]]);
				if (yi == maxTD - 1 && (tabNo == 1 || tabNo == 2)) td.innerHTML = merchant[i];
				tr.appendChild(td);
			};
			pNode.style.textAlign = docDir[0];
			pNode.appendChild(tr);
		};
	};

	function processDorf3() {
		var origParTop = $xf("//div[@id='" + dmid2 + "']//p | //div[@id='" + dmid2 + "']//*[@id='textmenu'] | //div[@id='" + dmid2 + "']//*[@class='txt_menue']");
		if (TB36.plAc == true) {origParTop.innerHTML += ' | <a href="dorf3.php?s=6">' + T('ATTABLES') + '</a>'; return;};

		var origT = $xf("//div[@id='" + dmid2 + "']//table[@id='overview'] | //div[@id='" + dmid2 + "']//table[@class='tbg']");
		if (origT) origT.style.visibility = "hidden";

		if (origParTop) {
			var arrParTopLinks = origParTop.textContent.split("\n");
			var arrParTopText = new Array();
			for (xi = 0; xi < arrParTopLinks.length; xi++) {arrParTopText[xi] = arrParTopLinks[xi].replace("|", "");};
			arrParTopText.shift();
			origParTop.style.visibility = "hidden";
		};

		var origSecRow = origT.rows[1];
		var arrSecRow = origSecRow.textContent.split("\n");
		arrSecRow.pop();
		arrSecRow.shift();

		//get the merchant array
		var arrM = new Array();
		for (i = 0; i < vList.length; i++) {arrM[i] = origT.rows[2 + i].cells[4].innerHTML;};

		//replace the original Paragraph with a new one providing the same options as in Travian Plus
		var nP = $e("P", "");
		var a = $g(dmid2);
		if (a.firstChild) a.insertBefore(nP, a.firstChild); else a.appendChild(nP);

		for (xi = 0; xi < arrParTopText.length; xi++) {
			var nPelem = $a(arrParTopText[xi], [['class', "newDorf3elem_" + xi], ['href', jsVoid]]);
			switch (xi) {
				case 0: nPelem.addEventListener("click", function() {crD31Tb(nP, arrParTopText, arrSecRow, arrM);}, 0); break;
				case 1: nPelem.addEventListener("click", function() {crD32Tb(nP, arrParTopText, arrSecRow, arrM);}, 0); break;
				case 2: nPelem.addEventListener("click", function() {crD33Tb(nP, arrParTopText, arrSecRow);}, 0); break;
				case 3: nPelem.addEventListener("click", function() {crD34Tb(nP, arrParTopText, arrSecRow);}, 0); break;
				case 4:	nPelem.addEventListener("click", function() {crD35Tb(nP, arrParTopText, arrSecRow);}, 0); break;
			};
			nP.appendChild(nPelem);
			if (xi < arrParTopText.length - 1) {var nPsep = $e("SPAN", " | "); nP.appendChild(nPsep);};
		};
		removeElement(origParTop);
		crD31Tb(nP, arrParTopText, arrSecRow, arrM);
	};

	//time and resource counters
	function setTimers(){
		function createResourceTimer(i){
			return function(){
				var sTimeouts = $xf("//*[@id='timeout" + i + "']", 'l');
				//increase the required amount of the i type resource
				crtResUnits[i]++;
				crtResUnits[4] = 0;
				for (var xi = 0; xi < 4; xi++) crtResUnits[4] += crtResUnits[xi];
				for (var j = 0; j < sTimeouts.snapshotLength; j++){
					var aTimeout = sTimeouts.snapshotItem(j);
					if (aTimeout) {
						var quantity = aTimeout.textContent - 1; // calculate needed resource quantity
						if (quantity >= 0) aTimeout.innerHTML = quantity; else {
							var aParentNode = aTimeout.parentNode;
							if (aParentNode != null) {
								var tbodyNode = aParentNode.parentNode;
								if (tbodyNode) {
									if (tbodyNode.childNodes.length <= 2) {
										var resourceCellNode = tbodyNode.parentNode.parentNode;
										removeElement(tbodyNode.parentNode);
										if (resourceCellNode != null) {$at(resourceCellNode, [['class', 'tb3cnb']]); resourceCellNode.innerHTML = T('EXTAV');};
									} else removeElement(aTimeout.parentNode);
								};
							};
						};
					};
				};
			};
		};

		function createTimerHandler(){
			return function () {
				var allTimeouts = $xf("//*[@id='timeout' or @id='timeouta']", 'l');
				//decrease time
				for (var i = 0; i < allTimeouts.snapshotLength; i++){
					var aTimeout = allTimeouts.snapshotItem(i);
					var xTime = toSeconds(aTimeout.textContent) - 1;
					if (xTime >= 0)	aTimeout.textContent = formatTime(xTime, 0);//not reached
				};
				if (TB36.boolIsNPCExluded == false) NPCUpdate();//fr3nchlover
			};
		};

		var arrFrequency = new Array(4);
		for (var i = 0; i < 4; i++){
			arrFrequency[i] = (1000 / Math.abs(prodPerHour[i]/3600));
			if (!isFinite(arrFrequency[i]) || arrFrequency[i] < 0 || capacity[i] - crtResUnits[i] == 0) arrFrequency[i] = Number.POSITIVE_INFINITY; else setInterval(createResourceTimer(i), Math.floor(arrFrequency[i]));
		};
		setInterval(createTimerHandler(),1000);
	};

	function getBmaxLevel(gid) {
		var maxLevel;
		switch (gid) {
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:	maxLevel = 5; break;
			case 23:
			case 35: maxLevel = 10; break;
			case 27: maxLevel = 20; break; //treasury -> we'll keep the level 20 as max level, even if for older game versions it is 10
			case 40: maxLevel = 100; break;
			default: maxLevel = 20;
		};
		return (maxLevel);
	};

	function colorLvl(crtLvl, gid){
		var rV = 1;
		var nRNPC = 0;
		var XY = bCost[parseInt(gid)][parseInt(crtLvl) + 1];
		if (XY) {for (var i = 0; i < 4; i++) {if (crtResUnits[i] < XY[i]) rV = 0; nRNPC += XY[i];}; if (rV == 0 && nRNPC <= crtResUnits[4]) rV = 2;};
		return rV;
	};

	// market => offer: function marketSellMinMax automatically selects as offering the resource from which you have the most units and searching the resource with the minimum units for the current village
	// add option to save the offer
	// add option to save the offer as global (Zippo)
	function marketSellMinMax() {
		var aX = $xf("//a[@class='selected' and contains(@href, '&t=2')] | //input[@name='d2'] | //input[@class='fm fm25']");
		if (!aX) return;
		maxRes = crtResUnits[0];
		minRes = crtResUnits[0];
		idMax = 0;
		idMin = 0;
		pS = $g('soff');

		for (var i = 0; i < 4; i++) {if (maxRes <= parseInt(crtResUnits[i])) {maxRes = crtResUnits[i]; idMax = i;}; if (minRes >= parseInt(crtResUnits[i])) {minRes = crtResUnits[i]; idMin = i;};};
		try {
			offerTypeMax = document.getElementsByName("rid1");
			offerTypeMin = document.getElementsByName("rid2");
			if (offerTypeMax) {offerTypeMax[0].value = "" + (idMax + 1) + ""; };
			if (offerTypeMin) {offerTypeMin[0].value = "" + (idMin + 1) + ""; };
		} catch(e) {};

		if (!pS) {
			var aTb = $xf("//*[@id='sell']/tbody | //table[@class='f10']");
			if (aTb) {
				sRow1 = $r();
				sE1 = $c("", [['colspan', TB36.M35 == 2 ? '3' : '4']]);
				ciS1 = $c("<input type='checkbox' id='soffG' value='1'></input>" + T('SVGL'));
				sRow1.appendChild(sE1);
				sRow1.appendChild(ciS1);
				aTb.appendChild(sRow1);
				sRow2 = $r();
				sE2 = $c("", [['colspan', TB36.M35 == 2 ? '3' : '4']]);
				ciS2 = $c("<input type='checkbox' id='soff' value='1'></input>" + T('SAVE'));
				sRow2.appendChild(sE2);
				sRow2.appendChild(ciS2);
				aTb.appendChild(sRow2);
			};
		};

		//add information about capacity of the merchants and make transport functions available to this page, too
		merchantsPar = $xf("//form//p | //form//p[@class='f10']");
		if (merchantsPar) {
			mHTML = merchantsPar.textContent;
			mhMH = mHTML.split("	")[2];
			avMerchants = parseInt(mHTML.split("	")[4].split("/")[0]);
			if (mHTML.indexOf("(") == -1) merchantsPar.innerHTML += " (" + TB36.Mcap + " / " + gIc["merchant"] + ")";
		};

		rxI = $xf("//input[@class='text' and @name='m1'] | //input[@class='fm' and @name='m1']");
		if (rxI) rxI.addEventListener('keyup', function() {mhRowUpdate3(avMerchants);}, false);
		rxType = $xf("//select[@class='dropdown' and @name='rid1'] | //select[@class='fm' and @name='rid1']");
		if (rxType) rxType.addEventListener('change', function() {mhRowUpdate3(avMerchants);}, false);

		function mhRowUpdate3(maxM) {
			totalTransport = 0;
			maxC = TB36.Mcap;
			aR = parseInt(rxI.value);
			if (rxType && crtResUnits[parseInt(rxType.value) - 1] < aR) rxI.value = crtResUnits[parseInt(rxType.value) - 1];
			if (!isNaN(aR)) totalTransport += aR;
			totMerchants = Math.ceil(totalTransport / maxC);
			//MarioCheng & DMaster wasted/exceeding resources
			crtWaste = maxC - (totalTransport - (totMerchants-1) * maxC);
			crtExceed = totalTransport - (maxM * maxC);
			mhText = "<b>" + mhMH + ": " + totMerchants + "/" + maxM + "<br>" + T('MAX') + ": " + maxM * maxC + "<br>";
			if (totMerchants > maxM) {mhColor = "red"; mhText += T('MTX') + ": "+ crtExceed;} else {mhColor = "darkgreen"; mhText += T('MTW') + ": "+ crtWaste;};
			mhText += "<br>" + T('MTC') + ": " + totalTransport + "</b>";
			setMerchantsCell(mhText, mhColor, aTb);
			return;
		};
	};

	//show hero extended status
	function showHeroStatus() {
		hmLink = $xf("//div[@id='" + dmid2 + "']//a[contains(@href, '&rename')]");
		if (!hmLink) return;
		hoT = hmLink.parentNode.parentNode.parentNode.parentNode;
		posType = hoT.rows[0].cells[0].textContent.indexOf(" (");
		hHeader = hoT.rows[0].cells[0].textContent.substr(0, posType);
		hABonus = hoT.rows[3].cells[1].textContent.replace("%", "");
		setGMcookie("heroV", hABonus, false);
		xLevel = "";
		notgata = true;
		for (xi = hHeader.length; xi > 0; xi--) {if (hHeader.charAt(xi) != " " && notgata) xLevel = hHeader.charAt(xi) + xLevel; else notgata = false;};
		hLevel = parseInt(xLevel);
		hPercent = parseInt(hoT.rows[hoT.rows.length - 1].cells[1].textContent);
		crtExp = (hLevel + 1) * 100;
		crtLevelExp = ((crtExp) / 2) * hLevel;
		nextLevelExp = crtLevelExp + crtExp;
		expGainedCrtLevel = (hLevel+1) * hPercent;
		expToLevelUp = (hLevel + 1) * (100 - hPercent);
		strLevel = hoT.rows[0].cells[0].childNodes[1].textContent;
		strLevel = strLevel.substr(0, strLevel.indexOf(hLevel) - 1);
		xRow = $r([['style', 'background-color:transparent;']]);
		hCell = $c("", [['colSpan', '5'], ['style', 'padding:1px 2px 1px 1px; margin:0px;']]);
		hTable = $t([['class', 'tb3tb'], ['style', 'border:1px solid silver; width:100%']]);
		aRow = $r();
		aRow.appendChild($c(strLevel + " " + hLevel, [['class', 'tb3cbt']]));
		aRow.appendChild($c("" + hPercent + "%", [['class', 'tb3cbt']]));
		aRow.appendChild($c("" + (100 - hPercent) + "%", [['class', 'tb3cbt']]));
		aRow.appendChild($c(strLevel + " " + (hLevel + 1), [['class', 'tb3cbt']]));
		bRow = $r();
		a1Cell = $c('', [['style', 'width:100px;'], ['class', 'tb3cbt']]);
		bRow.appendChild(a1Cell);
		b1Cell = $c('', [['colSpan', 2], ['style', 'padding:2px 2px 1px 2px; border:0px none transparent; margin:0px;']]);
		bRow.appendChild(b1Cell);
		graphBar = $t([['style', 'height:16px; width:100%; margin:0px; border:0px none transparent; border-collapse:collapse;']]);
		rX = $r([['style', 'border:0px none transparent; padding:0px; margin:0px;']]);
		x1Cell = $c('', [['style', 'width: ' + hPercent + '%; background-color:blue; padding:0px; border:0px none transparent; margin:0px;']]);
		x2Cell = $c('', [['style', 'width: ' + (100 - hPercent) + '%; background-color:lightgrey; padding:0px; border:0px none transparent; margin:0px']]);
		rX.appendChild(x1Cell);
		rX.appendChild(x2Cell);
		graphBar.appendChild(rX);
		b1Cell.appendChild(graphBar);
		c1Cell = $c('', [['colSpan', 2], ['class','tb3cbt']]);
		bRow.appendChild(c1Cell);
		cRow = $r();
		a2Cell = $c(crtLevelExp, [['class', 'tb3cbt']]);
		cRow.appendChild(a2Cell);
		b2Cell = $c(expGainedCrtLevel, [['title', "" + crtLevelExp + " + " + expGainedCrtLevel + " = " + (crtLevelExp + expGainedCrtLevel)], ['class', 'tb3cbt']]);
		cRow.appendChild(b2Cell);
		c2Cell = $c(expToLevelUp, [['class', 'tb3cbt']]);
		cRow.appendChild(c2Cell);
		d2Cell = $c(nextLevelExp, [['class', 'tb3cbt']]);
		cRow.appendChild(d2Cell);
		hTable.appendChild(aRow);
		hTable.appendChild(bRow);
		hTable.appendChild(cRow);
		hCell.appendChild(hTable);
		xRow.appendChild(hCell);
		hoT.appendChild(xRow);
	};

	//fill in the NPC Merchant fields
	function fillinNPCfields(aURL) {
		var sumRes = parseInt(document.getElementById('org4').innerHTML);
		var rm1 = parseInt(getQueryParameters(aURL, 'r1'));
		var rm2 = parseInt(getQueryParameters(aURL, 'r2'));
		var rm3 = parseInt(getQueryParameters(aURL, 'r3'));
		var rm4 = parseInt(getQueryParameters(aURL, 'r4'));
		rm1_0 = rm1; rm2_0 = rm2; rm3_0 = rm3; rm4_0 = rm4;
		while(rm1_0 + rm2_0 + rm3_0 + rm4_0 + rm1 + rm2 + rm3 + rm4 < sumRes )  {
			rm1_0 += rm1;
			rm2_0 += rm2;
			rm3_0 += rm3;
			rm4_0 += rm4;
		}
		urlNPCback = addQueryParameter(NPCURL, 'bid', getQueryParameters(window.location.href,'bid'));
		urlNPCback = addQueryParameter(urlNPCback, 'r1', rm1_0);
		urlNPCback = addQueryParameter(urlNPCback, 'r2', rm2_0);
		urlNPCback = addQueryParameter(urlNPCback, 'r3', rm3_0);
		urlNPCback = addQueryParameter(urlNPCback, 'r4', rm4_0);

		document.getElementById("submitText").innerHTML += "<br><a href='"+urlNPCback+"'>Increse same Distribute resources :</a>";

		if (aURL.indexOf('&' + NPCResources) != NPCURL.length) return false;
		var needed = getQueryParameters(aURL, NPCResources).split(',');
		var inputs = document.getElementsByName('m2[]');
		for (var i = 0; i < 4; i++) {inputs[i].value = needed[i];};
		unsafeWindow.calculateRest();
	};

	function getTroopsToBeTrained() {
		var xp = $xf('//input[starts-with(@id, "inputTroopNo_")]', 'r');
		if (xp.snapshotLength > 0) {
			var inputs = new Array();
			for (var i = 0; i < xp.snapshotLength; i++) {
				var f = xp.snapshotItem(i).value;
				inputs.push(f.length == 0 || isNaN(f) ? 0 : parseInt(f));
			};
			return inputs;
		} else return;
	};

	function parseURL(aURL) {
		var urlParts = aURL.split('?', 2);
		if (urlParts.length == 1) urlParts[1] = '';
		var parts = {path: urlParts[0], query: urlParts[1]};
		return parts;
	};

	function getQueryParameters(aURL, param) {
		var urlParts = parseURL(aURL).query.split('&');
		for (var i = 0; i < urlParts.length; i++) {
			var ki = urlParts[i].split('=');
			if (ki[0] == param) return decodeURIComponent(ki[1]);
		};
	};

	function addQueryParameter(aURL, param, aVal) {
		var add_pair = param + '=' + encodeURIComponent(aVal);
		var added = false;
		var urlParts = parseURL(aURL);
		var pairs = urlParts.query.split('&');
		for (var i = 0; i < pairs.length; i++) {
			var ki = pairs[i].split('=');
			if (ki[0] == param) {
				pairs[i] = add_pair;
				added = true;
				break;
			};
		};
		if (!added) pairs.push(add_pair);
		return urlParts.path + '?' + pairs.join('&');
	};

	function NPCUpdate() {
		var arrTrain = null;
		//NPC for buildings/resource fields/armoury/blacksmith/town hall/academy
		xpNeeded = $xf("//*[@id='npcXX_1']", 'r');
		if (xpNeeded.snapshotLength != 0) NPCAssistant(1, xpNeeded, arrTrain);
		if (TB36.isTtB == true && document.getElementsByName('s1').length > 0) arrTrain = getTroopsToBeTrained();
		xpNeeded = $xf('//*[starts-with(@id, "npc_tt_r")]', 'r');
		if (xpNeeded.snapshotLength == 0) xpNeeded = $xf('//*[starts-with(@id,"NPCTT")]', 'r');
		if (xpNeeded.snapshotLength != 0) NPCAssistant(2, xpNeeded, arrTrain);
	};
	
	
	function setTroopsNPC() {
		var aX = $xf('//div[@id="' + dmid2 + '"]//table[@class="build_details"]//td[@class="desc"]', 'l');
		for (var i = 0; i < aX.snapshotLength; i++) {var tdX = aX.snapshotItem(i); $at(tdX, [['id', 'NPCTT_' + (i + 1)]]); getRequiredRes(tdX);};
	};

	function getRequiredRes(td) {
		var strTC = td.textContent.replace(/\n/g, "").replace(/\s/g, "");
		var iktC = strTC.indexOf(")");
		if (iktC == -1) iktC = strTC.indexOf("ï¼‰");
		var intC = strTC.indexOf(T("TOTAL"));
		var tC = strTC;
		if (iktC != -1) {
			if (intC != -1 && intC > iktC + 1) {
				tC = strTC.substring(iktC + 1, intC);
			} else if (intC != -1) {
				tC = strTC.substring(0, intC - 1);
			} else if (intC == -1 && strTC.length > iktC + 1) {
				tC = strTC.substr(iktC + 1);
			} else if (intC == -1) {
				tC = strTC;
			};
		} else {
			tC = strTC.substring(iktC).replace(/[a-zA-Z]/g, "");
			fiI = tC.search(/(\d+)/);
			if (fiI > 0) tC = tC.substring(fiI);
		};
		dX = tC.split(":");
		if (dX.length > 1 && td.nodeName != "TD") iX = 1; else iX = 0;
		var arC = dX[iX].split("|");
		var arX = new Array();
		var necRes = 0;
		for (var xi = 0; xi < 4; xi++) {arX[xi] = parseInt(arC[xi]); necRes += arX[xi];};
		if (td.id.indexOf("NPCTT_") != -1) {
			var aImg = td.parentNode.getElementsByTagName("IMG")[0];
			var arrX = tC.split("|");
			var strTime = arrX[arrX.length - 1];
			if (strTime == '') // This line will detect if there is the Time Error
			{ strTime = arrX[arrX.length - 2]; } //Jacmer's Fix 
			var aTtT = new xTtT(getTroopIndexTitleFromImg(aImg)[0], necRes, strTime, arX);
			td.id.search(/(\d)/);
			var index = RegExp.$1;
			arrTtT[index - 1] = aTtT;
		};
		return arX;
	};
	
	//function for the NPC entries on pages where an NCP trade is possible
	function NPCAssistant(typeNPC, xpNeeded, arrTrain) {
		//Needed resources
		for (var i = 0; i < xpNeeded.snapshotLength; i++) {
			td = xpNeeded.snapshotItem(i);
			var arrayRes;
			if (typeNPC == 1) arrayRes = getRequiredRes(td); else if (typeNPC == 2) arrayRes = arrTtT[i].aRes;
			if (arrayRes == null || arrayRes.length < 4) continue;
			//Read needed resources and calculate total
			needRes = new Array();
			needResTotal = 0;
			for (var j = 0; j < 4; j++) {
				needRes.push(arrTrain ? arrayRes[j] * arrTrain[i] : arrayRes[j]);
				needResTotal += arrayRes[j];
			};
			//fr3nchlover
			neededTotal = (arrTrain && arrTrain[i] != 0 ? needResTotal * arrTrain[i] : needResTotal);
			//Get or create HTML container
			container_id = 'npcXX_' + typeNPC + '_' + i;
			container = $g(container_id);
			if (container == null) {
				if (td.nodeName == "DIV") td = td.parentNode;
				td.innerHTML += '<br>';
				if (needResTotal > 20000  && typeNPC == 2) td.innerHTML += "<br>";
				td.innerHTML += '<div id="' + container_id + '" class="npc-general"> </div>';
				container = $g(container_id);
			};
			//Show total & deficit/surplus
			r = crtResUnits[4] - neededTotal;
			r_s = '[' + r + ']';
			if (r < 0) r_s = '<span class="npc-red">[' + r + ']</span>'; else if (r > 0) r_s = '<span class="npc-green">[+' + r + ']</span>';
			container.innerHTML = '<b>' + T("TOTAL") + '</b>: ' + neededTotal + ' ' + r_s;

			// Show time estimate
			dtNow = new Date();
			dtEstimated = new Date();
			if (neededTotal > 0 && r < 0) {
				sEst = Math.ceil(Math.abs(r) / (prodPerHour[5] / 3600));
				dtEstimated.setTime(dtNow.getTime() + (sEst * 1000));
				formatDtEstimated =
					(dtEstimated.getDate() < 10 ? '0' + dtEstimated.getDate() : dtEstimated.getDate()) + '.' +
					(dtEstimated.getMonth() < 9 ? '0' + (dtEstimated.getMonth() + 1) : (dtEstimated.getMonth() + 1)) +
					(dtNow.getFullYear() < dtEstimated.getFullYear() ? dtEstimated.getYear() : '');
				if (dtEstimated.getDate() == dtNow.getDate() && dtEstimated.getMonth() == dtNow.getMonth()) formatDtEstimated = ""; else formatDtEstimated = '&nbsp;' + formatDtEstimated;
				formatTimeEstimated =
					(dtEstimated.getHours() < 10 ? '0' + dtEstimated.getHours() : dtEstimated.getHours()) + ':' +
					(dtEstimated.getMinutes() < 10 ? '0' + dtEstimated.getMinutes() : dtEstimated.getMinutes());
					container.innerHTML += ' | ' + T('LISTO') + '<span class="npc-red">' + formatDtEstimated + '&nbsp;' + '</span>' + T('AT') + '&nbsp;' + '<span class="npc-red">' + formatTimeEstimated + '</span>';
			};

			//Show time saved by NPC
			var time_saved = 0;

			if (neededTotal > 0) {
				for (var j = 0; j < 4; j++) {
					PpMt = prodPerHour[j] / 60;
					mUntilNPC = (dtEstimated.getTime() - dtNow.getTime()) / 1000 / 60;
					resAtNPCtime = parseInt(crtResUnits[j]) + (mUntilNPC * PpMt);
					deficitUntilNPC = needRes[j] - resAtNPCtime;
					if (deficitUntilNPC <= 0) continue;
					if (PpMt <= 0) {time_saved = null; break;};
					diffCalc = Math.ceil(deficitUntilNPC / PpMt);
					if (diffCalc > time_saved) time_saved = diffCalc;
				};
			};

			if (time_saved == null) {
				container.innerHTML += ' | &#8734;';
			} else if (r < 0) {
			} else if (time_saved > 0) {
				diffHours = Math.floor(time_saved / 60);
				if (diffHours < 10) diffHours = "0" + diffHours;
				diffMinutes = time_saved % 60;
				if (diffMinutes < 10) diffMinutes = "0" + diffMinutes;
				delta_str = T('NPCSAVETIME') + '&nbsp;' + diffHours + ':' + diffMinutes + ' h';
				if (diffHours < 1) delta_str = '<span class="npc-red">' + delta_str + '</span>';
				container.innerHTML += ' | ' + delta_str;
			};
			// Show max.
			if (arrTrain) {
				maxY = Math.floor(crtResUnits[4] / needResTotal);
				container.innerHTML += ' | ' + T('MAX') + '. ';
				aLink = $a(maxY, [['href', jsVoid]]);
				aLink.addEventListener('click', clickOnNPCAssistant(i, maxY), false);
				container.appendChild(aLink);
			};
			// Show NPC link
			/*
			if (neededTotal > 0 && r >= 0 && (time_saved > 0 || time_saved == null) && TB36.boolShowNPCLink) {
				urlNPCback = addQueryParameter(NPCURL, NPCResources, needRes.join(','));
				urlNPCback = addQueryParameter(urlNPCback, NPCbacklinkName, TB36.BrT);
				container.innerHTML += '&nbsp;<a href="' + urlNPCback + '"> &raquo; NPC</a>';
			};
			*/			
			if (neededTotal > 0 && r >= 0 && (time_saved > 0 || time_saved == null) && TB36.boolShowNPCLink) {
				//urlNPCback = addQueryParameter(NPCURL, NPCResources, needRes.join(','));
				//urlNPCback = addQueryParameter(urlNPCback, NPCbacklinkName, TB36.BrT);
				var urlNPCback = addQueryParameter(NPCURL, 'bid', getQueryParameters(window.location.href,'id'));
				if(!getQueryParameters(window.location.href,'id'))  {urlNPCback = addQueryParameter(NPCURL, 'bid', getQueryParameters(window.location.href,'gid'));};
				for(var urli = 0; urli < needRes.length; urli++)  { urlNPCback = addQueryParameter(urlNPCback, 'r'+(urli+1), needRes[urli]);};
				container.innerHTML += '&nbsp;<a href="' + urlNPCback + '"> &raquo; NPC</a>';
			};
		};

		function clickOnNPCAssistant(i, maxY) {return function() {aI = $g("inputTroopNo_" + (i + 1)); if (aI) aI.value = maxY;};};
	};

	function getBootyFromTable(aTb) {
		retValue = [0,0,0,0,0];
		xi = 3;
		gata = false;
		while (xi < aTb.rows.length && !gata) {bootyCell = aTb.rows[xi].cells[1]; if (bootyCell.textContent.indexOf("|") != -1) gata = true; xi += 1;};
		if (gata) {
			resInfo = bootyCell;
			for (var xi = 0; xi < bootyCell.childNodes.length; xi++) {aChild = bootyCell.childNodes[xi]; if (aChild.className == "goods" || aChild.className == "res") resInfo = aChild;};
			aqBooty = resInfo.textContent.split("|");
			if (aqBooty.length > 1) {for (var i = 0; i < 4; i++) {retValue[i] = parseInt(aqBooty[i].replace(" ", "").replace(" ", "")); retValue[4] += retValue[i];};};
			bootyCell.innerHTML = getBootyCellInfo(retValue);
		};
		return retValue;
	};
	
	function tableTotalVillageTroopsV3() {
		if (actV.vID != "") {
			//new search function
			//first search for tables, if search successfull then search for tables and oasis
			allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='troop_details']//a[contains(@href, " + actV.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r');
		
			if (allTables.snapshotLength == 0) {
				allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='std troop_details']//a[contains(@href, " + actV.vID + ")]/../../../..", 'r');
				if (allTables.snapshotLength == 0) {
					allTables = $xf("//div[@id='" + dmid2 + "']/table/tbody/tr/td[1]/a[contains(@href, " + actV.vID + ")]/../../../..", 'r');
					if (allTables.snapshotLength == 0) {allTables = $xf("//div[@id='" + dmid2 + "']/table/tbody/tr/td[1]/a[contains(@href, " + actV.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r');};
				} else {allTables = $xf("//div[@id='" + dmid2 + "']//table[@class='std troop_details']//a[contains(@href, " + actV.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']", 'r');};
			};

			if (allTables.snapshotLength > 0) {
				ntCc = 0;
				booty = [0,0,0,0,0];
				sumbooty = [0,0,0,0,0];
				ccLabel = getGMcookie("tvtccLabel", false);
				if (ccLabel == 'false') ccLabel = '';
				//horse drinking through level

				hdtLevel = 0;
				if (TB36.d2spB.length > 8) TB36.d2spB[8];
				//Search for first troop table from this village (david.macej)
				firstVillageTable = 0;
				while (allTables.snapshotItem(firstVillageTable).rows[0].cells[0].innerHTML.search(actV.vID) == -1) {firstVillageTable++;};

				tTable = allTables.snapshotItem(firstVillageTable).cloneNode(true);
				$at(tTable, [['class', 'allvtroops']]);
				booty = getBootyFromTable(allTables.snapshotItem(firstVillageTable));
				for (var xi = 0; xi < 5; xi++) {sumbooty[xi] += booty[xi];};
				tTable.rows[0].cells[1].innerHTML = '<b>' + T('TOTALTROOPS') + '</b>';
				tTable.rows[0].setAttribute("class", "cbgx");
				tTable.rows[0].cells[0].setAttribute('class', 'cbgx');
				tTable.rows[0].cells[1].setAttribute('class', 'cbgx');
				rowTrIcons = tTable.rows[1];
				rowTrUnits = tTable.rows[2];
				if (tTable.rows.length == 4) {
					rowCc = tTable.rows[3];
					rowB = $r();
					b1Cell = $c('<img src="' + image["capacity"] + '">', [['style', 'text-align:center;']]);
					strColspan = rowCc.cells[1].colSpan;
					b2Cell = $c("0", [['colspan', strColspan], ['id','tb3bountycell']]);
					rowB.appendChild(b1Cell);
					rowB.appendChild(b2Cell);
					rowCc.parentNode.insertBefore(rowB, rowCc);
				};
				rowB = tTable.rows[tTable.rows.length - 2];
				rowCc = tTable.rows[tTable.rows.length - 1];
				intCC = 0;

				for (var i = firstVillageTable + 1; i < allTables.snapshotLength; i++) {
					aTb = allTables.snapshotItem(i);
					if (aTb.nodeName == "P") break;

					//add the crop consumption label if found
					if (ccLabel == '') {
						lastCell = aTb.rows[aTb.rows.length - 1].cells[1];
						if (lastCell) {
							arrImg = lastCell.getElementsByTagName("IMG");
							if (arrImg.length > 0 && arrImg[0].className == 'r4') {ccLabel = aTb.rows[aTb.rows.length - 1].cells[0].innerHTML; setGMcookie("tvtccLabel", ccLabel, false);};
						};
					};

					//fix for the troops in oasis
					nSibling = aTb.nextSibling;
					if (nSibling && nSibling.nodeName == "P" && nSibling.className == 'b f16') i = allTables.snapshotLength;

					//fix provided by fr3nchlover
					allTroopCells = aTb.rows[2].cells;
					if (allTroopCells.length == 12) {
						heroIconCell = aTb.rows[1].cells[11];
						//add extra hero cell only if cell does not exist in total troop table (david.macej)
						if (rowTrIcons.cells.length == 11) {
							rowTrIcons.appendChild(heroIconCell.cloneNode(true)); //<= add a new cell to first line
							rowTrUnits.appendChild(allTroopCells[11].cloneNode(true)); //<= add a new cell to second line
							rowTrUnits.cells[11].innerHTML = ""; // clean new cell
							rowCc.cells[1].colSpan = 11; // add 1 to cols
							rowB.cells[1].colSpan = 11;
							$at(tTable.rows[0].cells[1], [['colspan', 12]]);
						};
					};

					 //if troops not in village stop summing (david.macej)
					if (aTb.rows[0].cells[0].innerHTML.search(actV.vID) == -1) continue;

					//add the troop units from the current table to the new created table
					if (aTb.rows[0].cells[0].textContent.indexOf(actV.vName) != -1) {
						for (var j = 1; j < allTroopCells.length; j++) {
							iHTML = rowTrUnits.cells[j].innerHTML;
							intTroops = parseInt(allTroopCells[j].innerHTML);
							if (iHTML == "") rowTrUnits.cells[j].innerHTML = intTroops; else rowTrUnits.cells[j].innerHTML = parseInt(iHTML) + intTroops;
						};
					} else {ntCc = 1;};
					booty = getBootyFromTable(aTb);
					for (var xi = 0; xi < 5; xi++) {sumbooty[xi] += booty[xi];};
				};
				//compute crop consumption
				arrTT = [0,0,0,0,0,0,0,0,0,0,0];
				for (var j = 1; j < rowTrUnits.cells.length; j++) {
					rowTrUnits.cells[j].className = (rowTrUnits.cells[j].innerHTML == "0") ? "c" : "";
					switch (j) {
						case 11: intCC += 6; arrTT[10] = 1; break;
						default:
							tImg = rowTrIcons.cells[j].getElementsByTagName("IMG");
							if (tImg[0]) {
								tType = getTroopIndexTitleFromImg(tImg[0])[0];
								arrTT[j - 1] = parseInt(rowTrUnits.cells[j].textContent);
								ccCoef = 1;
								if (hdtLevel > 9 && tType == 4) ccCoef = 0.5;
								if (hdtLevel > 14 && tType == 5) ccCoef = 0.667;
								if (hdtLevel > 19 && tType == 6) ccCoef = 0.75;
								intCC += Math.ceil(uc[tType][9] * arrTT[j - 1] * ccCoef);
							} break;
					};
				};
				intCC += ntCc;
				setGMcookieV2("Troops", arrTT, actV.vNewdid);

				rowCc.cells[1].innerHTML = (intCC) + " " + gIc["r5"] + " / " + gIc["clock"];
				rowCc.cells[0].innerHTML = ccLabel;
				$at(rowCc.cells[0], [['style', 'background-color:#F3F3F3;']]);
				$at(rowCc.cells[1], [['style', 'background-color:#F3F3F3; text-align:' + docDir[0] + ';']]);

				if (sumbooty[4] != 0) rowB.cells[1].innerHTML = getBootyCellInfo(sumbooty); else rowB.style.display = 'none';

				if (TB36.T36 == false) {
					p = $xf("//div[@id='" + dmid2 + "']/p[@class='txt_menue']", 'r').snapshotItem(0);
				} else {
					menu = $xf("//div[@id='" + dmid2 + "']/p/a", 'r');
					if (menu.snapshotLength > 0) p = menu.snapshotItem(0).parentNode; else p = $g("textmenu");
				};
				p.parentNode.insertBefore(tTable, p.nextSibling);

				newP = $e('P', '');
				newP.innerHTML += '<b>' + T('TOTALTROOPS') + '</b>';
				p.parentNode.insertBefore(newP, p.nextSibling);
				arrTT = null;
			};
		};
	};

	function getDistance(sx1, sy1, sx2, sy2) {
		var x1 = parseInt(sx1); var y1 = parseInt(sy1); var x2 = parseInt(sx2); var y2 = parseInt(sy2);
		dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));
		dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));
		dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
		return dist;
	};

	//---
	//Modified by Lux
	function showMsgPage(aState) {
		scroll(0,0);
		var outerPane = $g('OuterMsgPage');
		var innerPane = $g('InnerMsgPage');
		if (aState) {
			diplayElements("none");
			outerPane.className = 'OuterMsgPageOn';
			innerPane.className = 'InnerMsgPageOn';
			var aButton = $g('ButtonCloseMsgPage');
			//ms99
			if (aButton) aButton.addEventListener("click", function(){showMsgPage(false)}, true);
		} else {
			outerPane.className = 'MsgPageOff';
			innerPane.className = 'MsgPageOff';
			diplayElements("");
		};
	};
	//---

	function addDiv() {
		div = $e("div");
		//ms99
		div.innerHTML = '<div id="OuterMsgPage" class="MsgPageOff"></div><div id="InnerMsgPage" class="MsgPageOff"></div>';
		document.body.insertBefore(div, document.body.firstChild);
	};

	function diplayElements(aType) {uTb = $g('upgTable'); mTb = $g('mapTable'); ttTb = $g('trooptimetable'); if (uTb) uTb.style.display = aType; if (mTb) mTb.style.display = aType;if (ttTb) ttTb.style.display = aType;};
	//---

	function allyCalculation() {
		if (crtPage.match(/allianz.php\?aid/)) {
			allyTable = $xf("//div[@id='" + dmid2 + "']//table | //div[@id='" + dmid2 + "']//table[@class='tbg']");
			if (allyTable) {
				iHTML = allyTable.rows[0].cells[0].innerHTML;
				if (TB36.M35 == 2) {
					tbd = $xf("//td[@class='details']//table");
					if (tbd) allyName = tbd.rows[0].cells[1].textContent;
				} else allyName = allyTable.rows[3].cells[1].textContent;

				iHTML2 = iHTML.replace(allyName, "");
				allyTable.rows[0].cells[0].innerHTML = iHTML + " " + "<a href='" + crtPage + "'>" + allyName + "</a>";
			};
		};

		aTb = $g("member");
		if (!aTb) {a = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='6%']"); if (a) aTb = a.parentNode.parentNode;};
		if (aTb) {
			totP = 0;
			totV = 0;
			totalBullets = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""]]; //blue, green, yellow, red, grey
			boolMyAlly = true;
			for (var i = 1; i < aTb.rows.length; i++) {
				totP += parseInt(aTb.rows[i].cells[2].textContent);
				totV += parseInt(aTb.rows[i].cells[3].textContent);
				if (boolMyAlly) {
					if (aTb.rows[i].cells[4]) {
						imgBullet = aTb.rows[i].cells[4].firstChild;
						if (imgBullet.src.indexOf("x.gif") == -1) {
							xf = basename(imgBullet.src).replace("b", "").replace(".gif", "");
							j = parseInt(xf);
							totalBullets[j - 1][0] += 1;
							totalBullets[j - 1][1] = imgBullet.title;
						} else if (imgBullet.className.match(/online/)) {
							aClass = imgBullet.className;
							imgBullet.className.search(/(\d)/);
							j = RegExp.$1;
							totalBullets[j - 1][0] += 1;
							totalBullets[j - 1][1] = imgBullet.title;
						};
					} else boolMyAlly = false;
				};
			};
			popPerPlayer = Math.round(totP/(aTb.rows.length - 1));
			boolIsMyAlly = aTb.rows[1].cells.length == 5;

			trT = $r([['class', 'tb3r']]);
			trT.appendChild($c(T('TOTAL'), [['class', 'tb3chnb'], ["colspan", "2"]]));
			trT.appendChild($c(totP, [['class', 'tb3chnb'], ['style', 'text-align:center']]));
			trT.appendChild($c(totV, [['class', 'tb3chnb'], ['style', 'text-align:center']]));
			if (boolIsMyAlly) trT.appendChild($c("", [['class', 'tb3ch']]));
			aTb.appendChild(trT);

			//average population per member of aliance
			trAv = $r([['class', 'tb3r']]);
			trAv.appendChild($c(T('AVPPP'), [['class', 'tb3chnb'], ["colspan", "2"]]));
			trAv.appendChild($c(popPerPlayer, [['class', 'tb3chnb'], ["colspan", "2"], ['style', 'text-align:center']]));
			if (boolIsMyAlly) trAv.appendChild($c("", [['class', 'tb3chnb']]));
			aTb.appendChild(trAv);

			//average population per village
			trAv = $r([['class', 'tb3r']]);
			trAv.appendChild($c(T('AVPPV'), [['class', 'tb3chnb'], ["colspan", "2"]]));
			trAv.appendChild($c(Math.round(totP/totV), [['class', 'tb3chnb'], ["colspan", "2"], ['style', 'text-align:center']]));
			if (boolIsMyAlly) trAv.appendChild($c("", [['class', 'tb3chnb']]));
			aTb.appendChild(trAv);

			//number of bullets by type
			if (boolMyAlly) {
				rowBullets = $r([['class', 'tb3r']]);
				cellBullets = $c("", [['class', 'tb3chnb'], ['colspan', '5'], ['style', 'text-align:center']]);
				cBiHTML = "";
				addSpacer = " | ";
				for (var j = 0; j < 5; j++) {if (totalBullets[j][0] > 0) cBiHTML += "<img class='online" + (j + 1) + "' src='" + gIc["b" + (j+1)] + "' title='" + totalBullets[j][1] + "' alt='" + totalBullets[j][1] + "'> = &nbsp;" + totalBullets[j][0] + addSpacer + " ";};
				cellBullets.innerHTML = cBiHTML.substring(0, cBiHTML.length - 3);
				rowBullets.appendChild(cellBullets);
				aTb.appendChild(rowBullets);
			};
			totalBullets = null;
		};
	};

	function adjustTtT() {
		var aTb = $xf("//table[@class='build_details']");
		if (aTb) {
			aTb.rows[0].appendChild($c(gIc["clock"] + " & " + gIc["r5"]));
			for (var xi = 1; xi < aTb.rows.length; xi++) aTb.rows[xi].appendChild($c("", [['id', 'TtT_' + xi]]));
			aTb.id = "selecttraintroops";
		};
	};
	
	function adjustTiT() {
		var titTb = $xf("//table[starts-with(@class, 'under')]");
		if (titTb) {
			var csp = titTb.rows[titTb.rows.length - 1].cells[0].getAttribute("colspan");
			//log(3, "csp = " + csp);
			var aCell = $c(T('TOTTRTR') + " & " + gIc["r5"], [['class', 'tb3chnb'], ["colspan", csp], ['style', 'text-align:center;']]);
			var aRow = $r();
			aRow.appendChild(aCell);
			titTb.appendChild(aRow);
			
			var arrTiT = new Array;
			
			for (var xi = 1; xi < titTb.rows.length - 2; xi++) {
				var aInf = titTb.rows[xi].cells[0];
				var aImg = aInf.getElementsByTagName("IMG")[0];
				var aX = getTroopIndexTitleFromImg(aImg);
				var intNo = parseInt(aInf.textContent.replace(/\n/g, ""));
				gata = -1;
				for (var yi = 0; yi < arrTiT.length; yi++) {if (arrTiT[yi].tType == aX[0]) gata = yi;};
				if (gata > -1) arrTiT[gata].intNo += intNo; else {var aTiT = new yTiT(parseInt(aX[0]), parseInt(intNo), aX[1]); arrTiT[arrTiT.length] = aTiT;};
			};
			var TotCropCons = 0;
			var imgName;
			for (var xi = 0; xi < arrTiT.length; xi++) {
				TotCropCons += uc[arrTiT[xi].tType][9] * arrTiT[xi].intNo;//calculate the total crop consumtion for troops being trained		
				aRow = $r([['class', 'tb3rnb']]);
				if (TB36.T36 != false) imgName = 'class="unit u' + arrTiT[xi].tType + '" src="' + xGIF + '"'; else imgName = "src='" + gIc["u" + arrTiT[xi].tType] + "'";
				aRow.appendChild($c("<img " + imgName + ">", [['style', 'background-color:' + TB36.DFc[1] + '; border:0px none transparent;']]));
				aRow.appendChild($c(arrTiT[xi].strName, [['style', 'background-color:' + TB36.DFc[1] + '; border:0px none transparent; font-size:8pt;']]));
				aRow.appendChild($c(arrTiT[xi].intNo, [['style', 'background-color:' + TB36.DFc[1] + '; text-align:center; border:0px none transparent;']]));
				titTb.appendChild(aRow);
			};
			//crop consumption for training troops-matteo466
			var cRow = $r([['class', 'tb3rnb']]);
			cRow.appendChild($c(gIc["r5"] ,[["colspan", csp - 1], ['style', 'background-color:' + TB36.DFc[1] + '; border:0px none transparent;']]));
			cRow.appendChild($c(TotCropCons, [['style', 'background-color:' + TB36.DFc[1] + '; text-align:center; border:0px none transparent;']]));
			titTb.appendChild(cRow);
		};
	};
	
	function isThisTroopTrainingBuilding() {
		var retValue = false;
		var cValue = $xf("//input[starts-with(@name, 't')]", 'l');// | //input[starts-with(@name,'z')]");
		if (cValue.snapshotLength > 0) {
			var mValue = $xf("//td[@class='max']//a", 'l');
			var aValue = $xf("//div[@id='" + dmid2 + "']//img[starts-with(@class, 'unit')]");
			if (aValue) {
				for (var xi = 0; xi < cValue.snapshotLength; xi++) {
					var aInput = cValue.snapshotItem(xi);
					aInput.id = "inputTroopNo_" + (xi + 1);
					aInput.addEventListener("keyup", addTimeToTrainSelectedTroops, false);
					mValue.snapshotItem(xi).addEventListener("click", addTimeToTrainSelectedTroops, false);
				};
				adjustTtT();
				adjustTiT();
				retValue = true;
			};
		};
		return retValue;
	};

	function calculateResourceTime(need, pW, aLnk, cpB, ccB) {
		var maxTime = 0;
		var boolTb = false;
		var aTb = $t([['class', 'rNt'], ['style', 'width:' + pW + '%;']]);

		for (var i = 0; i < 4; i++){
			restante = parseInt(need[i]) - crtResUnits[i];
			var sfz = restante > 100000 ? 'font-size:6pt;' : '';
			if (restante > 0) {
				tiempo = -1;
				if (prodPerHour[i] != 0) tiempo = Math.round(restante / (prodPerHour[i] / 3600));
				if (tiempo < 0 || capacity[i] - parseInt(need[i]) < 0) {
					maxTime = 'Infinity';
					aCell = $c(gIc["r" + (i + 1)], [['class', 'center']]);
					bCell = $c(' ' + restante + ' ', [['id', 'timeout' + i], ['style', sfz]]);
					cCell = $c(' ' + T('NEVER') + ' ', [['style', sfz]]);
					boolTb = true;
				} else {
					if (tiempo > maxTime && maxTime !='Infinity') maxTime = tiempo;
					tiempo = formatTime(tiempo + 5, 0);
					aCell = $c(gIc["r" + (i + 1)], [['class', 'center']]);
					bCell = $c(' ' + restante +' ', [['id', 'timeout' + i], ['style', sfz]]);
					cCell = $c(' ' + tiempo + ' ', [['id', 'timeouta'], ['style', sfz]]);
					boolTb = true;
				};
				if (boolTb) {
					aRow = $r();
					aRow.appendChild(aCell);
					aRow.appendChild(bCell);
					aRow.appendChild(cCell);
					aTb.appendChild(aRow);
					aCell = null; bCell = null; cCell = null;
				};
			};
		};

		if (maxTime == 'Infinity'){
			xRow = $r();
			xRow.appendChild($c(T('LISTO'), [['colspan' ,"2"]]));
			xRow.appendChild($c(T('NEVER')));
			aTb.appendChild(xRow);
			boolTb = true;
		} else if (maxTime > 0) {
			tiempo2 = formatTime(maxTime + 5, 0); // a 5 seconds addition to compensate differences between JS timer and server
			aDate = new Date();
			aDate.setTime(aDate.getTime() + (maxTime * 1000));
			xRow = $r();
			txtDate = computeTextTime(aDate);
			xRow.appendChild($c(T('LISTO'), [['colspan', '2']]));
			xRow.appendChild($c(txtDate));
			aTb.appendChild(xRow);

			if (TB36.O[36] == '1') {
				//added by Velonis Petros - start of addition - the until then row
				uthen = new Array(4);//obtained until the max time
				//residue row
				residue = new Array(4);//obtained until the max time
				for (var i = 0; i < 4; i++) {uthen[i] = crtResUnits[i] + Math.round(maxTime*prodPerHour[i]/3600); residue[i] = uthen[i] - parseInt(need[i]);};
				uiHTML = createCRrows(T('RESOURCES') + " " + txtDate, uthen);
				riHTML = createCRrows(T('RESIDUE') + txtDate, residue);
				aTb.innerHTML += uiHTML;
				aTb.innerHTML += riHTML;
				//end of Velonis' addition
			};
			boolTb = true;
		};

		if (aLnk && boolTb == false) {
			var aRow = $r();
			aRow.appendChild($c('<a href="' + aLnk + '">' + T('EXTAV') + '</a>', [['class', 'center']]));
			aTb.appendChild(aRow);
			boolTb = true;
		};
		if (cpB && TB36.O[34] == '1') {aTb.appendChild(getCpcRow(cpB, "cp")); boolTb = true;};
		if (ccB && TB36.O[35] == '1') {aTb.appendChild(getCpcRow(ccB, "cc")); boolTb = true;};

		if (boolTb == true) return aTb; else return null;

		function getCpcRow(x, y) {
			var cxR = $r();
			switch (y) {case 'cp': strIn = T('CPPERDAY'); tColor = 'color:blue;'; break; case 'cc': strIn = gIc["r5"]; tColor = 'color:red;'; break;};
			cxR.appendChild($c(strIn + ": " + x[0] + " " + (docDir[0] == 'right' ? '←' : '→') + " " + x[1], [['class', 'center'], ['colspan', '3'], ['style', tColor]]));
			return cxR;
		};

		//added by Velonis Petros
		function createCRrows(aTitle, aV) {
			var cTb = $t();
			var xR = $r();
			xR.appendChild($c(aTitle, [['style', 'border-top:1px solid silver;'], ['colspan', '3']]));
			cTb.appendChild(xR);
			for (var i = 0; i < 4; i++) {
				var yR = $r();
				yR.appendChild($c(gIc["r" + (i + 1)], [['class', 'center']]));
				yR.appendChild($c(aV[i], [['colspan', '2']]));
				cTb.appendChild(yR);
			};
			return cTb.innerHTML;
		};
		//end of Velonis' addition
	};
	
	function addTimeToTrainSelectedTroops() {
		var aTb = $g("selecttraintroops");
		var arrInputs = $xf("//*[starts-with(@id, 'inputTroopNo_')]", 'l');
		var arrAddCells = $xf("//*[starts-with(@id, 'TtT_')]", 'l');
		var tCC = 0;
		var tTtT = 0;
		var sT = 0;
		var gHTML = '';
		for (var i = 0; i < arrInputs.snapshotLength; i++) {
			var vTtT = parseInt(arrInputs.snapshotItem(i).value);
			if (isNaN(vTtT)) vTtT = 0;
			if (!isNaN(vTtT)) {
				var bTb = $t([['class', 'tb3tbnb']]);
				var xCell = arrAddCells.snapshotItem(i);
				var xaRow = $r([['class', 'tb3rnb']]);
				var xbRow = $r([['class', 'tb3rnb']]);
				var tT = toSeconds(arrTtT[i].tTime) * vTtT;
				tTtT += tT;
				var xaCell = $c(formatTime(tT, 0), [['class', 'tb3cnb'], ['style', 'font-size:8pt;']]);
				tCC += uc[arrTtT[i].tType][9] * vTtT;
				var xbCell = $c(gIc["r5"] + " " + uc[arrTtT[i].tType][9] * vTtT, [['class', 'tb3cnb'], ['style', 'font-size:8pt;']]);
				xaRow.appendChild(xaCell);
				xbRow.appendChild(xbCell);
				xCell.innerHTML = '';
				bTb.appendChild(xaRow);
				bTb.appendChild(xbRow);
				xCell.appendChild(bTb);
				sT += parseInt(vTtT);

				imgName = 'class="unit u' + arrTtT[i].tType + '" src="' + xGIF + '"';
				if (TB36.T36 == false) imgName = "src='" + gIc["u" + arrTtT[i].tType] + "'";
				gHTML += "<img " + imgName + "> " + vTtT;
				if (i < arrInputs.snapshotLength - 1) gHTML += " | ";
				if (vTtT != 0) {
					var ix = $g('trNPC_' + (i + 1));
					if (ix) removeElement(ix);
					var ex = calculateResourceTime(arrayByN(arrTtT[i].aRes, vTtT), "100");
					if (ex) {
						$at(ex, [['id', 'trNPC_' + (i + 1)]]);
						var nC = aTb.rows[i + 1].cells.length;
						var xNode = (nC > 4 ? aTb.rows[i + 1].cells[1] : aTb.rows[i + 1].cells[0]);
						xNode.appendChild(ex);
					};
				};
			};
		};
		var aRow = $g('aRselecttraintroops');
		if (!aRow) {
			var csp = aTb.rows[0].cells[0].getAttribute("colspan");
			var aCell = $c("", [['id', 'gTtT'], ['colspan', csp]]);
			aRow = $r([['id', 'aRselecttraintroops']]);
			aRow.appendChild(aCell);
			aRow.appendChild($c(sT, [['id', 'sTtT']]));
			aRow.appendChild($c(""));
			aRow.appendChild($c("", [['id', 'tTtT']]));
			aTb.appendChild(aRow);
		} else {
			var aCell = $g("gTtT");
			if (aCell) aCell.innerHTML = '';
			var bCell = $g("sTtT");
			if (bCell) bCell.innerHTML = sT;
			var dCell = $g("tTtT");
			if (dCell) dCell.innerHTML = '';
		};
		//graphic of troops to be trained
		aCell.innerHTML = gHTML;
		//total cell
		var tTb = $t([['class', 'tb3tbnb']]);
		var taRow = $r([['class', 'tb3rnb']]);
		var tbRow = $r([['class', 'tb3rnb']]);
		var taCell = $c(formatTime(tTtT, 0), [['class', 'tb3cnb'], ['style', 'font-size:8pt;']]);
		var tbCell = $c(gIc["r5"] + " " + tCC, [['class', 'tb3cnb'], ['style', 'font-size:8pt;']]);
		taRow.appendChild(taCell);
		tbRow.appendChild(tbCell);
		tTb.appendChild(taRow);
		tTb.appendChild(tbRow);
		if (dCell) dCell.appendChild(tTb);
	};

	function addXYinMsg(iHTML) {
		var arXY = iHTML.match(/\((-?\d+)\s*[\|\,\s\/]\s*(-?\d+)\)/g);
		if (arXY) {
			for (var j = 0; j < arXY.length; j++) {
				var xy = arXY[j].replace(" ", "").replace(",", "|").replace(";", "|").replace("/", "|").replace("\\", "|");
				if (xy.indexOf("(") == 0 && xy.indexOf(")") != -1  && xy.indexOf("|") != -1) {
					xy = xy.replace("(", "").replace(")", "");
					var xy = xy.split("|");
					var idVillage = xy2id(xy[0], xy[1]);
					var villageLink = "<a href='karte.php?z=" + idVillage + "'>" + "( " + xy[0] + "|" + xy[1] + " )" + "</a>" +
					"&nbsp;<a href='a2b.php?z=" + idVillage + "'>" + gIc[getRPDefAction()] + "</a>" +
					"&nbsp;<a href='build.php?z=" + idVillage + "&gid=17'>" + gIc["r41"] + "</a>";
					iHTML = iHTML.replace(arXY[j], villageLink);
				};
			};
		};
		return iHTML;
	};

	function convertCoordsInMessagesToLinks() {
		try
		{
			var cM = $xf("//td[@background] | //div[@class='underline']");
			if (!cM) cM = $g('message');
			if (cM) cM.innerHTML = addXYinMsg(cM.innerHTML);			
		}
		catch (e){};
		try
		{
			var myNode = document.getElementsByTagName('div');
			var myre = new RegExp('\\b' + 'message' + '\\b');
			for(var i=0,j=myNode.length; i<j; i++) {
				if(myre.test(myNode[i].className)) {
					myNode[i].innerHTML = addXYinMsg(myNode[i].innerHTML);
					break;
				}
			}
		}
		catch (e){};
	};

	function setVillageRes(vID, vPop) {
		TB36.VillageRes = getGMcookieV2("VillageRes");
		if (TB36.VillageRes[vID] == undefined) TB36.VillageRes[vID] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		if (vPop != -1) TB36.VillageRes[vID][0] = vPop;
		if (vID == actV.vID) {for (var i = 0; i < 5; i++) {TB36.VillageRes[vID][i + 1] = prodPerHour[i];};};
		if (vPop == -1) {for (var i = 0; i < 4; i++) {TB36.VillageRes[vID][i + 6] = crtResUnits[i]; TB36.VillageRes[vID][i + 10] = capacity[i];};};
		setGMcookieV2("VillageRes", TB36.VillageRes[vID], vID);
	};

	function addPlayerStatistics() {
		var pName = getPlayerName();
		var uTb = $xf("//*[@id='profile'] | //div[@id='" + dmid2 + "']//table[@class='tbg']");
		if (uTb) uTb.rows[0].cells[0].innerHTML = uTb.rows[0].cells[0].innerHTML.replace(pName, "") +  "<a href='" + crtPage + "'>" + pName + "</a>";
		uTb = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg'][2]");
		if (!uTb) uTb = $g("villages");
		if (uTb) {
			var totV = uTb.rows.length - 2;
			var boolUpdate = crtPage.indexOf(spLnk) != -1;
			var totP = parsePlayerTable(uTb, boolUpdate);
			var csp = uTb.rows[2].cells.length - 2;
			//total row (population, villages)
			var trT = $r([['class', 'tb3rnb']]);
			trT.appendChild($c(T('TOTAL'), [['class', 'tb3chnb']]));
			trT.appendChild($c(totP, [['class', 'tb3chnb'], ['style', 'text-align:center;']]));
			trT.appendChild($c("", [['class', 'tb3chnb'], ['colspan', csp]]));
			uTb.appendChild(trT);
			//average population per village
			var trAv = $r([['class', 'tb3rnb']]);
			trAv.appendChild($c(T('AVPPV'), [['class', 'tb3chnb']]));
			trAv.appendChild($c(Math.round(totP/totV), [['class', 'tb3chnb'], ['style', 'text-align:center;']]));
			trAv.appendChild($c("", [['class', 'tb3chnb'], ['colspan', csp]]));
			uTb.appendChild(trAv);
			//move the "(capital)" string to the same line as the name of the capital
			var aSpan = getCapitalInfo();
			if (aSpan) {aSpan.style.cssFloat = ''; aSpan.style.display = ''; if (crtPage.indexOf(spLnk) != -1) setCapitalInfo(aSpan);};//save capital info
		};
		uTb = null;
	};

	function createTroopInfoTooltip(tt, tInfo) {
		return function() {
			cSt0 = 'padding:2px; font-size:8pt; ';
			cSt1 = cSt0 + 'text-align:' + docDir[0] + '; ';
			cSt2 = cSt0 + 'text-align:' + docDir[1] + '; ';
			cSt3 = 'border-' + docDir[1] + ':1px grey solid; ';
			cSt4 = 'border-bottom:1px grey solid;';
			imgSpeed = "speed" + docDir[0].substring(0,1);
			tSpeed = "-";
			aTb = $t([['class', 'tb3tbnb']]);
			if (tInfo[1] != "") {aRow1 = $r(); aRow1.appendChild($c(tInfo[1], [['style', 'text-align:center; font-size:8pt; font-weight:bold;'], ['colspan', '6']])); aTb.appendChild(aRow1);};
			aRow2 = $r();
			//attack power row
			aRow2.appendChild($c(gIc["att_all"], [['style', cSt1 + cSt4]]));
			aRow2.appendChild($c(uc[tInfo[0]][5], [['style', cSt2 + cSt4 + cSt3]]));
			//def power infantry row
			aRow2.appendChild($c(gIc["def_i"], [['style', cSt1 + cSt4]]));
			aRow2.appendChild($c(uc[tInfo[0]][6], [['style', cSt2 + cSt4 + cSt3]]));
			//def power cavalry row
			aRow2.appendChild($c(gIc["def_c"], [['style', cSt1 + cSt4]]));
			aRow2.appendChild($c(uc[tInfo[0]][7], [['style', cSt2 + cSt4]]));
			aTb.appendChild(aRow2);
			aRow3 = $r();
			//speed only for troops as animals do not move
			if (tInfo[0] < 31) {tSpeed = uc[tInfo[0]][8]; if (TB36.speed == true) tSpeed = tSpeed * 2;};
			aRow3.appendChild($c("<img src='" + image[imgSpeed] + "'>", [['style', cSt1]]));
			aRow3.appendChild($c(tSpeed, [['style', cSt2 + cSt3]]));
			//can carry
			aRow3.appendChild($c(gIc["capacity"], [['style', cSt1]]));
			aRow3.appendChild($c(uc[tInfo[0]][4], [['style', cSt2 + cSt3]]));
			//crop consumption
			aRow3.appendChild($c(gIc["r5"], [['style', cSt1]]));
			aRow3.appendChild($c(uc[tInfo[0]][9], [['style', cSt2]]));
			aTb.appendChild(aRow3);
			tt.innerHTML = "";
			tt.appendChild(aTb);
			tt.style.display = 'block';
			tt.style.zIndex = 20000;
		};
	};

	function showTroopInfoInTooltips() {
		var arImg = document.images;
		var aT = $g('tb_tooltip');
		if (!aT) aT = createTooltip();
		var tImg, tInfo, xR;
		for (var i = 0; i < arImg.length; i++) {
			tImg = arImg[i];
			tInfo = getTroopIndexTitleFromImg(tImg);
			if (tInfo[0] > 0 && tInfo[0] < 51) {
				if (tInfo[1] == '') {
					//for the dorf1.php page where there is no title attribute to the image
					xR = tImg.parentNode;
					if (xR) {if (xR.getAttribute("href")) {xR = xR.parentNode; if (xR) xR = xR.parentNode;} else xR = xR.parentNode; if (xR) {try {tCell = xR.cells[2]; if (tCell) tInfo[1] = tCell.textContent;} catch(e) {};};};
				};
				tImg.removeAttribute('title');
				tImg.addEventListener("mouseover", createTroopInfoTooltip(aT, tInfo), 0);
				tImg.addEventListener("mouseout", function() {aT.style.display = 'none';}, 0);
			};
		};
		arImg = null; tImg = null; tInfo = null; xR = null;
	};

	function addSelectAllCheckbox(intRows, mrTable) {
		//check for the "s10" element to avoid double checkbox
		if (!$g("s10")) {
			var sAC = mrTable.rows[intRows - 1].cells[0];
			var sACS = sAC.getAttribute("colspan");
			if (sACS) {
				if (sACS == "2") {
					$at(sAC, [['colspan', '1']]);
					sAC.removeAttribute('class');
					if (TB36.T36 == false) {bCell = $c(sAC.innerHTML, [['style', 'text-align:' + docDir[0] + ';']]);} else {bCell = $e("TH", sAC.innerHTML); $at(bCell, [['class', 'buttons']]);};
					insertAfter(sAC, bCell);
				};
			};
			sAC.innerHTML = '<input id="s10" name="s10" onclick="Allmsg(this.form);" style="vertical-align:bottom;" type="checkbox">';
			//now append the archive button if necessary
			if (!TB36.plAc) {
				var bRow = mrTable.rows[intRows - 1].cells[1];
				if (bRow) {
					var bRiHTML = bRow.innerHTML;
					if (TB36.T36 == false) {
						if (bRiHTML.toUpperCase().indexOf("ARCHIVE") == -1) bRow.innerHTML += '<input class="std" type="submit" name="archive" value="' + T('ARCHIVE') + '"/></input>';
					} else {
						if (bRiHTML.toUpperCase().indexOf("BTN_ARCHIV") == -1) bRow.innerHTML += '&nbsp;&nbsp;<input id="btn_archiv" class="dynamic_img" type="image" src="' + xGIF + '" alt="' + T('ARCHIVE') + '" name="archive" value="' + T('ARCHIVE') + '"/></input>';
					};
				};
			};
			sAC = null; sACS = null; bRow = null; bRiHTML = null;
		};
	};

	function createDelRepTable(arA) {
		var delTb = $t([['id', 'delreptable']]);
		var iMax = (arA.length > 5 ? 5 : arA.length);
		var tRow = $r([['class', 'rh']]);
		var tCell = $c(T('MTCL'), [['class', 'cc'], ['colspan', iMax]]);
		tRow.appendChild(tCell);
		var bRow = $r([['class', 'rh']]);
		var cRow = $r();
		var bTitle = null;
		for (var i = 0; i < iMax; i++) {
			bTitle = arA[i].firstChild.nodeValue;
			bCell = $c(bTitle, [['class', 'cc']]);
			bRow.appendChild(bCell);
			cLink = $a("", [['href', jsVoid]]);
			cLink.appendChild($img([['src', image["bDel"]], ['title', T('DEL') + " " + bTitle]]));
			cLink.addEventListener('click', delete10Reports(i, arA), false);
			cCell = $c("");
			cCell.appendChild(cLink);
			cRow.appendChild(cCell);
		};
		delTb.appendChild(tRow);
		delTb.appendChild(bRow);
		delTb.appendChild(cRow);
		iMax = null; tRow = null;; tCell = null; bRow = null; cRow = null; bTitle = null;
		return delTb;
	};

	function searchRepTable()  {
		var sdvs = $e("P", T("FINDREP") + " : ");
		var cLink2 = $a(gIc["iReport iReport2"]+"&nbsp;", [['href', jsVoid],['title',T("IREPORT2")]]);
		var cLink3 = $a(gIc["iReport iReport3"]+"&nbsp;", [['href', jsVoid],['title',T("IREPORT3")]]);
		var cLink4 = $a(gIc["iReport iReport7"]+"&nbsp;", [['href', jsVoid],['title',T("IREPORT7")]]);
		var cLink5 = $a(gIc["iReport iReport5"]+"&nbsp;", [['href', jsVoid],['title',T("IREPORT5")]]);
		var cLink6 = $a(gIc["iReport iReport6"]+"&nbsp;", [['href', jsVoid],['title',T("IREPORT6")]]);
		var cLink7 = $a([T("ALL")], [['href', jsVoid],['title',T("ALL")]]);
		
		cLink2.addEventListener('click', searchReports("iReport iReport2"), false);
		cLink3.addEventListener('click', searchReports("iReport iReport3"), false);
		cLink4.addEventListener('click', searchReports("iReport iReport7"), false);
		cLink5.addEventListener('click', searchReports("iReport iReport5"), false);
		cLink6.addEventListener('click', searchReports("iReport iReport6"), false);
		cLink7.addEventListener('click', searchReports(T("ALL")), false);

		sdvs.appendChild(cLink2);
		sdvs.appendChild(cLink3);
		sdvs.appendChild(cLink4);
		sdvs.appendChild(cLink5);
		sdvs.appendChild(cLink6);
		sdvs.appendChild(cLink7);
		return sdvs;
	};
	
	function searchReports(ser)	{
		return function() {
			var urlRep  = addQueryParameter("/berichte.php?t=3",'s','0');
			setGMcookie("reportsTOSearch", ser, false);
			location.href = urlRep;
			return false;
		};
	};

	function delete10Reports(i, arA) {
		return function() {
			setGMcookie("reportsPageToDelete", arA[i].href, false);
			setGMcookie("reportsPageToReturnTo", crtPage, false);
			setGMcookie("reportsDeleteAll", "1", false);
			location.href = arA[i].href;
		};
	};

	function MessageOptions(){
		if (crtPage.indexOf("nachrichten.php") != -1) {
			genLink = "nachrichten.php?s=";
			archLink = ' | <a href="nachrichten.php?t=3">' + T('ARCHIVE') + '</a>';
			//code provided by rtellezi for enabling sending message by pressing the CTRL+ENTER keys.
			//modified by ms99 to apply only to the "igm" textarea
			if (document.evaluate) {arrInp = $xf("//textarea[@id='igm']", 'l'); for (var i = 0; i < arrInp.snapshotLength; i++) {tx = arrInp.snapshotItem(i); tx.addEventListener("keydown", sendMessage, 0);};};
		} else if (crtPage.indexOf("berichte.php") != -1) {
			genLink = "berichte.php?s=";
			archLink = ' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>';
		};
		if ($g("adressbuch") || $g("adbook")) return;
		topMenu = $xf("//p[@class='txt_menue']");
		if (!topMenu) topMenu = $g('textmenu');
		if (document.evaluate) {
			arrInp = $xf("//textarea[@id='igm']", 'l');
			for (var i = 0; i < arrInp.snapshotLength; i++) {tx = arrInp.snapshotItem(i); tx.addEventListener("keydown", sendMessage, 0);};
			navLinks = $xf("//div[@id='" + dmid2 + "']//a[contains(@href, 'berichte.php?s=')] | //div[@id='" + dmid2 + "']//a[contains(@href, 'nachrichten.php?s=')]", 'l');
			if (navLinks.snapshotLength > 0) document.addEventListener("keydown", navToPage, 0);
		};
		//add the Archive option to the menu if PLUS not available and if the Archive link is not already present (added by other scripts)
		if (!TB36.plAc) {
			if (topMenu) {
				tMiHTML = topMenu.innerHTML.split("|");
				bAddArchL = false;
				if (genLink.indexOf("nachrichten.php") != -1 && tMiHTML.length < 4) bAddArchL = true;
				if (genLink.indexOf("berichte.php") != -1 && tMiHTML.length < 6) bAddArchL = true;
				if (bAddArchL == true) topMenu.innerHTML += archLink;
			};
		};
		if (crtPage.indexOf("berichte.php") != -1 && crtPage.indexOf("&id=") == -1 && topMenu) {
			var arrMLinks = $xf("//p[@class='txt_menue']//a | //div[@id='textmenu']//a", 'l');
			if (TB36.O[61] == '1') {
				var aLinks = new Array();
				for (var i = 0; i < arrMLinks.snapshotLength; i++) {aLinks[i] = arrMLinks.snapshotItem(i);};
				var delTb = createDelRepTable(aLinks);
				var lastDiv = $g(dmid2);
				if (lastDiv) {var newPar = $e("P", ""); insertAfter(lastDiv.lastChild, searchRepTable()); insertAfter(lastDiv.lastChild, newPar); newPar.appendChild(delTb);};
			};
		};
		if (crtPage.indexOf("?newdid=") != -1 && crtPage.indexOf("&id=") != -1) return;
		//general variables needed for this function
		var mrTable;
		mrTable = $g("overview");
		if (!mrTable) {mrTable = $xf("//table[@class='reports std'] | //table[@class='tbg']"); mrTable.id = "overview";};
		addSelectAllCheckbox(mrTable.rows.length, mrTable);
		deleteReports();
		searchingReports();
		//get the number of pages to preload from server
		intMRP = parseInt(TB36.O[59]) + 1;
		if (intMRP > 5) intMRP = 4;
		var pageNo1 = crtPage.indexOf("?s=");
		var intPage = 0;
		if (pageNo1 != -1) {var pageNoS1 = crtPage.substring(pageNo1 + 3); intPage = Math.round(parseInt(pageNoS1) / 10);};
		if (intMRP > 1) {
			for (var i = 1; i < intMRP; i++) {setTimeout(createMrPreloadFunc(i + intPage), getRndTime(i * 498));};
			var X2 = (intMRP + intPage) * 10;
			var X1 = (intPage - intMRP) * 10;
			var addLink = (crtPage.indexOf("t=") != -1 ? "&" + crtPage.substr(crtPage.indexOf("t="),3) : "");
			var tdbfLinks = mrTable.rows[mrTable.rows.length - 1].cells[2];
			if (tdbfLinks) {
				//var aSpan;
				if (X1 < 0) {var aSpan = $e("SPAN", "«");$at(aSpan, [['class', 'c'], ["style", "font-weight:bold;"]]);} else var aSpan = $a("« ", [['style', 'font-weigth:bold'], ['href', genLink + X1 + addLink]]);
				var fwLink = $a("»&nbsp;", [['style', 'font-weight:bold'], ['href', genLink + X2 + addLink]]);
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			};
			aSpan = null;
		};
		//code provided by rtellezi for sending message by pressing CTRL+ENTER
		//modified by ms99 to work only on the form action='nachrichten.php' and form name='msg'
		function sendMessage(event) {if (event.keyCode == 13 && event.ctrlKey) {var mF = $xf("//form[@name='msg']"); if (mF) mF.submit();}; return;};

		function navToPage(event) {
			var evCode = event.keyCode;
			if (evCode == 37) {
				for (var i = 0; i < navLinks.snapshotLength; i++) {if (navLinks.snapshotItem(i).textContent == "«") location.href = navLinks.snapshotItem(i).href; break;};
			} else if (evCode == 39) {
				for (var i = 0; i < navLinks.snapshotLength; i++) {if (navLinks.snapshotItem(i).textContent == "»") location.href = navLinks.snapshotItem(i).href; break;};
			};
			evCode = null;
			return;
		};

		function createMrPreloadFunc(page) {var aX = (crtPage.indexOf("t=") != -1 ? "&" + crtPage.substr(crtPage.indexOf("t="), 3) : ""); return function() {ajaxRequest(genLink + (page * 10) + aX, "GET", null, processMrPage, dummy);};};

		function processMrPage(ajaxResp) {
			var ad = ajaxNDV2(ajaxResp);
			var aTb = $xf("//table[@id='overview'] | //table[@class='reports std'] | //table[@class='tbg']", 'f', ad);
			if (aTb) {
				var maxR = aTb.rows.length;
				var mrTb = $g("overview");
				var mrFoot = mrTb.tFoot;
				if (!mrFoot) {var lastRow = mrTb.rows[mrTb.rows.length - 1]; removeElement(lastRow);};
				if (maxR > 3) {
					xBody = mrTb.tBodies[0];
					var oFrg = null;
					if (xBody) oFrg = document.createDocumentFragment();
					for (var xi = 1; xi < maxR - 1; xi++) {
						var aRow = aTb.rows[xi];
						var xRow = $r();
						var noC = aRow.cells.length;
						if (noC > 1) {
							for (var yi = 0; yi < noC; yi++) {
								var xCell = $c(aRow.cells[yi].innerHTML);
								if (TB36.T36 == true) xCell.className = aRow.cells[yi].className;
								var iHTML = xCell.innerHTML;
								if (iHTML.indexOf("spieler.php") != -1) {
									var aNode = xCell.childNodes[0];
									xCell.className = 'topic';
									if (aNode.href.search(/spieler.php\?uid=(\d+$)/) > 0) {uid = RegExp.$1; insertUserLinks(aNode, uid, aNode.textContent);};
								};
								if (TB36.O[60] == "1" && (iHTML.indexOf("nachrichten.php?id=") != -1 || iHTML.indexOf("berichte.php?id=") != -1)) addMrInPopup(xCell.childNodes[0]);
								if (yi == 1) {
									$at(xCell, [['style', 'text-align:' + docDir[0] + ';']]);
									if (TB36.TB35 == false) $at(xCell, [['class', 's7']]);
								};
								xRow.appendChild(xCell);
							};
							if (oFrg) oFrg.appendChild(xRow); else mrTb.appendChild(xRow);
						};
					};
					if (oFrg) xBody.appendChild(oFrg);
				};
				if (!mrFoot) mrTb.appendChild(lastRow);
			};
		};
	};

	function deleteReports() {
		var bDR = getGMcookie("reportsDeleteAll", false);
		if (bDR != '1') return;
		if (getGMcookie("reportsPageToDelete", false) == '') return;
		if (crtPage.indexOf("berichte.php") != -1) {
			pauseScript(500);
			allCB = $xf("//input[@type='checkbox' and not (@id)]", 'l');
			btnSa = document.getElementsByName("s10");
			bDel = document.getElementsByName("del");
			if (!bDel) bDel = $g("btn_delete");
			if (allCB.snapshotLength > 0 && btnSa && bDel) {
				//now delete the reports without checking the correct address of the reports page
				btnSa[0].click();
				pauseScript(500);
				bDel[0].click();
			} else {
				setGMcookie("reportsDeleteAll", "0", false);
				setGMcookie("reportsPageToDelete", '', false);
			};
		} else {
			setGMcookie("reportsDeleteAll", "0", false);
			setGMcookie("reportsPageToDelete", '', false);
		};
	};

	function searchingReports()	{
		var bSR = getGMcookie("reportsTOSearch", false);
		if (bSR == '')	return;
		if (bSR == 'false') return;
		
		if (crtPage.indexOf("berichte.php") != -1) {
			pauseScript(200);
			var tbO = document.getElementById("overview");
			tbR = tbO.getElementsByTagName('img');
			
			if (bSR == T("ALL"))	{
				var tbRrex1 = new RegExp("\\biReport iReport2\\b");
				for(var i = 0;i< tbR.length; i++)	{
					if( tbRrex1.test(tbR[i].className))	{
						setGMcookie("reportsTOSearch", '', false);
						return;
					};
				};
				
				var tbRrex2 = new RegExp("\\biReport iReport3\\b");
				for(var i = 0;i< tbR.length; i++)	{
					if( tbRrex2.test(tbR[i].className))	{
						setGMcookie("reportsTOSearch", '', false);
						return;
					};
				};
				
				
				var tbRrex3 = new RegExp("\\biReport iReport7\\b");
				for(var i = 0;i< tbR.length; i++)	{
					if( tbRrex3.test(tbR[i].className))	{
						setGMcookie("reportsTOSearch", '', false);
						return;
					};
				};

				var tbRrex4 = new RegExp("\\biReport iReport5\\b");
				for(var i = 0;i< tbR.length; i++)	{
					if( tbRrex4.test(tbR[i].className))	{
						setGMcookie("reportsTOSearch", '', false);
						return;
					};
				};
				
				var tbRrex5 = new RegExp("\\biReport iReport6\\b");
				for(var i = 0;i< tbR.length; i++)	{
					if( tbRrex5.test(tbR[i].className))	{
						setGMcookie("reportsTOSearch", '', false);
						return;
					};
				};

			}else{
				var tbRrex = new RegExp('\\b' + bSR + '\\b');
				for(var i = 0;i< tbR.length; i++)	{
					if( tbRrex.test(tbR[i].className))	{
						setGMcookie("reportsTOSearch", '', false);
						return;
					};
				};
			};

			bSR = getGMcookie("reportsTOSearch", false);
			//alert(bSR);
			if(bSR != '' && !bSR != 'false')	{
				//alert('ddd');
				var s = parseInt(getQueryParameters(crtPage, 's'));
				//alert(s);
				var tbA = tbO.getElementsByTagName('a');
				for(var i = 0; i< tbA.length; i++)	{
					var ss = getQueryParameters(tbA[i].href, 's');
					if(ss && parseInt(ss) > s)	{
						var urlRep  = addQueryParameter("/berichte.php?t=3",'s',ss);
						window.location = urlRep;
					};
				};
			};

		};
	};

	function getMerchantsInformation() {
		//get the current capacity of the merchants for this village
		var mCc = getGMcookieV2("merchantscapacity");
		if (mCc && mCc[actV.vID]) TB36.Mcap = parseInt(mCc[actV.vID]);
		t['MERCHANTS'] = getGMcookie("merchantsName", false);
		if (t['MERCHANTS'] == "false") t['MERCHANTS'] = '';
		mCc = null;
	};

	function getStatisticsMenu() {
		var arS = new Array();
		var tM = $xf("//div[@id='" + dmid2 + "']//p//a | //div[@id='" + dmid2 + "']//div[@id='textmenu']//a | //p[@class='txt_menue']//a", 'l');
		var im = 0;
		var aLnk, aX;
		if (tM.snapshotLength > 0) {
			for (var xi = 0; xi < tM.snapshotLength; xi++) {
				arS[0] = tM.snapshotItem(xi).text;
				aLnk = tM.snapshotItem(xi).href;
				arS[1] = aLnk.substring(aLnk.lastIndexOf("/"));
				aX = arS[1].split("=");
				im = (aX.length > 1 ? parseInt(aX[1]) : 1);
				setGMcookieV2('statistics', arS, im);
			};
		};
		tM = $xf("//div[@class='sub']//a | //div[@id='submenu']//a", 'l');
		if (tM.snapshotLength > 0) {
			for (var i = 0; i < tM.snapshotLength; i++) {
				arS[0] = tM.snapshotItem(i).title;
				aLnk = tM.snapshotItem(i).href;
				arS[1] = aLnk.substring(aLnk.lastIndexOf("/"));
				im = parseInt(arS[1].split("=")[1]);
				setGMcookieV2('statistics', arS, im);
			};
		};
		aLnk = null; arS = null; aX = null; tM = null;
	};

	function showSearchBar() {
		if (TB36.O[32] != "1") return;
		sbc = getGMcookieV2('statistics');
		if (!sbc || !sbc[1]) return;
		var aForm = createSearchForm(sbc);
		if (TB36.O[33] == '1') {
			if (TB36.O[74] == '0') aForm.style.display = 'none';
			var xy = TB36.O[79].split("|");
			TB36.nTASb = $df(300, xy[0], xy[1], "?", "searchbar", "searchbarTT", true);
			TB36.nTASb.appendChild(aForm);
		} else $g(dlright1).insertBefore(aForm, $g(dlright1).firstChild);
	};

	function createSearchForm(sbc) {
		var aSF = $e("FORM");
		$at(aSF, [['id', 'searchform'], ['action', 'statistiken.php?id=' + TB36.O[83]], ['method', 'POST'], ['style', 'padding:1px; border:0px solid #C0C0C0; width:250px;']]);
		var aPar = $e("P", "");
		aPar.setAttribute('style', 'margin-top:20px;');
		var i1 = $e("INPUT", "");
		$at(i1, [['id', 'searchopt'], ['type', 'hidden'], ['value', TB36.O[83]]]);
		var i2 = $e("INPUT", "");
		$at([['type', 'text'], ['maxlength', '20'], ['size', '10'], ['value', ''], ['style', 'font-size:8pt; margin:2px;']]);
		var i3 = $e("INPUT", "");
		$at(i3, [['type', 'submit'], ['name', 'submit'], ['value', '?'], ['style', 'font-size:8pt']]);
		if (TB36.M35 == 2) {i2.name = 'name'; i2.className = 'text name';} else if (TB36.M35 == 1) {i2.name = 'name'; i2.className = "spieler fm";} else if (TB36.T36 == false) {i2.name = 'spieler'; i2.className = 'fm f80';};
		var s1 = $e("SELECT", "");
		s1.id = 'searchtype';
		s1.setAttribute('style', 'font-size:8pt; margin:2px;');
		s1.options[0] = new Option(sbc[1][0], 1, false, iSS(1000));
		s1.options[1] = new Option(sbc[2][0], 2, false, iSS(2));
		s1.options[2] = new Option(sbc[4][0], 4, false, iSS(4));
		s1.options[3] = new Option(sbc[31][0], 31, false, iSS(31));
		s1.options[4] = new Option(sbc[32][0], 32, false, iSS(32));
		if (TB36.T36 != false && sbc[8]) s1.options[5] = new Option(sbc[8][0], 8, false, iSS(8));
		s1.addEventListener('change', setSearchBarOption, false);
		if (TB36.O[33] == '1') aSF.appendChild(aPar);
		aSF.appendChild(i1);
		aSF.appendChild(i2);
		aSF.appendChild(s1);
		aSF.appendChild(i3);
		return aSF;
		
		function iSS(opt) {return opt == parseInt(TB36.O[83]) ? true : false;};
		function setSearchBarOption() {
			var searchType = $g("searchtype").value;
			TB36.O[83] = '' + searchType;
			setGMcookieV2('TB3Setup', TB36.O, 'SETUP');
			var i1 = $g("searchopt");
			if (i1) i1.value = searchType;
			var aSF = $g("searchform");
			if (aSF && TB36.T36 == true) aSF.action = 'statistiken.php?id=' + searchType;
			i1 = null; aSF = null;
		};
	};

	function setGMcookieV2(aName, aValue, newdid) {
		if (newdid == 0 || !TB36.UserID || parseInt(TB36.UserID) == 0) return;
		var nC = composeGMcookieNameV2(aName);
		var cV = getGMcookieV2(aName);
		if (cV == 'false' | cV == false) cV = {};
		cV[newdid] = aValue;
		if (aValue) GM_setValue(nC, uneval(cV)); else GM_setValue(nC, false);
	};

	function getArrBiP() {
		var arrBiP = new Array();
		var rV = null;	
		var divName = "building_contract";
		var dlB = $g(divName);
		var dEnd, tdD, tdDS;
		if (!dlB) {divName = divName = "building_contract2"; dlB = $g(divName); if (!dlB) {divName = "lbau1"; dlB = $g(divName); if (!dlB) {divName = "lbau2"; dlB = $g(divName);};};};
		if (dlB) {
			var BiPtb = $xf("//div[@id='" + divName + "']//table | //div[@id='" + dmid1 + "']//table[@id='" + divName + "']");
			for (xi = 0; xi < BiPtb.rows.length; xi++) {
				if (BiPtb.rows[xi].cells.length > 1)	{
					tdD = BiPtb.rows[xi].cells[2];
					tdDS = tdD.getElementsByTagName("SPAN")[0];
					dEnd = new Date();
					dEnd.setTime(dEnd.getTime() + toSeconds(tdDS.textContent) * 1000);
					arrBiP[arrBiP.length] = new xBiP(BiPtb.rows[xi].cells[1].textContent.split(" ("), dEnd.getTime());
				};
			};
			rV = arrBiP;
		};
		setGMcookieV2('BiP', arrBiP, actV.vNewdid);
		arrBiP = null; divName = null; dlB = null; BiPtb = null; dEnd = null; tdD = null; tdDS = null;
		return rV;
	};
	
	function fillinwarsim() {
		if (TB36.O[55] != '1') return;
		var aTb = $xf("//table[@id='attacker'] | //table[@class='fill_in']");
		if (!aTb) return;
		TB36.hOffBonus = getGMcookie("heroV", false);
		if (TB36.hOffBonus == "false") {setGMcookie("heroV", "0", false); TB36.hOffBonus = 0;};
		tTc = getGMcookieV2("Troops");
		if (tTc && tTc[actV.vNewdid]) eT = tTc[actV.vNewdid]; else return;
		var aI = aTb.getElementsByTagName("INPUT");
		if (aI.length > 0) {
			j = 1;
			for (var i = 0; i < aI.length; i++) {
				if (aI[i].name == "a1_" + j) {
					//only the troop number input fields
					aI[i].value = (eT[j - 1] > 0 ? eT[j - 1] : "");
					j += 1;
				} else if (aI[i].name == "ew1") aI[i].value = TB36.AVP; else if (aI[i].name = "h_off_bonus" & aI[i].value != "") aI[i].value = TB36.hOffBonus;
			};
		};
		aTb = null; aI = null;
	};
	
	//© Copyright 2007 Richard Laffers (http://userscripts.org/scripts/show/35277)
	//Start of Drag-n-drop
	var mouseOffset = null;
	var iMouseDown = false;
	var lMouseState = false;
	var dragObject = null;
	var curTarget = null;

	function mouseCoords(ev) {return {x:ev.pageX, y:ev.pageY};};
	function getMouseOffset(target, ev){var docPos = getPosition(target); var mousePos = mouseCoords(ev); return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};};
	function mouseDown(ev){var target = ev.target; iMouseDown = true; if (target.getAttribute('DragObj')) return false;};

	function getPosition(e) {
		var dx = 0;
		var dy = 0;
		while (e.offsetParent){
			dx += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
			dy += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
			e = e.offsetParent;
		};
		dx += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		dy  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		return {x:dx, y:dy};
	};

	function mouseMove(ev) {
		var target = ev.target;
		var mousePos = mouseCoords(ev);
		if (dragObject) {
			oSpos = dragObject.style.position;
			dragObject.style.position = 'absolute';
			dragObject.style.top = (mousePos.y - mouseOffset.y) + 'px';
			dragObject.style.left = (mousePos.x - mouseOffset.x) + 'px';
			dragObject.style.position = oSpos;
		};
		lMouseState = iMouseDown;
		return false;
	};

	function mouseUp(ev){
		if (dragObject) {
			var dOx = dragObject.style.left;
			var dOy = dragObject.style.top;
			var strXY = (dOx + "|" + dOy).replace("px", '').replace("px", '');
			switch (dragObject.id) {
				case "resbarTT": TB36.O[75] = strXY; break;
				case "userbookmarksTT": TB36.O[76] = strXY; break;
				case "noteblockTT": TB36.O[77] = strXY; break;
				case "vl2tableTT": TB36.O[78] = strXY; break;
				case "searchbarTT": TB36.O[79] = strXY; break;
				case "resupgTT": TB36.O[88] = strXY; break;
				case "bupgTT": TB36.O[89] = strXY; break;
				case "mapTableTT": TB36.O[90] = strXY; break;
			};
			setGMcookieV2('TB3Setup', TB36.O, 'SETUP');
		};
		dragObject = null;
		iMouseDown = false;
	};

	function makeDraggable(parent, item){
		document.addEventListener('mousemove', mouseMove, false);
		document.addEventListener('mousedown', mouseDown, false);
		document.addEventListener('mouseup', mouseUp, false);
		if (!parent || !item) return;
		item.addEventListener('mousedown',function(ev){
			dragObject = parent;
			mouseOffset = getMouseOffset(parent, ev);
			document.body.appendChild(parent);
			return false;
		}, false);
	};
	//End of Drag-n-drop

	//script runtime
	function showTBTotalRuntime(){
		var aD = $xf("//div[starts-with(@id, 'ltime')]/br");
		if (aD) {
			var imgDN = $xf("//img[starts-with(@class, 'time_of_day')]");
			if (imgDN) {var nimgDN = imgDN.cloneNode(true); imgDN.parentNode.removeChild(imgDN); nimgDN.style.top = '10px';};
			TB36.TBEndTime = new Date().getTime();
			var tt = $e('span', '');
			if (nimgDN) tt.appendChild(nimgDN);
			tt.appendChild($e("TEXTNODE", " | "));
			tt.appendChild($a(TB36.shN, [['href', TB36.usoA], ['target', '_blank'], ['title', T('SCRPURL')], ['style', 'font-size:8pt; font-weight:bold; color:#3333FF']]));
			tt.appendChild($e("TEXTNODE", "&nbsp;(v"));
			var tu = $a(TB36.version, [['href', jsVoid], ['title', T('CHKSCRV')], ['style', 'font-size:8pt; font-weight:bold; color:#3333FF']]);
			tu.addEventListener('click', function() {updScript()}, false);
			tt.appendChild(tu);
			tt.appendChild($e("TEXTNODE", ') retraso: <b>' + TB36.TBTRT() + '</b> ms'));
			if (TB36.T36 == false || TB36.M35 != 2) tt.appendChild($e("TEXTNODE", ' | (' + (TB36.T36 == false ? "T3" : "T36") + "-" + TB36.M35 + ")")); //info GV
			$at(tt, [['style', 'z-index:2000; color:#000000; width:450px']]);
			aD.parentNode.insertBefore(tt, aD);
			aD.parentNode.style.backgroundColor = "#0";
			aD = null; tt = null; ta = null; sDN = null;
		};
	};
	
	//General actions
	setDefLang();
	getGeneralData();
	if (!crtPage.match(/nachrichten/)) {var aI = $xf("//input[@type!='hidden']"); if (aI) aI.focus();};//PepiX
	
	if (TB36.U[0] == '' || TB36.U[2] == '' || TB36.U[3] == '' || TB36.U[4] == '' || TB36.U[6] == '' || crtPage.indexOf('spieler.php') != -1) getSpielerInfo();
	if (TB36.U[5] == '') getSingleTownNewdid();
	
	if (crtPage.match(/statistiken.php/)) getStatisticsMenu();
	if (!crtPage.match(/karte2.php/)) {
		hideAd(); toJSvoid(); showBigIconsBar(); showDeleteAccount(); leftMenuLinks(); getRace(); addFillTimeRow(); getCrtLocation(); prepareDivDocking(); villageList();
		if (TB36.plAc == false && vNames != '') addVillageNamesScript();
		show2ndVillageList(); showResBarTooltip(); showUserBookmarks(); showNoteBlock(); showHeroStatus();
		if (!crtPage.match(/karte.php/)) {TB36.boolIsThisNPC = isThisNPC(); TB36.boolIsNPCExluded = isThisNPCexcluded(); if (TB36.boolIsThisNPC == true) fillinNPCfields(urlNow);};
	};
	//Actions for specific pages
	if (crtPage.match(/allianz.php/)) allyCalculation();
	if (crtPage.match(/karte.php\?/) && crtPage.match(/d=/)) addTroopTimes();
	if (crtPage.match(/build.php/))	{setTroopsNPC(); TB36.isTtB = isThisTroopTrainingBuilding(); TimeToExplore(); quickCity(); getMerchantsInformation(); if (isMarketSend() == true) marketSend(); marketSell();};
	if (crtPage.match(/build.php\?(.*)&t=1/)) {addAllyColumnForMarketOffers(); marketBuy();};
	if (crtPage.match(/dorf1/)) {processDorf1(); addAttDefInfoTable();};
	if (crtPage.match(/a2b\.php($|\?newdid=|\?z=)/)) selectAllTroops();//Send troops page
	if (crtPage.match(/dorf2/) || crtPage.match(/build.php\?newdid=/)) processDorf2();
	if (crtPage.match(/a2b.php/)) {quickCity(); defaultAttackType();showLastAttack();};
	if (crtPage.match(/dorf3.php($|\?newdid=(\d+)$)/) || crtPage.match(/dorf3.php/)) processDorf3();
	if (crtPage.match(/build.php\?(.*)&s=2/)) culturePoints();
	if (crtPage.match(/karte.php($|\?z=|\?new)/) || crtPage.match(/karte.php($|\?newdid=(\d+)$)/)) mapFunctions();
	if (crtPage.match(/gid=16/) || crtPage.match(/\?id=39/)) tableTotalVillageTroopsV3();
	if (crtPage.match(/nachrichten.php($|\?t=|\?s=|\?newdid=)/) || crtPage.match(/berichte.php($|\?t=|\?s=|\?newdid=)/)) MessageOptions();
	if (crtPage.match(/nachrichten.php\?/)) convertCoordsInMessagesToLinks();
	if (crtPage.match(/berichte.php\?/)) battleReportV2("orig");
	if (crtPage.match(/spieler.php\?/) && crtPage.match(/uid/)) addPlayerStatistics();
	if (TB36.boolIsNPCExluded == false) NPCUpdate();
	if (isPostNPC()) insertNPCHistoryLink();
	if (crtPage.match(/warsim.php/)) fillinwarsim();

	//General actions continued
	setTimers();
	if ((crtPage.match(/gid=16/) || crtPage.match(/\?id=39/)) && TB36.O[80] == '1') showTroopInfoInTooltips();
	if (!crtPage.match(/gid=16/) && !crtPage.match(/\?id=39/) && TB36.O[53] == '1') showTroopInfoInTooltips();
	showSearchBar();
	if (!crtPage.match(/\&t=1/)) playerLinks(dmid2);
	playerLinks("llist");
	showTBTotalRuntime();
};

window.addEventListener('load', functionMain, false);
document.body.setAttribute("onbeforeunload", '{t = null; bCost = null; uc = null; image = null; TB36 = null; wsAnalyser = null; mapAnalyser = null; repSite = null; crtResUnits = null; capacity = null; prodPerHour = null; timeToFill = null; gIc = null; vList = null; acss = null;}');

function appendSumRow(dataArray, activeCellArray, elm)
{
	var sumRow = document.createElement("tr");
	var dotTD = document.createElement("td");
	dotTD.className = "dot";
	dotTD.innerHTML = "●";
	
	var headerTD = document.createElement("td");
	headerTD.colSpan = "2";
	headerTD.innerHTML = "Total: ";
	headerTD.style.fontWeight="bold";
	sumRow.appendChild(dotTD);
	sumRow.appendChild(headerTD);
	
	for(var iSum = 3; iSum < dataArray.length; iSum++)
	{
		var sumTD = document.createElement("td");
		var imgTD = document.createElement("td");

		if(activeCellArray[iSum])
		{
			if(activeCellArray[iSum].nodeName && activeCellArray[iSum].nodeName == "IMG")
			{
				var node = activeCellArray[iSum].cloneNode(true);
				logMe("Image: " + node);
				sumTD.appendChild(node);
			}
			else
			{
				sumTD.innerHTML = ""+dataArray[iSum];
				if(dataArray[iSum] < 0) sumTD.style.color="red";
			}
		}
		sumRow.appendChild(sumTD);
	}
	
	
	elm.insertBefore(sumRow, elm.firstChild);
}

function logMe(data)
{
	// unsafeWindow.console.log(data);
	GM_log(data);
}

function initArray(count)
{
	var theArray = new Array(count);
	for(var i = 0; i < count; i++) theArray[i] = 0;
	return theArray;
}

function parseResources()
{
	var vList = document.getElementById('vlist');
	var rows = vList.rows.length;
	
	var valArray = null;
	var sumArray = null;
	var activeCellArray = null;
	
	var longestRow = 0;
	for(var i = 0; i < rows; i++)
	{
		longestRow = Math.max(vList.rows[i].cells.length, longestRow);
	}
	
	valArray = initArray(longestRow);
	sumArray = initArray(longestRow);
	activeCellArray = initArray(longestRow);
	
	
	var rowsWithValues = initArray(rows);

	for(var i = 0; i < rows; i++)
	{
		var row = vList.rows[i];
		for(var j = 0; j < row.cells.length; j++)
		{
			var cell = row.cells[j];
			var val = parseInt(cell.innerHTML);
			
			if(!isNaN(val)) 
			{
				if(val > 0) rowsWithValues[i] = 1;
				sumArray[j] += val;
				activeCellArray[j]++;
			}
		}
	}
	
	for(var i = 0; i < rows; i++)
	{
		if(rowsWithValues[i] <= 0) continue;

		logMe("Fetching Images from Row " + i);

		var row = vList.rows[i];
		for(var j = 0; j < row.cells.length-1; j++)
		{
			var cell = row.cells[j];
			var img = cell.getElementsByTagName("IMG")[0];
			
			if(activeCellArray[j+1] > 0 && cell.firstChild.nodeName != "A" && img)
			{
				activeCellArray[j] = img;
			}
		}
	}
	
	var tBody = vList.getElementsByTagName("tbody")[0];
	appendSumRow(sumArray, activeCellArray, tBody);
}

function sumUp(inputArray, sumArray)
{
	if(sumArray.length != inputArray.length) throw "Array length must match";
	for(var i=0; i < inputArray.length; i++) 
	{
		sumArray[i] += inputArray[i];
	}
	return sumArray;
}

function svqFunctionMainTR()
{
	parseResources();
}

window.addEventListener('load', svqFunctionMainTR, false);
