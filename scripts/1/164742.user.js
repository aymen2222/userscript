// ==UserScript==
// @name        ultoo by trickerchamp
// @namespace   http://trickerchamp.blogspot.in
// @include     http://ultoo.in/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==


$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/ultoo.in\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}

pattern=/^http:\/\/ultoo.in\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.in/logout.php?LogOut=1";
}

pattern=/^http:\/\/ultoo.in\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.in/logout.php?LogOut=1";
}

pattern=/^http:\/\/ultoo.in\/relogin.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.in/login.php";
}

pattern=/^http:\/\/ultoo.in\/poll.php/g;

if(url.search(pattern)==0)
{
	$("#OptionId_2").attr('checked');
	unsafeWindow.ImplementClass('AnchorId_3');
	document.form1.OptionChecked.value=1;
	document.form1.submit();
	setTimeout("window.location.href = \"http://ultoo.in/poll.php?zxcoiesesscd=\";",100);

}

pattern=/^http:\/\/ultoo.in\/PollResult.php/g;

if(url.search(pattern)==0)
{
	var link = $(".poll_result_gbg a:last").attr('href');
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}

	var link2 = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link2) != "undefined")
	{
		window.location.href = link2;
	}
}

pattern=/^http:\/\/ultoo.in\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/ultoo.in\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/ultoo.in\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	document.getElementsByName('PollUserName')[0].value="Zatch";
	document.getElementsByName('PollUserQuestion')[0].value="Question'"+Math.floor((Math.random() * 100000000) + 1)+"'";
	document.getElementById('OptionId1').value="a'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId2').value="b'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId3').value="c'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId4').value="d'"+Math.floor((Math.random() * 100) + 1)+"'";
	var mobile=Math.floor(Math.random()*1000000)+9840000000;
		$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"I love ultoo for recharge ehgfjhoipo978675645." , SendNow_:"Send Now"}, function(){});
	setTimeout("document.form1.submit();",750);
}

pattern=/^http:\/\/ultoo.in\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.in/logout.php?Logout=1";
}

pattern=/^http:\/\/ultoo.in\/home.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.in/logout.php?Logout=1";
}

pattern=/^http:\/\/ultoo.in\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="new telugu year;spring;ugadi pachadi;baisakhi;tamarind;fire;chaitra;ugadi;panchangam;avneet sidhu;chikni chameli;chennai;madhubala;dulko;haruhiko kuroda;ganges;kiran bedi;harbhajan;govinda;fiji;arjun;ganga;51;ganga;ponting;rekha;ditch;mewar;drama;pune;lead;552;tennis;v rays;3;nargis;junnar;jugller;98.4;lipids;30;pigeon;fishes;sone;wb;1950;up;usa;mars;hp";
	var quesids="7863;7864;7867;7869;7870;7871;7874;7876;7878;7879;7882;7883;7884;7885;7886;7887;7888;7889;7890;7891;7892;7893;7894;7895;7896;8072;8073;8074;8075;8076;8077;8078;8079;8080;8081;8082;8083;8084;8085;8086;8087;8088;8089;8090;8091;8092;8093;8094;8095;8096";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	var quesid=quesids.split(";")[qno-1];
	var oid=(parseInt(quesid)*4)-10;
	var qxval=document.getElementsByTagName('input')[0].value;
	var mobile=Math.floor(Math.random()*1000000)+9840000000;
	$.post("poll.php",{ qxci:qxval , QuestionId:quesid , OptionChecked:"1" , zxcoiesesscd:"" , chalange_field:"" , response_field:"" , OptionId:oid},function(){});
	setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"HOME BASED JOBS FOR COLLEGE STUDENTS: Income-7000. Qualification:12th & Above. Computer Knowledge must. If intrsted, contact 8220021819." , SendNow_:"Send Now"}, function(){});},750);
	setTimeout("document.getElementsByTagName('input')[2].click();",2000);
	setTimeout("window.location.href = \"http://ultoo.in/AnswereIt.php?zxcoiesesscd=\";",2500);
}

pattern=/http:\/\/ultoo.in\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://ultoo.in/AnswereIt.php?zxcoiesesscd=";
}

pattern=/http:\/\/ultoo.in\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://ultoo.in/poll.php?zxcoiesesscd=";
}

});