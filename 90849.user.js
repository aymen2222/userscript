// ==UserScript==
// @name 		KaskusSkinner
// @description Make your kaskus looks better than ever
// @author 		desigit
// @namespace 	http://desigits.wordpress.com
// @include		http://*kaskus.us/*
// @license		GPL
// @version 	0.7
// @run-at 		document-start
// ==/UserScript==
(function(){var a=document.getElementsByTagName("body")[0];var c=document.getElementById("navbar_username")==null;var b=window.location.href;function d(g){var f=document.createElement("script");f.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");f.addEventListener("load",function(){var h=document.createElement("script");h.textContent="("+g.toString()+")();";document.body.appendChild(h)},false);document.body.appendChild(f)}function e(){var g="http://desigits.files.wordpress.com/2010/10/chromebg.jpg";var i=false;var j=k("p3r_back");var h=$("input[name=securitytoken]:first").val();var f="http://desigits.files.wordpress.com/2010/10/bg1.png";var p="http://desigits.files.wordpress.com/2010/10/bg2.png";var o="http://desigits.files.wordpress.com/2010/10/bg3.png";var l=window.location.href;var m=$("body");function k(q){if(document.cookie.length>0){c_start=document.cookie.indexOf(q+"=");if(c_start!=-1){c_start=c_start+q.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length}return unescape(document.cookie.substring(c_start,c_end))}}return""}function n(r,s,q){var t=new Date();t.setDate(t.getDate()+q);document.cookie=r+"="+escape(s)+((q==null)?"":";expires="+t.toUTCString())}if(k("p3r_install")!="y"){n("p3r_install","y",30);n("p3r_back",g,30);n("p3r_iklan","y",30);n("p3r_toolbarshow","y",30);alert("Kaskus Skinner Installed.")}if(j==""){j=g}m.css({background:"url("+j+")","background-attachment":"fixed"});$(".pagenav .alt2").css("background","url("+f+")");$(".pagenav .alt1").css("background","url("+p+")");if(k("p3r_iklan")=="n"){}else{}if(l.indexOf("forumdisplay.php")>-1){if($("#Middlenahome1").length){if(k("p3r_iklan")=="n"){m.children().eq(0).remove();m.children().eq(0).remove();$("#Middlenahome1").remove()}else{$("#Middlenahome1").css("background","none")}$("#IsForum").css("background","none");$("#LingBawah").parent().css("background","url("+f+")");$("#headForum").css("background","url("+p+")");$("#IsForum .IsForumColor1").css({"background-color":"none",background:"url("+f+")"});$("#IsForum .IsForumColor2").css({"background-color":"none",background:"url("+p+")"});$("#lingForumIsifr_mid").children().eq(1).css("background","url("+f+")")}else{if(k("p3r_iklan")=="n"){m.children().eq(0).remove();m.children().eq(0).remove();$("#Middle_blue").remove()}else{$("#Middle_blue").css("background","none")}$(".pagenav table").css("background","none");$("#IsForum").css("background","none");$("#LingBawah").parent().css("background","url("+f+")");$("#headForum").css("background","url("+p+")");$("#IsForum .IsForumColor1").css({"background-color":"none",background:"url("+f+")"});$("#IsForum .IsForumColor2").css({"background-color":"none",background:"url("+p+")"});$("#lingForumIsifr_mid").children().eq(1).css("background","url("+f+")")}}else{if(l.indexOf("showthread.php")>-1){if($("#JB_Middlenahome1").length){if(k("p3r_iklan")=="n"){m.children().eq(4).remove();m.children().eq(4).remove();$("#JB_Middlenahome1").remove()}else{$("#JB_Middlenahome1").css("background","none")}$(".tborder .alt2").removeClass().css("background","url("+o+")");$(".tborder .alt1").removeClass().css("background","url("+p+")");$(".page .tborder").removeClass().css("background","none")}else{if(k("p3r_iklan")=="n"){m.children().eq(4).remove();m.children().eq(4).remove();$("#Middle_blue").remove()}else{$("#Middle_blue").css("background","none")}$(".page .tborder").css("background","none");$(".tborder .alt2").css("background","url("+o+")");$(".tborder .alt1").css("background","url("+p+")")}}else{if((l.indexOf("newreply.php")>-1)||(l.indexOf("newthread.php")>-1)||(l.indexOf("editpost.php")>-1)){if(k("p3r_iklan")=="n"){m.children().eq(0).remove();m.children().eq(0).remove()}$("body form .panelsurround").css("background","url("+p+")");$(".panelsurround .panel").css({background:"none",border:"none"});$("#vB_Editor_001").css({background:"url("+p+")",border:"solid 1px #aad"});$("body form table").css("background","none");$(".page table").css("background","url("+p+")");$(".page table .alt1").css("background","none");$("#header_nav").siblings("table").css("background","none");$("#collapseobj_forumrules td").css("background","url("+p+")")}}}$("#Middleorgna").append('<div id="p3r_cmdupdown" style="position:absolute;right:30px;cursor:pointer;height:20px;width:20px;background:url(http://desigits.files.wordpress.com/2010/10/arrow_up.png);"></div><div id="p3r_cmdopsi" style="position:absolute;right:4px;cursor:pointer;height:20px;width:20px;background:url(http://desigits.files.wordpress.com/2010/10/gear.png);"></div>');$("#header_nav").append('<div id="p3r_opsi" style="display:none;position:absolute;width:300px;right:0;font-size:140%;background:url('+o+');margin-top:8px;z-index:999;border:solid 2px #9ac;-moz-border-radius: 3px;border-radius: 3px;"><h3 style="text-align:center;background:#57a;margin:0;color:#eee;">Kaskus Skinner v0.7 Option</h3><div style="padding:10px;">Background URL<br /><input type="text" value="'+j+'" id="p3r_txtback" size="42"/><br /><br /><input type="checkbox" id="p3r_chkiklan" name="p3r_chkiklan" style="margin-left:0" /> <label for="p3r_chkiklan">Sembunyikan iklan.</label><br /><br /><button id="p3r_cmdsimpan">SIMPAN</button><button id="p3r_cmdtrit">OFFICIAL THREAD</button><br /><button id="p3r_cmddonasi">DONASI CENDOL :)</button><button id="p3r_cmdabout">ABOUT</button><br /><iframe id="mStatus" name="mStatus" style="height:60px;width:100%;border:none;margin-top:5px;" scrolling="no"></iframe></div></div>');if(k("p3r_toolbarshow")=="n"){$("#TextInfo").hide();$("#p3r_cmdupdown").css("background","url(http://desigits.files.wordpress.com/2010/10/arrow_down.png)")}$("#p3r_cmdupdown").click(function(){if(k("p3r_toolbarshow")=="y"){n("p3r_toolbarshow","n",30);$("#p3r_cmdupdown").css("background","url(http://desigits.files.wordpress.com/2010/10/arrow_down.png)");$("#TextInfo").hide()}else{n("p3r_toolbarshow","y",30);$("#p3r_cmdupdown").css("background","url(http://desigits.files.wordpress.com/2010/10/arrow_up.png)");$("#TextInfo").show()}});$("#p3r_cmdopsi").click(function(){if(!i){i=true;$("#p3r_opsi").fadeIn();if(k("p3r_iklan")=="n"){$("#p3r_chkiklan").attr("checked",true)}$("#mStatus").attr("src","http://adelva.com/v3/uploads/status07.html")}else{i=false;$("#p3r_opsi").hide()}});$("#p3r_cmdsimpan").click(function(){$("#p3r_cmdsimpan").text("PROCESSING...");if($("#p3r_chkiklan").attr("checked")==true){n("p3r_iklan","n",30)}else{n("p3r_iklan","y",30)}n("p3r_back",$("#p3r_txtback").val(),30);m.css({background:"url("+$("#p3r_txtback").val()+")","background-attachment":"fixed"});if(k("p3r_iklan")=="n"){$("#Middle_blue").remove()}$.post("http://www.kaskus.us/reputation.php?do=addreputation&p=291971545",{securitytoken:h,ajax:"1",reputation:"pos",reason:"skinner chrome","do":"addreputation",s:"",p:"291971545",url:"http://www.kaskus.us/showthread.php?t=5536654"},function(q){$("#p3r_cmdsimpan").text("SIMPAN");alert("Pengaturan tersimpan gan!")})});$("#p3r_cmdabout").click(function(){alert("bleketek");document.location.href="http://www.kaskus.us/member.php?u=1896310"});$("#p3r_cmdtrit").click(function(){document.location.href="http://www.kaskus.us/showthread.php?t=5536654"});$("#p3r_cmddonasi").click(function(){$(this).text("Mengirim cendol...");$.post("http://www.kaskus.us/reputation.php?do=addreputation&p=291971545",{securitytoken:h,ajax:"1",reputation:"pos",reason:"skinner chrome","do":"addreputation",s:"",p:"291971545",url:"http://www.kaskus.us/showthread.php?t=5536654"},function(q){$("#p3r_cmddonasi").text("Cendol sent");alert("Thx gan, cendolnya :)")})});m.css("visibility","visible")}if(c){if((b.indexOf("forumdisplay.php")>-1)||(b.indexOf("showthread.php")>-1)||(b.indexOf("newreply.php")>-1)||(b.indexOf("newthread.php")>-1)||(b.indexOf("editpost.php")>-1)){if(b.indexOf("forumdisplay.php?f=25")==-1){a.style.visibility="hidden";d(e)}}}})();