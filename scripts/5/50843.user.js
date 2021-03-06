// WooHoo! My first script!
// ==UserScript==
// @name          Pbp Shot Analysis
// @namespace     http://courtrivals.com
// @description   Gives the breakdown of shot types by player
// @include       http://www.courtrivals.com/viewRecap.php?gid=*
// ==/UserScript==

var playername = new Array();
//var playername = new Array("Rex Mashburn","Dribbles McGee","Smokes McKenzie","Seamus McNasty","Lamar Money Mundane","Howie Neckbeard","Bobby Rainmaker","Brock Shothouse","Thor Vander Geldt","Max Zamphirescu","William Wallace","James Caine","Chris Hansen","Place Holder","Larry Lobster","Officer Bates","Michael-Larry Jabbar","Mike Carey","Snicker Doodle","Carlos Washington");
//var playername = new Array( "Hakeem .", "Pops Mensah-Bonsu", "Lucas Ray" , "Kevin Wall", "Lee Humpty-Dumpty", "Erick Strickland", "I . Am . Legend", "George Mikan", "Toney McCray", "Mitsui Hisashi");
var dsmade=new Array(), laymade=new Array(), hkmade=new Array(), jmphkmade=new Array(), runjmade=new Array(), turnmade=new Array(), bankmade=new Array(), jumpermade=new Array(), thrmade=new Array();
var dsmiss=new Array(), laymiss=new Array(), hkmiss=new Array(), jmphkmiss=new Array(), runjmiss=new Array(), turnmiss=new Array(), bankmiss=new Array(), jumpermiss=new Array(), thrmiss=new Array();
var dstot= new Array(), laytot= new Array(), hktot= new Array(), jmphktot= new Array(), runjtot= new Array(), turntot =new Array(), banktot= new Array(), jumpertot= new Array(), thrtot =new Array();
var alltot= new Array(), allmade= new Array();
var gameid, boxlink, pid = new Array(), teamlink = new Array(), teamname = new Array(), playerlink = new Array();
var index = 0, end = 1, k, str, str2;

var Links = document.evaluate(
		 '//a[@href]',
		 document,
		 null,
		 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		 null);

	for(var i=0; i< Links.snapshotLength; i++) {
		boxlink = String(Links.snapshotItem(i));
		if(boxlink.indexOf("showBoxscore.php?gid=")>=0) {
		    gameid = boxlink.slice(boxlink.indexOf('=')+1 , boxlink.length);
		    i = Links.snapshotLength+1;
		}
	}
	var j=0;
	var end=1;
	for(var i=0; i<Links.snapshotLength; i++){
		teamlink[j] = String(Links.snapshotItem(i));
		if(teamlink[j].indexOf("showTeamProfile.php?tid=")>=0){
		j++
		}
	}


GM_xmlhttpRequest(
{
    method: 'GET',
    url: boxlink,
    headers:
    {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails)
    {   

        reference = responseDetails.responseText;
	wait();

    }
});

function wait()
{
    if(reference != undefined)
    {
        getPlayerIds(reference);
    }
    else
    {
        window.setTimeout( function()
        {
            wait();
        }, 500);
    }
}


function getPlayerIds(reference)
{
	
	var k=0;
	var pp = "showPlayerProfile";
	var str = reference.slice(reference.indexOf(pp) +10, reference.length);
	while(k<20){
	    if( str.indexOf(pp) >=0 )
	    {
	        pid[k] = str.slice( str.indexOf(pp), str.indexOf(pp)+50);
		pid[k] = pid[k].slice( 0 , pid[k].indexOf('">'));
		playerlink[k] = "http://www.courtrivals.com/" + pid[k];
		k++;
		str = str.slice( str.indexOf(pp) +10, str.length);
	    }
	}
	getNames();
}



function getNames(){
GM_xmlhttpRequest(
{
    method: 'GET',
    url: teamlink[0],
    headers:
    {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails)
    {   

        reference = responseDetails.responseText;
	waitTeam1();
	
    }
});

function waitTeam1()
{
    if(reference != undefined)
    {
        getPlayerNamesTeam1(reference);
    }
    else
    {
        window.setTimeout( function()
        {
            wait();
        }, 500);
    }
}




function getPlayerNamesTeam1(){
	var srchstr = '<td colspan="2" background="images/wood-header-bg.jpg" bgcolor="#660000" class="tableHeader">'
	teamname[0] = reference.slice( reference.indexOf(srchstr)+80, reference.indexOf(srchstr)+200);
	teamname[0] = teamname[0].slice( teamname[0].indexOf('>') + 1, teamname[0].indexOf('<'));
	for( i=0; i<10; i++){
	playername[i] = reference.slice( reference.indexOf('#EDEDDC"><a href="' + pid[i]) + 43, reference.indexOf('#EDEDDC"><a href="' + pid[i]) +100);
	playername[i] = playername[i].slice( playername[i].indexOf( ">")+1, playername[i].indexOf( "<"));
	//alert(playername[i]);
	}

	getNames2();
}
}

function getNames2(){
GM_xmlhttpRequest(
{
    method: 'GET',
    url: teamlink[2],
    headers:
    {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails)
    {   

        reference = responseDetails.responseText;
	waitTeam2();
	theRest();

    }
});

function waitTeam2()
{
    if(reference != undefined)
    {
        getPlayerNamesTeam2(reference);
    }
    else
    {
        window.setTimeout( function()
        {
            wait();
        }, 500);
    }
}

function getPlayerNamesTeam2(){
	var srchstr = '<td colspan="2" background="images/wood-header-bg.jpg" bgcolor="#660000" class="tableHeader">'
	teamname[2] = reference.slice( reference.indexOf(srchstr)+80, reference.indexOf(srchstr)+200);
	teamname[2] = teamname[2].slice( teamname[2].indexOf('>') + 1, teamname[2].indexOf('<'));
	for( i=10; i<20; i++){
	playername[i] = reference.slice( reference.indexOf('#EDEDDC"><a href="' + pid[i]) + 43, reference.indexOf('#EDEDDC"><a href="' + pid[i]) +100);
	playername[i] = playername[i].slice( playername[i].indexOf( ">")+1, playername[i].indexOf( "<"));
	//alert(playername[i]);
	}
}
}


function theRest()
{



var pbptext, t, x=0;

for(var i = 0; i < 20; i++)
{
	dsmade[i] = 0;
	dsmiss[i] = 0;
	laymade[i] = 0;
	laymiss[i] = 0;
	hkmade[i] = 0;
	hkmiss[i] = 0;
	jmphkmade[i] = 0;
	jmphkmiss[i] = 0;
	runjmade[i] = 0;
	runjmiss[i] = 0;
	turnmade[i] = 0;
	turnmiss[i] = 0;
	bankmade[i] = 0;
	bankmiss[i] = 0;
	jumpermade[i] = 0;
	jumpermiss[i] = 0;
	thrmade[i] = 0;
	thrmiss[i] = 0;
	dstot[i] = 0;
	laytot[i] = 0;
	hktot[i] = 0;
	jmphktot[i] = 0;
	runjtot[i] = 0;
	turntot[i] = 0;
	banktot[i] = 0;
	jumpertot[i] = 0;
	thrtot[i] = 0;
}

pbptext = document.evaluate(
    "//span",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);


function retrieve(playername, num)
{
	for(var i=0; i< pbptext.snapshotLength; i++) {
		t = pbptext.snapshotItem(i);
		if(t.innerHTML.indexOf(playername)>=0) {
		    t = pbptext.snapshotItem(i);
		    if( t.innerHTML.indexOf('dunk shot: made')>=0){
			dsmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('dunk shot: missed')>=0){
			dsmiss[num]++;
		    }
		    if( t.innerHTML.indexOf('lay up: made')>=0){
			laymade[num]++;
		    }
		    else if( t.innerHTML.indexOf('lay up: missed')>=0){
			laymiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('jump hook shot: made')>=0){
			jmphkmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('jump hook shot: missed')>=0){
			jmphkmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('hook shot: made')>=0){
			hkmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('hook shot: missed')>=0){
			hkmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('running jump shot: made')>=0){
			runjmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('running jump shot: missed')>=0){
			runjmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('turnaround jumper: made')>=0){
			turnmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('turnaround jumper: missed')>=0){
			turnmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('bank shot: made')>=0){
			bankmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('bank shot: missed')>=0){
			bankmiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('jump shot: made')>=0){
			jumpermade[num]++;
		    }
		    else if( t.innerHTML.indexOf('jump shot: missed')>=0){
			jumpermiss[num]++;
		    }
		    else if( t.innerHTML.indexOf('3pt shot: made')>=0){
			thrmade[num]++;
		    }
		    else if( t.innerHTML.indexOf('3pt shot: missed')>=0){
			thrmiss[num]++;
		    }
		}
	}
}

var a = 20;
for(var i = 0; i < a; i++)
{
	retrieve(playername[i], i);
}

for(var i = 0; i < 20; i++)
{
	dstot[i] = dsmiss[i] + dsmade[i];
	laytot[i] = laymiss[i] + laymade[i];
	hktot[i] = hkmiss[i] + hkmade[i];
	jmphktot[i] = jmphkmiss[i] + jmphkmade[i];
	runjtot[i] = runjmiss[i] + runjmade[i];
	turntot[i] = turnmiss[i] + turnmade[i];
	banktot[i] = bankmiss[i] + bankmade[i];
	jumpertot[i] = jumpermiss[i] + jumpermade[i];
	thrtot[i] = thrmiss[i] + thrmade[i];
	allmade[i]= dsmade[i]+ laymade[i]+ hkmade[i]+ jmphkmade[i]+ runjmade[i]+ turnmade[i]+ bankmade[i]+ jumpermade[i]+ thrmade[i];
	alltot[i] = dstot[i] + laytot[i] + hktot[i] + jmphktot[i] + runjtot[i] + turntot[i] + banktot[i] + jumpertot[i] + thrtot[i];
}

for(var i = 0; i < 20; i++)
{
	if(dstot[i] == 0)
	{
		dstot[i] = "";
	}
	else
	{
		dstot[i] = dsmade[i] + '/' + dstot[i];
	}

	if(laytot[i] == 0)
	{
		laytot[i] = "";
	}
	else
	{
		laytot[i] = laymade[i] + '/' + laytot[i];
	}

	if(hktot[i] == 0)
	{
		hktot[i] = "";
	}
	else
	{
		hktot[i] = hkmade[i] + '/' + hktot[i];
	}

	if(jmphktot[i] == 0)
	{
		jmphktot[i] = "";
	}
	else
	{
		jmphktot[i] = jmphkmade[i] + '/' + jmphktot[i];
	}

	if(runjtot[i] == 0)
	{
		runjtot[i] = "";
	}
	else
	{
		runjtot[i] = runjmade[i] + '/' + runjtot[i];
	}

	if(turntot[i] == 0)
	{
		turntot[i] = "";
	}
	else
	{
		turntot[i] = turnmade[i] + '/' + turntot[i];
	}

	if(banktot[i] == 0)
	{
		banktot[i] = "";
	}
	else
	{
		banktot[i] = bankmade[i] + '/' + banktot[i];
	}

	if(jumpertot[i] == 0)
	{
		jumpertot[i] = "";
	}
	else
	{
		jumpertot[i] = jumpermade[i] + '/' + jumpertot[i];
	}

	if(thrtot[i] == 0)
	{
		thrtot[i] = "";
	}
	else
	{
		thrtot[i] = thrmade[i] + '/' + thrtot[i];
	}

	if(alltot[i] == 0)
	{
		alltot[i] = "";
	}
	else
	{
		alltot[i] = allmade[i] + '/' + alltot[i];
	}
}


for( i=0; i<20; i++)
{
	if( i<5 || i>9 && i<15){
    	    playerlink[i] = '<strong><a href=' + playerlink[i] + '>' + playername[i] + '</a></strong>';
	}
	else {
	    playerlink[i] = '<a href=' + playerlink[i] + '>' + playername[i] + '</a>';
	}
}


//var pbptbl;
var divider = document.createElement('div'), divider2 = document.createElement('div');
divider.setAttribute( 'class', 'news');
divider.innerHTML = '<div>&nbsp;</div>';
divider2.innerHTML = '<div>&nbsp;</div>';

/*pbptbl = document.evaluate(
    "//td[@class='loginBottomText']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);*/

var tbl = document.createElement("table");
tbl.setAttribute('width', '100%');
tbl.innerHTML='<table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#000000">'+
'<tr><td bgcolor="#000080" colspan="11" class="tableHeader2">' + teamname[0] + '</td></tr>' +
'<tr height="40" class="loginBottomText"><td bgcolor="#C6C6A8"><strong>Name</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Dunks</strong></td> <td bgcolor="#C6C6A8" width ="40"><strong>Layups</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Hookshots</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Jump Hooks</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Turnaround Jumpers</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Bank shots</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Running Jumpers</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Jumpshots</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>3Pt Shots</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>All Shots</strong></strong></td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[0] + '<td bgcolor="#F1E7C5">' + dstot[0] + '</td> <td bgcolor="#F1E7C5">' + laytot[0] + '</td> <td bgcolor="#F1E7C5">' + hktot[0] + '</td><td bgcolor="#F1E7C5">' + jmphktot[0] + '</td><td bgcolor="#F1E7C5">' + turntot[0] + '</td><td bgcolor="#F1E7C5">' + banktot[0] + '</td><td bgcolor="#F1E7C5">' + runjtot[0] + '</td><td bgcolor="#F1E7C5">' + jumpertot[0] + '</td><td bgcolor="#F1E7C5">' + thrtot[0] + '</td><td bgcolor="#F1E7C5">' + alltot[0] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[1] + '<td bgcolor="#F1E7C5">' + dstot[1] + '</td> <td bgcolor="#F1E7C5">' + laytot[1] + '</td> <td bgcolor="#F1E7C5">' + hktot[1] + '</td><td bgcolor="#F1E7C5">' + jmphktot[1] + '</td><td bgcolor="#F1E7C5">' + turntot[1] + '</td><td bgcolor="#F1E7C5">' + banktot[1] + '</td><td bgcolor="#F1E7C5">' + runjtot[1] + '</td><td bgcolor="#F1E7C5">' + jumpertot[1] + '</td><td bgcolor="#F1E7C5">' + thrtot[1] + '</td><td bgcolor="#F1E7C5">' + alltot[1] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[2] + '<td bgcolor="#F1E7C5">' + dstot[2] + '</td> <td bgcolor="#F1E7C5">' + laytot[2] + '</td> <td bgcolor="#F1E7C5">' + hktot[2] + '</td><td bgcolor="#F1E7C5">' + jmphktot[2] + '</td><td bgcolor="#F1E7C5">' + turntot[2] + '</td><td bgcolor="#F1E7C5">' + banktot[2] + '</td><td bgcolor="#F1E7C5">' + runjtot[2] + '</td><td bgcolor="#F1E7C5">' + jumpertot[2] + '</td><td bgcolor="#F1E7C5">' + thrtot[2] + '</td><td bgcolor="#F1E7C5">' + alltot[2] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[3] + '<td bgcolor="#F1E7C5">' + dstot[3] + '</td> <td bgcolor="#F1E7C5">' + laytot[3] + '</td> <td bgcolor="#F1E7C5">' + hktot[3] + '</td><td bgcolor="#F1E7C5">' + jmphktot[3] + '</td><td bgcolor="#F1E7C5">' + turntot[3] + '</td><td bgcolor="#F1E7C5">' + banktot[3] + '</td><td bgcolor="#F1E7C5">' + runjtot[3] + '</td><td bgcolor="#F1E7C5">' + jumpertot[3] + '</td><td bgcolor="#F1E7C5">' + thrtot[3] + '</td><td bgcolor="#F1E7C5">' + alltot[3] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[4] + '<td bgcolor="#F1E7C5">' + dstot[4] + '</td> <td bgcolor="#F1E7C5">' + laytot[4] + '</td> <td bgcolor="#F1E7C5">' + hktot[4] + '</td><td bgcolor="#F1E7C5">' + jmphktot[4] + '</td><td bgcolor="#F1E7C5">' + turntot[4] + '</td><td bgcolor="#F1E7C5">' + banktot[4] + '</td><td bgcolor="#F1E7C5">' + runjtot[4] + '</td><td bgcolor="#F1E7C5">' + jumpertot[4] + '</td><td bgcolor="#F1E7C5">' + thrtot[4] + '</td><td bgcolor="#F1E7C5">' + alltot[4] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[5] + '<td bgcolor="#F1E7C5">' + dstot[5] + '</td> <td bgcolor="#F1E7C5">' + laytot[5] + '</td> <td bgcolor="#F1E7C5">' + hktot[5] + '</td><td bgcolor="#F1E7C5">' + jmphktot[5] + '</td><td bgcolor="#F1E7C5">' + turntot[5] + '</td><td bgcolor="#F1E7C5">' + banktot[5] + '</td><td bgcolor="#F1E7C5">' + runjtot[5] + '</td><td bgcolor="#F1E7C5">' + jumpertot[5] + '</td><td bgcolor="#F1E7C5">' + thrtot[5] + '</td><td bgcolor="#F1E7C5">' + alltot[5] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[6] + '<td bgcolor="#F1E7C5">' + dstot[6] + '</td> <td bgcolor="#F1E7C5">' + laytot[6] + '</td> <td bgcolor="#F1E7C5">' + hktot[6] + '</td><td bgcolor="#F1E7C5">' + jmphktot[6] + '</td><td bgcolor="#F1E7C5">' + turntot[6] + '</td><td bgcolor="#F1E7C5">' + banktot[6] + '</td><td bgcolor="#F1E7C5">' + runjtot[6] + '</td><td bgcolor="#F1E7C5">' + jumpertot[6] + '</td><td bgcolor="#F1E7C5">' + thrtot[6] + '</td><td bgcolor="#F1E7C5">' + alltot[6] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[7] + '<td bgcolor="#F1E7C5">' + dstot[7] + '</td> <td bgcolor="#F1E7C5">' + laytot[7] + '</td> <td bgcolor="#F1E7C5">' + hktot[7] + '</td><td bgcolor="#F1E7C5">' + jmphktot[7] + '</td><td bgcolor="#F1E7C5">' + turntot[7] + '</td><td bgcolor="#F1E7C5">' + banktot[7] + '</td><td bgcolor="#F1E7C5">' + runjtot[7] + '</td><td bgcolor="#F1E7C5">' + jumpertot[7] + '</td><td bgcolor="#F1E7C5">' + thrtot[7] + '</td><td bgcolor="#F1E7C5">' + alltot[7] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[8] + '<td bgcolor="#F1E7C5">' + dstot[8] + '</td> <td bgcolor="#F1E7C5">' + laytot[8] + '</td> <td bgcolor="#F1E7C5">' + hktot[8] + '</td><td bgcolor="#F1E7C5">' + jmphktot[8] + '</td><td bgcolor="#F1E7C5">' + turntot[8] + '</td><td bgcolor="#F1E7C5">' + banktot[8] + '</td><td bgcolor="#F1E7C5">' + runjtot[8] + '</td><td bgcolor="#F1E7C5">' + jumpertot[8] + '</td><td bgcolor="#F1E7C5">' + thrtot[8] + '</td><td bgcolor="#F1E7C5">' + alltot[8] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[9] + '<td bgcolor="#F1E7C5">' + dstot[9] + '</td> <td bgcolor="#F1E7C5">' + laytot[9] + '</td> <td bgcolor="#F1E7C5">' + hktot[9] + '</td><td bgcolor="#F1E7C5">' + jmphktot[9] + '</td><td bgcolor="#F1E7C5">' + turntot[9] + '</td><td bgcolor="#F1E7C5">' + banktot[9] + '</td><td bgcolor="#F1E7C5">' + runjtot[9] + '</td><td bgcolor="#F1E7C5">' + jumpertot[9] + '</td><td bgcolor="#F1E7C5">' + thrtot[9] + '</td><td bgcolor="#F1E7C5">' + alltot[9] + '</td></tr>'+
'</table>';


var tbl2 = document.createElement("table");
tbl2.setAttribute('width', '100%');
tbl2.innerHTML='<table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#000000">'+
'<tr><td bgcolor="#800000" colspan="11" class="tableHeader2">' + teamname[2] + '</td></tr>' +
'<tr height="40" class="loginBottomText"> <td bgcolor="#C6C6A8">Name</td><td bgcolor="#C6C6A8" width ="40"><strong>Dunks</strong></td> <td bgcolor="#C6C6A8" width ="40"><strong>Layups</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Hookshots</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Jump Hooks</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Turnaround Jumpers</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Bank shots</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Running Jumpers</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>Jumpshots</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>3Pt Shots</strong></td><td bgcolor="#C6C6A8" width ="40"><strong>All Shots</strong></td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[10] + '<td bgcolor="#F1E7C5">' + dstot[10] + '</td> <td bgcolor="#F1E7C5">' + laytot[10] + '</td> <td bgcolor="#F1E7C5">' + hktot[10] + '</td><td bgcolor="#F1E7C5">' + jmphktot[10] + '</td><td bgcolor="#F1E7C5">' + turntot[10] + '</td><td bgcolor="#F1E7C5">' + banktot[10] + '</td><td bgcolor="#F1E7C5">' + runjtot[10] + '</td><td bgcolor="#F1E7C5">' + jumpertot[10] + '</td><td bgcolor="#F1E7C5">' + thrtot[10] + '</td><td bgcolor="#F1E7C5">' + alltot[10] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[11] + '<td bgcolor="#F1E7C5">' + dstot[11] + '</td> <td bgcolor="#F1E7C5">' + laytot[11] + '</td> <td bgcolor="#F1E7C5">' + hktot[11] + '</td><td bgcolor="#F1E7C5">' + jmphktot[11] + '</td><td bgcolor="#F1E7C5">' + turntot[11] + '</td><td bgcolor="#F1E7C5">' + banktot[11] + '</td><td bgcolor="#F1E7C5">' + runjtot[11] + '</td><td bgcolor="#F1E7C5">' + jumpertot[11] + '</td><td bgcolor="#F1E7C5">' + thrtot[11] + '</td><td bgcolor="#F1E7C5">' + alltot[11] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[12] + '<td bgcolor="#F1E7C5">' + dstot[12] + '</td> <td bgcolor="#F1E7C5">' + laytot[12] + '</td> <td bgcolor="#F1E7C5">' + hktot[12] + '</td><td bgcolor="#F1E7C5">' + jmphktot[12] + '</td><td bgcolor="#F1E7C5">' + turntot[12] + '</td><td bgcolor="#F1E7C5">' + banktot[12] + '</td><td bgcolor="#F1E7C5">' + runjtot[12] + '</td><td bgcolor="#F1E7C5">' + jumpertot[12] + '</td><td bgcolor="#F1E7C5">' + thrtot[12] + '</td><td bgcolor="#F1E7C5">' + alltot[12] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[13] + '<td bgcolor="#F1E7C5">' + dstot[13] + '</td> <td bgcolor="#F1E7C5">' + laytot[13] + '</td> <td bgcolor="#F1E7C5">' + hktot[13] + '</td><td bgcolor="#F1E7C5">' + jmphktot[13] + '</td><td bgcolor="#F1E7C5">' + turntot[13] + '</td><td bgcolor="#F1E7C5">' + banktot[13] + '</td><td bgcolor="#F1E7C5">' + runjtot[13] + '</td><td bgcolor="#F1E7C5">' + jumpertot[13] + '</td><td bgcolor="#F1E7C5">' + thrtot[13] + '</td><td bgcolor="#F1E7C5">' + alltot[13] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[14] + '<td bgcolor="#F1E7C5">' + dstot[14] + '</td> <td bgcolor="#F1E7C5">' + laytot[14] + '</td> <td bgcolor="#F1E7C5">' + hktot[14] + '</td><td bgcolor="#F1E7C5">' + jmphktot[14] + '</td><td bgcolor="#F1E7C5">' + turntot[14] + '</td><td bgcolor="#F1E7C5">' + banktot[14] + '</td><td bgcolor="#F1E7C5">' + runjtot[14] + '</td><td bgcolor="#F1E7C5">' + jumpertot[14] + '</td><td bgcolor="#F1E7C5">' + thrtot[14] + '</td><td bgcolor="#F1E7C5">' + alltot[14] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[15] + '<td bgcolor="#F1E7C5">' + dstot[15] + '</td> <td bgcolor="#F1E7C5">' + laytot[15] + '</td> <td bgcolor="#F1E7C5">' + hktot[15] + '</td><td bgcolor="#F1E7C5">' + jmphktot[15] + '</td><td bgcolor="#F1E7C5">' + turntot[15] + '</td><td bgcolor="#F1E7C5">' + banktot[15] + '</td><td bgcolor="#F1E7C5">' + runjtot[15] + '</td><td bgcolor="#F1E7C5">' + jumpertot[15] + '</td><td bgcolor="#F1E7C5">' + thrtot[15] + '</td><td bgcolor="#F1E7C5">' + alltot[15] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[16] + '<td bgcolor="#F1E7C5">' + dstot[16] + '</td> <td bgcolor="#F1E7C5">' + laytot[16] + '</td> <td bgcolor="#F1E7C5">' + hktot[16] + '</td><td bgcolor="#F1E7C5">' + jmphktot[16] + '</td><td bgcolor="#F1E7C5">' + turntot[16] + '</td><td bgcolor="#F1E7C5">' + banktot[16] + '</td><td bgcolor="#F1E7C5">' + runjtot[16] + '</td><td bgcolor="#F1E7C5">' + jumpertot[16] + '</td><td bgcolor="#F1E7C5">' + thrtot[16] + '</td><td bgcolor="#F1E7C5">' + alltot[16] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[17] + '<td bgcolor="#F1E7C5">' + dstot[17] + '</td> <td bgcolor="#F1E7C5">' + laytot[17] + '</td> <td bgcolor="#F1E7C5">' + hktot[17] + '</td><td bgcolor="#F1E7C5">' + jmphktot[17] + '</td><td bgcolor="#F1E7C5">' + turntot[17] + '</td><td bgcolor="#F1E7C5">' + banktot[17] + '</td><td bgcolor="#F1E7C5">' + runjtot[17] + '</td><td bgcolor="#F1E7C5">' + jumpertot[17] + '</td><td bgcolor="#F1E7C5">' + thrtot[17] + '</td><td bgcolor="#F1E7C5">' + alltot[17] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[18] + '<td bgcolor="#F1E7C5">' + dstot[18] + '</td> <td bgcolor="#F1E7C5">' + laytot[18] + '</td> <td bgcolor="#F1E7C5">' + hktot[18] + '</td><td bgcolor="#F1E7C5">' + jmphktot[18] + '</td><td bgcolor="#F1E7C5">' + turntot[18] + '</td><td bgcolor="#F1E7C5">' + banktot[18] + '</td><td bgcolor="#F1E7C5">' + runjtot[18] + '</td><td bgcolor="#F1E7C5">' + jumpertot[18] + '</td><td bgcolor="#F1E7C5">' + thrtot[18] + '</td><td bgcolor="#F1E7C5">' + alltot[18] + '</td></tr>'+
'<tr class="loginBottomText"> <td bgcolor="#F1E7C5">' + playerlink[19] + '<td bgcolor="#F1E7C5">' + dstot[19] + '</td> <td bgcolor="#F1E7C5">' + laytot[19] + '</td> <td bgcolor="#F1E7C5">' + hktot[19] + '</td><td bgcolor="#F1E7C5">' + jmphktot[19] + '</td><td bgcolor="#F1E7C5">' + turntot[19] + '</td><td bgcolor="#F1E7C5">' + banktot[19] + '</td><td bgcolor="#F1E7C5">' + runjtot[19] + '</td><td bgcolor="#F1E7C5">' + jumpertot[19] + '</td><td bgcolor="#F1E7C5">' + thrtot[19] + '</td><td bgcolor="#F1E7C5">' + alltot[19] + '</td></tr>'+
'</table>';

var pbptable;
pbptable = document.evaluate(
    "//table",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
pbptable.snapshotItem(7).parentNode.insertBefore( tbl, pbptable.snapshotItem(7));
tbl.parentNode.insertBefore( divider, tbl.nextSibling);
divider.parentNode.insertBefore( tbl2, divider.nextSibling);
tbl2.parentNode.insertBefore( divider2, tbl2.nextSibling);
}