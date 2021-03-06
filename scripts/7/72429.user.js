//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Base Uploader - Commander Effect
// @description   Shows The Effect Commanders Have On Capacity & Base Pages
// @include       *.astroempires.com/*
// @exclude       *.astroempires.com/home.aspx*
// @exclude       *.astroempires.com/login.aspx*
// @exclude       forum.astroempires.com/*
// @exclude       support.astroempires.com/*
// @exclude       wiki.astroempires.com/*
// @exclude       wiki.astroempires.com/*/*
// @exclude       *.astroempires.com/upgrade.aspx*
// @exclude       *.astroempires.com/tables.aspx*
// @exclude       *.astroempires.com/register.aspx*
// @exclude       *.astroempires.com/smilies.aspx*
// ==/UserScript==


//================================================================
//==================START COMMANDER EFFECT========================
//================================================================

//GLOBAL FUNCTIONS
function addCommanderValue(CommanderArray, fieldHTML, totalArray){
	CommanderLevel = CommanderArray[1];
	fieldValue = fieldHTML.innerHTML.split("(")[0];
	commanderEffValue = fieldValue / ((100-CommanderLevel)/100);
	fieldHTML.innerHTML = fieldHTML.innerHTML + "<font color='orange'>{"+Math.round(commanderEffValue)+"}";
	fieldHTML.setAttribute("sorttable_customkey", Math.round(commanderEffValue));
	totalArray[CommanderArray[0]] = totalArray[CommanderArray[0]] + Math.round(commanderEffValue);
}


//Empire Capacity Function
function calculateEmpireCapacities(){
var baserows = document.evaluate( "//table[@class='layout listing sorttable']//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 

var Totals = [];
Totals['Production'] = 0;
Totals['Construction'] = 0;

i=0;
var baseRow = baserows.snapshotItem(i);

//Helper function
function addNormalProduction(){
	Totals['Production'] = Totals['Production'] + Math.round(baseRow.childNodes[5].innerHTML.split("(")[0]);
}
//Helper function
function addNormalConstruction(){
	Totals['Construction'] = Totals['Construction'] + Math.round(baseRow.childNodes[4].innerHTML.split("(")[0]);

}


while(baseRow){	
	if(baseRow.innerHTML.indexOf("map.aspx?loc=") != -1){

		commanderHTML = baseRow.childNodes[7].innerHTML;
		CommanderArray = [];
		if(commanderHTML.indexOf("<small>") != -1){


			commanderHTML  = commanderHTML .split("<small>")[1].split("<\/small>")[0];
			CommanderArray = commanderHTML .split(" ");
		} else {
			CommanderArray = null;
		}
		if(CommanderArray){
			if(CommanderArray[0] == "Production"){
				fieldHTML = baseRow.childNodes[5];
				addNormalConstruction();
				addCommanderValue(CommanderArray, fieldHTML, Totals)
			} else if(CommanderArray[0] == "Construction"){
				fieldHTML = baseRow.childNodes[4];
				addNormalProduction();
				addCommanderValue(CommanderArray, fieldHTML, Totals)
			} else { //Research or other commander;
				addNormalProduction();
				addNormalConstruction();
			}
		} else { // No Commander
			addNormalProduction();
			addNormalConstruction();
		}
	}
	i++;
	baseRow = baserows.snapshotItem(i);
}
var sumHTMLCon = document.evaluate("td[4]", baserows.snapshotItem(baserows.snapshotLength-1), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);	
var sumHTMLProd = document.evaluate("td[5]", baserows.snapshotItem(baserows.snapshotLength-1), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);	
sumHTMLProd.innerHTML = sumHTMLProd .innerHTML +"<font color='orange'>("+Math.round(Totals['Production'])+")";
sumHTMLCon.innerHTML = sumHTMLCon.innerHTML +"<font color='orange'>("+Math.round(Totals['Construction'])+")";
}

//Base commander function
function calculateBaseCommanderEffect(){
	var commanderHTML = document.evaluate( "//table[@class='base']//tr[2]//td[@align='center']//small", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(commanderHTML.snapshotLength == 0)
		commanderHTML = document.evaluate( "//td[@class='astro-details_box-status-center box-status-center']//small", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(commanderHTML.snapshotLength == 0)
		return;
	commanderHTML = commanderHTML.snapshotItem(0).innerHTML;
	commanderHTML  = commanderHTML.split("(")[1].split(")")[0];
	CommanderArray = commanderHTML.split(" ");
	

	//Construction, Production and Research Commander
	capacityHTML = document.evaluate("//table[@class='layout listing3']//tr[@align='center']//td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i=0; i < capacityHTML .snapshotLength-1; i++){
		rowHTML = capacityHTML.snapshotItem(i).innerHTML;
		if(rowHTML == CommanderArray[0])
		{
			fieldHTML = capacityHTML.snapshotItem(i+1);
			addCommanderValue(CommanderArray, fieldHTML, [])
			break;
		}
	}

	//Logistic Commander
	buildings = document.evaluate("//table[@id='base_resume-structures']//table[@class='layout']//tr[@align='center']//td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	type = buildings.snapshotItem(2).innerHTML;
	level = buildings.snapshotItem(3);
	if(type.indexOf("Jump Gate")!=-1 && CommanderArray[0]=="Logistics"){
		types = type.split("<br>")
		levels = level.innerHTML.split("<br>")
		i = 0;
		while(types[i]!="Jump Gate" && i < types.length)
		i++;
		jglevel = parseInt(levels[i]);
		clevel = parseInt(CommanderArray[1]);
		ed = (1/(jglevel+1)*(100-clevel)/100)
		jg = (1/ed)-1
		jg = Math.round(jg*100)/100

		levels[i] = levels[i]+"<font color='orange'>("+jg+")</font>";
		s = ""
		y=0
		while(levels[y] != "" && y < levels.length)
			{
   		 	s+= levels[y]+"<br>"
   		 	y++;
			}
		level.innerHTML = s;
	}
	
	

}
if (location.href.indexOf('empire.aspx?view=bases_capacities')!=-1) {
	calculateEmpireCapacities();
} else if (location.href.indexOf('base.aspx')!=-1) {
if (location.search.indexOf('structures')==-1)
	calculateBaseCommanderEffect();
}

//================================================================
//====================END COMMANDER EFFECT========================
//================================================================